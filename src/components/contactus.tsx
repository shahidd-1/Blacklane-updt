"use client";

import React from "react";
import { motion } from "framer-motion";

//================================================================//
// 1. SHARED COMPONENTS
//================================================================//

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

//================================================================//
// 2. SVG ICONS
//================================================================//

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-emerald-300"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-emerald-300"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);
const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-emerald-300"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

// ✨ NEW INSTAGRAM ICON
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-emerald-300"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

//================================================================//
// 3. CONTACT US SECTION COMPONENT
//================================================================//

export default function ContactUsSection() {
  const ContactInfoItem = ({
    icon,
    title,
    value,
  }: {
    icon: React.ReactNode;
    title: string;
    value: React.ReactNode; // Changed to ReactNode to allow links
  }) => (
    <div className="flex items-start space-x-4">
      <div className="mt-1 flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <div className="text-zinc-400">{value}</div>
      </div>
    </div>
  );

  const inputStyles =
    "w-full bg-zinc-800/50 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 outline-none transition-all duration-300";

  return (
    <section id="contactus" className="relative w-full bg-black text-white py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 text-sm uppercase tracking-widest text-zinc-400">
          Contact Us
        </div>

        <GlowCard>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left Side: Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-2">
                Send us a Message
              </h2>
              <p className="text-zinc-400 mb-6">
                Have a project in mind or just want to say hello? We'd love to
                hear from you.
              </p>
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email Address"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="sr-only">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your Message"
                    rows={5}
                    className={inputStyles}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-emerald-400 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300/50"
                >
                  Submit Message
                </button>
              </form>
            </div>

            {/* Right Side: Contact Details */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-white">
                Contact Information
              </h3>
              <div className="space-y-6">
                <ContactInfoItem
                  icon={<MapPinIcon />}
                  title="Our office"
                  value="Bangalore, Karnataka, India"
                />
                <ContactInfoItem
                  icon={<MailIcon />}
                  title="Email Us"
                  value={
                    <a
                      href="mailto:contact@blacklanetech.com"
                      className="hover:text-emerald-300 transition-colors"
                    >
                      contact@blacklanetech.com
                    </a>
                  }
                />
                <ContactInfoItem
                  icon={<PhoneIcon />}
                  title="Call Us"
                  value={
                    <a
                      href="tel:+917034118404"
                      className="hover:text-emerald-300 transition-colors"
                    >
                      +91 7034118404
                    </a>
                  }
                />
                {/* ✨ NEW INSTAGRAM ITEM */}
                <ContactInfoItem
                  icon={<InstagramIcon />}
                  title="Follow Us"
                  value={
                    <a
                      href= "https://www.instagram.com/blacklanetech?igsh=dWNxMmFpcjl3bHJi&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-300 transition-colors"
                    >
                      blacklanetech
                    </a>
                  }
                />
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}