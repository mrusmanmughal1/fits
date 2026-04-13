"use client";

import { useEffect, useRef } from "react";

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/sounds.mp3");
    audioRef.current.volume = 0.3;
    audioRef.current.preload = "auto";

    const playSound = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const isButton =
        target.tagName === "BUTTON" || Boolean(target.closest("button"));
      const isLink = target.tagName === "A" || Boolean(target.closest("a"));
      const isInteractive =
        target.classList.contains("hover-sound") ||
        target.getAttribute("role") === "button" ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isButton || isLink || isInteractive) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {
            // ignore autoplay restrictions
          });
        }
      }
    };

    document.addEventListener("mouseenter", playSound, true);
    return () => {
      document.removeEventListener("mouseenter", playSound, true);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
