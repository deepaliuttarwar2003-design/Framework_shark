"use client";

import { Product } from "@/modules/types/inventory";

interface InventoryTableProps {
    products: Product[];
    onDelete: (id: number) => void;
    onEdit: (product: Product) => void;
}

export default function InventoryTable({
    products,
    onDelete,
    onEdit,
}: InventoryTableProps) {
    return (
        <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-4 font-semibold">
                            Product Name
                        </th>

                        <th className="text-left p-4 font-semibold">
                            SKU
                        </th>

                        <th className="text-left p-4 font-semibold">
                            Category
                        </th>

                        <th className="text-left p-4 font-semibold">
                            Stock
                        </th>

                        <th className="text-left p-4 font-semibold">
                            Price
                        </th>

                        <th className="text-left p-4 font-semibold">
                            Status
                        </th>

                        <th className="text-center p-4 font-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr
                                key={product.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                {/* Product Name */}
                                <td className="p-4 font-medium text-gray-800">
                                    {product.name}
                                </td>

                                {/* SKU */}
                                <td className="p-4 text-gray-600">
                                    {product.sku}
                                </td>

                                {/* Category */}
                                <td className="p-4 text-gray-600">
                                    {product.category}
                                </td>

                                {/* Stock */}
                                <td className="p-4 text-gray-600">
                                    {product.stock}
                                </td>

                                {/* Price */}
                                <td className="p-4 font-medium text-gray-700">
                                    ₹{product.price}
                                </td>

                                {/* Status */}
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {product.stock > 0
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onDelete(product.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={7}
                                className="text-center p-6 text-gray-500"
                            >
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}