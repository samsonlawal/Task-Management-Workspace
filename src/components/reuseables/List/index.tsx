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
}: {
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
    description: desc,
    deadline,
    assignee: {
      name: name || fullname || "",
      email,
      image,
    },
    priority,
    status,
    createdAt,
    workspaceName: workspaceData?.name,
    workspaceId: workspaceData?._id,
  };

  function gettaskdetails() {
    // console.log(id);
    // console.log("Task data:", taskData);
    // console.log(workspaceData);
  }

  return (
    <div className="flex min-h-fit w-full flex-row justify-between border-b-[1px] border-[#565656]/10 px-3 py-3.5 text-[14px] text-[#111] dark:text-[#eee]/60">
      <div className="flex w-[250px] items-center justify-start gap-2">
        <input type="checkbox" />
        <p className="line-clamp-1 h-fit text-[12px] font-normal leading-[12px]">
          {desc}
        </p>
      </div>
      <div className="flex w-[100px] items-center justify-start">
        <div
          className={`flex flex-row items-center gap-1 rounded-[4px] ${statusStyles.bg} ${statusStyles.darkBg} px-2 py-[3px]`}
        >
          {/* <div
            className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot} ${statusStyles.darkDot}`}
          /> */}
          <p
            className={`text-[11px] font-normal ${statusStyles.text} ${statusStyles.darkText}`}
          >
            {statusStyles.label}
          </p>
        </div>
      </div>
      <div className="flex w-[115px] items-center justify-start">
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

          <div className="flex flex-col items-start gap-[2px] -space-y-2 overflow-hidden">
            <p className="text-[12px] font-normal">
              {(name || fullname || "")?.split(" ")[0].charAt(0).toUpperCase() +
                (name || fullname || "")?.split(" ")[0].slice(1).toLowerCase()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-[120px] items-center justify-start">
        <p className="text-center text-[12px] font-normal">
          {DateTime.fromISO(deadline).toFormat("MMMM dd, yyyy")}
        </p>
      </div>
      <div className="flex w-[70px] items-center justify-start">
        <div
          className={`flex h-fit w-fit flex-row items-center justify-center gap-1 rounded-[6px] px-1.5 py-[4px]`}
        >
          {/* <img
            src={`icons/task/${priority === "High" ? "high" : priority === "Medium" ? "medium" : "low"}.svg`}
            alt=""
            className="h-3.5 w-3.5"
          /> */}

          <Flag size={14} className={`${priorityStyles.text} fill-current`} />
          {/* <p
            className={`text-[12px] font-normal ${priorityStyles.text}`}
          >
            {(priority || "")?.split(" ")[0].charAt(0).toUpperCase() +
              (priority || "")?.split(" ")[0].slice(1).toLowerCase()}
          </p> */}
        </div>
      </div>
      <div className="flex w-[70px] items-center justify-start">
        <div
          className="flex rotate-90 cursor-pointer items-center justify-start"
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
