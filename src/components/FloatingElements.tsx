"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  { text: "Love is patient, love is kind", ref: "1 Corinthians 13:4" },
  { text: "A good wife is from the Lord", ref: "Proverbs 19:14" },
  { text: "Two are better than one", ref: "Ecclesiastes 4:9" },
  { text: "What God has joined together, let no one separate", ref: "Matthew 19:6" },
  { text: "Love never fails", ref: "1 Corinthians 13:8" },
  { text: "Commit your way to the Lord", ref: "Psalm 37:5" },
  { text: "The Lord bless you and keep you", ref: "Numbers 6:24" },
  { text: "Love covers over all wrongs", ref: "1 Peter 4:8" },
  { text: "Be devoted to one another in love", ref: "Romans 12:10" },
  { text: "Faith, hope, and love remain", ref: "1 Corinthians 13:13" },
  { text: "A cord of three strands is not quickly broken", ref: "Ecclesiastes 4:12" },
  { text: "Love one another deeply, from the heart", ref: "1 Peter 1:22" },
  { text: "He who finds a wife finds what is good", ref: "Proverbs 18:22" },
];

const hearts = ["♡", "♥"];
const sparkles = ["✦"];

export default function FloatingElements() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showing, setShowing] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [floatingItems, setFloatingItems] = useState<Array<{ id: number; type: 'heart' | 'sparkle'; char: string; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setShowing(true);
    }, 8000);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!showing || dismissed) return;
    const showTimer = setTimeout(() => setShowing(false), 4000);
    return () => clearTimeout(showTimer);
  }, [showing, currentIndex, dismissed]);

  useEffect(() => {
    if (showing || dismissed) return;
    const hideTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
      setShowing(true);
    }, 50000);
    return () => clearTimeout(hideTimer);
  }, [showing, dismissed]);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      const id = Date.now();
      const isHeart = Math.random() > 0.4;
      const type: 'heart' | 'sparkle' = isHeart ? 'heart' : 'sparkle';
      const char = isHeart
        ? hearts[Math.floor(Math.random() * hearts.length)]
        : sparkles[Math.floor(Math.random() * sparkles.length)];
      const left = Math.random() * 80 + 10;
      const delay = Math.random() * 0.3;
      const duration = 5 + Math.random() * 4;

      setFloatingItems(prev => {
        const newItems = [...prev, { id, type, char, left, delay, duration }];
        return newItems.slice(-5);
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [dismissed]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setFloatingItems(prev => prev.filter(item => Date.now() - item.id < 9000));
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  const dismiss = useCallback(() => {
    setDismissed(true);
    setShowing(false);
  }, []);

  const quote = quotes[currentIndex];

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
        {floatingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: '100vh', x: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.5, 0.5, 0], y: '-20vh', x: [0, 10, -10, 5], scale: [0.5, 0.9, 0.7, 0.5] }}
            transition={{ duration: item.duration, delay: item.delay, ease: 'easeOut' }}
            className={`absolute text-lg sm:text-xl ${
              item.type === 'heart' ? 'text-lavender/40 dark:text-lavender/30' : 'text-lavender/30 dark:text-lavender/20'
            }`}
            style={{ left: `${item.left}%` }}
          >
            {item.char}
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs px-4">
        <AnimatePresence mode="wait">
          {showing && !dismissed && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="bg-mint dark:bg-mint-dark/95 backdrop-blur-md px-5 py-3 rounded-lg shadow-lg border border-lavender/30 relative"
            >
              <button
                onClick={dismiss}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cream dark:bg-mint-dark border border-lavender/30 flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
                aria-label="Dismiss verse"
              >
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-start gap-3">
                <span className="text-lavender text-lg mt-0.5">✦</span>
                <div className="flex-1">
                  <p className="text-[0.75rem] sm:text-[0.8rem] font-serif text-cream leading-snug">
                    {quote.text}
                  </p>
                  {quote.ref && (
                    <p className="text-[0.6rem] sm:text-[0.65rem] text-lavender/80 font-sans mt-1">
                      — {quote.ref}
                    </p>
                  )}
                </div>
                <span className="text-lavender text-lg mt-0.5">✦</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
