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
    <div className="flex h-full w-full flex-1 flex-col justify-between bg-gray-200/60 py-[14px] dark:bg-[#1A1A1D]">
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
            {current === "dashboard" ? (
              <img src="/icons/home.svg" alt="" className="h-4 w-4" />
            ) : (
              <img src="/icons/home-outline.svg" alt="" className="h-4 w-4" />
            )}
            {/* <FontAwesomeIcon
              icon={faHouse}
              className="h-4 w-4 text-gray-500 hover:text-gray-700"
            /> */}
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
              <img src="/icons/bull.svg" alt="" className="h-4 w-4" />
            ) : (
              <img src="/icons/bull-outline.svg" alt="" className="h-4 w-4" />
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
              <img src="/icons/team.svg" alt="" className="h-4 w-4" />
            ) : (
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke-width="5"
              >
                <path
                  // fill-rule="evenodd"
                  // clip-rule="evenodd"
                  stroke-width="5"
                  d="M11 9C12.873 9 14.57 9.62 15.815 10.487C16.998 11.312 18 12.538 18 13.857C18 14.581 17.691 15.181 17.204 15.627C16.746 16.048 16.148 16.321 15.532 16.507C14.301 16.88 12.68 17 11 17C9.32 17 7.699 16.88 6.468 16.507C5.852 16.321 5.254 16.048 4.795 15.627C4.31 15.182 4 14.582 4 13.858C4 12.539 5.002 11.313 6.185 10.488C7.43 9.62 9.127 9 11 9ZM11 11C9.56 11 8.257 11.48 7.33 12.127C6.341 12.817 6 13.519 6 13.857C6 14.161 6.352 14.351 6.672 14.471L6.877 14.541L7.047 14.593C7.987 14.877 9.367 15 11 15C12.508 15 13.799 14.895 14.728 14.656L15.032 14.569L15.222 14.509C15.565 14.392 16 14.195 16 13.857C16 13.519 15.659 12.817 14.67 12.127C13.744 11.481 12.44 11 11 11ZM18 10C19.044 10 19.992 10.345 20.693 10.833C21.333 11.28 22 12.023 22 12.929C22 14.264 20.703 14.742 19.537 14.909L19.237 14.946L18.948 14.971L18.81 14.979C18.932 14.634 19 14.259 19 13.857C18.9994 13.5578 18.9635 13.2598 18.893 12.969C19.279 12.939 19.596 12.889 19.832 12.818C19.936 12.786 19.842 12.688 19.732 12.603L19.625 12.525L19.549 12.474C19.2488 12.2691 18.9104 12.127 18.554 12.056C18.174 11.296 17.59 10.638 16.968 10.113C17.3069 10.0381 17.6529 10.0002 18 10ZM4 10C4.358 10.0013 4.702 10.039 5.032 10.113C4.41 10.638 3.826 11.296 3.446 12.056C3.08958 12.127 2.75116 12.2691 2.451 12.474L2.323 12.562C2.196 12.654 2.047 12.782 2.168 12.818C2.404 12.889 2.721 12.94 3.108 12.969C3.03622 13.2595 2.99995 13.5577 3 13.857C3 14.259 3.068 14.634 3.19 14.979L2.91 14.959L2.614 14.929C1.412 14.782 0 14.322 0 12.929C0 12.024 0.666 11.28 1.307 10.833C2.09997 10.2898 3.03882 9.9994 4 10ZM17.5 4C18.163 4 18.7989 4.26339 19.2678 4.73223C19.7366 5.20107 20 5.83696 20 6.5C20 7.16304 19.7366 7.79893 19.2678 8.26777C18.7989 8.73661 18.163 9 17.5 9C16.837 9 16.2011 8.73661 15.7322 8.26777C15.2634 7.79893 15 7.16304 15 6.5C15 5.83696 15.2634 5.20107 15.7322 4.73223C16.2011 4.26339 16.837 4 17.5 4ZM4.5 4C5.16304 4 5.79893 4.26339 6.26777 4.73223C6.73661 5.20107 7 5.83696 7 6.5C7 7.16304 6.73661 7.79893 6.26777 8.26777C5.79893 8.73661 5.16304 9 4.5 9C3.83696 9 3.20107 8.73661 2.73223 8.26777C2.26339 7.79893 2 7.16304 2 6.5C2 5.83696 2.26339 5.20107 2.73223 4.73223C3.20107 4.26339 3.83696 4 4.5 4ZM11 0C12.0609 0 13.0783 0.421427 13.8284 1.17157C14.5786 1.92172 15 2.93913 15 4C15 5.06087 14.5786 6.07828 13.8284 6.82843C13.0783 7.57857 12.0609 8 11 8C9.93913 8 8.92172 7.57857 8.17157 6.82843C7.42143 6.07828 7 5.06087 7 4C7 2.93913 7.42143 1.92172 8.17157 1.17157C8.92172 0.421427 9.93913 0 11 0ZM17.5 6C17.3674 6 17.2402 6.05268 17.1464 6.14645C17.0527 6.24021 17 6.36739 17 6.5C17 6.63261 17.0527 6.75979 17.1464 6.85355C17.2402 6.94732 17.3674 7 17.5 7C17.6326 7 17.7598 6.94732 17.8536 6.85355C17.9473 6.75979 18 6.63261 18 6.5C18 6.36739 17.9473 6.24021 17.8536 6.14645C17.7598 6.05268 17.6326 6 17.5 6ZM4.5 6C4.36739 6 4.24021 6.05268 4.14645 6.14645C4.05268 6.24021 4 6.36739 4 6.5C4 6.63261 4.05268 6.75979 4.14645 6.85355C4.24021 6.94732 4.36739 7 4.5 7C4.63261 7 4.75979 6.94732 4.85355 6.85355C4.94732 6.75979 5 6.63261 5 6.5C5 6.36739 4.94732 6.24021 4.85355 6.14645C4.75979 6.05268 4.63261 6 4.5 6ZM11 2C10.4696 2 9.96086 2.21071 9.58579 2.58579C9.21071 2.96086 9 3.46957 9 4C9 4.53043 9.21071 5.03914 9.58579 5.41421C9.96086 5.78929 10.4696 6 11 6C11.5304 6 12.0391 5.78929 12.4142 5.41421C12.7893 5.03914 13 4.53043 13 4C13 3.46957 12.7893 2.96086 12.4142 2.58579C12.0391 2.21071 11.5304 2 11 2Z"
                  fill="#565656"
                />
              </svg>
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
            <FontAwesomeIcon
              icon={faGear}
              className="h-4 w-4 text-gray-500 hover:text-gray-700"
            />{" "}
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
