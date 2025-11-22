import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  className = '',
  onClick,
}) => {
  const interactiveClass = interactive ? 'card-interactive' : '';
  const cursorClass = onClick || interactive ? 'cursor-pointer' : '';
  
  return (
    <div
      className={cn('card', interactiveClass, cursorClass, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

