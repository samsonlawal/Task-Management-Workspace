"use client";

import Sidebar from "@/components/main/sidebar";
import Workspace from "@/components/main/workspace";
import { useSelector } from "react-redux";

export default function Home() {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);
  return (
    <div className="flex h-screen flex-col">
      {user ? (
        <h1 className="text-2xl font-bold">Welcome, {user.username} 👋</h1>
      ) : (
        <h1 className="text-2xl font-bold">Welcome to Task Manager</h1>
      )}
    </div>
  );
}
