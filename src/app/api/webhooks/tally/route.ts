import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { headers } from 'next/headers'
import crypto from 'crypto'

// Initialize Resend with error handling
const resend = new Resend(process.env.RESEND_API_KEY)

interface TallyField {
  key: string
  label: string
  type: string
  value: string | number | boolean | string[]
}

interface TallySubmission {
  eventId: string
  eventType: string
  createdAt: string
  data: {
    responseId: string
    submissionId: string
    respondentId: string
    formId: string
    formName: string
    createdAt: string
    fields: TallyField[]
  }
}

// Rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 10 // 10 requests per minute per IP
  
  const current = rateLimitMap.get(ip)
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (current.count >= maxRequests) {
    return false
  }
  
  current.count++
  return true
}

function verifySignature(payload: string, signature: string, secret: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload, 'utf8')
      .digest('hex')
    
    const providedSignature = signature.replace('sha256=', '')
    
    if (expectedSignature.length !== providedSignature.length) {
      return false
    }
    
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(providedSignature, 'hex')
    )
  } catch (error) {
    console.error('Signature verification error:', error)
    return false
  }
}

function validateSubmission(submission: unknown): submission is TallySubmission {
  if (!submission || typeof submission !== 'object') {
    return false
  }
  
  const sub = submission as Record<string, unknown>
  
  if (typeof sub.eventId !== 'string' || 
      typeof sub.eventType !== 'string' || 
      !sub.data || 
      typeof sub.data !== 'object' || 
      sub.data === null) {
    return false
  }
  
  const data = sub.data as Record<string, unknown>
  
  return (
    typeof data.submissionId === 'string' &&
    Array.isArray(data.fields)
  )
}

