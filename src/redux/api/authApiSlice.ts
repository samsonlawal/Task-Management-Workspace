import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials: any) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Auth", "Users"],
        }),

        register: builder.mutation({
            query: (userData: any) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["Auth"],
        }),

        activateAccount: builder.query({
            query: (token: string) => `/auth/activate-account?token=${token}`,
        }),

        forgotPassword: builder.mutation({
            query: (email: string) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: {email},
            }),
        }),

        resetPassword: builder.mutation({
            query: (payload: any) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useActivateAccountQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApiSlice;
