'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';
import { BRANDS } from '@/constants';

export const Brands: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Marquee
          speed={50}
          gradient={true}
          gradientColor="rgb(249, 250, 251)"
          gradientWidth={100}
          pauseOnHover={true}
        >
          {BRANDS.map((brand, index) => (
            <div
              key={index}
              className="bg-white px-12 py-4 rounded-lg shadow-sm hover:shadow-md text-2xl transition-shadow font-semibold text-gray-700 mx-4"
            >
              {brand}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
