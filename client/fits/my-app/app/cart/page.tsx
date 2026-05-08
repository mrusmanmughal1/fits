"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, Lock } from "lucide-react";

import { Breadcrumb, Button } from "@/components/ui";
import { useCartApi } from "@/hooks";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

function getItemImage(product: Product) {
  const img = product.images?.[0] ?? product.image;
  const isEmoji =
    typeof img === "string" &&
    img.length <= 2 &&
    !img.startsWith("/") &&
    !img.startsWith("http");
  return { img, isEmoji };
}

export default function CartPage() {
  const { cart, isLoading, updateQuantity, removeItem, clearCart } =
    useCartApi();

  const items = cart?.items || [];
  const subtotal = cart?.totalAmount || 0;
  const totalItems = cart?.totalQuantity || 0;

  const shipping = subtotal > 0 ? 7 : 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent">
        <div className="text-center">
          <p className="text-gray-900 font-bold text-xl">Loading your cart</p>
          <p className="text-gray-500 text-sm mt-1">
            Getting your items ready...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent">
      <main className="container max-w-[90%] mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Your cart</h1>
          <p className="text-sm text-price mt-2">
            Review items and proceed to checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mb-6 bg-white rounded-3xl border border-amber-200 p-8 text-center">
            <p className="text-gray-800 font-medium">
              Your cart is currently empty.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-block text-sm font-bold text-primary hover:underline"
            >
              Start shopping
            </Link>
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: items */}
          <section className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
              <div className="flex items-center justify-between gap-3 mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Items ({totalItems})
                </h2>
                {items.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => clearCart()}
                    className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Clear cart
                  </button>
                ) : null}
              </div>

              <div className="space-y-4 h-[600px] overflow-auto p-2 scrollbar-thin">
                {items.map((item) => {
                  const product = item.product;
                  const price = product?.salePrice || product?.price || 0;
                  const lineTotal = price * item.quantity;
                  const { img, isEmoji } = getItemImage(product);

                  return (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border border-gray-200"
                    >
                      <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
                        {isEmoji ? (
                          <div className="text-3xl">{img}</div>
                        ) : (
                          <Image
                            src={img as string}
                            alt={product.imageAlt || product.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {product.name}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-sm">
                          <span className="font-semibold text-gray-900">
                            {formatPrice(price)}
                          </span>
                          {product.salePrice ? (
                            <span className="text-xs text-gray-500 line-through">
                              {formatPrice(product.price)}
                            </span>
                          ) : null}
                        </div>
                        {item.size && (
                          <p className="text-xs text-gray-500 mt-1">
                            Size: {item.size}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity({
                                itemId: item._id,
                                quantity: item.quantity - 1,
                              })
                            }
                            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:border-primary/40 hover:text-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity({
                                itemId: item._id,
                                quantity: item.quantity + 1,
                              })
                            }
                            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:border-primary/40 hover:text-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Line total + remove */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(lineTotal)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item._id)}
                            className="p-2 rounded-xl text-gray-400 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <Link
                  href="/products"
                  className="text-sm text-gray-700 hover:text-primary transition-colors"
                >
                  &lt; Continue shopping
                </Link>
                <Link
                  href="/checkout"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Go to checkout
                </Link>
              </div>
            </div>
          </section>

          {/* Right: summary */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-7">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Order summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(tax)}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-base font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-base font-semibold text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/checkout" className="block">
                  <Button type="button" variant="primary" size="lg" fullWidth>
                    Proceed to checkout
                  </Button>
                </Link>
                {!isUsingDummyCart ? (
                  <Link href="/products" className="block">
                    <Button type="button" variant="outline" size="lg" fullWidth>
                      Continue shopping
                    </Button>
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="bg-white/60 rounded-3xl border border-dashed border-gray-300 p-6 md:p-7">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Secure checkout
                  </h3>
                  <p className="text-xs text-gray-600">
                    Your payment and personal data are protected with secure
                    encryption.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
