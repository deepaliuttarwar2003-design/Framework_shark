import { apiSlice } from "@/core/features/apiSlice";
import { ContractManagement } from "../types/contract";
export const contractApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContracts: builder.query<ContractManagement[], void>({ query: () => "/contract_management/contracts", providesTags: ["Contracts"], }), getContractById: builder.query<ContractManagement, string>({ query: (id) => `/contract_management/contracts/${id}`, providesTags: ["Contracts"], }), createContract: builder.mutation<ContractManagement, Partial<ContractManagement>>({ query: (body) => ({ url: "/contract_management/contracts", method: "POST", body, }), invalidatesTags: ["Contracts"], }), updateContract: builder.mutation<ContractManagement, { id: string; body: Partial<ContractManagement>; }>({ query: ({ id, body }) => ({ url: `/contract_management/contracts/${id}`, method: "PUT", body, }), invalidatesTags: ["Contracts"], }), deleteContract: builder.mutation<void, string>({
      query: (id) => ({ url: `/contract_management/contracts/${id}`, method: "DELETE", }),
      invalidatesTags: ["Contracts"],
    }),
  }),
}); export const { useGetContractsQuery, useGetContractByIdQuery, useCreateContractMutation, useUpdateContractMutation, useDeleteContractMutation, } = contractApi;