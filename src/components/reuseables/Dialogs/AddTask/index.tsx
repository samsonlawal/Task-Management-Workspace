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
        className="flex h-[34px] w-fit items-center justify-center gap-2 rounded-lg bg-[#563892] hover:bg-[#482e7b] active:scale-95 px-3 text-[12px] font-semibold text-white transition-all shadow-sm"
      >
        <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
        <span>New Task</span>
      </button>

      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        transition
        className="poppins fixed inset-0 flex w-screen select-none items-center justify-center bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0 z-50 p-4"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            className="w-full max-w-[500px] flex flex-col rounded-xl bg-white dark:bg-[#1a1a1a] px-6 py-5 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              {/* Header: Breadcrumbs & Close Action */}
              <div className="flex w-full flex-row items-center justify-between">
                {/* Breadcrumbs path */}
                <div className="flex flex-row items-center gap-1.5 text-[11px] text-zinc-500 select-none">
                  <button
                    onClick={handleDialogClose}
                    className="flex flex-row items-center gap-1 text-zinc-500 dark:text-white hover:text-black dark:hover:text-zinc-200 font-medium transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="text-[8px] mr-0.5" />
                    <span>{workspaceData?.name || "Workspace"}</span>
                  </button>
                  <span className="text-zinc-400 dark:text-white">{" > "}</span>
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    STK-NEW
                  </span>
                </div>
                <button
                  onClick={handleDialogClose}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 text-[#989898] hover:text-black dark:hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-[16px]" />
                </button>
              </div>

              {/* Title & Description Inputs */}
              <div className="flex w-full flex-col items-start gap-1 pb-3 border-b border-[#565656]/10 dark:border-zinc-800">
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
                  className="poppins-medium text-[16px] text-zinc-900 dark:text-white bg-transparent border-none outline-none w-full p-0 m-0 focus:ring-0 focus:outline-none"
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
                  className="w-full poppins-regular text-zinc-650 dark:text-zinc-400 text-[13px] bg-transparent border-none outline-none w-full p-0 m-0 mt-1 focus:ring-0 focus:outline-none resize-none min-h-[90px]"
                />
              </div>

              {/* Wrapped horizontal pills list for properties */}
              <div className="poppins w-full pt-1">
                <div className="flex flex-row flex-wrap gap-2.5 items-center">
                  {/* Status Pill */}
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                      <FontAwesomeIcon icon={faSpinner} className="h-3 w-3 text-gray-500 animate-pulse" />
                      <span>Status:</span>
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] ${statusDisplay.bg} ${statusDisplay.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${statusDisplay.dot}`} />
                        {statusDisplay.label}
                      </span>
                      <FontAwesomeIcon icon={faChevronDown} className="h-2 w-2 opacity-50" />
                    </MenuButton>
                    <MenuItems className="absolute left-0 mt-1 w-40 origin-top-left rounded-md bg-white p-1 shadow-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 outline-none z-50">
                      {["todo", "in-progress", "in-review", "done"].map((s) => {
                        const styles = getStatusStyles(s);
                        return (
                          <MenuItem key={s}>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={() => setTask((prev) => ({ ...prev, status: s }))}
                                className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 transition-colors ${
                                  active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                                }`}
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
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
                    <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-3 w-3 text-gray-500" />
                      <span>Priority:</span>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] ${priorityDisplay.bg} ${priorityDisplay.text}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()}
                      </span>
                      <FontAwesomeIcon icon={faChevronDown} className="h-2 w-2 opacity-50" />
                    </MenuButton>
                    <MenuItems className="absolute left-0 mt-1 w-32 origin-top-left rounded-md bg-white p-1 shadow-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 outline-none z-50">
                      {["low", "medium", "high"].map((p) => {
                        const styles = getPriorityStyles(p);
                        return (
                          <MenuItem key={p}>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={() => setTask((prev) => ({ ...prev, priority: p.charAt(0).toUpperCase() + p.slice(1) }))}
                                className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 transition-colors ${
                                  active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                                }`}
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                                {p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()}
                              </button>
                            )}
                          </MenuItem>
                        );
                      })}
                    </MenuItems>
                  </Menu>

                  {/* Assignee Pill */}
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                      <FontAwesomeIcon icon={faUser} className="h-3 w-3 text-gray-500" />
                      <span>Assignee:</span>
                      <div className="flex items-center gap-1">
                        {selectedMemberUser?.profileImage && selectedMemberUser?.profileImage !== "none" ? (
                          <img
                            src={selectedMemberUser?.profileImage}
                            alt=""
                            className="h-4 w-4 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-500">
                            <span className="text-[7px] text-white">
                              {selectedMemberUser?.fullname?.charAt(0).toUpperCase() || selectedMemberUser?.name?.charAt(0).toUpperCase() || "U"}
                            </span>
                          </div>
                        )}
                        <span className="ml-1">{selectedMemberUser?.fullname || selectedMemberUser?.name || "Unassigned"}</span>
                      </div>
                      <FontAwesomeIcon icon={faChevronDown} className="h-2 w-2 opacity-50" />
                    </MenuButton>
                    <MenuItems className="absolute left-0 mt-1 w-56 max-h-60 overflow-y-auto origin-top-left rounded-md bg-white p-1 shadow-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 outline-none z-50">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => setTask((prev) => ({ ...prev, assignee: "" }))}
                            className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-500 transition-colors ${
                              active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                            }`}
                          >
                            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-700">
                              <span className="text-[7px] text-zinc-650 dark:text-zinc-300">X</span>
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
                                onClick={() => setTask((prev) => ({ ...prev, assignee: memberId }))}
                                className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 transition-colors ${
                                  active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                                }`}
                              >
                                <img
                                  src={m.profileImage}
                                  alt=""
                                  className="h-4 w-4 rounded-full object-cover"
                                />
                                <span className="ml-2 truncate">{m.fullname || m.name || m.email}</span>
                              </button>
                            )}
                          </MenuItem>
                        );
                      })}
                    </MenuItems>
                  </Menu>

                  {/* Due Date Pill */}
                  <Popover className="relative">
                    <PopoverButton className="flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                      <FontAwesomeIcon icon={faCalendar} className="h-3 w-3 text-gray-500" />
                      <span>Due Date:</span>
                      <span>
                        {task.deadline
                          ? DateTime.fromISO(task.deadline).toFormat("dd LLL, yyyy")
                          : "No Deadline"}
                      </span>
                      <FontAwesomeIcon icon={faChevronDown} className="h-2 w-2 opacity-50" />
                    </PopoverButton>
                    <PopoverPanel className="absolute left-0 mt-1 p-3 rounded-md bg-white border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 shadow-lg z-50">
                      {({ close }) => (
                        <div className="flex flex-col gap-2">
                          <input
                            type="date"
                            value={task.deadline ? DateTime.fromISO(task.deadline).toFormat("yyyy-MM-dd") : ""}
                            onChange={(e) => {
                              setTask((prev) => ({
                                ...prev,
                                deadline: e.target.value,
                              }));
                              close();
                            }}
                            className="h-[36px] rounded-md border border-gray-300 dark:border-zinc-800 bg-transparent px-3 text-xs text-zinc-700 dark:text-white outline-none focus:border-zinc-500"
                          />
                        </div>
                      )}
                    </PopoverPanel>
                  </Popover>

                  {/* Attachments Pill */}
                  <button
                    type="button"
                    onClick={() => showSuccessToast({ message: "Attach files feature triggered!" })}
                    className="flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <FontAwesomeIcon icon={faPaperclip} className="h-3 w-3 text-gray-550" />
                    <span>Attachments</span>
                  </button>
                </div>
              </div>

              {/* Bottom Actions Row (border-t removed) */}
              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={handleDialogClose}
                  className="rounded-md bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-2 text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  disabled={createTaskLoading}
                  className="rounded-md bg-[#563892] text-white px-5 py-2 text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                >
                  <span>Create Task</span>
                  {createTaskLoading && (
                    <FontAwesomeIcon icon={faSpinner} className="w-3 h-3 animate-spin" />
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
