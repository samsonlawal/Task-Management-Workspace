import { apiSlice } from "./apiSlice";
import { workspaceApiSlice } from "./workspaceApiSlice";

export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: ({ workspaceId }: { workspaceId: string }) => `/tasks/${workspaceId}`,
            providesTags: ["Tasks"],
        }),

        getSingleTask: builder.query({
            query: ({ taskId }: { taskId: string }) => `/tasks/single/${taskId}`,
            providesTags: ["Tasks"],
        }),

        createTask: builder.mutation({
            query: ({ task }: { task: any }) => ({
                url: `/tasks`,
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks", "Workspace"],
        }),

        updateTask: builder.mutation({
            query: ({ taskId, task, workspaceSlug }: { taskId: string; task: any; workspaceSlug?: string }) => ({
                url: `/tasks/${taskId}`,
                method: "PATCH",
                body: task,
            }),

            async onQueryStarted({ taskId, task, workspaceSlug }, { dispatch, queryFulfilled }) {
                if (!workspaceSlug) return; // Prevent crashes if workspaceSlug is missing

                // 1. Instantly update the UI cache before the server responds
                const patchResult = dispatch(
                    workspaceApiSlice.util.updateQueryData("getWorkspaceBySlug", workspaceSlug, (draft: any) => {
                        const taskToUpdate = draft?.tasks?.find((t: any) => t._id === taskId);
                        if (taskToUpdate) {
                            Object.assign(taskToUpdate, task);
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        deleteTask: builder.mutation({
            query: ({ taskId }: { taskId: string }) => ({
                url: `/tasks/${taskId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks", "Workspace"],
        }),

        promoteTask: builder.mutation({
            query: ({ taskId }: { taskId: string }) => ({
                url: `/tasks/promote/${taskId}`,
                method: "PATCH",
                body: {},
            }),
            invalidatesTags: ["Tasks", "Workspace"],
        }),

        demoteTask: builder.mutation({
            query: ({ taskId }: { taskId: string }) => ({
                url: `/tasks/demote/${taskId}`,
                method: "PATCH",
                body: {},
            }),
            invalidatesTags: ["Tasks", "Workspace"],
        }),

        markAsDone: builder.mutation({
            query: ({ taskId }: { taskId: string }) => ({
                url: `/tasks/done/${taskId}`,
                method: "PATCH",
                body: {},
            }),
            invalidatesTags: ["Tasks", "Workspace"],
        }),
    }),
});

export const { 
    useGetTasksQuery, 
    useGetSingleTaskQuery,
    useCreateTaskMutation, 
    useUpdateTaskMutation, 
    useDeleteTaskMutation,
    usePromoteTaskMutation,
    useDemoteTaskMutation,
    useMarkAsDoneMutation,
} = tasksApiSlice;