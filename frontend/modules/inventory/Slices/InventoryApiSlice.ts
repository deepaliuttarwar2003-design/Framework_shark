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
                query: () => "/inventory/getallproducts",

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
                    url: "/inventory/category/createCategory",
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
                    url: `/inventory/category/updateCategory/${id}`,
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
                    url: `/inventory/category/deleteCategory/${id}`,
                    method: "DELETE",
                }),

                invalidatesTags: ["Inventory"],
            }),
            getCategory: builder.query<
                Product[],
                void
            >({
                query: () => "/inventory/category/getAllCategory",

                providesTags: ["Inventory"],
            }),
            /* UPDATE PRODUCT */
            updateProduct: builder.mutation<
                Product,
                Partial<Product>
            >({
                query: ({ id, ...data }) => ({
                    url: `/inventory/updateproduct/${id}`,

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
                    url: `/inventory/deleteproduct/${id}`,

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