"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { CheckCircle, ArrowLeft, ArrowRight, FileText, ExternalLink, Clock, DollarSign, BarChart3, Users, RotateCcw, Check } from 'lucide-react';
import { Assessment, AssessmentAnswer, Recommendation } from '@/types/inedx';
import { useAssessmentAnswers } from '../hooks/useAssessmentAnswers';
import { ASSESSMENT_CONSTANTS } from '../constants/assessment';

interface AssessmentComponentProps {
  assessment: Assessment;
  sectionId: string;
  onComplete: (recommendations: Recommendation[]) => void;
  onBack: () => void;
}

const AssessmentComponent: React.FC<AssessmentComponentProps> = ({ 
  assessment, 
  sectionId,
  onComplete, 
  onBack 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const {
    answers,
    recommendations,
    isCompleted,
    saveAnswer,
    completeAssessment,
    clearAnswers,
    getAnswer,
    isQuestionAnswered
  } = useAssessmentAnswers(sectionId);
  
  // Initialize show results based on completion status
  useEffect(() => {
    if (isCompleted) {
      setShowResults(true);
    }
  }, [isCompleted]);

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessment.questions.length - 1;
  const currentAnswer = getAnswer(currentQuestion.id);

  const handleAnswerChange = (value: string | string[] | number, text?: string) => {
    const newAnswer: AssessmentAnswer = {
      questionId: currentQuestion.id,
      value,
      text
    };
    saveAnswer(currentQuestion.id, newAnswer);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      generateRecommendations();
      // Don't call onComplete here - only call it when user clicks "Complete Chapter" button
    } else {
      // Check for follow-up questions
      const followUpQuestionId = currentQuestion.followUp?.[String(currentAnswer?.value)];
      if (followUpQuestionId) {
        const followUpIndex = assessment.questions.findIndex(q => q.id === followUpQuestionId);
        if (followUpIndex !== -1) {
          setCurrentQuestionIndex(followUpIndex);
          return;
        }
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const generateRecommendations = () => {
    const generatedRecommendations = completeAssessment(answers);
    setShowResults(true);
    return generatedRecommendations;
  };

  const isAnswerComplete = () => {
    if (!currentQuestion.required) return true;
    return isQuestionAnswered(currentQuestion.id);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      accounting: <DollarSign className="h-5 w-5" />,
      legal: <FileText className="h-5 w-5" />,
      marketing: <BarChart3 className="h-5 w-5" />,
      development: <Users className="h-5 w-5" />,
      funding: <DollarSign className="h-5 w-5" />,
      operations: <Users className="h-5 w-5" />
    };
    return iconMap[category] || <FileText className="h-5 w-5" />;
  };

  const getPriorityColor = (priority: string) => {
    const colorMap: Record<string, string> = {
      high: 'border-gary-200 bg-gray-50',
      medium: 'border-yellow-200 bg-yellow-50',
      low: 'border-green-200 bg-green-50'
    };
    return colorMap[priority] || 'border-gray-200 bg-gray-50';
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'single_select':
        return (
          <RadioGroup
            value={String(currentAnswer?.value || '')}
            onValueChange={(value) => handleAnswerChange(value)}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-end space-x-2 space-x-reverse p-3 rounded-md border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                dir="rtl"
              >
                <div className="flex-1">
                  <Label htmlFor={option.value} className="cursor-pointer text-right">
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                    )}
                  </Label>
                </div>
                <RadioGroupItem value={option.value} id={option.value} />
              </div>
            ))}
          </RadioGroup>
        );

      case 'multi_select':
        const selectedValues = (currentAnswer?.value as string[]) || [];
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-end space-x-2 space-x-reverse p-3 rounded-md border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                dir="rtl"
              >
                <Label htmlFor={option.value} className="flex-1 cursor-pointer text-right">
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                  )}
                </Label>
                <Checkbox
                  id={option.value}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) => {
                    const newValues = checked
                      ? [...selectedValues, option.value]
                      : selectedValues.filter(v => v !== option.value);
                    handleAnswerChange(newValues);
                  }}
                />
              </div>
            ))}
          </div>
        );

      case 'text_input':
        return (
          <div className="space-y-4">
            <Input
              placeholder="اكتب إجابتك هنا..."
              value={String(currentAnswer?.value || '')}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="text-right"
              dir="rtl"
            />
          </div>
        );

      case 'scale':
        const scaleValue = Number(currentAnswer?.value || currentQuestion.scaleRange?.min || 1);
        return (
          <div className="space-y-6">
            <div className="px-4">
              <Slider
                value={[scaleValue]}
                onValueChange={(value) => handleAnswerChange(value[0])}
                min={currentQuestion.scaleRange?.min || 1}
                max={currentQuestion.scaleRange?.max || 5}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 px-2">
              {currentQuestion.scaleRange?.labels && 
                Object.entries(currentQuestion.scaleRange.labels).map(([num, label]) => (
                  <div key={num} className={`text-center ${Number(num) === scaleValue ? 'font-bold text-primary' : ''}`}>
                    <div>{num}</div>
                    <div className="text-xs">{label}</div>
                  </div>
                ))
              }
            </div>
            <div className="text-center">
              <Badge variant="outline">
                {ASSESSMENT_CONSTANTS.SELECTED_VALUE}: {scaleValue}
              </Badge>
            </div>
          </div>
        );

      default:
        return <div>نوع السؤال غير مدعوم</div>;
    }
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            <CheckCircle className="mx-auto text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{ASSESSMENT_CONSTANTS.ASSESSMENT_COMPLETE}</h2>
          <p className="text-gray-600">{ASSESSMENT_CONSTANTS.RECOMMENDATIONS_BASED_ON_ANSWERS}</p>
        </div>

        {recommendations.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">{ASSESSMENT_CONSTANTS.NO_SPECIFIC_RECOMMENDATIONS}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {recommendations.map((recommendation) => (
              <Card key={recommendation.id} className={`${getPriorityColor(recommendation.priority)}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(recommendation.category)}
                      <div>
                        <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                        <Badge variant={recommendation.priority === 'high' ? 'destructive' : 
                                     recommendation.priority === 'medium' ? 'default' : 'secondary'}>
                          {recommendation.priority === 'high' ? 'أولوية عالية' :
                           recommendation.priority === 'medium' ? 'أولوية متوسطة' : 'أولوية منخفضة'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{recommendation.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">{ASSESSMENT_CONSTANTS.RECOMMENDED_RESOURCES}:</h4>
                    {recommendation.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{resource.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {resource.type === 'tool' ? 'أداة' : 
                               resource.type === 'guide' ? 'دليل' :
                               resource.type === 'service' ? 'خدمة' : 
                               resource.type === 'course' ? 'دورة' : 'مسرع'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            {resource.pricing && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {resource.pricing === 'free' ? 'مجاني' : 
                                 resource.pricing === 'paid' ? 'مدفوع' : 'مجاني + مدفوع'}
                              </div>
                            )}
                            {resource.setup_time && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {resource.setup_time}
                              </div>
                            )}
                          </div>
                        </div>
                        {resource.url && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Button onClick={() => {
            clearAnswers();
            setCurrentQuestionIndex(0);
            setShowResults(false);
          }} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            {ASSESSMENT_CONSTANTS.RETAKE_ASSESSMENT}
          </Button>
          <Button onClick={() => onComplete(recommendations)}>
            {ASSESSMENT_CONSTANTS.COMPLETE_CHAPTER}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-right">{currentQuestion.text}</CardTitle>
          {currentQuestion.required && (
            <p className="text-sm text-red-600 text-right">* {ASSESSMENT_CONSTANTS.REQUIRED_FIELD}</p>
          )}
        </CardHeader>
        <CardContent>
          {renderQuestion()}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {ASSESSMENT_CONSTANTS.QUESTION} {currentQuestionIndex + 1} من {assessment.questions.length}
          </Badge>
          {isQuestionAnswered(currentQuestion.id) && (
            <div className="flex items-center gap-1 text-green-600 text-xs">
              <Check className="h-3 w-3" />
              {ASSESSMENT_CONSTANTS.SAVED}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          {ASSESSMENT_CONSTANTS.BACK_TO_CONTENT}
        </Button>
        
        <div className="flex gap-2">
          {currentQuestionIndex > 0 && (
            <Button onClick={handlePrevious} variant="outline">
              <ArrowRight className="h-4 w-4 mr-2" />
              {ASSESSMENT_CONSTANTS.PREVIOUS}
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={currentQuestion.required && !isAnswerComplete()}
            className="flex items-center gap-2"
          >
            {isLastQuestion ? ASSESSMENT_CONSTANTS.GET_RECOMMENDATIONS : ASSESSMENT_CONSTANTS.NEXT}
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentComponent;