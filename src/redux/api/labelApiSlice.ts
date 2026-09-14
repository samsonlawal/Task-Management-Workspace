import { apiSlice } from "./apiSlice";

export interface ILabel {
    _id?: string;
    name: string;
    color?: string;
    icon?: string;
    isDefault?: boolean;
    workspaceId?: string;
    createdBy?: string;
}

export const labelApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLabels: builder.query({
            query: ({ workspaceId }: { workspaceId: string }) => `/workspaces/${workspaceId}/labels`,
            providesTags: ["Labels"],
        }),

        createLabel: builder.mutation({
            query: ({ workspaceId, label }: { workspaceId: string; label: { name: string; color?: string; icon?: string } }) => ({
                url: `/workspaces/${workspaceId}/labels`,
                method: "POST",
                body: label,
            }),
            invalidatesTags: ["Labels", "Workspace"],
        }),

        deleteLabel: builder.mutation({
            query: ({ workspaceId, labelId }: { workspaceId: string; labelId: string }) => ({
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
