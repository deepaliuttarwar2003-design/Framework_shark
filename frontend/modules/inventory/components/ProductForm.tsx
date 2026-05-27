"use client";

import { useEffect, useState } from "react";

import {
    useCreateProductMutation,
    useUpdateProductMutation,
    // useGetCategoryQuery,
    Product,
} from "../Slices/InventoryApiSlice";

import {
    Package,
    Layers3,
    Boxes,
    IndianRupee,
    BadgeCheck,
} from "lucide-react";

interface ProductFormProps {
    editingProduct?: Product | null;

    clearEdit?: () => void;
}

export default function ProductForm({
    editingProduct,
    clearEdit,
}: ProductFormProps) {
    //     const { data: categoryResponse } =
    //   useGetCategoryQuery();

    // const categories: Category[] =
    //   Array.isArray(categoryResponse?.data)
    //     ? categoryResponse.data
    //     : [];
    /* RTK Query */
    const [createProduct] =
        useCreateProductMutation();

    const [updateProduct] =
        useUpdateProductMutation();

    /* Categories */
    const categories = [
        "Electronics",
        "Accessories",
        "Books",
        "Clothing",
        "Furniture",
        "Toys",
        "Groceries",
        "Jewelry",
    ];

    /* Form State */
    const [formData, setFormData] =
        useState<Product>({
            id: 0,
            name: "",
            sku: "",
            category: "",
            stock: 0,
            price: 0,
            status: "In Stock",
        });

    /* Edit Product */
    useEffect(() => {
        if (editingProduct) {
            setFormData(editingProduct);
        }
    }, [editingProduct]);

    /* Handle Input Change */
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,

            [name]:
                name === "price" ||
                    name === "stock"
                    ? Number(value)
                    : value,
        }));
    };

    /* Reset Form */
    const resetForm = () => {
        setFormData({
            id: 0,
            name: "",
            sku: "",
            category: "",
            stock: 0,
            price: 0,
            status: "In Stock",
        });

        if (clearEdit) {
            clearEdit();
        }
    };

    /* Submit Form */
    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const updatedProduct = {
            ...formData,

            status:
                formData.stock > 0
                    ? "In Stock"
                    : "Out of Stock",
        };

        try {
            /* UPDATE PRODUCT */
            if (editingProduct) {
                await updateProduct(
                    updatedProduct
                ).unwrap();

                alert("Product Updated");
            }

            /* CREATE PRODUCT */
            else {
                await createProduct(
                    updatedProduct
                ).unwrap();

                alert("Product Added");
            }

            /* RESET */
            resetForm();
        } catch (error) {
            console.log(error);

            alert("Something went wrong");
        }
    };

    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {editingProduct
                                ? "Edit Product"
                                : "Add Product"}
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Manage inventory products
                        </p>
                    </div>

                    <div className="bg-blue-100 p-4 rounded-2xl">
                        <Package className="w-7 h-7 text-blue-600" />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Product Name */}
                    <div>
                        <label className="font-semibold text-gray-700 mb-2 block">
                            Product Name
                        </label>

                        <div className="relative">
                            <Package className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter product name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                                required
                            />
                        </div>
                    </div>

                    {/* SKU */}
                    <div>
                        <label className="font-semibold text-gray-700 mb-2 block">
                            SKU
                        </label>

                        <div className="relative">
                            <Layers3 className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                            <input
                                type="text"
                                name="sku"
                                placeholder="Enter SKU"
                                value={formData.sku}
                                onChange={handleChange}
                                className="w-full border rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="font-semibold text-gray-700 mb-2 block">
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border rounded-2xl py-3 px-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                            required
                        >
                            <option value="">
                                Select Category
                            </option>

                            {categories.map(
                                (category, index) => (
                                    <option
                                        key={index}
                                        value={category}
                                    >
                                        {category}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="font-semibold text-gray-700 mb-2 block">
                            Stock
                        </label>

                        <div className="relative">
                            <Boxes className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                            <input
                                type="number"
                                name="stock"
                                placeholder="Enter stock quantity"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full border rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="font-semibold text-gray-700 mb-2 block">
                            Price
                        </label>

                        <div className="relative">
                            <IndianRupee className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                            <input
                                type="number"
                                name="price"
                                placeholder="Enter price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="font-semibold text-gray-700 mb-2 block">
                            Status
                        </label>

                        <div className="relative">
                            <BadgeCheck className="absolute left-4 top-4 text-gray-400 w-5 h-5 z-10" />

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border rounded-2xl py-3 pl-12 pr-4 appearance-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
                            >
                                <option value="In Stock">
                                    In Stock
                                </option>

                                <option value="Out of Stock">
                                    Out of Stock
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                    <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg transition"
                    >
                        {editingProduct
                            ? "Update Product"
                            : "Add Product"}
                    </button>

                    {editingProduct && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-8 bg-gray-200 hover:bg-gray-300 rounded-2xl font-semibold transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}