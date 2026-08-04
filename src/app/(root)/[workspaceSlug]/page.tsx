"use client";
import { use } from "react";
import { redirect } from "next/navigation";
import { useGetWorkspaceBySlugQuery } from "@/redux/api/workspaceApiSlice";
export default function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = use(params);
  redirect(`/${workspaceSlug}/tasks`);
}
