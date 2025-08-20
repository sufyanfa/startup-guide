import React from 'react';
import { Card, CardContent } from './ui/card';
import { Lightbulb, TrendingUp, Users } from 'lucide-react';

interface StoryProps {
  company: string;
  founder: string;
  story: string;
  lesson: string;
  icon?: 'lightbulb' | 'trending' | 'users';
}

export const Story: React.FC<StoryProps> = ({ 
  company, 
  founder, 
  story, 
  lesson,
  icon = 'lightbulb' 
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'lightbulb':
        return <Lightbulb className="w-6 h-6 text-green-600" />;
      case 'trending':
        return <TrendingUp className="w-6 h-6 text-green-600" />;
      case 'users':
        return <Users className="w-6 h-6 text-green-600" />;
      default:
        return <Lightbulb className="w-6 h-6 text-green-600" />;
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            {getIcon()}
          </div>
          
          <div className="flex-1">
            <div className="mb-3">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {company}
              </h4>
              <p className="text-sm text-gray-600 font-medium dark:text-gray-400">
                المؤسس: {founder}
              </p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed dark:text-gray-300">
                {story}
              </p>
            </div>
            
            <div className="bg-green-100 rounded-lg p-3">
              <p className="text-green-800 font-medium text-sm">
                الدرس المستفاد: {lesson}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};