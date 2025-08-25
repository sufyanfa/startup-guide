"use client";
import { useEffect } from 'react';

const LAST_VISIT_KEY = 'assessment_last_visit';
const CLEAR_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

export const AssessmentCleaner: React.FC = () => {
  useEffect(() => {
    const now = Date.now();
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    
    // If no last visit recorded, or if more than 5 minutes have passed, clear assessments
    if (!lastVisit || now - parseInt(lastVisit) > CLEAR_THRESHOLD) {
      clearAllAssessmentData();
    }
    
    // Update last visit time
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
    
    // Set up beforeunload to update last visit time
    const handleBeforeUnload = () => {
      localStorage.setItem(LAST_VISIT_KEY, Date.now().toString());
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const clearAllAssessmentData = () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('assessment_answers_') || 
            key.startsWith('assessment_session_')) {
          localStorage.removeItem(key);
        }
      });
      console.log('Assessment data cleared due to page reload/timeout');
    } catch (error) {
      console.warn('Failed to clear assessment data:', error);
    }
  };

  return null; // This component renders nothing
};