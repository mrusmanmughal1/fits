import http from "./http";

export interface Review {
  _id: string;
  product: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  title?: string;
  comment: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewSummary {
  averageRating: number;
  reviewCount: number;
  distribution: { 5: number; 4: number; 3: number; 2: number; 1: number };
}

export interface ReviewsPage {
  data: Review[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  userReviewId: string | null;
}

export interface CreateReviewPayload {
  rating: number;
  title?: string;
  comment: string;
}

export const reviewsService = {
  async getReviews(
    productId: string,
    params?: { page?: number; limit?: number; sort?: string },
  ) {
    const res = await http.get(`/products/${productId}/reviews`, { params });
    return res.data as { message: string; data: ReviewsPage };
  },

  async getSummary(productId: string) {
    const res = await http.get(`/products/${productId}/reviews/summary`);
    return res.data as { message: string; data: ReviewSummary };
  },

  async createReview(productId: string, payload: CreateReviewPayload) {
    const res = await http.post(`/products/${productId}/reviews`, payload);
    return res.data as { message: string; data: Review };
  },

  async updateReview(
    productId: string,
    reviewId: string,
    payload: Partial<CreateReviewPayload>,
  ) {
    const res = await http.put(
      `/products/${productId}/reviews/${reviewId}`,
      payload,
    );
    return res.data as { message: string; data: Review };
  },

  async deleteReview(productId: string, reviewId: string) {
    const res = await http.delete(`/products/${productId}/reviews/${reviewId}`);
    return res.data as { message: string; data: null };
  },
};
