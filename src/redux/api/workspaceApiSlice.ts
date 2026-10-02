
import { apiSlice } from "./apiSlice";
import { getSocket } from "@/lib/socket";

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

              async onCacheEntryAdded(
                slug,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                try {
                    const { data } = await cacheDataLoaded;
                    console.log(data)
                    const workspaceId =  data?.workspace?._id || data?._id;
                    if (!workspaceId) return;

                    const socket = getSocket();
                    socket.emit("join_workspace", workspaceId);

                    socket.on("task:created", (newTask: any) => {
                        updateCachedData((draft) => {
                             const exists = draft.tasks.some((t: any) => t._id === newTask._id); 
                            if (!exists) {
                                draft.tasks.unshift(newTask); 
                            }
                        });
                    });

                   socket.on("task:updated", (updatedTask: any) => {
    updateCachedData((draft) => {
        const index = draft.tasks.findIndex((t: any) => t._id === updatedTask._id);
        if (index !== -1) {
            draft.tasks[index] = updatedTask;
        }
    });
});


                    socket.on("task:deleted", (deletedTaskId: string) => { // <-- ADD THIS
                        updateCachedData((draft) => {
                            draft.tasks = draft.tasks.filter((t: any) => t._id !== deletedTaskId);
                        });
                    });

                    await cacheEntryRemoved;
                    socket.emit("leave_workspace", workspaceId);
                    socket.off("task:created");
                    socket.off("task:updated");
                    socket.off("task:deleted");
                } catch {}
            },
            }),

        deleteWorkspace: builder.mutation({
            query: ({ workspaceId }: { workspaceId: string }) => ({
                url: `/workspaces/${workspaceId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Workspace"],
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
    useDeleteWorkspaceMutation,
} = workspaceApiSlice;