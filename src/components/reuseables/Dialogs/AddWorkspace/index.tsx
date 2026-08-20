"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCreateWorkspaceMutation } from "@/redux/api/workspaceApiSlice";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { Loader2, ArrowLeft, Plus } from "lucide-react";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { saveToLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import { setWorkspace } from "@/redux/Slices/workspaceSlice";

interface AddWorkspaceProps {
  trigger?: React.ReactNode;
  variant?: "sidebar" | "button";
  className?: string;

    isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;

}

export default function AddWorkspace({
  trigger,
  variant = "sidebar",
  className = "",
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen,
}: AddWorkspaceProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;  const [workspaceName, setWorkspaceName] = useState("");

  const { user } = useSelector((state: any) => state.auth);

  const [createWorkspace, { isLoading: createWorkspaceLoading }] =
    useCreateWorkspaceMutation();

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
      { variant === "button" ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`poppins flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-[8px] text-[12px] font-medium text-zinc-900 transition-all duration-300 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-white dark:text-[#111] dark:hover:bg-white/80 ${className}`}
        >
          <span>Create Workspace</span>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex w-full cursor-pointer flex-row items-center rounded-[4px] py-1 pl-2 transition-all duration-300 ease-in-out dark:hover:text-white dark:text-[#fff]/50 dark:hover:bg-[#565656]/10 text-[#111] hover:bg-[#565656]/10 ${className}`}
        >
          <Plus size={16} />
          <p className="px-2 text-[12px] font-normal">Create Workspace</p>
        </button>
      )}

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
                <label className="text-xs font-normal text-zinc-700 dark:text-zinc-400">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="h-[44px] w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 text-sm font-normal text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:bg-transparent dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:focus:border-zinc-400"
                  autoFocus
                />
              </div>

              {/* URL Preview Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-normal text-zinc-700 dark:text-zinc-400">
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
                className="active:scale-98 mt-2 flex h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white font-normal text-[#111] shadow-sm transition-all hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none text-sm"
              >
                <span>Create Workspace</span>
                {createWorkspaceLoading && (
                  <Loader2 size={16} className="animate-spin text-zinc-900" />
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
