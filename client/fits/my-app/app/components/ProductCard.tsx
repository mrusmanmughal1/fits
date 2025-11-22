import React from 'react';
import Image from 'next/image';
import { Button } from './Button';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  imageAlt?: string;
  badge?: string;
  badgeVariant?: 'primary' | 'success' | 'error' | 'sale';
  onAddToCart?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  salePrice,
  image,
  imageAlt,
  badge,
  badgeVariant = 'primary',
  onAddToCart,
  className = '',
}) => {
  const hasSale = salePrice !== undefined && salePrice < price;
  const displayPrice = hasSale ? salePrice : price;
  const originalPrice = hasSale ? price : undefined;

  // Check if image is an emoji (simple check)
  const isEmoji = image.length <= 2 && !image.startsWith('/') && !image.startsWith('http');

  return (
    <div className={`product-card ${className}`.trim()}>
      <div className="relative">
        {isEmoji ? (
          <div className="product-image flex items-center justify-center text-8xl bg-gradient-to-br from-gray-100 to-gray-200">
            {image}
          </div>
        ) : (
          <Image
            src={image}
            alt={imageAlt || name}
            width={400}
            height={400}
            className="product-image"
          />
        )}
        {badge && (
          <span className={`badge badge-${badgeVariant} absolute top-2 right-2`}>
            {badge}
          </span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        <div className="flex items-center gap-2">
          <span className={hasSale ? 'product-price-sale' : 'product-price'}>
            ${displayPrice?.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="product-price-original">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {onAddToCart && (
          <button
            onClick={onAddToCart}
            className="w-full mt-4 btn btn-outline border-2 border-primary text-primary hover:bg-primary hover:text-white"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

