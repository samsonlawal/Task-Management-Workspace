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
import Button from "../../Button";
import { faUserPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TAddMember } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useAddMember, useGetMembers } from "@/hooks/api/workspace";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { setMembers } from "@/redux/Slices/memberSlice";

export default function AddMember() {
  const dispatch = useDispatch();

  let [isOpen, setIsOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [workspace_id, setWorkspaceId] = useState<string>("");
  // const [workspace_name, setWorkspaceName] = useState<string>("");

  const [member, setMember] = useState<TAddMember>({
    email: "",
    role: "",
    workspaceName: "",
  });

  const { currentWorkspace } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const { onAddMember, loading: addMemberLoading } = useAddMember();
  const {
    data: memberData,
    onGetMembers,
    loading: getMembersLoading,
  } = useGetMembers();

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

  const handleAddMember = () => {
    const { email, role, workspaceName } = member; // Make sure jobTitle is included
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

    onAddMember({
      workspaceId: workspace_id,
      payload: {
        email,
        role,
        workspaceName,
        // jobTitle, // Include jobTitle in the payload
      },
      successCallback: async () => {
        showSuccessToast({ message: "Member Added Successfully!" });

        // Add the new member to the existing list
        await onGetMembers({ workspaceId: workspace_id });
        console.log("New tasks:", memberData);

        handleDialogClose();
      },
      errorCallback: ({ message }) => {
        showErrorToast({ message });
      },
    });
  };

  // Toggle the main dialog
  const toggleDialog = () => {
    setIsOpen(!isOpen);

    getFromLocalStorage({
      key: "CurrentWorkspaceId",
      cb: (id: string) => {
        if (id) {
          setWorkspaceId(id);
          // setTask((prevTask) => ({
          //   ...prevTask,
          //   workspace_id: id,
          // }));
          // console.log(id);
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

  // Only close the dialog if the select isn't open
  // const handleDialogClose = () => {
  //   if (!isSelectOpen) {
  //     setIsOpen(false);
  //   }
  // };

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
      <button
        onClick={toggleDialog}
        className="flex h-[36px] w-fit items-center justify-center gap-1 rounded-[6px] bg-[#111] px-3 text-[12px] font-normal text-[#fff] transition-all duration-300 hover:bg-[#242424] dark:bg-[white] dark:text-[#111]"
      >
        {/* <FontAwesomeIcon icon={faCirclePlus} /> */}
        <FontAwesomeIcon icon={faUserPlus} />
        Add Member
        {/* <FontAwesomeIcon icon={faChevronDown} /> */}
      </button>
      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="h-fit max-w-[540px] space-y-2 rounded-xl bg-white px-8 py-8">
            <DialogTitle className="flex flex-row items-center justify-between font-medium">
              <p className="text-[18px]">Invite New Member</p>
              <div
                onClick={() => setIsOpen(false)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black"
              >
                <FontAwesomeIcon icon={faXmark} className="fa-sm text-white" />
              </div>
            </DialogTitle>
            <Description className="pb-6">
              <p className="w-[80%] text-[14px] font-light leading-4 text-[#777]">
                New members will gain access to your workspace and can start
                collaborating immediately.
              </p>
            </Description>
            <div
              className="flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-row gap-2">
                <input
                  name="email"
                  type="email"
                  value={member.email}
                  placeholder="Enter email address"
                  className="h-[36px] flex-1 rounded-md border-[1px] border-gray-400 px-2 text-[14px] font-light text-[#444] placeholder-[#999] outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
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
                />
              </div>
              <div className="flex gap-3 text-[14px]">
                <Button
                  text="Cancel"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-black hover:bg-gray-300"
                />
                {/* <Button
                  text="Invite"
                  onClick={handleAddMember}
                  className="bg-[#222] px-7 text-white hover:bg-[#111]"
                /> */}
                <button
                  className="w-[100px] rounded bg-[#222] py-2 font-normal text-white transition-all duration-300 hover:bg-[#111]"
                  onClick={handleAddMember}
                >
                  {!addMemberLoading ? (
                    "Invite"
                  ) : (
                    <span className="flex w-full items-center justify-center">
                      <img
                        src="/icons/loaderWhite.svg"
                        alt=""
                        className="w-4 animate-spin"
                      />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
