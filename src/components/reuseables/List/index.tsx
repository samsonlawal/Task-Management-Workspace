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
  const priorityColors = {
    High: "bg-[#CF1414]/20",
    Medium: "bg-[#EEC642]/20",
    Low: "bg-[#64BC21]/20",
    low: "bg-[#64BC21]/20",
  };

  const priorityTextColors = {
    High: "text-[#A21E1E]",
    Medium: "text-[#8F7727]",
    Low: "text-[#4C7D26]",
    low: "text-[#4C7D26]",
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
    workspaceId: workspaceData?._id,
  };

  function gettaskdetails() {
    // console.log(id);
    // console.log("Task data:", taskData);
    // console.log(workspaceData);
  }

  // Helper function to get status display
  const getStatusDisplay = (status: string) => {
    const statusConfig = {
      todo: {
        label: "To Do",
        color: "bg-gray-200",
        dotColor: "bg-gray-600",
        labelColor: "text-gray-600",
      },
      "in-progress": {
        label: "In Progress",
        color: "bg-yellow-200",
        dotColor: "bg-yellow-700",
        labelColor: "text-yellow-700",
      },
      "in-review": {
        label: "In Review",
        color: "bg-blue-200",
        dotColor: "bg-blue-700",
        labelColor: "text-blue-700",
      },
      done: {
        label: "Done",
        color: "bg-green-200",
        dotColor: "bg-green-700",
        labelColor: "text-green-700",
      },
    };

    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig["todo"]
    );
  };

  // Helper function to get priority display
  const getPriorityDisplay = (priority: string) => {
    const priorityConfig = {
      High: { color: "bg-red-200", textColor: "text-red-200" },
      Medium: { color: "bg-yellow-300", textColor: "text-yellow-300" },
      Low: { color: "bg-green-300", textColor: "text-green-800" },
      low: { color: "bg-green-300", textColor: "text-green-800" },
    };

    return (
      priorityConfig[priority as keyof typeof priorityConfig] ||
      priorityConfig["Low"]
    );
  };

  const statusDisplay = getStatusDisplay(taskData.status);
  const priorityDisplay = getPriorityDisplay(taskData.priority);

  return (
    <div className="flex min-h-fit w-full flex-row justify-between border-b-[1px] border-[#565656]/10 px-3 pb-1.5 pt-3 text-[14px] text-[#111]">
      <div className="flex w-[250px] items-center justify-start">
        <p className="line-clamp-1 h-fit text-[12px] font-normal leading-tight">
          {desc}
        </p>
      </div>
      <div className="flex w-[100px] items-center justify-start">
        <div
          className={`flex flex-row items-center gap-1 rounded-full ${statusDisplay.color} px-2 py-[3px]`}
        >
          <div
            className={`h-1.5 w-1.5 rounded-full ${statusDisplay.dotColor}`}
          />
          <p className={`text-[11px] font-normal ${statusDisplay.labelColor}`}>
            {statusDisplay.label}
          </p>
        </div>
      </div>
      <div className="flex w-[115px] items-center justify-start">
        <div
          className={`jusitfy-center flex flex-1 flex-row items-center gap-2`}
        >
          <div
            className={`flex h-[24px] w-[24px] items-center justify-center rounded-full ${image === "none" || "" ? getBgColor(name || fullname || "") : ""}`}
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

          <Flag
            size={14}
            className={`${priority && priorityTextColors[priority as keyof typeof priorityTextColors] ? priorityTextColors[priority as keyof typeof priorityTextColors] : "text-gray-700"} fill-current`}
          />
          <p
            className={`text-[12px] font-normal ${priority && priorityTextColors[priority as keyof typeof priorityTextColors] ? priorityTextColors[priority as keyof typeof priorityTextColors] : "text-gray-700"}`}
          >
            {(priority || "")?.split(" ")[0].charAt(0).toUpperCase() +
              (priority || "")?.split(" ")[0].slice(1).toLowerCase()}
          </p>
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
