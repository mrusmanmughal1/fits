import React from 'react';
import { Button } from './Button';

interface ProductShowcaseProps {
  title: string;
  gradient: string;
  emoji: string;
  emojiCount: number;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  title,
  gradient,
  emoji,
  emojiCount,
}) => {
  return (
    <div className={`${gradient} rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8`}>
      <div className="flex-1">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
          Buy Now
        </Button>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: emojiCount }).map((_, i) => (
            <div key={i} className="text-6xl lg:text-7xl transform hover:scale-110 transition-transform">
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

