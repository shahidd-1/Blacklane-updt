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
 {/* Navigation Links */}
{/* Navigation Links */}
{/* Navigation Links */}
<nav className="hidden md:flex flex-1 items-center">
  {/* Centered Links Group */}
  <div className="flex flex-1 justify-center space-x-4 text-gray-700 font-medium">
    <a href="#how-we-work" className="hover:text-black transition-colors">How We Work</a>
    <a href="#ai-engine" className="hover:text-black transition-colors">AI Engine</a>
    <a href="#what-we-do" className="hover:text-black transition-colors">What we do</a>
  </div>

  {/* Contact Button on the right with hover glow effect */}
  <div>
    <a 
      href="#contactus" 
      className="px-8 py-2 bg-gray-900 rounded-full text-white font-semibold 
                 transition-all duration-300 ease-in-out 
                 hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-700/50"
    >
      Contact Us
    </a>
  </div>
</nav>
       
      </div>
    </motion.header>
  );
};

export default Header;
