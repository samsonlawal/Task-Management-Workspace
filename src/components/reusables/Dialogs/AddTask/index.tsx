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
        className="flex w-fit items-center justify-center gap-2 rounded-[8px] bg-[#242424] px-4 py-2.5 text-[12px] font-normal text-white transition-all duration-300 hover:bg-[#111111]"
      >
        <FontAwesomeIcon icon={faPlus} />
        Add Task
      </button>
      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        transition
        className="poppins fixed inset-0 flex w-screen select-none items-center justify-center bg-black/30 p-4 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel
            className="h-fit w-[600px] space-y-1 rounded-xl bg-white px-8 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <DialogTitle className="flex flex-row items-center justify-between font-medium">
              <p className="poppins-bold text-[18px]">Create Task</p>
              <div
                onClick={() => setIsOpen(false)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black"
              >
                <FontAwesomeIcon icon={faXmark} className="fa-sm text-white" />
              </div>
            </DialogTitle>
            <Description className="pb-6">
              <p className="w-[95%] text-[13px] font-light leading-4 text-black">
                Add a new task to your workspace and start organizing your work.
              </p>
            </Description>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* description */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="spaceName"
                    className="text-[14px] font-semibold"
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
                    className="h-[80px] max-h-[100px] w-full rounded-md border-[1px] border-gray-300 px-2 py-2 text-xs text-[black] placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  />
                </div>

                <div className="flex flex-row gap-2">
                  {/* Priority */}
                  <div className="flex w-52 flex-col items-start gap-2">
                    <span className="poppins-semibold text-[14px]">
                      Priority:
                    </span>

                    <div className="poppins-regular flex flex-row gap-2">
                      <label
                        className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1.5 ${task.priority === "Low" ? "bg-gray-200" : "bg-none"}`}
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
                        <span className="text-xs text-gray-700">Low</span>
                      </label>

                      <label
                        className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1 ${task.priority === "Medium" ? "bg-gray-200" : "bg-none"}`}
                      >
                        {" "}
                        <input
                          type="checkbox"
                          name="priority"
                          value={task.priority}
                          checked={task.priority === "Medium"}
                          onChange={() =>
                            setTask((prev) => ({ ...prev, priority: "Medium" }))
                          }
                          className={`peer hidden checked:accent-black`}
                        />
                        <span className="text-xs text-gray-700">Medium</span>
                      </label>

                      <label
                        className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1 ${task.priority === "High" ? "bg-gray-200" : "bg-none"}`}
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
                        <span className="text-xs text-gray-700">High</span>
                      </label>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-start gap-2">
                    <span className="poppins-semibold text-[14px]">
                      Status:
                    </span>

                    <div className="poppins-regular flex flex-row gap-2">
                      <label
                        className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1.5 ${task.status === "to-do" ? "bg-gray-200" : "bg-none"}`}
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
                        <span className="text-xs text-gray-700">To-Do</span>
                      </label>

                      <label
                        className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1 ${task.status === "in-progress" ? "bg-gray-200" : "bg-none"}`}
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
                        <span className="text-xs text-gray-700">
                          In-Progress
                        </span>
                      </label>

                      {/* <label
                        className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1 ${task.priority === "High" ? "bg-gray-200" : "bg-none"}`}
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
                        <span className="text-xs text-gray-700">High</span>
                      </label> */}
                    </div>
                  </div>
                </div>

                {/* Others */}
                <div className="flex flex-row-reverse gap-2">
                  <div className="flex flex-1 flex-col gap-1">
                    <label
                      htmlFor="deadline"
                      className="poppins-semibold text-[14px]"
                    >
                      Deadline
                    </label>
                    <input
                      name="deadline"
                      type="date"
                      placeholder="Add deadline"
                      value={task.deadline}
                      className="h-[40px] w-full select-none rounded-md border-[1px] border-gray-300 px-2 text-xs font-light text-gray-700 placeholder-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
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
                      className="text-[14px] font-semibold"
                    >
                      Assignee:
                    </label>
                    {/* <CustomSelect
                      options={[
                        { label: "Member", value: "member" },
                        { label: "Admin", value: "admin" },
                      ]}
                      placeholder="Assignee"
                      onChange={(value: any) => console.log("Selected:", value)}
                      className="w-[200px] bg-none"
                      onOpenChange={setIsSelectOpen}
                    /> */}
                    <MemberSelect setTaskAssignee={setTaskAssignee} />
                  </div>
                </div>

                {/* <div className="flex flex-row items-center gap-2">
                  <span className="text-[14px]">High priority:</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={isToggled}
                      onChange={() => setIsToggled(!isToggled)}
                      className="peer sr-only"
                    />
                    <div className="peer h-4 w-8 rounded-full bg-gray-300 after:absolute after:left-1 after:top-0.5 after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-3" />
                  </label>
                </div> */}
              </div>

              <div className="flex gap-3 pt-4 text-[14px]">
                <Button
                  text="Cancel"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-[13px] text-black hover:bg-gray-300"
                />
                {/* <Button
                  text="Create"
                  onClick={handleCreateTask}
                  className="bg-[#222] px-7 text-white hover:bg-[#111]"
                /> */}

                <button
                  className="w-[100px] rounded bg-[#222] py-2 text-[13px] font-normal text-white transition-all duration-300 hover:bg-[#111]"
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
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

