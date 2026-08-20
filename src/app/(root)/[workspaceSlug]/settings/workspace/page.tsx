"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Upload, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetMembersQuery } from "@/redux/api/memberApiSlice";
import stringToColor from "@/utils/stringToColor";

import { useDeleteWorkspaceMutation } from "@/redux/api/workspaceApiSlice";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import { setWorkspace } from "@/redux/Slices/workspaceSlice";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";

export default function WorkspaceSettingsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [deleteWorkspace] = useDeleteWorkspaceMutation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");


  const currentWorkspaceId = useSelector(
    (state: RootState) => state.currentWorkspace.currentWorkspaceId,
  );

    const currentWS = useSelector(
    (state: RootState) => state.currentWorkspace,
  );

  const workspaceData = useSelector((state: any) => state.WorkspaceData.workspace);

  // 1. Fetch members to ensure member data is available for role check
  const { data: membersData, isLoading: isMembersLoading } = useGetMembersQuery(
    { workspaceId: currentWorkspaceId as string },
    { skip: !currentWorkspaceId },
  );

  const members = useMemo(() => {
    return membersData?.members || membersData?.data || (Array.isArray(membersData) ? membersData : []);
  }, [membersData]);
  const { user } = useSelector(
    (state: RootState) => state.auth as { user: any }
  );
  const isOwner = workspaceData?.owner === user._id;
  // const isOwner = false


  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  useEffect(() => {
    if (workspaceData) {
      setFormData({
        name: workspaceData.name || "",
        slug: workspaceData.slug || workspaceData._id || "",
      });

      console.log(isOwner)
    }
    // console.log(workspaceData)
    // console.log(members)
    // console.log(user)
  }, [workspaceData, membersData, currentWS]);

  const handleDelete = async () => {

    if(!isOwner || deleteInput !== workspaceData?.name) {
      showErrorToast({ message: `Failed to delete workspace` });
      return
    };

    try {
      await deleteWorkspace({
        workspaceId: currentWorkspaceId as string
      }).unwrap()

      dispatch(setCurrentWorkspace(null))
      dispatch(setWorkspace(null))
      showSuccessToast({ message: `workspace deleted successfully!` });
      router.push('/workspaces')
    } catch (error: any) {
      showErrorToast({ message: `Failed to delete workspace` });
      console.error("Failed to delete workspace:", error);    }
  }

  if (isMembersLoading) {
    return null; 
  }

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
            <div 
              className="flex h-[60px] w-[60px] items-center justify-center rounded-full text-[20px] font-semibold text-white"
              style={{
                backgroundColor: workspaceData?.name ? stringToColor(workspaceData.name) : "#4f46e5",
              }}
            >
              {workspaceData?.name?.charAt(0)?.toUpperCase() || "W"}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[13px]">Workspace Logo</p>
              <div className="flex flex-row gap-2">
                <button 
                  disabled={!isOwner}
                  className={`rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium text-[#fff]/50 transition-colors duration-300 ${isOwner ? "hover:border-[#565656]/20 hover:bg-[#565656]/20 hover:text-white/50" : "opacity-50 cursor-not-allowed"}`}
                >
                  Upload Image
                </button>
                <button 
                  disabled={!isOwner}
                  className={`rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium text-[#fff]/50 transition-colors duration-300 ${isOwner ? "hover:border-[#565656]/20 hover:bg-[#565656]/20 hover:text-white/50" : "opacity-50 cursor-not-allowed"}`}
                >
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
                disabled={!isOwner}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`h-[40px] w-full rounded-[6px] border-[1px] border-[#565656]/20 bg-transparent px-[12px] text-[12px] placeholder:text-[#565656] focus:outline-none dark:text-[#fff]/80 ${isOwner ? "focus:border-[#565656]" : "cursor-not-allowed"}`}
              />
            </div>

            {/* URL Input */}
            <div className="flex flex-col gap-1">
              <h1 className="text-[13px]">Workspace URL</h1>
              <div className={`flex h-[40px] w-full items-center rounded-[6px] border-[1px] border-[#565656]/20 bg-transparent select-none font-normal px-[12px] ${isOwner ? "focus-within:border-[#565656]" : ""}`}>
                <span className="text-[12px] text-[#fff]/40">app.stacktask.com/</span>
                <input
                  type="text"
                  disabled={!isOwner}
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className={`w-full bg-transparent text-[12px] placeholder:text-[#565656] focus:outline-none dark:text-[#fff]/80 ${!isOwner ? "cursor-not-allowed" : ""}`}
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
              <select 
                disabled={true}
                className={`mt-1 h-[40px] w-full rounded-[6px] border-[1px] border-[#565656]/20 font-normal bg-transparent px-[12px] text-[12px] focus:outline-none dark:text-[#fff]/80 ${isOwner ? "focus:border-[#565656] cursor-not-allowed" : "opacity-50 cursor-not-allowed"}`}
              >
                <option className="dark:bg-[#111]">Admins only</option>
                <option className="dark:bg-[#111]">Members and Admins</option>
                <option className="dark:bg-[#111]">Workspace Owner only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex w-full items-center justify-end rounded-b-[14px] p-6 dark:bg-[#1a1a1a]">
          <button 
            disabled={!isOwner}
            className={`rounded-md border-[1px] border-[#565656]/60 bg-[white] px-[12px] py-1 text-[11px] font-medium text-[#111] transition-colors duration-300 ${isOwner ? "hover:border-[#565656]/10 hover:bg-[#565656]/10 hover:text-white/50" : "opacity-50 cursor-not-allowed bg-none"}`}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Danger Zone: Only shown for admins/owners */}
      {isOwner && (
        <div className="flex h-fit w-full flex-col items-start justify-center gap-2 rounded-[14px] border-[1px] border-[#565656]/20 bg-[#fff] px-6 py-6 transition-all duration-300 dark:bg-[#111]">
          <div className="flex flex-col">
            <h1 className="text-[14px] text-[red]">Danger Zone</h1>
            <p className="text-[12px] text-[#565656] dark:text-[#787878]">
              Permanently delete this workspace and all of its data.{" "}
              <span className="text-[#111] dark:text-white">These actions cannot be undone.</span>
            </p>
          </div>
          <div className="flex w-full items-center justify-end mt-2">
            <button 
            onClick={() => setShowDeleteModal(true)}
            className="rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium text-[red]/80 transition-colors duration-300 hover:border-[red]/20 hover:bg-[red]/10 hover:text-[red]">
              Delete Workspace
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="flex w-full max-w-[450px] flex-col gap-8 rounded-[14px] border-[1px] border-[#565656]/20 bg-white p-6 shadow-xl dark:bg-[#111]">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-[16px] font-medium text-red-500">Delete Workspace</h2>
              {/* <div className="bg-red-700/15 rounded-sm p-2"> */}
                <p className="text-[12px] text-[#111] dark:text-[#fff]/80">
                This action is permanent and cannot be undone and all data regarding this workspacce will be lost.
              </p>
              {/* </div> */}
            </div>
            
            <div className="flex flex-col gap-2">
              <p className="text-[12px] text-[#111] font-normal dark:text-white/50">
                To confirm this action, type <strong className="font-normal dark:text-white">{workspaceData?.name}</strong> in the input below.
              </p>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                className="h-[40px] w-full rounded-[6px] border-[1px] border-[#565656]/20 bg-transparent px-[12px] text-[12px] focus:border-[#fff]/30 focus:outline-none dark:text-white"
                placeholder={workspaceData?.name}
              />
              <div className="mt-4 flex w-full flex-row justify-end gap-2">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteInput("");
                }}
                className="rounded-md border-[1px] border-[#565656]/60 px-[14px] py-1.5 text-[12px] font-normal transition-colors hover:bg-[#565656]/10"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteInput !== workspaceData?.name}
                className="rounded-md border-[1px] border-red-500/50 bg-red-500/10 px-[14px] py-1.5 text-[12px] font-normal text-red-500 transition-colors hover:bg-[red]/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:border-[#565656]/60 disabled:bg-transparent disabled:text-[#565656]"
              >
                Delete Workspace
              </button>
            </div>
            </div>

            
          </div>
        </div>
      )}

    </div>
  );
}
