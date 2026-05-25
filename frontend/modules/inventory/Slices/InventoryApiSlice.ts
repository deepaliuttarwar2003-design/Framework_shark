import { apiSlice } from "@/core/features/apiSlice";

export interface Product {
    id?: number;

    name: string;

    sku: string;

    category: string;

    stock: number;

    price: number;

    status: string;
}

export const inventoryApiSlice =
    apiSlice.injectEndpoints({
        endpoints: (builder) => ({

            /* GET PRODUCTS */
            getProducts: builder.query<
                Product[],
                void
            >({
                query: () => "/api/inventory/getAllData",

                providesTags: ["Inventory"],
            }),

            /* CREATE PRODUCT */
            createProduct: builder.mutation<
                Product,
                Partial<Product>
            >({
                query: (data) => ({
                    url: "/api/inventory/create",
                    method: "POST",
                    body: data,
                }),

                invalidatesTags: ["Inventory"],
            }),
            createCategory: builder.mutation<
                Product,
                Partial<Product>
            >({
                query: (data) => ({
                    url: "/api/inventory/category/createCategory",
                    method: "POST",
                    body: data,
                }),

                invalidatesTags: ["Inventory"],
            }),
            updateCategory: builder.mutation<
                Product,
                Partial<Product>
            >({
                query: ({ id, ...data }) => ({
                    url: `/api/inventory/category/updateCategory/${id}`,
                    method: "PUT",
                    body: data,
                }),

                invalidatesTags: ["Inventory"],
            }),
            deleteCategory: builder.mutation<
                void,
                number
            >({
                query: (id) => ({
                    url: `/api/inventory/category/deleteCategory/${id}`,
                    method: "DELETE",
                }),

                invalidatesTags: ["Inventory"],
            }),
            getCategory: builder.query<
                Product[],
                void
            >({
                query: () => "/api/inventory/category/getAllCategory",

                providesTags: ["Inventory"],
            }),
            /* UPDATE PRODUCT */
            updateProduct: builder.mutation<
                Product,
                Partial<Product>
            >({
                query: ({ id, ...data }) => ({
                    url: `/api/inventory/update/${id}`,

                    method: "PUT",

                    body: data,
                }),

                invalidatesTags: ["Inventory"],
            }),

            /* DELETE PRODUCT */
            deleteProduct: builder.mutation<
                void,
                number
            >({
                query: (id) => ({
                    url: `/api/inventory/delete/${id}`,

                    method: "DELETE",
                }),

                invalidatesTags: ["Inventory"],
            }),
        }),
    });

export const {
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useCreateCategoryMutation,
    useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetCategoryQuery,
} = inventoryApiSlice;