"use client";

import AddMemberUI from "@/components/reusables/Add MemberUI";
import CurrentWorkspace from "@/components/reusables/currentWorkspace";
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
            className="flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50"
            onClick={() => {
              dispatch(setCurrentUI("dashboard"));

              setCurrent("dashboard");
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.92365 0.750001H2.30541C2.13393 0.749823 1.9641 0.783467 1.80564 0.849007C1.64718 0.914546 1.5032 1.0107 1.38195 1.13195C1.2607 1.2532 1.16455 1.39718 1.09901 1.55564C1.03347 1.7141 0.999823 1.88393 1 2.05541V4.67365C0.99964 5.0206 1.13684 5.35354 1.38154 5.5995C1.62623 5.84546 1.95846 5.98438 2.30541 5.98581H4.92365C5.09602 5.98599 5.26672 5.95217 5.426 5.88629C5.58528 5.82041 5.73 5.72377 5.85188 5.60188C5.97377 5.48 6.07041 5.33528 6.13629 5.176C6.20217 5.01672 6.23599 4.84602 6.23581 4.67365V2.05541C6.23438 1.70846 6.09546 1.37623 5.8495 1.13154C5.60354 0.886843 5.2706 0.74964 4.92365 0.750001ZM12.1946 0.750001H9.57635C9.2294 0.74964 8.89646 0.886843 8.6505 1.13154C8.40454 1.37623 8.26562 1.70846 8.26419 2.05541V4.67365C8.26437 5.0216 8.40267 5.35525 8.64871 5.60129C8.89475 5.84733 9.2284 5.98563 9.57635 5.98581H12.1946C12.5415 5.98438 12.8738 5.84546 13.1185 5.5995C13.3632 5.35354 13.5004 5.0206 13.5 4.67365V2.05541C13.5002 1.88393 13.4665 1.7141 13.401 1.55564C13.3355 1.39718 13.2393 1.2532 13.1181 1.13195C12.9968 1.0107 12.8528 0.914546 12.6944 0.849007C12.5359 0.783467 12.3661 0.749823 12.1946 0.750001ZM12.1946 8.01351H9.57635C9.22929 8.01315 8.89625 8.15045 8.65026 8.39529C8.40428 8.64013 8.26544 8.97253 8.26419 9.3196V11.9378C8.26401 12.1102 8.29783 12.2809 8.36371 12.4402C8.42959 12.5995 8.52624 12.7442 8.64812 12.8661C8.77 12.988 8.91472 13.0846 9.074 13.1505C9.23328 13.2164 9.40399 13.2502 9.57635 13.25H12.1946C12.5415 13.2486 12.8738 13.1097 13.1185 12.8637C13.3632 12.6177 13.5004 12.2848 13.5 11.9378V9.3196C13.5002 9.14812 13.4665 8.97829 13.401 8.81983C13.3355 8.66137 13.2393 8.51739 13.1181 8.39614C12.9968 8.27488 12.8528 8.17874 12.6944 8.1132C12.5359 8.04766 12.3661 8.01334 12.1946 8.01351ZM4.92365 8.01351H2.30541C1.95851 8.01548 1.62649 8.15466 1.38189 8.40065C1.13729 8.64665 0.999995 8.97945 1 9.32635V11.9446C0.999823 12.1161 1.03347 12.2859 1.09901 12.4444C1.16455 12.6028 1.2607 12.7468 1.38195 12.8681C1.5032 12.9893 1.64718 13.0855 1.80564 13.151C1.9641 13.2165 2.13393 13.2502 2.30541 13.25H4.92365C5.2706 13.2504 5.60354 13.1132 5.8495 12.8685C6.09546 12.6238 6.23438 12.2915 6.23581 11.9446V9.32635C6.23599 9.15399 6.20217 8.98328 6.13629 8.824C6.07041 8.66472 5.97377 8.52 5.85188 8.39812C5.73 8.27624 5.58528 8.17959 5.426 8.11371C5.26672 8.04783 5.09602 8.01334 4.92365 8.01351Z"
                stroke="#565656"
                stroke-width="0.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {/* {current === "dashboard" ? (
              <img src="/icons/d2.svg" alt="" className="h-4.5 w-4.5" />
            ) : (
              <img src="/icons/d2.svg" alt="" className="h-5 w-5" />
            )} */}{" "}
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
            className={`flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50 ${current === "tasks" ? "bg-gray-300/50" : ""}`}
          >
            {current === "tasks" ? (
              <img src="/icons/checks.svg" alt="" className="h-5 w-5" />
            ) : (
              <img src="/icons/checks.svg" alt="" className="h-5 w-5" />
            )}
            {/* <FontAwesomeIcon
              icon={faListCheck}
              className="h-4 w-4 text-gray-500 hover:text-gray-700"
            /> */}
            Tasks
          </span>

          <span
            onClick={() => {
              dispatch(setCurrentUI("team"));
              setCurrent("team");
            }}
            className={`flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50 ${current === "team" ? "bg-gray-300/50" : ""}`}
          >
            {current === "team" ? (
              <img src="/icons/people.svg" alt="" className="h-5 w-5" />
            ) : (
              <img src="/icons/people.svg" alt="" className="h-5 w-5" />
            )}{" "}
            {/* <FontAwesomeIcon
              icon={faUsers}
              className="h-4 w-4 text-gray-500 hover:text-gray-700"
            /> */}
            Team
          </span>
          {/* <span className="flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50">
            <img src="/icons/ai-outline.svg" alt="" className="h-4 w-4" />
            AI Overview
          </span> */}
          <span
            className={`flex cursor-pointer flex-row items-center justify-start gap-[11px] rounded-[5px] px-2 py-2 transition-all duration-300 hover:bg-gray-300/50 ${current === "settings" ? "bg-gray-300/50" : ""}`}
          >
            {/* <img src="/icons/cog-outline.svg" alt="" className="h-4 w-4" /> */}
            <img src="/icons/settings.svg" alt="" className="h-5 w-5" />{" "}
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
