"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  { id: 1, label: "Engagement", src: "/images/IMG_7872.JPG" },
  { id: 2, label: "Portrait", src: "/images/IMG_3769.JPG" },
  { id: 3, label: "Together", src: "/images/IMG_3773.JPG" },
  { id: 4, label: "Pre-Wedding", src: "/images/IMG_7359.JPG" },
  { id: 5, label: "Moments", src: "/images/IMG_7363.JPG" },
  { id: 6, label: "Celebration", src: "/images/IMG_3764.JPG" },
  { id: 7, label: "Our Journey", src: "/images/IMG_9398.JPG" },
];

const AUTO_PLAY_INTERVAL = 4000;

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const currentIdx = lightbox !== null ? photos.findIndex((p) => p.id === lightbox) : -1;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play
  useEffect(() => {
    if (paused || lightbox !== null) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % photos.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, lightbox]);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % photos.length);
  }, []);

  // Lightbox navigation
  const navigateLightbox = useCallback((dir: "prev" | "next") => {
    if (currentIdx === -1) return;
    const next = dir === "next"
      ? (currentIdx + 1) % photos.length
      : (currentIdx - 1 + photos.length) % photos.length;
    setLightbox(photos[next].id);
  }, [currentIdx]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      navigateLightbox(diff > 0 ? "next" : "prev");
    }
  };

  // Keyboard support for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, navigateLightbox]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section id="gallery" className="py-14 md:py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.3em] text-lavender/70 font-sans mb-3">
            Our Journey
          </p>
          <h2 className="text-[2rem] sm:text-[2.2rem] font-serif font-light text-mint mb-2 text-balance">
            Captured Moments
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-lavender/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-lavender/40" />
            <span className="w-10 h-px bg-lavender/30" />
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Main image */}
          <div className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[3px] bg-sage-light shadow-xl shadow-lavender/10 cursor-pointer"
            onClick={() => setLightbox(photos[current].id)}
            role="button"
            aria-label={`View ${photos[current].label} in full screen`}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setLightbox(photos[current].id); }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={photos[current].src}
                  alt={photos[current].label}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

            {/* Caption */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 pointer-events-none">
              <motion.p
                key={`label-${current}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-[0.9rem] sm:text-[1rem] font-serif text-cream mb-1"
              >
                {photos[current].label}
              </motion.p>
              <motion.p
                key={`count-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-[0.65rem] sm:text-[0.7rem] text-cream/50 font-sans"
              >
                {current + 1} / {photos.length}
              </motion.p>
            </div>

            {/* Pause indicator */}
            {paused && (
              <div className="absolute top-4 right-4 pointer-events-none">
                <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <svg className="w-3 h-3 text-cream/70" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                  <span className="text-[0.6rem] text-cream/70 font-sans uppercase tracking-wider">Paused</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-mint hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            aria-label="Previous photo"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-mint hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            aria-label="Next photo"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-6 h-2 bg-mint"
                    : "w-2 h-2 bg-lavender/30 hover:bg-lavender/50"
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-0.5 bg-lavender/10 rounded-full overflow-hidden max-w-xs mx-auto">
            <motion.div
              key={`progress-${current}-${paused}`}
              initial={{ width: "0%" }}
              animate={{ width: paused ? undefined : "100%" }}
              transition={{ duration: paused ? 0 : AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
              className="h-full bg-gradient-to-r from-mint to-lavender rounded-full"
              style={{ width: paused ? "0%" : undefined }}
            />
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-mint-dark/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-label="Photo lightbox"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 text-cream/60 hover:text-cream text-2xl z-10 w-10 h-10 flex items-center justify-center" aria-label="Close lightbox">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }} className="absolute left-3 sm:left-6 text-cream/50 hover:text-cream z-10 w-10 h-10 flex items-center justify-center" aria-label="Previous photo">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }} className="absolute right-3 sm:right-6 text-cream/50 hover:text-cream z-10 w-10 h-10 flex items-center justify-center" aria-label="Next photo">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={lightbox}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-[88vw] max-w-3xl max-h-[85vh] rounded-[4px] overflow-hidden"
              >
                <motion.img
                  src={photos[currentIdx]?.src}
                  alt={photos[currentIdx]?.label}
                  className="w-full h-full object-contain"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: "linear" }}
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="text-[0.75rem] sm:text-[0.8rem] font-serif text-cream/70 mb-1">
                {photos[currentIdx]?.label}
              </p>
              <p className="text-[0.65rem] sm:text-[0.7rem] text-cream/40 font-sans">
                {currentIdx + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
