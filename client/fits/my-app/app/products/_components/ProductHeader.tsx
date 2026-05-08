"use client";

import React from "react";
import { LayoutGrid, List as ListIcon } from "lucide-react";

interface ProductHeaderProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  totalItems: number;
  sortValue: string;
  onSortChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  view,
  setView,
  totalItems,
  sortValue,
  onSortChange,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`h-9 w-9 rounded-full flex items-center justify-center transition ${
              view === "grid"
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={`h-9 w-9 rounded-full flex items-center justify-center transition ${
              view === "list"
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="List view"
          >
            <ListIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="text-sm text-gray-700">
          There are <span className="font-semibold">{totalItems}</span> products.
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">Sort by:</span>
        <select
          name="sort"
          value={sortValue}
          onChange={onSortChange}
          className="select w-[220px] text-sm py-2"
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
};
