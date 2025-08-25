import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { BarChart3 } from 'lucide-react';

interface AssessmentPromptProps {
  onStartAssessment: () => void;
  title?: string;
  description?: string;
}

export const AssessmentPrompt: React.FC<AssessmentPromptProps> = ({ 
  onStartAssessment, 
  title = 'قيّم وضعك الحالي',
  description = 'احصل على توصيات مخصصة بناءً على مرحلة مشروعك واحتياجاتك الحالية. إجاباتك ستُحفظ أثناء التقييم وتُحذف تلقائياً عند إعادة تحميل الصفحة للحفاظ على خصوصيتك.'
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold text-primary">
            {title}
          </h3>
        </div>
        <p className="mb-4 text-right">
          {description}
        </p>
        <Button 
          onClick={onStartAssessment}
          className="bg-primary hover:bg-yellow-700 text-white"
        >
          ابدأ التقييم
        </Button>
      </CardContent>
    </Card>
  );
};