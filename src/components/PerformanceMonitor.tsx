"use client";

import { useEffect } from 'react';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined') {
      import('web-vitals').then((webVitals) => {
        if ('onCLS' in webVitals && typeof webVitals.onCLS === 'function') {
          webVitals.onCLS(console.log);
        }
        if ('onFID' in webVitals && typeof webVitals.onFID === 'function') {
          webVitals.onFID(console.log);
        }
        if ('onFCP' in webVitals && typeof webVitals.onFCP === 'function') {
          webVitals.onFCP(console.log);
        }
        if ('onLCP' in webVitals && typeof webVitals.onLCP === 'function') {
          webVitals.onLCP(console.log);
        }
        if ('onTTFB' in webVitals && typeof webVitals.onTTFB === 'function') {
          webVitals.onTTFB(console.log);
        }
      }).catch(() => {
        // Silently fail if web-vitals is not available
      });
    }

    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap';
      fontLink.as = 'style';
      document.head.appendChild(fontLink);

      // Preconnect to external domains
      const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
      ];

      preconnectLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Optimize loading
    const optimizeLoading = () => {
      // Lazy load non-critical scripts
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          // Load analytics or other non-critical scripts here
        });
      }

      // Service Worker registration (if implemented)
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('SW registered'))
            .catch(() => console.log('SW registration failed'));
        });
      }
    };

    preloadCriticalResources();
    optimizeLoading();

    // Performance observer for long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'longtask') {
            console.warn('Long task detected:', entry);
          }
        });
      });

      observer.observe({ entryTypes: ['longtask'] });

      return () => observer.disconnect();
    }
  }, []);

  return null;
};