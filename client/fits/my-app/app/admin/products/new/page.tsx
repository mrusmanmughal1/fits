"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { useCreateProduct } from "@/hooks/Products/useProducts";
import { useBrands } from "@/hooks/Brands/useBrands";
import { useCategories } from "@/hooks/Categories/useCategories";
import { CreateProductPayload } from "@/services/products";

export default function NewProductPage() {
  const router = useRouter();
  
  const { data: brands = [], isLoading: isLoadingBrands } = useBrands();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();

  const handleSubmit = (data: CreateProductPayload) => {
    createProduct(data, {
      onSuccess: () => {
        router.push("/admin/products");
      },
    });
  };

  if (isLoadingBrands || isLoadingCategories) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Product</h1>
        <p className="text-gray-500 mt-2">Add a new premium product to your electronics store.</p>
      </div>
      
      <ProductForm 
        onSubmit={handleSubmit} 
        isLoading={isCreating} 
        brands={brands} 
        categories={categories} 
      />
    </div>
  );
}
