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
import {
  Clock,
  Flag,
  FlagIcon,
  FlagOffIcon,
  Link2,
  MessageSquare,
  Paperclip,
  Redo,
} from "lucide-react";
import { getPriorityStyles } from "@/utils/taskStyles";

export default function Card({
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

  return (
    <div className="group relative flex h-[98px] w-[250px] flex-col justify-between gap-[6px] rounded-[4px] border border-[#565656]/10 bg-[#fff] py-[10px] text-[14px] font-[300] dark:bg-[#565656]/20">
      <div className="flex flex-col gap-[1px]">
        {/* Head */}
        <div className="flex flex-row justify-between px-[14px] font-medium">
          <div className="flex flex-row items-center justify-center gap-1">
            {/* Status */}
            {/* <div className="bg-[#C5C5C5 flex h-[18px] w-[20px] items-center justify-center rounded-[2px]">
              <img
                src={`icons/task/${status === "to-do" ? "to-do" : status === "in-progress" ? "in-progress" : status === "in-review" ? "in-review" : "completed"}.svg`}
                alt=""
                className="h-3.5 w-3.5"
              />
            </div> */}

            {/* TITLE */}
            <p className="text-[13px] font-medium">Review Jobs</p>
          </div>
          <div className="cursor-pointer" onClick={gettaskdetails}>
            {/* Pass taskData to TaskDetails component */}
            <TaskDetails taskData={taskData} getDetails={gettaskdetails} />
          </div>
        </div>

        {/* Middle */}
        <div className="flex h-fit flex-col items-start justify-between gap-[4px] px-[14px]">
          <p className="line-clamp-2 h-fit text-[11px] font-medium leading-tight text-[#565656] dark:text-[#fff]/50">
            {desc}
          </p>
        </div>
      </div>

      {/* bottom */}
      <div className="flex w-full flex-row items-center gap-1 px-[14px]">
        <div
          className={`flex w-full flex-row items-center justify-between gap-2`}
        >
          <div className="flex flex-row items-center justify-center gap-1">
            {/* <Redo size={12} className="scale-y-[-1] text-[#565656]" /> */}
            {/* comments */}
            <div
              className={`flex h-fit w-fit flex-row items-center justify-center gap-1 rounded-[8px]`}
            >
              <p className={`text-[10px] font-normal ${priorityStyles.text}`}>
                <FlagIcon size={10} className={priorityStyles.fill} />
                {/* {(priority || "")?.split(" ")[0].charAt(0).toUpperCase() +
                  (priority || "")?.split(" ")[0].slice(1).toLowerCase()} */}
              </p>
            </div>

            <div className="flex w-fit flex-row items-center justify-center gap-[4px] px-1 py-[1px]">
              {/* <img
                src="/icons/chat-outline.svg"
                alt="chat-icon"
                className="h-[11px] w-[11px]"
              /> */}
              <MessageSquare
                size={10}
                className="text-[#565656] dark:text-[#fff]/70"
              />
              <p className="text-[11px] text-[#565656] dark:text-[#fff]/70">
                2
              </p>
            </div>

            {/* links */}
            {/* <div className="flex w-fit flex-row items-center justify-center gap-[4px] px-1.5 py-[2px]">
              <Link2 size={11} strokeWidth={1} />

              <p className="text-[10px] text-[#565656]">8</p>
            </div> */}

            {/* deadline */}
            <div className="flex w-fit flex-row items-center justify-center gap-[4px] px-1 py-[2px]">
              {/* <img
              src="/icons/task/cal.svg"
              alt="calendar-icon"
              className="h-[10px] w-[10px]"
            /> */}
              <Clock
                size={11}
                strokeWidth={2}
                className="text-[#565656] dark:text-[#fff]/70"
              />

              <p className="text-center text-[10px] text-[#565656] dark:text-[#fff]/70">
                {DateTime.fromISO(deadline).toFormat("dd MMM")}
              </p>
            </div>
          </div>

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

          {/* <div className="flex flex-col items-start gap-[2px] -space-y-2 overflow-hidden">
            <p className="text-[10px] font-medium text-gray-700">
              {(name || fullname || "")?.split(" ")[0].charAt(0).toUpperCase() +
                (name || fullname || "")?.split(" ")[0].slice(1).toLowerCase()}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
