"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  { id: 1, label: "Engagement", span: "col-span-1 row-span-2", src: "/images/gallery-1.jpg" },
  { id: 2, label: "Portrait", span: "col-span-1 row-span-1", src: "/images/gallery-2.jpg" },
  { id: 3, label: "Together", span: "col-span-1 row-span-1", src: "/images/gallery-3.jpg" },
  { id: 4, label: "Pre-Wedding", span: "col-span-1 row-span-2", src: "/images/gallery-4.jpg" },
  { id: 5, label: "Moments", span: "col-span-1 row-span-1", src: "/images/gallery-5.jpg" },
  { id: 6, label: "Celebration", span: "col-span-1 row-span-1", src: "/images/gallery-6.jpg" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const currentIdx = lightbox !== null ? photos.findIndex((p) => p.id === lightbox) : -1;

  const navigate = (dir: "prev" | "next") => {
    if (currentIdx === -1) return;
    const next = dir === "next"
      ? (currentIdx + 1) % photos.length
      : (currentIdx - 1 + photos.length) % photos.length;
    setLightbox(photos[next].id);
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id: number) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
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
          <h2 className="text-[2rem] sm:text-[2.2rem] font-serif font-light text-mint mb-2">
            Captured Moments
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-lavender/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-lavender/40" />
            <span className="w-10 h-px bg-lavender/30" />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 auto-rows-[7rem] sm:auto-rows-[10rem]">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className={`${photo.span} relative overflow-hidden rounded-[2px] bg-sage-light cursor-pointer group`}
              onClick={() => setLightbox(photo.id)}
              role="button"
              aria-label={`View ${photo.label} photo`}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setLightbox(photo.id); }}
            >
              {!failedImages[photo.id] ? (
                <img
                  src={photo.src}
                  alt={photo.label}
                  loading="lazy"
                  onLoad={() => handleImageLoad(photo.id)}
                  onError={() => handleImageError(photo.id)}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                    loadedImages[photo.id] ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : null}
              <div className={`absolute inset-0 transition-opacity duration-500 ${
                loadedImages[photo.id] && !failedImages[photo.id]
                  ? "bg-gradient-to-br from-transparent via-transparent to-mint/20 opacity-0 group-hover:opacity-100"
                  : "bg-gradient-to-br from-sage-light via-cream to-sage/20 opacity-60"
              }`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-[0.7rem] sm:text-[0.75rem] font-sans uppercase tracking-wider transition-colors ${
                  loadedImages[photo.id] && !failedImages[photo.id]
                    ? "text-cream/0 group-hover:text-cream/80 drop-shadow-lg"
                    : "text-ink-muted/40 group-hover:text-ink-muted/60"
                }`}>
                  {failedImages[photo.id] ? photo.label : ""}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-6 text-[0.45rem] sm:text-[0.7rem] text-ink-muted/40 font-sans uppercase tracking-wider">
          Photos coming soon
        </p>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-mint/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-label="Photo lightbox"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 text-cream/60 hover:text-cream text-2xl z-10 w-10 h-10 flex items-center justify-center"
              aria-label="Close lightbox"
            >
              ×
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate("prev"); }}
              className="absolute left-3 sm:left-6 text-cream/50 hover:text-cream text-3xl z-10 w-10 h-10 flex items-center justify-center"
              aria-label="Previous photo"
            >
              ‹
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate("next"); }}
              className="absolute right-3 sm:right-6 text-cream/50 hover:text-cream text-3xl z-10 w-10 h-10 flex items-center justify-center"
              aria-label="Next photo"
            >
              ›
            </button>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[85vw] max-w-2xl aspect-[4/3] bg-cream/10 rounded-[2px] flex items-center justify-center overflow-hidden"
            >
              {!failedImages[lightbox] ? (
                <img
                  src={photos[currentIdx]?.src}
                  alt={photos[currentIdx]?.label}
                  className="w-full h-full object-cover"
                  onError={() => lightbox && handleImageError(lightbox)}
                />
              ) : (
                <span className="text-cream/40 text-[0.8rem] sm:text-[0.85rem] font-sans uppercase tracking-wider">
                  {photos[currentIdx]?.label} — Photo {photos[currentIdx]?.id}
                </span>
              )}
            </motion.div>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-cream/40 text-[0.7rem] sm:text-[0.75rem] font-sans">
              {currentIdx + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
