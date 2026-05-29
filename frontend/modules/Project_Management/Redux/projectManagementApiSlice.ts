import { apiSlice } from "@/core/features/apiSlice";

export interface Project {
    id?: number;

    projectName: string;

    clientName: string;

    description: string;

    startDate: string;

    endDate: string;

    status: string;

    priority: string;

    budget: number;

    teamLead: string;
}

export const projectManagementApiSlice =
    apiSlice.injectEndpoints({
        endpoints: (builder) => ({

            /* GET ALL PROJECTS */
            getProjects: builder.query<
                Project[],
                void
            >({
                query: () => "/api/projects/getAllProjects",

                providesTags: ["Projects"],
            }),

            /* CREATE PROJECT */
            createProject: builder.mutation<
                Project,
                Partial<Project>
            >({
                query: (data) => ({
                    url: "/api/projects/create",
                    method: "POST",
                    body: data,
                }),

                invalidatesTags: ["Projects"],
            }),

            /* UPDATE PROJECT */
            updateProject: builder.mutation<
                Project,
                Partial<Project>
            >({
                query: ({ id, ...data }) => ({
                    url: `/api/projects/update/${id}`,
                    method: "PUT",
                    body: data,
                }),

                invalidatesTags: ["Projects"],
            }),

            /* DELETE PROJECT */
            deleteProject: builder.mutation<
                void,
                number
            >({
                query: (id) => ({
                    url: `/api/projects/delete/${id}`,
                    method: "DELETE",
                }),

                invalidatesTags: ["Projects"],
            }),

            /* GET SINGLE PROJECT */
            getProjectById: builder.query<
                Project,
                number
            >({
                query: (id) => `/api/projects/getProject/${id}`,

                providesTags: ["Projects"],
            }),

            /* CREATE PROJECT CATEGORY */
            createProjectCategory: builder.mutation<
                Project,
                Partial<Project>
            >({
                query: (data) => ({
                    url: "/api/projects/category/createCategory",
                    method: "POST",
                    body: data,
                }),

                invalidatesTags: ["Projects"],
            }),

            /* GET PROJECT CATEGORIES */
            getProjectCategories: builder.query<
                Project[],
                void
            >({
                query: () =>
                    "/api/projects/category/getAllCategory",

                providesTags: ["Projects"],
            }),

            /* UPDATE PROJECT CATEGORY */
            updateProjectCategory: builder.mutation<
                Project,
                Partial<Project>
            >({
                query: ({ id, ...data }) => ({
                    url: `/api/projects/category/updateCategory/${id}`,
                    method: "PUT",
                    body: data,
                }),

                invalidatesTags: ["Projects"],
            }),

            /* DELETE PROJECT CATEGORY */
            deleteProjectCategory: builder.mutation<
                void,
                number
            >({
                query: (id) => ({
                    url: `/api/projects/category/deleteCategory/${id}`,
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
    useGetProjectByIdQuery,

    useCreateProjectCategoryMutation,
    useGetProjectCategoriesQuery,
    useUpdateProjectCategoryMutation,
    useDeleteProjectCategoryMutation,
} = projectManagementApiSlice;