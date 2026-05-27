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
    const trimmed =
      newCategoryName.trim();

    if (!trimmed) return;

    try {
      /* UPDATE CATEGORY */
      if (
        editingCategoryIndex !== null
      ) {
        const categoryId =
          categoryData?.[
            editingCategoryIndex
          ]?.id;

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
            index ===
              editingCategoryIndex
              ? trimmed
              : item
          )
        );

        if (
          category ===
          categories[
          editingCategoryIndex
          ]
        ) {
          setCategory(trimmed);
        }

        alert("Category Updated");
      }

      /* CREATE CATEGORY */
      else {
        await createCategory({
          name: trimmed,
        }).unwrap();

        if (
          !categories.includes(
            trimmed
          )
        ) {
          setCategories((prev) => [
            ...prev,
            trimmed,
          ]);
        }

        alert("Category Created");
      }

      setIsCategoryFormOpen(false);

      setNewCategoryName("");

      setEditingCategoryIndex(
        null
      );
    } catch (error) {
      console.log(error);

      alert(
        "Failed to save category"
      );
    }
  };
  /* Edit Category */
  const handleCategoryEdit = (
    index: number
  ) => {
    setEditingCategoryIndex(index);

    setNewCategoryName(
      categories[index]
    );

    setIsCategoryFormOpen(true);
  };
  /* Delete Category */
  const handleCategoryDelete = async (
    index: number
  ) => {
    try {
      /* Prevent deleting All */
      if (categories[index] === "All") {
        return;
      }

      const deleted =
        categories[index];

      /* API Delete */
      const categoryId =
        categoryData?.[index]?.id;

      if (!categoryId) {
        alert("Category ID missing");
        return;
      }

      await deleteCategory(
        categoryId
      ).unwrap();
      /* Update Local State */
      setCategories((prev) =>
        prev.filter(
          (_, idx) => idx !== index
        )
      );

      /* Reset Selected Category */
      if (category === deleted) {
        setCategory("All");
      }

      alert("Category Deleted");
    } catch (error) {
      console.log(error);

      alert(
        "Failed to delete category"
      );
    }
  };

  /* Loading */
  if (isLoading) {
    return (
      <div className="p-10 text-xl font-semibold">
        Loading Products...
      </div>
    );
  }

  /* Error */
  if (error) {
    console.log(error);
  }


  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <InventoryHeader />

        {/* Stats */}
        <InventoryStats
          products={products}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCategoryClick}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 font-semibold"
          >
            + Add Category
          </button>

          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-semibold"
          >
            + Add Product
          </button>
        </div>

        {/* Search Filter */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
          setStatus={setStatus}
          status={status}
        />

        {/* Table */}
        <InventoryTable
          products={filteredProducts}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {/* Product Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative">
              <button
                onClick={handleCloseForm}
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
              >
                ×
              </button>

              <ProductForm
                editingProduct={
                  editingProduct
                }
                clearEdit={
                  handleCloseForm
                }
              />
            </div>
          </div>
        )}

        {/* Category Modal */}
        {isCategoryFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  Category Manager
                </h2>

                <button
                  onClick={() =>
                    setIsCategoryFormOpen(
                      false
                    )
                  }
                  className="text-2xl text-gray-500 hover:text-black"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newCategoryName}
                  onChange={(e) =>
                    setNewCategoryName(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg px-4 py-2"
                />

                <button
                  onClick={
                    handleCategorySave
                  }
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
                >
                  {editingCategoryIndex !==
                    null
                    ? "Update Category"
                    : "Add Category"}
                </button>

                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg mb-3">
                    Existing Categories
                  </h3>

                  <div className="space-y-2">
                    {categories
                      .filter(
                        (cat) =>
                          cat !== "All"
                      )
                      .map((cat) => {
                        const actualIndex =
                          categories.indexOf(
                            cat
                          );

                        return (
                          <div
                            key={cat}
                            className="flex items-center justify-between bg-slate-100 p-3 rounded-lg"
                          >
                            <span>
                              {cat}
                            </span>

                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleCategoryEdit(
                                    actualIndex
                                  )
                                }
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() =>
                                  handleCategoryDelete(
                                    actualIndex
                                  )
                                }
                                className="bg-red-500 text-white px-3 py-1 rounded"
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
    </div>
  );
}