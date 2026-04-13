"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { Badge, Button } from "@/components/ui";
import { isEmoji } from "@/lib/utils";

interface ProductListItemProps {
  product: Product;
  onAddToCart?: () => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onAddToCart,
}) => {
  const hasSale =
    product.salePrice !== undefined && product.salePrice < product.price;
  const displayPrice = hasSale ? product.salePrice : product.price;
  const originalPrice = hasSale ? product.price : undefined;

  const isImageEmoji = typeof product.image === "string" && isEmoji(product.image);
  const isStaticImage = typeof product.image === "object" && "src" in product.image;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col sm:flex-row items-stretch gap-4 bg-white border border-gray-200 rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition"
    >
      <div className="relative w-full sm:w-48 md:w-56 shrink-0 rounded-2xl bg-white border border-gray-100 overflow-hidden">
        {isImageEmoji ? (
          <div className="flex items-center justify-center text-7xl aspect-square">
            {product.image as string}
          </div>
        ) : isStaticImage || typeof product.image === "string" ? (
          <Image
            src={product.image}
            alt={product.imageAlt || product.name}
            width={420}
            height={420}
            className="w-full aspect-square object-contain p-6"
          />
        ) : null}

        {product.badge && (
          <Badge variant={product.salePrice ? "sale" : "primary"} className="absolute top-3 right-3">
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between gap-4 py-1">
        <div className="space-y-2">
          <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p
              className="text-sm text-price leading-relaxed"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.description}
            </p>
          )}

          <div className="flex items-center gap-3">
            {originalPrice !== undefined && (
              <span className="text-sm text-price line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-semibold text-gray-900">
              ${displayPrice?.toFixed(2)}
            </span>
          </div>
        </div>

        {onAddToCart && (
          <div className="flex sm:justify-end">
            <Button
              variant="outline"
              size="md"
              onClick={handleAddToCart}
              className="w-full sm:w-auto min-w-[180px]"
            >
              Add To Cart
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
};


