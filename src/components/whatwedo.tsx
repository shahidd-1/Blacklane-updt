"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Operational Intelligence Section
 * - One main (large) card: "Mastering Operational Intelligence"
 * - Four smaller cards underneath
 * - Dark, futuristic style with subtle neon glows and minimal SVG illustrations
 *
 * Requirements:
 * - TailwindCSS
 * - Framer Motion (for soft hover animations)
 */

// Reusable Card wrapper
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
              id="grid"
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
            fill="url(#grid)"
            className="text-white"
          />
        </svg>
      </div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Reusable component for the four smaller info cards
const InfoCard: React.FC<{
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}> = ({ title, children, icon }) => (
  <GlowCard>
    <div className="flex h-full flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-zinc-300/90">{children}</p>
      </div>
      <div className="mt-6">{icon}</div>
    </div>
  </GlowCard>
);

// Minimal SVG illustrations
const RadarSVG = () => (
  <svg viewBox="0 0 600 240" className="w-full h-40 md:h-48">
    <defs>
      <radialGradient id="rg" cx="50%" cy="90%">
        <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
        <stop offset="60%" stopColor="#34d399" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#rg)" />
    {[60, 110, 160, 210].map((r, i) => (
      <path
        key={i}
        d={`M60 ${r} q240 -140 480 0`}
        fill="none"
        stroke="#a7f3d0"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
    ))}
    {[{ x: 210, y: 120 }, { x: 420, y: 90 }, { x: 360, y: 150 }].map(
      (p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3" fill="#ecfeff" />
          <circle cx={p.x} cy={p.y} r="12" fill="#34d399" opacity="0.15" />
        </g>
      )
    )}
  </svg>
);

const ChartSVG = () => (
  <svg viewBox="0 0 400 160" className="w-full h-32">
    <polyline
      fill="none"
      stroke="#86efac"
      strokeWidth="2"
      points="10,120 60,110 110,130 160,80 210,90 260,60 310,70 360,30"
    />
    <circle cx="160" cy="80" r="5" fill="#bbf7d0" />
    <circle cx="360" cy="30" r="4" fill="#86efac" />
  </svg>
);

const DashboardSVG = () => (
  <svg viewBox="0 0 400 160" className="w-full h-32">
    <rect
      x="10"
      y="20"
      width="380"
      height="120"
      rx="12"
      fill="none"
      stroke="#34d399"
      strokeOpacity="0.4"
    />
    <rect
      x="30"
      y="40"
      width="120"
      height="80"
      rx="8"
      fill="none"
      stroke="#a7f3d0"
      strokeOpacity="0.4"
    />
    <rect
      x="170"
      y="40"
      width="200"
      height="30"
      rx="6"
      fill="none"
      stroke="#a7f3d0"
      strokeOpacity="0.4"
    />
    <rect
      x="170"
      y="88"
      width="200"
      height="32"
      rx="6"
      fill="none"
      stroke="#a7f3d0"
      strokeOpacity="0.4"
    />
  </svg>
);

const RingsSVG = () => (
  <svg viewBox="0 0 400 160" className="w-full h-32">
    <ellipse
      cx="140"
      cy="80"
      rx="80"
      ry="24"
      fill="none"
      stroke="#34d399"
      strokeOpacity="0.45"
    />
    <ellipse
      cx="260"
      cy="80"
      rx="80"
      ry="24"
      fill="none"
      stroke="#34d399"
      strokeOpacity="0.45"
    />
    <circle cx="200" cy="80" r="14" fill="#34d399" opacity="0.18" />
    <circle cx="200" cy="80" r="4" fill="#ecfeff" />
  </svg>
);

const NetworkSVG = () => (
  <svg viewBox="0 0 400 160" className="w-full h-32">
    <path
      d="M 40 80 C 120 20, 280 20, 360 80"
      stroke="#34d399"
      strokeOpacity="0.4"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M 40 80 C 120 140, 280 140, 360 80"
      stroke="#34d399"
      strokeOpacity="0.4"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="40" cy="80" r="5" fill="#a7f3d0" />
    <circle cx="360" cy="80" r="5" fill="#a7f3d0" />
    <circle cx="200" cy="25" r="4" fill="#ecfeff" />
    <circle cx="200" cy="135" r="4" fill="#ecfeff" />
    <circle cx="120" cy="45" r="3" fill="#ecfeff" />
    <circle cx="280" cy="115" r="3" fill="#ecfeff" />
  </svg>
);

export default function OperationalIntelligenceSection() {
  return (
    <section id="what-we-do" className="relative w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-6 text-sm uppercase tracking-widest text-zinc-400">
          What we do
        </div>

        {/* Main big card */}
        <GlowCard className="mb-8">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
                <span className="italic text-emerald-300">Mastering</span>{" "}
                Operational Intelligence
              </h2>
              <p className="mt-4 max-w-2xl text-zinc-300/90">
                We turn fragmented operational data into a single source of
                truth, giving you real-time visibility, predictive insights, and
                measurable financial impact.
              </p>
            </div>
            <div className="md:pl-6">
              <RadarSVG />
            </div>
          </div>
        </GlowCard>

        {/* Sub grid of four small cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Streamline Financial Control" icon={<ChartSVG />}>
            Digitize and unify financial data to ensure accurate cash flow
            monitoring and better decision-making.
          </InfoCard>

          <InfoCard title="Build Intelligent Dashboards" icon={<DashboardSVG />}>
            Create real-time command centers that visualize KPIs, turning raw
            data into actionable insights.
          </InfoCard>

          <InfoCard title="Predict and Optimize" icon={<NetworkSVG />}>
            Leverage advanced forecasting models for cash flow, risk, and
            resource allocation.
          </InfoCard>

          <InfoCard title="Sustain with Partnership" icon={<RingsSVG />}>
            Beyond tools, we partner long-term to continuously optimize and
            co-create your growth roadmap.
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
