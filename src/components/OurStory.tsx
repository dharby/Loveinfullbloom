"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { weddingData } from "@/data/wedding";

function TimelineItem({ item, index }: { item: typeof weddingData.story[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -30 : 30, scale: 0.96 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-10 sm:pl-12 pb-10 last:pb-0"
    >
      {/* Animated dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.4, type: "spring", stiffness: 260, damping: 12 }}
        className="absolute left-[0.65rem] sm:left-[0.85rem] top-1 w-[0.7rem] h-[0.7rem] rounded-full bg-cream border-[1.5px] border-lavender/60"
      />
      {/* Pulse ring on dot */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: [0.8, 1.8, 1.6], opacity: [0.6, 0.3, 0] } : {}}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="absolute left-[0.6rem] sm:left-[0.8rem] top-[0.15rem] w-[0.8rem] h-[0.8rem] rounded-full border border-lavender/40 pointer-events-none"
      />

      <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.25em] font-serif text-lavender mb-1">
        {item.year}
      </p>
      <h3 className="text-[1rem] sm:text-[1.25rem] font-serif text-mint font-medium mb-1.5">
        {item.title}
      </h3>
      <p className="text-[0.8rem] sm:text-[0.85rem] text-ink-muted font-sans leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function OurStory() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 80%", "end 30%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="story" className="py-16 md:py-24 bg-cream">
      <div className="max-w-2xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.3em] text-lavender/70 font-sans mb-3">
            Our Story
          </p>
          <h2 className="text-[2rem] sm:text-[2.2rem] font-serif font-light text-mint mb-2">
            How We Met
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-lavender/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-lavender/40" />
            <span className="w-10 h-px bg-lavender/30" />
          </div>
        </motion.div>

        <div ref={lineRef} className="relative">
          {/* Animated vertical line */}
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute left-[1.1rem] sm:left-[1.3rem] top-0 bottom-0 w-px bg-gradient-to-b from-sage/30 via-lavender/50 to-sage/30 origin-top"
          />

          {weddingData.story.map((m, i) => (
            <TimelineItem key={m.year} item={m} index={i} />
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
