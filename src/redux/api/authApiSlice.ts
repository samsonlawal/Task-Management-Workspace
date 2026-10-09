import { apiSlice } from "./apiSlice";
import {
  ILoginInput,
  IRegisterInput,
  IForgotPasswordInput,
  IResetPasswordInput,
  IAuthResponse,
} from "@/types";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, ILoginInput>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Auth", "Users"],
        }),

        logout: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Auth"],
        }),

        register: builder.mutation<IAuthResponse, IRegisterInput>({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["Auth"],
        }),

        activateAccount: builder.query<{ message: string }, string>({
            query: (token: string) => `/auth/activate-account?token=${token}`,
        }),

        forgotPassword: builder.mutation<{ message: string }, string | IForgotPasswordInput>({
            query: (payload) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: typeof payload === "string" ? { email: payload } : payload,
            }),
        }),

        resetPassword: builder.mutation<{ message: string }, IResetPasswordInput>({
            query: (payload) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useActivateAccountQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApiSlice;
