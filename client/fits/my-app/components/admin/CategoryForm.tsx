"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon, FileText, LayoutGrid } from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";
import { CreateCategoryPayload } from "@/services/categories";
import { cn } from "@/lib/utils";

interface CategoryFormProps {
  initialData?: Partial<CreateCategoryPayload>;
  onSubmit: (data: CreateCategoryPayload) => Promise<void>;
  isLoading?: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<Partial<CreateCategoryPayload>>({
    name: "",
    slug: "",
    description: "",
    image: "",
    ...initialData,
  });

  // Auto-slug generation
  useEffect(() => {
    if (!initialData && formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.name, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as CreateCategoryPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Category" : "Add New Category"}
          </h2>
          <p className="text-sm text-gray-500">Create a new category to organize your products.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {initialData ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Smartphones"
            required
          />
          <Input
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="smartphones"
            required
          />
        </div>

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a brief description for this category..."
          rows={4}
        />

        <div className="space-y-4">
          <Input
            label="Category Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/category-image.jpg"
          />
          
          {formData.image && (
            <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200 bg-white group">
              <img 
                src={formData.image} 
                alt="Category Preview" 
                className="w-full h-full object-contain"
                onError={(e) => (e.currentTarget.src = "https://placehold.co/400x400?text=Invalid+Image")}
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
