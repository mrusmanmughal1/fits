import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui";

interface ProductShowcaseProps {
  title: string;
  subtitle?: string;
  gradient?: string;
  image?: string;
  position?: string;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  title,
  gradient,
  image,
  subtitle,
  position,
}) => {
  return (
    <div className="overflow-hidden">
      <div
        className={`relative h-[600px] flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden ${
          image ? "" : gradient || "bg-gradient-to-br from-pink-50 to-purple-50"
        }`}
      >
        {/* Background Image */}
        {image && (
          <>
            <div className="absolute inset-0 z-0 transition-transform duration-500 ease-out hover:scale-110">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
            {/* Content wrapper with relative positioning - stays static */}
            <div className={`relative z-10 w-full flex flex-col lg:flex-row ${position}  gap-8 p-8 lg:p-12`}>
              <div className=" ">
                <p className="text-xl font-medium text-price mb-2">
                  {subtitle}
                </p>
                <h2 className="text-xl lg:text-4xl font-bold w-3/4  mb-4  ">
                  {title}
                </h2>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur-sm"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Fallback to gradient if no image */}
        {!image && (
          <>
            <div className={`	flex-1  ${position}`}>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
              >
                Buy Now
              </Button>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="flex flex-wrap justify-center gap-4">
                {Array.from({ length: emojiCount }).map((_, i) => (
                  <div
                    key={i}
                    className="text-6xl lg:text-7xl transform hover:scale-110 transition-transform"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
