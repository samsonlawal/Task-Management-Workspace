import { apiSlice } from "./apiSlice";

export const workspaceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWorkspace: builder.query({
            query: () => `/workspaces`,
            providesTags: ["Workspace"],
        }),

        getUserWorkspace: builder.query({
            query: ({ userId }: { userId: string }) => `/workspaces/user/${userId}`,
            providesTags: ["Workspace"],
        }),

        getSingleWorkspace: builder.query({
            query: ({ workspaceId }: { workspaceId: string }) => `/workspaces/${workspaceId}`,
            providesTags: ["Workspace"],
        }),

        createWorkspace: builder.mutation({
            query: ({ userId, workspace }: { userId: string; workspace: any }) => ({
                url: `/workspaces/${userId}`,
                method: "POST",
                body: workspace,
            }),
            invalidatesTags: ["Workspace"],
        }),

        getPendingInvites: builder.query({
            query: ({ userId }: { userId: string }) => `/workspaces/invites/${userId}`,
            providesTags: ["Workspace"],
        }),

        acceptInvite: builder.mutation({
            query: ({ membershipId, email }: { membershipId: string; email: string }) => ({
                url: `/workspaces/invite/accept/${membershipId}`,
                method: "POST",
                body: { email },
            }),
            invalidatesTags: ["Workspace"],
        }),

        getWorkspaceBySlug: builder.query({
      query: (slug: string) => `/workspaces/slug/${slug}`,
      providesTags: ["Workspace"],
    }),
    }),
});

export const { 
    useGetWorkspaceQuery,
    useGetUserWorkspaceQuery,
    useGetSingleWorkspaceQuery,
    useCreateWorkspaceMutation,
    useGetPendingInvitesQuery,
    useAcceptInviteMutation,
     useGetWorkspaceBySlugQuery,
} = workspaceApiSlice;