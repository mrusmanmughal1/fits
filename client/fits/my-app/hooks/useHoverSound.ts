'use client';

import { useEffect, useRef } from 'react';

export function useHoverSound(soundPath: string = '/sounds/sounds.mp3') {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(soundPath);
    audioRef.current.volume = 0.3; // Set volume to 30% to avoid being too loud
    audioRef.current.preload = 'auto';

    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundPath]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch((error) => {
        // Handle autoplay restrictions
        console.log('Audio play failed:', error);
      });
    }
  };

  return { playSound };
}

