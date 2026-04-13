'use client';

import { useState } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface ImageGalleryProps {
  images: (string | StaticImageData)[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const isEmoji = (img: string | StaticImageData): boolean => {
    return typeof img === 'string' && 
      img.length <= 2 && 
      !img.startsWith('/') && 
      !img.startsWith('http');
  };

  const mainImage = images[selectedImage] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-md">
        {isEmoji(mainImage) ? (
          <div className="w-full h-full flex items-center justify-center text-9xl bg-gradient-to-br from-gray-100 to-gray-200">
            {mainImage as string}
          </div>
        ) : (
          <Image
            src={mainImage}
            alt={alt}
            width={800}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => {
            const isSelected = index === selectedImage;
            const isImageEmoji = isEmoji(image);

            return (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  isSelected 
                    ? 'border-primary shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {isImageEmoji ? (
                  <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-gray-100 to-gray-200">
                    {image as string}
                  </div>
                ) : (
                  <Image
                    src={image}
                    alt={`${alt} - View ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
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

