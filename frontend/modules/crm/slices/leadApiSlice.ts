import { apiSlice } from "@/core/features/apiSlice";

export type Lead = {
  id: string;
  name: string;
  company: string;
  amount: string;
  phone: string;
  email: string;
  stage: string;
  created: string;
};

export const leadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getLeads: builder.query<Lead[], void>({
      query: () => "/crm/leads",

      providesTags: ["Lead"],
    }),

    createLead: builder.mutation<Lead, Partial<Lead>>({
      query: (data) => ({
        url: "/crm/leads",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),

    updateLead: builder.mutation<Lead, Partial<Lead>>({
      query: ({ id, ...data }) => ({
        url: `/crm/leads/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),

    deleteLead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/crm/leads/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Lead"],
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = leadApiSlice;