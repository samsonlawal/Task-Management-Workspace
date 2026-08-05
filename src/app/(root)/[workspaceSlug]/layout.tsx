"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetWorkspaceBySlugQuery } from "@/redux/api/workspaceApiSlice";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import { setWorkspace } from "@/redux/Slices/workspaceSlice";
import Sidebar from "@/components/main/sidebar";
import { setSidebar } from "@/redux/Slices/uiSlice";
import type { RootState } from "@/redux/store";
import Brand from "@/components/reuseables/Brand";
import CommandPalette from "@/components/reuseables/CommandPalette";

const RESERVED_SLUGS = ["user", "profile", "auth", "contact", "workspaces"];

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const sidebarState = useSelector(
    (state: RootState) => state.ui.isSidebarOpen,
  );

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const params = useParams();
  const workspaceSlug = params?.workspaceSlug as string;

  const isReservedRoute = RESERVED_SLUGS.includes(workspaceSlug);

  const { data: workspace, isLoading } = useGetWorkspaceBySlugQuery(
    workspaceSlug,
    {
      skip: !workspaceSlug || isReservedRoute,
    },
  );

  const isSettingsPage = pathname?.includes("/settings");

  // Global Ctrl+K / Cmd+K listener that prevents Chrome default search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); // Prevents Chrome search bar from opening!
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (workspace && (workspace as any)._id) {
      dispatch(setCurrentWorkspace((workspace as any)._id));
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);

  if (isLoading && !isReservedRoute) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-[#111]">
        <div className="animate-pulse">
          <Brand />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#111]">
      {/* Global Command Palette Component */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* MOBILE OVERLAY: Only shows when sidebar is open on mobile */}
      {sidebarState && !isSettingsPage && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => dispatch(setSidebar(false))}
        />
      )}

      {/* SIDEBAR */}
      {!isSettingsPage && (
        <div
          className={`fixed inset-y-0 left-0 z-50 w-60 transform border-r border-[#565656]/20 bg-white transition-transform duration-300 ease-in-out dark:bg-[#111] lg:static lg:block lg:translate-x-0 ${sidebarState ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar />
        </div>
      )}

      {/* CONTENT AREA */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto bg-white dark:bg-[#111]">
          {children}
        </main>
      </div>
    </div>
  );
}
