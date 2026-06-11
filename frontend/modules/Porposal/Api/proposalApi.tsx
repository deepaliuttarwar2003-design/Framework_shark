// modules/Proposal/Api/ProposalApi.ts
import { apiSlice } from "@/core/features/apiSlice";

export interface ProposalData {
    id?: number;
    proposal_title: string;
    client_name: string;
    email: string;
    total_amount: number;
    description: string;
}

export const proposalApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProposals: builder.query<ProposalData[], void>({
            query: () => "/proposals",
            providesTags: ["Proposals"],
        }),

        createProposal: builder.mutation<
            ProposalData,
            Partial<ProposalData>
        >({
            query: (body) => ({
                url: "/proposals",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Proposals"],
        }),

        updateProposal: builder.mutation<
            ProposalData,
            ProposalData
        >({
            query: ({ id, ...body }) => ({
                url: `/proposals/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Proposals"],
        }),

        deleteProposal: builder.mutation<void, number>({
            query: (id) => ({
                url: `/proposals/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Proposals"],
        }),
    }),
});

export const {
    useGetProposalsQuery,
    useCreateProposalMutation,
    useUpdateProposalMutation,
    useDeleteProposalMutation,
} = proposalApi;