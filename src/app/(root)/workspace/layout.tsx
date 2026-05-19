"use client";

import Sidebar from "@/components/main/sidebar";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { setSidebar } from "@/redux/Slices/uiSlice" 

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const dispatch = useDispatch();
  const sidebarState = useSelector((state: RootState) => state.ui.isSidebarOpen)
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#111]">
      {/* 1. MOBILE OVERLAY: Only shows when sidebar is open on mobile */}
      {sidebarState && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          // onClick={() => setIsOpen(false)}
          onClick = {() => dispatch(setSidebar(false))}
        />
      )}

      {/* 2. SIDEBAR: 
          - Mobile: Fixed position, slides in/out based on 'isOpen'
          - Desktop (lg:): Static position, always visible (translate-x-0)
      */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-60 transform border-r border-[#565656]/20 bg-white transition-transform duration-300 ease-in-out dark:bg-[#111] 
          lg:static lg:block lg:translate-x-0 
          ${sidebarState ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* 3. CONTENT AREA */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto bg-white dark:bg-[#111]">
          {children}
        </main>
      </div>
    </div>
  );
}
