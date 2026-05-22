import { apiSlice } from "@/core/features/apiSlice";

export type Lead = {
  id: string;

  lead_title: string;

  first_name: string;

  last_name: string;

  telephone: string;

  email: string;

  lead_value: number;

  notes: string;

  source: string;

  category: string;

  tags: string[];

  last_contacted: string;

  company_name: string;

  street: string;

  city: string;

  state: string;

  zip_code: string;

  country: string;

  website: string;

  stage: string;

  created: string;
};
 


export const leadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getLeads: builder.query<Lead[], void>({
      query: () => "/crm/getall",

      providesTags: ["Lead"],
    }),

    createLead: builder.mutation<Lead, Partial<Lead>>({
      query: (data) => ({
        url: "/crm/create",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),

    updateLead: builder.mutation<Lead, Partial<Lead>>({
      query: ({ id, ...data }) => ({
        url: `/crm/update/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),

    deleteLead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/crm/delete/${id}`,
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