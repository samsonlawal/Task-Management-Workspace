import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { clearAuthState } from '../Slices/authSlice';
import { showErrorToast } from '@/utils/toaster';
import env from '@/config/env';
import { deleteFromLocalStorage, getFromLocalStorage } from '@/utils/localStorage/AsyncStorage';


const PERSIST_KEY = env?.auth?.PERSIST_AUTH_KEY || "STACKTASK_PERSISTOR";

const baseQuery = fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL + "/api",
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const auth = (getState() as any).auth;
            let token = auth?.accessToken || auth?.token;


            if (!token && typeof window !== "undefined") {
                try {
                    const raw = localStorage.getItem(PERSIST_KEY)
                    if(raw) {
                        const parsed = JSON.parse(raw);
                        token = parsed?.accessToken || parsed?.token; 
                    }
                } catch(error) {

                }
            }

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
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
    } else if (result.error.status === 401) {
        deleteFromLocalStorage({ key: PERSIST_KEY });
        api.dispatch(clearAuthState());
        if (typeof window !== "undefined") {
             window.location.href = "/auth/sign-in"; 
        }
    }
}
    return result;
};


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Workspace", "Members", "Tasks", "Users", "Auth", "Sessions", "Notifications", "Labels"],
    endpoints: (builder: any) => ({}),
})
