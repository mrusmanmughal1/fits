"use client";

import { useMemo, useState } from "react";
import { BarChart3, Heart } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { useCart } from "@/contexts/CartContext";
import { getProductById } from "@/lib/products";

interface AddToCartPanelProps {
  productId: string;
  inStock?: boolean;
}

export function AddToCartPanel({
  productId,
  inStock = true,
}: AddToCartPanelProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();

  const disabled = useMemo(() => !inStock, [inStock]);

  const handleAddToCart = () => {
    const product = getProductById(productId);
    if (product) {
      addItem(product, quantity);
      openCart(true);
    }
  };

  const handleAddToCompare = () => {
    console.log("Add To Compare", productId);
  };

  const handleAddToWishlist = () => {
    console.log("Add To Wishlist", productId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <QuantitySelector initialValue={quantity} onChange={setQuantity} />
        <button
          type="button"
          className="flex-1 h-12 px-6 bg-primary rounded-full bg-linear-to-b  text-white font-medium hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          disabled={disabled}
          onClick={handleAddToCart}
        >
          {inStock ? "Add To Cart" : "Out of Stock"}
        </button>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={handleAddToCompare}
          className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-sm font-medium">Add To Compare</span>
        </button>
        <button
          type="button"
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
