
import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "@/core/features/apiSlice";
import projectReducer from "@/modules/Project_Management/Redux/projectSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    project: projectReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
