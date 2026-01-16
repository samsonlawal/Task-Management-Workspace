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
import {
  faCirclePlus,
  faListCheck,
  faPlus,
  faXmark,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MemberSelect from "../../MemberSelect";
import { useCreateTask } from "@/hooks/api/tasks";
import { TAddTask } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import { useGetSingleWorkspace } from "@/hooks/api/workspace";
import { setWorkspace } from "@/redux/Slices/workspaceSlice";

export default function AddTask({ onGetTasks, taskData }: any) {
  const dispatch = useDispatch();

  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("to-do");
  const [status, setStatus] = useState<string>("todo");
  const [priority, setPriority] = useState<string>("Low");

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [workspaceId, setWorkspaceId] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  const TasksData = useSelector((state: RootState) => state.TasksData);

  const MemberData = useSelector((state: RootState) => state.MemberData);

  const [task, setTask] = useState<TAddTask>({
    description: "",
    workspace_id: "",
    assignee: "",
    deadline: "",
    status: "",
    priority: "",
    createdBy: "",
    title: "",
  });

  // const [userId, setCreatedBy] = useState<string>("");

  useEffect(() => {
    getFromLocalStorage({
      key: "CurrentWorkspaceId",
      cb: (id: string) => {
        if (id) {
          setWorkspaceId(id);
          setTask((prevTask) => ({
            ...prevTask,
            workspace_id: id,
          }));
        }
      },
    });

    getFromLocalStorage({
      key: "STACKTASK_PERSISTOR",
      cb: (data: any) => {
        if (data) {
          setTask((prevTask) => ({
            ...prevTask,
            createdBy: data?.user?._id,
          }));
        }
      },
    });
  }, [isOpen]);

  const [taskAssignee, setTaskAssignee] = useState();
  const { currentWorkspace } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const { onCreateTask, loading: creatTaskLoading } = useCreateTask();

  const {
    data: workspaceData,
    onGetSingleWorkspace,
    loading: singleWorkspaceLoading,
  } = useGetSingleWorkspace(currentWorkspace);

  const handleDialogClose = () => {
    if (!isSelectOpen) {
      setIsOpen(false);
      setStep(1);
    }
  };

  useEffect(() => {
    setTask((prevTask) => ({
      ...prevTask,
      assignee: taskAssignee,
    }));
  }, [taskAssignee]);

  const handleCreateTask = () => {
    const {
      description,
      workspace_id,
      assignee,
      deadline,
      status,
      priority,
      createdBy,
      title,
    } = task;
    let errorMsg = "";

    console.log("PAYLOAD:", {
      description,
      workspace_id,
      assignee,
      deadline,
      status,
      priority,
      createdBy,
      title,
    });

    if (!task.description) {
      errorMsg = "description is required.";
    } else if (!task?.assignee) {
      errorMsg = "assignee is required.";
    }

    if (errorMsg) {
      showErrorToast({ message: errorMsg });
    } else {
      // console.log(workspace_id);

      onCreateTask({
        payload: {
          description,
          workspace_id,
          assignee,
          deadline,
          status,
          priority,
          createdBy,
          title,
        },
        successCallback: async () => {
          showSuccessToast({ message: "Task Created Successfully!" });

          // const updatedWorkspace = await onGetSingleWorkspace(workspace_id);
          // if (updatedWorkspace) {
          //   dispatch(setWorkspace(updatedWorkspace));
          // }
          // console.log("Task Added to:", workspace_id);

          await onGetTasks({ workspaceId: workspace_id });
          console.log("New tasks:", taskData);
          setTask({
            description: "",
            workspace_id: "",
            assignee: "",
            deadline: "",
            status: "",
            priority: "",
            createdBy: "",
            title: "",
          });
          handleDialogClose();
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    }
  };

  function checkWsId() {
    setIsOpen(true);

    getFromLocalStorage({
      key: "CurrentWorkspaceId",
      cb: (id: string) => {
        if (id) {
          setWorkspaceId(id);
          setTask((prevTask) => ({
            ...prevTask,
            workspace_id: id,
          }));
          // console.log(id);
        }
      },
    });
  }

  const date = new Date(task.deadline);
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " "); // Output: "12 Jul 2025"
  // console.log(formattedDate);

  return (
    <>
      <button
        onClick={checkWsId}
        className="flex h-[34px] w-fit items-center justify-center gap-2 rounded-[6px] bg-[#111] px-3 text-[12px] font-normal text-[#fff] transition-all duration-300 hover:bg-[#242424] dark:bg-[white] dark:text-[#111]"
      >
        <FontAwesomeIcon icon={faPlus} />
        New Task
      </button>
      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        transition
        className="poppins fixed inset-0 flex w-screen select-none items-center justify-center bg-black/30 p-4 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            className="flex h-fit w-[600px] flex-col gap-6 rounded-xl bg-white px-8 py-8 dark:bg-[#111]"
            onClick={(e) => e.stopPropagation()}
          >
            <DialogTitle className="flex flex-row items-start justify-between font-medium">
              <div className="flex flex-col items-start gap-3">
                {step === 2 && (
                  <Button
                    text="Back"
                    onClick={() => setStep(step - 1)}
                    className="flex w-fit flex-row items-center justify-center gap-2 rounded bg-[#222] text-[13px] font-normal text-white transition-all duration-300 hover:bg-[#111] dark:bg-transparent dark:text-[#fff]/50 dark:hover:text-[#fff]"
                    leftIcon
                    leftIconSrc={<FontAwesomeIcon icon={faArrowLeft} />}
                  />
                )}
                <div>
                  <p className="poppins-medium text-[16px] dark:text-white">
                    {step === 1 ? "Create Task" : ""}
                  </p>
                  <p className="w-[100%] text-[13px] font-regular leading-4 text-black dark:text-[#fff]/50">
                    {step === 1
                      ? "Add a new task to your workspace and start organizing your work."
                      : ""}
                  </p>
                </div>
              </div>
              <div
                onClick={() => setIsOpen(false)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-[18px] text-black dark:text-[#565656]"
                />
              </div>
            </DialogTitle>
            {/* <Description className="pb-6">
              <p className="w-[95%] text-[13px] leading-4 text-black dark:text-[#fff]/50">
                {step === 1
                  ? "Add a new task to your workspace and start organizing your work."
                  : "Set priority, status, deadline, and assignee for your task."}
              </p>
            </Description> */}
            <div className="flex flex-col gap-4">
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  {/* title amd description */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="spaceName"
                        className="text-[14px] font-medium dark:text-[#565656]"
                      >
                        Title
                        {/* <span className="font-light text-[#999]">(optional)</span> */}
                      </label>
                      <input
                        name="title"
                        placeholder="Enter title"
                        value={task.title}
                        onChange={(e) =>
                          setTask((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="h-[42px] max-h-[100px] w-full rounded-md border-[1px] border-gray-300 px-2 py-2 text-xs font-regular text-[black] placeholder-gray-600 outline-none focus:ring-1 focus:ring-white/50 dark:border-[#565656]/30 dark:bg-transparent dark:text-[#fff] dark:placeholder-[#fff]/50"
                      />
                    </div>

                    {/* description */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="spaceName"
                        className="text-[14px] font-medium dark:text-[#565656]"
                      >
                        Description
                        {/* <span className="font-light text-[#999]">(optional)</span> */}
                      </label>
                      <textarea
                        name="description"
                        placeholder="Enter description"
                        value={task.description}
                        onChange={(e) =>
                          setTask((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="h-[80px] max-h-[100px] w-full rounded-md border-[1px] border-gray-300 px-2 py-2 text-xs font-regular text-[black] placeholder-gray-600 outline-none focus:ring-1 focus:ring-white/50 dark:border-[#565656]/30 dark:bg-transparent dark:text-[#fff] dark:placeholder-[#fff]/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-8">
                  {/* assingments */}
                  <div className="flex flex-row gap-2">
                    {/* Priority */}
                    <div className="flex w-52 flex-col items-start gap-2">
                      <span className="poppins-medium text-[14px] dark:text-[#565656]">
                        Priority:
                      </span>

                      <div className="poppins-regular flex flex-row gap-2">
                        <label
                          className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1.5 font-regular ${task.priority === "Low" ? "bg-gray-200 dark:bg-[#565656]/20" : "bg-none"} dark:border-[#565656]/30`}
                        >
                          <input
                            type="checkbox"
                            name="priority"
                            value={task.priority}
                            checked={task.priority === "Low"}
                            onChange={() =>
                              setTask((prev) => ({ ...prev, priority: "Low" }))
                            }
                            className={`peer hidden checked:accent-black`}
                          />
                          <span className="text-xs text-gray-700 dark:text-[#fff]/50">
                            Low
                          </span>
                        </label>

                        <label
                          className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1.5 font-regular ${task.priority === "Medium" ? "bg-gray-200 dark:bg-[#565656]/20" : "bg-none"} dark:border-[#565656]/30`}
                        >
                          {" "}
                          <input
                            type="checkbox"
                            name="priority"
                            value={task.priority}
                            checked={task.priority === "Medium"}
                            onChange={() =>
                              setTask((prev) => ({
                                ...prev,
                                priority: "Medium",
                              }))
                            }
                            className={`peer hidden checked:accent-black`}
                          />
                          <span className="text-xs font-regular text-gray-700 dark:text-[#fff]/50">
                            Medium
                          </span>
                        </label>

                        <label
                          className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1.5 font-regular ${task.priority === "High" ? "bg-gray-200 dark:bg-[#565656]/20" : "bg-none"} dark:border-[#565656]/30`}
                        >
                          {" "}
                          <input
                            type="checkbox"
                            name="priority"
                            value={task.priority}
                            checked={task.priority === "High"}
                            onChange={() =>
                              setTask((prev) => ({ ...prev, priority: "High" }))
                            }
                            className={`peer hidden checked:accent-black`}
                          />
                          <span className="text-xs font-regular text-gray-700 dark:text-[#fff]/50">
                            High
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col items-start gap-2">
                      <span className="poppins-medium text-[14px] dark:text-[#565656]">
                        Status:
                      </span>

                      <div className="poppins-regular flex flex-row gap-2">
                        <label
                          className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1.5 ${task.status === "to-do" ? "bg-gray-200 dark:bg-[#565656]/20" : "bg-none"} dark:border-[#565656]/30`}
                        >
                          <input
                            type="checkbox"
                            name="status"
                            value={task.status}
                            checked={task.status === "to-do"}
                            onChange={() =>
                              setTask((prev) => ({ ...prev, status: "to-do" }))
                            }
                            className={`peer hidden checked:accent-black`}
                          />
                          <span className="text-xs font-regular text-gray-700 dark:text-[#fff]/50">
                            To-Do
                          </span>
                        </label>

                        <label
                          className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1 ${task.status === "in-progress" ? "bg-gray-200 dark:bg-[#565656]/20" : "bg-none"} dark:border-[#565656]/30`}
                        >
                          {" "}
                          <input
                            type="checkbox"
                            name="status"
                            value={task.status}
                            checked={task.status === "in-progress"}
                            onChange={() =>
                              setTask((prev) => ({
                                ...prev,
                                status: "in-progress",
                              }))
                            }
                            className={`peer hidden checked:accent-black`}
                          />
                          <span className="text-xs font-regular text-gray-700 dark:text-[#fff]/50">
                            In-Progress
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Others */}
                  <div className="flex flex-row-reverse gap-2">
                    <div className="flex flex-1 flex-col gap-1">
                      <label
                        htmlFor="deadline"
                        className="text-[14px] dark:text-[#565656]"
                      >
                        Deadline
                      </label>
                      <input
                        name="deadline"
                        type="date"
                        placeholder="Add deadline"
                        value={task.deadline}
                        className="h-[40px] w-full select-none rounded-md border-[1px] border-gray-300 bg-transparent px-2 text-xs font-light text-gray-700 placeholder-gray-700 outline-none focus:ring-1 focus:ring-[#fff]/50 dark:border-[#565656]/30 dark:bg-transparent dark:text-[#fff]/50 dark:placeholder-[#fff]/50"
                        onChange={(e) =>
                          setTask((prev) => ({
                            ...prev,
                            deadline: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="flex w-fit flex-col gap-1">
                      <label
                        htmlFor="spaceName"
                        className="text-[14px] dark:text-[#565656]"
                      >
                        Assignee:
                      </label>

                      <MemberSelect setTaskAssignee={setTaskAssignee} />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 text-[14px]">
                {step === 1 ? (
                  <Button
                    text="Next"
                    onClick={() => setStep(2)}
                    className="flex w-fit flex-row items-center justify-center gap-2 rounded bg-[#222] px-5 py-1 text-[13px] font-normal text-white transition-all duration-300 hover:bg-[#111] dark:bg-transparent dark:text-[#fff]/50 dark:hover:text-[#fff]"
                    rightIcon
                    rightIconSrc={<FontAwesomeIcon icon={faArrowRight} />}
                  />
                ) : (
                  <button
                    className="w-fit rounded bg-[#222] px-4 py-2 text-[13px] font-normal text-white transition-all duration-300 hover:bg-[#111] dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    onClick={handleCreateTask}
                  >
                    {!creatTaskLoading ? (
                      "Create"
                    ) : (
                      <span className="flex w-full items-center justify-center">
                        <img
                          src="/icons/loaderWhite.svg"
                          alt=""
                          className="w-4 animate-spin"
                        />
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
