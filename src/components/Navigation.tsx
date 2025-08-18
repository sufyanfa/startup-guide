import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { APP_CONSTANTS } from '../constants/index';
import { ShareButtons } from './ShareButtons';

interface NavigationProps {
  currentIndex: number;
  totalSections: number;
  isCompleted: boolean;
  showQuiz: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentIndex,
  totalSections,
  isCompleted,
  showQuiz,
  onPrevious,
  onNext,
  onComplete
}) => {
  const isLastPage = currentIndex === totalSections - 1;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronRight className="h-4 w-4" />
          {APP_CONSTANTS.PREVIOUS_CHAPTER}
        </Button>

        <div className="flex items-center gap-2">
          {!isCompleted && !showQuiz && (
            <Button
              onClick={onComplete}
              variant="outline"
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              {APP_CONSTANTS.COMPLETED_READ}
            </Button>
          )}
        </div>

        {!isLastPage && (
          <Button
            onClick={onNext}
            className="flex items-center gap-2"
          >
            {APP_CONSTANTS.NEXT_CHAPTER}
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {isLastPage && (
        <ShareButtons 
          title="دليل الشركات الناشئة"
          url={typeof window !== 'undefined' ? window.location.href : ''}
        />
      )}
    </div>
  );
};