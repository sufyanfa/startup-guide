"use client";
import { useState, useEffect, useCallback } from 'react';
import { AssessmentAnswer, Recommendation } from '../types/inedx';
import { getRecommendationsForAnswers } from '../data/resources';

interface AssessmentSession {
  sectionId: string;
  answers: Record<string, AssessmentAnswer>;
  recommendations: Recommendation[];
  completedAt: string;
}

const STORAGE_KEY = 'assessment_answers';
const SESSION_KEY = 'assessment_session';

export const useAssessmentAnswers = (sectionId: string) => {
  const [answers, setAnswers] = useState<Record<string, AssessmentAnswer>>({});
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load answers from localStorage on component mount
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem(`${SESSION_KEY}_${sectionId}`);
      if (storedSession) {
        const session: AssessmentSession = JSON.parse(storedSession);
        setAnswers(session.answers);
        setRecommendations(session.recommendations);
        setIsCompleted(true);
      }
    } catch (error) {
      console.warn('Failed to load assessment answers from localStorage:', error);
    }
  }, [sectionId]);

  // Save answer to localStorage and update state
  const saveAnswer = useCallback((questionId: string, answer: AssessmentAnswer) => {
    setAnswers(prevAnswers => {
      const newAnswers = {
        ...prevAnswers,
        [questionId]: answer
      };

      // Save to localStorage
      try {
        localStorage.setItem(`${STORAGE_KEY}_${sectionId}`, JSON.stringify(newAnswers));
      } catch (error) {
        console.warn('Failed to save answer to localStorage:', error);
      }

      return newAnswers;
    });
  }, [sectionId]);

  // Complete assessment and save session
  const completeAssessment = useCallback((finalAnswers: Record<string, AssessmentAnswer>) => {
    const answerValues = Object.fromEntries(
      Object.entries(finalAnswers).map(([key, answer]) => [key, answer.value])
    );
    
    const generatedRecommendations = getRecommendationsForAnswers(answerValues);
    
    const session: AssessmentSession = {
      sectionId,
      answers: finalAnswers,
      recommendations: generatedRecommendations,
      completedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(`${SESSION_KEY}_${sectionId}`, JSON.stringify(session));
    } catch (error) {
      console.warn('Failed to save assessment session to localStorage:', error);
    }

    setAnswers(finalAnswers);
    setRecommendations(generatedRecommendations);
    setIsCompleted(true);

    return generatedRecommendations;
  }, [sectionId]);

  // Clear all answers for this section
  const clearAnswers = useCallback(() => {
    try {
      localStorage.removeItem(`${STORAGE_KEY}_${sectionId}`);
      localStorage.removeItem(`${SESSION_KEY}_${sectionId}`);
    } catch (error) {
      console.warn('Failed to clear answers from localStorage:', error);
    }

    setAnswers({});
    setRecommendations([]);
    setIsCompleted(false);
  }, [sectionId]);

  // Clear all assessment data (for page reload)
  const clearAllAssessments = useCallback(() => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(STORAGE_KEY) || key.startsWith(SESSION_KEY)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear all assessments from localStorage:', error);
    }

    setAnswers({});
    setRecommendations([]);
    setIsCompleted(false);
  }, []);

  // Get answer for specific question
  const getAnswer = useCallback((questionId: string): AssessmentAnswer | undefined => {
    return answers[questionId];
  }, [answers]);

  // Check if question is answered
  const isQuestionAnswered = useCallback((questionId: string): boolean => {
    const answer = answers[questionId];
    if (!answer || answer.value === undefined || answer.value === '') {
      return false;
    }
    if (Array.isArray(answer.value)) {
      return answer.value.length > 0;
    }
    return true;
  }, [answers]);

  return {
    answers,
    recommendations,
    isCompleted,
    saveAnswer,
    completeAssessment,
    clearAnswers,
    clearAllAssessments,
    getAnswer,
    isQuestionAnswered
  };
};