"use client";

import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { useSearchParams } from "next/navigation";

import { Breadcrumb, Loader } from "@/components/ui";
import { useProducts } from "@/hooks/Products/useProducts";
import { useCartApi } from "@/hooks";
import { useCart } from "@/contexts/CartContext";

import { ProductsBody } from "./_components/ProductsBody";
import { SIZE_OPTIONS, COLOR_OPTIONS } from "./_components/constants";
import { effectivePrice, FilterValues, SortOption } from "./_components/utils";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  const brand = searchParams.get("brand") || undefined;

  const { data, isLoading } = useProducts({
    search,
    category,
    brand,
    limit: 100,
  });
  const products = data?.data || [];
  const originalOrder = useMemo(
    () => new Map(products.map((p, idx) => [p._id, idx])),
    [products],
  );
  const { addToCart } = useCartApi();
  const { openCart } = useCart();

  const handleAddItem = (product: Product, quantity: number = 1) => {
    addToCart({ productId: product._id, quantity });
    openCart(true);
  };

  const [view, setView] = useState<"grid" | "list">("grid");

  const priceBounds = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 1000 };
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
      ]),
    ) as Record<(typeof SIZE_OPTIONS)[number], number>;
  }, [products]);

  const colorCounts = useMemo(() => {
    return Object.fromEntries(
      COLOR_OPTIONS.map((c) => [
        c.name,
        products.filter((p) => (p.colors ?? []).some((x) => x.name === c.name))
          .length,
      ]),
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
    [priceBounds.max, priceBounds.min],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

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
              addItem={handleAddItem}
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
