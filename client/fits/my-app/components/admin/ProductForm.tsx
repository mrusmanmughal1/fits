"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon, PlusCircle, Check, X, LayoutGrid, FileText, Settings, Tag } from "lucide-react";
import { Button, Input, Select, Textarea } from "@/components/ui";
import { CreateProductPayload } from "@/services/products";
import { Brand } from "@/services/brands";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  initialData?: Partial<CreateProductPayload>;
  onSubmit: (data: CreateProductPayload) => Promise<void>;
  isLoading?: boolean;
  brands: Brand[];
  categories: string[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  brands,
  categories,
}) => {
  const [formData, setFormData] = useState<Partial<CreateProductPayload>>({
    name: "",
    slug: "",
    description: "",
    brand: "",
    category: "",
    price: 0,
    discountPrice: 0,
    stock: 0,
    images: [""],
    specifications: [{ key: "", value: "" }],
    features: [""],
    isFeatured: false,
    status: "Active",
    ...initialData,
  });

  const [activeTab, setActiveTab] = useState<"general" | "details" | "media" | "inventory">("general");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleArrayChange = (index: number, value: string, field: "images" | "features") => {
    const newArr = [...(formData[field] || [])];
    newArr[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArr }));
  };

  const addArrayItem = (field: "images" | "features") => {
    setFormData((prev) => ({ ...prev, [field]: [...(prev[field] || []), ""] }));
  };

  const removeArrayItem = (index: number, field: "images" | "features") => {
    const newArr = [...(formData[field] || [])];
    newArr.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: newArr }));
  };

  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...(formData.specifications || [])];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setFormData((prev) => ({ ...prev, specifications: newSpecs }));
  };

  const addSpec = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...(prev.specifications || []), { key: "", value: "" }],
    }));
  };

  const removeSpec = (index: number) => {
    const newSpecs = [...(formData.specifications || [])];
    newSpecs.splice(index, 1);
    setFormData((prev) => ({ ...prev, specifications: newSpecs }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as CreateProductPayload);
  };

  const tabs = [
    { id: "general", label: "General Info", icon: FileText },
    { id: "details", label: "Specifications", icon: Settings },
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "inventory", label: "Inventory", icon: Tag },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-sm text-gray-500">Fill in the details to list your product in the store.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {initialData ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 space-y-1 sticky top-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Sections */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === "general" && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. iPhone 15 Pro Max"
                  required
                />
                <Input
                  label="Slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="iphone-15-pro-max"
                  required
                />
              </div>

              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a detailed product description..."
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={categories.map((c) => ({ label: c, value: c }))}
                  required
                />
                <Select
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  options={brands.map((b) => ({ label: b.name, value: b._id }))}
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                  Feature this product on the homepage
                </label>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8 animate-in fade-in slide-in-from-bottom-4">
              {/* Specifications */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Technical Specifications</h3>
                  <Button variant="outline" size="sm" onClick={addSpec} type="button">
                    <Plus className="w-4 h-4 mr-2" /> Add Spec
                  </Button>
                </div>
                <div className="space-y-4">
                  {formData.specifications?.map((spec, index) => (
                    <div key={index} className="flex gap-4 items-end bg-gray-50 p-4 rounded-xl">
                      <div className="flex-1">
                        <Input
                          label={index === 0 ? "Key" : ""}
                          value={spec.key}
                          onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                          placeholder="e.g. Color"
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          label={index === 0 ? "Value" : ""}
                          value={spec.value}
                          onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                          placeholder="e.g. Titanium"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpec(index)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors mb-0.5"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* Features */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Key Features</h3>
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("features")} type="button">
                    <Plus className="w-4 h-4 mr-2" /> Add Feature
                  </Button>
                </div>
                <div className="space-y-4">
                  {formData.features?.map((feature, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <Input
                        value={feature}
                        onChange={(e) => handleArrayChange(index, e.target.value, "features")}
                        placeholder="e.g. Water resistant up to 50m"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, "features")}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Product Images</h3>
                <Button variant="outline" size="sm" onClick={() => addArrayItem("images")} type="button">
                  <Plus className="w-4 h-4 mr-2" /> Add Image URL
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {formData.images?.map((url, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-2xl space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="flex-1">
                        <Input
                          label={`Image URL #${index + 1}`}
                          value={url}
                          onChange={(e) => handleArrayChange(index, e.target.value, "images")}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, "images")}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-6"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    {url && (
                      <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200 bg-white group">
                        <img 
                          src={url} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-full object-contain"
                          onError={(e) => (e.currentTarget.src = "https://placehold.co/400x400?text=Invalid+Image")}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "inventory" && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Price ($)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
                <Input
                  label="Discount Price ($)"
                  name="discountPrice"
                  type="number"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Stock Quantity"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  required
                />
                <Select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={[
                    { label: "Active", value: "Active" },
                    { label: "Draft", value: "Inactive" }, // Match API status
                  ]}
                  required
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
