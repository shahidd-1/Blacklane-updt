"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from "framer-motion";

/**
 * Hero Section with Themed Canvas Animation
 * - Matches the dark, futuristic style of the other sections.
 * - Features a dynamic canvas background with emerald green ribbons.
 * - Text gradient and shadows are updated to the theme's color palette.
 *
 * Requirements:
 * - TailwindCSS
 * - Framer Motion (used for text entrance)
 */

const Hero: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [textVisible, setTextVisible] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Set text to visible after a delay
    const timer = setTimeout(() => setTextVisible(true), 1000);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const ribbonCount = 3;

      for (let i = 0; i < ribbonCount; i++) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        
        // Increased opacity to make the background figure visible again
        gradient.addColorStop(0, `rgba(110, 231, 183, ${0.25 - i * 0.07})`);   // Lighter emerald
        gradient.addColorStop(0.5, `rgba(16, 185, 129, ${0.20 - i * 0.06})`); // Core emerald
        gradient.addColorStop(1, `rgba(5, 150, 105, ${0.18 - i * 0.05})`);    // Darker emerald

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.fillStyle = `rgba(16, 185, 129, ${0.05 - i * 0.01})`;

        const points: { x: number; y: number }[] = [];
        const segments = 100;
        const radius = 200 + i * 50;
        const heightVariation = 100 + i * 30;

        for (let j = 0; j <= segments; j++) {
          const angle = (j / segments) * Math.PI * 4 + time * 0.0075 + i * 0.5;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle * 2 + time * 0.015) * heightVariation + Math.sin(time * 0.0075 + i) * 50;
          points.push({ x, y });
        }

        if (points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let j = 1; j < points.length - 2; j++) {
            const cp1x = (points[j].x + points[j + 1].x) / 2;
            const cp1y = (points[j].y + points[j + 1].y) / 2;
            const cp2x = (points[j + 1].x + points[j + 2].x) / 2;
            const cp2y = (points[j + 1].y + points[j + 2].y) / 2;
            ctx.quadraticCurveTo(points[j + 1].x, points[j + 1].y, cp2x, cp2y);
          }
          
          // Apply a glow effect matching the theme with increased opacity
          ctx.shadowBlur = 20;
          ctx.shadowColor = 'rgba(16, 185, 129, 0.25)';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      time += 0.75;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="hero relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      <div className="hero-text relative z-20 px-4 py-16 text-center max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 20 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            <span>From Data Complexity to</span>
            <br />
            <span
              className="font-bold text-transparent bg-clip-text animate-moving-shade"
              style={{
                // Update text gradient to use the emerald theme
                backgroundImage: `linear-gradient(
                  ${mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1000) * 180 + 45}deg,
                  #a7f3d0,
                  #34d399 50%,
                  #10b981
                )`,
              }}
            >
              Intelligent Solutions.
            </span>
          </h1>
        </motion.div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-10" />

      <div className="absolute inset-0 z-0">{children}</div>

      {/* Update keyframe animation to use the emerald theme for text shadow */}
      <style>{`
        @keyframes movingShade {
          0% {
            text-shadow: 0 0 12px rgba(16, 185, 129, 0.4), 2px 2px 12px rgba(110, 231, 183, 0.2);
          }
          50% {
            text-shadow: 0 0 12px rgba(16, 185, 129, 0.4), -2px -2px 12px rgba(110, 231, 183, 0.2);
          }
          100% {
            text-shadow: 0 0 12px rgba(16, 185, 129, 0.4), 2px 2px 12px rgba(110, 231, 183, 0.2);
          }
        }
        .animate-moving-shade {
          animation: movingShade 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
