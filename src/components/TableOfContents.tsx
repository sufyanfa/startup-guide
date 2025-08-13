import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BookOpen, CheckCircle } from 'lucide-react';
import { Section, Progress } from '../types/index';
import { APP_CONSTANTS } from '../constants/index';

interface TableOfContentsProps {
  sections: Section[];
  currentSectionIndex: number;
  progress: Progress;
  onSectionSelect: (index: number) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  currentSectionIndex,
  progress,
  onSectionSelect
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          {APP_CONSTANTS.TABLE_OF_CONTENTS}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => onSectionSelect(index)}
              className={`text-right p-3 rounded-lg border transition-colors ${
                index === currentSectionIndex
                  ? 'bg-blue-100 border-blue-300 text-blue-800'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{section.title}</span>
                <div className="flex items-center gap-2">
                  {progress.completedSections.has(section.id) && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                  {progress.quizScores[section.id] !== undefined && (
                    <Badge variant="secondary" className="text-xs">
                      {Math.round(progress.quizScores[section.id])}%
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};