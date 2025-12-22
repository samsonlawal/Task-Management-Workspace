"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useGetUserWorkspace } from "@/hooks/api/workspace";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import Brand from "@/components/reuseables/Brand";

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

  // Helper to generate consistent colors from strings
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };

  console.log(selectedWorkspace);

  function handleContinue() {
    if (selectedWorkspace) {
      dispatch(setCurrentWorkspace(selectedWorkspace));
      router.push("/workspace");
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-[20px] bg-white">
      <Brand />
      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-[#565656]/20 p-4">
        {/* Header */}
        <div className="flex flex-col text-left">
          <h1 className="poppins text-[15px] font-semibold text-black">
            Select Workspace
          </h1>
          <p className="poppins text-[12px] text-[#565656]/70 text-black">
            Choose where you want to continue your work or create.
          </p>
        </div>

        {/* List */}
        <div className="flex flex-col gap-1 rounded-[6px] border-[1px] border-[#565656]/20 bg-[#eee]/20 p-4 transition-all duration-300">
          {workspacingLoading ? (
            <div className="flex justify-center p-4 transition-all duration-300">
              <p className="text-sm text-gray-500">Loading workspaces...</p>
            </div>
          ) : workspaces && workspaces.length > 0 ? (
            workspaces.map((ws) => (
              <div
                key={ws._id}
                className={`flex h-[40px] w-[317px] cursor-pointer flex-row items-center justify-between rounded-[4px] p-[6px] transition-all duration-300 hover:bg-gray-200/70 ${selectedWorkspace === ws._id ? "border-[1px] border-[#565656]/10 bg-gray-200/70 text-[#111]" : "text-[#565656]"}`}
                onClick={() => setSelectedWorkspace(ws._id)}
              >
                <div className="poppins flex flex-row items-center justify-center gap-2">
                  <div
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-[4px] text-[13px] text-white"
                    style={{ backgroundColor: stringToColor(ws.name) }}
                  >
                    {ws.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-[13px] font-medium">{ws.name}</p>
                </div>

                {/* Check */}
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border border-[#565656]/20 transition-all duration-300 ${selectedWorkspace === ws._id ? "bg-black" : "bg-white"}`}
                >
                  {selectedWorkspace === ws._id && (
                    <svg
                      className="h-3 w-3 text-white"
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
          className="poppins rounded-sm bg-[#111] py-[10px] text-[12px] font-medium text-[#fff] transition-all duration-300 hover:bg-[#000] disabled:bg-[#565656]/10 disabled:text-[#565656]/50"
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
