import React from 'react';
import { Button } from './Button';

interface CategoryBannerProps {
  title: string;
  subtitle: string;
  emoji: string;
  gradient?: string;
}

export const CategoryBanner: React.FC<CategoryBannerProps> = ({
  title,
  subtitle,
  emoji,
  gradient = 'bg-gradient-to-br from-gray-50 to-gray-100',
}) => {
  return (
    <div className={`${gradient} rounded-2xl p-8 lg:p-12 flex flex-col justify-between min-h-[300px] relative overflow-hidden`}>
      <div className="relative z-10">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 mb-6">{subtitle}</p>
        <Button variant="outline" size="md" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
          Buy Now
        </Button>
      </div>
      <div className="absolute bottom-0 right-0 text-8xl lg:text-9xl opacity-20">
        {emoji}
      </div>
    </div>
  );
};

