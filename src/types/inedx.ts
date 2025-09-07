export interface Section {
  id: string;
  title: string;
  content: string;
  image?: string; // Image URL for the section
  quiz?: Quiz; // Legacy - kept for backward compatibility
  assessment?: Assessment; // New assessment system
  stories?: Story[];
  consultation?: Consultation;
}

export interface Consultation {
  title: string;
  description: string;
  cta: string;
  features: string[];
  contactUrl?: string;
}

export interface Story {
  company: string;
  founder: string;
  story: string;
  lesson: string;
  icon?: 'lightbulb' | 'trending' | 'users';
}

// Legacy Quiz interface - kept for backward compatibility
export interface Quiz {
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// New Assessment interfaces
export interface Assessment {
  questions: AssessmentQuestion[];
  title: string;
  description: string;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'single_select' | 'multi_select' | 'text_input' | 'scale' | 'location';
  options?: AssessmentOption[];
  scaleRange?: { min: number; max: number; labels?: { [key: number]: string } };
  followUp?: { [key: string]: string }; // Maps answer values to next question IDs
  required?: boolean;
}

export interface AssessmentOption {
  value: string;
  label: string;
  description?: string;
}

export interface AssessmentAnswer {
  questionId: string;
  value: string | string[] | number;
  text?: string; // For text inputs
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'accounting' | 'legal' | 'marketing' | 'development' | 'funding' | 'operations';
  priority: 'high' | 'medium' | 'low';
  resources: Resource[];
  conditions: RecommendationCondition[];
}

export interface Resource {
  name: string;
  type: 'tool' | 'guide' | 'accelerator' | 'service' | 'course' | 'checklist';
  url?: string;
  description: string;
  pricing?: 'free' | 'paid' | 'freemium';
  setup_time?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface RecommendationCondition {
  questionId: string;
  operator: 'equals' | 'includes' | 'greater_than' | 'less_than';
  value: string | number;
}

export interface Progress {
  currentSection: number;
  completedSections: Set<string>;
  quizScores: Record<string, number>;
}
