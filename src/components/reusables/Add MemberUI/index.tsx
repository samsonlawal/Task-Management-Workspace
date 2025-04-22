"use client";

import React, { useState } from "react";
import AddMember from "../Dialogs/AddMember";
import tasks from "@/components/data";
import { faArrowLeft, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUI } from "@/redux/Slices/uiSlice";
import { RootState } from "@/redux/store";

export default function AddMemberUI() {
  const [display, setDisplay] = useState<"tasks" | "dashboard">("tasks");

  const currentUI = useSelector((state: RootState) => state.ui.currentUI);
  const dispatch = useDispatch();

  return (
    <div className="flex w-full items-center justify-center">
      {currentUI === "tasks" ? (
        <div className="flex h-fit w-[92%] flex-col justify-center gap-[10px] rounded-[6px] border-[1px] border-[#C7C7C7] p-[10px] py-[10px] font-madei">
          {/* <p className="font-regular text-[15px] leading-tight text-[#565656]">
        Members:
      </p> */}
          <div className="flex flex-row -space-x-[10px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex h-9 w-9 -translate-x-2 transform items-center justify-center rounded-full border-2 border-white bg-gray-300 text-sm text-[#565656] transition-transform duration-300 first:translate-x-0 hover:translate-x-0"
              >
                {index === 4 && "+6"}
              </div>
            ))}
          </div>
          <p className="text-[14px] font-regular leading-tight text-[#565656]">
            Invite members and manage your team here.
          </p>
          <button
            onClick={() => dispatch(setCurrentUI("dashboard"))}
            className="flex h-10 w-full items-center justify-center gap-[8px] rounded-[5px] bg-[#242424] text-[14px] font-regular text-white transition-all duration-300 hover:gap-[12px] hover:bg-black"
          >
            {/* <FontAwesomeIcon icon={faUsers} /> */}
            <img src="/icons/tema-white.svg" alt="" />
            Manage Workspace
          </button>
        </div>
      ) : (
        <div className="flex h-fit w-[92%] flex-col justify-center gap-[10px] rounded-[6px] border-[1px] border-[#C7C7C7] p-[10px] py-[10px] font-madei">
          {/* <p className="font-regular text-[15px] leading-tight text-[#565656]">
        Members:
      </p> */}
          <div className="flex flex-row -space-x-[10px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex h-9 w-9 -translate-x-2 transform items-center justify-center rounded-full border-2 border-white bg-gray-300 text-sm text-[#565656] transition-transform duration-300 first:translate-x-0 hover:translate-x-0 hover:gap-[16px]"
              >
                {index === 4 && "+6"}
              </div>
            ))}
          </div>
          <p className="text-[14px] font-regular leading-tight text-[#565656]">
            Invite members and manage your team here.
          </p>
          <button
            onClick={() => dispatch(setCurrentUI("tasks"))}
            className="flex h-10 w-full items-center justify-center gap-[8px] rounded-[5px] bg-[#242424] text-[14px] font-regular text-white transition-all duration-300 hover:gap-[12px] hover:bg-black"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Tasks
          </button>
        </div>
      )}
    </div>
  );
}
