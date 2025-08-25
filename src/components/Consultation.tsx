import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, Target, CheckCircle } from 'lucide-react';

interface ConsultationProps {
  title: string;
  description: string;
  cta: string;
  features: string[];
  contactUrl?: string;
}

export const Consultation: React.FC<ConsultationProps> = ({ 
  title, 
  description, 
  cta, 
  features,
  contactUrl = "https://cal.com/sufyanfa/15min/"
}) => {
  const handleContact = () => {
    window.open(contactUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-100">
                {title}
              </h3>
              <p className="text-gray-700 leading-relaxed dark:text-gray-300">
                {description}
              </p>
            </div>
            
            {features && features.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-800 mb-3 dark:text-gray-200">
                  ما ستحصل عليه:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="md:flex md:items-center gap-2 space-y-2 md:space-y-0">
              <Button 
                onClick={handleContact}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-sm font-medium transition-colors"
              >
                {cta}
              </Button>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Target className="w-4 h-4" />
                <span>استشارة مجانية 15 دقيقة</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};