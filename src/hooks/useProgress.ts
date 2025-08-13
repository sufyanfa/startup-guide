import { useState, useEffect } from 'react';
import { Progress as ProgressType } from '../types/inedx';

const PROGRESS_STORAGE_KEY = 'ebook_progress';

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressType>({
    currentSection: 0,
    completedSections: new Set(),
    quizScores: {}
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress({
          ...parsed,
          completedSections: new Set(parsed.completedSections || [])
        });
      } catch (error) {
        console.error('Error parsing saved progress:', error);
      }
    }
  }, []);

  const saveProgress = (newProgress: ProgressType) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({
        ...newProgress,
        completedSections: Array.from(newProgress.completedSections)
      }));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const updateCurrentSection = (sectionIndex: number) => {
    const newProgress = { ...progress, currentSection: sectionIndex };
    saveProgress(newProgress);
  };

  const completeSection = (sectionId: string) => {
    const newCompletedSections = new Set(progress.completedSections);
    newCompletedSections.add(sectionId);
    const newProgress = {
      ...progress,
      completedSections: newCompletedSections
    };
    saveProgress(newProgress);
  };

  const updateQuizScore = (sectionId: string, score: number) => {
    const newProgress = {
      ...progress,
      quizScores: {
        ...progress.quizScores,
        [sectionId]: score
      }
    };
    saveProgress(newProgress);
  };

  const getProgressPercentage = (totalSections: number) => {
    return (progress.completedSections.size / totalSections) * 100;
  };

  return {
    progress,
    updateCurrentSection,
    completeSection,
    updateQuizScore,
    getProgressPercentage
  };
};