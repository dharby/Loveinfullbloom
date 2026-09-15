"use client";

import { useEffect, useRef, useCallback } from "react";

const colors = ["#9B8CB7", "#C4B8D9", "#3A7D5C", "#8FB89A", "#5A9D7C", "#E8E0F0"];

interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  delay: string;
  duration: string;
  size: string;
  rotation: string;
}

function generatePieces(): ConfettiPiece[] {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: `${Math.random() * 0.8}s`,
    duration: `${2 + Math.random() * 2}s`,
    size: `${6 + Math.random() * 8}px`,
    rotation: `${Math.random() * 360}deg`,
  }));
}

export default function Confetti({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevActive = useRef(false);

  const renderConfetti = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    const pieces = generatePieces();
    pieces.forEach((p) => {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      el.style.left = p.left;
      el.style.backgroundColor = p.color;
      el.style.animationDelay = p.delay;
      el.style.animationDuration = p.duration;
      el.style.width = p.size;
      el.style.height = p.size;
      el.style.borderRadius = p.id % 3 === 0 ? "50%" : p.id % 3 === 1 ? "2px" : "0";
      el.style.transform = `rotate(${p.rotation})`;
      container.appendChild(el);
    });
  }, []);

  useEffect(() => {
    if (active && !prevActive.current) {
      renderConfetti();
    }
    if (!active && containerRef.current) {
      containerRef.current.innerHTML = "";
    }
    prevActive.current = active;
  }, [active, renderConfetti]);

  if (!active) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[200]" aria-hidden="true" />
  );
}
