"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  faPlus,
  faXmark,
  faChevronDown,
  faSpinner,
  faCalendar,
  faUser,
  faChevronLeft,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader2 } from "lucide-react";
import { useCreateTask } from "@/hooks/api/tasks";
import { TAddTask } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import { getStatusStyles, getPriorityStyles } from "@/utils/taskStyles";
import { DateTime } from "luxon";

export default function AddTask({ onGetTasks }: any) {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [workspaceId, setWorkspaceId] = useState<string>("");

  const [task, setTask] = useState<TAddTask>({
    description: "",
    workspace_id: "",
    assignee: "",
    deadline: "",
    status: "to-do",
    priority: "Low",
    createdBy: "",
    title: "",
  });

  const MemberData = useSelector((state: RootState) => state.MemberData);
  const members = MemberData?.members || [];
  const workspaceData = useSelector(
    (state: RootState) => state.WorkspaceData?.workspace,
  );

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

  const { onCreateTask, loading: createTaskLoading } = useCreateTask();

  const handleDialogClose = () => {
    setIsOpen(false);
  };

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
          if (onGetTasks) {
            await onGetTasks({ workspaceId: workspace_id });
          }
          setTask({
            description: "",
            workspace_id: workspace_id,
            assignee: "",
            deadline: "",
            status: "to-do",
            priority: "Low",
            createdBy: createdBy,
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
        }
      },
    });
  }

  // Find active selected assignee object to render details
  const selectedMember = members.find((m: any) => {
    const mId = m.userId?._id || m._id;
    return mId === task.assignee;
  });
  const selectedMemberUser = selectedMember?.userId || selectedMember;

  const statusDisplay = getStatusStyles(task.status);
  const priorityDisplay = getPriorityStyles(task.priority);

  return (
    <>
      <button
        onClick={checkWsId}
        className="flex h-[34px] w-fit items-center justify-center gap-2 rounded-lg bg-[#609328] px-3 text-[12px] font-semibold text-white shadow-sm transition-all hover:bg-[#609328]/90 active:scale-95"
      >
        <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
        <span>New Task</span>
      </button>

      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        transition
        className="poppins fixed inset-0 z-50 flex w-screen select-none items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            className="flex w-full max-w-[500px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-2xl dark:border-zinc-800 dark:bg-[#1a1a1a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              {/* Header: Breadcrumbs & Close Action */}
              <div className="flex w-full flex-row items-center justify-between">
                {/* Breadcrumbs path */}
                <div className="flex select-none flex-row items-center gap-1.5 text-[11px] text-zinc-500">
                  <button
                    onClick={handleDialogClose}
                    className="flex flex-row items-center gap-1 font-normal text-zinc-500 transition-colors hover:text-black dark:text-white dark:hover:text-zinc-200"
                  >
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="mr-0.5 text-[8px]"
                    />
                    <span>{workspaceData?.name || "Workspace"}</span>
                  </button>
                  <span className="text-zinc-400 dark:text-white">{" > "}</span>
                  <span className="font-normal text-zinc-700 dark:text-zinc-300">
                    New Task
                  </span>
                </div>
                <button
                  onClick={handleDialogClose}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[#989898] transition-colors hover:bg-gray-200 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-[16px]" />
                </button>
              </div>

              {/* Title & Description Inputs */}
              <div className="flex w-full flex-col items-start gap-1 pb-3">
                <input
                  type="text"
                  placeholder="Task title"
                  value={task.title}
                  onChange={(e) =>
                    setTask((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="poppins-medium m-0 w-full border-none bg-transparent p-0 text-[16px] font-normal text-zinc-900 outline-none focus:outline-none focus:ring-0 dark:text-white"
                />
                <textarea
                  placeholder="Add a description..."
                  value={task.description}
                  onChange={(e) =>
                    setTask((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  className="poppins-regular text-zinc-650 m-0 mt-1 min-h-[90px] w-full resize-none border-none bg-transparent p-0 text-[13px] outline-none focus:outline-none focus:ring-0 dark:text-zinc-400"
                />
              </div>

              {/* Wrapped horizontal pills list for properties */}
              <div className="poppins w-full pt-1">
                <div className="flex flex-row flex-wrap items-center gap-2.5">
                  {/* Status Pill */}
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="h-3 w-3 animate-pulse text-gray-500"
                      />
                      <span>Status:</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] ${statusDisplay.bg} ${statusDisplay.text}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusDisplay.dot}`}
                        />
                        {statusDisplay.label}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="h-2 w-2 opacity-50"
                      />
                    </MenuButton>
                    <MenuItems className="absolute left-0 z-50 mt-1 w-40 origin-top-left rounded-md border border-zinc-200 bg-white p-1 shadow-lg outline-none dark:border-zinc-800 dark:bg-zinc-900">
                      {["todo", "in-progress", "in-review", "done"].map((s) => {
                        const styles = getStatusStyles(s);
                        return (
                          <MenuItem key={s}>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={() =>
                                  setTask((prev) => ({ ...prev, status: s }))
                                }
                                className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 transition-colors dark:text-zinc-300 ${
                                  active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                                />
                                {styles.label}
                              </button>
                            )}
                          </MenuItem>
                        );
                      })}
                    </MenuItems>
                  </Menu>

                  {/* Priority Pill */}
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="h-3 w-3 text-gray-500"
                      />
                      <span>Priority:</span>
                      <span
                        className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] ${priorityDisplay.bg} ${priorityDisplay.text}`}
                      >
                        {task.priority.charAt(0).toUpperCase() +
                          task.priority.slice(1).toLowerCase()}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="h-2 w-2 opacity-50"
                      />
                    </MenuButton>
                    <MenuItems className="absolute left-0 z-50 mt-1 w-32 origin-top-left rounded-md border border-zinc-200 bg-white p-1 shadow-lg outline-none dark:border-zinc-800 dark:bg-zinc-900">
                      {["low", "medium", "high"].map((p) => {
                        const styles = getPriorityStyles(p);
                        return (
                          <MenuItem key={p}>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={() =>
                                  setTask((prev) => ({
                                    ...prev,
                                    priority:
                                      p.charAt(0).toUpperCase() + p.slice(1),
                                  }))
                                }
                                className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 transition-colors dark:text-zinc-300 ${
                                  active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                                />
                                {p.charAt(0).toUpperCase() +
                                  p.slice(1).toLowerCase()}
                              </button>
                            )}
                          </MenuItem>
                        );
                      })}
                    </MenuItems>
                  </Menu>

                  {/* Assignee Pill */}
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="h-3 w-3 text-gray-500"
                      />
                      <span>Assignee:</span>
                      <div className="flex items-center gap-1">
                        {selectedMemberUser?.profileImage &&
                        selectedMemberUser?.profileImage !== "none" ? (
                          <img
                            src={selectedMemberUser?.profileImage}
                            alt=""
                            className="h-4 w-4 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-500">
                            <span className="text-[7px] text-white">
                              {selectedMemberUser?.fullname
                                ?.charAt(0)
                                .toUpperCase() ||
                                selectedMemberUser?.name
                                  ?.charAt(0)
                                  .toUpperCase() ||
                                "U"}
                            </span>
                          </div>
                        )}
                        <span className="ml-1">
                          {selectedMemberUser?.fullname ||
                            selectedMemberUser?.name ||
                            "Unassigned"}
                        </span>
                      </div>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="h-2 w-2 opacity-50"
                      />
                    </MenuButton>
                    <MenuItems className="absolute left-0 z-50 mt-1 max-h-60 w-56 origin-top-left overflow-y-auto rounded-md border border-zinc-200 bg-white p-1 shadow-lg outline-none dark:border-zinc-800 dark:bg-zinc-900">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() =>
                              setTask((prev) => ({ ...prev, assignee: "" }))
                            }
                            className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-500 transition-colors ${
                              active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                            }`}
                          >
                            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-700">
                              <span className="text-zinc-650 text-[7px] dark:text-zinc-300">
                                X
                              </span>
                            </div>
                            <span className="ml-2">Unassigned</span>
                          </button>
                        )}
                      </MenuItem>
                      {members.map((member: any) => {
                        const m = member.userId || member;
                        const memberId = m._id || member._id;
                        return (
                          <MenuItem key={memberId}>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={() =>
                                  setTask((prev) => ({
                                    ...prev,
                                    assignee: memberId,
                                  }))
                                }
                                className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 transition-colors dark:text-zinc-300 ${
                                  active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                                }`}
                              >
                                <img
                                  src={m.profileImage}
                                  alt=""
                                  className="h-4 w-4 rounded-full object-cover"
                                />
                                <span className="ml-2 truncate">
                                  {m.fullname || m.name || m.email}
                                </span>
                              </button>
                            )}
                          </MenuItem>
                        );
                      })}
                    </MenuItems>
                  </Menu>

                  {/* Due Date Pill */}
                  <Popover className="relative">
                    <PopoverButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="h-3 w-3 text-gray-500"
                      />
                      <span>Due Date:</span>
                      <span>
                        {task.deadline
                          ? DateTime.fromISO(task.deadline).toFormat(
                              "dd LLL, yyyy",
                            )
                          : "No Deadline"}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="h-2 w-2 opacity-50"
                      />
                    </PopoverButton>
                    <PopoverPanel className="absolute left-0 z-50 mt-1 rounded-md border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                      {({ close }) => (
                        <div className="flex flex-col gap-2">
                          <input
                            type="date"
                            value={
                              task.deadline
                                ? DateTime.fromISO(task.deadline).toFormat(
                                    "yyyy-MM-dd",
                                  )
                                : ""
                            }
                            onChange={(e) => {
                              setTask((prev) => ({
                                ...prev,
                                deadline: e.target.value,
                              }));
                              close();
                            }}
                            className="h-[36px] rounded-md border border-gray-300 bg-transparent px-3 text-xs text-zinc-700 outline-none focus:border-zinc-500 dark:border-zinc-800 dark:text-white"
                          />
                        </div>
                      )}
                    </PopoverPanel>
                  </Popover>

                  {/* Attachments Pill */}
                  <button
                    type="button"
                    onClick={() =>
                      showSuccessToast({
                        message: "Attach files feature triggered!",
                      })
                    }
                    className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    <FontAwesomeIcon
                      icon={faPaperclip}
                      className="text-gray-550 h-3 w-3"
                    />
                    <span>Attachments</span>
                  </button>
                </div>
              </div>

              {/* Bottom Actions Row (border-t removed) */}
              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleDialogClose}
                  className="rounded-md bg-zinc-200 px-4 py-2 text-xs text-zinc-700 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  disabled={createTaskLoading}
                  className="flex items-center gap-1.5 rounded-md bg-[#609328] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {createTaskLoading ? (
                    <>
                      <span>Creating</span>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    </>
                  ) : (
                    <span>Create Task</span>
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
