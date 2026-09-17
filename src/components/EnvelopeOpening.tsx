"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { weddingData } from "@/data/wedding";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const { theme } = useTheme();
  const [phase, setPhase] = useState<"idle" | "ready" | "seal-release" | "flap-open" | "card-emerge" | "card-reveal" | "transition" | "done">("idle");
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number; dur: number; size: number; rot: number; color: string; drift: number }>>([]);

  // Staggered entrance
  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 600);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = useCallback(() => {
    if (phase !== "ready") return;
    // Step 1: Seal release
    setPhase("seal-release");
    // Step 2: Flap opens
    setTimeout(() => setPhase("flap-open"), 350);
    // Step 3: Card emerges
    setTimeout(() => setPhase("card-emerge"), 1100);
    // Step 4: Card reveal text
    setTimeout(() => setPhase("card-reveal"), 2200);
    // Step 5: Transition to site
    setTimeout(() => {
      setPhase("transition");
      // Spawn petals
      setPetals(Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        dur: 3 + Math.random() * 2.5,
        size: 6 + Math.random() * 12,
        rot: Math.random() * 360,
        color: i % 4 === 0 ? "#9B8CB7" : i % 4 === 1 ? "#C4B8D9" : i % 4 === 2 ? "#3A7D5C" : "#8FB89A",
        drift: (Math.random() - 0.5) * 40,
      })));
    }, 3800);
    // Complete
    setTimeout(() => onOpen(), 5800);
  }, [phase, onOpen]);

  const handleSkip = useCallback(() => onOpen(), [onOpen]);

  const isOpening = phase !== "idle" && phase !== "ready";
  const showCard = phase === "card-emerge" || phase === "card-reveal" || phase === "transition";
  const showText = phase === "card-reveal" || phase === "transition";
  const isDark = theme === "dark";

  const colors = {
    cream: isDark ? "#2D6A4F" : "#FAF8FB",
    creamDark: isDark ? "#1F4D38" : "#F0ECF3",
    mint: isDark ? "#5A9D7C" : "#3A7D5C",
    mintDark: isDark ? "#3A7D5C" : "#2D6A4F",
    mintLight: isDark ? "#7ABD9C" : "#5A9D7C",
    lavender: isDark ? "#C4B8D9" : "#9B8CB7",
    lavenderLight: isDark ? "#E8E0F0" : "#C4B8D9",
    sage: isDark ? "#A8CDB3" : "#8FB89A",
    sageLight: isDark ? "#C5D9CA" : "#E8F0EA",
    ink: isDark ? "#FAF8FB" : "#2C2C2C",
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      style={{ background: isDark 
        ? `linear-gradient(180deg, ${colors.mintDark} 0%, ${colors.mint} 50%, ${colors.mintDark} 100%)` 
        : `linear-gradient(180deg, ${colors.cream} 0%, ${colors.creamDark} 50%, ${colors.cream} 100%)` 
      }}
      role="dialog"
      aria-label="Open Oreoluwa and Daberechukwu's wedding invitation"
    >
      {/* Watercolor background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left watercolor wash */}
        <div 
          className="absolute -top-20 -left-20 w-80 h-80 opacity-[0.15] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${colors.lavenderLight} 0%, transparent 70%)` }}
        />
        {/* Top-right watercolor wash */}
        <div 
          className="absolute -top-10 -right-10 w-60 h-60 opacity-[0.12] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${colors.sageLight} 0%, transparent 70%)` }}
        />
        {/* Bottom watercolor wash */}
        <div 
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-40 opacity-[0.1] rounded-full blur-3xl"
          style={{ background: `radial-gradient(ellipse, ${colors.lavenderLight} 0%, transparent 70%)` }}
        />
        
        {/* Botanical corners - Top Left */}
        <svg className="absolute -top-4 -left-4 w-48 h-48 md:w-64 md:h-64 opacity-[0.08]" viewBox="0 0 200 200" fill="none">
          <path d="M20 180 Q40 120 30 80 Q20 40 60 20 Q80 10 100 30 Q120 50 100 80 Q80 110 60 100 Q40 90 50 70" stroke={colors.lavender} strokeWidth="1.5" fill="none"/>
          <path d="M60 20 Q70 40 90 50 Q110 60 120 40 Q130 20 150 30 Q170 40 160 70 Q150 100 120 90 Q90 80 80 60" stroke={colors.mint} strokeWidth="1" fill="none"/>
          <circle cx="30" cy="80" r="3" fill={colors.lavender} opacity="0.4"/>
          <circle cx="100" cy="30" r="2" fill={colors.lavender} opacity="0.3"/>
          <circle cx="160" cy="70" r="2.5" fill={colors.lavender} opacity="0.35"/>
        </svg>
        
        {/* Botanical corners - Top Right */}
        <svg className="absolute -top-4 -right-4 w-48 h-48 md:w-64 md:h-64 opacity-[0.08] scale-x-[-1]" viewBox="0 0 200 200" fill="none">
          <path d="M20 180 Q40 120 30 80 Q20 40 60 20 Q80 10 100 30 Q120 50 100 80 Q80 110 60 100 Q40 90 50 70" stroke={colors.lavender} strokeWidth="1.5" fill="none"/>
          <path d="M60 20 Q70 40 90 50 Q110 60 120 40 Q130 20 150 30 Q170 40 160 70 Q150 100 120 90 Q90 80 80 60" stroke={colors.mint} strokeWidth="1" fill="none"/>
          <circle cx="30" cy="80" r="3" fill={colors.lavender} opacity="0.4"/>
          <circle cx="100" cy="30" r="2" fill={colors.lavender} opacity="0.3"/>
        </svg>

        {/* Botanical corners - Bottom Left */}
        <svg className="absolute -bottom-6 -left-6 w-52 h-52 md:w-72 md:h-72 opacity-[0.06] rotate-180" viewBox="0 0 200 200" fill="none">
          <path d="M20 180 Q40 120 30 80 Q20 40 60 20 Q80 10 100 30 Q120 50 100 80 Q80 110 60 100 Q40 90 50 70" stroke={colors.lavender} strokeWidth="1.5" fill="none"/>
          <path d="M100 30 Q130 20 150 40 Q170 60 150 90" stroke={colors.mint} strokeWidth="1" fill="none"/>
        </svg>
        
        {/* Botanical corners - Bottom Right */}
        <svg className="absolute -bottom-6 -right-6 w-52 h-52 md:w-72 md:h-72 opacity-[0.06] rotate-180 scale-x-[-1]" viewBox="0 0 200 200" fill="none">
          <path d="M20 180 Q40 120 30 80 Q20 40 60 20 Q80 10 100 30 Q120 50 100 80 Q80 110 60 100 Q40 90 50 70" stroke={colors.lavender} strokeWidth="1.5" fill="none"/>
          <path d="M100 30 Q130 20 150 40 Q170 60 150 90" stroke={colors.mint} strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* Floating petals */}
      <AnimatePresence>
        {phase === "transition" && petals.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "-5vh", x: `${p.x}vw`, opacity: 0, rotate: 0 }}
            animate={{ y: "105vh", opacity: [0, 0.7, 0.7, 0], rotate: p.rot + 360 }}
            transition={{ duration: p.dur, delay: p.delay, ease: "linear" }}
            className="fixed pointer-events-none z-[95]"
            style={{
              width: p.size,
              height: p.size,
              borderRadius: p.id % 3 === 0 ? "50% 0 50% 0" : p.id % 3 === 1 ? "50%" : "2px",
              background: p.color,
              opacity: 0.5,
              "--drift": `${p.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </AnimatePresence>

      {/* Main envelope container */}
      <div className="relative flex flex-col items-center px-6">
        {/* Header text — fades in before envelope */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: phase === "idle" ? 0 : 1, y: phase === "idle" ? 14 : 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 md:mb-8"
        >
          <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.35em] text-lavender font-sans mb-3">
            You&apos;re Invited
          </p>
          <h1 className="text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] font-serif leading-[1.1]" style={{ color: colors.mint }}>
            Oreoluwa & Daberechukwu
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-lavender/40" />
            <span className="text-[0.55rem] uppercase tracking-[0.3em] text-lavender font-sans">Mar 20, 2026</span>
            <span className="w-8 h-px bg-lavender/40" />
          </div>
        </motion.div>

        {/* ENVELOPE */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{
            opacity: phase === "idle" ? 0 : 1,
            y: phase === "idle" ? 20 : 0,
            scale: phase === "idle" ? 0.96 : 1,
          }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[min(26rem,90vw)] sm:w-[min(30rem,85vw)] md:w-[32rem]"
          style={{ perspective: "1800px" }}
          onClick={handleOpen}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleOpen(); }}
          tabIndex={0}
          role="button"
          aria-label="Open the wedding invitation"
        >
          {/* Envelope aspect ratio wrapper */}
          <div className="relative w-full rounded-[3px]" style={{ paddingBottom: "66.67%" }}>
            <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>

              {/* LAYER 1: Envelope back */}
              <div
                className="absolute inset-0 rounded-[3px] overflow-hidden"
                style={{
                  background: isDark 
                    ? `linear-gradient(170deg, ${colors.mintLight} 0%, ${colors.mint} 50%, ${colors.mintDark} 100%)` 
                    : `linear-gradient(170deg, #FFFFFF 0%, ${colors.creamDark} 50%, #E8E0F0 100%)`,
                  boxShadow: `0 20px 60px -20px rgba(45,106,79,0.2), 0 8px 24px -8px rgba(45,106,79,0.1)`,
                }}
              >
                {/* Subtle paper texture */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />
                {/* Inner lining */}
                <div
                  className="absolute inset-[4px] rounded-[2px]"
                  style={{ 
                    background: isDark 
                      ? `linear-gradient(180deg, ${colors.mintDark} 0%, ${colors.mint} 100%)`
                      : `linear-gradient(180deg, ${colors.lavenderLight} 0%, ${colors.cream} 100%)`, 
                    opacity: 0.92 
                  }}
                />
              </div>

              {/* LAYER 2: Invitation card (slides up through V-opening) */}
              <motion.div
                initial={{ opacity: 0, y: "25%" }}
                animate={showCard 
                  ? { opacity: 1, y: "-12%" }
                  : { opacity: 0, y: "25%" }
                }
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-[6%] right-[6%] top-[-12%] bottom-[4%] z-10 rounded-[2px] overflow-hidden"
                style={{
                  background: isDark
                    ? `linear-gradient(175deg, ${colors.mint} 0%, ${colors.mintDark} 100%)`
                    : `linear-gradient(175deg, #FFFFFF 0%, ${colors.cream} 100%)`,
                  boxShadow: "0 16px 40px -16px rgba(45,106,79,0.2)",
                }}
              >
                {/* Lavender border inset */}
                <div className="absolute inset-[6px] sm:inset-[8px] border border-lavender/20 rounded-[1px]" />
                
                {/* Card content */}
                <div className="relative flex h-full flex-col items-center justify-center px-5 py-6 sm:px-8 sm:py-8 text-center">
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.3em] font-sans mb-2"
                    style={{ color: colors.lavender }}
                  >
                    Save the Date
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-[0.4rem] sm:text-[0.45rem] uppercase tracking-[0.25em] font-sans mb-3"
                    style={{ color: colors.lavender }}
                  >
                    The Entire Families Of
                  </motion.p>

                  <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={showText ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="text-[1.5rem] sm:text-[1.9rem] md:text-[2.2rem] font-script leading-[1.15] mb-1" 
                    style={{ color: colors.mint }}
                  >
                    {weddingData.couple.bride.firstName}
                  </motion.h2>
                  
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={showText ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="text-[0.8rem] sm:text-[1rem] font-serif my-0.5"
                    style={{ color: colors.lavender }}
                  >
                    &amp;
                  </motion.span>
                  
                  <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={showText ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ delay: 0.7, duration: 0.7 }}
                    className="text-[1.5rem] sm:text-[1.9rem] md:text-[2.2rem] font-script leading-[1.15]" 
                    style={{ color: colors.mint }}
                  >
                    {weddingData.couple.groom.firstName}
                  </motion.h2>
                </div>
              </motion.div>

              {/* LAYER 3: Envelope front pocket (V-fold with clip-path) */}
              <div className="absolute inset-0 z-20 overflow-hidden rounded-[3px]">
                {/* Bottom V (back triangle) */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: isDark
                      ? `linear-gradient(175deg, ${colors.mintLight} 0%, ${colors.mint} 50%, ${colors.mintDark} 100%)`
                      : `linear-gradient(175deg, #FFFFFF 0%, ${colors.creamDark} 50%, ${colors.cream} 100%)`,
                    clipPath: "polygon(0 36%, 50% 74%, 100% 36%, 100% 100%, 0 100%)",
                  }}
                />
                {/* Left angled flap */}
                <div
                  className="absolute inset-y-0 left-0 w-1/2"
                  style={{
                    background: isDark
                      ? `linear-gradient(125deg, ${colors.mintLight} 0%, ${colors.mint} 100%)`
                      : `linear-gradient(125deg, #F0EBE0 0%, #E5DDCC 100%)`,
                    clipPath: "polygon(0 0, 100% 73%, 100% 100%, 0 100%)",
                  }}
                />
                {/* Right angled flap */}
                <div
                  className="absolute inset-y-0 right-0 w-1/2"
                  style={{
                    background: isDark
                      ? `linear-gradient(235deg, ${colors.mintLight} 0%, ${colors.mint} 100%)`
                      : `linear-gradient(235deg, #F0EBE0 0%, #E5DDCC 100%)`,
                    clipPath: "polygon(100% 0, 0 73%, 0 100%, 100% 100%)",
                  }}
                />
                {/* Bottom shadow gradient */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[40%]"
                  style={{ background: `linear-gradient(0deg, rgba(45,106,79,0.06), transparent)` }}
                />
              </div>

              {/* LAYER 4: Envelope top flap (triangle, hinged at top) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                className="absolute inset-x-0 top-0 h-[68%] z-30"
                style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
              >
                {/* Front face (cream) */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: isDark
                      ? `linear-gradient(180deg, ${colors.mintLight} 0%, ${colors.mint} 100%)`
                      : `linear-gradient(180deg, #F5F0E6 0%, #EDE6D6 100%)`,
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    backfaceVisibility: "hidden",
                    filter: "drop-shadow(0 4px 8px rgba(45,106,79,0.08))",
                  }}
                />
                {/* Back face (mint) */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: isDark
                      ? `linear-gradient(0deg, ${colors.mint}, ${colors.mintDark})`
                      : `linear-gradient(0deg, ${colors.mint}, ${colors.mintDark})`,
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    backfaceVisibility: "hidden",
                    transform: "rotateX(180deg)",
                  }}
                />
              </motion.div>

              {/* LAYER 5: Wax seal */}
        <motion.button
          type="button"
          aria-label="Open the wedding invitation"
          onClick={(e) => { e.stopPropagation(); handleOpen(); }}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleOpen(); } }}
          animate={
                  phase === "seal-release"
                    ? { scale: 0.8, opacity: 0 }
                    : phase === "ready"
                    ? { scale: 1, opacity: 1 }
                    : isOpening
                    ? { scale: 0.8, opacity: 0 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-[52%] z-40 flex h-[3.5rem] w-[3.5rem] sm:h-[4rem] sm:w-[4rem] md:h-[4.5rem] md:w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full cursor-pointer"
                tabIndex={-1}
              >
                {/* Seal body */}
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${colors.lavenderLight}, ${colors.lavender} 40%, ${colors.lavender} 70%, ${colors.lavender} 100%)`,
                    boxShadow: `0 6px 16px -4px rgba(45,106,79,0.3), inset 0 1px 2px rgba(255,255,255,0.3)`,
                  }}
                />
                {/* Conic ring */}
                <span
                  className="absolute inset-0 rounded-full opacity-50"
                  style={{
                    maskImage: "radial-gradient(circle, transparent 58%, black 60%)",
                    WebkitMaskImage: "radial-gradient(circle, transparent 58%, black 60%)",
                    background: `conic-gradient(from 0deg, ${colors.lavender}, ${colors.lavenderLight}, ${colors.lavender}, ${colors.lavenderLight}, ${colors.lavender})`,
                  }}
                />
                {/* Pulse ring */}
                <span
                  className="absolute -inset-2 rounded-full border border-lavender/30"
                  style={{
                    animation: phase === "ready" ? "seal-pulse 2.8s ease-out infinite" : "none",
                  }}
                />
                {/* Initials */}
                <span
                  className="relative text-[0.9rem] sm:text-[1.1rem] md:text-[1.2rem] font-serif font-semibold tracking-tight"
                  style={{ color: colors.cream, textShadow: `0 1px 2px rgba(45,106,79,0.4)` }}
                >
                  {weddingData.monogram.first}&amp;{weddingData.monogram.second}
                </span>
              </motion.button>

            </div>
          </div>
        </motion.div>

        {/* TAP TO OPEN text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "ready" ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-5 sm:mt-6 text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.3em] text-mint/80 dark:text-lavender/80 font-sans select-none"
        >
          Tap to Open
        </motion.p>

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "ready" ? 0.4 : 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ opacity: 1 }}
          onClick={handleSkip}
          className="mt-3 text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.25em] text-mint/80 dark:text-lavender/60 font-sans hover:text-mint/90 dark:hover:text-lavender/80 transition-colors"
        >
          Skip Intro
        </motion.button>

        {/* Privacy notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "ready" ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-4 max-w-xs text-center text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] font-sans"
          style={{ color: isDark ? "rgba(196,184,217,0.75)" : "rgba(45,106,79,0.55)" }}
        >
          Strictly for invited guests — please do not share or forward this invitation
        </motion.p>

        {/* Designed by credit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "ready" ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-6 text-center text-[0.65rem] sm:text-[0.7rem] font-sans tracking-[0.1em]"
          style={{ color: isDark ? "rgba(196,184,217,0.85)" : "rgba(45,106,79,0.75)" }}
        >
          <span className="font-normal text-ink-muted/70 dark:text-cream/70">Website designed by </span>
          <a
            href="https://www.instagram.com/cleekrightstudios?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-mint hover:text-lavender transition-colors"
            aria-label="Visit CleekRight Studios on Instagram"
          >
            cleekrightstudios
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </motion.p>
      </div>
    </div>
  );
}