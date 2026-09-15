"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const photos = [
  { id: 1, label: "Engagement", src: "/images/IMG_7872.JPG", aspect: "aspect-[3/4]" },
  { id: 2, label: "Portrait", src: "/images/IMG_3769.JPG", aspect: "aspect-[3/4]" },
  { id: 3, label: "Together", src: "/images/IMG_3773.JPG", aspect: "aspect-[4/3]" },
  { id: 4, label: "Pre-Wedding", src: "/images/IMG_7359.JPG", aspect: "aspect-[3/4]" },
  { id: 5, label: "Moments", src: "/images/IMG_7363.JPG", aspect: "aspect-[3/4]" },
  { id: 6, label: "Celebration", src: "/images/IMG_3764.JPG", aspect: "aspect-[4/3]" },
  { id: 7, label: "Our Journey", src: "/images/IMG_9398.JPG", aspect: "aspect-[3/4]" },
];

function TiltCard({ photo, onClick, index }: { photo: typeof photos[0]; onClick: () => void; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${photo.aspect} relative overflow-hidden rounded-[2px] bg-sage-light cursor-pointer group break-inside-avoid`}
      role="button"
      aria-label={`View ${photo.label} photo`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
    >
      <img
        src={photo.src}
        alt={photo.label}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <span className="text-[0.7rem] sm:text-[0.75rem] font-sans uppercase tracking-wider text-cream/90 drop-shadow-lg">
          {photo.label}
        </span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const currentIdx = lightbox !== null ? photos.findIndex((p) => p.id === lightbox) : -1;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const navigate = useCallback((dir: "prev" | "next") => {
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
      navigate(diff > 0 ? "next" : "prev");
    }
  };

  return (
    <section id="gallery" className="py-14 md:py-20 bg-cream">
      <div className="max-w-5xl mx-auto px-5">
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

        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {photos.map((photo, i) => (
            <TiltCard
              key={photo.id}
              photo={photo}
              index={i}
              onClick={() => setLightbox(photo.id)}
            />
          ))}
        </div>
      </div>

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
              ×
            </button>

            <button onClick={(e) => { e.stopPropagation(); navigate("prev"); }} className="absolute left-3 sm:left-6 text-cream/50 hover:text-cream text-3xl z-10 w-10 h-10 flex items-center justify-center" aria-label="Previous photo">
              ‹
            </button>

            <button onClick={(e) => { e.stopPropagation(); navigate("next"); }} className="absolute right-3 sm:right-6 text-cream/50 hover:text-cream text-3xl z-10 w-10 h-10 flex items-center justify-center" aria-label="Next photo">
              ›
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
                {/* Ken Burns effect */}
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

            {/* Caption */}
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
