"use client";

import React, { useEffect } from 'react';
import Script from 'next/script';

interface TallyWindow extends Window {
  Tally?: {
    openPopup: (id: string, options: TallyOptions) => void;
    closePopup: (id: string) => void;
  };
}

interface TallyOptions {
  layout: string;
  width: number;
  hideTitle: boolean;
  overlay: boolean;
  emoji: {
    text: string;
    animation: string;
  };
  onClose: () => void;
  onSubmit: (payload: Record<string, unknown>) => void;
  hiddenFields: Record<string, string>;
}

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
    const tallyWindow = window as TallyWindow;
    if (isOpen && typeof window !== 'undefined' && tallyWindow.Tally) {
      // Open Tally popup when modal should be shown
      tallyWindow.Tally.openPopup('m6lr85', {
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
        onSubmit: (payload: Record<string, unknown>) => {
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
    const tallyWindow = window as TallyWindow;
    if (!isOpen && typeof window !== 'undefined' && tallyWindow.Tally) {
      tallyWindow.Tally.closePopup('m6lr85');
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