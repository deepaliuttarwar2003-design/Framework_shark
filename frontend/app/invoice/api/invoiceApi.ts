import { apiSlice } from "@/core/features/apiSlice";


export type InvoiceApiItem = {
  id?: string;
  productId: number;
  quantity: number;
  price: number;
  amount: number;
};

export type InvoiceApiRecord = {
  id: string;
  invoiceNo: string;
  customerName: string;
  customerEmail: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  tax: number;
  totalAmount: number;
  status: string;
  payment: string;
  items: InvoiceApiItem[];
};

export type InvoiceApiPayload = {
  invoiceNo: string;
  customerName: string;
  customerEmail: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  tax: number;
  totalAmount: number;
  status: string;
  payment: string;
  items: InvoiceApiItem[];
};

type InvoiceListResponse = {
  data: InvoiceApiRecord[];
};

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({




    getinvoice: builder.query<any, void>({
      query: () => "/invoice/getInvoice",
      providesTags: ["Invoice"],
    }),

    createinvoice: builder.mutation({
      query: (data) => ({
        url: "/invoice/createInvoice",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invoice"],
    }),

    updateinvoice: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateInvoice/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Invoice"],
    }),

    deleteinvoice: builder.mutation({
      query: (id) => ({
        url: `/deleteInvoice/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {
  useGetinvoiceQuery,
  useCreateinvoiceMutation,
  useUpdateinvoiceMutation,
  useDeleteinvoiceMutation,
} = invoiceApiSlice;