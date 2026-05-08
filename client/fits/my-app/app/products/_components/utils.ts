import type { Product } from "@/types";

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export type FilterValues = {
  sizes: string[];
  colors: string[];
  priceMin: number;
  priceMax: number;
  sort: SortOption;
};

export function effectivePrice(p: Product) {
  return p.salePrice !== undefined && p.salePrice < p.price
    ? p.salePrice
    : p.price;
}

function intersects(a: string[] | undefined, selected: string[]) {
  if (!selected.length) return true;
  if (!a?.length) return false;
  return selected.some((x) => a.includes(x));
}

export function applyFilters(products: Product[], values: FilterValues) {
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

export function applySort(
  products: Product[],
  sort: SortOption,
  originalOrder: Map<string, number>,
) {
  const list = [...products];
  if (sort === "relevance") {
    return list.sort(
      (a, b) =>
        (originalOrder.get(a._id) ?? 0) - (originalOrder.get(b._id) ?? 0),
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
