"use client";

import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCalendar,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { getStatusStyles, getPriorityStyles } from "@/utils/taskStyles";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUpdateTask, useGetTasks } from "@/hooks/api/tasks";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";

export default function TaskFields({ taskData }: { taskData: any }) {
  const { onUpdateTask } = useUpdateTask();
  const { onGetTasks } = useGetTasks();
  const { user } = useSelector((state: RootState) => state.auth) as {
    user: any;
  };
  const MemberData = useSelector((state: RootState) => state.MemberData);
  const members = MemberData?.members || [];

  const statusDisplay = getStatusStyles(taskData.status);
  const priorityDisplay = getPriorityStyles(taskData.priority);

  const handleUpdateField = (updatedFields: Partial<any>) => {
    onUpdateTask({
      id: taskData.id,
      payload: {
        title: taskData.title || "",
        description: taskData.description || "",
        workspace_id: taskData.workspaceId || "",
        assignee: taskData.assignee?._id || taskData.assignee || "",
        deadline: taskData.deadline || "",
        status: taskData.status,
        priority: taskData.priority,
        createdBy: taskData.createdBy || user?._id || "",
        ...updatedFields,
      },
      successCallback: () => {
        onGetTasks({ workspaceId: taskData.workspaceId || "" });
        showSuccessToast({ message: "Task updated successfully!" });
      },
      errorCallback: ({ message }) => {
        showErrorToast({ message });
      },
    });
  };

  return (
    <div className="poppins w-full">
      <div className="flex flex-row flex-wrap items-center gap-2.5 pt-1">
        {/* Status Pill */}
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-900 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800">
            <FontAwesomeIcon
              icon={faSpinner}
              className="h-3 w-3 text-zinc-900 dark:text-white/60"
            />
            <span className="font-normal text-zinc-900 dark:text-white/60">
              Status:
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-700 dark:text-zinc-300">
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
                      onClick={() => handleUpdateField({ status: s })}
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
          <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-900 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="h-3 w-3 text-zinc-900 dark:text-white/60"
            />
            <span className="font-normal text-zinc-900 dark:text-white/60">
              Priority:
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-700 dark:text-zinc-300">
              <span
                className={`h-1.5 w-1.5 rounded-full ${priorityDisplay.dot}`}
              />
              {taskData.priority.charAt(0).toUpperCase() +
                taskData.priority.slice(1).toLowerCase()}
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
                      onClick={() => handleUpdateField({ priority: p })}
                      className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 transition-colors dark:text-zinc-300 ${
                        active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                      />
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
          <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-900 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800">
            <FontAwesomeIcon
              icon={faUser}
              className="h-3 w-3 text-zinc-900 dark:text-white/60"
            />
            <span className="font-normal text-zinc-900 dark:text-white/60">
              Assignee:
            </span>
            <div className="flex items-center gap-1">
              {taskData.assignee?.image &&
              taskData.assignee?.image !== "none" ? (
                <img
                  src={taskData.assignee?.image}
                  alt=""
                  className="h-4 w-4 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-500">
                  <span className="text-[7px] text-white">
                    {taskData.assignee?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
              <span className="ml-1">
                {taskData.assignee?.name || "Unassigned"}
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
                  onClick={() => handleUpdateField({ assignee: "" })}
                  className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-500 transition-colors ${
                    active ? "bg-zinc-100 dark:bg-zinc-800" : ""
                  }`}
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-700">
                    <span className="text-[7px] text-zinc-600 dark:text-zinc-300">
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
                      onClick={() => handleUpdateField({ assignee: memberId })}
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
          <PopoverButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-900 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800">
            <FontAwesomeIcon
              icon={faCalendar}
              className="h-3 w-3 text-zinc-900 dark:text-white/60"
            />
            <span className="font-normal text-zinc-900 dark:text-white/60">
              Due Date:
            </span>
            <span>
              {taskData.deadline
                ? DateTime.fromISO(taskData.deadline).toFormat("dd LLL, yyyy")
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
                  defaultValue={
                    taskData.deadline
                      ? DateTime.fromISO(taskData.deadline).toFormat(
                          "yyyy-MM-dd",
                        )
                      : ""
                  }
                  onChange={(e) => {
                    if (e.target.value) {
                      handleUpdateField({
                        deadline: new Date(e.target.value).toISOString(),
                      });
                      close();
                    }
                  }}
                  className="rounded border border-zinc-300 bg-transparent p-1.5 text-xs text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:text-white"
                />
                <button
                  onClick={() => {
                    handleUpdateField({ deadline: "" });
                    close();
                  }}
                  className="text-left text-[10px] text-red-600 hover:underline"
                >
                  Clear Deadline
                </button>
              </div>
            )}
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
}
