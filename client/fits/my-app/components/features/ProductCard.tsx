"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Badge, Button } from "@/components/ui";
import { isEmoji } from "@/lib/utils";
import { StarRating } from "./StarRating";

export interface ProductCardProps extends Omit<
  Product,
  "category" | "description" | "inStock" | "_id"
> {
  onAddToCart?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  salePrice,
  images,
  imageAlt,
  badge,
  badgeVariant = "primary",
  averageRating,
  reviewCount,
  onAddToCart,
  className = "",
}) => {
  const hasSale = salePrice !== undefined && salePrice < price;
  const displayPrice = hasSale ? salePrice : price;
  const originalPrice = hasSale ? price : undefined;
  const ProductImage = images?.[0];

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <div className={`product-card group ${className}`.trim()}>
      <Link href={`/products/${id}`} className="block">
        <div className="relative">
          {ProductImage && (
            <div className="overflow-hidden h-48  rounded-md p-4">
              <Image
                src={ProductImage}
                alt={imageAlt || name}
                className="object-contain  p-4"
                fill
              />
            </div>
          )}
          {badge && (
            <Badge variant={badgeVariant} className="absolute top-2 right-2">
              {badge}
            </Badge>
          )}
        </div>
        <div className="product-info pb-2">
          <h3 className="product-title h-10 group-hover:text-primary transition-colors mb-1">
            {name}
          </h3>
          {averageRating !== undefined &&
            reviewCount !== undefined &&
            reviewCount > 0 && (
              <div className="flex items-center justify-center gap-1 mb-2">
                <StarRating rating={Math.round(averageRating)} size="sm" />
                <span className="text-xs text-gray-500">({reviewCount})</span>
              </div>
            )}
          <div className="flex items-center justify-center gap-2">
            {originalPrice && (
              <span className="product-price-original">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className={hasSale ? "product-price-sale" : "product-price"}>
              ${displayPrice?.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        {onAddToCart && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-full"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};
