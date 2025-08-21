export interface Section {
  id: string;
  title: string;
  content: string;
  quiz?: Quiz;
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

export interface Progress {
  currentSection: number;
  completedSections: Set<string>;
  quizScores: Record<string, number>;
}

export type QuizScore = {
  sectionId: string;
  score: number;
  completedAt: Date;
};

export type AnswerStatus = 'default' | 'correct' | 'incorrect';

export type ScoreLevel = 'excellent' | 'good' | 'needs_review';