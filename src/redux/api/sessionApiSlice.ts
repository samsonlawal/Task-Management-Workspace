import { apiSlice } from "./apiSlice";

export const sessionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSessions: builder.query({
            query: ({ userId }: { userId: string }) => `/session/${userId}`,
            providesTags: ["Sessions"],
        }),

        deleteSession: builder.mutation({
            query: ({ sessionId }: { sessionId: string }) => ({
                url: `/session/${sessionId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Sessions"],
        }),
    }),
});

export const { 
    useGetSessionsQuery, 
    useDeleteSessionMutation,
} = sessionApiSlice;