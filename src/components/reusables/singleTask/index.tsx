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

export default function SingleTask({
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
  const priorityColors = {
    High: "bg-red-300/30",
    Medium: "bg-yellow-300/30",
    Low: "bg-green-300/30",
    low: "bg-green-300/30",
  };

  const priorityTextColors = {
    High: "text-red-800",
    Medium: "text-yellow-800",
    Low: "text-green-800",
    low: "text-green-800",
  };

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
    // Add other task properties as needed
    status, // You might want to pass this as a prop too
    createdAt, // You might want to pass this as a prop
    workspaceName: workspaceData?.name,
  };

  function gettaskdetails() {
    // console.log(id);
    // console.log("Task data:", taskData);
    // console.log(workspaceData);
  }

  return (
    <div className="group relative flex min-h-[96px] w-[205px] flex-col justify-between gap-2 rounded-[6px] border border-gray-200 bg-gray-200 pt-2 text-[14px] font-[300]">
      <div className="flex flex-row justify-between px-[10px] font-medium">
        <div className="flex flex-row gap-1">
          <div
            className={`flex h-fit w-fit flex-col items-center justify-center gap-1 rounded-[3px] ${priority && priorityColors[priority as keyof typeof priorityColors] ? priorityColors[priority as keyof typeof priorityColors] : "bg-gray-700"} px-1.5 py-1`}
          >
            <p
              className={`text-[9px] ${priority && priorityTextColors[priority as keyof typeof priorityTextColors] ? priorityTextColors[priority as keyof typeof priorityTextColors] : "text-gray-700"}`}
            >
              {(priority || "")?.split(" ")[0].charAt(0).toUpperCase() +
                (priority || "")?.split(" ")[0].slice(1).toLowerCase()}
            </p>
          </div>
          <div className="flex h-fit w-fit flex-col items-center justify-center gap-1 rounded-[3px] bg-gray-500/10 px-1.5 py-1">
            <p className="text-[9px] text-gray-500">
              <FontAwesomeIcon
                icon={faCalendar}
                className="bg-none text-[12px]"
              />
              {"  "}
              {DateTime.fromISO(deadline).toFormat("dd MMM yyyy")}
            </p>
          </div>
        </div>
        <div className="cursor-pointer" onClick={gettaskdetails}>
          {/* Pass taskData to TaskDetails component */}
          <TaskDetails taskData={taskData} getDetails={gettaskdetails} />
        </div>
      </div>
      <div className="flex min-h-[18px] items-start">
        <p className="line-clamp-2 h-fit px-[10px] text-[10.5px] font-normal leading-tight">
          {desc}
        </p>
      </div>
      <div className="flex flex-row items-center gap-1 border-t-[1px] border-gray-500/10">
        <div
          className={`jusitfy-center flex flex-1 flex-row items-center gap-2 px-[10px] py-1.5`}
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
              <p className="text-[10px] text-white">
                {name || fullname
                  ? name
                    ? name.charAt(0).toUpperCase()
                    : fullname?.charAt(0).toUpperCase() || ""
                  : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-[2px] -space-y-2 overflow-hidden">
            <p className="text-[10px] font-medium text-gray-700">
              {(name || fullname || "")?.split(" ")[0].charAt(0).toUpperCase() +
                (name || fullname || "")?.split(" ")[0].slice(1).toLowerCase()}
            </p>
          </div>
        </div>

        {/* deadline */}
        <div className="flex h-full w-fit flex-row items-center justify-center gap-1 px-[14px]">
          <img
            src="/icons/chat-outline.svg"
            alt="User Profile"
            className="h-3.5 w-3.5"
          />
          <p className="text-[10px] text-[#565656]">2</p>
        </div>
      </div>
    </div>
  );
}
