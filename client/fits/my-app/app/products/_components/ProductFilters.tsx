"use client";

import React from "react";
import { Form, Field } from "formik";
import { SIZE_OPTIONS, COLOR_OPTIONS } from "./constants";

import * as Slider from "@radix-ui/react-slider";

interface ProductFiltersProps {
  sizeCounts: Record<string, number>;
  colorCounts: Record<string, number>;
  priceBounds: { min: number; max: number };
  values: {
    priceMin: number;
    priceMax: number;
    sizes: string[];
    colors: string[];
  };
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => Promise<any>;
  resetForm: () => void;
  errors: Record<string, any>;
  touched: Record<string, any>;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  sizeCounts,
  colorCounts,
  priceBounds,
  values,
  handleChange,
  setFieldValue,
  resetForm,
  errors,
  touched,
}) => {
  const handleSliderChange = (newValues: number[]) => {
    setFieldValue("priceMin", newValues[0]);
    setFieldValue("priceMax", newValues[1]);
  };

  return (
    <aside className="lg:col-span-2">
      <Form className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Filters
          </h2>
          <button
            type="button"
            onClick={() => resetForm()}
            className="text-xs font-bold text-primary hover:text-blue-700 uppercase tracking-widest transition-colors"
          >
            Reset All
          </button>
        </div>

        {/* Size */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Size
          </h3>
          <div className="space-y-2.5">
            {SIZE_OPTIONS.map((size) => (
              <label
                key={size}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <Field
                      type="checkbox"
                      name="sizes"
                      value={size}
                      className="peer h-5 w-5 rounded-md border-gray-200 text-primary focus:ring-primary/20 transition-all cursor-pointer accent-primary"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    {size}
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  {sizeCounts[size] ?? 0}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Color */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Color
          </h3>
          <div className="space-y-2.5">
            {COLOR_OPTIONS.map((c) => (
              <label
                key={c.name}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Field
                    type="checkbox"
                    name="colors"
                    value={c.name}
                    className="peer h-5 w-5 rounded-md border-gray-200 text-primary focus:ring-primary/20 transition-all cursor-pointer accent-primary"
                  />
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full border border-black/5 ring-2 ring-transparent group-hover:ring-gray-100 transition-all"
                      style={{ backgroundColor: c.value }}
                    />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                      {c.name}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  {colorCounts[c.name] ?? 0}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Price */}
        <section className=" border-gray-100/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Price Range
            </h3>
            <span className="text-[10px] font-black bg-white shadow-sm border border-gray-100 text-gray-400 px-2 py-0.5 rounded-md">
              PKR
            </span>
          </div>

          <div className="space-y-4">
            {/* Numerical Inputs */}
            <div className="flex items-center gap-1">
              <div className="flex-1 space-y-1.5">
                <div className="relative group">
                  <input
                    type="number"
                    name="priceMin"
                    value={values.priceMin}
                    onChange={handleChange}
                    className="w-full pl-7  py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none shadow-xs"
                    min={priceBounds.min}
                    max={values.priceMax}
                  />
                </div>
              </div>

              <div className="text-gray-300 font-bold">—</div>

              <div className="flex-1 space-y-1.5">
                <div className="relative group">
                  <input
                    type="number"
                    name="priceMax"
                    value={values.priceMax}
                    onChange={handleChange}
                    className="w-full pl-7  py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none shadow-sm"
                    min={values.priceMin}
                    max={priceBounds.max}
                  />
                </div>
              </div>
            </div>
            {/* Slider Component */}
            <div className="px-2">
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={[values.priceMin, values.priceMax]}
                max={priceBounds.max}
                min={priceBounds.min}
                step={1}
                onValueChange={handleSliderChange}
              >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-1.5">
                  <Slider.Range className="absolute bg-primary rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white border-2 border-primary shadow-lg rounded-full hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all cursor-grab active:cursor-grabbing"
                  aria-label="Min price"
                />
                <Slider.Thumb
                  className="block w-5 h-5 bg-white border-2 border-primary shadow-lg rounded-full hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all cursor-grab active:cursor-grabbing"
                  aria-label="Max price"
                />
              </Slider.Root>
            </div>

            {(touched.priceMin && errors.priceMin) ||
            (touched.priceMax && errors.priceMax) ? (
              <p className="text-[10px] text-red-500 font-bold bg-red-50 p-3 rounded-2xl border border-red-100 animate-in fade-in zoom-in-95">
                {String(errors.priceMin || errors.priceMax)}
              </p>
            ) : null}
          </div>
        </section>
      </Form>
    </aside>
  );
};
