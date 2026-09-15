"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-3 sm:gap-5">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg bg-white/60 dark:bg-mint-dark/60 backdrop-blur-sm border border-lavender/20 dark:border-lavender/30 flex items-center justify-center shadow-lg">
                <span className="text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem] font-serif text-mint font-light tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
            </div>
            <p className="mt-2 text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.2em] text-ink-muted font-sans">
              {unit.label}
            </p>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="text-lavender/40 text-[1.2rem] sm:text-[1.5rem] font-serif mb-5">:</span>
          )}
        </div>
      ))}
    </div>
  );
}