import React from 'react';
import GridPattern from './GridPattern';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Grid Pattern Background */}
      <GridPattern />
      
      {/* Subtle starfield effect */}
      <div className="absolute inset-0 z-0">
        {Array(50).fill(null).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Hero Content Container */}
      <div className="relative z-10 px-4 py-16 text-center max-w-5xl mx-auto">
        {/* Main heading text */}
        <div className="space-y-6">
          {/* Top line */}
          
          
          {/* Main quote */}
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light italic text-gray-100 leading-relaxed tracking-wide max-w-4xl mx-auto">
            &ldquo;Data complexity to decision simplicity. Your retail business results partner.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;