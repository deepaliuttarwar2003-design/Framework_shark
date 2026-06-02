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

export interface Comment {
  id: string;
  lead_id: string;
  text: string;
  author: string;
  date?: string;
}

export interface Checklist {
  id: string;
  lead_id: string;
  text: string;
  completed: boolean;
}

export interface Reminder {
  id: string;
  lead_id: string;
  text: string;
  date: string;
  time: string;
}

export interface Description {
  id: string;
  lead_id: string;
  description: string;
}

export const leadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // LEADS

    getLeads: builder.query<Lead[], void>({
      query: () => "/getall",
      providesTags: ["Lead"],
    }),

    createLead: builder.mutation<
      Lead,
      Partial<Lead>
    >({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),

    updateLead: builder.mutation<
      Lead,
      Partial<Lead>
    >({
      query: ({ id, ...data }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),

    deleteLead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Lead"],
    }),

    // COMMENTS

    getComments: builder.query<Comment[], void>({
      query: () => "/getallComments",
      providesTags: ["Lead"],
    }),

    createComment: builder.mutation<
      Comment,
      Partial<Comment>
    >({
      query: (data) => ({
        url: "/comments",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),

    // DESCRIPTIONS

    getDescriptions: builder.query<
      Description[],
      void
    >({
      query: () => "/getallDescriptions",
      providesTags: ["Lead"],
    }),

    createDescription: builder.mutation<
      Description,
      Partial<Description>
    >({
      query: (data) => ({
        url: "/descriptions",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),

    // CHECKLISTS

    getChecklists: builder.query<
      Checklist[],
      void
    >({
      query: () => "/getallChecklists",
      providesTags: ["Lead"],
    }),

    createChecklist: builder.mutation<
      Checklist,
      Partial<Checklist>
    >({
      query: (data) => ({
        url: "/checklists",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Lead"],
    }),

    // REMINDERS

    getReminders: builder.query<
      Reminder[],
      void
    >({
      query: () => "/getallReminders",
      providesTags: ["Lead"],
    }),

    createReminder: builder.mutation<
      Reminder,
      Partial<Reminder>
    >({
      query: (data) => ({
        url: "/reminders",
        method: "POST",
        body: data,
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

  useGetCommentsQuery,
  useCreateCommentMutation,

  useGetDescriptionsQuery,
  useCreateDescriptionMutation,

  useGetChecklistsQuery,
  useCreateChecklistMutation,

  useGetRemindersQuery,
  useCreateReminderMutation,
} = leadApiSlice;