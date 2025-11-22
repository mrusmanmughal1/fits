'use client';
import React from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/features/ProductCard';

interface ProductGridProps {
  title: string;
  products: Product[];
  description: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ title, products,description }) => {
  return (
    <section className="py-16  ">
      <div className="container  text-center mx-auto px-4">
        <h2 className="text-3xl font-medium text-gray-900 mb-2">{title}</h2>
        <p className="text-price mb-8">{description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6   pb-4">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              salePrice={product.salePrice}
              image={product.image}
              imageAlt={product.imageAlt}
              badge={product.badge}
              badgeVariant={product.salePrice ? 'sale' : 'primary'}
              onAddToCart={() => console.log('Added to cart')}
              className="min-w-[200px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

