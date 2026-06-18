import { apiSlice } from "@/core/features/apiSlice";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<any, RegisterRequest>({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
        }),

        loginUser: builder.mutation<any, LoginRequest>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),

        getProfile: builder.query<any, void>({
            query: () => ({
                url: "/auth/profile",
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetProfileQuery,
} = userApiSlice;