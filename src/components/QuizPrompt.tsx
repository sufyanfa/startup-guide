import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Award } from 'lucide-react';
import { APP_CONSTANTS } from '../constants/index';

interface QuizPromptProps {
  onStartQuiz: () => void;
}

export const QuizPrompt: React.FC<QuizPromptProps> = ({ onStartQuiz }) => {
  return (
    <Card className="mb-6 bg-yellow-50 border-yellow-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Award className="h-6 w-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-yellow-800">
            {APP_CONSTANTS.TEST_YOUR_KNOWLEDGE}
          </h3>
        </div>
        <p className="text-yellow-700 mb-4">
          {APP_CONSTANTS.QUIZ_DESCRIPTION}
        </p>
        <Button 
          onClick={onStartQuiz}
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          {APP_CONSTANTS.START_QUIZ}
        </Button>
      </CardContent>
    </Card>
  );
};