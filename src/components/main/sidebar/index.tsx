"use client";

import AddMemberUI from "@/components/reusables/Add MemberUI";
import CurrentWorkspace from "@/components/reusables/currentWorkspace";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useGetWorkspace } from "@/hooks/api/workspace";

export default function Sidebar() {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  const { data: workspace, onGetWorksapce } = useGetWorkspace();

  useEffect(() => {
    // console.log("USER_ID:", user?._id);
    if (user) {
      onGetWorksapce();

      console.log(workspace);
    }
  }, []);

  // function handleWorkspace() {
  // }

  return (
    <div className="flex h-full w-full flex-1 flex-col justify-between bg-gray-200/60 py-[14px] font-madei dark:bg-[#1A1A1D]">
      <div className="flex flex-col gap-[34px]">
        <div className="flex flex-row items-center px-[6px]">
          <img src="/icons/new-logo2.svg" alt="" className="h-10 w-10" />
          <p className="text-[21px] font-[400]">StackTask</p>
        </div>
        <CurrentWorkspace />
        <div className="flex flex-col justify-between px-[12px] text-[15px] font-[300] text-[#707070]">
          <span className="flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50">
            <img src="/icons/home-outline.svg" alt="" className="h-4 w-4" />
            Dashboard
          </span>
          {/* <span className="flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50">
            <img src="/icons/cog.svg" alt="" className="h-4 w-4" />
            My Tasks
          </span> */}
          <span className="flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50">
            <img src="/icons/team-outline.svg" alt="" className="w-4.5 h-4" />
            Team
          </span>
          <span className="flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50">
            <img src="/icons/ai-outline.svg" alt="" className="h-4 w-4" />
            AI Overview
          </span>
          <span className="flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50">
            <img src="/icons/cog-outline.svg" alt="" className="h-4 w-4" />
            Settings
          </span>
        </div>
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
