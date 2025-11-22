'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-8  ">
      <div className="container mx-auto px-4">
        <div className="max-w-[60%] mx-auto">
          {/* White rounded container */}
          <div className="bg-white rounded-4xl p-8 lg:p-12 shadow">
            <div className="text-center">
              {/* Envelope Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-3">
                Get Latest News & Update News letter
              </h2>

              {/* Subheading */}
              <p className="text-sm lg:text-base text-gray-600 mb-8">
                We have all the necessary parts create bike
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row relative gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className=" w-3/4 mx-auto px-4 py-3 rounded-lg bg-accent border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none   focus:ri  focus:border-transparent"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="bg-primary absolute right-10 text-white hover:bg-primary-hover whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
