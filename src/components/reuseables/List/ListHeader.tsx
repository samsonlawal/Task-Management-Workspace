import { AlignLeft, CircleDashed, UserRound, Calendar, Flag, Paperclip } from "lucide-react";
import React from "react";

const ListHeader = () => (
  <div className="flex min-h-fit w-full flex-row justify-between rounded-sm bg-[#eee] px-3 py-3 text-[14px] font-medium text-[#787878] lg:gap-2 dark:bg-[#565656]/10">
    <div className="flex flex-1 md:w-[250px] items-center justify-start gap-2 pr-6">
      <AlignLeft
        size={14}
        strokeWidth={2}
        className="text-[#787878] dark:text-zinc-500"
      />
      <p className="hidden md:flex line-clamp-1 h-fit text-[12px] leading-tight">
        Description
      </p>
    </div>
    <div className="flex w-[40px] items-center justify-start gap-2 text-[#565656]">
      <CircleDashed
        size={14}
        strokeWidth={2}
        className="text-[#787878] dark:text-zinc-500"
      />
      {/* <p className="hidden md:flex text-[12px] text-[#787878]">Status</p> */}
    </div>
    <div className="flex w-[40px] items-center justify-start gap-2">
      <UserRound
        size={14}
        strokeWidth={2}
        className="text-[#787878] dark:text-zinc-500"
      />
      {/* <p className="hidden md:flex text-[12px]">Assignee</p> */}
    </div>
    {/* <div className="flex w-[35px] items-center justify-start gap-2">
      <Paperclip
        size={13}
        strokeWidth={2}
        className="text-[#787878] dark:text-zinc-500"
      />
    </div> */}
    <div className="flex w-[55px] md:w-[90px] items-center justify-start gap-2">
      <Calendar
        size={14}
        strokeWidth={2}
        className="text-[#787878] dark:text-zinc-500"
      />
      {/* <p className="hidden md:flex text-center text-[12px]">Deadline</p> */}
    </div>
    <div className="flex w-[40px] items-center justify-start">
      <div
        className="flex h-fit w-fit flex-row items-center justify-center gap-1 rounded-[6px] px-1.5"
      >
        <Flag
          size={14}
          strokeWidth={2}
          className="text-[#787878] dark:text-zinc-500"
        />
        {/* <p className="hidden md:flex text-[12px]">Priority</p> */}
      </div>
    </div>
    <div className="flex w-[30px] items-center justify-start gap-2">
    </div>
  </div>
);

export default ListHeader;
