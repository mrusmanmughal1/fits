import React from 'react';
import { Button } from '@/components/ui';
import Image from 'next/image';
import pic from "@/public/images/game.webp";

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
    <div className={`${gradient}   rounded-2xl   flex flex-col justify-center items-start  min-h-[300px] relative overflow-hidden`}>
      <div className="absolute  left-10 z-10">
        <p className="text-price font-medium mb-2">{subtitle}</p>
        <h3 className="text-xl lg:text-2xl font-bold w-4/5 text-gray-900 mb-2">{title}</h3>
        <Button variant="outline" size="md" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
          Buy Now
        </Button>
      </div>
      <div className=" ">
         <Image src={pic} alt={title}   />
      </div>
    </div>
  );
};

