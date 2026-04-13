"use client";

import { useState } from "react";

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  initialValue?: number;
  onChange?: (quantity: number) => void;
}

export function QuantitySelector({
  min = 1,
  max = 99,
  initialValue = 1,
  onChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialValue);

  const set = (value: number) => {
    const clamped = Math.max(min, Math.min(max, value));
    setQuantity(clamped);
    onChange?.(clamped);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
      <input
        type="number"
        value={quantity}
        min={min}
        max={max}
        onChange={(e) => set(parseInt(e.target.value || "0", 10) || min)}
        className="w-14 h-10 text-center border-0 focus:outline-none focus:ring-0"
      />
      <div className="flex flex-col border-l border-gray-300">
        <button
          type="button"
          onClick={() => set(quantity + 1)}
          disabled={quantity >= max}
          className="w-8 h-5 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-b border-gray-300"
          aria-label="Increase quantity"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => set(quantity - 1)}
          disabled={quantity <= min}
          className="w-8 h-5 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}


