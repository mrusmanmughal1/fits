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

export const CategoryService = {

    // Get all categories
    getCategories: (params?: CategoryQuery) =>
        http.get<ApiResponse<string[]>>('/categories', {
            params,
        }),

};