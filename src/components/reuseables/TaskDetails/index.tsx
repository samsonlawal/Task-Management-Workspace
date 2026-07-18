"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
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
  getDetails,
}: {
  taskData: TaskData;
  getDetails?: () => void;
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth) as { user: any };

  const { onDeleteTask, loading: deleteLoading } = useDeleteTask();
  const { onPromoteTask, loading: promoteLoading } = usePromoteTask();
  const { onDemoteTask, loading: demoteLoading } = useDemoteTask();
  const { onMarkAsDone, loading: markAsDoneLoading } = useMarkAsDone();
  const { onGetTasks } = useGetTasks();

  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"activity" | "comments" | "attachments">("activity");
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
  }, [setIsDetailsOpen, taskData, dispatch]);

  const handleDialogClose = () => {
    setIsDetailsOpen(false);
    setIsCommentsExpanded(false);
  };

  const handleDeleteTask = () => {
    const { id, workspaceId = "" } = taskData;
    if (id) {
      setIsDetailsOpen(false);
      onDeleteTask({
        id: id,
        successCallback: async () => {
          setIsDetailsOpen(false);
          onGetTasks({ workspaceId });
          showSuccessToast({ message: "Task Deleted Successfully!" });
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    }
  };

  const handlePromoteTask = () => {
    const { id, workspaceId = "" } = taskData;
    if (id) {
      onPromoteTask({
        id: id,
        successCallback: async () => {
          onGetTasks({ workspaceId });
          showSuccessToast({ message: "Task Promoted Successfully!" });
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    }
  };

  const handleDemoteTask = () => {
    const { id, workspaceId = "" } = taskData;
    if (id) {
      onDemoteTask({
        id: id,
        successCallback: async () => {
          onGetTasks({ workspaceId });
          showSuccessToast({ message: "Task Demoted Successfully!" });
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    }
  };

  const handleMarkAsDone = () => {
    const { id, workspaceId = "" } = taskData;
    if (id) {
      onMarkAsDone({
        id: id,
        successCallback: async () => {
          onGetTasks({ workspaceId });
          showSuccessToast({ message: "Task Completed Successfully!" });
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIsDetailsOpen(true);
          getDetails?.();
          dispatch(setSingleTask(taskData));
        }}
        className="flex items-center text-[10px] text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
      >
        <img
          src="/icons/expand.svg"
          alt="expand"
          className="h-3 w-3 mr-1 select-none"
        />
      </button>
      
      <Dialog
        open={isDetailsOpen}
        onClose={handleDialogClose}
        transition
        className="poppins fixed inset-0 flex w-screen select-none items-center justify-end bg-black/30 font-madei transition duration-300 ease-out data-[closed]:opacity-0 z-[60]"
      >
        {!deleteLoading || !promoteLoading ? (
          <>
            <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

            <div className="fixed inset-0 flex w-screen items-center justify-end">
              <DialogPanel
                className="h-full w-full lg:w-[calc(100vw-256px)] flex flex-col rounded-sm bg-gray-100 px-8 py-6 dark:bg-[#111] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Sub-Component */}
                <TaskDetailsHeader
                  taskData={taskData}
                  handleDeleteTask={handleDeleteTask}
                  handleMarkAsDone={handleMarkAsDone}
                  handleDialogClose={handleDialogClose}
                  markAsDoneLoading={markAsDoneLoading}
                />

                {/* Main Drawer Layout content */}
                <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden mt-6 text-[12px] h-[calc(100vh-140px)]">
                  {/* Left Column: Metadata Fields */}
                  <div className={`flex flex-col space-y-5 overflow-y-auto pr-3 flex-none ${isCommentsExpanded ? "hidden" : ""}`}>
                    <TaskFields
                      taskData={taskData}
                      demoteLoading={demoteLoading}
                      promoteLoading={promoteLoading}
                      markAsDoneLoading={markAsDoneLoading}
                      handleDemoteTask={handleDemoteTask}
                      handlePromoteTask={handlePromoteTask}
                      handleMarkAsDone={handleMarkAsDone}
                    />
                  </div>

                  {/* Right Column: Tabs, Activity Log, and Comments */}
                  <div className={`flex flex-col h-full overflow-hidden relative flex-1 ${isCommentsExpanded ? "flex-[5]" : ""}`}>
                    <div className="w-full h-full flex flex-col">
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
                          onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
                          className="px-2 py-1.5 text-zinc-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-medium"
                          title={isCommentsExpanded ? "Show task fields" : "Expand comments"}
                        >
                          {isCommentsExpanded ? (
                            <Minimize2 className="w-3.5 h-3.5" />
                          ) : (
                            <Maximize2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Tab Content Panels */}
                      <div className="pt-4 flex-1 min-h-0">
                        {activeTab === "activity" && (
                          <TaskTimeline taskData={taskData} />
                        )}

                        {activeTab === "comments" && (
                          <TaskComments taskId={taskData.id} user={user} />
                        )}

                        {activeTab === "attachments" && (
                          <div className="text-zinc-500 italic py-4">No attachments yet</div>
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
    </>
  );
}
