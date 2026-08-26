"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSingleTask } from "@/redux/Slices/taskSlice";
import {
  useDeleteTask,
  useDemoteTask,
  useGetTasks,
  useMarkAsDone,
  usePromoteTask,
} from "@/hooks/api/tasks";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { Maximize2, Minimize2 } from "lucide-react";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { TWorkspaceData } from "@/types";

// Import modular sub-components
import TaskDetailsHeader from "./components/TaskDetailsHeader";
import TaskFields from "./components/TaskFields";
import TaskTimeline from "./components/TaskTimeline";
import TaskComments from "./components/TaskComments";

import {
  useDeleteTaskMutation,
  useMarkAsDoneMutation,
  usePromoteTaskMutation,
  useDemoteTaskMutation,
} from "@/redux/api/taskApiSlice";

interface TaskData {
  id: string;
  title?: string;
  description: string;
  deadline?: string;
  assignee: {
    name: string;
    email: string;
    image?: string;
    _id?: string;
  };
  priority: string;
  status: string;
  createdAt: string;
  workspaceName?: string;
  workspaceId?: string;
  createdBy?: string;
}

export default function TaskDetails({
  taskData,
  onClose,
}: {
  taskData: TaskData;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth) as {
    user: any;
  };

  const [deleteTask, { isLoading: deleteLoading }] = useDeleteTaskMutation();

  const [activeTab, setActiveTab] = useState<
    "activity" | "comments" | "attachments"
  >("activity");
  const [isCommentsExpanded, setIsCommentsExpanded] = useState<boolean>(false);
  const [spaceData, setSpaceData] = useState<TWorkspaceData>();

  useEffect(() => {
    getFromLocalStorage({
      key: "WorkspaceData",
      cb: (data: unknown) => {
        if (data && typeof data === "object") {
          setSpaceData(data as TWorkspaceData);
        }
      },
    });
    dispatch(setSingleTask(taskData));
  }, [taskData, dispatch]);

  const handleDialogClose = () => {
    onClose();
    setIsCommentsExpanded(false);
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask({ taskId: taskData.id }).unwrap();
      onClose();
      showSuccessToast({ message: "Task Deleted Successfully!" });
    } catch (error: any) {
      showErrorToast({
        message: error?.data?.message || "Failed to delete task",
      });
    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleDialogClose}
      transition
      className="poppins fixed inset-0 z-[60] flex w-screen select-none items-center justify-end bg-black/30 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
    >
      {!deleteLoading ? (
        <>
          <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

          <div className="fixed inset-0 flex w-screen items-center justify-end">
            <DialogPanel
              className="flex h-full w-full flex-col overflow-hidden rounded-sm bg-gray-100 px-8 py-6 dark:bg-[#111] lg:w-[calc(100vw-256px)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Sub-Component */}
              <TaskDetailsHeader
                taskData={taskData}
                handleDeleteTask={handleDeleteTask}
                handleDialogClose={handleDialogClose}
              />

              {/* Main Drawer Layout content */}
              <div className="mt-4 flex h-[calc(100vh-140px)] flex-1 flex-col gap-8 overflow-hidden text-[12px]">
                {/* Left Column: Metadata Fields */}
                <div
                  className={`relative z-20 flex w-full flex-none flex-col pr-3 lg:w-fit ${isCommentsExpanded ? "hidden" : ""}`}
                >
                  <TaskFields taskData={taskData} />
                </div>

                {/* Right Column: Tabs, Activity Log, and Comments */}
                <div
                  className={`relative z-10 flex h-full min-w-0 flex-1 flex-col overflow-hidden ${isCommentsExpanded ? "flex-[5]" : ""}`}
                >
                  <div className="flex h-full w-full flex-col">
                    {/* Tab Headers */}
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#565656]/20">
                      <div className="flex">
                        <button
                          onClick={() => setActiveTab("activity")}
                          className={`px-4 py-2 font-medium ${activeTab === "activity" ? "border-b-2 border-black font-semibold text-black dark:border-white dark:text-white" : "text-[#565656] hover:text-[#111] dark:hover:text-white"}`}
                        >
                          Activity
                        </button>
                        <button
                          onClick={() => setActiveTab("comments")}
                          className={`px-4 py-2 font-medium ${activeTab === "comments" ? "border-b-2 border-black font-semibold text-black dark:border-[#eee] dark:text-white" : "text-[#565656] hover:text-[#111] dark:hover:text-white"}`}
                        >
                          Comments
                        </button>
                        <button
                          onClick={() => setActiveTab("attachments")}
                          className={`px-4 py-2 font-medium ${activeTab === "attachments" ? "border-b-2 border-black font-semibold text-black dark:border-[#eee] dark:text-white" : "text-[#565656] hover:text-[#111] dark:hover:text-white"}`}
                        >
                          Attachments
                        </button>
                      </div>

                      {/* Comments Toggle Expand/Collapse */}
                      <button
                        onClick={() =>
                          setIsCommentsExpanded(!isCommentsExpanded)
                        }
                        className="flex items-center gap-1.5 px-2 py-1.5 text-[11px] font-medium text-zinc-500 transition-colors hover:text-black dark:hover:text-white"
                        title={
                          isCommentsExpanded
                            ? "Show task fields"
                            : "Expand comments"
                        }
                      >
                        {isCommentsExpanded ? (
                          <Minimize2 className="h-3.5 w-3.5" />
                        ) : (
                          <Maximize2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Tab Content Panels */}
                    <div className="min-h-0 flex-1 pt-4">
                      {activeTab === "activity" && (
                        <TaskTimeline taskData={taskData} />
                      )}

                      {activeTab === "comments" && (
                        <TaskComments taskId={taskData.id} user={user} />
                      )}

                      {activeTab === "attachments" && (
                        <div className="py-4 italic text-zinc-500">
                          No attachments yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </>
      ) : (
        <span className="flex w-full items-center justify-center">
          <img
            src="/icons/loaderWhite.svg"
            alt="loading..."
            className="w-8 animate-spin"
          />
        </span>
      )}
    </Dialog>
  );
}
