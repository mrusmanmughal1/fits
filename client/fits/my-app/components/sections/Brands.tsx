'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';
import { BRANDS } from '@/constants';

export const Brands: React.FC = () => {
  return (
    <section className="py-16  ">
      <div className="container  bg-neutral-200 py-10  mx-auto px-4">
        <Marquee
          speed={50}
          gradient={true}
          gradientWidth={0.5}
          pauseOnHover={true}
        >
          {BRANDS.map((brand, index) => (
            <div
              key={index}
              className="bg-white px-12 py-4 my-4 rounded-2xl shadow-md hover:shadow-md text-2xl transition-shadow font-semibold text-gray-700 mx-4"
            >
              {brand}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
