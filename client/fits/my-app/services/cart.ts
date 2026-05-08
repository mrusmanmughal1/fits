import http from "./http";
import { Product } from "@/types";

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export const cartService = {
  async getCart(): Promise<ApiResponse<Cart>> {
    const response = await http.get("/cart");
    return response.data;
  },

  async addToCart(payload: AddToCartPayload): Promise<ApiResponse<Cart>> {
    const response = await http.post("/cart", payload);
    return response.data;
  },

  async updateQuantity(
    itemId: string,
    quantity: number,
  ): Promise<ApiResponse<Cart>> {
    const response = await http.put(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  async removeFromCart(itemId: string): Promise<ApiResponse<Cart>> {
    const response = await http.delete(`/cart/${itemId}`);
    return response.data;
  },

  async clearCart(): Promise<ApiResponse<void>> {
    const response = await http.delete("/cart");
    return response.data;
  },
};
