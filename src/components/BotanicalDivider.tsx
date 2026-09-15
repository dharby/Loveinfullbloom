"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BotanicalDividerProps {
  className?: string;
}

export default function BotanicalDivider({ className = "" }: BotanicalDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const pathTransition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div ref={ref} className={`flex items-center justify-center py-6 ${className}`}>
      <svg
        className="w-48 h-8 md:w-64 md:h-10 opacity-40"
        viewBox="0 0 200 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left branch */}
        <motion.path
          d="M10 15 Q30 15 50 15"
          stroke="var(--color-sage)"
          strokeWidth="0.8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={pathTransition}
        />
        <motion.path
          d="M25 15 Q20 8 30 5"
          stroke="var(--color-sage)"
          strokeWidth="0.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ ...pathTransition, delay: 0.2 }}
        />
        <motion.path
          d="M35 15 Q30 22 40 25"
          stroke="var(--color-sage)"
          strokeWidth="0.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ ...pathTransition, delay: 0.3 }}
        />
        <motion.circle
          cx="30" cy="5" r="1.5"
          fill="var(--color-lavender)"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.5 } : {}}
          transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
        />
        <motion.circle
          cx="40" cy="25" r="1.5"
          fill="var(--color-lavender)"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.5 } : {}}
          transition={{ delay: 0.7, duration: 0.4, type: "spring" }}
        />

        {/* Center ornament */}
        <motion.path
          d="M85 15 Q90 8 100 8 Q110 8 115 15 Q110 22 100 22 Q90 22 85 15Z"
          stroke="var(--color-lavender)"
          strokeWidth="0.8"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ ...pathTransition, delay: 0.4 }}
        />
        <motion.circle
          cx="100" cy="15" r="2"
          fill="var(--color-lavender)"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.4 } : {}}
          transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
        />

        {/* Right branch */}
        <motion.path
          d="M150 15 Q170 15 190 15"
          stroke="var(--color-sage)"
          strokeWidth="0.8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ ...pathTransition, delay: 0.1 }}
        />
        <motion.path
          d="M165 15 Q170 8 160 5"
          stroke="var(--color-sage)"
          strokeWidth="0.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ ...pathTransition, delay: 0.3 }}
        />
        <motion.path
          d="M175 15 Q180 22 170 25"
          stroke="var(--color-sage)"
          strokeWidth="0.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ ...pathTransition, delay: 0.4 }}
        />
        <motion.circle
          cx="160" cy="5" r="1.5"
          fill="var(--color-lavender)"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.5 } : {}}
          transition={{ delay: 0.8, duration: 0.4, type: "spring" }}
        />
        <motion.circle
          cx="170" cy="25" r="1.5"
          fill="var(--color-lavender)"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.5 } : {}}
          transition={{ delay: 0.9, duration: 0.4, type: "spring" }}
        />
      </svg>
    </div>
  );
}
