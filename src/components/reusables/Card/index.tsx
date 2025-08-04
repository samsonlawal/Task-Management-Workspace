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

  return (
    // <div className="group relative flex min-h-[96px] w-[205px] flex-col justify-between gap-2 rounded-[6px] border border-gray-200 bg-gray-200 pt-2 text-[14px] font-[300]">
    //   <div className="flex flex-row justify-between px-[10px] font-medium">
    //     <div className="flex flex-row gap-1">
    //       <div
    //         className={`flex h-fit w-fit flex-col items-center justify-center gap-1 rounded-[3px] ${priority && priorityColors[priority as keyof typeof priorityColors] ? priorityColors[priority as keyof typeof priorityColors] : "bg-gray-700"} px-1.5 py-1`}
    //       >
    //         <p
    //           className={`text-[9px] ${priority && priorityTextColors[priority as keyof typeof priorityTextColors] ? priorityTextColors[priority as keyof typeof priorityTextColors] : "text-gray-700"}`}
    //         >
    //           {(priority || "")?.split(" ")[0].charAt(0).toUpperCase() +
    //             (priority || "")?.split(" ")[0].slice(1).toLowerCase()}
    //         </p>
    //       </div>
    //       <div className="flex h-fit w-fit flex-col items-center justify-center gap-1 rounded-[3px] bg-gray-500/10 px-1.5 py-1">
    //         <p className="text-[9px] text-gray-500">
    //           <FontAwesomeIcon
    //             icon={faCalendar}
    //             className="bg-none text-[12px]"
    //           />
    //           {"  "}
    //           {DateTime.fromISO(deadline).toFormat("dd MMM yyyy")}
    //         </p>
    //       </div>
    //     </div>
    //     <div className="cursor-pointer" onClick={gettaskdetails}>
    //       {/* Pass taskData to TaskDetails component */}
    //       <TaskDetails taskData={taskData} getDetails={gettaskdetails} />
    //     </div>
    //   </div>
    //   <div className="flex min-h-[18px] items-start">
    //     <p className="line-clamp-2 h-fit px-[10px] text-[10.5px] font-normal leading-tight">
    //       {desc}
    //     </p>
    //   </div>
    //   <div className="flex flex-row items-center gap-1 border-t-[1px] border-gray-500/10">
    //     <div
    //       className={`jusitfy-center flex flex-1 flex-row items-center gap-2 px-[10px] py-1.5`}
    //     >
    //       <div
    //         className={`flex h-[20px] w-[20px] items-center justify-center rounded-full ${image === "none" || "" ? getBgColor(name || fullname || "") : ""}`}
    //       >
    //         {(image && image !== "none") || "" ? (
    //           <img
    //             src={image}
    //             alt="User Profile"
    //             className="h-full w-full rounded-full object-cover"
    //           />
    //         ) : (
    //           <p className="text-[10px] text-white">
    //             {name || fullname
    //               ? name
    //                 ? name.charAt(0).toUpperCase()
    //                 : fullname?.charAt(0).toUpperCase() || ""
    //               : ""}
    //           </p>
    //         )}
    //       </div>

    //       <div className="flex flex-col items-start gap-[2px] -space-y-2 overflow-hidden">
    //         <p className="text-[10px] font-medium text-gray-700">
    //           {(name || fullname || "")?.split(" ")[0].charAt(0).toUpperCase() +
    //             (name || fullname || "")?.split(" ")[0].slice(1).toLowerCase()}
    //         </p>
    //       </div>
    //     </div>

    //     {/* deadline */}
    //     <div className="flex h-full w-fit flex-row items-center justify-center gap-1 px-[14px]">
    //       <img
    //         src="/icons/chat-outline.svg"
    //         alt="User Profile"
    //         className="h-3.5 w-3.5"
    //       />
    //       <p className="text-[10px] text-[#565656]">2</p>
    //     </div>
    //   </div>
    // </div>

    // <div className="group relative flex min-h-[96px] w-[250px] flex-col justify-between gap-2 rounded-[14px] border border-[#565656]/10 bg-white pt-2 text-[14px] font-[300]">
    //   {/* Head */}
    //   <div className="flex flex-row justify-between px-[14px] pt-1 font-medium">
    //     <div className="flex flex-row items-center justify-center gap-2">
    //       {/* Status */}
    //       <div className="bg-[#C5C5C5 flex h-[18px] w-[20px] items-center justify-center rounded-[2px]">
    //         <img
    //           src={`icons/${status === "to-do" ? "circle-line" : status === "in-progress" ? "circle-half" : status === "in-review" ? "circle-full" : "circle-check"}.svg`}
    //           alt=""
    //           className="h-3.5 w-3.5"
    //         />
    //       </div>
    //       {/* TITLE */}
    //       <p className="text-[13px] font-medium">Review Jobs</p>
    //     </div>
    //     <div className="cursor-pointer" onClick={gettaskdetails}>
    //       {/* Pass taskData to TaskDetails component */}
    //       <TaskDetails taskData={taskData} getDetails={gettaskdetails} />
    //     </div>
    //   </div>

    //   {/* Middle */}
    //   <div className="flex min-h-[55px] flex-col items-start justify-between gap-[6px] px-[14px]">
    //     {/* descritpion */}
    //     <p className="line-clamp-2 h-fit text-[11px] font-normal leading-tight">
    //       {desc}
    //     </p>

    //     <div className="flex flex-row gap-1">
    //       {/* comments */}
    //       <div className="flex w-fit flex-row items-center justify-center gap-[4px] rounded-[6px] border border-gray-200 bg-[#565656]/10 px-1.5 py-[2px]">
    //         <img
    //           src="/icons/chat-outline.svg"
    //           alt="chat-icon"
    //           className="h-[10px] w-[10px]"
    //         />
    //         <p className="text-[10px] text-[#565656]">2</p>
    //       </div>

    //       {/* attache */}
    //       <div className="flex w-fit flex-row items-center justify-center gap-[4px] rounded-[6px] border border-gray-200 bg-[#565656]/10 px-1.5 py-[2px]">
    //         <img
    //           src="/icons/task/attach.svg"
    //           alt="attach-icon"
    //           className="h-[10px] w-[10px]"
    //         />
    //         <p className="text-[10px] text-[#565656]">1</p>
    //       </div>

    //       {/* links */}
    //       <div className="flex w-fit flex-row items-center justify-center gap-[4px] rounded-[6px] border border-gray-200 bg-[#565656]/10 px-1.5 py-[2px]">
    //         <img
    //           src="/icons/task/link.svg"
    //           alt="link-icon"
    //           className="h-[10px] w-[10px]"
    //         />
    //         <p className="text-[10px] text-[#565656]">8</p>
    //       </div>

    //       {/* deadline */}
    //       <div className="flex w-fit flex-row items-center justify-center gap-[4px] rounded-[6px] border border-gray-200 bg-[#565656]/10 px-1.5 py-[2px]">
    //         <img
    //           src="/icons/task/cal.svg"
    //           alt="calendar-icon"
    //           className="h-[10px] w-[10px]"
    //         />
    //         <p className="text-center text-[10px] text-[#565656]">
    //           {DateTime.fromISO(deadline).toFormat("dd MMM")}
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* bottom */}
    //   <div className="flex flex-row items-center gap-1 border-t-[1px] border-gray-500/10 px-[14px] py-[6px]">
    //     <div
    //       className={`jusitfy-center flex flex-1 flex-row items-center gap-2`}
    //     >
    //       <div
    //         className={`flex h-[20px] w-[20px] items-center justify-center rounded-full ${image === "none" || "" ? getBgColor(name || fullname || "") : ""}`}
    //       >
    //         {(image && image !== "none") || "" ? (
    //           <img
    //             src={image}
    //             alt="User Profile"
    //             className="h-full w-full rounded-full object-cover"
    //           />
    //         ) : (
    //           <p className="text-[10px] text-white">
    //             {name || fullname
    //               ? name
    //                 ? name.charAt(0).toUpperCase()
    //                 : fullname?.charAt(0).toUpperCase() || ""
    //               : ""}
    //           </p>
    //         )}
    //       </div>

    //       <div className="flex flex-col items-start gap-[2px] -space-y-2 overflow-hidden">
    //         <p className="text-[10px] font-medium text-gray-700">
    //           {(name || fullname || "")?.split(" ")[0].charAt(0).toUpperCase() +
    //             (name || fullname || "")?.split(" ")[0].slice(1).toLowerCase()}
    //         </p>
    //       </div>
    //     </div>

    //     <div
    //       className={`flex h-fit w-fit flex-row items-center justify-center gap-1 rounded-[6px] ${priority && priorityColors[priority as keyof typeof priorityColors] ? priorityColors[priority as keyof typeof priorityColors] : "bg-gray-700"} px-1.5 py-[4px]`}
    //     >
    //       <img
    //         src={`icons/task/${priority === "High" ? "high" : priority === "Medium" ? "medium" : "low"}.svg`}
    //         alt=""
    //         className="h-3.5 w-3.5"
    //       />
    //       <p
    //         className={`text-[10px] font-regular ${priority && priorityTextColors[priority as keyof typeof priorityTextColors] ? priorityTextColors[priority as keyof typeof priorityTextColors] : "text-gray-700"}`}
    //       >
    //         {(priority || "")?.split(" ")[0].charAt(0).toUpperCase() +
    //           (priority || "")?.split(" ")[0].slice(1).toLowerCase()}
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <div className="group relative flex min-h-[96px] w-[250px] flex-col justify-between gap-2 rounded-[14px] border border-[#565656]/10 bg-white pt-2 text-[14px] font-[300]">
      {/* Head */}
      <div className="flex flex-row justify-between px-[14px] pt-1 font-medium">
        <div className="flex flex-row items-center justify-center gap-2">
          {/* Status */}
          <div className="bg-[#C5C5C5 flex h-[18px] w-[20px] items-center justify-center rounded-[2px]">
            <img
              src={`icons/${status === "to-do" ? "circle-line" : status === "in-progress" ? "circle-half" : status === "in-review" ? "circle-full" : "circle-check"}.svg`}
              alt=""
              className="h-3.5 w-3.5"
            />
          </div>
          {/* TITLE */}
          <p className="text-[13px] font-medium">Review Jobs</p>
        </div>
        <div className="cursor-pointer" onClick={gettaskdetails}>
          {/* Pass taskData to TaskDetails component */}
          <TaskDetails taskData={taskData} getDetails={gettaskdetails} />
        </div>
      </div>

      {/* Middle */}
      <div className="flex min-h-[55px] flex-col items-start justify-between gap-[6px] px-[14px]">
        {/* descritpion */}
        <p className="line-clamp-2 h-fit text-[11px] font-normal leading-tight">
          {desc}
        </p>

        <div className="flex flex-row gap-1">
          {/* comments */}
          <div className="flex w-fit flex-row items-center justify-center gap-[4px] rounded-[6px] border border-gray-200 bg-[#565656]/10 px-1.5 py-[2px]">
            <img
              src="/icons/chat-outline.svg"
              alt="chat-icon"
              className="h-[10px] w-[10px]"
            />
            <p className="text-[10px] text-[#565656]">2</p>
          </div>

          {/* attache */}
          <div className="flex w-fit flex-row items-center justify-center gap-[4px] rounded-[6px] border border-gray-200 bg-[#565656]/10 px-1.5 py-[2px]">
            <img
              src="/icons/task/attach.svg"
              alt="attach-icon"
              className="h-[10px] w-[10px]"
            />
            <p className="text-[10px] text-[#565656]">1</p>
          </div>

          {/* links */}
          <div className="flex w-fit flex-row items-center justify-center gap-[4px] rounded-[6px] border border-gray-200 bg-[#565656]/10 px-1.5 py-[2px]">
            <img
              src="/icons/task/link.svg"
              alt="link-icon"
              className="h-[10px] w-[10px]"
            />
            <p className="text-[10px] text-[#565656]">8</p>
          </div>

          {/* deadline */}
          <div className="flex w-fit flex-row items-center justify-center gap-[4px] rounded-[6px] border border-gray-200 bg-[#565656]/10 px-1.5 py-[2px]">
            <img
              src="/icons/task/cal.svg"
              alt="calendar-icon"
              className="h-[10px] w-[10px]"
            />
            <p className="text-center text-[10px] text-[#565656]">
              {DateTime.fromISO(deadline).toFormat("dd MMM")}
            </p>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="flex flex-row items-center gap-1 border-t-[1px] border-gray-500/10 px-[14px] py-[6px]">
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

        <div
          className={`flex h-fit w-fit flex-row items-center justify-center gap-1 rounded-[6px] ${priority && priorityColors[priority as keyof typeof priorityColors] ? priorityColors[priority as keyof typeof priorityColors] : "bg-gray-700"} px-1.5 py-[4px]`}
        >
          <img
            src={`icons/task/${priority === "High" ? "high" : priority === "Medium" ? "medium" : "low"}.svg`}
            alt=""
            className="h-3.5 w-3.5"
          />
          <p
            className={`text-[10px] font-regular ${priority && priorityTextColors[priority as keyof typeof priorityTextColors] ? priorityTextColors[priority as keyof typeof priorityTextColors] : "text-gray-700"}`}
          >
            {(priority || "")?.split(" ")[0].charAt(0).toUpperCase() +
              (priority || "")?.split(" ")[0].slice(1).toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
