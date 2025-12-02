"use client";

import UpgradePlan from "@/components/reuseables/UpgradePlan";
import CurrentWorkspace from "@/components/reuseables/currentWorkspace";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useGetWorkspace } from "@/hooks/api/workspace";
import { setCurrentUI } from "@/redux/Slices/uiSlice";
import {
  faBarsProgress,
  faGear,
  faHouse,
  faListCheck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  LayoutDashboard,
  GalleryHorizontal,
  SquareKanban,
  List,
  AlignLeft,
  Library,
  CheckCheck,
  Users,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  const [current, setCurrent] = useState<
    "tasks" | "dashboard" | "team" | "settings"
  >("tasks");

  const { data: workspace, onGetWorksapce } = useGetWorkspace();

  const dispatch = useDispatch();

  const handleDashboard = () => {
    dispatch(setCurrentUI("dashboard"));
    // console.log(WorkspaceData?.workspace.members);
  };

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
    <div className="flex h-full w-full flex-1 flex-col justify-between py-[14px] dark:bg-[#1A1A1D]">
      <div className="flex flex-col gap-[34px]">
        <div className="flex flex-row items-center px-[6px]">
          <img src="/icons/new-logo2.svg" alt="" className="h-10 w-10" />
          <p className="font-karst text-[18px] font-extrabold">taskstackHQ</p>
        </div>
        <CurrentWorkspace />
        <div className="poppins-regular flex flex-col justify-between gap-1 px-[12px] text-[13px] font-[300] text-[#707070]">
          <span
            className={`border-red flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] border px-2 py-2 transition-all duration-300 hover:border-[#565656]/10 hover:bg-gray-300/50 ${current === "dashboard" ? "border border-[#565656]/10 bg-[#565656]/10" : "border-white"}`}
            onClick={() => {
              dispatch(setCurrentUI("dashboard"));
              setCurrent("dashboard");
            }}
          >
            <LayoutDashboard strokeWidth={1.5} size={18} />
            Dashboard
          </span>
          {/* <span className="flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50">
            <img src="/icons/cog.svg" alt="" className="h-4 w-4" />
            My Tasks
          </span> */}
          <span
            onClick={() => {
              dispatch(setCurrentUI("tasks"));
              setCurrent("tasks");
            }}
            className={`border-red flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] border px-2 py-2 transition-all duration-300 hover:border-[#565656]/10 hover:bg-gray-300/50 ${current === "tasks" ? "border border-[#565656]/10 bg-[#565656]/10" : "border-white"}`}
          >
            <CheckCheck strokeWidth={1.5} size={18} />
            Tasks
          </span>

          <span
            onClick={() => {
              dispatch(setCurrentUI("team"));
              setCurrent("team");
            }}
            className={`border-red flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] border px-2 py-2 transition-all duration-300 hover:border-[#565656]/10 hover:bg-gray-300/50 ${current === "team" ? "border border-[#565656]/10 bg-[#565656]/10" : "border-white"}`}
          >
            <Users strokeWidth={1.5} size={18} />
            Team
          </span>
          {/* <span className="flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50">
            <img src="/icons/ai-outline.svg" alt="" className="h-4 w-4" />
            AI Overview
          </span> */}
          <span
            className={`border-red flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] border px-2 py-2 transition-all duration-300 hover:border-[#565656]/10 hover:bg-gray-300/50 ${current === "settings" ? "border border-[#565656]/10 bg-[#565656]/10" : "border-white"}`}
            onClick={() => {
              dispatch(setCurrentUI("settings"));
              setCurrent("settings");
            }}
          >
            <Settings strokeWidth={1.5} size={18} />
            Settings
          </span>
        </div>
      </div>
      <div className="flex h-fit w-full flex-col gap-[20px]">
        {/* <UpgradePlan /> */}
      </div>
    </div>
  );
}
