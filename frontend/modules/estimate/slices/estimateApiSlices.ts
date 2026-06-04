import { apiSlice } from "@/core/features/apiSlice";

export const estimateApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getEstimates: builder.query<any, void>({
            query: () => "/getallestimate",
            providesTags: ["Estimate"],
        }),
        createEstimate: builder.mutation({
            query: (data) => ({
                url: "/createestimate",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Estimate"],
        }),

        updateEstimate: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/updateestimate/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Estimate"],
        }),

        deleteEstimate: builder.mutation({
            query: (id) => ({
                url: `/deleteestimate/${id}`,
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