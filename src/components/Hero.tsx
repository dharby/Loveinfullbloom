"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background parallax (shared)
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Desktop parallax
  const desktopTextY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const desktopPhotoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const desktopOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Mobile parallax - much gentler so content stays visible
  const mobileTextY = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const mobileOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace("#", ""));
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-[92dvh] flex items-center justify-center overflow-hidden bg-cream">
      {/* Parallax watercolor background elements */}
      <motion.div style={{ y: bgY1 }} className="absolute -top-20 -left-20 w-80 h-80 opacity-[0.15] rounded-full blur-3xl pointer-events-none"
        initial={false}
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #C4B8D9 0%, transparent 70%)" }} />
      </motion.div>
      <motion.div style={{ y: bgY2 }} className="absolute -top-10 -right-10 w-60 h-60 opacity-[0.12] rounded-full blur-3xl pointer-events-none"
        initial={false}
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #C5D9CA 0%, transparent 70%)" }} />
      </motion.div>
      <motion.div style={{ y: bgY3 }} className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-40 opacity-[0.1] rounded-full blur-3xl pointer-events-none"
        initial={false}
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(ellipse, #E8E0F0 0%, transparent 70%)" }} />
      </motion.div>

      {/* Parallax botanical corners */}
      <motion.svg style={{ y: bgY1 }} className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 opacity-[0.06] pointer-events-none" viewBox="0 0 200 200" fill="none">
        <path d="M10 190 Q30 130 20 80 Q10 30 60 10 Q90 0 110 30 Q100 70 70 80 Q40 90 50 60" stroke="#9B8CB7" strokeWidth="1.2"/>
        <path d="M60 10 Q80 30 100 25 Q120 20 130 40 Q140 60 120 70 Q100 80 80 60" stroke="#3A7D5C" strokeWidth="0.8"/>
        <circle cx="20" cy="80" r="2" fill="#9B8CB7" opacity="0.35"/>
        <circle cx="130" cy="40" r="1.5" fill="#9B8CB7" opacity="0.25"/>
      </motion.svg>
      <motion.svg style={{ y: bgY1 }} className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 opacity-[0.06] scale-x-[-1] pointer-events-none" viewBox="0 0 200 200" fill="none">
        <path d="M10 190 Q30 130 20 80 Q10 30 60 10 Q90 0 110 30 Q100 70 70 80 Q40 90 50 60" stroke="#9B8CB7" strokeWidth="1.2"/>
        <path d="M60 10 Q80 30 100 25 Q120 20 130 40 Q140 60 120 70 Q100 80 80 60" stroke="#3A7D5C" strokeWidth="0.8"/>
        <circle cx="20" cy="80" r="2" fill="#9B8CB7" opacity="0.35"/>
      </motion.svg>
      <motion.svg style={{ y: bgY3 }} className="absolute bottom-0 left-0 w-56 h-56 md:w-80 md:h-80 opacity-[0.04] rotate-180 pointer-events-none" viewBox="0 0 200 200" fill="none">
        <path d="M10 190 Q30 130 20 80 Q10 30 60 10 Q90 0 110 30 Q100 70 70 80 Q40 90 50 60" stroke="#9B8CB7" strokeWidth="1.2"/>
        <path d="M110 30 Q130 20 150 35 Q170 50 155 80" stroke="#3A7D5C" strokeWidth="0.8"/>
      </motion.svg>
      <motion.svg style={{ y: bgY3 }} className="absolute bottom-0 right-0 w-56 h-56 md:w-80 md:h-80 opacity-[0.04] rotate-180 scale-x-[-1] pointer-events-none" viewBox="0 0 200 200" fill="none">
        <path d="M10 190 Q30 130 20 80 Q10 30 60 10 Q90 0 110 30 Q100 70 70 80 Q40 90 50 60" stroke="#9B8CB7" strokeWidth="1.2"/>
        <path d="M110 30 Q130 20 150 35 Q170 50 155 80" stroke="#3A7D5C" strokeWidth="0.8"/>
      </motion.svg>

      {/* Mobile: stacked layout — gentle parallax */}
      <motion.div style={{ y: mobileTextY, opacity: mobileOpacity }} className="relative z-10 w-full px-5 md:hidden">
        <div className="text-center">
          <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[0.75rem] uppercase tracking-[0.35em] text-lavender font-sans mb-4">
            Save the Date
          </motion.p>
          <motion.p custom={0.5} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[1rem] font-script text-lavender/70 tracking-wide mb-5">
            together with their families
          </motion.p>
          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[3.5rem] font-serif font-light text-mint leading-[0.95] tracking-[-0.02em] mb-2">
            {weddingData.couple.bride.firstName}
          </motion.h1>
          <motion.span custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="block text-lavender text-[1.35rem] font-script my-1">
            &amp;
          </motion.span>
          <motion.h1 custom={3} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[3.5rem] font-serif font-light text-mint leading-[0.95] tracking-[-0.02em] mb-6">
            {weddingData.couple.groom.firstName}
          </motion.h1>

          <motion.div custom={3.5} initial="hidden" animate="visible" variants={fadeUp} className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-44 h-56 rounded-t-full border-[3px] border-lavender/40 overflow-hidden relative">
                <img src="/og-image.jpg" alt="Oreoluwa and Daberechukwu" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-cream/60 to-transparent" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-50 h-[3px] bg-gradient-to-r from-transparent via-lavender/40 to-transparent" />
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
                <span className="text-[0.6rem] font-serif text-lavender/60 tracking-wider">O &amp; D</span>
              </div>
            </div>
          </motion.div>

          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="flex items-center justify-center gap-4 mb-6">
            <span className="w-10 h-px bg-lavender/40" />
            <span className="text-[0.6rem] uppercase tracking-[0.25em] text-ink-muted font-sans">{weddingData.wedding.displayDate}</span>
            <span className="w-10 h-px bg-lavender/40" />
          </motion.div>
          <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
            <Countdown targetDate={weddingData.wedding.date} />
          </motion.div>
          <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col items-center gap-3">
            <button onClick={() => scrollTo("#details")} className="inline-flex items-center justify-center h-11 px-6 bg-mint text-cream text-[0.75rem] uppercase tracking-[0.2em] font-sans font-medium border border-lavender/30 rounded-[3px] transition-all duration-300 hover:bg-mint-dark hover:-translate-y-0.5 active:scale-[0.98]">
              Wedding Details
            </button>
            <button onClick={() => scrollTo("#rsvp")} className="inline-flex items-center justify-center h-11 px-6 bg-transparent text-mint text-[0.75rem] uppercase tracking-[0.2em] font-sans font-medium border border-sage rounded-[3px] transition-all duration-300 hover:bg-sage-light/50 hover:-translate-y-0.5 active:scale-[0.98]">
              RSVP Now
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Desktop: side-by-side layout — full parallax */}
      <div className="relative z-10 hidden md:flex items-center justify-center w-full max-w-6xl mx-auto px-8 lg:px-12 gap-10 lg:gap-16">
        <motion.div style={{ y: desktopTextY, opacity: desktopOpacity }} className="flex-1 text-center">
          <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp} className="text-[0.8rem] uppercase tracking-[0.35em] text-lavender font-sans mb-4">
            Save the Date
          </motion.p>
          <motion.p custom={0.5} initial="hidden" animate="visible" variants={fadeUp} className="text-[1.15rem] font-script text-lavender/70 tracking-wide mb-6">
            together with their families
          </motion.p>
          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-[4.5rem] lg:text-[6rem] font-serif font-light text-mint leading-[0.9] tracking-[-0.02em] mb-1">
            {weddingData.couple.bride.firstName}
          </motion.h1>
          <motion.span custom={2} initial="hidden" animate="visible" variants={fadeUp} className="block text-lavender text-[1.5rem] font-script my-2">
            &amp;
          </motion.span>
          <motion.h1 custom={3} initial="hidden" animate="visible" variants={fadeUp} className="text-[4.5rem] lg:text-[6rem] font-serif font-light text-mint leading-[0.9] tracking-[-0.02em] mb-8">
            {weddingData.couple.groom.firstName}
          </motion.h1>
          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="flex items-center justify-center gap-4 mb-8">
            <span className="w-12 h-px bg-lavender/40" />
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-ink-muted font-sans">{weddingData.wedding.displayDate}</span>
            <span className="w-12 h-px bg-lavender/40" />
          </motion.div>
          <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="mb-8">
            <Countdown targetDate={weddingData.wedding.date} />
          </motion.div>
          <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp} className="flex items-center justify-center gap-4">
            <button onClick={() => scrollTo("#details")} className="inline-flex items-center justify-center h-12 px-7 bg-mint text-cream text-[0.8rem] uppercase tracking-[0.2em] font-sans font-medium border border-lavender/30 rounded-[3px] transition-all duration-300 hover:bg-mint-dark hover:-translate-y-0.5 active:scale-[0.98]">
              Wedding Details
            </button>
            <button onClick={() => scrollTo("#rsvp")} className="inline-flex items-center justify-center h-12 px-7 bg-transparent text-mint text-[0.8rem] uppercase tracking-[0.2em] font-sans font-medium border border-sage rounded-[3px] transition-all duration-300 hover:bg-sage-light/50 hover:-translate-y-0.5 active:scale-[0.98]">
              RSVP Now
            </button>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: desktopPhotoY }} className="flex-shrink-0">
          <div className="relative">
            <div className="w-72 h-[26rem] lg:w-80 lg:h-[30rem] rounded-t-full border-[3px] border-lavender/40 overflow-hidden relative shadow-xl shadow-lavender/10">
              <img src="/og-image.jpg" alt="Oreoluwa and Daberechukwu" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-cream/40 to-transparent" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-gradient-to-r from-transparent via-lavender/40 to-transparent" />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
              <span className="text-[0.65rem] font-serif text-lavender/50 tracking-wider">O &amp; D</span>
            </div>
            <svg className="absolute -left-10 top-1/4 w-16 h-24 opacity-[0.15]" viewBox="0 0 60 100" fill="none">
              <path d="M30 90 Q20 60 25 40 Q30 20 20 10 Q35 25 35 45 Q35 65 30 90" stroke="#3A7D5C" strokeWidth="1"/>
              <circle cx="20" cy="10" r="2" fill="#9B8CB7" opacity="0.5"/>
            </svg>
            <svg className="absolute -right-10 top-1/3 w-16 h-24 opacity-[0.15] scale-x-[-1]" viewBox="0 0 60 100" fill="none">
              <path d="M30 90 Q20 60 25 40 Q30 20 20 10 Q35 25 35 45 Q35 65 30 90" stroke="#9B8CB7" strokeWidth="1"/>
              <circle cx="20" cy="10" r="2" fill="#3A7D5C" opacity="0.5"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
