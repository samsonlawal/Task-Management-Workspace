import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { clearAuthState } from '../Slices/authSlice';

const baseQuery = fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL + "/api",
        credentials: "include" 
    });

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        api.dispatch(clearAuthState());
        if (typeof window !== "undefined") {
             window.location.href = "/auth/sign-in"; 
        }
    }
    return result;
};


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Workspace", "Members", "Tasks", "Users", "Auth", "Sessions", "Notifications"],
    endpoints: (builder: any) => ({}),
})
