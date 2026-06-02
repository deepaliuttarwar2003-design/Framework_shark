import { apiSlice } from "@/core/features/apiSlice";

export const estimateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getEstimates: builder.query({
      query: () => "/estimate/getall",
      providesTags: ["Estimate"],
    }),

    createEstimate: builder.mutation({
      query: (data) => ({
        url: "/estimate/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Estimate"],
    }),

    updateEstimate: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/estimate/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Estimate"],
    }),

    deleteEstimate: builder.mutation({
      query: (id) => ({
        url: `/estimate/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Estimate"],
    }),
  }),
});

export const {
  useGetEstimatesQuery,
  useCreateEstimateMutation,
  useUpdateEstimateMutation,
  useDeleteEstimateMutation,
} = estimateApiSlice;