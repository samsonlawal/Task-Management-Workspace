import AddMember from "@/components/reusables/Add Member";
import CurrentWorkspace from "@/components/reusables/currentWorkspace";
import React from "react";

export default function Sidebar() {
  return (
    <div className="flex w-[280px] flex-col justify-between border-r-[1px] border-[#c7c7c7] py-[16px] font-madei">
      <div className="flex flex-col gap-[32px] px-[18px]">
        <div className="flex flex-row">
          <img src="/icons/logo.svg" alt="" />
          <p className="text-[21px] font-medium">management</p>
        </div>
        <CurrentWorkspace />
      </div>
      <div className="flex h-fit w-full flex-col gap-[20px]">
        <AddMember />
        <div className="flex h-fit flex-col gap-[14px] px-[18px] text-[15px] font-regular text-[#707070]">
          <span className="flex flex-row gap-[11px]">
            <img src="/icons/cog.svg" alt="" />
            Settings
          </span>
          <span className="flex flex-row gap-[11px]">
            <img src="/icons/logout.svg" alt="" />
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}
