"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { CategoryService, CreateCategoryPayload } from "@/services/categories";
import { toast } from "react-hot-toast";

export default function NewCategoryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateCategoryPayload) => {
    setIsLoading(true);
    try {
      await CategoryService.createCategory(data);
      toast.success("Category created successfully!");
      router.push("/admin/categories");
    } catch (error: any) {
      console.error("Failed to create category", error);
      toast.error(error.response?.data?.message || "Failed to create category.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Category</h1>
        <p className="text-gray-500 mt-2">Add a new product category to your store structure.</p>
      </div>
      
      <CategoryForm 
        onSubmit={handleSubmit} 
        isLoading={isLoading} 
      />
    </div>
  );
}
