"use client";

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { CustomSelect } from "../../select";
import Button from "../../Button";
import { useEditMemberRole } from "@/hooks/api/workspace";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useSelector } from "react-redux";

interface EditRoleProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  currentRole: string;
  onSuccess: () => void;
}

export default function EditRole({
  isOpen,
  onClose,
  userId,
  currentRole,
  onSuccess,
}: EditRoleProps) {
  const [role, setRole] = useState(currentRole);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { currentWorkspace } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const { onEditMemberRole, loading } = useEditMemberRole();

  useEffect(() => {
    if (isOpen) {
      setRole(currentRole);
    }
  }, [isOpen, currentRole]);

  const handleRoleChange = (value: string) => {
    setRole(value);
  };

  const handleSave = () => {
    if (!userId) return;

    if (role === currentRole) {
      onClose();
      return;
    }

    onEditMemberRole({
      workspaceId: currentWorkspace,
      memberId: userId,
      payload: { role },
      successCallback: () => {
        showSuccessToast({ message: "Role updated successfully!" });
        onSuccess();
        onClose();
      },
      errorCallback: ({ message }) => {
        showErrorToast({ message });
      },
    });
  };

  const handleDialogClose = () => {
    if (!isSelectOpen) {
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleDialogClose}
      transition
      className="fixed inset-0 z-50 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="poppins h-fit rounded-xl bg-white px-8 py-8 dark:bg-[#111] md:w-[400px]">
          <DialogTitle className="flex flex-row items-center justify-between font-medium">
            <p className="text-[15px]">Edit Role</p>
            <div
              onClick={onClose}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
            >
              {/* Close Icon if needed */}
            </div>
          </DialogTitle>
          <Description className="pb-6">
            <p className="w-[100%] text-[12px] leading-4 text-[#777]">
              Change the role of this member.
            </p>
          </Description>
          <div
            className="flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row gap-2">
              <CustomSelect
                options={[
                  { label: "Member", value: "Member" },
                  { label: "Admin", value: "Admin" },
                ]}
                placeholder="Role"
                value={role}
                onChange={handleRoleChange}
                onOpenChange={setIsSelectOpen}
                className="w-full bg-[#565656]/10 dark:border-[#565656]/20"
              />
            </div>
            <div className="mt-2 flex justify-end gap-3 text-[14px]">
              <button
                className="rounded bg-gray-200 px-5 py-2 text-[12px] font-normal text-black transition-all duration-300 hover:bg-gray-300 dark:bg-[#333] dark:text-white dark:hover:bg-[#444]"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="rounded bg-[#222] px-5 py-2 text-[12px] font-normal text-white transition-all duration-300 hover:bg-[#111] dark:bg-[#fff] dark:text-[#111]"
                onClick={handleSave}
              >
                {!loading ? (
                  "Save Changes"
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
  );
}
