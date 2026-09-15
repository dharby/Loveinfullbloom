"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";

interface FooterProps {
  onReplay?: () => void;
}

export default function Footer({ onReplay }: FooterProps) {
  return (
    <footer className="py-12 md:py-18 bg-mint">
      <div className="max-w-2xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src="/monogram.svg"
            alt="O&D Monogram"
            className="w-16 h-16 mx-auto mb-4 opacity-80 brightness-0 invert"
          />
          <p className="text-[2.2rem] sm:text-[2.5rem] font-serif font-light text-cream/90 tracking-[-0.02em] mb-2">
            {weddingData.couple.bride.firstName} &amp; {weddingData.couple.groom.firstName}
          </p>
          <p className="text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.3em] text-lavender/60 font-sans mb-6">
            20.03.2026
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-px bg-lavender/20" />
            <span className="text-lavender/40 text-[0.8rem] font-serif">✦</span>
            <span className="w-8 h-px bg-lavender/20" />
          </div>

          <p className="text-[0.8rem] sm:text-[0.85rem] text-cream/50 font-sans leading-relaxed mb-10">
            With love, we cannot wait to celebrate with you.
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <svg className="w-6 h-6 opacity-20" viewBox="0 0 24 24" fill="none" stroke="#C4B8D9" strokeWidth="0.8">
              <path d="M12 2C8 6 4 10 4 14c0 4 3.5 8 8 8s8-4 8-8c0-4-4-8-8-12z" />
              <path d="M12 6c-2 3-4 6-4 9 0 2.5 2 5 4 5s4-2.5 4-5c0-3-2-6-4-9z" opacity="0.5" />
            </svg>
          </div>

          {onReplay && (
            <button
              onClick={onReplay}
              className="text-[0.45rem] sm:text-[0.7rem] uppercase tracking-[0.25em] text-cream/30 font-sans hover:text-cream/60 transition-colors border-b border-cream/10 hover:border-cream/30 pb-0.5"
            >
              Replay Invitation
            </button>
          )}
        </motion.div>
      </div>
    </footer>
  );
}
