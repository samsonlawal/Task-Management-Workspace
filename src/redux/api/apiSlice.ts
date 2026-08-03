import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
        credentials: "include",
        prepareHeaders: (headers, { getState }: any) => {
            let token = getState()?.auth?.accessToken || getState()?.auth?.token;
            if (!token && typeof window !== "undefined") {
                try {
                    const raw = localStorage.getItem("STACKTASK_PERSISTOR");
                    const parsed = raw ? JSON.parse(raw) : null;
                    token = parsed?.accessToken || parsed?.token;
                } catch (e) {
                     console.error("Error parsing STACKTASK_PERSISTOR:", e);
                }
            }
            if (token && token !== "undefined" && token !== "null") {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Workspace", "Members", "Tasks", "Users", "Auth", "Notifications"],
    endpoints: (builder: any) => ({}),
})
