"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MemberSelect from "../../MemberSelect";
import { useGetSingleTask, useUpdateTask } from "@/hooks/api/tasks";
import { TAddTask } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import { useGetTasks } from "@/hooks/api/tasks";
import { Loader2 } from "lucide-react";
import { getStatusStyles, getPriorityStyles } from "@/utils/taskStyles";

import {
  useUpdateTaskMutation,
  useGetSingleTaskQuery,
} from "@/redux/api/taskApiSlice";

export default function EditTask({ taskData }: any) {
  const dispatch = useDispatch();

  let [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const currentTask = useSelector(
    (state: RootState) => state.TasksData.currentTask,
  );
  const { currentWorkspace, currentWorkspaceId } = useSelector(
    (state: any) => state.currentWorkspace,
  );
  const currentUser = useSelector((state: any) => state.AuthData?.user);
  const taskId = currentTask?.id || taskData?._id || "";

  const { data: fetchedTaskData, isLoading: isFetchingTask } =
    useGetSingleTaskQuery({ taskId }, { skip: !isEditOpen || !taskId });

  const [updateTask, { isLoading: updateTaskLoading }] =
    useUpdateTaskMutation();

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

  const handleDialogClose = () => {
    setIsEditOpen(false);
  };

  const handleOpenDialog = () => {
    setIsEditOpen(true);
  };

  useEffect(() => {
    if (taskAssignee) {
      setTask((prevTask) => ({
        ...prevTask,
        assignee: taskAssignee,
      }));
    }
  }, [taskAssignee]);

  const handleUpdateTask = async () => {
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
    }

    if (errorMsg) {
      showErrorToast({ message: errorMsg });
    }

    try {
      await updateTask({
        taskId,
        task: {
          title,
          description,
          workspace_id,
          assignee,
          deadline,
          status,
          priority,
          createdBy,
        },
      }).unwrap();

      showSuccessToast({ message: "Task Updated Successfully!" });
      handleDialogClose();
    } catch (err: any) {
      showErrorToast({
        message: err?.data?.message || "Failed to update task",
      });
    }
  };

  useEffect(() => {
    const fetchedTask = fetchedTaskData?.task || fetchedTaskData;
    if (fetchedTask && isEditOpen) {
      const normalize = (val: string, allowed: string[]) => {
        const found = allowed.find(
          (a) => a.toLowerCase() === (val || "").toLowerCase(),
        );
        return found || allowed[0];
      };

      setTask({
        title: fetchedTask.title || "",
        description: fetchedTask.description || "",
        workspace_id: fetchedTask.workspace_id || currentWorkspaceId,
        assignee: fetchedTask.assignee?.email || "",
        deadline: fetchedTask.deadline ? fetchedTask.deadline.slice(0, 10) : "",
        status: normalize(fetchedTask.status || "", ["to-do", "in-progress"]),
        priority: normalize(fetchedTask.priority, ["Low", "Medium", "High"]),
        createdBy: fetchedTask?.createdBy || "",
      });
      setTaskAssignee((fetchedTask.assignee as any)?._id || "");
    }
  }, [fetchedTaskData, isEditOpen, currentWorkspace, currentUser]);

  return (
    <>
      <button
        onClick={handleOpenDialog}
        className="poppins flex h-6 w-full items-center justify-start rounded-sm px-2 text-[12px] font-normal text-[#989898] hover:bg-slate-200 hover:text-black dark:hover:bg-zinc-800"
      >
        Edit
      </button>

      <Dialog
        open={isEditOpen}
        onClose={handleDialogClose}
        transition
        className="poppins fixed inset-0 z-[70] flex w-screen select-none items-center justify-end bg-black/30 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="fixed inset-0 flex w-screen items-center justify-end">
          <DialogPanel
            className="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-sm bg-gray-100 px-8 py-6 dark:bg-[#111] lg:w-[calc(100vw-256px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <DialogTitle className="flex flex-row items-start justify-between pb-3 font-medium">
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
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[#989898] transition-colors hover:bg-gray-200 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-[16px]" />
                </button>
              </DialogTitle>

              {/* Form Inputs container */}
              <div className="flex max-w-4xl flex-col gap-6 pt-2">
                {/* 1. Title Input */}
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
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
                    className="text-normal h-[42px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-xs placeholder-gray-400 outline-none focus:border-zinc-500 dark:border-zinc-800 dark:text-white"
                  />
                </div>

                {/* 2. Description Input */}
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
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
                    className="text-normaldark:text-white h-[120px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-xs placeholder-gray-400 outline-none focus:border-zinc-500 dark:border-zinc-800"
                  />
                </div>

                {/* 3. Parameter Split Columns */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Priority Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
                      Priority:
                    </label>
                    <div className="flex gap-2">
                      {["Low", "Medium", "High"].map((p) => {
                        const styles = getPriorityStyles(p);
                        const isSelected =
                          task.priority?.toLowerCase() === p.toLowerCase();
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() =>
                              setTask((prev) => ({ ...prev, priority: p }))
                            }
                            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs transition-all ${
                              isSelected
                                ? "border-zinc-400 bg-zinc-50 font-medium text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800/50 dark:text-white"
                                : "border-gray-300 text-zinc-600 hover:bg-gray-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/30"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                            />
                            {p}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
                      Status:
                    </label>
                    <div className="flex gap-2">
                      {[
                        { key: "to-do", label: "To-Do" },
                        { key: "in-progress", label: "In-Progress" },
                      ].map((s) => {
                        const styles = getStatusStyles(s.key);
                        const isSelected = task.status === s.key;
                        return (
                          <button
                            key={s.key}
                            type="button"
                            onClick={() =>
                              setTask((prev) => ({ ...prev, status: s.key }))
                            }
                            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs transition-all ${
                              isSelected
                                ? "border-zinc-400 bg-zinc-50 font-medium text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800/50 dark:text-white"
                                : "border-gray-300 text-zinc-600 hover:bg-gray-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/30"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                            />
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 4. Assignee & Deadline Split Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Assignee */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
                      Assignee
                    </label>
                    <div className="">
                      <MemberSelect setTaskAssignee={setTaskAssignee} />
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
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
                      className="h-[40px] w-full rounded-md border border-gray-300 bg-transparent px-3 text-xs text-zinc-700 outline-none focus:border-zinc-500 dark:border-zinc-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="mt-8 flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleDialogClose}
                className="rounded-md bg-zinc-200 px-4 py-2 text-xs text-zinc-700 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTask}
                disabled={updateTaskLoading}
                className="flex items-center gap-1.5 rounded-md bg-[#609328] px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {updateTaskLoading ? (
                  <>
                    <span>Saving</span>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
