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
                query: () => "/inventory/getall",

                providesTags: ["Inventory"],
            }),

            /* CREATE PRODUCT */
            createProduct: builder.mutation<
                Product,
                Partial<Product>
            >({
                query: (data) => ({
                    url: "/inventory/create",
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
                    url: "/inventory/createCategory",
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
                    url: `/inventory/updateCategory/${id}`,
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
                    url: `/inventory/deleteCategory/${id}`,
                    method: "DELETE",
                }),

                invalidatesTags: ["Inventory"],
            }),
            getCategory: builder.query<
                Product[],
                void
            >({
                query: () => "/inventory/getallCategory",

                providesTags: ["Inventory"],
            }),
            /* UPDATE PRODUCT */
            updateProduct: builder.mutation<
                Product,
                Partial<Product>
            >({
                query: ({ id, ...data }) => ({
                    url: `/inventory/update/${id}`,

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
                    url: `/inventory/delete/${id}`,

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