"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Badge, Button } from "@/components/ui";
import { isEmoji } from "@/lib/utils";

export interface ProductCardProps
  extends Omit<Product, "category" | "description" | "inStock"> {
  onAddToCart?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  salePrice,
  image,
  imageAlt,
  badge,
  badgeVariant = "primary",
  onAddToCart,
  className = "",
}) => {
  const hasSale = salePrice !== undefined && salePrice < price;
  const displayPrice = hasSale ? salePrice : price;
  const originalPrice = hasSale ? price : undefined;

  // Check if image is emoji (string) or StaticImageData
  const isImageEmoji = typeof image === "string" && isEmoji(image);
  const isStaticImage = typeof image === "object" && "src" in image;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <Link
      href={`/products/${id}`}
      className={`product-card block ${className}`.trim()}
    >
      <div className="relative">
        {isImageEmoji ? (
          <div className="product-image flex items-center justify-center text-8xl">
            {image as string}
          </div>
        ) : isStaticImage || typeof image === "string" ? (
          <Image
            src={image}
            alt={imageAlt || name}
            width={400}
            height={400}
            className="product-image"
          />
        ) : null}
        {badge && (
          <Badge variant={badgeVariant} className="absolute top-2 right-2">
            {badge}
          </Badge>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{name}</h3>
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
        {onAddToCart && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            className="w-full"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </Link>
  );
};
