"use client";

import { useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface ProductImageGalleryProps {
  images: (string | StaticImageData)[];
  alt: string;
}

export function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const isEmoji = (img: string | StaticImageData): boolean =>
    typeof img === "string" &&
    img.length <= 2 &&
    !img.startsWith("/") &&
    !img.startsWith("http");

  const mainImage = images[selectedImage] || images[0];

  return (
    <div className="space-y-6">
      <div className="relative aspect-square bg-white rounded-3xl overflow-hidden">
        {isEmoji(mainImage) ? (
          <div className="w-full h-full flex items-center justify-center text-9xl bg-gradient-to-br from-gray-100 to-gray-200">
            {mainImage as string}
          </div>
        ) : (
          <Image
            src={mainImage}
            alt={alt}
            width={900}
            height={900}
            className="w-full h-full object-contain"
            priority
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => {
            const active = index === selectedImage;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  active ? "border-primary" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {isEmoji(image) ? (
                  <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-100">
                    {image as string}
                  </div>
                ) : (
                  <Image
                    src={image}
                    alt={`${alt} - ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


