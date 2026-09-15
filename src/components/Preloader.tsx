"use client";

import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.8 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-cream"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/monogram-new.svg"
            alt="O&D Monogram"
            className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-4"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.35em] text-lavender font-sans"
        >
          Loading your invitation
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
          className="mt-4 w-32 h-0.5 bg-gradient-to-r from-lavender/30 via-lavender to-lavender/30 mx-auto origin-left rounded-full"
        />
      </div>
    </motion.div>
  );
}
