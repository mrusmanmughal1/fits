"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useCategories } from "@/hooks/Categories";
import { ChevronDown } from "lucide-react";

export const CategoryDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: categories  } = useCategories();
  console.log("Fetched categories:", categories); // Debugging log
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 text-gray-700 text-sm font-medium hover:text-primary transition-colors">
        Shop
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="py-2">
           
            {categories?.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
