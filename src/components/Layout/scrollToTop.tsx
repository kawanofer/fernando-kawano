'use client';

import React, { useEffect, useState } from 'react';

import { FaChevronUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
    }
  };

  // Don't render anything until component is mounted on client
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`bg-primary fixed right-4 bottom-13 z-50 flex-none rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <FaChevronUp className="h-4 w-4 text-white" />
    </button>
  );
};

export default ScrollToTopButton;
