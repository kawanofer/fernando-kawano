'use client';

import React, { useEffect, useState } from 'react';

import { FaChevronUp } from 'react-icons/fa';

import { useAnnounceToScreenReader } from '@/hooks/useAccessibility';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const announce = useAnnounceToScreenReader();

  useEffect(() => {
    setIsMounted(true);

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      announce('Scrolled to top of page', 'polite');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  };

  // Don't render anything until component is mounted on client
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      aria-label="Scroll to top of page"
      title="Scroll to top"
      className={`bg-primary fixed right-4 bottom-13 z-50 flex-none rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      tabIndex={isVisible ? 0 : -1}
    >
      <FaChevronUp 
        className="h-4 w-4 text-white" 
        aria-hidden="true"
      />
    </button>
  );
};

export default ScrollToTopButton;
