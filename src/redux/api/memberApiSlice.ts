import { apiSlice } from "./apiSlice";

export const memberApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMembers: builder.query({
            query: ({ workspaceId }: { workspaceId: string }) => `/workspaces/${workspaceId}/members`,
            providesTags: ["Members"],
        }),

        addMember: builder.mutation({
            query: ({ workspaceId, member }: { workspaceId: string; member: any }) => ({
                url: `/workspaces/${workspaceId}/members`,
                method: "POST",
                body: member,
            }),
            invalidatesTags: ["Members"],
        }),

        editMemberRole: builder.mutation({
            query: ({ workspaceId, memberId, role }: { workspaceId: string; memberId: string; role: string }) => ({
                url: `/workspaces/${workspaceId}/members/edit-role/${memberId}`,
                method: "PATCH",
                body: { role },
            }),
            invalidatesTags: ["Members"],
        }),

        suspendMember: builder.mutation({
            query: ({ workspaceId, memberId }: { workspaceId: string; memberId: string }) => ({
                url: `/workspaces/${workspaceId}/members/suspend/${memberId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Members"],
        }),

        removeMember: builder.mutation({
            query: ({ workspaceId, memberId }: { workspaceId: string; memberId: string }) => ({
                url: `/workspaces/${workspaceId}/members/remove/${memberId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Members"],
        }),
    }),
});

export const {
    useGetMembersQuery,
    useAddMemberMutation,
    useEditMemberRoleMutation,
    useSuspendMemberMutation,
    useRemoveMemberMutation,
} = memberApiSlice;
