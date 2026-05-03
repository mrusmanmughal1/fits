"use client";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { CategoryQuery, CategoryService } from "@/services/categories";

export function useCategories(params?: CategoryQuery) {
  return useQuery<{ message: string; data: string[] }, AxiosError>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await CategoryService.getCategories(params);
      return response.data; // Extract the data from the ApiResponse wrapper
    },
    select: (data) => data.data, // Transform to just return the string array
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1,
  });
}
