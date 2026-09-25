import { apiSlice } from "./apiSlice";
import { workspaceApiSlice } from "./workspaceApiSlice";

export const tasksApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
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
            invalidatesTags: ["Tasks", "Workspace"],

            async onQueryStarted({ taskId, task, workspaceSlug }, { dispatch, queryFulfilled }) {
                if (!workspaceSlug) return;

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
            query: ({ taskId }: { taskId: string; workspaceSlug?: string }) => ({
                url: `/tasks/${taskId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks", "Workspace"],

            async onQueryStarted({ taskId, workspaceSlug }, { dispatch, queryFulfilled }) {
                if(!workspaceSlug) return;

                const patchResult = dispatch(
                    workspaceApiSlice.util.updateQueryData("getWorkspaceBySlug", workspaceSlug, (draft: any) => {
                        if(draft?.tasks) {
                            draft.tasks = draft.tasks.filter((t: any) => t._id !== taskId);
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            }
        }),

        getTaskActivity: builder.query({
            query: ({ taskId }: { taskId: string }) => `/activity/${taskId}`,
            providesTags: ["Tasks"],
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

        createComment: builder.mutation({
            query: ({ comment }: { comment: any }) => ({
                url: `/tasks/comment`,
                method: "POST",
                body: comment,
            }),
            invalidatesTags: ["Tasks"],
        }),

        getTaskComments: builder.query({
            query: ({ taskId }: { taskId: string }) => `/tasks/${taskId}/comment`,
            providesTags: ["Tasks"],
        }),

        // updateComment: builder.mutation({
        //     query: ({ commentId, content}: { commentId: string; content: string;}) => ({
        //         url: `/tasks/comment/${commentId}`,
        //         method: "PATCH",
        //         body: content,
        //     }),
        //     invalidatesTags: ["Tasks", "Workspace"],

        //     async onQueryStarted({ taskId, task, workspaceSlug }, { dispatch, queryFulfilled }) {
        //         if (!workspaceSlug) return;

        //         const patchResult = dispatch(
        //             workspaceApiSlice.util.updateQueryData("getWorkspaceBySlug", workspaceSlug, (draft: any) => {
        //                 const taskToUpdate = draft?.tasks?.find((t: any) => t._id === taskId);
        //                 if (taskToUpdate) {
        //                     Object.assign(taskToUpdate, task);
        //                 }
        //             })
        //         );
        //         try {
        //             await queryFulfilled;
        //         } catch {
        //             patchResult.undo();
        //         }
        //     },
        // }),

        deleteComment: builder.mutation({
            query: ({ commentId }: { commentId: string }) => ({
                url: `/tasks/comment/${commentId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"],
        }),
    }),
});

export const { 
    useGetTasksQuery, 
    useGetSingleTaskQuery,
    useGetTaskActivityQuery,
    useCreateTaskMutation, 
    useUpdateTaskMutation, 
    useDeleteTaskMutation,
    usePromoteTaskMutation,
    useDemoteTaskMutation,
    useMarkAsDoneMutation,
    useCreateCommentMutation,
    useGetTaskCommentsQuery,
    // useUpdateCommentMutation,
    useDeleteCommentMutation,
} = tasksApiSlice;