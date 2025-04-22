import AddMemberUI from "@/components/reusables/Add MemberUI";
import CurrentWorkspace from "@/components/reusables/currentWorkspace";
import React from "react";

export default function Sidebar() {
  return (
    <div className="flex w-[260px] flex-col justify-between border-r-[1px] py-[14px] font-madei dark:bg-[#1A1A1D]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-row items-center px-[6px]">
          <img src="/icons/new-logo2.svg" alt="" className="h-10 w-10" />
          <p className="text-[21px] font-[400]">StackTask</p>
        </div>
        <CurrentWorkspace />
      </div>
      <div className="flex h-fit w-full flex-col gap-[20px]">
        <AddMemberUI />
        {/* <div className="flex h-fit flex-col gap-[14px] px-[18px] text-[15px] font-regular text-[#707070]">
          <span className="flex flex-row gap-[11px]">
            <img src="/icons/cog.svg" alt="" />
            Settings
          </span>
          <span className="flex flex-row gap-[11px]">
            <img src="/icons/logout.svg" alt="" />
            Logout
          </span>
        </div> */}
      </div>
    </div>
  );
}
