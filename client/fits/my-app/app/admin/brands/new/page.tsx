"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandForm } from "@/components/admin/BrandForm";
import { BrandService, Brand } from "@/services/brands";
import { toast } from "react-hot-toast";

export default function NewBrandPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Partial<Brand>) => {
    setIsLoading(true);
    try {
      await BrandService.createBrand(data);
      toast.success("Brand created successfully!");
      router.push("/admin/brands");
    } catch (error: any) {
      console.error("Failed to create brand", error);
      toast.error(error.response?.data?.message || "Failed to create brand.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Brand</h1>
        <p className="text-gray-500 mt-2">Introduce a new brand to your electronics catalog.</p>
      </div>
      
      <BrandForm 
        onSubmit={handleSubmit} 
        isLoading={isLoading} 
      />
    </div>
  );
}
