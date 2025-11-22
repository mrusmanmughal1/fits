'use client';

import React, { useState } from 'react';
import { Button } from './Button';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Get Latest News & Update Newsletter
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mt-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <Button type="submit" variant="primary" size="lg" className="bg-primary text-white hover:bg-primary-hover">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

