import React from 'react';
import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  badge?: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 overflow-x-auto pb-4">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              salePrice={product.salePrice}
              image={product.image}
              badge={product.badge}
              badgeVariant={product.salePrice ? 'sale' : 'primary'}
              onAddToCart={() => console.log('Added to cart')}
              className="min-w-[200px]"
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

