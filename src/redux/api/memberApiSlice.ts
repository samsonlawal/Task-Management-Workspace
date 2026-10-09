import { apiSlice } from "./apiSlice";
import { IWorkspaceMember, IAddMemberInput, WorkspaceRole } from "@/types";

export const memberApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMembers: builder.query<{ members: IWorkspaceMember[]; data?: IWorkspaceMember[] } & IWorkspaceMember[], { workspaceId: string }>({
            query: ({ workspaceId }) => `/workspaces/${workspaceId}/members`,
            providesTags: ["Members"],
        }),

        addMember: builder.mutation<{ member: IWorkspaceMember; message?: string }, { workspaceId: string; member: IAddMemberInput }>({
            query: ({ workspaceId, member }) => ({
                url: `/workspaces/${workspaceId}/members`,
                method: "POST",
                body: member,
            }),
            invalidatesTags: ["Members"],
        }),

        editMemberRole: builder.mutation<{ member: IWorkspaceMember; message?: string }, { workspaceId: string; memberId: string; role: WorkspaceRole }>({
            query: ({ workspaceId, memberId, role }) => ({
                url: `/workspaces/${workspaceId}/members/edit-role/${memberId}`,
                method: "PATCH",
                body: { role },
            }),
            invalidatesTags: ["Members"],
        }),

        suspendMember: builder.mutation<{ message: string }, { workspaceId: string; memberId: string }>({
            query: ({ workspaceId, memberId }) => ({
                url: `/workspaces/${workspaceId}/members/suspend/${memberId}`,
                method: "PATCH",
                body: {},
            }),
            invalidatesTags: ["Members"],
        }),

        removeMember: builder.mutation<{ message: string }, { workspaceId: string; memberId: string }>({
            query: ({ workspaceId, memberId }) => ({
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
