# Cloudflare Pages Deployment Guide

This guide explains how to deploy your Next.js application with webhooks and Resend email to Cloudflare Pages.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Installed via `pnpm install` (already in devDependencies)
3. **Resend Account**: For email functionality at [resend.com](https://resend.com)
4. **Tally Account**: For form webhooks at [tally.so](https://tally.so)

## Configuration Overview

Your project is configured with:
- ✅ **@opennextjs/cloudflare** adapter for Next.js on Cloudflare
- ✅ **Node.js compatibility** enabled (`nodejs_compat` flag)
- ✅ **Crypto module** support for webhook signature verification
- ✅ **Resend integration** for sending emails

## Key Files

- `wrangler.toml` - Cloudflare Workers configuration
- `open-next.config.ts` - OpenNext adapter configuration
- `package.json` - Build scripts for Cloudflare deployment

## Environment Variables Setup

You need to configure these environment variables in Cloudflare Pages:

### 1. Via Cloudflare Dashboard

Go to: **Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables**

Add the following variables:

```bash
RESEND_API_KEY=re_xxxxx           # Your Resend API key
FROM_EMAIL=info@sufyanfa.com      # Your verified sender email
TALLY_WEBHOOK_SECRET=xxxxx        # Your Tally webhook secret
TALLY_API_KEY=tly_xxxxx           # Your Tally API key
NODE_ENV=production               # Set to production
```

### 2. Via Wrangler CLI

```bash
# Set production environment variables
wrangler pages secret put RESEND_API_KEY
wrangler pages secret put TALLY_WEBHOOK_SECRET
wrangler pages secret put TALLY_API_KEY
```

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Connect Git Repository**:
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project"
   - Connect your GitHub/GitLab repository
   - Select your repository

2. **Configure Build Settings**:
   ```
   Build command: pnpm pages:build
   Build output directory: .open-next/worker
   ```

3. **Set Environment Variables** (as shown above)

4. **Deploy**: Push to your main branch to trigger automatic deployment

### Option 2: Manual Deployment via CLI

1. **Login to Cloudflare**:
   ```bash
   pnpm wrangler login
   ```

2. **Build the Project**:
   ```bash
   pnpm pages:build
   ```

3. **Deploy to Cloudflare Pages**:
   ```bash
   pnpm deploy
   ```

## Resend Email Configuration

### 1. Domain Setup in Resend

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your domain (e.g., `sufyanfa.com`)
3. Add the DNS records to Cloudflare:
   - DKIM record (TXT)
   - SPF record (TXT)
   - DMARC record (TXT)

### 2. Verify Domain

Wait for DNS propagation (can take up to 24 hours) and verify your domain in Resend.

### 3. Get API Key

1. Go to Resend Dashboard → API Keys
2. Create a new API key
3. Add it to Cloudflare Pages environment variables

## Tally Webhook Configuration

### 1. Get Webhook Secret

1. Go to your Tally form settings
2. Navigate to "Integrations" → "Webhooks"
3. Copy the webhook signing secret
4. Add it to Cloudflare environment variables as `TALLY_WEBHOOK_SECRET`

### 2. Configure Webhook URL

Set your webhook URL in Tally:
```
https://your-project.pages.dev/api/webhooks/tally
```

## Testing

### 1. Local Testing

```bash
# Install dependencies
pnpm install

# Test locally with Wrangler
pnpm preview

# The app will be available at http://localhost:8788
```

### 2. Test Webhook

1. Submit a test form in Tally
2. Check Cloudflare Pages logs for webhook processing
3. Verify email was sent via Resend

### 3. Check Logs

```bash
# View deployment logs
wrangler pages deployment list

# View function logs
wrangler pages deployment tail
```

## Important Notes

### Webhook Compatibility ✅

Your webhook handler uses `node:crypto` for HMAC signature verification, which is fully supported on Cloudflare with the `nodejs_compat` flag enabled.

### Resend Compatibility ✅

Resend works perfectly on Cloudflare Pages when:
- The `nodejs_compat` compatibility flag is enabled ✅
- Compatibility date is set to 2024-09-23 or later ✅
- API key is properly configured in environment variables ✅

### Rate Limiting

The webhook currently uses in-memory rate limiting. For production:
- Consider using Cloudflare KV or Durable Objects
- Or use Cloudflare's built-in rate limiting features

## Troubleshooting

### Issue: Webhook signature verification fails

**Solution**: Ensure `TALLY_WEBHOOK_SECRET` is correctly set in Cloudflare environment variables.

### Issue: Email not sending

**Solutions**:
1. Verify `RESEND_API_KEY` is correct
2. Check domain verification in Resend
3. Ensure `FROM_EMAIL` is verified in Resend
4. Check Cloudflare Pages logs for errors

### Issue: Build fails

**Solutions**:
1. Ensure all dependencies are installed: `pnpm install`
2. Check Node.js version compatibility (use Node 18+)
3. Verify `@opennextjs/cloudflare` is installed
4. Check build output directory is set to `.open-next/worker`

### Issue: 500 errors in production

**Solutions**:
1. Check environment variables are set correctly
2. View Cloudflare Pages function logs: `wrangler pages deployment tail`
3. Ensure compatibility flags are set in `wrangler.toml`

## Build Scripts

```bash
# Development
pnpm dev                    # Run Next.js dev server with Turbopack

# Production Build
pnpm build                  # Build Next.js app
pnpm pages:build            # Build for Cloudflare Pages

# Preview & Deploy
pnpm preview                # Preview locally with Wrangler
pnpm deploy                 # Deploy to Cloudflare Pages
```

## Performance Optimization

1. **Cold Start**: First request may be slower due to Worker cold start
2. **Edge Network**: Your app runs on Cloudflare's global edge network
3. **Caching**: Static assets are automatically cached
4. **Image Optimization**: Next.js image optimization works via Cloudflare

## Security Considerations

1. ✅ Webhook signature verification enabled
2. ✅ Rate limiting implemented
3. ✅ Environment variables stored as secrets
4. ✅ HTTPS enforced by Cloudflare
5. ✅ Security headers configured in `next.config.ts`

## Custom Domain

1. Go to Cloudflare Pages → Your Project → Custom domains
2. Add your domain
3. Cloudflare will automatically configure DNS

## Monitoring

1. **Cloudflare Analytics**: Available in dashboard
2. **Real-time logs**: Use `wrangler pages deployment tail`
3. **Error tracking**: Check function invocation logs

## Support Resources

- [OpenNext Cloudflare Docs](https://opennext.js.org/cloudflare)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Resend Docs](https://resend.com/docs)
- [Tally Webhooks](https://tally.so/help/webhooks)

---

**Ready to Deploy?** Run `pnpm deploy` after setting up environment variables!
