import React from 'react';
import { Progress } from './ui/progress';
import { BookOpen } from 'lucide-react';
import { APP_CONSTANTS } from '../constants/index';
import { ThemeToggle } from './ThemeToggle';

interface AppHeaderProps {
  progressPercentage: number;
  completedSections: number;
  totalSections: number;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  progressPercentage,
  completedSections,
  totalSections
}) => {
  return (
    <header className="text-center mb-8" role="banner">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {APP_CONSTANTS.TITLE}
          </h1>
        </div>
        <ThemeToggle />
      </div>
      <div aria-label="تقدم القراءة">
        <Progress 
          value={progressPercentage} 
          className="w-full max-w-md mx-auto" 
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">
          {APP_CONSTANTS.COMPLETED_PROGRESS} {completedSections} {APP_CONSTANTS.OF} {totalSections} {APP_CONSTANTS.CHAPTERS}
        </p>
      </div>
    </header>
  );
};