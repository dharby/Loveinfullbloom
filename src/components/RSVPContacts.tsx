"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function RSVPContacts() {
  const wa = (num: string) => `https://wa.me/234${num.startsWith("0") ? num.slice(1) : num}`;

  return (
    <section className="py-10 md:py-16 bg-cream">
      <div className="max-w-2xl mx-auto px-5">
        <motion.p
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="text-center text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.3em] text-ink-muted/60 font-sans mb-8"
        >
          Need Help With Your RSVP?
        </motion.p>

        <div className="grid grid-cols-1 gap-4">
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
              <p className="text-[1.1rem] font-serif text-mint font-medium mb-0.5">{c.name}</p>
              <p className="text-[0.8rem] sm:text-[0.85rem] text-ink-muted font-sans mb-4">{c.phone}</p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={`tel:${c.phone.replace('+234', '234')}`}
                  className="h-8 px-4 flex items-center justify-center text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.15em] font-sans text-mint border border-mint/20 rounded-[2px] transition-all duration-300 hover:bg-mint hover:text-cream hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Call
                </a>
                <a
                  href={wa(c.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 px-4 flex items-center justify-center text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.15em] font-sans text-cream bg-mint border border-lavender/30 rounded-[2px] transition-all duration-300 hover:bg-mint-dark hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}