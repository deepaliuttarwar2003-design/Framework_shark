import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api",

        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),

    tagTypes: [
        "Inventory",
        "Projects",
        "Contracts",
        "Proposals",
    ],

    endpoints: () => ({}),
});