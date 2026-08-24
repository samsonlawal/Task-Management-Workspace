"use client";

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
import { DateTime } from "luxon";

export function StatusPill({ status, onChange }: { status: string; onChange: (status: string) => void }) {
  const statusDisplay = getStatusStyles(status || "todo");
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-900 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-[#111]/60 dark:text-white dark:hover:bg-[#111]/80">
        {/* <FontAwesomeIcon
          icon={faSpinner}
          className="h-3 w-3 text-zinc-900 dark:text-white/60"
        />
        <span className="font-normal text-zinc-900 dark:text-white/60">
          Status:
        </span> */}
        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-700 dark:text-white/60">
          <span className={`h-1.5 w-1.5 rounded-full ${statusDisplay.dot}`} />
          {statusDisplay.label}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="h-2 w-2 opacity-50" />
      </MenuButton>
      <MenuItems className="absolute left-0 z-50 mt-1 w-40 origin-top-left rounded-md border border-zinc-200 bg-white p-1 shadow-xl outline-none dark:border-zinc-800 dark:bg-[#111]">
        {["todo", "in-progress", "in-review", "done"].map((s) => {
          const styles = getStatusStyles(s);
          return (
            <MenuItem key={s}>
              {({ focus }: { focus: boolean }) => (
                <button
                  onClick={(e) => {
                    onChange(s);
                  }}
                  className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 transition-colors dark:text-zinc-300 ${
                    focus ? "bg-zinc-100 dark:bg-[#565656]/10" : ""
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
  );
}

export function PriorityPill({ priority, onChange }: { priority: string; onChange: (priority: string) => void }) {
  const priorityDisplay = getPriorityStyles(priority || "low");
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-900 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-[#111]/60 dark:text-white dark:hover:bg-[#111]/80">
        {/* <FontAwesomeIcon
          icon={faCircleCheck}
          className="h-3 w-3 text-zinc-900 dark:text-white/60"
        />
        <span className="font-normal text-zinc-900 dark:text-white/60">
          Priority:
        </span> */}
        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-700 dark:text-white/60">
          <span className={`h-1.5 w-1.5 rounded-full ${priorityDisplay.dot}`} />
          {priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="h-2 w-2 opacity-50" />
      </MenuButton>
      <MenuItems className="absolute left-0 z-50 mt-1 w-32 origin-top-left rounded-md border border-zinc-200 bg-white p-1 shadow-lg outline-none dark:border-zinc-800 dark:bg-[#111]">
        {["low", "medium", "high"].map((p) => {
          const styles = getPriorityStyles(p);
          return (
            <MenuItem key={p}>
              {({ focus }: { focus: boolean }) => (
                <button
                  onClick={(e) => {
                    onChange(p);
                  }}
                  className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 transition-colors dark:text-zinc-300 ${
                    focus ? "bg-zinc-100 dark:bg-[#565656]/10" : ""
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
  );
}

export function AssigneePill({ assigneeId, assigneeObj, members, onChange }: { assigneeId?: string; assigneeObj?: any; members: any[]; onChange: (assignee: string) => void }) {
  let displayImage = "none";
  let displayName = "Unassigned";


  if (assigneeObj && assigneeObj._id) {
    displayImage = assigneeObj.image || "none";
    displayName = assigneeObj.name || "Unknown";
  } else if (assigneeId) {
    const selectedMember = members.find((member: any) => (member.userId?._id) === assigneeId);
    if (selectedMember) {
      const memberData = selectedMember.userId;
      displayImage = memberData.profileImage || "none";
      displayName = memberData.fullname || "Unknown";
    }
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-900 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-[#111]/60 dark:text-white dark:hover:bg-[#111]/80">
        {/* <FontAwesomeIcon
          icon={faUser}
          className="h-3 w-3 text-zinc-900 dark:text-white/60"
        />
        <span className="font-normal text-zinc-900 dark:text-white/60">
          Assignee:
        </span> */}
        <div className="flex items-center gap-1">
          {displayImage && displayImage !== "none" ? (
            <img src={displayImage} alt="" className="h-4 w-4 rounded-full object-cover" />
          ) : (
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-500">
              <span className="text-[7px] text-white">
                {displayName.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          )}
          <span className="ml-1 text dark:text-white/60">{displayName}</span>
        </div>
        <FontAwesomeIcon icon={faChevronDown} className="h-2 w-2 opacity-50" />
      </MenuButton>
      <MenuItems className="absolute left-0 z-50 mt-1 max-h-60 w-56 origin-top-left overflow-y-auto rounded-md border border-zinc-200 bg-white p-1 shadow-lg outline-none dark:border-zinc-800 dark:bg-[#111]">
        <MenuItem>
          {({ focus }: { focus: boolean }) => (
            <button
              onClick={(e) => {
                onChange("");
              }}
              className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-500 transition-colors ${
                focus ? "bg-zinc-100 dark:bg-[#565656]/10" : ""
              }`}
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-300 dark:bg-[#565656]">
                <span className="text-[7px] text-center text-zinc-600 dark:text-zinc-300"></span>
              </div>
              <span className="ml-2 font-medium">Unassigned</span>
            </button>
          )}
        </MenuItem>
        {members.map((member: any) => {
          const m = member.userId || member;
          const memberId = m._id || member._id;
          return (
            <MenuItem key={memberId}>
              {({ focus }: { focus: boolean }) => (
                <button
                  onClick={(e) => {
                    onChange(memberId);
                  }}
                  className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-zinc-700 transition-colors dark:text-zinc-300 ${
                    focus ? "bg-zinc-100 dark:bg-[#565656]/10" : ""
                  }`}
                >
                  <img
                    src={m.profileImage || m.image}
                    alt=""
                    className="h-4 w-4 rounded-full object-cover"
                  />
                  <span className="ml-2 truncate font-normal">
                    {m.fullname || m.name || m.email}
                  </span>
                </button>
              )}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}

export function DueDatePill({ deadline, onChange }: { deadline: string; onChange: (deadline: string) => void }) {
  return (
    <Popover className="relative">
      <PopoverButton className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-900 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:bg-[#111]/60 dark:text-white dark:hover:bg-[#111]/80">
        {/* <FontAwesomeIcon
          icon={faCalendar}
          className="h-3 w-3 text-zinc-900 dark:text-white/60"
        />
        <span className="font-normal text-zinc-900 dark:text-white/60">
          Due Date:
        </span> */}
        <span className="text-zinc-700 dark:text-white/60">
          {deadline
            ? DateTime.fromISO(deadline).toFormat("dd LLL, yyyy")
            : "No Deadline"}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="h-2 w-2 opacity-50" />
      </PopoverButton>
      <PopoverPanel className="absolute left-0 z-50 mt-1 rounded-md border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-[#111]">
        {({ close }) => (
          <div className="flex flex-col gap-2">
            <input
              type="date"
              defaultValue={
                deadline ? DateTime.fromISO(deadline).toFormat("yyyy-MM-dd") : ""
              }
              onChange={(e) => {
                if (e.target.value) {
                  onChange(new Date(e.target.value).toISOString());
                  close();
                }
              }}
              className="rounded border border-zinc-300 bg-transparent p-1.5 text-xs text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:text-white/80"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                onChange("");
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
  );
}
