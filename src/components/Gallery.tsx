"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  { id: 1, label: "Engagement", src: "/images/IMG_7872.JPG", aspect: "aspect-[3/4]" },
  { id: 2, label: "Portrait", src: "/images/IMG_3769.JPG", aspect: "aspect-[3/4]" },
  { id: 3, label: "Together", src: "/images/IMG_3773.JPG", aspect: "aspect-[4/3]" },
  { id: 4, label: "Pre-Wedding", src: "/images/IMG_7359.JPG", aspect: "aspect-[3/4]" },
  { id: 5, label: "Moments", src: "/images/IMG_7363.JPG", aspect: "aspect-[3/4]" },
  { id: 6, label: "Celebration", src: "/images/IMG_3764.JPG", aspect: "aspect-[4/3]" },
  { id: 7, label: "Our Journey", src: "/images/IMG_9398.JPG", aspect: "aspect-[3/4]" },
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
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="relative overflow-hidden rounded-[2px] bg-sage-light cursor-pointer group break-inside-avoid"
              onClick={() => setLightbox(photo.id)}
              role="button"
              aria-label={`View ${photo.label} photo`}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setLightbox(photo.id); }}
            >
              <div className={`${photo.aspect} relative`}>
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
              </div>
            </motion.div>
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
              className="w-[85vw] max-w-2xl max-h-[85vh] bg-cream/10 rounded-[2px] flex items-center justify-center overflow-hidden"
            >
              {!failedImages[lightbox] ? (
                <img
                  src={photos[currentIdx]?.src}
                  alt={photos[currentIdx]?.label}
                  className="w-full h-full object-contain"
                  onError={() => lightbox && handleImageError(lightbox)}
                />
              ) : (
                <span className="text-cream/40 text-[0.8rem] sm:text-[0.85rem] font-sans uppercase tracking-wider">
                  {photos[currentIdx]?.label}
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
