"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnvelopeOpening from "@/components/EnvelopeOpening";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FamilyInvitation from "@/components/FamilyInvitation";
import WeddingDetails from "@/components/WeddingDetails";
import DressCode from "@/components/DressCode";
import OurStory from "@/components/OurStory";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import RSVPContacts from "@/components/RSVPContacts";
import AsoEbi from "@/components/AsoEbi";
import GiftRegistry from "@/components/GiftRegistry";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import BotanicalDivider from "@/components/BotanicalDivider";
import { useTheme } from "@/lib/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-mint/80 backdrop-blur-sm flex items-center justify-center text-cream/80 hover:text-cream hover:bg-mint md:top-6 md:right-6"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      whileTap={{ scale: 0.9, rotate: 180 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.svg key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }} className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </motion.svg>
        ) : (
          <motion.svg key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }} className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-5 right-5 z-[100] w-11 h-11 rounded-full bg-mint backdrop-blur-sm flex items-center justify-center text-cream hover:bg-mint-dark transition-all duration-300 md:bottom-8 md:right-8 border border-lavender/70 shadow-[0_0_24px_4px_rgba(155,140,183,0.55)]"
      aria-label={playing ? "Pause music" : "Play music"}
    >
      <span className="absolute inset-0 rounded-full border-2 border-lavender/50 animate-ping [animation-duration:2.2s] pointer-events-none" />
      {playing ? (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}
    </button>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const playMusic = useCallback(() => {
    const audio = document.getElementById('wedding-music') as HTMLAudioElement | null;
    if (!audio) return;
    audio.play().then(() => setMusicPlaying(true)).catch(() => {});
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = document.getElementById('wedding-music') as HTMLAudioElement | null;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  }, [musicPlaying]);

  useEffect(() => {
    playMusic();
    const audio = document.getElementById('wedding-music') as HTMLAudioElement | null;
    if (!audio) return;
    const onPlay = () => setMusicPlaying(true);
    const onPause = () => setMusicPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, [playMusic]);

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }
    return () => document.body.classList.remove("scroll-locked");
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    playMusic();
    setIsOpen(true);
    setTimeout(() => setShowContent(true), 100);
  }, [playMusic]);

  const handleReplay = useCallback(() => {
    setShowContent(false);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="relative">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <audio
        id="wedding-music"
        src="/music/MAJOR._-_Why_I_Love_You_(mp3.pm).mp3"
        style={{ display: 'none' }}
        preload="auto"
        loop
      />
      <MusicToggle playing={musicPlaying} onToggle={toggleMusic} />

      <AnimatePresence mode="wait">
        {!isOpen && <EnvelopeOpening key="envelope" onOpen={handleOpen} />}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ScrollProgress />
            <Navigation />
            <ThemeToggle />
            <FloatingElements />

          <div id="home">
            <Hero />
          </div>

          <BotanicalDivider />

          <FamilyInvitation />

          <BotanicalDivider />

          <div id="story">
            <OurStory />
          </div>

          <BotanicalDivider />

          <WeddingDetails />

          <BotanicalDivider />

          <div id="dresscode">
            <DressCode />
          </div>

          <BotanicalDivider />

          <Gallery />

          <BotanicalDivider />

          <div id="asoebi">
            <AsoEbi />
          </div>

          <BotanicalDivider />

          <div id="registry">
            <GiftRegistry />
          </div>

          <BotanicalDivider />

          <div id="faq">
            <FAQ />
          </div>

          <BotanicalDivider />

          <RSVP />

          <BotanicalDivider />

          <RSVPContacts />

          <BotanicalDivider />

          <div id="contact">
            <Contact />
          </div>

          <Footer onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
