"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import {
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MemberSelect from "../../MemberSelect";
import {
  useGetSingleTask,
  useUpdateTask,
} from "@/hooks/api/tasks";
import { TAddTask } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import { useGetTasks } from "@/hooks/api/tasks";

export default function EditTask({ taskData }: any) {
  const dispatch = useDispatch();

  let [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [workspaceId, setWorkspaceId] = useState<string>("");

  const currentTask = useSelector(
    (state: RootState) => state.TasksData.currentTask,
  );

  const [task, setTask] = useState<TAddTask>({
    title: "",
    description: "",
    workspace_id: "",
    assignee: "",
    deadline: "",
    status: "to-do",
    priority: "Low",
    createdBy: "",
  });

  const [taskAssignee, setTaskAssignee] = useState<any>();
  const { currentWorkspace } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const {
    onUpdateTask,
    loading: updateTaskLoading,
  } = useUpdateTask();

  const {
    OnGetSingleTask,
    loading: getSingleTaskLoading,
  } = useGetSingleTask();

  const {
    onGetTasks,
  } = useGetTasks();

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
  }, [isEditOpen]);

  const handleDialogClose = () => {
    setIsEditOpen(false);
  };

  useEffect(() => {
    if (taskAssignee) {
      setTask((prevTask) => ({
        ...prevTask,
        assignee: taskAssignee,
      }));
    }
  }, [taskAssignee]);

  const handleUpdateTask = () => {
    const {
      title,
      description,
      workspace_id,
      assignee,
      deadline,
      status,
      priority,
      createdBy,
    } = task;
    let errorMsg = "";

    if (!title) {
      errorMsg = "Task title is required.";
    } else if (!description) {
      errorMsg = "Task description is required.";
    } else if (!assignee) {
      errorMsg = "Task assignee is required.";
    }

    if (errorMsg) {
      showErrorToast({ message: errorMsg });
    } else {
      onUpdateTask({
        id: currentTask?.id || "",
        payload: {
          title,
          description,
          workspace_id,
          assignee,
          deadline,
          status,
          priority,
          createdBy,
        },
        successCallback: async () => {
          showSuccessToast({ message: "Task Updated Successfully!" });
          if (onGetTasks) {
            await onGetTasks({ workspaceId: workspace_id });
          }
          handleDialogClose();
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    }
  };

  function checkWsId() {
    OnGetSingleTask({
      id: currentTask?.id || "",
      successCallback: (fetchedTask) => {
        if (fetchedTask) {
          const normalize = (val: string, allowed: string[]) => {
            const found = allowed.find(
              (a) => a.toLowerCase() === (val || "").toLowerCase(),
            );
            return found || allowed[0];
          };

          setTask({
            title: fetchedTask.title || "",
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
            createdBy: fetchedTask?.createdBy || "",
          });
          setTaskAssignee((fetchedTask.assignee as any)?._id || "");
        }
        setIsEditOpen(true);
      },
      errorCallback: () => {
        setIsEditOpen(false);
      },
    });
  }

  return (
    <>
        <button
          onClick={checkWsId}
          className="poppins flex h-6 w-full items-center justify-start rounded-sm px-2 text-[12px] font-normal text-[#989898] hover:bg-slate-200 hover:text-black dark:hover:bg-zinc-800"
        >
          Edit
        </button>
      
      <Dialog
        open={isEditOpen}
        onClose={handleDialogClose}
        transition
        className="poppins fixed inset-0 flex w-screen select-none items-center justify-end bg-black/30 font-madei transition duration-300 ease-out data-[closed]:opacity-0 z-[70]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="fixed inset-0 flex w-screen items-center justify-end">
          <DialogPanel
            className="h-full w-full lg:w-[calc(100vw-256px)] flex flex-col gap-4 rounded-sm bg-gray-100 px-8 py-6 dark:bg-[#111] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <DialogTitle className="flex flex-row items-start justify-between font-medium pb-3">
                <div className="flex flex-col items-start gap-1">
                  <p className="poppins-medium text-[18px] dark:text-white">
                    Edit Task
                  </p>
                  <p className="text-[13px] font-normal leading-4 text-zinc-500">
                    Modify the parameters of your workspace task.
                  </p>
                </div>
                <button
                  onClick={handleDialogClose}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 text-[#989898] hover:text-black dark:hover:text-white transition-colors"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="text-[16px]"
                  />
                </button>
              </DialogTitle>

              {/* Form Inputs container */}
              <div className="flex flex-col gap-6 max-w-4xl pt-2">
                {/* 1. Title Input */}
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
                    Title
                  </label>
                  <input
                    name="title"
                    placeholder="Enter task title"
                    value={task.title}
                    onChange={(e) =>
                      setTask((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="h-[42px] w-full rounded-md border border-gray-300 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs text-normal dark:text-white placeholder-gray-400 outline-none focus:border-zinc-500"
                  />
                </div>

                {/* 2. Description Input */}
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter task description"
                    value={task.description}
                    onChange={(e) =>
                      setTask((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="h-[120px] w-full rounded-md border border-gray-300 dark:border-zinc-800 bg-transparent px-3 py-2 text-xs text-normaldark:text-white placeholder-gray-400 outline-none focus:border-zinc-500"
                  />
                </div>

                {/* 3. Parameter Split Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Priority Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
                      Priority:
                    </label>
                    <div className="flex gap-2">
                      {["Low", "Medium", "High"].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setTask((prev) => ({ ...prev, priority: p }))}
                          className={`flex-1 py-2 px-3 text-xs border rounded-md transition-all ${
                            task.priority === p
                              ? "bg-[#563892] text-white border-transparent font-medium"
                              : "border-gray-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:bg-[#563892]/70 dark:hover:text-white"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
                      Status:
                    </label>
                    <div className="flex gap-2">
                      {[
                        { key: "to-do", label: "To-Do" },
                        { key: "in-progress", label: "In-Progress" },
                      ].map((s) => (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => setTask((prev) => ({ ...prev, status: s.key }))}
                          className={`flex-1 py-2 px-3 text-xs border rounded-md transition-all ${
                            task.status === s.key
                              ? "bg-[#563892] text-white border-transparent font-medium"
                              : "border-gray-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:bg-[#563892]/70 dark:hover:text-white"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Assignee & Deadline Split Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Assignee */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
                      Assignee
                    </label>
                    <div className="">
                      <MemberSelect setTaskAssignee={setTaskAssignee} />
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
                      Deadline
                    </label>
                    <input
                      name="deadline"
                      type="date"
                      value={task.deadline}
                      onChange={(e) =>
                        setTask((prev) => ({
                          ...prev,
                          deadline: e.target.value,
                        }))
                      }
                      className="h-[40px] w-full rounded-md border border-gray-300 dark:border-zinc-800 bg-transparent px-3 text-xs text-zinc-700 dark:text-white outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex justify-end gap-3 pt-4 mt-8">
              <button
                type="button"
                onClick={handleDialogClose}
                className="rounded-md bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-2 text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTask}
                disabled={updateTaskLoading}
                className="rounded-md bg-[#563892] text-white px-5 py-2 text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {updateTaskLoading ? (
                  <span className="flex w-full items-center justify-center">
                    <img
                      src="/icons/loaderWhite.svg"
                      alt=""
                      className="w-4 animate-spin"
                    />
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
