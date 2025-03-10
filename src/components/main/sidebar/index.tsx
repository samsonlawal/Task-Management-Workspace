import AddMemberUI from "@/components/reusables/Add MemberUI";
import CurrentWorkspace from "@/components/reusables/currentWorkspace";
import React from "react";

export default function Sidebar() {
  return (
    <div className="flex w-[280px] flex-col justify-between border-r-[1px] border-[#c7c7c7] py-[24px] font-madei">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-row items-center gap-1 px-[18px]">
          <img src="/icons/hexhex.svg" alt="" className="h-6 w-6" />
          <p className="text-[21px] font-[400]">Management</p>
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
