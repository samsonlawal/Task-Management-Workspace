// Updated SingleTask component - pass task data to TaskDetails
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { DateTime } from "luxon";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Flag } from "lucide-react";
import { getStatusStyles, getPriorityStyles } from "@/utils/taskStyles";

export default function ListTask({
  title,
  desc,
  deadline,
  name,
  fullname,
  email,
  image,
  priority,
  id,
  status,
  createdAt,
  assigneeId,
  createdBy,
  onOpenDetails,
}: {
  title: string;
  desc: string;
  deadline: any;
  name?: string;
  fullname?: string;
  email: string;
  image?: string;
  priority: string;
  id: string;
  status: string;
  createdAt: string;
  assigneeId?: string;
  createdBy?: string;
  onOpenDetails?: () => void;
}) {
  const priorityStyles = getPriorityStyles(priority);
  const statusStyles = getStatusStyles(status);

  const getBgColor = (firstName: string) => {
    const colors: any = {
      A: "bg-red-500",
      B: "bg-blue-500",
      C: "bg-green-500",
      D: "bg-yellow-500",
    };

    const firstLetter: string = firstName
      ? firstName.charAt(0).toUpperCase()
      : "";
    return colors[firstLetter] || "bg-gray-500";
  };

  const workspaceData = useSelector(
    (state: RootState) => state.WorkspaceData?.workspace,
  );

  return (
    <div className="poppins flex min-h-fit w-full flex-row justify-between border-t-[1px] border-[#565656]/10 px-3 py-3.5 lg:gap-2 text-[14px] text-[#111] dark:text-[#eee]/60">
      <div className="flex flex-1 items-center justify-start gap-2 pr-6 md:w-[250px]">
        <span className="mr-1 select-none whitespace-nowrap text-[10px] font-normal text-[#565656] dark:text-zinc-500">
          STK-{id ? id.slice(-4).toUpperCase() : "01"}
        </span>
        <p className="line-clamp-1 h-fit text-[12px] font-normal leading-4 text-zinc-800 dark:text-zinc-200">
          {title || desc}
        </p>
      </div>
      <div className="flex w-[40px] items-center justify-start">
        {/* Mobile: Status icon only */}
        <div className="flex items-center justify-center md:hidden">
          <img
            src={`/icons/task/${
              status === "to-do" || status === "TO-DO"
                ? "to-do"
                : status === "in-progress" || status === "IN-PROGRESS"
                  ? "in-progress"
                  : status === "in-review" || status === "IN-REVIEW"
                    ? "in-review"
                    : "completed"
            }.svg`}
            alt={status}
            className="h-3.5 w-3.5"
          />
        </div>
        {/* Desktop: Status badge (icon + label) */}
        <div
          className={`hidden flex-row items-center gap-1 rounded-[4px] md:flex px-0 py-[3px]`}
        >
          <img
            src={`/icons/task/${
              status === "to-do" || status === "TO-DO"
                ? "to-do"
                : status === "in-progress" || status === "IN-PROGRESS"
                  ? "in-progress"
                  : status === "in-review" || status === "IN-REVIEW"
                    ? "in-review"
                    : "completed"
            }.svg`}
            alt=""
            className="h-3 w-3"
          />
          {/* <p
            className={`text-[11px] font-normal ${statusStyles.text} ${statusStyles.darkText}`}
          >
            {statusStyles.label}
          </p> */}
        </div>
      </div>
      <div className="flex w-[40px] items-center justify-start ">
        <div
          className={`jusitfy-center flex flex-1 flex-row items-center gap-2`}
        >
          <div
            className={`flex h-[20px] w-[20px] items-center justify-center rounded-full ${image === "none" || "" ? getBgColor(name || fullname || "") : ""}`}
          >
            {(image && image !== "none") || "" ? (
              <img
                src={image}
                alt="User Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <p className="text-[12px] text-white">
                {name || fullname
                  ? name
                    ? name.charAt(0).toUpperCase()
                    : fullname?.charAt(0).toUpperCase() || ""
                  : ""}
              </p>
            )}
          </div>

          {/* <div className="hidden flex-col items-start gap-[2px] -space-y-2 overflow-hidden md:flex">
            <p className="text-[12px] font-normal">
              {(name || fullname || "")?.split(" ")[0].charAt(0).toUpperCase() +
                (name || fullname || "")?.split(" ")[0].slice(1).toLowerCase()}
            </p>
          </div> */}
        </div>
      </div>
      <div className="flex w-[55px] items-center justify-start md:w-[90px]">
        {deadline && (
          <p className="text-center text-[12px] font-normal">
            <span className="md:hidden">
              {DateTime.fromISO(deadline).toFormat("MMM dd")}
            </span>
            <span className="hidden md:inline">
              {DateTime.fromISO(deadline).toFormat("MMM dd, yy")}
            </span>
          </p>
        )}
      </div>
      <div className="flex w-[40px] items-center justify-start">
        <div
          className={`flex h-fit w-fit flex-row items-center justify-center gap-1 rounded-[6px] px-1.5 py-[4px]`}
        >
          <Flag size={14} className={`${priorityStyles.text} fill-current`} />
          {/* <p
            className={`hidden text-[10px] font-normal md:flex ${priorityStyles.text}`}
          >
            {(priority || "")?.split(" ")[0].charAt(0).toUpperCase() +
              (priority || "")?.split(" ")[0].slice(1).toLowerCase()}
          </p> */}
        </div>
      </div>
      <div className="flex w-[30px] items-center justify-start">
        <div
          className="flex cursor-pointer items-center justify-start"
          onClick={onOpenDetails}
        >
          <img
            src="/icons/expand.svg"
            alt="expand"
            className="mr-1 h-3.5 w-3.5 select-none opacity-70 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
