import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight, CheckCircle, ChevronLeft } from 'lucide-react';
import { APP_CONSTANTS } from '../constants/index';
import { ShareButtons } from './ShareButtons';
import { FeedbackModal } from './FeedbackModal';

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
  showQuiz,
  onPrevious,
  onNext,
  onComplete
}) => {
  const isLastPage = currentIndex === totalSections - 1;
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleMarkAsRead = () => {
    if (isLastPage) {
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('EVALUATE');
      }
      setShowFeedbackModal(true);
    } else {
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track('NEXT_CHAPTER');
      }
      onNext();
      setTimeout(() => {
        onComplete();
      }, 50);
    }
  };

  const handleFeedbackSubmit = () => {
    onComplete();
  };
  
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
          <Button
            onClick={handleMarkAsRead}
            className="flex items-center gap-2"
          >
            {isLastPage ? APP_CONSTANTS.EVALUATE : APP_CONSTANTS.NEXT_CHAPTER}
            {isLastPage ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {isLastPage && (
        <ShareButtons 
          title="دليل الشركات الناشئة"
          url={typeof window !== 'undefined' ? window.location.href : ''}
        />
      )}
      
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};