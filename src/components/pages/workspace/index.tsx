"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Dashboard from "@/components/pages/Dashboard";
import Team from "@/components/pages/Team";
import Chat from "@/components/pages/Chats";
import Integrations from "@/components/pages/Integrations";
import Settings from "@/components/pages/Settings";
import TasksView from "./views/TasksView";
import AIView from "@/components/pages/AIView";

function Workspace() {
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
      ) : currentUI === "chat" ? (
        <Chat />
      ) : currentUI === "integrations" ? (
        <Integrations />
      ) : currentUI === "ai" ? (
        <AIView />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Workspace;
