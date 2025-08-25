import { Recommendation, Resource } from '../types/inedx';

export const resources: Resource[] = [
  // Accounting Tools
  {
    name: 'وافق',
    type: 'tool',
    url: 'https://waafq.com',
    description: 'نظام محاسبة شامل للشركات الصغيرة والمتوسطة',
    pricing: 'paid',
    setup_time: '2-4 hours',
    difficulty: 'beginner'
  },
  {
    name: 'قيود',
    type: 'tool',
    url: 'https://qoyod.com',
    description: 'برنامج محاسبة سحابي للشركات الناشئة',
    pricing: 'paid',
    setup_time: '1-2 hours',
    difficulty: 'beginner'
  },

  // Marketing Tools
  {
    name: 'Semrush',
    type: 'tool',
    url: 'https://semrush.com',
    description: 'أداة تحسين محركات البحث والتسويق الرقمي',
    pricing: 'paid',
    setup_time: '2-3 hours',
    difficulty: 'intermediate'
  },
  {
    name: 'HubSpot',
    type: 'tool',
    url: 'https://hubspot.com',
    description: 'أداة إدارة علاقات العملاء والتسويق',
    pricing: 'freemium',
    setup_time: '1-2 hours',
    difficulty: 'beginner'
  },
  {
    name: 'Google Analytics',
    type: 'tool',
    url: 'https://analytics.google.com',
    description: 'تحليل زوار الموقع والتسويق الرقمي',
    pricing: 'free',
    setup_time: '2-4 hours',
    difficulty: 'intermediate'
  },
  {
    name: 'Mixpanel',
    type: 'tool',
    url: 'https://mixpanel.com',
    description: 'تحليل سلوك المستخدمين في التطبيقات والمواقع',
    pricing: 'freemium',
    setup_time: '1-2 hours',
    difficulty: 'intermediate'
  },

  // Development Tools
  {
    name: 'framer',
    type: 'tool',
    url: 'https://framer.com',
    description: 'بناء المواقع بدون برمجة',
    pricing: 'freemium',
    setup_time: '4-8 hours',
    difficulty: 'intermediate'
  },
  {
    name: 'Figma Make',
    type: 'tool',
    url: 'https://www.figma.com/make/',
    description: 'تحويل الأفكار إلى تصميمات تفاعلية بإستخدام الذكاء الاصطناعي',
    pricing: 'freemium',
    setup_time: '2-4 hours',
    difficulty: 'beginner'
  },
  {
    name: 'Base44',
    type: 'tool',
    url: 'https://base44.com',
    description: 'منصة لبناء التطبيقات بدون كود',
    pricing: 'paid',
    setup_time: '4-8 hours',
    difficulty: 'intermediate'
  },

  // Funding Resources
  {
    name: 'مركز ريادة الأعمال الورقمية (كود)',
    url: 'https://code.mcit.gov.sa/ar/our-services',
    type: 'accelerator',
    description: 'مبادرة حكومية لدعم وتمويل الشركات الناشئة في السعودية',
    pricing: 'free',
    setup_time: '4-8 weeks',
    difficulty: 'intermediate'
  },
  {
    name: 'inspireU',
    type: 'accelerator',
    url: 'https://inspireu.com.sa',
    description: 'مسرعة أعمال تدعم الشركات الناشئة في مراحلها المبكرة',
    pricing: 'free',
    setup_time: '2-3 hours',
    difficulty: 'intermediate'
  }
];

export const recommendations: Recommendation[] = [
  // Idea validation recommendations
  {
    id: 'idea_validation_help',
    title: 'تحقق من صحة فكرتك قبل البناء',
    description: 'بناءً على مرحلة فكرتك، إليك الخطوات العملية للتحقق من صحتها',
    category: 'marketing',
    priority: 'high',
    resources: [
      {
        name: 'دليل تحقق الأفكار',
        type: 'guide',
        description: 'خطوات عملية لتحقق من صحة فكرة مشروعك',
        pricing: 'free',
        setup_time: '3-5 hours',
        difficulty: 'beginner'
      },
      resources.find(r => r.name === 'Google Analytics')!
    ],
    conditions: [
      { questionId: 'startup_stage', operator: 'equals', value: 'just_idea' }
    ]
  },
  {
    id: 'problem_validation_weak',
    title: 'عزز من عملية تحقق المشكلة',
    description: 'يبدو أنك تحتاج لتعزيز عملية التحقق من المشكلة التي تحلها',
    category: 'marketing',
    priority: 'high',
    resources: [
      {
        name: 'دليل مقابلات العملاء',
        type: 'guide',
        description: 'كيفية إجراء مقابلات فعالة مع العملاء المحتملين',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'beginner'
      }
    ],
    conditions: [
      { questionId: 'problem_validation', operator: 'equals', value: 'not_validated' }
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
        name: 'دليل دورة التعلم السريع',
        type: 'guide',
        description: 'كيفية تطبيق دورة بناء-قياس-تعلم بفعالية',
        pricing: 'free',
        setup_time: '2-3 hours',
        difficulty: 'intermediate'
      },
      resources.find(r => r.name === 'Google Analytics')!
    ],
    conditions: [
      { questionId: 'user_feedback', operator: 'equals', value: 'rarely' }
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
        description: 'كيفية العثور على شريك مؤسس متوافق ومتفرغ',
        pricing: 'free',
        setup_time: '1-2 hours',
        difficulty: 'beginner'
      }
    ],
    conditions: [
      { questionId: 'cofounder_status', operator: 'equals', value: 'looking' }
    ]
  },
  {
    id: 'team_commitment_issue',
    title: 'زيادة التفرغ والالتزام',
    description: 'استراتيجيات لزيادة تفرغ الفريق والتركيز على المشروع',
    category: 'operations',
    priority: 'high',
    resources: [
      {
        name: 'دليل إدارة الوقت لرواد الأعمال',
        type: 'guide',
        description: 'كيفية تنظيم الوقت والانتقال للعمل بدوام كامل',
        pricing: 'free',
        setup_time: '1-2 hours',
        difficulty: 'beginner'
      }
    ],
    conditions: [
      { questionId: 'team_commitment', operator: 'equals', value: 'parttime' }
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
      resources.find(r => r.name === 'قيود')!
    ],
    conditions: [
      { questionId: 'money_path', operator: 'equals', value: 'no_clear_path' }
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
      { questionId: 'competitive_advantage', operator: 'equals', value: 'no_clear_advantage' }
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