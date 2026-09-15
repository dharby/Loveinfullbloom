"use client";

import { motion } from "framer-motion";
import Countdown from "@/components/Countdown";
import { weddingData } from "@/data/wedding";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92dvh] flex items-center justify-center overflow-hidden bg-cream">
      {/* Watercolor background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left watercolor wash */}
        <div 
          className="absolute -top-20 -left-20 w-80 h-80 opacity-[0.15] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #C4B8D9 0%, transparent 70%)" }}
        />
        {/* Top-right watercolor wash */}
        <div 
          className="absolute -top-10 -right-10 w-60 h-60 opacity-[0.12] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #C5D9CA 0%, transparent 70%)" }}
        />
        {/* Bottom watercolor wash */}
        <div 
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-40 opacity-[0.1] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, #E8E0F0 0%, transparent 70%)" }}
        />
        
        {/* Botanical corners */}
        <svg className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 opacity-[0.06]" viewBox="0 0 200 200" fill="none">
          <path d="M10 190 Q30 130 20 80 Q10 30 60 10 Q90 0 110 30 Q100 70 70 80 Q40 90 50 60" stroke="#9B8CB7" strokeWidth="1.2"/>
          <path d="M60 10 Q80 30 100 25 Q120 20 130 40 Q140 60 120 70 Q100 80 80 60" stroke="#3A7D5C" strokeWidth="0.8"/>
          <circle cx="20" cy="80" r="2" fill="#9B8CB7" opacity="0.35"/>
          <circle cx="130" cy="40" r="1.5" fill="#9B8CB7" opacity="0.25"/>
        </svg>
        <svg className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 opacity-[0.06] scale-x-[-1]" viewBox="0 0 200 200" fill="none">
          <path d="M10 190 Q30 130 20 80 Q10 30 60 10 Q90 0 110 30 Q100 70 70 80 Q40 90 50 60" stroke="#9B8CB7" strokeWidth="1.2"/>
          <path d="M60 10 Q80 30 100 25 Q120 20 130 40 Q140 60 120 70 Q100 80 80 60" stroke="#3A7D5C" strokeWidth="0.8"/>
          <circle cx="20" cy="80" r="2" fill="#9B8CB7" opacity="0.35"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-56 h-56 md:w-80 md:h-80 opacity-[0.04] rotate-180" viewBox="0 0 200 200" fill="none">
          <path d="M10 190 Q30 130 20 80 Q10 30 60 10 Q90 0 110 30 Q100 70 70 80 Q40 90 50 60" stroke="#9B8CB7" strokeWidth="1.2"/>
          <path d="M110 30 Q130 20 150 35 Q170 50 155 80" stroke="#3A7D5C" strokeWidth="0.8"/>
        </svg>
        <svg className="absolute bottom-0 right-0 w-56 h-56 md:w-80 md:h-80 opacity-[0.04] rotate-180 scale-x-[-1]" viewBox="0 0 200 200" fill="none">
          <path d="M10 190 Q30 130 20 80 Q10 30 60 10 Q90 0 110 30 Q100 70 70 80 Q40 90 50 60" stroke="#9B8CB7" strokeWidth="1.2"/>
          <path d="M110 30 Q130 20 150 35 Q170 50 155 80" stroke="#3A7D5C" strokeWidth="0.8"/>
        </svg>
      </div>

      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.35em] text-lavender font-sans mb-4"
        >
          Save the Date
        </motion.p>

        <motion.p
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[1rem] sm:text-[1.15rem] font-script text-lavender/70 tracking-wide mb-5"
        >
          together with their families
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[3.5rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem] font-serif font-light text-mint leading-[0.95] tracking-[-0.02em] mb-2"
        >
          {weddingData.couple.bride.firstName}
        </motion.h1>

        <motion.span
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="block text-lavender text-[1.35rem] sm:text-[1.5rem] font-script my-1"
        >
          &amp;
        </motion.span>

        <motion.h1
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[3.5rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem] font-serif font-light text-mint leading-[0.95] tracking-[-0.02em] mb-6"
        >
          {weddingData.couple.groom.firstName}
        </motion.h1>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="w-12 h-px bg-lavender/40" />
          <span className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.25em] text-ink-muted font-sans">
            {weddingData.wedding.displayDate}
          </span>
          <span className="w-12 h-px bg-lavender/40" />
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8"
        >
          <Countdown targetDate={weddingData.wedding.date} />
        </motion.div>

        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("#details")}
            className="inline-flex items-center justify-center h-12 px-7 bg-mint text-cream text-[0.8rem] sm:text-[0.85rem] uppercase tracking-[0.2em] font-sans font-medium border border-lavender/30 rounded-[3px] transition-all duration-300 hover:bg-mint-dark hover:border-lavender/50 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Wedding Details
          </button>
          <button
            onClick={() => scrollTo("#rsvp")}
            className="inline-flex items-center justify-center h-12 px-7 bg-transparent text-mint text-[0.8rem] sm:text-[0.85rem] uppercase tracking-[0.2em] font-sans font-medium border border-sage rounded-[3px] transition-all duration-300 hover:border-mint-light/40 hover:bg-sage-light/50 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            RSVP Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}