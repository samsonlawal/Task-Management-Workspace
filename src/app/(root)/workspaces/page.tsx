"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Home } from "lucide-react";
import { useGetUserWorkspaceQuery } from "@/redux/api/workspaceApiSlice";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import Brand from "@/components/reuseables/Brand";
import Invitation from "@/components/reuseables/Invitation";
import stringToColor from "@/utils/stringToColor";
import { saveToLocalStorage } from "@/utils/localStorage/AsyncStorage";
import AddWorkspace from "@/components/reuseables/Dialogs/AddWorkspace";


function Workspaces() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);
  const [isSkipped, setIsSkipped] = useState(false);
  const [invitesCount, setInvitesCount] = useState(0);
  const [isCreatingMode, setIsCreatingMode] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const { user } = useSelector((state: any) => state.auth);

    const {
    data: workspacesData,
    isLoading: workspacingLoading,
    isFetching,
    isSuccess
  } = useGetUserWorkspaceQuery(
    { userId: user?._id },
    { skip: !user?._id }
  );

  const ler = false

  function handleContinue() {
    if (selectedWorkspace) {
      const id = selectedWorkspace?._id;
      const slug = selectedWorkspace?.slug || selectedWorkspace._id;
      saveToLocalStorage({ key: "CurrentWorkspaceId", value: id });
      dispatch(setCurrentWorkspace(id));
      router.push(`/${slug}/tasks`);
    }
  }

   const workspaces = workspacesData?.workspaces || workspacesData || [];

  const hasInvitations = invitesCount > 0;
  const showInvitations = hasInvitations && !isSkipped;
  const isLoadingWorkspaces = workspacingLoading || isFetching;
  const hasNoWorkspaces =
    !isLoadingWorkspaces  && workspaces.length === 0;

  const showCreateWorkspaceScreen =
    !showInvitations && (hasNoWorkspaces || isCreatingMode);



      async function handleCreateWorkspace(e: React.FormEvent) {
        e.preventDefault
      }




  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-[20px] bg-white dark:bg-[#111]">
      {/* Home Navigation Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-900 shadow-sm transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
        >
          <Home size={15} />
          <span>Home</span>
        </Link>
      </div>


      <Brand />

      {/* Loading state spinner to prevent premature screen flash */}
      { !isSuccess ? 
      
      // ({isLoadingWorkspaces && 
        (
        <div className="flex flex-col items-center gap-3 p-8">
          {/* <Loader2 className="h-6 w-6 animate-spin text-[#111] dark:text-white" /> */}
          <p className="text-sm poppins text-[#111]/80 dark:text-[#fff]/60">Loading your workspaces...</p>
        </div>
      )
    // } ) 
  :



 ( <>
     {/* View invitations if skipped */}
      {hasInvitations && isSkipped && (
        <button
          onClick={() => setIsSkipped(false)}
          className="poppins flex items-center gap-1.5 rounded-sm border border-[#565656]/20 bg-[#565656]/10 dark:bg-[#1a1a1a]/40 px-3 py-1 text-[12px] font-normal text-[#565656] dark:text-white/50 transition-all hover:bg-[#565656]/20 dark:hover:bg-[#1a1a1a]/80 dark:hover:text-white"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          View Pending Invitations - {invitesCount}
        </button>
      )}

      {/* Invitation Card */}
      {!isSkipped && (
        <Invitation
          onInviteAccepted={() => {}}
          onSkip={() => setIsSkipped(true)}
          onInvitesCountChange={(count) => setInvitesCount(count)}
        />
      )}

      {!isLoadingWorkspaces && showCreateWorkspaceScreen && (
        <div className="flex w-[360px] flex-col gap-4 rounded-lg  p-6 py-10 shadow-lg 0">
          <div className="flex flex-col text-left">
            <h1 className="poppins text-[16px] font-medium text-[#111] dark:text-white">
              Create a Workspace
            </h1>
            <p className="poppins mt-0.5 text-[12px] text-[#565656] dark:text-[#fff]/50">
              {hasNoWorkspaces
                ? "You don't have any workspaces yet. Create one to get started."
                : "Enter a name to set up your workspace."}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <AddWorkspace variant="button" />
            {workspaces && workspaces.length > 0 && (
              <button
                type="button"
                onClick={() => setIsCreatingMode(false)}
                className="text-[12px] text-[#565656] hover:text-[#111] dark:text-white/50 dark:hover:text-white"
              >
                Back to Select Workspace
              </button>
            )}
          </div>
        </div>
      )}

      {/* Select Workspace Screen (When user has existing workspaces) */}
      {!isLoadingWorkspaces && !showInvitations && !showCreateWorkspaceScreen && (
        <div className="flex flex-col gap-4 rounded-lg border-[1px] border-[#EEEEEE] bg-[#565656]/5 p-6 dark:border-[#565656]/20 dark:bg-[#1a1a1a]/50">
          {/* Header */}
          <div className="flex flex-col text-left">
            <h1 className="poppins text-[15px] font-medium text-[#111] dark:text-white">
              Select Workspace
            </h1>
            <p className="poppins text-[12px] text-[#111]/80 dark:text-[#fff]/50">
              Choose where you want to continue your work or create.
            </p>
          </div>

          {/* List */}
          <div className="flex flex-col gap-1 rounded-[6px] border-[1px] border-[#565656]/20 bg-[#EEEEEE]/20 p-4 transition-all duration-300 dark:bg-[#111]/20">
            {workspacingLoading ? (
              <div className="flex justify-center p-4 transition-all duration-300">
                <p className="text-[#fff]40 text-sm">Loading workspaces...</p>
              </div>
            ) : workspaces && workspaces.length > 0 ? (
              workspaces.map((ws: any) => (
                <div
                  key={ws._id}
                  className={`flex h-[42px] w-[317px] cursor-pointer flex-row items-center justify-between rounded-[4px] p-[6px] transition-all duration-300 hover:bg-[#565656]/10 ${selectedWorkspace?._id === ws._id ? "border-[1px] border-[#565656]/10 bg-[#565656]/10 text-[#111]" : "text-[#565656]"}`}
                  onClick={() => setSelectedWorkspace(ws)}
                >
                  <div className="poppins flex flex-row items-center justify-center gap-2">
                    <div
                      className="flex h-[30px] w-[30px] items-center justify-center rounded-[4px] text-[13px] font-medium text-[#111] dark:text-white"
                      style={{ backgroundColor: stringToColor(ws.name) }}
                    >
                      {ws.name.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-[13px] font-medium text-[#111] dark:text-white">
                      {ws.name}
                    </p>
                  </div>

                  {/* Check */}
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border border-[#565656]/40 transition-all duration-300 ${selectedWorkspace?._id === ws._id ? "bg-[#111] dark:bg-white" : "bg-transparent"}`}
                  >
                    {selectedWorkspace?._id === ws._id && (
                      <svg
                        className="h-3 w-3 text-white dark:text-[#111]"
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
                <p className="text-sm text-[#fff]/60">No workspaces found</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              className="poppins w-full rounded-sm bg-[#111] py-[10px] text-[12px] text-white font-medium transition-all duration-300 hover:bg-[#111]/90 disabled:bg-[#565656]/10 disabled:text-[#565656]/50 dark:bg-[#fff] dark:text-[#111] dark:hover:bg-[#fff]/80"
              disabled={!selectedWorkspace}
              onClick={handleContinue}
            >
              Select and Continue
            </button>
            {/* <AddWorkspace variant="button" /> */}
          </div>
        </div>
      )}
 
 
 </>)
      }
    </div>
  );
}

export default Workspaces;
