import { apiSlice } from "./apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (id: string) => `/users/profile/${id}`,
            providesTags: ["Users"],
        }),

        getUserProfile: builder.query({
            query: (id: string) => `/users/${id}`,
            providesTags: ["Users"],
        }),

        updateDetails: builder.mutation({
            query: (payload: any) => ({
                url: "/users/update-details",
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["Users"],
        }),

        updateAvatar: builder.mutation({
            query: (formData: FormData) => ({
                url: "/users/update-avatar",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Users"],
        }),

        checkUsername: builder.mutation({
            query: (username: string) => ({
                url: "/users/check-username",
                method: "POST",
                body: { username },
            }),
        }),

        checkEmail: builder.mutation({
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
