"use client";

import React from 'react';
import { Button } from './ui/button';
import { Twitter, MessageCircle, Linkedin, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const shareText = `${title} - دليل الشركات الناشئة`;
  
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank');
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          url: url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold">شارك الدليل</h3>
      <div className="flex gap-3 flex-wrap justify-center">
        <Button onClick={shareToTwitter} variant="outline" size="sm" className="flex items-center gap-2">
          <Twitter className="h-4 w-4" />
          Twitter
        </Button>
        <Button onClick={shareToWhatsApp} variant="outline" size="sm" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>
        <Button onClick={shareToLinkedIn} variant="outline" size="sm" className="flex items-center gap-2">
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </Button>
        {typeof window !== 'undefined' && 'share' in navigator && (
          <Button onClick={shareNative} variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            مشاركة
          </Button>
        )}
      </div>
    </div>
  );
};