"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import { LayoutGrid, List as ListIcon } from "lucide-react";

import type { Product } from "@/types";
import { Breadcrumb, Pagination } from "@/components/ui";
import { ProductCard } from "@/components/features/ProductCard";
import { ProductListItem } from "@/components/features/ProductListItem";
import { getAllProducts } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";

type ViewMode = "grid" | "list";
type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

const SIZE_OPTIONS = ["Small", "Medium", "Large", "Extra Large"] as const;

const COLOR_OPTIONS = [
  { name: "Red", value: "#EF4444" },
  { name: "Black", value: "#111827" },
  { name: "Camel", value: "#C19A6B" },
  { name: "Orange", value: "#F59E0B" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#84CC16" },
  { name: "Yellow", value: "#FBBF24" },
  { name: "Brown", value: "#92400E" },
] as const;

function effectivePrice(p: Product) {
  return p.salePrice !== undefined && p.salePrice < p.price
    ? p.salePrice
    : p.price;
}

function intersects(a: string[] | undefined, selected: string[]) {
  if (!selected.length) return true;
  if (!a?.length) return false;
  return selected.some((x) => a.includes(x));
}

function applyFilters(products: Product[], values: FilterValues) {
  return products.filter((p) => {
    const pColors = (p.colors ?? []).map((c) => c.name);
    const pSizes = p.sizes ?? [];
    const price = effectivePrice(p);

    return (
      intersects(pSizes, values.sizes) &&
      intersects(pColors, values.colors) &&
      price >= values.priceMin &&
      price <= values.priceMax
    );
  });
}

function applySort(
  products: Product[],
  sort: SortOption,
  originalOrder: Map<string, number>
) {
  const list = [...products];
  if (sort === "relevance") {
    return list.sort(
      (a, b) => (originalOrder.get(a.id) ?? 0) - (originalOrder.get(b.id) ?? 0)
    );
  }
  if (sort === "price-asc")
    return list.sort((a, b) => effectivePrice(a) - effectivePrice(b));
  if (sort === "price-desc")
    return list.sort((a, b) => effectivePrice(b) - effectivePrice(a));
  if (sort === "name-asc")
    return list.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "name-desc")
    return list.sort((a, b) => b.name.localeCompare(a.name));
  return list;
}

type FilterValues = {
  sizes: string[];
  colors: string[];
  priceMin: number;
  priceMax: number;
  sort: SortOption;
};

const PAGE_SIZE = 12;

type ProductsBodyProps = {
  view: ViewMode;
  setView: React.Dispatch<React.SetStateAction<ViewMode>>;
  products: Product[];
  originalOrder: Map<string, number>;
  addItem: (product: Product, quantity?: number) => void;
  openCart: (open?: boolean) => void;
  priceBounds: { min: number; max: number };
  sizeCounts: Record<(typeof SIZE_OPTIONS)[number], number>;
  colorCounts: Record<(typeof COLOR_OPTIONS)[number]["name"], number>;
  formik: {
    values: FilterValues;
    handleChange: React.ChangeEventHandler<
      HTMLInputElement | HTMLSelectElement
    >;
    resetForm: () => void;
    touched: Record<string, any>;
    errors: Record<string, any>;
  };
};

