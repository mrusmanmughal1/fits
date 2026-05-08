"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { Badge, Button } from "@/components/ui";
import { isEmoji } from "@/lib/utils";
import { StarRating } from "./StarRating";

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

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <div className="group flex flex-col sm:flex-row items-stretch gap-4 bg-white border border-gray-200 rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition">
      <Link
        href={`/products/${product.id}`}
        className="flex flex-col sm:flex-row items-center  justify-center gap-4 flex-1"
      >
        <div className="relative w-full sm:w-48 md:w-56 shrink-0 rounded-2xl bg-white border border-gray-100 overflow-hidden">
          <div className="w-full h-34">
            <Image
              src={product?.images?.[0] || ""}
              alt={product.imageAlt || product.name}
              fill
              className="w-full  object-contain p-4"
            />
          </div>

          {product.badge && (
            <Badge
              variant={product.salePrice ? "sale" : "primary"}
              className="absolute top-3 right-3"
            >
              {product.badge}
            </Badge>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between gap-4 py-1">
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            {product.averageRating !== undefined && product.reviewCount !== undefined && product.reviewCount > 0 && (
              <div className="flex items-center gap-1">
                <StarRating rating={Math.round(product.averageRating)} size="sm" />
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            )}
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
        </div>
      </Link>

      {onAddToCart && (
        <div className="flex justify-center items-center  pb-1">
          <Button
            variant="outline"
            size="md"
            onClick={onAddToCart}
            className="w-full sm:w-auto min-w-[180px]"
          >
            Add To Cart
          </Button>
        </div>
      )}
    </div>
  );
};
