import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project } from "../types";

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({
       baseUrl: "http://localhost:8080/api",
    }),
    tagTypes: ["Projects"],
    endpoints: (builder) => ({
        getProjects: builder.query<Project[], void>({
            query: () => "/getProject",
            providesTags: ["Projects"],
        }),

        createProject: builder.mutation<Project, Partial<Project>>({
            query: (body) => ({
                url: "/createProject",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Projects"],
        }),
          updateProject: builder.mutation<
    Project,
    { id: number; data: Partial<Project> }
>({
    query: ({ id, data }) => ({
        url: `/updateProject/${id}`,
        method: "PUT",
        body: data,
    }),
    invalidatesTags: ["Projects"],
}),
 
   deleteProject: builder.mutation<void, number>({
    query: (id) => ({
        url: `/deleteProject/${id}`,
        method: "DELETE",
    }),
    invalidatesTags: ["Projects"],
   }),
    }),
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi;


