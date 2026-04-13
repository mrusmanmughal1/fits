"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

export function ShoppingCart() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalItems,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
  } = useCart();

  if (!isOpen) return null;

  const isEmoji = (img: string | any): boolean => {
    return (
      typeof img === "string" &&
      img.length <= 2 &&
      !img.startsWith("/") &&
      !img.startsWith("http")
    );
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 bg-opacity-50 z-50"
        onClick={closeCart}
      />

      {/* Cart Popup */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-1 bg-price/10 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">
            Shopping Cart ({getTotalItems()})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close cart"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <svg
                className="w-16 h-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-gray-500 text-md">Your cart is empty</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {items.map((item) => {
                const price = item.salePrice || item.price;
                const itemTotal = price * item.quantity;
                const itemImage =
                  item.images && item.images.length > 0
                    ? item.images[0]
                    : item.image;

                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      {isEmoji(itemImage) ? (
                        <div className="w-full h-full flex items-center justify-center text-3xl">
                          {itemImage as string}
                        </div>
                      ) : (
                        <Image
                          src={itemImage}
                          alt={item.imageAlt || item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {item.quantity} X
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatPrice(itemTotal)}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
              </span>
              <span className="font-semibold text-gray-900">
                {formatPrice(getSubtotal())}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(getShipping())}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total (tax excl.)</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(getSubtotal() + getShipping())}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total (tax incl.)</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(getTotal())}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxes:</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(getTax())}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200 flex gap-4">
            <Link
              href="/cart"
              onClick={closeCart}
              className="flex-1 px-6 py-3 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors text-center"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex-1 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-blue-700 transition-colors text-center"
            >
              Check Out
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
