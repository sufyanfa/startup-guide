import { Assessment } from '../types/inedx';

export const assessments: Record<string, Assessment> = {
  'idea-market': {
    title: 'محور الرؤية والفكرة',
    description: 'قياس عمق الرؤية ووضوح الفكرة التجارية',
    questions: [
      {
        id: 'startup_stage',
        text: 'كيف تصف مرحلة فكرتك الحالية؟',
        type: 'single_select',
        required: true,
        options: [
          { 
            value: 'seed', 
            label: 'البذرة', 
            description: 'لديّ فكرة لكن لم أبدأ أي خطوات عملية' 
          },
          { 
            value: 'exploration', 
            label: 'الاستكشاف', 
            description: 'أدرس السوق والمنافسين والعملاء المحتملين' 
          },
          { 
            value: 'development', 
            label: 'التطوير', 
            description: 'بدأت في بناء نموذج أولي MVP فعلي' 
          },
          { 
            value: 'validation', 
            label: 'التحقق', 
            description: 'لدي عملاء أوائل وأختبر المنتج في السوق الحقيقي' 
          }
        ]
      }
    ]
  },

  'product-development': {
    title: 'محور النضج التقني والمنتج',
    description: 'تقييم مستوى تطوير المنتج والقدرات التقنية',
    questions: [
      {
        id: 'product_stage',
        text: 'في أي مرحلة يقع تطوير منتجك حالياً؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'planning', label: 'التخطيط', description: 'نضع المميزات ونصمم تجربة المستخدم' },
          { value: 'building', label: 'البناء', description: 'نطور النموذج الأولي' },
          { value: 'launched', label: 'الإطلاق', description: 'أطلقنا المنتج ونجمع ملاحظات المستخدمين' },
          { value: 'growing', label: 'النمو', description: 'منتج مستقر مع مستخدمين نشطين ونمو قابل للقياس' }
        ]
      }
    ]
  },

  'team-building': {
    title: 'محور بناء الفريق والقيادة',
    description: 'تقييم قوة الفريق وفعالية القيادة',
    questions: [
      {
        id: 'team_structure',
        text: 'كيف تصف هيكل فريقك وأسلوب القيادة الحالي؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'solo', label: 'المنفرد', description: 'أعمل بمفردي وأركز على إثبات الفكرة' },
          { value: 'partnership', label: 'الشراكة', description: 'أعمل مع شريك مؤسس موثوق' },
          { value: 'seeking_partner', label: 'البحث', description: 'أعمل بمفردي وأبحث عن الشريك المناسب' },
          { value: 'full_team', label: 'الفريق', description: 'لدينا فريق متكامل يعمل بفعالية عالية' }
        ]
      }
    ]
  },

  'execution-leadership': {
    title: 'محور التنفيذ والنمو التشغيلي',
    description: 'قياس فعالية التنفيذ والقدرة على تحقيق النمو',
    questions: [
      {
        id: 'execution_focus',
        text: 'ما هو تركيزك في النمو والتنفيذ حالياً؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'exploration', label: 'الاستكشاف', description: 'نجرب ونختبر لإيجاد ما يعمل فعلاً' },
          { value: 'building_systems', label: 'البناء', description: 'نطور العمليات والأنظمة الأساسية' },
          { value: 'accelerating', label: 'التسريع', description: 'نعمل على جذب المزيد من العملاء بفعالية' },
          { value: 'scaling', label: 'التوسع', description: 'لدينا زخم قوي ونعمل على تسريع النمو' }
        ]
      }
    ]
  },

  'money-business-model': {
    title: 'محور الاستدامة المالية ونموذج العمل',
    description: 'تقييم الوضع المالي وقوة نموذج العمل',
    questions: [
      {
        id: 'financial_status',
        text: 'كيف تصف وضعك المالي ونموذج الإيرادات الحالي؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'seeking_funding', label: 'البحث عن التمويل', description: 'نحتاج استثمار لبناء المنتج والنمو' },
          { value: 'testing', label: 'التجريب', description: 'نختبر طرق مختلفة لتحقيق الإيرادات' },
          { value: 'optimizing', label: 'التحسين', description: 'لدينا إيرادات ونعمل على تحسين الربحية' },
          { value: 'profitable', label: 'الربحية', description: 'نحقق أرباح صافية ونستثمرها في التوسع' }
        ]
      }
    ]
  },

  'competitors-market': {
    title: 'محور الميزة التنافسية والموضع السوقي',
    description: 'فهم قوة الموضع التنافسي في السوق',
    questions: [
      {
        id: 'competitive_position',
        text: 'كيف تصف موضعك التنافسي والتميز في السوق؟',
        type: 'single_select',
        required: true,
        options: [
          { value: 'crowded_market', label: 'السوق المزدحم', description: 'منافسة شديدة، نبحث عن طرق للتميز' },
          { value: 'gradual_improvement', label: 'التحسن التدريجي', description: 'نطور منتجنا للتنافس بفعالية أكبر' },
          { value: 'clear_differentiation', label: 'التميز الواضح', description: 'لدينا ميزة تنافسية واضحة ومستدامة' },
          { value: 'market_leadership', label: 'الريادة السوقية', description: 'منتجنا هو الأفضل والأكثر تقدماً في فئتنا' }
        ]
      }
    ]
  }
};