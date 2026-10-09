import { apiSlice } from "./apiSlice";
import { IUser, IUpdateUserDetailsInput } from "@/types";

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<{ user: IUser }, string>({
            query: (id: string) => `/users/profile/${id}`,
            providesTags: ["Users"],
        }),

        getUserProfile: builder.query<{ user: IUser }, string>({
            query: (id: string) => `/users/${id}`,
            providesTags: ["Users"],
        }),

        updateDetails: builder.mutation<{ user: IUser; message?: string }, IUpdateUserDetailsInput>({
            query: (payload) => ({
                url: "/users/update-details",
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["Users"],
        }),

        updateAvatar: builder.mutation<{ user: IUser; message?: string }, FormData>({
            query: (formData: FormData) => ({
                url: "/users/update-avatar",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Users"],
        }),

        checkUsername: builder.mutation<{ available: boolean; message?: string }, string>({
            query: (username: string) => ({
                url: "/users/check-username",
                method: "POST",
                body: { username },
            }),
        }),

        checkEmail: builder.mutation<{ available: boolean; message?: string }, string>({
            query: (email: string) => ({
                url: "/users/check-email",
                method: "POST",
                body: { email },
            }),
        }),
    }),
});

export const {
    useGetProfileQuery,
    useGetUserProfileQuery,
    useUpdateDetailsMutation,
    useUpdateAvatarMutation,
    useCheckUsernameMutation,
    useCheckEmailMutation,
} = accountApiSlice;
