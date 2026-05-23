import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "@/core/features/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]:
            apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiSlice.middleware
        ),
});