// import { configureStore } from "@reduxjs/toolkit";

// import projectReducer from "@/modules/Project_Management/Redux/projectSlice";

// import { projectApi } from "@/modules/Project_Management/Api/ProjectApi";

// export const store = configureStore({
//     reducer: {
//         project: projectReducer,

//         [projectApi.reducerPath]: projectApi.reducer,
//     },

//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(
//             projectApi.middleware
//         ),
// });

// export type RootState = ReturnType<
//     typeof store.getState
// >;

// export type AppDispatch =
//     typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "@/core/features/apiSlice";
import { projectApi } from "@/modules/Project_Management/Api/ProjectApi";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,

        [projectApi.reducerPath]:
            projectApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(projectApi.middleware),
});

export type RootState =
    ReturnType<typeof store.getState>;

export type AppDispatch =
    typeof store.dispatch;