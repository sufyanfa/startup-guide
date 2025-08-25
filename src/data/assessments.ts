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
      }
    ]
  },

  'product-development': {
    title: 'تقييم وضع تطوير المنتج',
    description: 'فهم مرحلة تطوير منتجك والتحديات التقنية التي تواجهها',
    questions: [
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
      }
    ]
  },

  'money-business-model': {
    title: 'تقييم الوضع المالي ونموذج العمل',
    description: 'فهم وضعك المالي الحالي واستراتيجية تحقيق الإيرادات',
    questions: [
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
      }
    ]
  }
};