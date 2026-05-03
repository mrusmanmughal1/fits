import http from "./http";
import { Product } from "@/types";

export interface ProductQuery {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  search?: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface CreateProductPayload {
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discountPrice: number;
  stock: number;
  images: string[];
  specifications: {
    [key: string]: string;
  }[];
  features: string[];
  isFeatured: boolean;
  status: "Active" | "Inactive";
}

export const productsService = {
  async getProducts(
    query?: ProductQuery,
  ): Promise<ApiResponse<{ products: Product[]; total: number }>> {
    const response = await http.get("/products", { params: query });
    return response.data;
  },

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    const response = await http.get(`/products/${id}`);
    return response.data;
  },

  async createProduct(
    payload: CreateProductPayload,
  ): Promise<ApiResponse<Product>> {
    const response = await http.post("/admin/products", payload);
    return response.data;
  },

  async updateProduct(
    id: string,
    payload: Partial<CreateProductPayload>,
  ): Promise<ApiResponse<Product>> {
    const response = await http.put(`/admin/products/${id}`, payload);
    return response.data;
  },

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    const response = await http.delete(`/admin/products/${id}`);
    return response.data;
  },
};
