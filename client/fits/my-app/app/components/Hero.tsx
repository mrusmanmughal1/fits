import React from 'react';
import { Button } from './Button';
import Image from 'next/image';

export const Hero: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Power Beyond Limits
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl">
              We break and fix your create dreams to all of your electronics
            </p>
            <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
              Shop Now
            </Button>
          </div>

          {/* Laptop Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-8 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-lg shadow-2xl flex items-center justify-center">
                  <div className="text-6xl">💻</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

