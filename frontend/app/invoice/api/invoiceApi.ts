import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const invoiceApiSlice = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api',
  }),
  tagTypes: ['Invoice'],
  endpoints: (builder) => ({
    getInvoices: builder.query<InvoiceApiRecord[], void>({
      query: () => '/invoice/getInvoice',
      transformResponse: (response: InvoiceListResponse) => response.data,
      providesTags: ['Invoice'],
    }),
    createInvoice: builder.mutation<InvoiceApiRecord, InvoiceApiPayload>({
      query: (newInvoice) => ({
        url: '/invoice/createInvoice',
        method: 'POST',
        body: newInvoice,
      }),
      invalidatesTags: ['Invoice'],
    }),
    updateInvoice: builder.mutation<InvoiceApiRecord, { id: string; data: InvoiceApiPayload }>({
      query: ({ id, data }) => ({
        url: `/invoice/updateInvoice/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Invoice'],
    }),
    deleteInvoice: builder.mutation<{ message: string }, string>({
      query: (invoiceNo) => ({
        url: `/invoice/deleteInvoice/${invoiceNo}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Invoice'],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApiSlice;