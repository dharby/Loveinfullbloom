"use client";

import { motion } from "framer-motion";

interface BotanicalDividerProps {
  className?: string;
}

export default function BotanicalDivider({ className = "" }: BotanicalDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center justify-center py-6 ${className}`}
    >
      <svg
        className="w-48 h-8 md:w-64 md:h-10 opacity-40"
        viewBox="0 0 200 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left branch */}
        <path
          d="M10 15 Q30 15 50 15"
          stroke="var(--color-sage)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M25 15 Q20 8 30 5"
          stroke="var(--color-sage)"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <path
          d="M35 15 Q30 22 40 25"
          stroke="var(--color-sage)"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <circle cx="30" cy="5" r="1.5" fill="var(--color-lavender)" opacity="0.5" />
        <circle cx="40" cy="25" r="1.5" fill="var(--color-lavender)" opacity="0.5" />

        {/* Center ornament */}
        <path
          d="M85 15 Q90 8 100 8 Q110 8 115 15 Q110 22 100 22 Q90 22 85 15Z"
          stroke="var(--color-lavender)"
          strokeWidth="0.8"
          fill="none"
        />
        <circle cx="100" cy="15" r="2" fill="var(--color-lavender)" opacity="0.4" />

        {/* Right branch */}
        <path
          d="M150 15 Q170 15 190 15"
          stroke="var(--color-sage)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M165 15 Q170 8 160 5"
          stroke="var(--color-sage)"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <path
          d="M175 15 Q180 22 170 25"
          stroke="var(--color-sage)"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <circle cx="160" cy="5" r="1.5" fill="var(--color-lavender)" opacity="0.5" />
        <circle cx="170" cy="25" r="1.5" fill="var(--color-lavender)" opacity="0.5" />
      </svg>
    </motion.div>
  );
}
