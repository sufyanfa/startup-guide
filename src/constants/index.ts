export const QUIZ_SCORE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60
} as const;

export const QUIZ_MESSAGES = {
  EXCELLENT: 'ممتاز! لديك فهم عميق للمحتوى',
  GOOD: 'جيد! يمكنك مراجعة بعض النقاط',
  NEEDS_REVIEW: 'يحتاج إلى مراجعة المحتوى مرة أخرى'
} as const;

export const QUIZ_EMOJIS = {
  EXCELLENT: '🎉',
  GOOD: '👍',
  NEEDS_REVIEW: '📚'
} as const;

export const APP_CONSTANTS = {
  TITLE: 'دليل بناء الشركات الناشئة',
  TABLE_OF_CONTENTS: 'فهرس المحتويات',
  TEST_YOUR_KNOWLEDGE: 'اختبر فهمك!',
  START_QUIZ: 'ابدأ الاختبار',
  QUIZ_DESCRIPTION: 'بعد قراءة هذا الفصل، يمكنك اختبار مدى فهمك للمحتوى من خلال الأسئلة التفاعلية.',
  PREVIOUS_CHAPTER: 'الفصل السابق',
  NEXT_CHAPTER: 'الفصل التالي',
  COMPLETED_READ: 'تم القراءة',
  COMPLETED_PROGRESS: 'تم إكمال',
  EVALUATE: 'تقييم',
  OF: 'من',
  CHAPTERS: 'فصول',
  CHAPTER: 'الفصل'
} as const;

export const QUIZ_CONSTANTS = {
  QUESTION: 'السؤال',
  CORRECT_ANSWER: '✓ الإجابة الصحيحة:',
  YOUR_ANSWER: '✗ إجابتك:',
  EXPLANATION: 'التفسير:',
  QUIZ_COMPLETED: 'انتهيت من الاختبار!',
  CORRECT_ANSWERS_TEXT: 'حصلت على',
  CORRECT_ANSWERS: 'إجابات صحيحة',
  RETRY_QUIZ: 'أعد الاختبار',
  COMPLETE_CHAPTER: 'أكمل الفصل',
  BACK_TO_CONTENT: 'العودة للمحتوى',
  NEXT: 'التالي',
  FINISH_QUIZ: 'إنهاء الاختبار',
  SHOW_RESULTS: 'عرض النتائج',
  NEXT_QUESTION: 'السؤال التالي'
} as const;