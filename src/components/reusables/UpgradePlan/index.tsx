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

export default function UpgradePlan() {
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
      <div className="poppins flex h-fit w-[100%] flex-col items-center justify-center gap-[16px] rounded-[6px] p-[6px] py-[10px]">
        {/* <div className="mx-3 mt-6 rounded-2xl bg-[#F5F7FA] p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-[#1A1A1A]">
            Upgrade to
            <span className="ml-2 rounded bg-yellow-200 px-2 py-[2px] text-[10px] font-semibold text-yellow-800">
              PRO
            </span>
          </h4>
          <p className="mt-1 text-xs text-[#6B7280]">
            Unlock AI features, advanced roles, and automation tools.
          </p>
          <button className="mt-3 w-full rounded-lg bg-[#4F46E5] px-4 py-2 text-xs font-medium text-white transition-all hover:bg-[#4338CA]">
            Upgrade Now
          </button>

          <button
            className="mt-2 flex h-9 w-full items-center justify-center gap-[8px] rounded-[5px] bg-[#242424] text-[14px] font-regular text-white transition-all duration-300 hover:gap-[12px] hover:bg-black"
          >
            <p className="text-[12px] leading-tight">Upgrade Plan</p>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div> */}

        <div className="mx-3 mt-6 h-fit rounded-[10px] bg-[#F5F7FA] px-3 py-5 shadow-sm">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.4669 8.6941L19.7129 8.1281C20.1454 7.12683 20.9375 6.32402 21.9329 5.8781L22.6919 5.5391C22.784 5.49675 22.862 5.42887 22.9166 5.34353C22.9713 5.25819 23.0004 5.15896 23.0004 5.0576C23.0004 4.95625 22.9713 4.85702 22.9166 4.77168C22.862 4.68633 22.784 4.61846 22.6919 4.5761L21.9749 4.2571C20.9545 3.79848 20.1488 2.96599 19.7239 1.9311L19.4709 1.3201C19.4337 1.22546 19.3689 1.1442 19.2849 1.08693C19.2009 1.02966 19.1016 0.999023 18.9999 0.999023C18.8982 0.999023 18.7989 1.02966 18.7149 1.08693C18.6309 1.1442 18.566 1.22546 18.5289 1.3201L18.2759 1.9301C17.8514 2.96518 17.0461 3.79804 16.0259 4.2571L15.3079 4.5771C15.2161 4.61958 15.1384 4.68745 15.0839 4.77268C15.0294 4.85791 15.0005 4.95695 15.0005 5.0581C15.0005 5.15926 15.0294 5.2583 15.0839 5.34353C15.1384 5.42876 15.2161 5.49663 15.3079 5.5391L16.0679 5.8771C17.0631 6.32347 17.8548 7.12663 18.2869 8.1281L18.5329 8.6941C18.7129 9.1081 19.2859 9.1081 19.4669 8.6941ZM13.3869 6.3391C13.6609 6.77244 14.0355 7.09277 14.5109 7.3001L15.0759 7.5471C15.6459 7.79577 16.0535 8.1951 16.2989 8.7451L16.6369 9.50511C17.3639 11.1421 19.5279 11.3991 20.7089 10.2791L20.7999 10.4001C20.9389 10.5855 21.0092 10.8134 20.9988 11.0448C20.9884 11.2763 20.8979 11.4969 20.7429 11.6691L11.7429 21.6691C11.6491 21.7732 11.5345 21.8564 11.4065 21.9134C11.2785 21.9704 11.14 21.9998 10.9999 21.9998C10.8598 21.9998 10.7212 21.9704 10.5932 21.9134C10.4652 21.8564 10.3507 21.7732 10.2569 21.6691L1.25688 11.6691C1.10185 11.4969 1.0114 11.2763 1.00101 11.0448C0.990612 10.8134 1.06091 10.5855 1.19988 10.4001L4.19988 6.4001C4.29303 6.27591 4.41381 6.1751 4.55267 6.10568C4.69152 6.03625 4.84464 6.0001 4.99988 6.0001H13.2059C13.2572 6.1161 13.3172 6.2291 13.3859 6.3391"
              fill="black"
            />
          </svg>

          <h4 className="pt-1 text-base font-semibold text-[#1A1A1A]">
            Pro Plan Coming Soon
          </h4>
          <p className="text-xs text-[#6B7280]">
            AI features, automation tools, third-party integration, and advanced
            roles management.
          </p>
        </div>
      </div>
    </div>
  );
}
