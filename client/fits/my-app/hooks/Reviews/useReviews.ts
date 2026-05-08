"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { reviewsService, CreateReviewPayload } from "@/services/reviews";
import { toast } from "react-hot-toast";

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useReviews(
  productId: string,
  params?: { page?: number; limit?: number; sort?: string },
) {
  return useQuery({
    queryKey: ["reviews", productId, params],
    queryFn: async () => {
      const res = await reviewsService.getReviews(productId, params);
      return res.data;
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 2,
  });
}

export function useReviewSummary(productId: string) {
  return useQuery({
    queryKey: ["reviews-summary", productId],
    queryFn: async () => {
      const res = await reviewsService.getSummary(productId);
      return res.data;
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 2,
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateReview(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) =>
      reviewsService.createReview(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["reviews-summary", productId] });
      toast.success("Review submitted successfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to submit review");
    },
  });
}

export function useUpdateReview(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reviewId,
      payload,
    }: {
      reviewId: string;
      payload: Partial<CreateReviewPayload>;
    }) => reviewsService.updateReview(productId, reviewId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["reviews-summary", productId] });
      toast.success("Review updated!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update review");
    },
  });
}

export function useDeleteReview(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) =>
      reviewsService.deleteReview(productId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["reviews-summary", productId] });
      toast.success("Review deleted");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to delete review");
    },
  });
}
