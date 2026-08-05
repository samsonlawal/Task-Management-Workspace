"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCreateWorkspaceMutation } from "@/redux/api/workspaceApiSlice";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { Loader2, ArrowLeft } from "lucide-react";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { saveToLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import { setWorkspace } from "@/redux/Slices/workspaceSlice";

export default function AddWorkspace() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");

  const { user } = useSelector((state: any) => state.auth);

  // RTK Query Mutation Hook
  const [createWorkspace, { isLoading: createWorkspaceLoading }] =
    useCreateWorkspaceMutation();

  // Auto-generate URL slug preview from workspace name
  const generatedSlug = slugify(workspaceName || "", {
    lower: true,
    strict: true,
    trim: true,
  });

  async function handleCreateWorkspace(e: React.FormEvent) {
    e.preventDefault();

    if (!workspaceName.trim()) {
      showErrorToast({ message: "Workspace name is required." });
      return;
    }

    try {
      const res: any = await createWorkspace({
        userId: user?._id,
        workspace: { name: workspaceName.trim() },
      }).unwrap();

      showSuccessToast({ message: "🚀 Workspace created!" });
      setWorkspaceName("");
      setIsOpen(false);

      // Automatically navigate to the new workspace slug!
      const newSlug = res?.slug || generatedSlug;
      const newWorkspace = res?.workspace || res;
      const newId = newWorkspace?._id;

      if (newId) {
        saveToLocalStorage({ key: "CurrentWorkspaceId", value: newId });
        dispatch(setCurrentWorkspace(newId));
        if (newWorkspace) {
          dispatch(setWorkspace(newWorkspace));
        }
      }

      router.push(`/${newSlug}/tasks`);
    } catch (error: any) {
      showErrorToast({
        message:
          error?.data?.message ||
          error?.message ||
          "Failed to create workspace.",
      });
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full cursor-pointer flex-row items-center rounded-[4px] border border-[#565656]/10 bg-[#565656]/10 py-1.5 pl-2 transition-all duration-300 ease-in-out hover:bg-[#565656]/20"
      >
        <img src="/icons/plus.svg" alt="" className="w-4 cursor-pointer" />
        <p className="px-2 text-[13px] text-[#707070]">Create Workspace</p>
      </button>

      {/* Full Page View */}
      {isOpen && (
        <div className="poppins fixed inset-0 z-50 flex h-screen w-screen flex-col justify-between overflow-y-auto bg-white p-6 dark:bg-[#111] lg:p-10">
          {/* Top Navigation Header */}
          <div className="flex w-full items-center justify-between pb-6 text-xs dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3.5 py-2 font-normal transition-colors duration-300 dark:text-[#fff]/70 dark:hover:text-white"
            >
              <ArrowLeft size={14} />
              <span>Back to Workspace</span>
            </button>

            <span className="text-gray-400 dark:text-zinc-500">
              Logged in as <br />
              <strong className="font-normal text-zinc-900 dark:text-zinc-200">
                {user?.email || "user@example.com"}
              </strong>
            </span>
          </div>

          {/* Centered Form */}
          <div className="mx-auto my-auto flex w-full max-w-[460px] flex-col gap-6">
            <div className="flex flex-col text-center">
              <h1 className="text-lg font-normal text-zinc-900 dark:text-white">
                Create a workspace
              </h1>
              <p className="text-[14px] font-normal text-zinc-500 dark:text-[#F6F6F6]/60">
                Manage work and teams in one place
              </p>
            </div>

            <form
              onSubmit={handleCreateWorkspace}
              className="flex flex-col gap-5"
            >
              {/* Workspace Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-normal text-zinc-700 dark:text-[#fff]/60">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="h-[44px] w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 text-sm font-normal text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-[#609328] focus:bg-transparent dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:focus:border-[#609328]"
                  autoFocus
                />
              </div>

              {/* URL Preview Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-normal text-zinc-700 dark:text-[#fff]/60">
                  URL
                </label>
                <div className="flex h-[44px] w-full items-center rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 text-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                  <span className="select-none font-normal text-zinc-400 dark:text-zinc-500">
                    taskstack.app/
                  </span>
                  <input
                    type="text"
                    readOnly
                    value={generatedSlug}
                    className="w-full bg-transparent pl-0.5 font-normal text-zinc-800 outline-none dark:text-zinc-200"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={createWorkspaceLoading || !workspaceName.trim()}
                className="active:scale-98 mt-2 flex h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#609328] font-normal text-white shadow-sm transition-all hover:bg-[#609328]/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>Create Workspace</span>
                {createWorkspaceLoading && (
                  <Loader2 size={16} className="animate-spin text-white" />
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center text-[11px] text-gray-400 dark:text-zinc-600">
            © {new Date().getFullYear()} Taskstack Inc.
          </div>
        </div>
      )}
    </>
  );
}
