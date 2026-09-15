"use client";

import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const dressImages = [
  { src: "/images/dresscode-1.jpg", alt: "Traditional wedding attire in Mint and Lavender" },
  { src: "/images/dresscode-2.jpg", alt: "Couple in traditional Nigerian wedding attire" },
  { src: "/images/dresscode-3.jpg", alt: "Women's and men's collection in Mint, Lavender and Sage" },
  { src: "/images/dresscode-4.jpg", alt: "Individual traditional attire looks" },
];

export default function DressCode() {
  return (
    <section id="dresscode" className="py-14 md:py-20 bg-cream dark:bg-mint">
      <div className="max-w-5xl mx-auto px-5">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.3em] text-lavender/70 font-sans mb-3">
            Dress to Celebrate
          </p>
          <h2 className="text-[1.8rem] sm:text-[2.2rem] font-serif font-light text-mint dark:text-cream mb-2">
            What to Wear
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 h-px bg-lavender/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-lavender/40" />
            <span className="w-10 h-px bg-lavender/30" />
          </div>
          <p className="text-[0.85rem] sm:text-[0.9rem] text-ink-muted dark:text-cream/60 font-sans max-w-lg mx-auto leading-relaxed">
            We kindly request all guests to dress in traditional Nigerian attire. Please wear colors from our wedding palette: Mint, Lavender, or Sage.
          </p>
        </motion.div>

        {/* Dress code images */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10"
        >
          {dressImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
              className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-sage-light dark:bg-mint-dark group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mint/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Color swatches - Mint, Lavender, Sage */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="grid grid-cols-3 gap-3 sm:gap-6 mb-10 max-w-lg mx-auto"
        >
          {[
            { name: "Mint", hex: "var(--color-mint)", desc: "Fresh and elegant" },
            { name: "Lavender", hex: "var(--color-lavender)", desc: "Soft and romantic" },
            { name: "Sage", hex: "var(--color-sage)", desc: "Natural and sophisticated" },
          ].map((c, i) => (
            <div key={c.hex} className="text-center group">
              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-full aspect-square max-w-[6rem] sm:max-w-[7rem] md:max-w-[8rem] rounded-[2px] overflow-hidden border border-sage/40 dark:border-mint-light/30 transition-transform duration-500 group-hover:scale-[1.03]"
              >
                <div className="absolute inset-0" style={{ backgroundColor: c.hex }} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.06] group-hover:to-transparent transition-all duration-500" />
              </motion.div>
              <p className="mt-3 text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.15em] font-sans text-mint dark:text-cream font-medium">
                {c.name}
              </p>
              <p className="mt-1 text-[0.65rem] sm:text-[0.7rem] text-ink-muted/50 dark:text-cream/40 font-sans leading-relaxed hidden sm:block">
                {c.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Dress code info */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="py-6 px-5 border border-sage/40 dark:border-mint-light/30 rounded-[2px] text-center max-w-md mx-auto"
        >
          <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.2em] text-lavender/60 font-sans mb-2">
            Dress Code
          </p>
          <p className="text-[0.9rem] sm:text-[0.95rem] font-serif text-mint dark:text-cream font-medium mb-1">
            Strictly Traditional
          </p>
          <p className="text-[0.75rem] sm:text-[0.8rem] text-ink-muted/60 dark:text-cream/50 font-sans">
            Traditional Nigerian attire in Mint, Lavender, or Sage
          </p>
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-12">
        <span className="w-8 h-px bg-lavender/20" />
        <span className="w-1 h-1 rounded-full bg-lavender/30" />
        <span className="w-8 h-px bg-lavender/20" />
      </div>
    </section>
  );
}