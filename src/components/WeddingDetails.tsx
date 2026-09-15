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

export default function WeddingDetails() {
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=The+Charis+Center+Etal+Avenue+Ikeja+Lagos+Nigeria";
  const calendarUrl = (() => {
    const start = "20260320T080000";
    const end = "20260320T180000";
    const title = encodeURIComponent("Oreoluwa & Daberechukwu — Wedding Celebration");
    const location = encodeURIComponent("The Charis Center, Etal Avenue First Bank B/Stop, off Kudirat Abiola Way, Oregun Ikeja, Lagos");
    const details = encodeURIComponent("Wedding ceremony of Oreoluwa Esther Philus-Ogun and Daberechukwu Oladimeji Ekwubiri. Traditional at 8:00 AM, Church at 11:00 AM. Reception follows immediately.");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${location}&details=${details}`;
  })();

  return (
    <section id="details" className="py-14 md:py-20 bg-cream">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-[0.3em] text-lavender/70 font-sans mb-3">
            The Celebration
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-lavender/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-lavender/40" />
            <span className="w-10 h-px bg-lavender/30" />
          </div>
        </motion.div>

        <div className="space-y-0">
          {weddingData.events.map((event, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: fromLeft ? -25 : 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-8"
              >
              <h3 className="text-[1.6rem] sm:text-[1.7rem] font-serif font-light text-mint mb-3">
                {event.title}
              </h3>
              <div className="w-12 h-px bg-lavender/30 mx-auto mb-3" />
              <p className="text-[1.1rem] sm:text-[1rem] font-serif text-ink mb-1">
                {event.date}
              </p>
              {event.time === "Reception Follows Immediately" ? (
                <p className="text-[1rem] sm:text-[1.1rem] font-script text-lavender mb-2">
                  {event.time}
                </p>
              ) : (
                <p className="text-[1rem] sm:text-[1.1rem] font-serif text-lavender mb-2">
                  {event.time}
                </p>
              )}
              <p className="text-[0.9rem] font-sans text-ink mb-0.5">
                {event.venue}
              </p>
              <p className="text-[0.8rem] font-sans text-ink-muted">
                {event.address}
              </p>
              <p className="text-[0.75rem] font-sans text-ink-muted/60 mt-2">
                {event.dressCode}
              </p>
              {i < weddingData.events.length - 1 && (
                <div className="w-16 h-px bg-lavender/20 mx-auto mt-8" />
              )}
            </motion.div>
          )})}
        </div>

        {/* Actions */}
        <motion.div
          custom={5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
        >
          <a href={calendarUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-10 px-6 bg-mint text-cream text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.18em] font-sans font-medium border border-lavender/30 rounded-[3px] transition-all duration-300 hover:bg-mint-dark hover:border-lavender/50 hover:-translate-y-0.5 active:scale-[0.98]">
            Add to Google Calendar
          </a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-10 px-6 bg-transparent text-mint text-[0.75rem] sm:text-[0.8rem] uppercase tracking-[0.18em] font-sans font-medium border border-sage rounded-[3px] transition-all duration-300 hover:border-mint-light/40 hover:bg-sage-light/50 hover:-translate-y-0.5 active:scale-[0.98]">
            Get Directions
          </a>
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