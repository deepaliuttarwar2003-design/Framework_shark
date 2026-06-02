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
 

export const projectManagementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getProjects: builder.query<Project[], void>({
      query: () => "/getProject",
      transformResponse :(response: any) => {
        return Array.isArray(response) ? response : response?.data || [];
      },
      providesTags: ["Projects"],
    }),

    createProject: builder.mutation<Project, Partial<Project>>({
      query: (data) => ({
        url: "/createProject",
        method: "POST",
        body: data,
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
} = projectManagementApiSlice;