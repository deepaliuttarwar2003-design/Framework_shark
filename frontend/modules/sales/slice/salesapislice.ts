import { apiSlice } from "@/core/features/apiSlice";

export interface SalesItem {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Sales {
  id?: string;

  customerName: string;
  customerContact: string;
  customerAddress: string;
  customerGstin: string;

  paymentMode: string;
  paymentStatus: string;

  items: SalesItem[];
}

export const salesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL SALES
    getSales: builder.query<Sales[], void>({
      query: () => "/sales/all",
      providesTags: ["Sales"],
    }),

    // GET SALES BY ID
    getSalesById: builder.query<Sales, string>({
      query: (id) => `/sales/${id}`,
      providesTags: ["Sales"],
    }),

    // CREATE SALES
    createSales: builder.mutation<Sales, Partial<Sales>>({
      query: (data) => ({
        url: "/sales/createSales",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales"],
    }),

    // UPDATE SALES
    updateSales: builder.mutation<
      Sales,
      { id: string } & Partial<Sales>
    >({
      query: ({ id, ...data }) => ({
        url: `/sales/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Sales"],
    }),

    // DELETE SALES
    deleteSales: builder.mutation<void, string>({
      query: (id) => ({
        url: `/sales/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sales"],
    }),
  }),
});

export const {
  useGetSalesQuery,
  useGetSalesByIdQuery,
  useCreateSalesMutation,
  useUpdateSalesMutation,
  useDeleteSalesMutation,
} = salesApiSlice;