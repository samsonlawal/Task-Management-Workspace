import { apiSlice } from "./apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserNotifications: builder.query({
            query: (userId: string) => `/notification/${userId}`,
            providesTags: ["Notifications"],
        }),

        markAsRead: builder.mutation({
            query: (id: string) => ({
                url: `/notification/read/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notifications"],
        }),

        markAllAsRead: builder.mutation({
            query: (userId: string) => ({
                url: `/notification/read-all/${userId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notifications"],
        }),
    }),
});

export const {
    useGetUserNotificationsQuery,
    useMarkAsReadMutation,
    useMarkAllAsReadMutation,
} = notificationApiSlice;
