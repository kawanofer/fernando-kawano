'use client'

import React from 'react';
import { FaChevronUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Open mobile menu"
      className="fixed bottom-4 right-4 p-5 bg-primary rounded-full shadow-md block flex-none md:hidden"
    >
      <FaChevronUp className="h-4 text-white" />
    </button>
  );
};

export default ScrollToTopButton;