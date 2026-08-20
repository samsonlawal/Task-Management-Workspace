"use client";

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { CustomSelect } from "../../select";

import { TAddMember } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { Loader2, UserRoundPlus, ArrowLeft } from "lucide-react";
import { useAddMemberMutation } from "@/redux/api/memberApiSlice";

interface AddWorkspaceProps {
  // trigger?: React.ReactNode;
  variant?: "sidebar" | "button";
  className?: string;
}

export default function AddMember(
{  variant = "sidebar",
  className = "",}
) {
  const dispatch = useDispatch();

  let [isOpen, setIsOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [workspace_id, setWorkspaceId] = useState<string>("");
  // const [workspace_name, setWorkspaceName] = useState<string>("");

  const [addMember, { isLoading: addMemberLoading }] = useAddMemberMutation();

  const [member, setMember] = useState<TAddMember>({
    email: "",
    role: "",
    workspaceName: "",
  });

  const { currentWorkspaceId } = useSelector(
    (state: any) => state.currentWorkspace,
  );

   const { user } = useSelector(
    (state: any) => state.auth,
  );

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      email: e.target.value,
    });
  };

  // Handle role selection change
  const handleRoleChange = (value: string) => {
    setMember({
      ...member,
      role: value,
    });
  };

  const handleAddMember = async () => {
    const { email, role, workspaceName } = member; 
    let errorMsg = "";

    if (!email) {
      errorMsg = "Email is required.";
    } else if (!role) {
      errorMsg = "Role is required.";
    }

    if (errorMsg) {
      showErrorToast({ message: errorMsg });
      return;
    }

    console.log(email, role, workspaceName);

    try {
      await addMember({
        member,
        workspaceId: currentWorkspaceId,
      });
      showSuccessToast({ message: "Member Added Successfully!" });
      handleDialogClose();
    } catch (error: any) {
      showErrorToast({
        message: error?.data?.message || "Failed to add member",
      });
    }
  };

  // Toggle the main dialog
  const toggleDialog = () => {
    setIsOpen(!isOpen);

    getFromLocalStorage({
      key: "CurrentWorkspaceId",
      cb: (id: string) => {
        if (id) {
          setWorkspaceId(id);
        }
      },
    });

    getFromLocalStorage({
      key: "WorkspaceData",
      cb: (WorksapceData: { name?: string }) => {
        if (!WorksapceData.name) return;

        setMember({
          ...member,
          workspaceName: WorksapceData?.name,
        });
      },
    });
  };

  const handleDialogClose = () => {
    if (!isSelectOpen) {
      setIsOpen(false);
      // Reset form
      setMember({
        email: "",
        role: "",
        workspaceName: "",
      });
    }
  };

  // Track select open state
  const handleSelectOpenChange = (open: boolean) => {
    setIsSelectOpen(open);
  };

  return (
    <>
      { variant === "button" ? (

      <button
        onClick={toggleDialog}
        className="flex w-full cursor-pointer flex-row items-center rounded-[4px] py-1 pl-2 transition-all duration-300 text-[#111] dark:hover:text-[#fff] dark:text-[#fff]/50 ease-in-out hover:bg-[#565656]/10"
        title="Invite Member"
      >
        <UserRoundPlus size={16} />
        <span className="px-2 text-[12px] font-normal ">Invite Member</span>
      </button>) 
      : (
      <button
        onClick={toggleDialog}
        className="poppins flex h-[32px] w-fit shrink-0 items-center justify-center gap-2 rounded-md bg-[#111] dark:bg-white px-2.5 text-[12px] font-medium shadow-sm transition-all duration-300 dark:hover:bg-zinc-100 hover:bg-[#111]/90 active:scale-95 sm:w-auto"
        title="Invite Member"
      >
        <span className="text-[12px] text-[#fff] dark:text-[#111]">Invite Member</span>
      </button>) 
      }
      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        transition
        className="fixed z-50 inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogBackdrop className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 z-50 flex w-screen items-center justify-center">
          <DialogPanel className="poppins flex flex-col justify-between items-center w-full h-screen rounded-xl bg-white px-6 py-8 dark:bg-[#111]">

  <div className="flex w-full items-center justify-between pb-6 text-xs dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3.5 py-2 font-normal transition-colors duration-300 dark:text-[#fff]/70 dark:hover:text-white"
            >
              <ArrowLeft size={14} />
              <span>Back to Workspace</span>
            </button>

            <span className="text-gray-400 dark:text-zinc-500">
              Logged in as <br />
              <strong className="font-normal text-zinc-900 dark:text-zinc-200">
                {user?.email || "user@example.com"}
              </strong>
            </span>
          </div>

           <div className="md:w-[500px]">
             <div className=" flex flex-col -space-y-1.5">
              <DialogTitle className="flex flex-row items-center justify-between font-normal">
              <p className="text-[14px]">Invite Member</p>
              <div
                onClick={() => setIsOpen(false)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
              >
                {/* <FontAwesomeIcon
                  icon={faXmark}
                  className="fa-sm text-[#111] dark:text-white"
                /> */}
              </div>
            </DialogTitle>
            <Description className="pb-6">
              <span className="w-[80%] font-normal text-[13px] text-[#fff]/60">
                Invite your team to review and collaborate on this project
              </span>
            </Description>
             </div>
            <div
              className="flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-row gap-2 relative z-50">
                <input
                  name="email"
                  type="email"
                  value={member.email}
                  placeholder="Enter email address"
                  className="h-[36px] flex-1 rounded-md border-[1px] border-gray-400 px-2 text-[12px] font-light text-[#444] placeholder-[#777] placeholder-[12px] outline-none focus:ring-2 focus:ring-[#565656]/30 focus:ring-offset-1 dark:border-[#565656]/30 dark:bg-[#565656]/10 dark:text-zinc-200"
                  onChange={handleEmailChange}
                  required
                />
                <CustomSelect
                  options={[
                    { label: "Member", value: "Member" },
                    { label: "Admin", value: "Admin" },
                  ]}
                  placeholder="Role"
                  value={member.role}
                  onChange={handleRoleChange}
                  onOpenChange={handleSelectOpenChange}
                  className="w-[110px] bg-[#565656]/10 dark:border-[#565656]/20"
                />
              </div>
              <div className="flex gap-3 text-[14px]">
                {/* <Button
                  text="Cancel"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-black hover:bg-gray-300"
                /> */}
                {/* <Button
                  text="Invite"
                  onClick={handleAddMember}
                  className="bg-[#222] px-7 text-white hover:bg-[#111]"
                /> */}
                <button
                  className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-4 py-2 text-[12px] font-medium text-zinc-900 shadow-sm transition-all hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
                  onClick={handleAddMember}
                  disabled={addMemberLoading}
                >
                  {addMemberLoading ? (
                    <>
                      <span>Sending</span>
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-900" />
                    </>
                  ) : (
                    <span>Send Invite</span>
                  )}
                </button>
              </div>
            </div>
           </div>

            <div className="text-center text-[11px] text-gray-400 dark:text-zinc-600">
            © {new Date().getFullYear()} Taskstack Inc.
          </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
