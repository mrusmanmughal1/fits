"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService, AddToCartPayload } from "@/services/cart";
import { toast } from "react-hot-toast";

export function useCartApi() {
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartService.getCart(),
    select: (response) => response,
  });

  const addToCartMutation = useMutation({
    mutationFn: (payload: AddToCartPayload) => cartService.addToCart(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(["cart"], response.data);
      toast.success("Added to cart");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartService.updateQuantity(itemId, quantity),
    onSuccess: (response) => {
      queryClient.setQueryData(["cart"], response.data);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: string) => cartService.removeFromCart(itemId),
    onSuccess: (response) => {
      queryClient.setQueryData(["cart"], response.data);
      toast.success("Removed from cart");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to remove item");
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart cleared");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to clear cart");
    },
  });

  return {
    cart: cartQuery.data,
    isLoading: cartQuery.isLoading,
    isError: cartQuery.isError,
    error: cartQuery.error,
    addToCart: addToCartMutation.mutate,
    isAdding: addToCartMutation.isPending,
    updateQuantity: updateQuantityMutation.mutate,
    removeItem: removeItemMutation.mutate,
    clearCart: clearCartMutation.mutate,
  };
}
