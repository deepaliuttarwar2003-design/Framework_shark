"use client";

import { useMemo, useState } from "react";

import InventoryHeader from "../components/InventoryHeader";
import InventoryStats from "../components/InventoryStates";
import SearchFilter from "../components/SearchFilter";
import InventoryTable from "../components/InventoryTable";
import ProductForm from "../components/ProductForm";

import {
  Product,
  useCreateProductMutation,
  useUpdateProductMutation,
  useCreateCategoryMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useGetCategoryQuery, useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../Slices/InventoryApiSlice";

export default function InventoryPage() {
  /* RTK Query */
  const {
    data,
    isLoading,
    error,
  } = useGetProductsQuery();

  const products: Product[] = Array.isArray(data)
    ? data
    : [];

  const [deleteProduct] =
    useDeleteProductMutation();

  /* Filters */
  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  /* Categories */
  const [categories, setCategories] =
    useState<string[]>([
      "All",
      "Electronics",
      "Accessories",
      "Books",
      "Clothing",
      "Furniture",
      "Toys",
      "Groceries",
    ]);

  /* Edit Product */
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  /* Modal States */
  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [formMode, setFormMode] =
    useState<"add" | "edit">("add");

  /* Category Modal */
  const [
    isCategoryFormOpen,
    setIsCategoryFormOpen,
  ] = useState(false);

  const [newCategoryName, setNewCategoryName] =
    useState("");
  const [createProduct] = useCreateProductMutation();
  const [createCategory] = useCreateCategoryMutation();

  const [updateProduct] =
    useUpdateProductMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const [deleteCategory] =
    useDeleteCategoryMutation();
  const { data: categoryData } = useGetCategoryQuery();
  const [
    editingCategoryIndex,
    setEditingCategoryIndex,
  ] = useState<number | null>(null);

  /* Filter Products */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesStatus =
        status === "All" ||
        product.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [products, search, category, status]);

  /* Delete Product */
  const handleDelete = async (
    id: number
  ) => {
    try {
      await deleteProduct(id).unwrap();
      alert("Product Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  /* Edit Product */
  const handleEdit = (
    product: Product
  ) => {
    setEditingProduct(product);
    updateProduct({
      id: product.id,
      name: product.name,
      sku: product.sku,
      category: product.category,
      stock: product.stock,
      price: product.price,
      status: product.status,
    });
    setFormMode("edit");
    setIsFormOpen(true);
  };

  /* Add Product */
  const handleAddClick = () => {
    setEditingProduct(null);
    createProduct({
      name: "New Product",
      sku: "NEW-001",
      category: "Electronics",
      stock: 0,
      price: 0,
      status: "Inactive",
    });
    setFormMode("add");
    setIsFormOpen(true);
  };

  /* Close Form */
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  /* Category Modal */
  const handleCategoryClick = () => {
    setNewCategoryName("");
    setEditingCategoryIndex(null);
    setIsCategoryFormOpen(true);
  };

  const handleCategorySave = async () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    try {
      /* UPDATE CATEGORY */
      if (editingCategoryIndex !== null) {
        const categoryId = categoryData?.[editingCategoryIndex]?.id;
        if (!categoryId) {
          alert("Category ID missing");
          return;
        }

        await updateCategory({
          id: categoryId,
          name: trimmed,
        }).unwrap();

        setCategories((prev) =>
          prev.map((item, index) =>
            index === editingCategoryIndex ? trimmed : item
          )
        );

        if (category === categories[editingCategoryIndex]) {
          setCategory(trimmed);
        }
        alert("Category Updated");
      }
      /* CREATE CATEGORY */
      else {
        await createCategory({
          name: trimmed,
        }).unwrap();

        if (!categories.includes(trimmed)) {
          setCategories((prev) => [...prev, trimmed]);
        }
        alert("Category Created");
      }

      setIsCategoryFormOpen(false);
      setNewCategoryName("");
      setEditingCategoryIndex(null);
    } catch (error) {
      console.log(error);
      alert("Failed to save category");
    }
  };

  /* Edit Category */
  const handleCategoryEdit = (index: number) => {
    setEditingCategoryIndex(index);
    setNewCategoryName(categories[index]);
    setIsCategoryFormOpen(true);
  };

  /* Delete Category */
  const handleCategoryDelete = async (index: number) => {
    try {
      if (categories[index] === "All") return;

      const deleted = categories[index];
      const categoryId = categoryData?.[index]?.id;

      if (!categoryId) {
        alert("Category ID missing");
        return;
      }

      await deleteCategory(categoryId).unwrap();
      setCategories((prev) => prev.filter((_, idx) => idx !== index));

      if (category === deleted) {
        setCategory("All");
      }
      alert("Category Deleted");
    } catch (error) {
      console.log(error);
      alert("Failed to delete category");
    }
  };

  /* Loading */
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg--50 text-zinc-950 font-sans antialiased">
        <div className="text-xl font-medium tracking-tight">Loading inventory...</div>
      </div>
    );
  }

  return (
    // Backdrop wrapper using your custom styling definitions
    <div className="min-h-screen bg-zinc-400/60 p-4 md:p-8 font-sans antialiased selection:bg-zinc-950/10">

      {/* Main dashboard body containers container */}
      <div className="bg-zinc-50/95 rounded-2xl w-full max-w-7xl h-[92vh] flex flex-col border border-zinc-200/80 overflow-hidden shadow-2xl shadow-zinc-950/5 relative p-6">
        <div className="flex flex-col h-full space-y-6 overflow-y-auto pr-1">

          {/* Header */}
          <InventoryHeader />

          {/* Stats */}
          <InventoryStats products={products} />

          {/* Black and White Actions Section */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCategoryClick}
              className="bg-zinc-900 border border-zinc-300 hover:border-zinc-800 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors duration-200"
            >
              + Manage Categories
            </button>

            <button
              onClick={handleAddClick}
              className="bg-zinc-900 hover:bg-zinc-950 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors duration-200"
            >
              + Add Product
            </button>
          </div>

          {/* Search Filter Component */}
          <SearchFilter
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={categories}
            setStatus={setStatus}
            status={status}
          />

          {/* Data Presentation Table */}
          <div className="flex-1 min-h-0">
            <InventoryTable
              products={filteredProducts}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>

      {/* Product Form Modal (Monochrome Theme) */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-zinc-200 rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 text-xl text-zinc-400 hover:text-zinc-950 transition-colors"
            >
              ✕
            </button>
            <ProductForm
              editingProduct={editingProduct}
              clearEdit={handleCloseForm}
            />
          </div>
        </div>
      )}

      {/* Category Manager Modal (Black & White Theme) */}
      {isCategoryFormOpen && (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-zinc-200 rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-zinc-950 tracking-tight">
                Category Manager
              </h2>
              <button
                onClick={() => setIsCategoryFormOpen(false)}
                className="text-xl text-zinc-400 hover:text-zinc-950 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full border border-zinc-200 bg-zinc-50 rounded-lg px-3 py-2 text-sm text-zinc-950 focus:outline-none focus:border-zinc-800 focus:bg-white transition-all"
                />
                <button
                  onClick={handleCategorySave}
                  className="bg-zinc-900 hover:bg-zinc-950 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0"
                >
                  {editingCategoryIndex !== null ? "Update" : "Add"}
                </button>
              </div>

              <div className="border-t border-zinc-100 pt-4">
                <h3 className="font-medium text-xs text-zinc-400 uppercase tracking-wider mb-3">
                  Existing Categories
                </h3>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {categories
                    .filter((cat) => cat !== "All")
                    .map((cat) => {
                      const actualIndex = categories.indexOf(cat);
                      return (
                        <div
                          key={cat}
                          className="flex items-center justify-between bg-zinc-50 border border-zinc-100 px-3 py-2 rounded-lg"
                        >
                          <span className="text-sm font-medium text-zinc-800">{cat}</span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleCategoryEdit(actualIndex)}
                              className="text-xs font-medium text-zinc-600 hover:text-zinc-950 px-2 py-1 rounded hover:bg-zinc-200/60 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleCategoryDelete(actualIndex)}
                              className="text-xs font-medium text-zinc-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}