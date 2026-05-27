import { apiSlice } from "@/core/features/apiSlice";

export interface Lead {
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

  created?: string;
}

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
        url: `/crm/leads/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Lead"],
    }),
      createComment: builder.mutation<Lead, Partial<Lead>>({
      query: (data) => ({
        url: "/crm/comments",
        method: "POST",
        body: data,
      }),
    
      invalidatesTags: ["Lead"],
    }),
    getComments: builder.query<Lead[], void>({
      query: () => "/crm/getallComments",

      providesTags: ["Lead"],
    }),
    createDescription: builder.mutation<Lead, Partial<Lead>>({
      query: (data) => ({
        url: "/crm/descriptions",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),
    createChecklist: builder.mutation<Lead, Partial<Lead>>({
      query: (data) => ({
        url: "/crm/checklists",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),
    createReminder: builder.mutation<Lead, Partial<Lead>>({
      query: (data) => ({
        url: "/crm/reminders",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),
      getDescriptions: builder.query<Lead[], void>({
      query: () => "/crm/getallDescriptions",

      providesTags: ["Lead"],
    }),
      getChecklists: builder.query<Lead[], void>({
      query: () => "/crm/getallChecklists",

      providesTags: ["Lead"],
    }),
      getReminders: builder.query<Lead[], void>({
      query: () => "/crm/getallReminders",

      providesTags: ["Lead"],
    }),
  }),
});


export const {
  useGetLeadsQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useGetDescriptionsQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useCreateDescriptionMutation,
  useGetChecklistsQuery,
  useCreateChecklistMutation,
  useGetRemindersQuery,
  useCreateReminderMutation,
} = leadApiSlice;