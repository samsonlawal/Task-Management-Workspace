"use client";

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { CustomSelect } from "../../select";
import Button from "../../Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCreateWorkspace } from "@/hooks/api/workspace";
import { TAddWorkspace } from "@/types";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { showErrorToast } from "@/utils/toaster";
import { Loader2 } from "lucide-react";

export default function AddWorkspace() {
  let [isOpen, setIsOpen] = useState(false);
  const [workspace, setWorkspace] = useState<TAddWorkspace>({
    name: "",
    description: "",
  });

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    getFromLocalStorage({
      key: "STACKTASK_PERSISTOR",
      cb: (data: any) => {
        if (data) {
          setUserId(data?.user?._id);
        }
      },
    });
  }, []);

  const {
    data: workspaceData,
    loading: createWorkspaceLoading,
    OnCreateWorkspace,
  } = useCreateWorkspace();

  function handleCreateTask() {
    const { name, description } = workspace;
    let errorMsg = "";

    if (!workspace.name) {
      errorMsg = "name is required.";
    }

    if (errorMsg) {
      showErrorToast({ message: errorMsg });
    } else {
      OnCreateWorkspace({
        userId,
        payload: {
          name,
          description,
        },
        successCallback: (data) => {
          setWorkspace({ name: "", description: "" });
          setIsOpen(false);
          console.log("Workspace created successfully:", data);
        },
        errorCallback: (error) => {
          console.error("Error creating workspace:", error);
        },
      });
    }

    console.log(workspace.name);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full cursor-pointer flex-row items-center rounded-[4px] border border-[#565656]/10 bg-[#565656]/10 py-1.5 pl-2 transition-all duration-300 ease-in-out hover:bg-[#565656]/20"
      >
        <img src="/icons/plus.svg" alt="" className="w-4 cursor-pointer" />

        <p className="px-2 text-[13px] text-[#707070]">Create Workspace</p>
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="flex w-full max-w-[500px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-2xl dark:border-zinc-800 dark:bg-[#1a1a1a]">
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex w-full flex-row items-center justify-between">
                <DialogTitle className="poppins-medium text-[16px] font-medium text-zinc-900 dark:text-white">
                  Create New Workspace
                </DialogTitle>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[#989898] transition-colors hover:bg-gray-200 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-[16px]" />
                </button>
              </div>

              {/* Description */}
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
                Set up a space to manage your tasks and collaborate with your team.
              </p>

              {/* Form Inputs */}
              <div className="flex flex-col gap-4 pt-1">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="spaceName" className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
                    Workspace Name
                  </label>
                  <input
                    name="spaceName"
                    type="text"
                    value={workspace.name}
                    onChange={(e) =>
                      setWorkspace((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="e.g. Acme Corp"
                    className="h-[38px] w-full rounded-md border border-gray-300 bg-transparent px-3 text-xs text-zinc-900 outline-none focus:border-[#609328] dark:border-zinc-800 dark:text-white placeholder-zinc-400"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="spaceDesc" className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
                    Description <span className="font-normal text-zinc-400">(optional)</span>
                  </label>
                  <input
                    name="spaceDesc"
                    type="text"
                    value={workspace.description}
                    onChange={(e) =>
                      setWorkspace((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="What is this workspace about?"
                    className="h-[38px] w-full rounded-md border border-gray-300 bg-transparent px-3 text-xs text-zinc-900 outline-none focus:border-[#609328] dark:border-zinc-800 dark:text-white placeholder-zinc-400"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-zinc-200 px-4 py-2 text-xs text-zinc-700 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  disabled={createWorkspaceLoading}
                  className="flex items-center gap-1.5 rounded-md bg-[#609328] px-5 py-2 text-xs font-medium text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {createWorkspaceLoading ? (
                    <>
                      <span>Creating</span>
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                    </>
                  ) : (
                    <span>Create Workspace</span>
                  )}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
