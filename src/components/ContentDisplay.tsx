import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Section } from '../types/index';
import { formatContent } from '../utils/contentFormatter';
import { APP_CONSTANTS } from '../constants/index';
import QuizComponent from './QuizComponent';

interface ContentDisplayProps {
  section: Section;
  sectionIndex: number;
  totalSections: number;
  showQuiz: boolean;
  onQuizComplete: (score: number) => void;
  onQuizToggle: (show: boolean) => void;
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({
  section,
  sectionIndex,
  totalSections,
  showQuiz,
  onQuizComplete,
  onQuizToggle
}) => {
  return (
    <article className="mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <Badge variant="outline" className="text-sm">
              {APP_CONSTANTS.CHAPTER} {sectionIndex + 1} {APP_CONSTANTS.OF} {totalSections}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showQuiz && section.quiz ? (
            <section aria-label="اختبار المعرفة">
              <QuizComponent
                quiz={section.quiz}
                onComplete={onQuizComplete}
                onBack={() => onQuizToggle(false)}
              />
            </section>
          ) : (
            <section className="prose prose-lg max-w-none" aria-label="محتوى الفصل">
              {formatContent(section.content)}
            </section>
          )}
        </CardContent>
      </Card>
    </article>
  );
};