"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * Header Component
 * - Disappears on scroll down, reappears on scroll up.
 * - Styled with a light, clean theme.
 */
const Header = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  // Use Framer Motion's useMotionValueEvent for optimized scroll tracking
  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastY.current;
    // Hide header if scrolling down past a threshold, otherwise show it
    if (y > 100 && difference > 0) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastY.current = y;
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-150%' }, // Moves header up and out of view
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100 py-3 px-6 flex items-center justify-between">
        {/* Company Logo/Name */}
        <div className="flex items-center">
          <a href="/" className="text-black font-bold text-xl tracking-tight hover:text-gray-700 transition-colors">
            Blacklane
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-4 text-gray-700 font-medium">
          <a href="#how-we-work" className="hover:text-black transition-colors">How We Work</a>
          <a href="#ai-engine" className="hover:text-black transition-colors">AI Engine</a>
          <a href="#what-we-do" className="hover:text-black transition-colors">What we do</a>
        </nav>

        {/* Call-to-action Button */}
        <button className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-full transition-colors hover:bg-black">
          Contact Us
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
