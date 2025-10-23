'use client';

import { useEffect } from 'react';

// Hook to announce dynamic content changes to screen readers
export const useAnnounceToScreenReader = () => {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };
  
  return announce;
};

// Hook for managing focus trap in modals
export const useFocusTrap = (ref: React.RefObject<HTMLElement>, isActive: boolean) => {
  useEffect(() => {
    if (!isActive || !ref.current) return;
    
    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        firstElement.focus();
      }
    };
    
    element.addEventListener('keydown', handleTabKey);
    element.addEventListener('keydown', handleEscapeKey);
    
    // Focus first element when activated
    firstElement.focus();
    
    return () => {
      element.removeEventListener('keydown', handleTabKey);
      element.removeEventListener('keydown', handleEscapeKey);
    };
  }, [ref, isActive]);
};

// Hook to detect if user prefers reduced motion
export const usePrefersReducedMotion = () => {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
    
  return prefersReducedMotion;
};