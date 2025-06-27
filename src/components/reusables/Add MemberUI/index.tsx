"use client";

import React, { useState } from "react";
import AddMember from "../Dialogs/AddMember";
import tasks from "@/components/data";
import {
  faArrowLeft,
  faArrowRight,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUI } from "@/redux/Slices/uiSlice";
import { RootState } from "@/redux/store";

export default function AddMemberUI() {
  const [display, setDisplay] = useState<"tasks" | "dashboard">("tasks");

  const currentUI = useSelector((state: RootState) => state.ui.currentUI);
  const WorkspaceData = useSelector((state: RootState) => state.WorkspaceData);

  const dispatch = useDispatch();

  const handleDashboard = () => {
    dispatch(setCurrentUI("dashboard"));
    // console.log(WorkspaceData?.workspace.members);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="poppins flex h-fit w-[92%] flex-col items-center justify-center gap-[16px] rounded-[6px] p-[6px] py-[10px]">
        {/* <p className="font-regular text-[15px] leading-tight text-[#565656]">
        Members:
      </p> */}
        {/* <div className="flex flex-row -space-x-[10px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex h-9 w-9 -translate-x-2 transform items-center justify-center rounded-full border-2 border-white bg-gray-300 text-sm text-[#565656] transition-transform duration-300 first:translate-x-0 hover:translate-x-0"
              >
                {index === 4 && "+6"}
              </div>
            ))}
          </div> */}

        <button
          // onClick={}
          className="flex h-10 w-full items-center justify-center gap-[8px] rounded-[5px] bg-[#242424] text-[14px] font-regular text-white transition-all duration-300 hover:gap-[12px] hover:bg-black"
        >
          {/* <FontAwesomeIcon icon={faUsers} /> */}
          {/* <img src="/icons/tema-white.svg" alt="" /> */}
          <p className="text-[12px] leading-tight">Upgrade Plan</p>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
