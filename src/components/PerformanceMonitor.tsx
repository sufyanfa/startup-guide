"use client";

import { useEffect } from 'react';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'web-vitals' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
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
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
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