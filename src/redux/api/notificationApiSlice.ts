import { apiSlice } from "./apiSlice";
import { INotification } from "@/types";

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserNotifications: builder.query<{ notifications: INotification[] }, string>({
            query: (userId: string) => `/notification/${userId}`,
            providesTags: ["Notifications"],
        }),

        markAsRead: builder.mutation<{ message: string }, string>({
            query: (id: string) => ({
                url: `/notification/read/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notifications"],
        }),

        markAllAsRead: builder.mutation<{ message: string }, string>({
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
