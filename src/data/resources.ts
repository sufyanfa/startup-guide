import { Recommendation } from '../types/inedx';


export const recommendations: Recommendation[] = [
  {
    id: 'idea_validation_help',
    title: 'تحقق من صحة فكرتك قبل البناء',
    description: 'استخدم هذه الأدوات والنماذج للتحقق من صحة فكرتك قبل البدء في بناء المنتج.',
    category: 'marketing',
    priority: 'high',
    resources: [
      {
        name: 'أداة Business Model Canvas',
        type: 'tool',
        url: 'https://canvanizer.com/new/business-model-canvas',
        description: 'ارسم نموذج العمل لفكرتك في صفحة واحدة',
        pricing: 'free',
        setup_time: '30 minutes',
        difficulty: 'beginner'
      },
      {
        name: 'نموذج دراسة الجدوى',
        type: 'guide',
        url: 'https://www.monshaat.gov.sa/ar/node/13993',
        description: 'نموذج دراسة الجدوى لتقييم جدوى فكرتك',
        pricing: 'free',
        setup_time: '1 hour',
        difficulty: 'beginner'
      },
      {
        name: 'تحدث مع 10 عملاء محتملين',
        type: 'accelerator',
        url: 'https://www.figma.com/community/file/1398973413369589251',
        description: 'قائمة بأسئلة لإجراء مقابلات مع العملاء المحتملين للتحقق من صحة فكرتك',
        pricing: 'free',
        setup_time: '1 hour',
        difficulty: 'beginner'
      },
    ],
    conditions: [
      { questionId: 'startup_stage', operator: 'equals', value: 'seed' }
    ]
  },
  {
    id: 'market_research_help',
    title: 'أدوات وموارد لأبحاث السوق',
    description: 'اكتشف مدى اهتمام الناس بمجالك وادرس المنافسين بفعالية',
    category: 'marketing',
    priority: 'high',
    resources: [
      {
        name: 'أداة Google Trends لتحليل الاهتمام',
        type: 'tool',
        url: 'https://trends.google.com',
        description: 'اكتشف مدى اهتمام الناس بمجالك',
        pricing: 'free',
        setup_time: '1 hour',
        difficulty: 'beginner'
      },
      {
        name: 'أدوات تحليل المنافسين',
        type: 'guide',
        url: 'https://bakkah.com/ar/knowledge-center/%D8%A3%D8%AF%D9%88%D8%A7%D8%AA-%D8%AA%D8%AD%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84',
        description: 'قائمة بأفضل أدوات  وأساليب تحليل المنافسين',
        pricing: 'free',
        setup_time: '2 hours',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'startup_stage', operator: 'equals', value: 'exploration' }
    ]
  },
  {
    id: 'building_mvp_help',
    title: 'أدوات وإرشادات بناء المنتج الأولي',
    description: 'ابن منتجك الأولي بسرعة وكفاءة باستخدام أدوات الذكاء الاصطناعي.',
    category: 'development',
    priority: 'high',
    resources: [
      {
        name: 'منصات بناء التطبيقات',
        type: 'tool',
        url: 'https://base44.com/',
        description: 'منصات لبناء التطبيقات بأستخدام AI مثل Base44، bolt.new, Bubble',
        pricing: 'paid',
        setup_time: '1-2 weeks',
        difficulty: 'intermediate'
      },
      {
        name: 'قائمة مراجعة الـMVP',
        type: 'checklist',
        description: 'تأكد من أن منتجك الأولي: يحل المشكلة الأساسية فقط، سهل الاستخدام للعميل الأول، يمكن بناؤه في 4-8 أسابيع، قابل للقياس والتحسين، يحتوي على طريقة لجمع ملاحظات المستخدمين',
        pricing: 'free',
        setup_time: '1 hour',
        difficulty: 'beginner'
      }
    ],
    conditions: [
      { questionId: 'startup_stage', operator: 'equals', value: 'development' }
    ]
  },
  {
    id: 'early_customers_help',
    title: 'أدوات تتبع رضا العملاء ونمو الشركة',
    description: 'قس مدى رضا عملاءك وطبق استراتيجيات النمو المبكر',
    category: 'marketing',
    priority: 'high',
    resources: [
      {
        name: 'أداة تتبع رضا العملاء',
        type: 'tool',
        url: 'https://tally.so/',
        description: 'قس مدى رضا عملاءك ومدى احتمال ترشيحهم لك - أدوات مثل Tally.so, Typeform, Google Forms',
        pricing: 'freemium',
        setup_time: '2 hours',
        difficulty: 'beginner'
      },
      {
        name: 'استراتيجيات النمو المبكر',
        type: 'checklist',
        description: 'فعل التوصية والمشاركة - برامج الإحالة - تواجد في المجتمعات ذات الصلة - تحسين محركات البحث (SEO)',
        pricing: 'free',
        setup_time: '1 week',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'startup_stage', operator: 'equals', value: 'validation' }
    ]
  },

  // Product development recommendations
  {
    id: 'improve_user_feedback_loop',
    title: 'تحسين دورة التعلم من المستخدمين',
    description: 'طبق دورة (بناء - قياس - تعلم) للحصول على منتج يحبه المستخدمون',
    category: 'development',
    priority: 'high',
    resources: [
      {
        name: 'نموذج بناء المنتج الأولي MVP',
        type: 'guide',
        url: 'https://www.monshaat.gov.sa/sites/default/files/11.pdf',
        description: 'نموذج لتطوير منتج أولي يركز على حل المشكلة الأساسية',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'intermediate'
      },
      {
        name: 'دليل إدارة المنتجات',
        type: 'guide',
        url: 'https://prodcamp.t2.sa/wp-content/uploads/2023/05/%D8%AF%D9%84%D9%8A%D9%84%D9%83-%D9%84%D9%84%D8%AA%D8%B9%D8%B1%D9%81-%D8%B9%D9%84%D9%89-%D8%A7%D9%94%D8%B3%D8%A7%D8%B3%D9%8A%D8%A7%D8%AA-%D9%85%D9%81%D8%A7%D9%87%D9%8A%D9%85-%D9%88%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A%D8%A7%D8%AA-%D8%AD%D8%AF%D9%8A%D8%AB%D8%A9-%D9%84%D8%A7%D9%95%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA-.pdf',
        description: 'دليل التعرف على أساسيــات, مفاهيــم واستراتيجيات  إدارة المنتجات',
        pricing: 'free',
        setup_time: '2-4 hours',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'product_stage', operator: 'equals', value: 'building' }
    ]
  },
  {
    id: 'no_user_feedback_yet',
    title: 'ابدأ في جمع تعليقات المستخدمين',
    description: 'حان الوقت للبدء في جمع تعليقات المستخدمين حول منتجك',
    category: 'development',
    priority: 'high',
    resources: [
      {
        name: 'دليل مقابلات المستخدمين',
        type: 'guide',
        url: 'https://uxwritingar.com/free-resources',
        description: 'كيفية إجراء مقابلات فعالة مع المستخدمين',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'beginner'
      },
      {
        name: 'دليل إدارة المشاريع للمؤسسين',
        type: 'tool',
        url: 'https://www.notion.com/blog/project-management-playbook-for-founders',
        description: 'دليل لإدارة االمشاريع مع أشهر القوالب على Notion',
        pricing: 'freemium',
        setup_time: '1-2 hours',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'product_stage', operator: 'equals', value: 'planning' }
    ]
  },

  // Team recommendations
  {
    id: 'find_cofounder',
    title: 'البحث عن شريك مؤسس',
    description: 'نصائح وأماكن للعثور على الشريك المؤسس المناسب',
    category: 'operations',
    priority: 'high',
    resources: [
      {
        name: 'دليل اختيار الشريك المؤسس',
        type: 'guide',
        url: 'https://blog.mostaql.com/how-to-choose-the-right-co-founder/',
        description: 'كيفية العثور على شريك مؤسس متوافق ومتفرغ',
        pricing: 'free',
        setup_time: '1-2 hours',
        difficulty: 'beginner'
      },
      {
        name: 'imateco',
        type: 'tool',
        url: 'https://imateco.com/',
        description: 'منصة للعثور على شركاء مؤسسين ومطورين',
        pricing: 'free',
        setup_time: '1-2 hours',
        difficulty: 'beginner'
      }
    ],
    conditions: [
      { questionId: 'team_structure', operator: 'equals', value: 'seeking_partner' }
    ]
  },
  {
    id: 'solo_founder_support',
    title: 'استراتيجيات الرائد الفردي',
    description: 'نصائح وأدوات لإدارة الشركة الناشئة كرائد فردي',
    category: 'operations',
    priority: 'medium',
    resources: [
      {
        name: 'تجارب الشركات',
        type: 'guide',
        url: 'https://youtube.com/playlist?list=PLeNNUmE-BlnE5GVCM_aZtWCLzCzHYA-ho&si=_ziFWzncOAjFoLFh',
        description: 'سوالف بزنس - يسرد تجارب شركات ناشئة متنوعة',
        pricing: 'free',
        setup_time: '1-2 hours',
        difficulty: 'intermediate'
      },
      {
        name: 'الكيانات القانونية للشركات الناشئة',
        type: 'guide',
        url: 'https://www.daftra.com/hub/%D8%A7%D9%84%D9%81%D8%B1%D9%82-%D8%A8%D9%8A%D9%86-%D8%A7%D9%84%D9%85%D8%A4%D8%B3%D8%B3%D8%A9-%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A9',
        description: 'تعلم عن الكيانات القانونية المختلفة للشركات الناشئة في السعودية',
        pricing: 'free',
        setup_time: '1-2 hours',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'team_structure', operator: 'equals', value: 'solo' }
    ]
  },

  // Money/business model recommendations  
  {
    id: 'focus_on_profitability',
    title: 'التركيز على الربحية',
    description: 'استراتيجيات لتحويل مشروعك إلى نموذج عمل مربح',
    category: 'accounting',
    priority: 'high',
    resources: [
      {
        name: 'دليل نماذج الأعمال المربحة',
        type: 'guide',
        description: 'كيفية بناء نموذج عمل مربح ومستدام',
        pricing: 'free',
        setup_time: '3-4 hours',
        difficulty: 'intermediate'
      },
      {
        name: 'قيود',
        type: 'tool',
        url: 'https://qoyod.com',
        description: 'برنامج محاسبة سحابي للشركات الناشئة',
        pricing: 'paid',
        setup_time: '1-2 hours',
        difficulty: 'beginner'
      }
    ],
    conditions: [
      { questionId: 'financial_status', operator: 'equals', value: 'seeking_funding' }
    ]
  },

  // Leadership and execution recommendations
  {
    id: 'improve_focus_strategy',
    title: 'تحسين استراتيجية التركيز',
    description: 'تعلم كيفية التركيز على الأولويات الأهم لنمو شركتك',
    category: 'operations',
    priority: 'high',
    resources: [
      {
        name: 'دليل إدارة الأولويات',
        type: 'guide',
        description: 'كيفية تحديد الأولويات والتركيز على ما يهم فعلاً',
        pricing: 'free',
        setup_time: '1-2 hours',
        difficulty: 'beginner'
      }
    ],
    conditions: [
      { questionId: 'execution_focus', operator: 'equals', value: 'exploration' }
    ]
  },
  {
    id: 'develop_strategic_thinking',
    title: 'تطوير التفكير الاستراتيجي',
    description: 'تعلم كيفية التخطيط الاستراتيجي بدلاً من ردود الأفعال',
    category: 'operations',
    priority: 'high',
    resources: [
      {
        name: 'دليل التخطيط الاستراتيجي',
        type: 'guide',
        description: 'أدوات وتقنيات للتخطيط الاستراتيجي الفعال',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'execution_focus', operator: 'equals', value: 'building_systems' }
    ]
  },

  // Competitive advantage recommendations
  {
    id: 'develop_competitive_advantage',
    title: 'تطوير الميزة التنافسية',
    description: 'كيفية اكتشاف وبناء ميزة تنافسية قوية ومستدامة',
    category: 'marketing',
    priority: 'high',
    resources: [
      {
        name: 'دليل الميزة التنافسية',
        type: 'guide',
        description: 'استراتيجيات لاكتشاف وتطوير ميزتك التنافسية الفريدة',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'competitive_position', operator: 'equals', value: 'crowded_market' }
    ]
  },

  // Product Development Stage Recommendations
  {
    id: 'launch_and_iterate',
    title: 'إطلاق المنتج وتحسينه',
    description: 'استراتيجيات لإطلاق منتجك بنجاح وتحسينه بناءً على ملاحظات المستخدمين',
    category: 'development',
    priority: 'high',
    resources: [
      {
        name: 'نشرة بريق',
        type: 'guide',
        url: 'https://gohodhod.com/@bareeq',
        description: 'نشرة تحتوي على أدوات ونصائح لإطلاق وتحسين المنتجات',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'intermediate'
      },
      {
        name: 'Tally',
        type: 'tool',
        url: 'https://tally.so/',
        description: 'أداة لجمع ملاحظات المستخدمين وتحليلها',
        pricing: 'freemium',
        setup_time: '1-2 hours',
        difficulty: 'beginner'
      }
    ],
    conditions: [
      { questionId: 'product_stage', operator: 'equals', value: 'launched' }
    ]
  },
  {
    id: 'scale_product',
    title: 'تطوير المنتج للنمو',
    description: 'تحسين المنتج والبنية التحتية لدعم النمو المتسارع',
    category: 'development',
    priority: 'high',
    resources: [
      {
        name: 'إدارة المنتجات',
        type: 'guide',
        url: 'https://abdelsalam.me/category/product-management/',
        description: 'مدونة تركز على إستراتيجيات التطوير والنمو والتوسّع',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'intermediate'
      },
      {
        name: 'بودكاست يونيكورن',
        type: 'guide',
        url: 'https://www.youtube.com/@Riyadi_Mukhtalif/videos',
        description: 'متخصص في الحديث عن الشركات التقنية من جانب التقنية و النمو',
        pricing: 'free',
        setup_time: '3-4 hours',
        difficulty: 'advanced'
      }
    ],
    conditions: [
      { questionId: 'product_stage', operator: 'equals', value: 'growing' }
    ]
  },

  // Team Structure Recommendations
  {
    id: 'build_strong_partnership',
    title: 'تطوير الشراكة القوية',
    description: 'نصائح لبناء علاقة شراكة فعالة ومستدامة',
    category: 'operations',
    priority: 'medium',
    resources: [
      {
        name: 'شراكات عمل ناجحة',
        type: 'guide',
        url: 'https://www.wafeq.com/ar/%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84/%D9%84%D8%A3%D8%B5%D8%AD%D8%A7%D8%A8-%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84/%D9%83%D9%8A%D9%81-%D8%AA%D8%A8%D9%86%D9%8A-%D8%B4%D8%B1%D8%A7%D9%83%D8%A7%D8%AA-%D8%B9%D9%85%D9%84-%D9%86%D8%A7%D8%AC%D8%AD%D8%A9-%D9%81%D9%8A-7-%D8%AE%D8%B7%D9%88%D8%A7%D8%AA',
        description: 'كيف تبني شراكات عمل ناجحة',
        pricing: 'free',
        setup_time: '4 minutes',
        difficulty: 'beginner'
      },
       {
        name: 'شراكات عمل ناجحة',
        type: 'guide',
        url: 'https://www.wafeq.com/ar/%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84/%D9%84%D8%A3%D8%B5%D8%AD%D8%A7%D8%A8-%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84/%D9%83%D9%8A%D9%81-%D8%AA%D8%A8%D9%86%D9%8A-%D8%B4%D8%B1%D8%A7%D9%83%D8%A7%D8%AA-%D8%B9%D9%85%D9%84-%D9%86%D8%A7%D8%AC%D8%AD%D8%A9-%D9%81%D9%8A-7-%D8%AE%D8%B7%D9%88%D8%A7%D8%AA',
        description: 'كيف تبني شراكات عمل ناجحة',
        pricing: 'free',
        setup_time: '4 minutes',
        difficulty: 'beginner'
      }
    ],
    conditions: [
      { questionId: 'team_structure', operator: 'equals', value: 'partnership' }
    ]
  },
  {
    id: 'team_management',
    title: 'إدارة الفريق والقيادة',
    description: 'أدوات وتقنيات لإدارة الفريق وتحسين الأداء',
    category: 'operations',
    priority: 'high',
    resources: [
      {
        name: 'أدوات إدارة المشاريع',
        type: 'tool',
        url: 'https://linear.app/',
        description: 'أدوات مثل Notion,Linear, Asana, أو Trello لإدارة المهام والمشاريع',
        pricing: 'freemium',
        setup_time: '2-3 hours',
        difficulty: 'beginner'
      },
      {
        name: 'القيادة والإدارة',
        type: 'guide',
        url: 'https://www.qoyod.com/ara/%D8%A7%D9%84%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D9%88%D8%A7%D9%84%D9%82%D9%8A%D8%A7%D8%AF%D8%A9/',
        description: 'كيف تصبح قائداً ملهمًا',
        pricing: 'free',
        setup_time: '6 minutes',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'team_structure', operator: 'equals', value: 'full_team' }
    ]
  },

  // Execution Focus Recommendations
  {
    id: 'accelerate_growth',
    title: 'تسريع النمو وجذب العملاء',
    description: 'استراتيجيات مثبتة لتسريع نمو العملاء والإيرادات',
    category: 'marketing',
    priority: 'high',
    resources: [
      {
        name: 'استراتيجيات التسويق الرقمي',
        type: 'guide',
        description: 'تقنيات التسويق الرقمي والنمو السريع',
        pricing: 'free',
        setup_time: '3-4 hours',
        difficulty: 'intermediate'
      },
      {
        name: 'أدوات التسويق والتحليل',
        type: 'tool',
        url: 'https://hubspot.com',
        description: 'أدوات شاملة للتسويق وإدارة العملاء',
        pricing: 'freemium',
        setup_time: '2-4 hours',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'execution_focus', operator: 'equals', value: 'accelerating' }
    ]
  },
  {
    id: 'scale_operations',
    title: 'تطوير العمليات للتوسع',
    description: 'بناء أنظمة وعمليات قابلة للتوسع لدعم النمو السريع',
    category: 'operations',
    priority: 'high',
    resources: [
      {
        name: 'دليل أتمتة العمليات',
        type: 'guide',
        description: 'كيفية أتمتة العمليات التشغيلية للتوسع',
        pricing: 'free',
        setup_time: '4-6 hours',
        difficulty: 'advanced'
      },
      {
        name: 'أدوات إدارة العمليات',
        type: 'tool',
        description: 'أدوات لأتمتة وإدارة العمليات التشغيلية',
        pricing: 'paid',
        setup_time: '1-2 weeks',
        difficulty: 'advanced'
      }
    ],
    conditions: [
      { questionId: 'execution_focus', operator: 'equals', value: 'scaling' }
    ]
  },

  // Financial Status Recommendations
  {
    id: 'test_revenue_models',
    title: 'تجريب نماذج الإيرادات',
    description: 'اختبار طرق مختلفة لتحقيق الإيرادات والعثور على الأنسب',
    category: 'accounting',
    priority: 'high',
    resources: [
      {
        name: 'دليل نماذج الإيرادات',
        type: 'guide',
        description: 'أنواع نماذج الإيرادات وكيفية اختبارها',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'financial_status', operator: 'equals', value: 'testing' }
    ]
  },
  {
    id: 'optimize_profitability',
    title: 'تحسين الربحية والكفاءة المالية',
    description: 'استراتيجيات لتحسين الهوامش الربحية وإدارة التكاليف',
    category: 'accounting',
    priority: 'high',
    resources: [
      {
        name: 'دليل إدارة التكاليف',
        type: 'guide',
        description: 'تقنيات تحسين الربحية وإدارة التكاليف',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'intermediate'
      },
      {
        name: 'وافق',
        type: 'tool',
        url: 'https://waafq.com',
        description: 'نظام محاسبة شامل للشركات الصغيرة والمتوسطة',
        pricing: 'paid',
        setup_time: '2-4 hours',
        difficulty: 'beginner'
      }
    ],
    conditions: [
      { questionId: 'financial_status', operator: 'equals', value: 'optimizing' }
    ]
  },
  {
    id: 'investment_and_expansion',
    title: 'الاستثمار والتوسع',
    description: 'استراتيجيات استثمار الأرباح في النمو والتوسع',
    category: 'funding',
    priority: 'high',
    resources: [
      {
        name: 'دليل استراتيجيات التوسع',
        type: 'guide',
        description: 'كيفية استثمار الأرباح في النمو المستدام',
        pricing: 'free',
        setup_time: '3-4 hours',
        difficulty: 'advanced'
      },
      {
        name: 'مركز ريادة الأعمال الرقمية (كود)',
        url: 'https://code.mcit.gov.sa/ar/our-services',
        type: 'accelerator',
        description: 'مبادرة حكومية لدعم وتمويل الشركات الناشئة في السعودية',
        pricing: 'free',
        setup_time: '4-8 weeks',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'financial_status', operator: 'equals', value: 'profitable' }
    ]
  },

  // Competitive Position Recommendations
  {
    id: 'gradual_competitive_improvement',
    title: 'تحسين الموقع التنافسي تدريجياً',
    description: 'استراتيجيات لتحسين منتجك والتنافس بفعالية أكبر',
    category: 'marketing',
    priority: 'medium',
    resources: [
      {
        name: 'تحليل المنافسين',
        type: 'guide',
        description: 'كيفية تحليل المنافسين وإيجاد الفجوات السوقية',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'intermediate'
      }
    ],
    conditions: [
      { questionId: 'competitive_position', operator: 'equals', value: 'gradual_improvement' }
    ]
  },
  {
    id: 'maintain_differentiation',
    title: 'الحفاظ على التميز التنافسي',
    description: 'استراتيجيات للحفاظ على ميزتك التنافسية وتطويرها',
    category: 'marketing',
    priority: 'medium',
    resources: [
      {
        name: 'دليل الابتكار المستمر',
        type: 'guide',
        description: 'كيفية الحفاظ على التقدم والابتكار',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'advanced'
      }
    ],
    conditions: [
      { questionId: 'competitive_position', operator: 'equals', value: 'clear_differentiation' }
    ]
  },
  {
    id: 'market_leadership_strategies',
    title: 'استراتيجيات الريادة السوقية',
    description: 'كيفية الحفاظ على موقعك كرائد في السوق والتوسع',
    category: 'marketing',
    priority: 'low',
    resources: [
      {
        name: 'دليل الريادة السوقية',
        type: 'guide',
        description: 'استراتيجيات للحفاظ على الريادة والتوسع في أسواق جديدة',
        pricing: 'free',
        setup_time: '3-4 hours',
        difficulty: 'advanced'
      }
    ],
    conditions: [
      { questionId: 'competitive_position', operator: 'equals', value: 'market_leadership' }
    ]
  }
];

export const getRecommendationsForAnswers = (answers: Record<string, string | string[] | number>): Recommendation[] => {
  return recommendations.filter(recommendation => 
    recommendation.conditions.every(condition => {
      const answer = answers[condition.questionId];
      if (!answer) return false;

      switch (condition.operator) {
        case 'equals':
          return answer === condition.value;
        case 'includes':
          return Array.isArray(answer) ? 
            answer.includes(condition.value as string) : 
            String(answer).includes(String(condition.value));
        case 'greater_than':
          return Number(answer) > Number(condition.value);
        case 'less_than':
          return Number(answer) < Number(condition.value);
        default:
          return false;
      }
    })
  );
};