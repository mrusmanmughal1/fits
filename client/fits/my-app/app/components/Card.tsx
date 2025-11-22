import React from 'react';

interface CardProps {
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
      className={`card ${interactiveClass} ${cursorClass} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

