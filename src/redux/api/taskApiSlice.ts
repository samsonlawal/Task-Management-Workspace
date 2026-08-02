import { apiSlice } from "./apiSlice";

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
            invalidatesTags: ["Tasks"],
        }),

        updateTask: builder.mutation({
            query: ({ taskId, task }: { taskId: string; task: any }) => ({
                url: `/tasks/${taskId}`,
                method: "PATCH",
                body: task,
            }),
            invalidatesTags: ["Tasks"],
        }),

        deleteTask: builder.mutation({
            query: ({ taskId }: { taskId: string }) => ({
                url: `/tasks/${taskId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"],
        }),

        promoteTask: builder.mutation({
            query: ({ taskId }: { taskId: string }) => ({
                url: `/tasks/promote/${taskId}`,
                method: "PATCH",
                body: {},
            }),
            invalidatesTags: ["Tasks"],
        }),

        demoteTask: builder.mutation({
            query: ({ taskId }: { taskId: string }) => ({
                url: `/tasks/demote/${taskId}`,
                method: "PATCH",
                body: {},
            }),
            invalidatesTags: ["Tasks"],
        }),

        markAsDone: builder.mutation({
            query: ({ taskId }: { taskId: string }) => ({
                url: `/tasks/done/${taskId}`,
                method: "PATCH",
                body: {},
            }),
            invalidatesTags: ["Tasks"],
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