import { apiSlice } from "@/core/features/apiSlice";

export interface PurchaseItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface PurchasePayload {
  supplierName: string;
  companyName: string;
  supplierContact: string;
  supplierAddress: string;
  gstin: string;
  paymentStatus: string;
  items: PurchaseItem[];
}

export const purchaseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPurchase: builder.query<any, void>({
      query: () => ({
        url: "/purchase",
        method: "GET",
      }),
      providesTags: ["Purchase"],
    }),

    createPurchase: builder.mutation<
      any,
      PurchasePayload
    >({
      query: (data) => ({
        url: "/createpurchaseorder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Purchase"],
    }),

    updatePurchase: builder.mutation<
        any,
      { id: string; data: PurchasePayload }
    >({
      query: ({ id, data }) => ({
        url: `/purchase/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Purchase"],
    }),

    deletePurchase: builder.mutation<
      any,
      string
    >({
      query: (id) => ({
        url: `/purchase/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Purchase"],
    }),
  }),
});

export const {
  useGetPurchaseQuery,
  useCreatePurchaseMutation,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchaseApiSlice;