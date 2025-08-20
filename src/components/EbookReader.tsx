
"use client";

import React, { useState } from 'react';
import { sections } from '../data/content';
import { useProgress } from '../hooks/useProgress';
import { AppHeader } from './AppHeader';
import { TableOfContents } from './TableOfContents';
import { ContentDisplay } from './ContentDisplay';
import { QuizPrompt } from './QuizPrompt';
import { Navigation } from './Navigation';

const EbookReader: React.FC = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  
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

  const handleQuizToggle = (show: boolean) => {
    setShowQuiz(show);
  };

  return (
    <main className="min-h-screen bg-background p-4" dir="rtl" role="main">
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
          onQuizComplete={handleQuizComplete}
          onQuizToggle={handleQuizToggle}
        />

        {!showQuiz && currentSection.quiz && currentSectionIndex !== 0 && (
          <QuizPrompt onStartQuiz={handleStartQuiz} />
        )}

        <Navigation
          currentIndex={currentSectionIndex}
          totalSections={sections.length}
          isCompleted={isCurrentSectionCompleted}
          showQuiz={showQuiz}
          onPrevious={prevSection}
          onNext={nextSection}
          onComplete={handleCompleteSection}
        />
      </div>
    </main>
  );
};

export default EbookReader;