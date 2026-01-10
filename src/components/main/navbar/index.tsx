"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import { useSelector } from "react-redux";

import ThemeSwitcher from "@/components/reuseables/ThemeSwitcher";
import Notification from "@/components/reuseables/Notification";

export default function Navbar() {
  // const labels = {
  //   tasks: "Workspace",
  //   team: "Team",
  //   dashboard: "Dashboard",
  //   settings: "Preferences",
  // };

  // labels[currentUI];
  const currentUI = useSelector((state: RootState) => state.ui.currentUI);

  return (
    <div className="poppins flex w-full items-center justify-between border-b-[1px] border-[#565656]/10 px-[32px] py-[7px]">
      {/* <h2 className="montserrat-bold text-xl">
        {currentUI === "tasks" ? "Workspace" : "Members"}
      </h2> */}

      <h2 className="poppins-medium text-xl text-[#111] dark:text-white">
        {currentUI === "tasks"
          ? "Issues"
          : currentUI === "dashboard"
            ? "Dashboard"
            : currentUI === "team"
              ? "Team"
              : "Preferences"}
      </h2>
      <div className="flex flex-row gap-6">
        <Notification />
      </div>
    </div>
  );
}

function NotificationPrototype() {}
