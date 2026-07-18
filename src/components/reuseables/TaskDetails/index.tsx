"use client";

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState,useRef } from "react";
import {
  faAlignLeft,
  faCircleNotch,
  faPen,
  faSpinner,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { DateTime } from "luxon";
import { Message } from "@/components/reuseables/chat/Message";
import { MessageBox } from "@/components/reuseables/chat/MessageBox";
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
import { getStatusStyles, getPriorityStyles } from "@/utils/taskStyles";
import { Maximize2, Minimize2 } from "lucide-react";

interface TaskData {
  id: string;
  title?: string;
  description: string;
  deadline?: string;
  assignee: {
    name: string;
    email: string;
    image?: string;
  };
  priority: string;
  status: string;
  createdAt: string;
  workspaceName?: string;
  workspaceId?: string;
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

  const [comments, setComments] = useState<any[]>([
    {
      id: "c1",
      taskId: taskData?.id || "1",
      comment: "Hey team, I just finished the first draft of the UI mockups. I've attached them in the channel.",
      commenter: "Jane Smith",
      commenterImage: "https://i.pravatar.cc/150?img=47",
      commenterEmail: "jane.smith@example.com",
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "c2",
      taskId: taskData?.id || "1",
      comment: "Looks great Jane! Just one quick note: can we make sure the padding on the cards is exactly 16px to match the design system?",
      commenter: "Mark Johnson",
      commenterImage: "https://i.pravatar.cc/150?img=11",
      commenterEmail: "mark.j@example.com",
      createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      // updatedAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: "c3",
      taskId: taskData?.id || "1",
      comment: "Good catch Mark. I'll update that right now and push the changes. We can use this to create other modals too.",
      commenter: "Jane Smith",
      commenterImage: "https://i.pravatar.cc/150?img=47",
      commenterEmail: "jane.smith@example.com",
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      // updatedAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "c4",
      taskId: taskData?.id || "1",
      comment: "Looks great Jane! Just one quick note: can we make sure the padding on the cards is exactly 16px to match the design system?",
      commenter: "Mark Johnson",
      commenterImage: "https://i.pravatar.cc/150?img=11",
      commenterEmail: "mark.j@example.com",
      createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      // updatedAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: "c5",
      taskId: taskData?.id || "1",
      comment: "Good catch Mark. I'll update that right now and push the changes. We can use this to create other modals too.",
      commenter: "Jane Smith",
      commenterImage: "https://i.pravatar.cc/150?img=47",
      commenterEmail: "jane.smith@example.com",
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      // updatedAt: new Date(Date.now() - 3600000).toISOString(),
    }
  ]);

  const {
    data: AllTasks,
    onGetTasks,
    loading: getTasksLoading,
  } = useGetTasks();

  let [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "activity" | "comments" | "attachments"
  >("activity");
  const [isCommentsExpanded, setIsCommentsExpanded] = useState<boolean>(false);

  const handleDialogClose = () => {
    setIsDetailsOpen(false);
    setIsCommentsExpanded(false);
  };

  const [spaceData, setSpaceData] = useState<TWorkspaceData>();

  const statusDisplay = getStatusStyles(taskData.status);
  const priorityDisplay = getPriorityStyles(taskData.priority);

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
    const { id, workspaceId = "" } = taskData;
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
    const { id, workspaceId = "" } = taskData;
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
    const { id, workspaceId = "" } = taskData;
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
    const { id, workspaceId = "" } = taskData;
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

  const [value, setValue] = useState('')

  function addComments(newCommentText: string) {
    if (!newCommentText.trim()) return;

    const newCommentObject = {
      id: `c-${Date.now()}`,
      taskId: taskData?.id || "1",
      comment: newCommentText,
      commenter: user?.fullname || "You",
      commenterImage: user?.profileImage || "none",
      commenterEmail: user?.email || "",
      createdAt: new Date().toISOString(),
      attachedFileName: selectedFiles ? selectedFiles.name : "",
    };

    setComments((prevComments) => {
      return [...prevComments, newCommentObject]
    })
    setValue("")
  }

  const commentRef = useRef<HTMLDivElement>(null)
  const commentsFeedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (commentsFeedRef.current) {
      commentsFeedRef.current.scrollTop = commentsFeedRef.current.scrollHeight;
    }
  }, [comments])

  const [selectedFiles, setSelectedFiles] = useState<File | null>(null)

  return (
    <>
      {/* <button
        onClick={() => {
          setIsDetailsOpen(true);
          getDetails?.();
          dispatch(setSingleTask(taskData));
          console.log("Singletask:", taskData);
        }}
        className="absolute right-0 top-0 z-10 p-2 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100"
        aria-label="Task options"
      > */}
      <button
        onClick={() => {
          setIsDetailsOpen(true);
          getDetails?.();
          dispatch(setSingleTask(taskData));
          console.log("Singletask:", taskData);
        }}
        className=""
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
                <div className="flex flex-col items-start justify-center gap-8 pb-4 font-medium">
                  <div className="flex w-full flex-row items-center justify-between pb-2">
                    <div className="flex w-full flex-col items-start justify-between">
                      <DialogTitle className="poppins-medium line-clamp-1 text-[18px] text-zinc-900 dark:text-white">
                        {taskData.title || 'No Title'}
                      </DialogTitle>

                      <p className="w-full flex-1 poppins-regular text-zinc-600 dark:text-zinc-400 text-[14px] py-3">
                        {taskData.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <EditTask
                        trigger={
                          <button
                            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
                            aria-label="Edit Task"
                            title="Edit Task"
                          >
                            <FontAwesomeIcon icon={faPen} className="h-3.5 w-3.5" />
                          </button>
                        }
                      />

                      <button
                        onClick={handleDeleteTask}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
                        aria-label="Delete Task"
                        title="Delete Task"
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-3.5 w-3.5" />
                      </button>

                      <div className="h-4 w-[1px] bg-gray-300 dark:bg-zinc-800 mx-1" />

                      <button
                        onClick={handleDialogClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
                        aria-label="Close details"
                        title="Close details"
                      >
                        <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                      </button>
                    </div>

                    {/* <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="h-4 w-4 text-gray-500 hover:text-gray-700"
        /> */}
                  </div>


                </div>

                <div className="flex flex-col gap-8 flex-1 overflow-hidden mt-4 text-[12px] h-[calc(100vh-140px)]">
                  {/* Left Column: Task Fields (hidden if expanded) */}
                  <div className={`flex flex-col space-y-5 overflow-y-auto pr-3 flex-none ${isCommentsExpanded ? "hidden" : ""}`}>
                  <div className="poppins flex flex-row flex-wrap gap-5 pt-2">
                    {/* Created At */}
                    <div className="flex flex-row items-center gap-8 w-[300px]">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="h-3 w-3 text-gray-500 dark:text-[#787878]"
                        />
                        <label className="text-[11px] text-gray-500 dark:text-[#787878]">
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
                    <div className="flex flex-row items-center w-[300px] gap-8">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="h-3 w-3 text-gray-500 dark:text-[#787878]"
                        />
                        <label className="text-[11px] text-gray-500 dark:text-[#787878]">
                          Status:
                        </label>
                      </div>
                      <div
                        className={`flex flex-row items-center gap-1 rounded-sm ${statusDisplay.bg} px-1.5 py-0.5`}
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${statusDisplay.dot}`}
                        />
                        <p
                          className={`text-[11px] font-normal ${statusDisplay.text}`}
                        >
                          {statusDisplay.label}
                        </p>
                      </div>
                    </div>

                    {/* Priority */}
                    <div className="flex flex-row items-center w-[300px] gap-8">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="h-3 w-3 text-gray-500 dark:text-[#787878]"
                        />
                        <label className="text-[11px] text-gray-500 dark:text-[#787878]">
                          Priority:
                        </label>
                      </div>
                      <div
                        className={`flex flex-row items-center gap-1 rounded-sm ${priorityDisplay.bg} px-1.5 py-0.5`}
                      >
                        <p
                          className={`text-[11px] font-normal ${priorityDisplay.text}`}
                        >
                          {taskData.priority.charAt(0).toUpperCase() +
                            taskData.priority.slice(1).toLowerCase()}
                        </p>
                      </div>
                    </div>

                    {/* Due Date */}
                    <div className="flex flex-row items-center w-[300px] gap-8">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="h-3 w-3 text-gray-500 dark:text-[#787878]"
                        />
                        <label className="text-[11px] text-gray-500 dark:text-[#787878]">
                          Due Date:
                        </label>
                      </div>
                      <p className="text-[11px] font-normal">
                        {taskData?.deadline ? DateTime.fromISO(taskData?.deadline).toFormat(
                          "dd MMMM, yyyy"
                        ) : "Not Set"}
                      </p>
                    </div>

                    {/* Assignee */}
                    <div className="flex flex-row items-center w-[300px] gap-8">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="h-3 w-3 text-gray-500 dark:text-[#787878]"
                        />
                        <label className="text-[11px] text-gray-500 dark:text-[#787878]">
                          Assignee:
                        </label>
                      </div>
                      <div className="flex flex-row items-center justify-center gap-1">
                        {taskData.assignee?.image &&
                        taskData.assignee?.image !== "none" ? (
                          <img
                            src={taskData.assignee?.image}
                            alt="avatar"
                            className="h-5 w-5 rounded-full"
                          />
                        ) : (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                            <span className="text-[8px] text-white">
                              {taskData.assignee?.name?.charAt(0).toUpperCase() || "U"}
                            </span>
                          </div>
                        )}
                        <p className="text-[11px] font-normal">
                          {taskData.assignee?.name || "Unassigned"}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    {/* <div className="flex flex-row items-start gap-8">
                      <div className="flex w-[90px] items-center justify-start gap-1">
                        <FontAwesomeIcon
                          icon={faAlignLeft}
                          className="h-3 w-3 text-gray-500 dark:text-[#787878]"
                        />
                        <label className="text-[11px] text-gray-500 dark:text-[#787878]">
                          Description:
                        </label>
                      </div>
                      <p className="w-full flex-1 text-[11px]">
                        {taskData.description}
                      </p>
                    </div> */}


                  {/* Actions */}
                  <div className="flex flex-row items-center gap-8">
                    <div className="flex w-[90px] items-center justify-start gap-1">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="h-3 w-3 text-gray-500 dark:text-[#787878]"
                      />
                      <label className="text-[11px] text-gray-500 dark:text-[#787878]">
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
                          className="flex h-7 w-7 items-center justify-center rounded-sm bg-slate-300 text-[11px] font-normal text-gray-500 transition-all duration-300 hover:bg-gray-300/70 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed dark:bg-[#565656]/20 dark:text-[#eee] dark:hover:bg-[#565656]/30"
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
                        className="h-7 w-16 rounded-sm bg-slate-300 px-2.5 text-[11px] font-normal text-gray-500 transition-all duration-300 hover:bg-gray-300/70 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed dark:bg-[#565656]/20 dark:text-[#eee] dark:hover:bg-[#565656]/30"
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
                          className="flex h-7 w-7 items-center justify-center rounded-sm bg-slate-300 text-[11px] font-normal text-gray-500 transition-all duration-300 hover:bg-gray-300/70 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed dark:bg-[#565656]/20 dark:text-[#eee] dark:hover:bg-[#565656]/30"
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
                  </div>
                  </div>

                  {/* Right Column: Tabs & Comments */}
                  <div className={`flex flex-col h-full overflow-hidden relative flex-1 ${isCommentsExpanded ? "flex-[5]" : ""}`}>
                    <div className="w-full h-full flex flex-col">
                      {/* Tab Headers */}
                      <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#565656]/20">
                        <div className="flex">
                        <button
                          onClick={() => setActiveTab("activity")}
                          className={`px-4 py-2 font-medium ${activeTab === "activity" ? "border- border-b-2 font-semibold text-black dark:border-white dark:text-white" : "text-[#565656] hover:text-[#111] dark:hover:text-white"}`}
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

                      <button
                        onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
                        className="px-2 py-1.5 text-zinc-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-medium"
                        title={isCommentsExpanded ? "Show task fields" : "Expand comments"}
                      >
                        {isCommentsExpanded ? (
                          <>
                            <Minimize2 className="w-3.5 h-3.5" />
                            {/* <span>Collapse</span> */}
                          </>
                        ) : (
                          <>
                            <Maximize2 className="w-3.5 h-3.5" />
                            {/* <span>Expand comments</span> */}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Tab Content */}
                    <div className="pt-4 flex-1 min-h-0">
                        {activeTab === "activity" && (
                          <div className="space-y-3">
                            <p>
                              <span className="text-purple-500">{'<>  '}</span>
                              Task created on{" "}
                              {DateTime.fromISO(taskData.createdAt).toFormat(
                                "MMMM dd, yyyy",
                              )}
                            </p>
                          </div>
                        )}

                        {activeTab === "comments" && (
                          <div className="flex flex-col h-[calc(100vh-220px)] lg:h-[calc(100vh-200px)] w-full relative overflow-hidden pb-4">
                            <div ref={commentsFeedRef} className="flex-1 overflow-y-auto pb-4 space-y-4 pr-1 scrollbar-hide">
                              {comments && comments.length > 0 ? (
                                comments.map((comment) => {
                                  const isMe = comment.commenter === "You" || (user && comment.commenter === user.fullname);
                                  const dateFormatted = comment.updatedAt 
                                    ? DateTime.fromISO(comment.updatedAt).toFormat("MMMM dd, yyyy, hh:mm a")
                                    : DateTime.fromISO(comment.createdAt).toFormat("MMMM dd, yyyy, hh:mm a");
                                  return (
                                    <Message
                                      key={comment.id}
                                      senderName={comment.commenter}
                                      senderAvatar={comment.commenterImage}
                                      content={comment.comment}
                                      timestamp={dateFormatted}
                                      isMe={isMe}
                                      attachedFileName={comment.attachedFileName}
                                    />
                                  );
                                })
                              ) : (
                                <div className="w-full text-center py-6 text-gray-500 italic text-[12px]">
                                  No comments yet...
                                </div>
                              )}
                              <div ref={commentRef} />
                            </div>

                            <div className="pt-2 border-t border-[#565656]/10 w-full bg-transparent">
                              <MessageBox
                                value={value}
                                onChange={(val) => setValue(val)}
                                onSend={() => addComments(value)}
                                placeholder="> say something..."
                                selectedFile={selectedFiles}
                                onFileSelect={(file) => setSelectedFiles(file)}
                                isDarkBg={true}
                                className="w-full"
                              />
                            </div>
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
