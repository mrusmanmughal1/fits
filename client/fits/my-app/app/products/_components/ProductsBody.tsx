"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";
import { Pagination } from "@/components/ui";
import { ProductFilters } from "./ProductFilters";
import { ProductHeader } from "./ProductHeader";
import { ProductList } from "./ProductList";
import { applyFilters, applySort, FilterValues, SortOption } from "./utils";

const PAGE_SIZE = 12;

interface ProductsBodyProps {
  view: "grid" | "list";
  setView: React.Dispatch<React.SetStateAction<"grid" | "list">>;
  products: Product[];
  originalOrder: Map<string, number>;
  addItem: (product: Product, quantity?: number) => void;
  openCart: (open?: boolean) => void;
  priceBounds: { min: number; max: number };
  sizeCounts: Record<string, number>;
  colorCounts: Record<string, number>;
  formik: {
    values: FilterValues;
    handleChange: React.ChangeEventHandler<
      HTMLInputElement | HTMLSelectElement
    >;
    resetForm: () => void;
    touched: Record<string, any>;
    errors: Record<string, any>;
  };
}

export const ProductsBody: React.FC<ProductsBodyProps> = ({
  view,
  setView,
  products,
  originalOrder,
  addItem,
  openCart,
  priceBounds,
  sizeCounts,
  colorCounts,
  formik,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination when filters/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    formik.values.sort,
    formik.values.priceMin,
    formik.values.priceMax,
    formik.values.sizes.join(","),
    formik.values.colors.join(","),
  ]);

  const filtered = useMemo(
    () => applyFilters(products, formik.values),
    [products, formik.values],
  );
  const sorted = useMemo(
    () => applySort(filtered, formik.values.sort, originalOrder),
    [filtered, formik.values.sort, originalOrder],
  );

  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  // Clamp page if filtered results shrink
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = sorted.slice(start, start + PAGE_SIZE);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <ProductFilters
        sizeCounts={sizeCounts}
        colorCounts={colorCounts}
        priceBounds={priceBounds}
        values={formik.values}
        handleChange={formik.handleChange}
        setFieldValue={formik.setFieldValue}
        resetForm={formik.resetForm}
        errors={formik.errors}
        touched={formik.touched}
      />

      <section className="lg:col-span-10">
        <ProductHeader
          view={view}
          setView={setView}
          totalItems={totalItems}
          sortValue={formik.values.sort}
          onSortChange={formik.handleChange}
        />

        <ProductList
          view={view}
          pageItems={pageItems}
          totalItems={totalItems}
          addItem={addItem}
          openCart={openCart}
        />

        <Pagination
          className="mt-6"
          totalItems={totalItems}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={(p) => {
            setCurrentPage(p);
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        />
      </section>
    </div>
  );
};
