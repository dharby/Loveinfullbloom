"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/monogram.svg"
            alt="O&D Monogram"
            className="w-20 h-20 mx-auto mb-6 opacity-60"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.3em] text-lavender font-sans mb-3">
            Oops
          </p>
          <h1 className="text-[3rem] sm:text-[4rem] font-serif font-light text-mint leading-none mb-4">
            404
          </h1>
          <p className="text-[0.85rem] sm:text-[0.9rem] text-ink-muted font-sans leading-relaxed mb-8">
            This page seems to have wandered off. Let&apos;s get you back to the celebration.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 h-px bg-lavender/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-lavender/40" />
            <span className="w-10 h-px bg-lavender/30" />
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 bg-mint text-cream text-[0.8rem] sm:text-[0.85rem] uppercase tracking-[0.2em] font-sans font-medium border border-lavender/30 rounded-[3px] transition-all duration-300 hover:bg-mint-dark hover:border-lavender/50 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Back to Invitation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
