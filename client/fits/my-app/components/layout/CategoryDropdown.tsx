"use client";

import React from "react";
import Link from "next/link";
import { useCategories } from "@/hooks/Categories";
import { ChevronDown } from "lucide-react";

export const CategoryDropdown: React.FC = () => {
  const { data: categories = [] } = useCategories();

  return (
    <div className="relative group py-2">
      <button className="flex items-center gap-1 text-gray-700 text-sm font-medium hover:text-primary transition-colors">
        Shop
        <ChevronDown
          className="w-4 h-4 transition-transform group-hover:rotate-180"
          aria-hidden
        />
      </button>

      <div className="absolute left-0 top-full w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="py-2">
            {categories?.map((category: string) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
