import { apiSlice } from "./apiSlice";
import { workspaceApiSlice } from "./workspaceApiSlice";
import { getSocket } from "@/lib/socket";
import {
  ITask,
  ICreateTaskInput,
  IComment,
  ICreateCommentInput,
  IActivity,
  IWorkspaceResponse,
} from "@/types";

export const tasksApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getTasks: builder.query<{ tasks: ITask[] }, { workspaceId: string }>({
            query: ({ workspaceId }) => `/tasks/${workspaceId}`,
            providesTags: ["Tasks"],
        }),

        getSingleTask: builder.query<{ task: ITask } & ITask, { taskId: string }>({
            query: ({ taskId }) => `/tasks/single/${taskId}`,
            providesTags: ["Tasks"],
        }),

        createTask: builder.mutation<{ task: ITask; message?: string }, { task: ICreateTaskInput | Record<string, any> }>({
            query: ({ task }) => ({
                url: `/tasks`,
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks", "Workspace"],
        }),

        updateTask: builder.mutation<{ task: ITask; message?: string }, { taskId: string; task: Partial<ITask> | Record<string, any> | FormData; workspaceSlug?: string }>({
            query: ({ taskId, task }) => ({
                url: `/tasks/${taskId}`,
                method: "PATCH",
                body: task,
            }),
            invalidatesTags: ["Tasks", "Workspace"],

            async onQueryStarted({ taskId, task, workspaceSlug }, { dispatch, queryFulfilled }) {
                if (!workspaceSlug) return;

                const patchResult = dispatch(
                    workspaceApiSlice.util.updateQueryData("getWorkspaceBySlug", workspaceSlug, (draft: IWorkspaceResponse) => {
                        const taskToUpdate = draft?.tasks?.find((t) => t._id === taskId);
                        if (taskToUpdate && !(task instanceof FormData)) {
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

        deleteTask: builder.mutation<{ message: string }, { taskId: string; workspaceSlug?: string }>({
            query: ({ taskId }) => ({
                url: `/tasks/${taskId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks", "Workspace"],

            async onQueryStarted({ taskId, workspaceSlug }, { dispatch, queryFulfilled }) {
                if(!workspaceSlug) return;

                const patchResult = dispatch(
                    workspaceApiSlice.util.updateQueryData("getWorkspaceBySlug", workspaceSlug, (draft: IWorkspaceResponse) => {
                        if(draft?.tasks) {
                            draft.tasks = draft.tasks.filter((t) => t._id !== taskId);
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

        getTaskActivity: builder.query<{ activities: IActivity[] } & IActivity[], { taskId: string }>({
            query: ({ taskId }) => `/activity/${taskId}`,
            providesTags: ["Tasks"],

            async onCacheEntryAdded(
                { taskId },
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                try {
                    await cacheDataLoaded;
                    const socket = getSocket();
                    const handleActivityCreated = (newActivity: IActivity) => {
                        if (newActivity.taskId !== taskId) return;
                        updateCachedData((draft) => {
                            const exists = draft.activities?.some((a) => a._id === newActivity._id);
                            if (!exists) {
                                draft.activities?.push(newActivity);
                            }
                        });
                    };
                    socket.on("activity:created", handleActivityCreated);
                    await cacheEntryRemoved;
                    socket.off("activity:created", handleActivityCreated);
                } catch {}
            },
        }),

        promoteTask: builder.mutation<{ task: ITask }, { taskId: string }>({
            query: ({ taskId }) => ({
                url: `/tasks/promote/${taskId}`,
                method: "PATCH",
                body: {},
            }),
            invalidatesTags: ["Tasks", "Workspace"],
        }),

        demoteTask: builder.mutation<{ task: ITask }, { taskId: string }>({
            query: ({ taskId }) => ({
                url: `/tasks/demote/${taskId}`,
                method: "PATCH",
                body: {},
            }),
            invalidatesTags: ["Tasks", "Workspace"],
        }),

        markAsDone: builder.mutation<{ task: ITask }, { taskId: string }>({
            query: ({ taskId }) => ({
                url: `/tasks/done/${taskId}`,
                method: "PATCH",
                body: {},
            }),
            invalidatesTags: ["Tasks", "Workspace"],
        }),

        createComment: builder.mutation<{ comment: IComment; message?: string }, { comment: ICreateCommentInput }>({
            query: ({ comment }) => ({
                url: `/tasks/comment`,
                method: "POST",
                body: comment,
            }),
            invalidatesTags: ["Tasks"],
        }),

        getTaskComments: builder.query<{ comments: IComment[] }, { taskId: string }>({
            query: ({ taskId }) => `/tasks/${taskId}/comment`,
            providesTags: ["Tasks"],

            async onCacheEntryAdded({taskId}, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}) {
                try{
                    await cacheDataLoaded;
                    const socket = getSocket();

                    const handleCommentCreated = (newComment: IComment) => {
                        if(newComment.taskId !== taskId) return;
                        updateCachedData((draft) => {
                            const exists = draft.comments.some((c) => c._id === newComment._id);
                            if(!exists) {
                                draft.comments.push(newComment);
                            }
                        });
                    };

                    const handleCommentDeleted = ({ commentId, taskId: targetTaskId }: { commentId: string; taskId: string }) => {
                        if(targetTaskId !== taskId) return;

                        updateCachedData((draft) => {
                            draft.comments = draft.comments.filter((c) => c._id !== commentId);
                        });
                    };

                    socket.on("comment:created", handleCommentCreated);
                    socket.on("comment:deleted", handleCommentDeleted);

                    await cacheEntryRemoved;
                    socket.off("comment:created", handleCommentCreated);
                    socket.off("comment:deleted", handleCommentDeleted); 

                } catch {}
            } 
        }),

        deleteComment: builder.mutation<{ message: string }, { commentId: string }>({
            query: ({ commentId }) => ({
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