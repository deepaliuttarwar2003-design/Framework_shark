import { Product } from "@/modules/types/inventory";

export const inventoryData: Product[] = [
    {
        id: 1,
        name: "Laptop",
        sku: "LAP-001",
        category: "Electronics",
        stock: 12,
        price: 55000,
        status: "In Stock",
    },
    {
        id: 2,
        name: "Mouse",
        sku: "MOU-002",
        category: "Accessories",
        stock: 30,
        price: 700,
        status: "In Stock",
    },
];