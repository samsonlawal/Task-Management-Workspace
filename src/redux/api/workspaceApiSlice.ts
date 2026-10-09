
import { apiSlice } from "./apiSlice";
import { getSocket } from "@/lib/socket";
import { toast } from "sonner";
import {
  IWorkspace,
  IWorkspaceResponse,
  ICreateWorkspaceInput,
  ITask,
  IComment,
} from "@/types";

export const workspaceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWorkspace: builder.query<{ workspaces: IWorkspace[] }, void>({
            query: () => `/workspaces`,
            providesTags: ["Workspace"],
        }),

        getUserWorkspace: builder.query<IWorkspace[] & { workspaces?: IWorkspace[] }, { userId: string }>({
            query: ({ userId }) => `/workspaces/user/${userId}`,
            providesTags: ["Workspace"],

            async onCacheEntryAdded(
                userId,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                try {
                    await cacheDataLoaded;
                    const socket = getSocket();
                    const handleWorkspaceDeleted = ({ workspaceId }: { workspaceId: string }) => {
                        updateCachedData((draft) => {
                            if (Array.isArray(draft)) {
                                return draft.filter((ws) => ws._id !== workspaceId) as any;
                            }
                        });
                    };
                    socket.on("workspace:deleted", handleWorkspaceDeleted);
                    await cacheEntryRemoved;
                    socket.off("workspace:deleted", handleWorkspaceDeleted);
                } catch {}
            },
        }),

        getSingleWorkspace: builder.query<IWorkspace & { workspace?: IWorkspace }, { workspaceId: string }>({
            query: ({ workspaceId }) => `/workspaces/${workspaceId}`,
            providesTags: ["Workspace"],
        }),

        createWorkspace: builder.mutation<{ workspace: IWorkspace; message?: string }, { userId: string; workspace: ICreateWorkspaceInput }>({
            query: ({ userId, workspace }) => ({
                url: `/workspaces/${userId}`,
                method: "POST",
                body: workspace,
            }),
            invalidatesTags: ["Workspace"],
        }),

        getPendingInvites: builder.query<any, { userId: string }>({
            query: ({ userId }) => `/workspaces/invites/${userId}`,
            providesTags: ["Workspace"],
        }),

        acceptInvite: builder.mutation<{ message: string }, { membershipId: string; email: string }>({
            query: ({ membershipId, email }) => ({
                url: `/workspaces/invite/accept/${membershipId}`,
                method: "POST",
                body: { email },
            }),
            invalidatesTags: ["Workspace"],
        }),

        getWorkspaceBySlug: builder.query<IWorkspaceResponse, string>({
            query: (slug: string) => `/workspaces/slug/${slug}`,
            providesTags: ["Workspace"],

            async onCacheEntryAdded(
                slug,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                try {
                    const { data } = await cacheDataLoaded;
                    const workspaceId = data?.workspace?._id;
                    if (!workspaceId) return;

                    const socket = getSocket();
                    socket.emit("join_workspace", workspaceId);

                    socket.on("task:created", (newTask: ITask) => {
                        updateCachedData((draft) => {
                            if (!draft.tasks) draft.tasks = [];
                            const exists = draft.tasks.some((t) => t._id === newTask._id); 
                            if (!exists) {
                                draft.tasks.unshift(newTask); 
                            }
                        });
                    });

                    socket.on("task:updated", (updatedTask: ITask) => {
                        updateCachedData((draft) => {
                            if (!draft.tasks) return;
                            const index = draft.tasks.findIndex((t) => t._id === updatedTask._id);
                            if (index !== -1) {
                                draft.tasks[index] = updatedTask;
                            }
                        });
                    });

                    socket.on("task:deleted", (deletedTaskId: string) => {
                        updateCachedData((draft) => {
                            if (!draft.tasks) return;
                            draft.tasks = draft.tasks.filter((t) => t._id !== deletedTaskId);
                        });
                    });

                    socket.on("comment:created", (newComment: IComment) => {
                        updateCachedData((draft) => {
                            const task = draft?.tasks?.find((t) => t._id === newComment.taskId);
                            if (task) {
                                task.commentCount = (task.commentCount || 0) + 1;
                            }
                        });
                    });

                    socket.on("comment:deleted", ({ taskId }: { taskId: string }) => {
                        updateCachedData((draft) => {
                            const task = draft?.tasks?.find((t) => t._id === taskId);
                            if (task && (task.commentCount || 0) > 0) {
                                task.commentCount = (task.commentCount || 1) - 1;
                            }
                        });
                    });

                    const handleWorkspaceDeleted = ({ workspaceId: deletedId }: { workspaceId: string }) => {
                        if (deletedId === workspaceId) {
                            toast.error("This workspace has been deleted by the owner.");

                            setTimeout(() => {
                                window.location.href = "/dashboard";
                            }, 1500);
                        }
                    };
                    socket.on("workspace:deleted", handleWorkspaceDeleted);

                    await cacheEntryRemoved;
                    socket.emit("leave_workspace", workspaceId);
                    socket.off("task:created");
                    socket.off("task:updated");
                    socket.off("task:deleted");
                    socket.off("comment:created");
                    socket.off("comment:deleted");
                    socket.off("workspace:deleted", handleWorkspaceDeleted);
                } catch {}
            },
        }),

        deleteWorkspace: builder.mutation<{ message: string }, { workspaceId: string }>({
            query: ({ workspaceId }) => ({
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