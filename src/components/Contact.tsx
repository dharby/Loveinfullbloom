"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Contact() {
  const wa = (num: string) => `https://wa.me/234${num.startsWith("0") ? num.slice(1) : num}`;

  return (
    <section id="contact" className="py-14 md:py-20 bg-cream">
      <div className="max-w-2xl mx-auto px-5">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.3em] text-lavender/70 font-sans mb-3">
            Need Help?
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 h-px bg-lavender/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-lavender/40" />
            <span className="w-10 h-px bg-lavender/30" />
          </div>
          <p className="text-[0.85rem] sm:text-[0.9rem] text-ink-muted font-sans max-w-md mx-auto leading-relaxed">
            {weddingData.contact.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {weddingData.contact.persons.map((c, i) => (
            <motion.div
              key={c.name}
              custom={i + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal}
              className="text-center py-6 px-5 border border-sage/40 rounded-[2px]"
            >
              <p className="text-[1rem] font-serif text-mint font-medium mb-0.5">{c.name}</p>
              <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.15em] text-lavender/60 font-sans mb-1">{c.role}</p>
              <p className="text-[0.8rem] sm:text-[0.85rem] text-ink-muted font-sans mb-4">{c.phone}</p>
              <div className="flex items-center justify-center gap-3">
                <a href={`tel:${c.phone.replace('+234', '234')}`}
                  className="h-8 px-4 flex items-center justify-center text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.15em] font-sans text-mint border border-mint/20 rounded-[2px] transition-all duration-300 hover:bg-mint hover:text-cream hover:-translate-y-0.5 active:scale-[0.98]">
                  Call
                </a>
                <a href={wa(c.whatsapp)} target="_blank" rel="noopener noreferrer"
                  className="h-8 px-4 flex items-center justify-center text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.15em] font-sans text-cream bg-mint border border-lavender/30 rounded-[2px] transition-all duration-300 hover:bg-mint-dark hover:-translate-y-0.5 active:scale-[0.98]">
                  WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-12">
        <span className="w-8 h-px bg-lavender/20" />
        <span className="w-1 h-1 rounded-full bg-lavender/30" />
        <span className="w-8 h-px bg-lavender/20" />
      </div>
    </section>
  );
}