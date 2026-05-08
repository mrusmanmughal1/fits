import http from "./http";
import { ApiResponse } from "./categories";

export interface Brand {
  _id: string;
  name: string;
  logo?: string;
  description?: string;
  isActive: boolean;
}

export const BrandService = {
  getBrands: () => http.get<ApiResponse<Brand[]>>("/admin/brands"),
  createBrand: (payload: Partial<Brand>) =>
    http.post<ApiResponse<Brand>>("/admin/brands", payload),
  updateBrand: (id: string, payload: Partial<Brand>) =>
    http.put<ApiResponse<Brand>>(`/admin/brands/${id}`, payload),
  deleteBrand: (id: string) =>
    http.delete<ApiResponse<void>>(`/admin/brands/${id}`),
};
