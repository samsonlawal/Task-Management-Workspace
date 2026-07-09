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
import { getStatusStyles, getPriorityStyles } from "@/utils/taskStyles";

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

  const handleDialogClose = () => {
    setIsDetailsOpen(false);
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

  // Adding comment
  function addComments(newCommentText: string) {
    
let newCommentObject = {
      id: "c7",
      taskId: taskData?.id || "1",
      comment: newCommentText,
      commenter: "User",
      commenterImage: "https://i.pravatar.cc/150?img=12",
      commenterEmail: "user@example.com",
      createdAt: new Date().toISOString(), // 1 hour ago
      // updatedAt: new Date(Date.now() - 3600000).toISOString(),
      attachedFileName: selectedFiles ? selectedFiles.name : "",
}

    setComments((prevComments) => {
      return [...prevComments, newCommentObject]
    })
    setValue("")
  }

  const commentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    commentRef.current?.scrollIntoView({
      behavior: "smooth"
    })
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
        className="poppins fixed inset-0 flex w-screen select-none items-center justify-end bg-black/30 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
      >
        {!deleteLoading || !promoteLoading ? (
          <>
            <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

            <div className="fixed inset-0 flex w-screen items-center justify-end">
              <DialogPanel
                className="h-[100%] w-full lg:w-[calc(100vw-256px)] space-y-1 rounded-sm bg-gray-100 px-8 py-6 dark:bg-[#111]"
                onClick={(e) => e.stopPropagation()}
              >
                <DialogTitle className="flex flex-col items-start justify-center gap-8 pb-4 font-medium">
                  <div className="flex w-full flex-row items-center justify-between border-b-[1px] pb-2 dark:border-[#565656]/20">
                                      <div className="flex w-full flex-col items-start justify-between">
                    <p className="poppins-medium line-clamp-1 text-[18px]">
                      {taskData.title}
                    </p>

                                          <p className="w-full flex-1 poppins-regular text-[#fff]/50 text-[14px] py-3">
                        {taskData.description}
                      </p>
                  </div>
                    <div className="flex w-fit cursor-pointer items-center justify-start rounded-full">



                      <div className="flex flex-row text-[12px] font-normal">
                        <button
                          className="ml-2 flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          aria-label="Task options"
                        >
                          <EditTask />
                        </button>

                        <button
                          onClick={() => {
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


                </DialogTitle>

                <div className="flex flex-col gap-4">
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


                  <div className="flex gap-3 pt-4 text-[12px]">
                    <div className="mt-6 w-full">
                      {/* Tab Headers */}
                      <div className="flex border-b border-gray-200 dark:border-[#565656]/20">
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

                      {/* Tab Content */}
                      <div className="pt-4 h-full">
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
                          <div className="flex flex-col justify-start items-start py-1 gap-2 overflow-y-auto scrollbar-hide max-h-[250px] h-fit w-full">

                            {comments && Object.keys(comments).length > 0 ? (
                              comments.map((comment,key) => {
                                return(
                                    <div key={comment.id} className="flex flex-row justify-start items-start py-1 gap-2 ">
                            <div className="flex flex-row items-center justify-center gap-1">
                        {comment?.commenterImage &&
                        comment?.commenterImage !== "none" ? (
                          <img
                            src={comment?.commenterImage}
                            alt="avatar"
                            className="h-5 w-5 rounded-full"
                          />
                        ) : (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                            <span className="text-[8px] text-white">
                              {comment?.commenter.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="flex flex-col gap-2 bg-[#565656]/10 rounded-sm p-2 poppins-light">
                            <p className="text-[#fff]/70">{comment?.comment}
                            {/* <span className="text-amber-500"> @{comment?.commenter.split(" ")[0]}</span> */}
                            </p>
                             {comment?.attachedFileName && (
    <div className="flex w-fit gap-2 items-center bg-[#111]/40 px-2 py-1.5 rounded-md mt-1 border border-[#565656]/20">
      <p className="text-[11px] text-[#fff]/70 truncate">
        📎 {comment.attachedFileName}
      </p>
    </div>
  )}

                            <p className="text-[#fff]/30 text-[10px]">{comment?.updatedAt ? 
                            `Edited ${DateTime.fromISO(comment?.updatedAt).toFormat(
                                "MMMM dd, yyyy",
                              )}` :
                            `${DateTime.fromISO(comment?.createdAt).toFormat(
                                "MMMM dd, yyyy",
                              )}`  
                          }
                            </p>
                      </span>         
                      </div>
                                )
                               })
                              ): (
                                <div>
                                  <p>No comments yet...</p>
                                </div>
                              )}

                    <div ref={commentRef} />

                        {/* Comment box */}
                      <div className="p-1 rounded-sm h-fit w-[40%] absolute bottom-0 bg-[#111]">
                        {selectedFiles && (
                        <div className="flex w-fit gap-2 items-start justify-between bg-gray-700/20 px-2 py-1 rounded-md mb-2">
                             <p className="text-[11px] text-[#fff]/70 truncate max-w-[80%]">📎 
                            {selectedFiles?.name}</p>
                        <button 
                          onClick={() => setSelectedFiles(null)} 
                          className="text-[#fff]/50 hover:text-white text-[10px] px-1">
                          ✕
                          </button>
                          </div>
                          )}

                        <span className="text-[#fff]/50 dark:bg-[#111] border border-[#fff]/20 w-full pl-0.5 pr-2 pt-1 rounded-[6px] focus:outline-none focus:border-amber-500 placeholder-[#fff]/50 flex-col justify-start items-start flex">
                        
                        <span className='flex flex-row justify-center items-center w-full'>

                        <textarea placeholder="> say something..." className="text-[#fff]/50 dark:bg-[#111] w-full px-2 py-2 rounded-[6px] focus:outline-none placeholder-[#fff]/50 resize-none scrollbar-hide flex-1" value={value} onChange={(e) => {setValue(() => e.target.value)}}
                        
                        onKeyDown={(e) => {
                          if(e.key === 'Enter' && !e.shiftKey){
                            e.preventDefault()
                            addComments(value)
                          }
                        }}
                        />
                      
                      <div className='flex flex-row gap-2 items-center justify-center'>
                      {/* Pin */}
                      <label className="rounded-full p-1 hover:bg-white/10 cursor-pointer transition-all flex items-center justify-center">
                        <input type="file" 
                        className="hidden"
                        onChange={(e) => {
                        const file = e.target.files?.[0]
                        if(file){
                          setSelectedFiles(file)
                          console.log("selected file:", file.name);
                        }
                        }}
                        />

                           <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#fff" viewBox="0 0 256 256" className="rotate-90 cursor-pointer">
     <path d="M248,128a56.06,56.06,0,0,1-56,56H48a40,40,0,0,1,0-80H192a24,24,0,0,1,0,48H80a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H48a24,24,0,0,0,0,48H192a40,40,0,0,0,0-80H80a8,8,0,0,1,0-16H192A56.06,56.06,0,0,1,248,128Z"></path>
   </svg>
                      </label>
                        
                        {/* send button */}
                        <span className="flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-300 rounded-full p-1.5"
                        onClick={() => {addComments( value )}}
                        >
                            
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" className="fill-[#fff]" viewBox="0 0 256 256"><path d="M240,127.89a16,16,0,0,1-8.18,14L63.9,237.9A16.15,16.15,0,0,1,56,240a16,16,0,0,1-15-21.33l27-79.95A4,4,0,0,1,71.72,136H144a8,8,0,0,0,8-8.53,8.19,8.19,0,0,0-8.26-7.47h-72a4,4,0,0,1-3.79-2.72l-27-79.94A16,16,0,0,1,63.84,18.07l168,95.89A16,16,0,0,1,240,127.89Z"></path></svg>
                        </span>
                      </div>
                        </span>

                         </span>
                        
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
