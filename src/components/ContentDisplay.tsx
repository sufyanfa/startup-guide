import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Section } from '../types/inedx';
import { formatContent } from '../utils/contentFormatter';
import { APP_CONSTANTS } from '../constants/index';
import QuizComponent from './QuizComponent';
import AssessmentComponent from './AssessmentComponent';
import { Story } from './Story';
import Image from 'next/image';

interface ContentDisplayProps {
  section: Section;
  sectionIndex: number;
  totalSections: number;
  showQuiz: boolean;
  showAssessment: boolean;
  onQuizComplete: (score: number) => void;
  onAssessmentComplete: () => void;
  onQuizToggle: (show: boolean) => void;
  onAssessmentToggle: (show: boolean) => void;
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({
  section,
  sectionIndex,
  totalSections,
  showQuiz,
  showAssessment,
  onQuizComplete,
  onAssessmentComplete,
  onQuizToggle,
  onAssessmentToggle
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
          ) : showAssessment && section.assessment ? (
            <section aria-label="تقييم الوضع الحالي">
              <AssessmentComponent
                assessment={section.assessment}
                sectionId={section.id}
                onBack={() => {
                  onAssessmentToggle(false);
                  onAssessmentComplete();
                }}
              />
            </section>
          ) : (
            <>
              {section.image && (
                <div className="mb-6">
                  <Image
                    width={800}
                    height={400}
                    src={section.image} 
                    alt={section.title}
                    className="w-full h-auto rounded-lg shadow-md"
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
              )}
              <section className="prose prose-lg max-w-none" aria-label="محتوى الفصل">
                {formatContent(section.content)}
              </section>
              
              {section.stories && section.stories.length > 0 && (
                <section className="mt-8" aria-label="قصص نجاح">
                  <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                    🌟 قصة نجاح
                  </h3>
                  {section.stories.map((story, index) => (
                    <Story
                      key={index}
                      company={story.company}
                      founder={story.founder}
                      story={story.story}
                      lesson={story.lesson}
                      icon={story.icon}
                    />
                  ))}
                </section>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </article>
  );
};