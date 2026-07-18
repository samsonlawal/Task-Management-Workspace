// Updated SingleTask component - pass task data to TaskDetails
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { DateTime } from "luxon";
import TaskDetails from "../TaskDetails";
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

  // Create task object to pass to TaskDetails
  const taskData = {
    id,
    title,
    description: desc,
    deadline,
    assignee: {
      name: name || fullname || "",
      email,
      image,
      _id: assigneeId,
    },
    priority,
    status,
    createdAt,
    workspaceName: workspaceData?.name,
    workspaceId: workspaceData?._id,
    createdBy,
  };

  function gettaskdetails() {
    // console.log(id);
    // console.log("Task data:", taskData);
    // console.log(workspaceData);
  }

  return (
    <div className="flex min-h-fit w-full flex-row justify-between border-t-[1px] border-[#565656]/10 px-3 py-3.5 text-[14px] text-[#111] dark:text-[#eee]/60">
      <div className="flex flex-1 md:w-[250px] items-center justify-start gap-2 pr-6">
        <span className="text-[11px] font-semibold text-[#787878] dark:text-zinc-500 mr-1 select-none whitespace-nowrap">
          STK-{id ? id.slice(-4).toUpperCase() : "01"}
        </span>
        <p className="line-clamp-1 h-fit text-[12px] font-normal leading-4">
          {desc}
        </p>
      </div>
      <div className="flex w-[40px] md:w-[100px] items-center justify-start">
        {/* Mobile: Status icon only */}
        <div className="md:hidden flex items-center justify-center">
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
          className={`hidden md:flex flex-row items-center gap-1 rounded-[4px] ${statusStyles.bg} ${statusStyles.darkBg} px-2 py-[3px]`}
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
          <p
            className={`text-[11px] font-normal ${statusStyles.text} ${statusStyles.darkText}`}
          >
            {statusStyles.label}
          </p>
        </div>
      </div>
      <div className="flex w-[40px] md:w-[115px] items-center justify-start">
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

          <div className="hidden md:flex flex-col items-start gap-[2px] -space-y-2 overflow-hidden">
            <p className="text-[12px] font-normal">
              {(name || fullname || "")?.split(" ")[0].charAt(0).toUpperCase() +
                (name || fullname || "")?.split(" ")[0].slice(1).toLowerCase()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-[55px] md:w-[120px] items-center justify-start">
        <p className="text-center text-[12px] font-normal">
          <span className="md:hidden">
            {DateTime.fromISO(deadline).toFormat("MMM dd")}
          </span>
          <span className="hidden md:inline">
            {DateTime.fromISO(deadline).toFormat("MMMM dd, yyyy")}
          </span>
        </p>
      </div>
      <div className="flex w-[40px] md:w-[70px] items-center justify-start">
        <div
          className={`flex h-fit w-fit flex-row items-center justify-center gap-1 rounded-[6px] px-1.5 py-[4px]`}
        >
          {/* <img
            src={`/icons/task/${priority === "High" ? "high" : priority === "Medium" ? "medium" : "low"}.svg`}
            alt=""
            className="h-3.5 w-3.5"
          /> */}

          <Flag size={14} className={`${priorityStyles.text} fill-current`} />
          <p className={`hidden md:flex text-[10px] font-normal ${priorityStyles.text}`}>
            {(priority || "")?.split(" ")[0].charAt(0).toUpperCase() +
              (priority || "")?.split(" ")[0].slice(1).toLowerCase()}
          </p>
        </div>
      </div>
      <div className="flex w-[10px] items-center justify-start">
        <div
          className="flex cursor-pointer items-center justify-start"
          onClick={gettaskdetails}
        >
          {/* Pass taskData to TaskDetails component */}
          <TaskDetails taskData={taskData} getDetails={gettaskdetails} />
        </div>
      </div>

      {/* <button className="hover:cursor-pointer">hover</button>

      <button className="cursor-pointer">hover</button> */}
    </div>
  );
}
