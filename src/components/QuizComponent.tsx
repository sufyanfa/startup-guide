"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { Quiz } from '@/types/inedx';
import { 
  QUIZ_SCORE_THRESHOLDS, 
  QUIZ_MESSAGES, 
  QUIZ_EMOJIS, 
  QUIZ_CONSTANTS 
} from '../constants/index';

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
  onBack: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quiz, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = {
        ...answers,
        [currentQuestion.id]: selectedAnswer
      };
      setAnswers(newAnswers);
      setShowExplanation(true);
    }
  };

  const moveToNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const calculateScore = () => {
    const correctAnswers = quiz.questions.filter(
      question => answers[question.id] === question.correctAnswer
    ).length;
    return (correctAnswers / quiz.questions.length) * 100;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const getAnswerStatus = (answerIndex: number) => {
    if (!showExplanation) return 'default';
    if (answerIndex === currentQuestion.correctAnswer) return 'correct';
    if (answerIndex === selectedAnswer && answerIndex !== currentQuestion.correctAnswer) return 'incorrect';
    return 'default';
  };

  const getScoreMessage = (score: number) => {
    if (score >= QUIZ_SCORE_THRESHOLDS.EXCELLENT) return QUIZ_MESSAGES.EXCELLENT;
    if (score >= QUIZ_SCORE_THRESHOLDS.GOOD) return QUIZ_MESSAGES.GOOD;
    return QUIZ_MESSAGES.NEEDS_REVIEW;
  };

  const getScoreEmoji = (score: number) => {
    if (score >= QUIZ_SCORE_THRESHOLDS.EXCELLENT) return QUIZ_EMOJIS.EXCELLENT;
    if (score >= QUIZ_SCORE_THRESHOLDS.GOOD) return QUIZ_EMOJIS.GOOD;
    return QUIZ_EMOJIS.NEEDS_REVIEW;
  };

  if (showResults) {
    const score = calculateScore();
    const correctCount = quiz.questions.filter(
      question => answers[question.id] === question.correctAnswer
    ).length;

    return (
      <div className="text-center space-y-6">
        <div className="mb-6">
          <div className="text-6xl mb-4">
            {getScoreEmoji(score)}
          </div>
          <h2 className="text-2xl font-bold mb-2">{QUIZ_CONSTANTS.QUIZ_COMPLETED}</h2>
          <p className="text-gray-600">
            {QUIZ_CONSTANTS.CORRECT_ANSWERS_TEXT} {correctCount} من {quiz.questions.length} {QUIZ_CONSTANTS.CORRECT_ANSWERS}
          </p>
        </div>

        <div className="bg-primary/10 rounded-md p-6">
          <div className="text-4xl font-bold text-primary mb-2">
            {Math.round(score)}%
          </div>
          <p className="text-sm text-gray-600">
            {getScoreMessage(score)}
          </p>
        </div>

        <div className="space-y-4">
          {quiz.questions.map((question) => (
            <Card key={question.id} className="text-right">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {answers[question.id] === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">{question.text}</p>
                    <div className="text-sm space-y-1">
                      <p className="text-green-600">
                        {QUIZ_CONSTANTS.CORRECT_ANSWER} {question.options[question.correctAnswer]}
                      </p>
                      {answers[question.id] !== question.correctAnswer && (
                        <p className="text-red-600">
                          {QUIZ_CONSTANTS.YOUR_ANSWER} {question.options[answers[question.id]]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={resetQuiz} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            {QUIZ_CONSTANTS.RETRY_QUIZ}
          </Button>
          <Button onClick={() => onComplete(score)} className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            {QUIZ_CONSTANTS.COMPLETE_CHAPTER}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right">{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            className="space-y-3"
            disabled={showExplanation}
          >
            {currentQuestion.options.map((option, index) => {
              const status = getAnswerStatus(index);
              return (
                <div
                  key={index}
                  className={`flex items-center justify-end space-x-2 space-x-reverse p-3 rounded-md border transition-colors ${
                    status === 'correct' ? 'bg-green-50 border-green-300' :
                    status === 'incorrect' ? 'bg-red-50 border-red-300' :
                    'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                  }`}
                  dir="rtl"
                >
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-right leading-relaxed">
                    {option}
                  </Label>
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  {showExplanation && status === 'correct' && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {showExplanation && status === 'incorrect' && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              );
            })}
          </RadioGroup>

          {/* Explanation */}
          {showExplanation && currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">{QUIZ_CONSTANTS.EXPLANATION}</h4>
              <p className="text-blue-700 text-sm">{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="flex items-center justify-between">
        <Badge variant="outline">
          {QUIZ_CONSTANTS.QUESTION} {currentQuestionIndex + 1} من {quiz.questions.length}
        </Badge>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          {QUIZ_CONSTANTS.BACK_TO_CONTENT}
        </Button>
        
        <div className="space-x-2 space-x-reverse">
          {!showExplanation ? (
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="flex items-center gap-2"
            >
              {isLastQuestion ? QUIZ_CONSTANTS.FINISH_QUIZ : QUIZ_CONSTANTS.NEXT}
              <ArrowLeft className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={moveToNextQuestion}
              className="flex items-center gap-2"
            >
              {isLastQuestion ? QUIZ_CONSTANTS.SHOW_RESULTS : QUIZ_CONSTANTS.NEXT_QUESTION}
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;