
"use client";

import React, { useState } from 'react';
import { sections } from '../data/content';
import { useProgress } from '../hooks/useProgress';
import { AppHeader } from './AppHeader';
import { TableOfContents } from './TableOfContents';
import { ContentDisplay } from './ContentDisplay';
import { QuizPrompt } from './QuizPrompt';
import { AssessmentPrompt } from './AssessmentPrompt';
import { AssessmentCleaner } from './AssessmentCleaner';
import { Navigation } from './Navigation';
import { Consultation } from './Consultation';

const EbookReader: React.FC = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  
  const {
    progress,
    updateCurrentSection,
    completeSection,
    updateQuizScore,
    getProgressPercentage
  } = useProgress();

  const currentSection = sections[currentSectionIndex];
  const progressPercentage = getProgressPercentage(sections.length);
  const isCurrentSectionCompleted = progress.completedSections.has(currentSection.id);

  const goToSection = (index: number) => {
    setCurrentSectionIndex(index);
    setShowQuiz(false);
    setShowAssessment(false);
    updateCurrentSection(index);
  };

  const nextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      goToSection(currentSectionIndex + 1);
    }
  };

  const prevSection = () => {
    if (currentSectionIndex > 0) {
      goToSection(currentSectionIndex - 1);
    }
  };

  const handleCompleteSection = () => {
    completeSection(currentSection.id);
  };

  const handleQuizComplete = (score: number) => {
    updateQuizScore(currentSection.id, score);
    completeSection(currentSection.id);
    setShowQuiz(false);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleStartAssessment = () => {
    setShowAssessment(true);
  };

  const handleQuizToggle = (show: boolean) => {
    setShowQuiz(show);
  };

  const handleAssessmentToggle = (show: boolean) => {
    setShowAssessment(show);
  };

  const handleAssessmentComplete = () => {
    // Complete the section when assessment generates recommendations
    completeSection(currentSection.id);
    // Keep assessment visible to show recommendations, but allow navigation
  };

  return (
    <main className="min-h-screen bg-background p-4" dir="rtl" role="main">
      <AssessmentCleaner />
      <div className="max-w-4xl mx-auto">
        <AppHeader
          progressPercentage={progressPercentage}
          completedSections={progress.completedSections.size}
          totalSections={sections.length}
        />

        <TableOfContents
          sections={sections}
          currentSectionIndex={currentSectionIndex}
          progress={progress}
          onSectionSelect={goToSection}
        />

        <ContentDisplay
          section={currentSection}
          sectionIndex={currentSectionIndex}
          totalSections={sections.length}
          showQuiz={showQuiz}
          showAssessment={showAssessment}
          onQuizComplete={handleQuizComplete}
          onAssessmentComplete={handleAssessmentComplete}
          onQuizToggle={handleQuizToggle}
          onAssessmentToggle={handleAssessmentToggle}
        />

        {currentSection.consultation && (
          <Consultation
            title={currentSection.consultation.title}
            description={currentSection.consultation.description}
            cta={currentSection.consultation.cta}
            features={currentSection.consultation.features}
            contactUrl={currentSection.consultation.contactUrl}
          />
        )}

        {!showQuiz && !showAssessment && currentSection.quiz && currentSectionIndex !== 0 && currentSectionIndex !== sections.length - 1 && (
          <QuizPrompt onStartQuiz={handleStartQuiz} />
        )}
        
        {!showQuiz && !showAssessment && currentSection.assessment && currentSectionIndex !== 0 && currentSectionIndex !== sections.length - 1 && (
          <AssessmentPrompt onStartAssessment={handleStartAssessment} />
        )}

        <Navigation
          currentIndex={currentSectionIndex}
          totalSections={sections.length}
          isCompleted={isCurrentSectionCompleted}
          showQuiz={showQuiz || showAssessment}
          onPrevious={prevSection}
          onNext={nextSection}
          onComplete={handleCompleteSection}
        />
      </div>
    </main>
  );
};

export default EbookReader;