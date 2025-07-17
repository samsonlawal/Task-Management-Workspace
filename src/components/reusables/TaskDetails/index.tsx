"use client";

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  faAlignLeft,
  faCircleNotch,
  faSpinner,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { DateTime } from "luxon";
import {
  faCalendar,
  faCircleCheck,
  faClock,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { TWorkspaceData } from "@/types";
import { setSingleTask, setTasks } from "@/redux/Slices/taskSlice";
import EditTask from "../Dialogs/EditTask";
import {
  useDeleteTask,
  useDemoteTask,
  useGetTasks,
  useMarkAsDone,
  usePromoteTask,
} from "@/hooks/api/tasks";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";

interface TaskData {
  id: string;
  description: string;
  deadline: string;
  assignee: {
    name: string;
    email: string;
    image?: string;
  };
  priority: string;
  status: string;
  createdAt: string;
  workspaceName: string;
  workspaceId: string;
}

export default function TaskDetails({
  taskData,
  getDetails,
}: {
  taskData: TaskData;
  getDetails?: () => void;
}) {
  const dispatch = useDispatch();

  const { onDeleteTask, loading: deleteLoading } = useDeleteTask();
  const { onPromoteTask, loading: promoteLoading } = usePromoteTask();
  const { onDemoteTask, loading: demoteLoading } = useDemoteTask();
  const { onMarkAsDone, loading: markAsDoneLoading } = useMarkAsDone();

  const {
    data: AllTasks,
    onGetTasks,
    loading: getTasksLoading,
  } = useGetTasks();

  let [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "activity" | "comments" | "attachments"
  >("activity");

  const handleDialogClose = () => {
    setIsDetailsOpen(false);
  };

  const [spaceData, setSpaceData] = useState<TWorkspaceData>();

  // Helper function to get status display
  const getStatusDisplay = (status: string) => {
    const statusConfig = {
      todo: { label: "To Do", color: "bg-gray-200", dotColor: "bg-gray-600" },
      "in-progress": {
        label: "In Progress",
        color: "bg-yellow-200",
        dotColor: "bg-yellow-700",
      },
      "in-review": {
        label: "In Review",
        color: "bg-blue-200",
        dotColor: "bg-blue-700",
      },
      done: { label: "Done", color: "bg-green-200", dotColor: "bg-green-700" },
    };

    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig["todo"]
    );
  };

  // Helper function to get priority display
  const getPriorityDisplay = (priority: string) => {
    const priorityConfig = {
      High: { color: "bg-red-300", textColor: "text-red-800" },
      Medium: { color: "bg-yellow-300", textColor: "text-yellow-800" },
      Low: { color: "bg-green-300", textColor: "text-green-800" },
      low: { color: "bg-green-300", textColor: "text-green-800" },
    };

    return (
      priorityConfig[priority as keyof typeof priorityConfig] ||
      priorityConfig["Low"]
    );
  };

  const statusDisplay = getStatusDisplay(taskData.status);
  const priorityDisplay = getPriorityDisplay(taskData.priority);

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
    // console.log("Singletask:", taskData);

    // }, [workspaceId]);
  }, [setIsDetailsOpen]);

  function handleDeleteTask() {
    // console.log(taskData.id);
    const { id, workspaceId } = taskData;
    console.log(taskData);

    if (id) {
      setIsDetailsOpen(false);

      onDeleteTask({
        id: id,
        successCallback: async () => {
          setIsDetailsOpen(false);
          onGetTasks({
            workspaceId: workspaceId,
          });
          showSuccessToast({ message: "Task Deleted Successfully!" });
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    }
  }

  function handlePromoteTask() {
    // console.log(taskData.id);
    const { id, workspaceId } = taskData;
    console.log(taskData);

    if (id) {
      onPromoteTask({
        id: id,
        successCallback: async () => {
          // setIsDetailsOpen(false);
          console.log("Task Promoted Successfully!");
          onGetTasks({
            workspaceId: workspaceId,
          });
          showSuccessToast({ message: "Task Promoted Successfully!" });
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    }
  }

  function handleDemoteTask() {
    // console.log(taskData.id);
    const { id, workspaceId } = taskData;
    console.log(taskData);

    if (id) {
      onDemoteTask({
        id: id,
        successCallback: async () => {
          // setIsDetailsOpen(false);
          console.log("Task Demoted Successfully!");
          onGetTasks({
            workspaceId: workspaceId,
          });
          showSuccessToast({ message: "Task Demoted Successfully!" });
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message: "Failed to demote task" });
        },
      });
    }
  }

  function handleMarkAsDone() {
    // console.log(taskData.id);
    const { id, workspaceId } = taskData;
    console.log(taskData);

    if (id) {
      onMarkAsDone({
        id: id,
        successCallback: async () => {
          // setIsDetailsOpen(false);
          console.log("Task Demoted Successfully!");
          onGetTasks({
            workspaceId: workspaceId,
          });
          showSuccessToast({ message: "Task Demoted Successfully!" });
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setIsDetailsOpen(true);
          getDetails?.();
          dispatch(setSingleTask(taskData));
          console.log("Singletask:", taskData);
        }}
        className="absolute right-0 top-0 z-10 p-2 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100"
        aria-label="Task options"
      >
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="h-4 w-4 text-[#989898] hover:text-gray-700"
        />
      </button>
      <Dialog
        open={isDetailsOpen}
        onClose={handleDialogClose}
        transition
        className="poppins fixed inset-0 flex w-screen select-none items-center justify-end bg-black/30 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
      >
        {!deleteLoading || !promoteLoading ? (
          <>
            <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

            <div className="fixed inset-0 flex w-screen items-center justify-end p-2">
              <DialogPanel
                className="h-[100%] w-[400px] space-y-1 rounded-xl bg-gray-100 px-8 py-6"
                onClick={(e) => e.stopPropagation()}
              >
                <DialogTitle className="flex flex-col items-start justify-center gap-8 pb-4 font-medium">
                  <div className="flex w-full flex-row items-center justify-between border-b-[1px] pb-2">
                    <img
                      src="/icons/cancel.svg"
                      alt=""
                      className="h-3 w-3"
                      onClick={() => setIsDetailsOpen(false)}
                    />
                    <div className="flex w-fit cursor-pointer items-center justify-start rounded-full">
                      {/* <FontAwesomeIcon
            icon={faXmark}
            className="h-4 w-4 text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          /> */}

                      <div className="flex flex-row text-[12px] font-normal">
                        <button
                          className="ml-2 flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          aria-label="Task options"
                        >
                          <EditTask />
                        </button>

                        <button
                          onClick={() => {
                            // setIsDetailsOpen(true);
                            // getDetails?.();
                            // dispatch(setSingleTask(taskData));
                            // console.log("Singletask:", taskData);
                            handleDeleteTask();
                          }}
                          className="ml-2 flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          aria-label="Task options"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="h-4 w-4 text-[#989898] hover:text-gray-700"
                          />
                        </button>
                      </div>
                    </div>

                    {/* <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="h-4 w-4 text-gray-500 hover:text-gray-700"
        /> */}
                  </div>

                  <div className="flex w-full flex-col items-start justify-between">
                    <div className="text-[12px] font-normal">
                      <p className="text-gray-400">
                        Project {`> `}
                        <span className="text-gray-400">
                          {taskData.workspaceName}
                        </span>
                      </p>
                    </div>
                    <p className="poppins-medium line-clamp-1 text-[18px]">
                      {taskData.description}
                    </p>
                    {/* <EditTask /> */}
                  </div>
                </DialogTitle>

                <div className="flex flex-col gap-4">
                  <div className="poppins flex flex-col gap-4">
                    {/* Created At */}
                    <div className="flex flex-row items-center gap-8">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="h-3 w-3 text-gray-500 hover:text-gray-700"
                        />
                        <label className="text-[11px] text-gray-500">
                          Created At:
                        </label>
                      </div>
                      <p className="text-[11px] font-normal">
                        {DateTime.fromISO(taskData.createdAt).toFormat(
                          "dd MMMM, yyyy. hh:mm a",
                        )}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="flex flex-row items-center gap-8">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="h-3 w-3 text-gray-500 hover:text-gray-700"
                        />
                        <label className="text-[11px] text-gray-500">
                          Status:
                        </label>
                      </div>
                      <div
                        className={`flex flex-row items-center gap-1 rounded-sm ${statusDisplay.color} px-1.5 py-0.5`}
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${statusDisplay.dotColor}`}
                        />
                        <p className="text-[11px] font-normal">
                          {statusDisplay.label}
                        </p>
                      </div>
                    </div>

                    {/* Priority */}
                    <div className="flex flex-row items-center gap-8">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="h-3 w-3 text-gray-500 hover:text-gray-700"
                        />
                        <label className="text-[11px] text-gray-500">
                          Priority:
                        </label>
                      </div>
                      <div
                        className={`flex flex-row items-center gap-1 rounded-sm ${priorityDisplay.color} px-1.5 py-0.5`}
                      >
                        <p
                          className={`text-[11px] font-normal ${priorityDisplay.textColor}`}
                        >
                          {taskData.priority.charAt(0).toUpperCase() +
                            taskData.priority.slice(1).toLowerCase()}
                        </p>
                      </div>
                    </div>

                    {/* Due Date */}
                    <div className="flex flex-row items-center gap-8">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="h-3 w-3 text-gray-500 hover:text-gray-700"
                        />
                        <label className="text-[11px] text-gray-500">
                          Due Date:
                        </label>
                      </div>
                      <p className="text-[11px] font-normal">
                        {DateTime.fromISO(taskData.deadline).toFormat(
                          "dd MMMM, yyyy",
                        )}
                      </p>
                    </div>

                    {/* Assignee */}
                    <div className="flex flex-row items-center gap-8">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="h-3 w-3 text-gray-500 hover:text-gray-700"
                        />
                        <label className="text-[11px] text-gray-500">
                          Assignee:
                        </label>
                      </div>
                      <div className="flex flex-row items-center justify-center gap-1">
                        {taskData.assignee.image &&
                        taskData.assignee.image !== "none" ? (
                          <img
                            src={taskData.assignee.image}
                            alt="avatar"
                            className="h-5 w-5 rounded-full"
                          />
                        ) : (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                            <span className="text-[8px] text-white">
                              {taskData.assignee.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <p className="text-[11px] font-normal">
                          {taskData.assignee.name}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-row items-start gap-8">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faAlignLeft}
                          className="h-3 w-3 text-gray-500 hover:text-gray-700"
                        />
                        <label className="text-[11px] text-gray-500">
                          Description:
                        </label>
                      </div>
                      <p className="w-full flex-1 text-[11px]">
                        {taskData.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row items-center gap-8">
                    <div className="flex w-[90px] items-center justify-start gap-1">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="h-3 w-3 text-gray-500 hover:text-gray-700"
                      />
                      <label className="text-[11px] text-gray-500">
                        Actions:
                      </label>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                      {/* Demote task */}
                      <div className="flex flex-row text-[12px] font-normal">
                        {/* <EditTask /> */}

                        <button
                          onClick={() => {
                            handleDemoteTask();
                          }}
                          disabled={markAsDoneLoading}
                          className="flex h-7 w-7 items-center justify-center rounded-sm bg-slate-300 hover:bg-gray-300/70 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed"
                          aria-label="Task options"
                        >
                          {demoteLoading ? (
                            <img
                              src="/icons/loaderWhite.svg"
                              alt=""
                              className="w-3 animate-spin"
                            />
                          ) : (
                            <img src="/icons/btn-left.svg" alt="" />
                          )}
                        </button>
                      </div>

                      {/* Mark as done */}
                      <button
                        onClick={() => {
                          // setIsDetailsOpen(false);
                          handleMarkAsDone();
                        }}
                        disabled={markAsDoneLoading}
                        className="h-7 w-16 rounded-sm bg-slate-300 px-2.5 text-[11px] font-normal text-gray-500 hover:bg-gray-300/70 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed"
                      >
                        {markAsDoneLoading ? (
                          <img
                            src="/icons/loaderWhite.svg"
                            alt=""
                            className="w-3 animate-spin"
                          />
                        ) : (
                          <p>Done</p>
                        )}
                      </button>

                      {/* Promote Task */}
                      <div className="flex flex-row text-[12px] font-normal">
                        <button
                          onClick={() => {
                            handlePromoteTask();
                          }}
                          disabled={markAsDoneLoading}
                          className="flex h-7 w-7 items-center justify-center rounded-sm bg-slate-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed"
                          aria-label="Task options"
                        >
                          {!promoteLoading ? (
                            <img src="/icons/btn-right.svg" alt="" />
                          ) : (
                            <img
                              src="/icons/loaderWhite.svg"
                              alt=""
                              className="w-3 animate-spin"
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 text-[12px]">
                    <div className="mt-6 w-full">
                      {/* Tab Headers */}
                      <div className="flex border-b border-gray-200">
                        <button
                          onClick={() => setActiveTab("activity")}
                          className={`px-4 py-2 font-medium ${activeTab === "activity" ? "border-b-2 border-black font-semibold text-black" : "text-gray-500 hover:text-gray-700"}`}
                        >
                          Activity
                        </button>
                        <button
                          onClick={() => setActiveTab("comments")}
                          className={`px-4 py-2 font-medium ${activeTab === "comments" ? "border-b-2 border-black font-semibold text-black" : "text-gray-500 hover:text-gray-700"}`}
                        >
                          Comments
                        </button>
                        <button
                          onClick={() => setActiveTab("attachments")}
                          className={`px-4 py-2 font-medium ${activeTab === "attachments" ? "border-b-2 border-black font-semibold text-black" : "text-gray-500 hover:text-gray-700"}`}
                        >
                          Attachments
                        </button>
                      </div>

                      {/* Tab Content */}
                      <div className="py-4">
                        {activeTab === "activity" && (
                          <div className="space-y-3">
                            <p>
                              Task created on{" "}
                              {DateTime.fromISO(taskData.createdAt).toFormat(
                                "MMMM dd, yyyy",
                              )}
                            </p>
                          </div>
                        )}

                        {activeTab === "comments" && (
                          <div>
                            <p>No comments yet</p>
                          </div>
                        )}

                        {activeTab === "attachments" && (
                          <div>
                            <p>No attachments yet</p>
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
              alt=""
              className="w-8 animate-spin"
            />
          </span>
        )}
      </Dialog>
    </>
  );
}