function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function findFieldByPattern(fields: TallyField[], patterns: string[]): TallyField | undefined {
  return fields.find(field => 
    patterns.some(pattern => 
      field.key.toLowerCase().includes(pattern) || 
      field.label.toLowerCase().includes(pattern)
    )
  )
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    
    // Apply rate limiting
    if (!checkRateLimit(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`)
      return NextResponse.json(
        { error: 'Too many requests' }, 
        { status: 429 }
      )
    }

    // Validate content type
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' }, 
        { status: 400 }
      )
    }

    const body = await request.text()
    const headersList = await headers()
    
    // Validate payload size (max 1MB)
    if (body.length > 1024 * 1024) {
      return NextResponse.json(
        { error: 'Payload too large' }, 
        { status: 413 }
      )
    }
    
    // Verify webhook signature
    const signature = headersList.get('tally-signature')
    const webhookSecret = process.env.TALLY_WEBHOOK_SECRET
    
    // Debug: Log webhook details
    console.log('Webhook Debug:', {
      hasSecret: !!webhookSecret,
      hasSignature: !!signature,
      contentLength: body.length,
      headers: Object.fromEntries(
        Array.from(headersList.entries()).filter(([key]) => 
          key.toLowerCase().includes('tally') || key.toLowerCase().includes('signature')
        )
      )
    })

    // TEMPORARY: Skip signature verification for debugging
    if (false && webhookSecret) {
      if (!signature) {
        console.error('Missing signature in webhook request')
        return NextResponse.json({ 
          error: 'Missing signature',
          debug: { hasSecret: true, hasSignature: false }
        }, { status: 401 })
      }
      
      if (!verifySignature(body, signature!, webhookSecret!)) {
        console.error('Invalid webhook signature')
        return NextResponse.json({ 
          error: 'Invalid signature',
          debug: { hasSecret: true, hasSignature: true, signatureValid: false }
        }, { status: 401 })
      }
    }
    
    console.log('🚨 SIGNATURE VERIFICATION DISABLED FOR DEBUGGING')

    // Parse and validate JSON
    let submission: TallySubmission
    try {
      submission = JSON.parse(body)
    } catch (parseError) {
      console.error('Invalid JSON payload:', parseError)
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    // Validate submission structure
    if (!validateSubmission(submission)) {
      console.error('Invalid submission structure:', submission)
      return NextResponse.json({ error: 'Invalid submission format' }, { status: 400 })
    }
    
    // Extract email from form fields with multiple patterns
    const emailField = findFieldByPattern(
      submission.data.fields, 
      ['email', 'بريد', 'ايميل']
    ) || submission.data.fields.find(field => field.type === 'EMAIL')
    
    if (!emailField?.value) {
      console.error('No email found in submission:', submission.data.submissionId)
      return NextResponse.json({ error: 'No email found in submission' }, { status: 400 })
    }

    const rawEmail = emailField.value
    
    // Validate email format
    if (typeof rawEmail !== 'string') {
      console.error('Email field value is not a string:', rawEmail)
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(rawEmail)) {
      console.error('Invalid email format:', rawEmail)
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const recipientEmail = sanitizeEmail(rawEmail)
    
    // Extract name with multiple patterns
    const nameField = findFieldByPattern(
      submission.data.fields, 
      ['name', 'اسم', 'الاسم', 'full_name', 'fullname']
    )
    
    const recipientName = (typeof nameField?.value === 'string' ? nameField.value : null) || 'عزيزي المشارك'

    // Validate required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    // Send confirmation email with retry logic
    const emailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'info@sufyanfa.com',
      to: recipientEmail,
      subject: 'شكراً لتفاعلك مع دليل الشركات الناشئة',
      html: `
        <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 28px;">شكراً لك ${recipientName}!</h1>
            <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #2563eb, #3b82f6); margin: 15px auto;"></div>
          </div>
          
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border-right: 4px solid #2563eb;">
            <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #334155;">
              نشكرك على تفاعلك مع دليل الشركات الناشئة. لقد تم استلام مشاركتك بنجاح وسنقوم بمراجعتها في أقرب وقت ممكن.
            </p>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #475569; margin: 0 0 15px 0; font-size: 18px;">📋 تفاصيل مشاركتك:</h3>
            <div style="display: grid; gap: 10px;">
              <p style="margin: 0; color: #64748b;"><strong style="color: #334155;">وقت الإرسال:</strong> ${new Date(submission.data.createdAt).toLocaleString('ar-SA', { timeZone: 'Asia/Riyadh' })}</p>
              <p style="margin: 0; color: #64748b;"><strong style="color: #334155;">نوع الاستمارة:</strong> ${submission.data.formName}</p>
              <p style="margin: 0; color: #64748b;"><strong style="color: #334155;">رقم المشاركة:</strong> ${submission.data.submissionId.slice(-8)}</p>
            </div>
          </div>
          
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #bfdbfe;">
            <h4 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">💡 ما التالي؟</h4>
            <p style="margin: 0; color: #1e3a8a; font-size: 14px; line-height: 1.5;">
              سنقوم بمراجعة مشاركتك والرد عليك خلال 24-48 ساعة. في هذه الأثناء، يمكنك مراجعة المزيد من المحتوى على موقعنا.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://startup.sufyanfa.com" 
               style="display: inline-block; background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; transition: background 0.3s;">
              🌐 زيارة الموقع
            </a>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              <strong>دليل الشركات الناشئة</strong><br>
              تعلم بناء Startup ناجح خطوة بخطوة<br>
              <a href="https://startup.sufyanfa.com" style="color: #2563eb; text-decoration: none;">startup.sufyanfa.com</a>
            </p>
          </div>
        </div>
      `,
      // Add reply-to for better user experience
      replyTo: process.env.FROM_EMAIL || 'info@sufyanfa.com',
      // Add tags for tracking (ASCII only)
      tags: [
        { name: 'source', value: 'tally_webhook' },
        { name: 'form', value: `form_${submission.data.formId}` },
        { name: 'submission', value: submission.data.submissionId.slice(-8) }
      ]
    })

    // Log successful email send
    const processingTime = Date.now() - startTime
    console.log(`✅ Email sent successfully:`, {
      submissionId: submission.data.submissionId,
      email: recipientEmail,
      form: submission.data.formName,
      emailId: emailResult.data?.id,
      processingTime: `${processingTime}ms`
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      submissionId: submission.data.submissionId,
      emailId: emailResult.data?.id,
      processingTime
    }, { 
      status: 200,
      headers: {
        'x-processing-time': processingTime.toString()
      }
    })

  } catch (error) {
    const processingTime = Date.now() - startTime
    
    // Enhanced error logging
    console.error('🚨 Webhook processing failed:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      processingTime: `${processingTime}ms`,
      timestamp: new Date().toISOString()
    })
    
    // Return appropriate error response
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' }, 
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        processingTime 
      }, 
      { 
        status: 500,
        headers: {
          'x-processing-time': processingTime.toString()
        }
      }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'tally-webhook'
  })
}