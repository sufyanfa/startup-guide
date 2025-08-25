import { Assessment } from '../types/inedx';

export const assessments: Record<string, Assessment> = {
  'idea-market': {
    title: 'تقييم وضع فكرتك والسوق',
    description: 'ساعدنا في فهم مرحلة فكرتك الحالية لنقدم لك النصائح والأدوات المناسبة',
    questions: [
      {
        id: 'startup_stage',
        text: 'في أي مرحلة تقع فكرة مشروعك حالياً؟',
        type: 'single_select',
        required: true,
        options: [
          { 
            value: 'just_idea', 
            label: 'مجرد فكرة', 
            description: 'لديّ فكرة لكن لم أبدأ بأي خطوات عملية' 
          },
          { 
            value: 'researching', 
            label: 'أبحث في السوق', 
            description: 'أدرس السوق والمنافسين والعملاء المحتملين' 
          },
          { 
            value: 'building_mvp', 
            label: 'أبني المنتج الأولي', 
            description: 'بدأت في تطوير نموذج أولي أو MVP' 
          },
          { 
            value: 'have_customers', 
            label: 'لديّ عملاء أوائل', 
            description: 'حصلت على عملائي الأوائل وأختبر المنتج معهم' 
          }
        ]
      },
      {
        id: 'problem_validation',
        text: 'كيف تأكدت من أن المشكلة التي تحلها حقيقية ومهمة؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'customer_interviews', label: 'مقابلات مع العملاء المحتملين' },
          { value: 'personal_experience', label: 'تجربة شخصية مع المشكلة' },
          { value: 'market_research', label: 'أبحاث السوق والإحصائيات' },
          { value: 'competitor_success', label: 'نجاح المنافسين في حل نفس المشكلة' },
          { value: 'not_validated', label: 'لم أتأكد بعد من صحة المشكلة' }
        ]
      }
    ]
  },

  'product-development': {
    title: 'تقييم وضع تطوير المنتج',
    description: 'فهم مرحلة تطوير منتجك والتحديات التقنية التي تواجهها',
    questions: [
      {
        id: 'product_stage',
        text: 'في أي مرحلة يقع منتجك حالياً؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'concept_only', label: 'مجرد مفهوم أو فكرة' },
          { value: 'prototype', label: 'نموذج أولي يعمل' },
          { value: 'beta_version', label: 'نسخة تجريبية مع مستخدمين' },
          { value: 'launched_product', label: 'منتج مُطلق في السوق' }
        ]
      },
      {
        id: 'user_feedback',
        text: 'كم مرة تحصل على تعليقات من المستخدمين وتطبقها على منتجك؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'weekly', label: 'أسبوعياً - نطبق دورة (بناء - قياس - تعلم)' },
          { value: 'monthly', label: 'شهرياً - نراجع التعليقات بانتظام' },
          { value: 'rarely', label: 'نادراً - نركز على التطوير أكثر من التعليقات' },
          { value: 'never', label: 'لا نحصل على تعليقات بعد - ما زلنا في مرحلة التطوير' }
        ]
      }
    ]
  },

  'team-building': {
    title: 'تقييم وضع الفريق',
    description: 'فهم تركيبة فريقك الحالية والاحتياجات المستقبلية',
    questions: [
      {
        id: 'cofounder_status',
        text: 'ما هو وضعك مع الشريك المؤسس؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'have_cofounder', label: 'لدي شريك مؤسس نعمل معاً بفعالية' },
          { value: 'looking', label: 'أبحث عن شريك مؤسس مناسب' },
          { value: 'solo_prefer', label: 'أفضل العمل بمفردي حالياً' },
          { value: 'team_issues', label: 'لدي مشاكل مع شركائي الحاليين' }
        ]
      },
      {
        id: 'team_commitment',
        text: 'كم من الوقت يخصص فريقك الأساسي للمشروع؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'fulltime', label: 'دوام كامل - متفرغون 100% للمشروع' },
          { value: 'mostly_fulltime', label: 'شبه متفرغين - أكثر من 30 ساعة أسبوعياً' },
          { value: 'parttime', label: 'دوام جزئي - أقل من 20 ساعة أسبوعياً' },
          { value: 'weekend_only', label: 'نهايات الأسبوع فقط' }
        ]
      }
    ]
  },

  'execution-leadership': {
    title: 'تقييم التنفيذ والقيادة',
    description: 'فهم أسلوبك في القيادة والتحديات التنفيذية',
    questions: [
      {
        id: 'focus_strategy',
        text: 'كيف تدير أولوياتك وتركيزك كمدير تنفيذي؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'very_focused', label: 'مركز جداً - شيء واحد فقط حتى إتقانه' },
          { value: 'few_priorities', label: 'أركز على 2-3 أولويات رئيسية' },
          { value: 'many_tasks', label: 'أعمل على أشياء كثيرة في نفس الوقت' },
          { value: 'reactive', label: 'أتعامل مع الأمور حسب الظروف' }
        ]
      },
      {
        id: 'growth_tracking',
        text: 'كيف تتبع نمو شركتك؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'clear_metrics', label: 'لدي مقياس نمو واضح ومحدد نتابعه يومياً' },
          { value: 'multiple_metrics', label: 'نتبع عدة مؤشرات مالية وتشغيلية' },
          { value: 'basic_tracking', label: 'نتابع الإيرادات والعملاء الجدد' },
          { value: 'no_tracking', label: 'لا نتبع مقاييس النمو بانتظام' }
        ]
      }
    ]
  },

  'money-business-model': {
    title: 'تقييم الوضع المالي ونموذج العمل',
    description: 'فهم وضعك المالي الحالي واستراتيجية تحقيق الإيرادات',
    questions: [
      {
        id: 'revenue_status',
        text: 'ما هو وضع الإيرادات الحالي لشركتك؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'profitable', label: 'مربحة - الإيرادات تغطي التكاليف وأكثر' },
          { value: 'revenue_positive', label: 'لدينا إيرادات لكن لسنا مربحين بعد' },
          { value: 'first_sales', label: 'حققنا أول مبيعات' },
          { value: 'no_revenue', label: 'لا توجد إيرادات بعد' }
        ]
      },
      {
        id: 'money_path',
        text: 'ما هي استراتيجيتك لكسب المال؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'proven_model', label: 'لدينا نموذج عمل مثبت يحقق أرباح' },
          { value: 'testing_pricing', label: 'نختبر استراتيجيات تسعير مختلفة' },
          { value: 'seeking_funding', label: 'نركز على جمع تمويل قبل الربحية' },
          { value: 'no_clear_path', label: 'لا يوجد مسار واضح للربحية بعد' }
        ]
      }
    ]
  },

  'competitors-market': {
    title: 'تقييم فهم المنافسة والسوق',
    description: 'قياس مدى فهمك للمنافسة واستراتيجية التميز',
    questions: [
      {
        id: 'competitive_advantage',
        text: 'ما هي ميزتك التنافسية الأساسية؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'unique_product', label: 'منتج فريد لا يوجد مثيل له في السوق' },
          { value: 'better_execution', label: 'تنفيذ أفضل لفكرة موجودة' },
          { value: 'local_focus', label: 'تركيز على السوق المحلي واحتياجاته' },
          { value: 'cost_advantage', label: 'تكلفة أقل أو سعر أفضل' },
          { value: 'no_clear_advantage', label: 'لا أملك ميزة تنافسية واضحة بعد' }
        ]
      },
      {
        id: 'market_strategy',
        text: 'ما هي استراتيجيتك في السوق؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'niche_domination', label: 'الهيمنة على سوق صغير محدد' },
          { value: 'direct_competition', label: 'المنافسة المباشرة مع الكبار' },
          { value: 'market_creation', label: 'خلق سوق جديد' },
          { value: 'avoiding_competition', label: 'تجنب المنافسة قدر الإمكان' }
        ]
      }
    ]
  }
};