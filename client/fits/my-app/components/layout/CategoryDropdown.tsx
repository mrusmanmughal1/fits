"use client";

import React from "react";
import Link from "next/link";
import { useCategories } from "@/hooks/Categories";
import { ChevronDown } from "lucide-react";

export const CategoryDropdown: React.FC = () => {
  const { data: categories = [] } = useCategories();

  return (
    <div className="relative group py-6 -my-6 flex items-center">
      <button className="flex items-center gap-1 text-gray-700 text-sm font-medium hover:text-primary transition-colors">
        Shop
        <ChevronDown
          className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
          aria-hidden
        />
      </button>

      {/* Invisible wrapper to maintain hover state while bridging the gap to the nav border */}
      <div className="absolute left-0 top-full  w-[500px] z-50">
        {/* The actual dropdown menu with height and opacity animation */}
        <div className="bg-white rounded-b-xl pb-4 shadow-lg overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-[500px] group-hover:opacity-100 ">
          <div className="p-2 grid grid-cols-3 gap-2">
            {categories?.map((category: string) => (
              <div key={category}>
                <Link
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:text-white hover:bg-primary transition-all duration-200"
                >
                  {category}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
