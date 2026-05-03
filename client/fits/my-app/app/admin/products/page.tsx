"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Edit2, Trash2 } from "lucide-react";
import {
  Button,
  Badge,
  Pagination,
  DeleteConfirmModal,
  Loader,
} from "@/components/ui";
import { useProducts, useDeleteProduct } from "@/hooks/Products/useProducts";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useProducts({ page, limit: 10, search });
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  const products = data?.data || [];
  const total = data?.total || 0;
  return (
    <div className=" space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">
            Manage your store's inventory and product details.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Product
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <Filter className="w-5 h-5" /> Filters
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20">
                    <Loader size="md" />
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No products found. Start by adding one!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {product.images?.[0]}
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-100">
                          <Image
                            src={product.images?.[0] || ""}
                            alt={product.name}
                            className="w-full h-full object-contain"
                            onError={(e) =>
                              (e.currentTarget.src =
                                "https://placehold.co/100x100?text=P")
                            }
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="primary">{product.category}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </div>
                      {product.salePrice && (
                        <div className="text-xs text-gray-400 line-through">
                          ${product.salePrice.toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          product.inStock ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="success">Active</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/products/edit/${product.id}`}>
                          <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                            <Edit2 className="w-5 h-5" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > 10 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/30">
            <Pagination
              currentPage={page}
              totalItems={total}
              pageSize={10}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Product"
        description="Are you sure you want to permanently delete this product? This action cannot be undone."
      />
    </div>
  );
}
