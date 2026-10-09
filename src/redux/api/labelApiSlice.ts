import { apiSlice } from "./apiSlice";
import { ILabel } from "@/types";

export type { ILabel };

export const labelApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLabels: builder.query<{ labels: ILabel[]; label?: ILabel[] } & ILabel[], { workspaceId: string }>({
            query: ({ workspaceId }) => `/workspaces/${workspaceId}/labels`,
            providesTags: ["Labels"],
        }),

        createLabel: builder.mutation<{ label: ILabel; message?: string }, { workspaceId: string; label: { name: string; color?: string; icon?: string } }>({
            query: ({ workspaceId, label }) => ({
                url: `/workspaces/${workspaceId}/labels`,
                method: "POST",
                body: label,
            }),
            invalidatesTags: ["Labels", "Workspace"],
        }),

        deleteLabel: builder.mutation<{ message: string }, { workspaceId: string; labelId: string }>({
            query: ({ workspaceId, labelId }) => ({
                url: `/workspaces/${workspaceId}/labels/${labelId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Labels", "Workspace"],
        }),
    }),
});

export const {
    useGetLabelsQuery,
    useCreateLabelMutation,
    useDeleteLabelMutation,
} = labelApiSlice;
