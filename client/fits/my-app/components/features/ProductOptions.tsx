"use client";

import { useState } from "react";

export interface ColorOption {
  name: string;
  value: string;
}

interface ProductOptionsProps {
  colors?: ColorOption[];
  sizes?: string[];
  dimensions?: string[];
}

export function ProductOptions({
  colors,
  sizes,
  dimensions,
}: ProductOptionsProps) {
  const [selectedColor, setSelectedColor] = useState(colors?.[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || "");
  const [selectedDimension, setSelectedDimension] = useState(
    dimensions?.[0] || ""
  );

  return (
    <div className="space-y-2">
      {colors?.length ? (
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Color : <span className="text-gray-900">{selectedColor}</span>
          </div>
          <div className="flex items-center gap-3">
            {colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c.name)}
                className={`relative w-6 h-6 rounded-full border-2 transition-all ${
                  selectedColor === c.name
                    ? "border-primary"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: c.value }}
                aria-label={`Select color ${c.name}`}
              >
                {selectedColor === c.name && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center border-2 border-white">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {sizes?.length ? (
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Size : <span className="text-gray-900">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`px-4 text-xs py-2 rounded-full border-2 transition-all  ${
                  selectedSize === s
                    ? "border-primary text-primary"
                    : "border-gray-300 text-gray-700 hover:border-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {dimensions?.length ? (
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Dimension :{" "}
            <span className="text-gray-900">{selectedDimension}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {dimensions.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDimension(d)}
                className={`px-4 text-xs py-2 rounded-full border-2 transition-all  ${
                  selectedDimension === d
                    ? "border-primary text-primary"
                    : "border-gray-300 text-gray-700 hover:border-primary"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
