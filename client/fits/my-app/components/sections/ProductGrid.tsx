"use client";
import React, { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/features/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductGridProps {
  title: string;
  products: Product[];
  description: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  products,
  description,
}) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const { addItem, openCart } = useCart();

  return (
    <section className="pb-16 pt-4 relative group">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium text-gray-900 mb-2">{title}</h2>
          <p className="text-price">{description}</p>
        </div>

        <div className="relative px-4 sm:px-10">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl,
              nextEl,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
              1536: {
                slidesPerView: 5,
              },
            }}
            className="pb-12"
          >
            {products?.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  salePrice={product.salePrice}
                  images={product.images}
                  imageAlt={product.imageAlt}
                  badge={product.badge}
                  badgeVariant={product.salePrice ? "sale" : "primary"}
                  onAddToCart={() => {
                    addItem(product, 1);
                    openCart(true);
                  }}
                  className="h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button
            ref={(node) => setPrevEl(node)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            ref={(node) => setNextEl(node)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
