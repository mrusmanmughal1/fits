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
import { useBrands, useDeleteBrand } from "@/hooks/Brands/useBrands";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

export default function AdminBrandsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: allBrands = [], isLoading } = useBrands();
  const { mutate: deleteBrand, isPending: isDeleting } = useDeleteBrand();
  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteBrand(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  const filteredBrands = allBrands.data?.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  );

  const brands = filteredBrands?.slice((page - 1) * 10, page * 10);
  const total = filteredBrands?.length;

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brands</h1>
          <p className="text-gray-500 mt-1">
            Manage the brands available in your store.
          </p>
        </div>
        <Link href="/admin/brands/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Brand
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search brands..."
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

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Brand</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20">
                    <Loader size="md" />
                  </td>
                </tr>
              ) : brands.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No brands found.
                  </td>
                </tr>
              ) : (
                brands.map((brand) => (
                  <tr
                    key={brand._id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 p-1">
                          <img
                            src={brand.logo || ""}
                            alt={brand.name}
                            className="w-full h-full object-contain"
                            onError={(e) =>
                              (e.currentTarget.src =
                                "https://placehold.co/100x100?text=B")
                            }
                          />
                        </div>
                        <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {brand.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={brand.isActive ? "success" : "error"}>
                        {brand.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                        {brand.description || "No description"}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/brands/edit/${brand._id}`}>
                          <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                            <Edit2 className="w-5 h-5" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(brand._id)}
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
        title="Delete Brand"
        description="Are you sure you want to permanently delete this brand? This action cannot be undone."
      />
    </div>
  );
}
