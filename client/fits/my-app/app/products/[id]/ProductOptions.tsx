'use client';

import { useState } from 'react';

interface ColorOption {
  name: string;
  value: string;
}

interface ProductOptionsProps {
  colors?: ColorOption[];
  sizes?: string[];
  dimensions?: string[];
  onColorChange?: (color: string) => void;
  onSizeChange?: (size: string) => void;
  onDimensionChange?: (dimension: string) => void;
}

export function ProductOptions({
  colors,
  sizes,
  dimensions,
  onColorChange,
  onSizeChange,
  onDimensionChange,
}: ProductOptionsProps) {
  const [selectedColor, setSelectedColor] = useState(colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || '');
  const [selectedDimension, setSelectedDimension] = useState(dimensions?.[0] || '');

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
    onColorChange?.(colorName);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    onSizeChange?.(size);
  };

  const handleDimensionSelect = (dimension: string) => {
    setSelectedDimension(dimension);
    onDimensionChange?.(dimension);
  };

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      {colors && colors.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color : <span className="text-gray-900">{selectedColor}</span>
          </label>
          <div className="flex items-center gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color.name)}
                className="relative w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all"
                style={{ backgroundColor: color.value }}
                aria-label={`Select color ${color.name}`}
              >
                {selectedColor === color.name && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center border-2 border-white">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
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
      )}

      {/* Size Selection */}
      {sizes && sizes.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size : <span className="text-gray-900">{selectedSize}</span>
          </label>
          <div className="flex items-center gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`px-6 py-2 rounded-full border-2 transition-all ${
                  selectedSize === size
                    ? 'border-primary text-primary bg-white'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 bg-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dimension Selection */}
      {dimensions && dimensions.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dimension : <span className="text-gray-900">{selectedDimension}</span>
          </label>
          <div className="flex items-center gap-3">
            {dimensions.map((dimension) => (
              <button
                key={dimension}
                onClick={() => handleDimensionSelect(dimension)}
                className={`px-6 py-2 rounded-full border-2 transition-all ${
                  selectedDimension === dimension
                    ? 'border-primary text-primary bg-white'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 bg-white'
                }`}
              >
                {dimension}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

