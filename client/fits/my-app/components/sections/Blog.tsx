import React from 'react';
import { BlogPost } from '@/types';

const blogPosts: BlogPost[] = [
  { id: '1', title: 'Latest Tech Trends 2024', date: 'March 15, 2024', image: '📱' },
  { id: '2', title: 'Best Laptops for Professionals', date: 'March 10, 2024', image: '💻' },
  { id: '3', title: 'Smart Home Essentials', date: 'March 5, 2024', image: '🏠' },
  { id: '4', title: 'Gaming Setup Guide', date: 'March 1, 2024', image: '🎮' },
];

export const Blog: React.FC = () => {
  return (
    <section className="p-16  ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Blogging Refers To Managing Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="       overflow-hidden  ">
              <div className="h-48 bg-gradient-to-br rounded-2xl from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
                {post.image}
              </div>
              <div className="p-6">
                <p className="text-sm text-primary  font-medium mb-2">{post.date}</p>
                <h3 className="font-semibold text-gray-900">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

