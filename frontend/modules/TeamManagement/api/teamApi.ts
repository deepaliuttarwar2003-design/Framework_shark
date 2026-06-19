import {
    createApi,
    fakeBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { Team } from "../types/team";

let fakeDB: Team[] = [

    {
        id: "1",
        name: "Frontend Team",
        description: "Handles UI development",

        role: "Manager",

        members: [
            {
                id: "m1",
                name: "Aakanksha",
                email: "aak@example.com",
                role: "Admin",
            },
            {
                id: "m2",
                name: "Rahul",
                email: "rahul@example.com",
                role: "Member",
            },
        ],
    },
];

export const teamApi = createApi({
    reducerPath: "teamApi",

    baseQuery: fakeBaseQuery(),

    tagTypes: ["Team"],

    endpoints: (builder) => ({
        getTeams: builder.query<Team[], void>({
            queryFn: async () => ({
                data: [...fakeDB],
            }),

            providesTags: ["Team"],
        }),

        createTeam: builder.mutation<Team, Team>({
            queryFn: async (team) => {
                fakeDB = [...fakeDB, team];

                return {
                    data: team,
                };
            },

            invalidatesTags: ["Team"],
        }),

        deleteTeam: builder.mutation<string, string>({
            queryFn: async (id) => {
                fakeDB = fakeDB.filter(
                    (team) => team.id !== id
                );

                return {
                    data: id,
                };
            },

            invalidatesTags: ["Team"],
        }),

        addMember: builder.mutation({
            queryFn: async ({
                teamId,
                member,
            }: {
                teamId: string;
                member: any;
            }) => {
                fakeDB = fakeDB.map((team) => {
                    if (team.id !== teamId)
                        return team;

                    return {
                        ...team,
                        members: [
                            ...team.members,
                            member,
                        ],
                    };
                });

                return {
                    data: member,
                };
            },

            invalidatesTags: ["Team"],
        }),
    }),
});

export const {
    useGetTeamsQuery,
    useCreateTeamMutation,
    useDeleteTeamMutation,
    useAddMemberMutation,
} = teamApi;