import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { clearAuthState } from '../Slices/authSlice';
import { showErrorToast } from '@/utils/toaster';
import env from '@/config/env';
import { deleteFromLocalStorage, getFromLocalStorage } from '@/utils/localStorage/AsyncStorage';

const baseQuery = fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL + "/api",
        credentials: "include",
    });

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error) {

    if (result.error.status === 'FETCH_ERROR') {
          showErrorToast({ 
        message: "No internet connection", 
        description: "Please check your internet connection and try again.", 
      });
    } 
    else if (result.error.status === 401) { 
      api.dispatch(clearAuthState()); 
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/auth")) { 
        window.location.href = "/auth/sign-in"; 
      } 
    } else if (result.error.status === 403) { 
      showErrorToast({ 
        message: "Access Denied", 
        description: "You do not have permission to perform this action.", 
      }); 
    } else if (typeof result.error.status === "number" && result.error.status >= 500) { 
            showErrorToast({ 
                message: "Server Error",  
                description: "Something went wrong on our end. Please try again.",
            }); 
            }
}
    return result;
};


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    refetchOnReconnect: true,
    // refetchOnFocus: true, 
    tagTypes: ["Workspace", "Members", "Tasks", "Users", "Auth", "Sessions", "Notifications", "Labels"],
    endpoints: (builder: any) => ({}),
})
