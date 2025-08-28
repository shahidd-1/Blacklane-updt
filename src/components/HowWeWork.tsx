"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * How We Work Section
 * - Follows the dark, futuristic style of the Operational Intelligence Section.
 * - Uses the reusable GlowCard component for consistent styling.
 * - Replaces PNG images with minimal, theme-aligned SVG illustrations.
 *
 * Requirements:
 * - TailwindCSS
 * - Framer Motion (for soft hover animations)
 */

// Reusable Card wrapper from the original theme
const GlowCard: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-3xl bg-zinc-900/80 p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] ${className}`}
    >
      {/* Glow effect */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl bg-[radial-gradient(45rem_30rem_at_var(--mx,50%)_-20%,rgba(16,185,129,0.15),transparent)]" />

      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)] opacity-[0.15]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-how"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M28 0H0v28"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid-how)"
            className="text-white"
          />
        </svg>
      </div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Minimal SVG illustrations for the "How We Work" steps

const ConnectSVG = () => (
  <svg viewBox="0 0 400 200" className="w-full h-40 md:h-48">
    <defs>
      <radialGradient id="connect-glow" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="200" cy="100" r="100" fill="url(#connect-glow)" />
    {/* Central Hub */}
    <circle cx="200" cy="100" r="12" fill="#ecfeff" />
    <circle cx="200" cy="100" r="24" fill="#34d399" opacity="0.2" />
    {/* Connecting Nodes */}
    {[0, 72, 144, 216, 288].map((angle) => {
      const x = 200 + 80 * Math.cos((angle * Math.PI) / 180);
      const y = 100 + 80 * Math.sin((angle * Math.PI) / 180);
      return (
        <g key={angle}>
          <line
            x1="200"
            y1="100"
            x2={x}
            y2={y}
            stroke="#a7f3d0"
            strokeWidth="1"
            strokeOpacity="0.5"
            strokeDasharray="3 3"
          />
          <circle cx={x} cy={y} r="6" fill="#a7f3d0" />
        </g>
      );
    })}
  </svg>
);

const UnifySVG = () => (
  <svg viewBox="0 0 400 200" className="w-full h-40 md:h-48">
    {/* Streams flowing in */}
    <path d="M 20 60 C 100 60, 150 80, 200 100" fill="none" stroke="#a7f3d0" strokeWidth="1.5" strokeOpacity="0.6" />
    <path d="M 40 100 C 110 100, 150 100, 200 100" fill="none" stroke="#a7f3d0" strokeWidth="1.5" strokeOpacity="0.6" />
    <path d="M 20 140 C 100 140, 150 120, 200 100" fill="none" stroke="#a7f3d0" strokeWidth="1.5" strokeOpacity="0.6" />
    {/* Unified stream flowing out */}
    <path d="M 200 100 C 280 100, 320 100, 380 100" fill="none" stroke="#ecfeff" strokeWidth="3" />
    {/* Glows */}
    <circle cx="20" cy="60" r="4" fill="#34d399" />
    <circle cx="40" cy="100" r="4" fill="#34d399" />
    <circle cx="20" cy="140" r="4" fill="#34d399" />
    <circle cx="380" cy="100" r="6" fill="#ecfeff" />
    <circle cx="200" cy="100" r="16" fill="#34d399" opacity="0.2" />
  </svg>
);

const TransformSVG = () => (
  <svg viewBox="0 0 400 200" className="w-full h-40 md:h-48">
    {/* Raw Data Shape */}
    <rect x="50" y="75" width="50" height="50" rx="4" fill="none" stroke="#a7f3d0" strokeOpacity="0.7" strokeWidth="1.5" />
    {/* Transformation Path */}
    <path d="M 110 100 C 180 60, 220 140, 290 100" fill="none" stroke="#34d399" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 4" />
    {/* Transformed Data (Chart) */}
    <polyline
      points="300,120 320,90 340,110 360,80 380,100"
      fill="none"
      stroke="#ecfeff"
      strokeWidth="2.5"
    />
    <circle cx="360" cy="80" r="4" fill="#ecfeff" />
    {/* Glows */}
    <circle cx="80" cy="100" r="20" fill="#34d399" opacity="0.1" />
    <circle cx="350" cy="100" r="30" fill="#34d399" opacity="0.15" />
  </svg>
);


// Main Component
export default function HowWeWork() {
  return (
    <section id="how-we-work" className="relative w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-6 text-sm uppercase tracking-widest text-zinc-400">
          How we work
        </div>

        {/* Main Header Card */}
        <GlowCard className="mb-8 text-center">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                Your Tools, <span className="italic text-emerald-300">Our Intelligence.</span>
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-zinc-300/90">
                We don't force you to change your workflow. We connect to your existing systems—from spreadsheets to accounting software—to give you a single, unified layer of intelligence. Here's how we transform your data into a powerful asset.
            </p>
        </GlowCard>

        {/* Steps laid out in individual cards */}
        <div className="space-y-8">
          {/* Step 1: Connect */}
          <GlowCard>
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">1. Connect</h2>
                <p className="mt-2 text-zinc-300/90">
                  We seamlessly integrate with the tools you already use. Keep your trusted Excel sheets, Tally ledger, and even your email and WhatsApp logs. Our platform acts as a bridge, not a replacement.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <ConnectSVG />
              </div>
            </div>
          </GlowCard>

          {/* Step 2: Unify */}
          <GlowCard>
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div className="md:order-2">
                <h2 className="text-2xl md:text-3xl font-semibold">2. Unify</h2>
                <p className="mt-2 text-zinc-300/90">
                  Your siloed data is automatically pulled into our secure hub. We combine financial records, on-site progress reports, and project logs into one central, reliable source of truth.
                </p>
              </div>
              <div className="flex items-center justify-center md:order-1">
                <UnifySVG />
              </div>
            </div>
          </GlowCard>

          {/* Step 3: Transform */}
          <GlowCard>
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">3. Transform</h2>
                <p className="mt-2 text-zinc-300/90">
                  Our AI engine turns that raw data into clear, actionable insights. Get a real-time view of cash flow, forecast project risks, and ask natural language questions to understand your business better than ever before.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <TransformSVG />
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
