"use client";

import React, { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Check, X } from "lucide-react";
import { Button, Input, Textarea, Select } from "@/components/ui";
import { Brand } from "@/services/brands";
import { cn } from "@/lib/utils";

interface BrandFormProps {
  initialData?: Partial<Brand>;
  onSubmit: (data: Partial<Brand>) => Promise<void>;
  isLoading?: boolean;
}

export const BrandForm: React.FC<BrandFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<Partial<Brand>>({
    name: "",
    description: "",
    logo: "",
    isActive: true,
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Brand" : "Add New Brand"}
          </h2>
          <p className="text-sm text-gray-500">Add a new brand to your electronics store portfolio.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {initialData ? "Update Brand" : "Create Brand"}
          </Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Brand Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Apple, Samsung"
            required
          />
          <Select
            label="Status"
            name="isActive"
            value={formData.isActive ? "true" : "false"}
            onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.value === "true" }))}
            options={[
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ]}
            required
          />
        </div>

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a brief history or description of the brand..."
          rows={4}
        />

        <div className="space-y-4">
          <Input
            label="Brand Logo URL"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="https://example.com/brand-logo.png"
          />
          
          {formData.logo && (
            <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200 bg-white p-4">
              <img 
                src={formData.logo} 
                alt="Brand Logo Preview" 
                className="w-full h-full object-contain"
                onError={(e) => (e.currentTarget.src = "https://placehold.co/400x400?text=Invalid+Logo")}
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
