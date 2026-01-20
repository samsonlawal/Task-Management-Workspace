"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Dashboard from "@/components/pages/Dashboard";
import Team from "@/components/pages/Team";
import Settings from "../Settings";
import TasksView from "./views/TasksView";

function TabComponent() {
  const currentUI = useSelector((state: RootState) => state.ui.currentUI);

  return (
    <div className="poppins flex h-full w-full flex-1 flex-col bg-[white] dark:bg-[#111]">
      {currentUI === "tasks" ? (
        <TasksView />
      ) : currentUI === "team" ? (
        <Team />
      ) : currentUI === "dashboard" ? (
        <Dashboard />
      ) : currentUI === "settings" ? (
        <Settings />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TabComponent;
