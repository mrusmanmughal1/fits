import { CATEGORY_API_BASE } from "@/constants";
import http from "./http";
export interface PaginatedResponse<T> {
  message: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    totalItems?: number;
  };
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}
export interface CategoryQuery {
  search?: string;
  tags?: string[];
  location?: string;
  page?: number;
  limit?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export const CategoryService = {
  // Get all categories
  getCategories: (params?: CategoryQuery) =>
    http.get<ApiResponse<string[]>>("/categories", {
      params,
    }),

  // Get admin categories with full objects
  getAdminCategories: (params?: CategoryQuery) =>
    http.get<ApiResponse<{ categories: Category[]; total: number }>>("/admin/categories", {
      params,
    }),

  // Create a new category
  createCategory: (payload: CreateCategoryPayload) =>
    http.post<ApiResponse<Category>>("/admin/categories", payload),

  // Update a category
  updateCategory: (id: string, payload: Partial<CreateCategoryPayload>) =>
    http.put<ApiResponse<Category>>(`/admin/categories/${id}`, payload),

  // Delete a category
  deleteCategory: (id: string) =>
    http.delete<ApiResponse<void>>(`/admin/categories/${id}`),
};
