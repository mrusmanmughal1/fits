'use client';

import React from 'react';
import { useHoverSound } from '@/hooks/useHoverSound';

interface HoverSoundProps {
  children: React.ReactNode;
  soundPath?: string;
  className?: string;
  as?: 'div' | 'button' | 'a';
  [key: string]: any;
}

export function HoverSound({
  children,
  soundPath = '/sounds/sounds.mp3',
  className = '',
  as = 'div',
  ...props
}: HoverSoundProps) {
  const { playSound } = useHoverSound(soundPath);

  const handleMouseEnter = () => {
    playSound();
  };

  const commonProps = {
    className,
    onMouseEnter: handleMouseEnter,
    ...props,
  };

  switch (as) {
    case 'button':
      return <button {...commonProps}>{children}</button>;
    case 'a':
      return <a {...commonProps}>{children}</a>;
    default:
      return <div {...commonProps}>{children}</div>;
  }
}

