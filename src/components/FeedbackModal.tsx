"use client";

import React, { useEffect } from 'react';
import Script from 'next/script';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && (window as any).Tally) {
      // Open Tally popup when modal should be shown
      (window as any).Tally.openPopup('m6lr85', {
        layout: 'modal',
        width: 600,
        hideTitle: true,
        overlay: true,
        emoji: {
          text: '🎉',
          animation: 'tada'
        },
        onClose: () => {
          onClose();
        },
        onSubmit: (payload: any) => {
          console.log('Form submitted:', payload);
          onSubmit();
          onClose();
        },
        hiddenFields: {
          source: 'startup-guide-completion',
          timestamp: new Date().toISOString()
        }
      });
    }
  }, [isOpen, onClose, onSubmit]);

  useEffect(() => {
    // Close Tally popup when modal should be closed
    if (!isOpen && typeof window !== 'undefined' && (window as any).Tally) {
      (window as any).Tally.closePopup('m6lr85');
    }
  }, [isOpen]);

  // This component doesn't render anything visible - Tally handles the modal
  return (
    <Script
      id="tally-js"
      src="https://tally.so/widgets/embed.js"
      strategy="afterInteractive"
    />
  );
};