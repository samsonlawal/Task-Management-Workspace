"use client";

import React from "react";
import { Upload, AlertTriangle } from "lucide-react";

export default function WorkspaceSettingsPage() {
  return (
    <div className="poppins flex h-fit w-full flex-col gap-6 pb-24 pt-6 transition-all duration-300 max-w-[700px]">
      <div className="flex h-fit w-full flex-col gap-2 rounded-[14px] border-[1px] border-[#565656]/20 bg-[#fff] transition-all duration-300 dark:bg-[#111]">
        <div className="flex w-full flex-row justify-between border-b-[1px] border-[#565656]/20 px-6 py-6 text-left">
          <div className="flex w-fit flex-col justify-start text-left">
            <h1 className="text-[16px]">Workspace Settings</h1>
            <p className="text-[12px] text-[#565656] dark:text-[#787878]">
              Manage your workspace profile and preferences.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 px-6 pt-6">
          {/* Logo Changing */}
          <div className="flex flex-row items-center justify-start gap-4">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-indigo-600 text-[20px] font-semibold text-white">
              S
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[13px]">Workspace Logo</p>
              <div className="flex flex-row gap-2">
                <button className="rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium text-[#fff]/50 transition-colors duration-300 hover:border-[#565656]/20 hover:bg-[#565656]/20 hover:text-white/50">
                  Upload Image
                </button>
                <button className="rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium text-[#fff]/50 transition-colors duration-300 hover:border-[#565656]/20 hover:bg-[#565656]/20 hover:text-white/50">
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6">
            {/* Name Input */}
            <div className="flex flex-col gap-1">
              <h1 className="text-[13px]">Workspace Name</h1>
              <input
                type="text"
                defaultValue="StackTask"
                className="h-[40px] w-full rounded-[6px] border-[1px] border-[#565656]/20 bg-transparent px-[12px] text-[12px] placeholder:text-[#565656] focus:border-[#565656] focus:outline-none dark:text-[#fff]/80"
              />
            </div>

            {/* URL Input */}
            <div className="flex flex-col gap-1">
              <h1 className="text-[13px]">Workspace URL</h1>
              <div className="flex h-[40px] w-full items-center rounded-[6px] border-[1px] border-[#565656]/20 bg-transparent px-[12px] focus-within:border-[#565656]">
                <span className="text-[12px] text-[#565656]">app.stacktask.com/</span>
                <input
                  type="text"
                  defaultValue="stacktask"
                  className="w-full bg-transparent text-[12px] placeholder:text-[#565656] focus:outline-none dark:text-[#fff]/80"
                />
              </div>
            </div>

            {/* Permissions */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <h1 className="text-[13px]">Permissions</h1>
                <p className="text-[11px] text-[#565656] dark:text-[#787878]">
                  Who can delete all tasks or have admin privileges.
                </p>
              </div>
              <select className="mt-1 h-[40px] w-full rounded-[6px] border-[1px] border-[#565656]/20 bg-transparent px-[12px] text-[12px] focus:border-[#565656] focus:outline-none dark:text-[#fff]/80">
                <option className="dark:bg-[#111]">Admins only</option>
                <option className="dark:bg-[#111]">Members and Admins</option>
                <option className="dark:bg-[#111]">Workspace Owner only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex w-full items-center justify-end rounded-b-[14px] p-6 dark:bg-[#1a1a1a]">
          <button className="rounded-md border-[1px] border-[#565656]/60 bg-[white] px-[12px] py-1 text-[11px] font-medium text-[#111] transition-colors duration-300 hover:border-[#565656]/10 hover:bg-[#565656]/10 hover:text-white/50">
            Save Changes
          </button>
        </div>
      </div>

      {/* Danger */}
      <div className="flex h-fit w-full flex-col items-start justify-center gap-2 rounded-[14px] border-[1px] border-[#565656]/20 bg-[#fff] px-6 py-6 transition-all duration-300 dark:bg-[#111]">
        <div className="flex flex-col">
          <h1 className="text-[14px] text-[red]">Danger Zone</h1>
          <p className="text-[12px] text-[#565656] dark:text-[#787878]">
            Permanently delete this workspace and all of its data.{" "}
            <span className="text-[#111] dark:text-white">These actions cannot be undone.</span>
          </p>
        </div>
        <div className="flex w-full items-center justify-end mt-2">
          <button className="rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium text-[red]/80 transition-colors duration-300 hover:border-[red]/20 hover:bg-[red]/10 hover:text-[red]">
            Delete Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
