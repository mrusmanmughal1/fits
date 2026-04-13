"use client";

import { QuantitySelector } from "./QuantitySelector";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { getProductById } from "@/lib/products";
import { BarChart3, Heart } from "lucide-react";

interface ProductActionsProps {
  productId: string;
  inStock?: boolean;
}

export function ProductActions({
  productId,
  inStock = true,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    const product = getProductById(productId);
    if (product) {
      addItem(product, quantity);
      openCart();
    }
  };

  const handleAddToWishlist = () => {
    // Wishlist functionality would go here
    console.log("Added to wishlist:", productId);
  };

  const handleAddToCompare = () => {
    // Compare functionality would go here
    console.log("Added to compare:", productId);
  };

  return (
    <div className="space-y-6">
      {/* Quantity and Add to Cart */}
      <div className="flex items-center gap-4">
        <QuantitySelector
          min={1}
          max={99}
          initialValue={quantity}
          onChange={setQuantity}
        />
        <button
          className="flex-1 h-12 px-6 rounded-lg bg-linear-to-b from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          {inStock ? "Add To Cart" : "Out of Stock"}
        </button>
      </div>

      {/* Additional Actions */}
      <div className="flex items-center gap-6">
        <button
          onClick={handleAddToCompare}
          className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-sm font-medium">Add To Compare</span>
        </button>
        <button
          onClick={handleAddToWishlist}
          className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium">Add To Wishlist</span>
        </button>
      </div>
    </div>
  );
}
