"use client";

import React from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/features/ProductCard";
import { ProductListItem } from "@/components/features/ProductListItem";

interface ProductListProps {
  view: "grid" | "list";
  pageItems: Product[];
  totalItems: number;
  addItem: (product: Product, quantity?: number) => void;
  openCart: (open?: boolean) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  view,
  pageItems,
  totalItems,
  addItem,
  openCart,
}) => {
  if (totalItems === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center">
        <p className="text-gray-700 font-medium">No products found.</p>
        <p className="text-sm text-price mt-2">
          Try clearing filters or adjusting price range.
        </p>
      </div>
    );
  }

  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {pageItems.map((p) => (
          <ProductCard
            key={p._id}
            id={p._id}
            name={p.name}
            price={p.price}
            salePrice={p.salePrice}
            images={p.images}
            imageAlt={p.imageAlt}
            badge={p.badge}
            badgeVariant={p.salePrice ? "sale" : "primary"}
            onAddToCart={() => {
              addItem(p, 1);
              openCart(true);
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {pageItems.map((p) => (
        <ProductListItem
          key={p._id}
          product={p}
          onAddToCart={() => {
            addItem(p, 1);
            openCart(true);
          }}
        />
      ))}
    </div>
  );
};
