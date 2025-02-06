import React from "react";

export default function SingleTask() {
  return (
    <div className="flex h-[189px] flex-col justify-between rounded-[6px] bg-[#DBDBDB] py-4 font-regular">
      <p className="px-[14px] leading-5">
        Sales, planning and monitoring of important transactions.
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 px-[14px]">
          <div>tags</div>
          <p className="text-[14px] text-[#707070]">Deadline: Feb, 3 2025</p>
        </div>
        <div className="flex flex-row items-center gap-2 border-t-[1px] border-[#C0C0C0] px-[14px] pt-2">
          <div className="h-[30px] w-[30px] rounded-full bg-[purple]"> </div>
          <div className="flex flex-col items-start -space-y-2">
            <p>Samson</p>
            <p className="text-[14px] font-light text-[#707070]">
              samson@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