function ProductsBody({
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
}: ProductsBodyProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination when filters/sort change
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formik.values.sort,
    formik.values.priceMin,
    formik.values.priceMax,
    formik.values.sizes.join(","),
    formik.values.colors.join(","),
  ]);

  const filtered = useMemo(
    () => applyFilters(products, formik.values),
    [products, formik.values]
  );
  const sorted = useMemo(
    () => applySort(filtered, formik.values.sort, originalOrder),
    [filtered, formik.values.sort, originalOrder]
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
      {/* Filters */}
      <aside className="lg:col-span-2">
        <Form className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="text-sm text-primary hover:underline"
            >
              Clear
            </button>
          </div>

          {/* Size */}
          <section className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">Size</h3>
            <div className="space-y-3">
              {SIZE_OPTIONS.map((size) => (
                <label
                  key={size}
                  className="flex items-center justify-between text-sm text-gray-800"
                >
                  <span className="flex items-center gap-3">
                    <Field
                      type="checkbox"
                      name="sizes"
                      value={size}
                      className="h-4 w-4 rounded border-gray-300 accent-primary"
                    />
                    <span>{size}</span>
                  </span>
                  <span className="text-price">({sizeCounts[size] ?? 0})</span>
                </label>
              ))}
            </div>
          </section>

          {/* Color */}
          <section className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">Color</h3>
            <div className="space-y-3">
              {COLOR_OPTIONS.map((c) => (
                <label
                  key={c.name}
                  className="flex items-center justify-between text-sm text-gray-800"
                >
                  <span className="flex items-center gap-3">
                    <Field
                      type="checkbox"
                      name="colors"
                      value={c.name}
                      className="h-4 w-4 rounded border-gray-300 accent-primary"
                    />
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-3.5 w-3.5 rounded-full border border-gray-200"
                        style={{ backgroundColor: c.value }}
                      />
                      <span>{c.name}</span>
                    </span>
                  </span>
                  <span className="text-price">
                    ({colorCounts[c.name] ?? 0})
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Price */}
          <section className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">Price</h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-900 font-medium">
                ${formik.values.priceMin.toFixed(2)} - $
                {formik.values.priceMax.toFixed(2)}
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  name="priceMin"
                  min={priceBounds.min}
                  max={formik.values.priceMax}
                  value={formik.values.priceMin}
                  onChange={formik.handleChange}
                  className="w-full accent-primary"
                />
                <input
                  type="range"
                  name="priceMax"
                  min={formik.values.priceMin}
                  max={priceBounds.max}
                  value={formik.values.priceMax}
                  onChange={formik.handleChange}
                  className="w-full accent-primary"
                />
              </div>

              {(formik.touched.priceMin && formik.errors.priceMin) ||
              (formik.touched.priceMax && formik.errors.priceMax) ? (
                <p className="text-sm text-red-600">
                  {String(formik.errors.priceMin || formik.errors.priceMax)}
                </p>
              ) : null}
            </div>
          </section>
        </Form>
      </aside>

      {/* Products */}
      <section className="lg:col-span-10  ">
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
              There are <span className="font-semibold">{totalItems}</span>{" "}
              products.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">Sort by:</span>
            <select
              name="sort"
              value={formik.values.sort}
              onChange={formik.handleChange}
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

        {totalItems === 0 ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center">
            <p className="text-gray-700 font-medium">No products found.</p>
            <p className="text-sm text-price mt-2">
              Try clearing filters or adjusting price range.
            </p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {pageItems.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                salePrice={p.salePrice}
                image={p.image}
                imageAlt={p.imageAlt}
                badge={p.badge}
                badgeVariant={p.salePrice ? "sale" : "primary"}
                onAddToCart={() => {
                  addItem(p, 1);
                  openCart(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {pageItems.map((p) => (
              <ProductListItem
                key={p.id}
                product={p}
                onAddToCart={() => {
                  addItem(p, 1);
                  openCart(true);
                }}
              />
            ))}
          </div>
        )}

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
}

export default function ProductsPage() {
  const products = useMemo(() => getAllProducts(), []);
  const originalOrder = useMemo(
    () => new Map(products.map((p, idx) => [p.id, idx])),
    [products]
  );
  const { addItem, openCart } = useCart();

  const [view, setView] = useState<ViewMode>("grid");

  const priceBounds = useMemo(() => {
    const prices = products.map(effectivePrice);
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
    return { min, max };
  }, [products]);

  const sizeCounts = useMemo(() => {
    return Object.fromEntries(
      SIZE_OPTIONS.map((s) => [
        s,
        products.filter((p) => p.sizes?.includes(s)).length,
      ])
    ) as Record<(typeof SIZE_OPTIONS)[number], number>;
  }, [products]);

  const colorCounts = useMemo(() => {
    return Object.fromEntries(
      COLOR_OPTIONS.map((c) => [
        c.name,
        products.filter((p) => (p.colors ?? []).some((x) => x.name === c.name))
          .length,
      ])
    ) as Record<(typeof COLOR_OPTIONS)[number]["name"], number>;
  }, [products]);

  const initialValues: FilterValues = {
    sizes: [],
    colors: [],
    priceMin: priceBounds.min,
    priceMax: priceBounds.max,
    sort: "relevance",
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        sizes: Yup.array()
          .of(Yup.string().oneOf([...SIZE_OPTIONS]))
          .default([]),
        colors: Yup.array()
          .of(Yup.string().oneOf(COLOR_OPTIONS.map((c) => c.name)))
          .default([]),
        priceMin: Yup.number()
          .min(priceBounds.min)
          .max(priceBounds.max)
          .required(),
        priceMax: Yup.number()
          .min(Yup.ref("priceMin"))
          .max(priceBounds.max)
          .required(),
        sort: Yup.mixed<SortOption>()
          .oneOf([
            "relevance",
            "price-asc",
            "price-desc",
            "name-asc",
            "name-desc",
          ])
          .required(),
      }),
    [priceBounds.max, priceBounds.min]
  );

  return (
    <div className="min-h-screen bg-accent">
      <main className="container max-w-[90%] mx-auto px-4 py-8">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Headphones" }]}
        />

        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900">Headphones</h1>
          <p className="mt-3 text-sm text-price leading-relaxed max-w-5xl">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi.
          </p>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => undefined}
        >
          {(formik) => (
            <ProductsBody
              view={view}
              setView={setView}
              products={products}
              originalOrder={originalOrder}
              addItem={addItem}
              openCart={openCart}
              priceBounds={priceBounds}
              sizeCounts={sizeCounts}
              colorCounts={colorCounts}
              formik={formik}
            />
          )}
        </Formik>
      </main>
    </div>
  );
}
