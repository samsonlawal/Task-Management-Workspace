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
import {
  useCreateTask,
  useGetSingleTask,
  useUpdateTask,
} from "@/hooks/api/tasks";
import { TAddTask } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import { useGetSingleWorkspace } from "@/hooks/api/workspace";
import { setWorkspace } from "@/redux/Slices/workspaceSlice";
import { useGetTasks } from "@/hooks/api/tasks";
import { setTasks } from "@/redux/Slices/taskSlice";

export default function AddTask({ taskData }: any) {
  const dispatch = useDispatch();

  let [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("to-do");
  const [status, setStatus] = useState<string>("todo");
  const [priority, setPriority] = useState<string>("Low");

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [workspaceId, setWorkspaceId] = useState<string>("");


  const MemberData = useSelector((state: RootState) => state.MemberData);

  const currentTask = useSelector(
    (state: RootState) => state.TasksData.currentTask,
  );

  const [task, setTask] = useState<TAddTask>({
    description: "",
    workspace_id: "",
    assignee: "",
    deadline: "",
    status: "",
    priority: "",
  });

  const [taskAssignee, setTaskAssignee] = useState<any>();
  const { currentWorkspace } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const {
    data: updateTask,
    onUpdateTask,
    loading: updateTaskLoading,
  } = useUpdateTask();

  const {
    data: singleTask,
    OnGetSingleTask,
    loading: getSingleTaskLoading,
  } = useGetSingleTask();

  const {
    data: AllTasks,
    onGetTasks,
    loading: getTasksLoading,
  } = useGetTasks();

  const {
    data: workspaceData,
    onGetSingleWorkspace,
    loading: singleWorkspaceLoading,
  } = useGetSingleWorkspace(currentWorkspace);

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
  }, []);

  const handleDialogClose = () => {
    if (!isSelectOpen) {
      setIsEditOpen(false);
    }
  };

  useEffect(() => {
    setTask((prevTask) => ({
      ...prevTask,
      assignee: taskAssignee,
    }));
  }, [taskAssignee]);

  const handleUpdateTask = () => {
    const { description, workspace_id, assignee, deadline, status, priority } =
      task;
    let errorMsg = "";

    if (!task.description) {
      errorMsg = "description is required.";
    } else if (!task?.assignee) {
      errorMsg = "assignee is required.";
    }

    if (errorMsg) {
      showErrorToast({ message: errorMsg });
    } else {
      // console.log(workspace_id);

      onUpdateTask({
        id: currentTask?.id || "",
        payload: {
          description,
          workspace_id,
          assignee,
          deadline,
          status,
          priority,
        },
        successCallback: async () => {
          showSuccessToast({ message: "Task Updated Successfully!" });

          // Fetch new tasks

          onGetTasks({
            workspaceId: workspace_id,
          });

          handleDialogClose();
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    }
  };

  useEffect(() => {
    if (AllTasks && AllTasks.length > 0) {
      console.log("AllTasks updated:", AllTasks);
    }
  }, [AllTasks, getTasksLoading]);

  function checkWsId() {
    if (!singleWorkspaceLoading) {
      setIsEditOpen(true);
    }

    OnGetSingleTask({
      id: currentTask?.id || "",
      successCallback: (fetchedTask) => {
        if (fetchedTask) {
          // Normalize priority and status to capitalized format
          const normalize = (val: string, allowed: string[]) => {
            const found = allowed.find(
              (a) => a.toLowerCase() === (val || "").toLowerCase(),
            );
            return found || allowed[0];
          };

          setTask({
            description: fetchedTask.description || "",
            workspace_id: fetchedTask.workspace_id || workspaceId,
            assignee: fetchedTask.assignee?.email || "",
            deadline: fetchedTask.deadline
              ? fetchedTask.deadline.slice(0, 10)
              : "",
            status: normalize(fetchedTask.status || "", [
              "to-do",
              "in-progress",
            ]),
            priority: normalize(fetchedTask.priority, [
              "Low",
              "Medium",
              "High",
            ]),
          });
          setTaskAssignee((fetchedTask.assignee as any)?._id || "");
        }
        setIsEditOpen(true);
      },
      errorCallback: () => {
        setIsEditOpen(false);
      },
    });
    console.log("from edit:", currentTask);

    // console.log(single)
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
        // className="flex w-fit items-center justify-center gap-2 rounded-[6px] bg-[#242424] px-3 py-2 text-[12px] font-regular text-white transition-all duration-300 hover:bg-black"
      >
        <img
          src="/icons/edit.svg"
          alt=""
          className="h-4 w-4 transition-all duration-300 hover:cursor-pointer hover:text-black"
        />
      </button>
      <Dialog
        open={isEditOpen}
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
              <p className="poppins-bold text-[18px]">Edit Task</p>
              <div
                onClick={() => setIsEditOpen(false)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black"
              >
                <FontAwesomeIcon icon={faXmark} className="fa-sm text-white" />
              </div>
            </DialogTitle>
            <Description className="w-[95%] pb-6 text-[13px] font-light leading-4 text-black">
              Add a new task to your workspace and start organizing your work.
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
                          type="radio"
                          name="priority"
                          value="Low"
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
                          type="radio"
                          name="priority"
                          value="Medium"
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
                          type="radio"
                          name="priority"
                          value="High"
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
                          type="radio"
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
                          type="radio"
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
                          type="radio"
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
                    <MemberSelect
                      setTaskAssignee={setTaskAssignee}
                      value={taskAssignee}
                    />
                  </div>
                </div>

                {/* <div className="flex flex-row items-center gap-2">
                  <span className="text-[14px]">High priority:</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="radio"
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
                  onClick={() => setIsEditOpen(false)}
                  className="bg-gray-200 text-[13px] text-black hover:bg-gray-300"
                />
                {/* <Button
                  text="Create"
                  onClick={handleCreateTask}
                  className="bg-[#222] px-7 text-white hover:bg-[#111]"
                /> */}

                <button
                  className="w-[100px] rounded bg-[#222] py-2 text-[13px] font-normal text-white transition-all duration-300 hover:bg-[#111]"
                  onClick={handleUpdateTask}
                >
                  {!updateTaskLoading ? (
                    "Update"
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
