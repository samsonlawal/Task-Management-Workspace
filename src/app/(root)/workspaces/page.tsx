"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useGetUserWorkspace } from "@/hooks/api/workspace";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import Brand from "@/components/reuseables/Brand";
import Invitation from "@/components/reuseables/Invitation";
import stringToColor from "@/utils/stringToColor";

function Workspaces() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(
    null,
  );

  const { user } = useSelector((state: any) => state.auth);
  const {
    data: workspaces,
    onGetUserWorkspace,
    loading: workspacingLoading,
  } = useGetUserWorkspace(user?._id);

  // console.log(selectedWorkspace);

  function handleContinue() {
    if (selectedWorkspace) {
      dispatch(setCurrentWorkspace(selectedWorkspace));
      router.push("/workspace");
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-[20px] bg-[#111]">
      <Brand />
      <Invitation onInviteAccepted={() => onGetUserWorkspace(user?._id)} />

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-[#565656]/20 bg-[#1a1a1a]/50 p-6">
        {/* Header */}
        <div className="flex flex-col text-left">
          <h1 className="poppins text-[15px] font-semibold text-white">
            Select Workspace
          </h1>
          <p className="poppins text-[12px] text-[#fff]/50">
            Choose where you want to continue your work or create.
          </p>
        </div>

        {/* List */}
        <div className="flex flex-col gap-1 rounded-[6px] border-[1px] border-[#565656]/20 bg-[#111]/20 p-4 transition-all duration-300">
          {workspacingLoading ? (
            <div className="flex justify-center p-4 transition-all duration-300">
              <p className="text-sm text-gray-500">Loading workspaces...</p>
            </div>
          ) : workspaces && workspaces.length > 0 ? (
            workspaces.map((ws) => (
              <div
                key={ws._id}
                className={`flex h-[40px] w-[317px] cursor-pointer flex-row items-center justify-between rounded-[4px] p-[6px] transition-all duration-300 hover:bg-[#565656]/10 ${selectedWorkspace === ws._id ? "border-[1px] border-[#565656]/10 bg-[#565656]/10 text-[#111]" : "text-[#565656]"}`}
                onClick={() => setSelectedWorkspace(ws._id)}
              >
                <div className="poppins flex flex-row items-center justify-center gap-2">
                  <div
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-[4px] text-[13px] text-white"
                    style={{ backgroundColor: stringToColor(ws.name) }}
                  >
                    {ws.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-[13px] font-medium text-white">
                    {ws.name}
                  </p>
                </div>

                {/* Check */}
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border border-[#565656]/40 transition-all duration-300 ${selectedWorkspace === ws._id ? "bg-white" : "bg-transparent"}`}
                >
                  {selectedWorkspace === ws._id && (
                    <svg
                      className="h-3 w-3 text-[#111]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12l5 5l10-10" />
                    </svg>
                  )}
                </span>
              </div>
            ))
          ) : (
            <div className="flex justify-center p-4">
              <p className="text-sm text-gray-500">No workspaces found</p>
            </div>
          )}
        </div>

        <button
          className="poppins rounded-sm bg-[#fff] py-[10px] text-[12px] font-medium text-[#111] transition-all duration-300 hover:bg-[#fff]/80 disabled:bg-[#565656]/10 disabled:text-[#565656]/50"
          disabled={!selectedWorkspace}
          onClick={handleContinue}
        >
          Select and Continue
        </button>
      </div>
    </div>
  );
}

export default Workspaces;
