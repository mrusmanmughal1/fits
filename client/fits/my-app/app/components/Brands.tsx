import React from 'react';

const brands = ['BOSS', 'Canon', 'DELL', 'Nikon', 'Panasonic', 'PENTAX', 'SAMSUNG'];

export const Brands: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white px-8 py-4 rounded-lg shadow-sm hover:shadow-md transition-shadow font-semibold text-gray-700"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

