// import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DateTime } from "luxon";

export default function SingleTask({
  desc,
  // tags,
  deadline,
  name,
  fullname,
  email,
  image,
  priority,
}: {
  desc: string;
  // tags: [];
  deadline: any;
  name?: string;
  fullname?: string;
  email: string;
  image?: string;
  priority: string;
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

  // const color =
  //   priority in priorityColors
  //     ? priorityColors[priority as keyof typeof priorityColors]
  //     : "bg-[#C0C0C0]";

  // max-h-[189px]
  console.log(deadline);

  return (
    <div className="group relative flex min-h-[116px] w-[200px] flex-col justify-between gap-3 rounded-[6px] bg-gray-200/60 pt-3 font-madei text-[14px] font-[300]">
      <div className="flex flex-row justify-between px-[14px]">
        <div className="flex flex-row gap-1">
          <div
            className={`flex h-fit w-fit flex-col items-center justify-center gap-1 rounded-[3px] ${priority && priorityColors[priority as keyof typeof priorityColors] ? priorityColors[priority as keyof typeof priorityColors] : "bg-gray-700"} px-2 py-1`}
          >
            <p
              className={`text-[11px] ${priority && priorityTextColors[priority as keyof typeof priorityTextColors] ? priorityTextColors[priority as keyof typeof priorityTextColors] : "text-gray-700"}`}
            >
              {(priority || "")?.split(" ")[0].charAt(0).toUpperCase() +
                (priority || "")?.split(" ")[0].slice(1).toLowerCase()}
            </p>
          </div>
          <div className="flex h-fit w-fit flex-col items-center justify-center gap-1 rounded-[3px] bg-gray-500/10 px-2 py-1">
            <p className="text-[11px] text-gray-500">
              <FontAwesomeIcon
                icon={faCalendar}
                className="bg-none text-[12px]"
              />
              {"  "}
              {/* 
              {new Date(deadline).toLocaleDateString("en-GB", {
                timeZone: "UTC", // Force UTC
                month: "short",
                day: "2-digit",
                year: "numeric",
              })} */}
              {DateTime.fromISO(deadline).toFormat("dd MMM yyyy")}
            </p>
          </div>
        </div>
        <div className="cursor-pointer px-2">
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="absolute right-[14px] top-[14px] hidden text-gray-500 opacity-0 group-hover:opacity-100"
          />
        </div>
      </div>
      <div className="flex h-[32px] items-start">
        <p className="line-clamp-2 h-fit px-[14px] text-[12px] leading-4">
          {desc}
        </p>
      </div>
      <div className="flex flex-row items-center gap-1 border-t-[1px] border-gray-500/10">
        <div
          className={`jusitfy-center flex flex-1 flex-row items-center gap-2 px-[12px] py-2`}
        >
          <div
            className={`flex h-[23px] w-[23px] items-center justify-center rounded-full ${image === "none" || "" ? getBgColor(name || fullname || "") : ""}`}
          >
            {(image && image !== "none") || "" ? (
              <img
                src={image}
                alt="User Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <p className="text-xs text-white">
                {name || fullname
                  ? name
                    ? name.charAt(0).toUpperCase()
                    : fullname?.charAt(0).toUpperCase() || ""
                  : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-[2px] -space-y-2 overflow-hidden">
            <p className="text-[13px] text-gray-700">
              {(name || fullname || "")?.split(" ")[0].charAt(0).toUpperCase() +
                (name || fullname || "")?.split(" ")[0].slice(1).toLowerCase()}
            </p>
            {/* <p className="w-full truncate whitespace-nowrap text-[12px] font-light text-[#707070]">
              {email}
            </p> */}
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
      {/* <div
        className={`absolute bottom-0 right-0 h-0 w-0 rounded-[4px] border-r-[10px] border-t-[10px] border-t-transparent ${color}`}
      ></div> */}

      {/* <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 translate-y-2 scale-0 cursor-pointer items-center justify-center rounded-full bg-white leading-none opacity-0 shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
        <img src="/icons/ex.svg" alt="" className="h-2.5 w-2.5" />
      </div> */}
    </div>
  );
}
