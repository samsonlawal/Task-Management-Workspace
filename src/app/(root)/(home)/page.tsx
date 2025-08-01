"use client";

import Sidebar from "@/components/main/sidebar";
import Workspace from "@/components/pages/workspace";
import { useSelector } from "react-redux";

export default function Home() {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);
  return (
    <div className="poppins flex h-screen w-full flex-col items-center justify-center">
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Welcome, {user.username} 👋</h1>
          <a
            href="/workspace"
            className="w-fit bg-gray-400 px-6 py-2 transition-colors duration-300 hover:bg-gray-500 hover:text-white"
          >
            Workspace
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Welcome to Task Manager</h1>

          <a
            href="/auth/sign-in"
            className="w-fit bg-gray-400 px-6 py-2 transition-colors duration-300 hover:bg-gray-500"
          >
            Login
          </a>
        </div>
      )}
    </div>
  );
}
