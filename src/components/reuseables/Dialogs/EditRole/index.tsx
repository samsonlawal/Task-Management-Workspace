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
import { Loader2 } from "lucide-react";

interface EditRoleProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  currentRole: string;
  email: string;
  workspaceId: string;
  onSuccess: () => void;
}

export default function EditRole({
  isOpen,
  onClose,
  userId,
  currentRole,
  email,
  workspaceId,
  onSuccess,
}: EditRoleProps) {
  const [role, setRole] = useState(currentRole);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { currentWorkspaceId } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const { onEditMemberRole, loading } = useEditMemberRole();

  useEffect(() => {
    if (isOpen) {
      setRole(currentRole);
    }
  }, [isOpen, currentRole, userId, email]);

  const handleRoleChange = (value: string) => {
    setRole(value);
  };

  const handleSave = () => {
    if (!userId) {
      return;
    }

    if (role === currentRole) {
      onClose();
      return;
    }

    onEditMemberRole({
      workspaceId: currentWorkspaceId,
      memberId: userId,
      payload: { role },
      successCallback: () => {
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
        <DialogPanel className="poppins flex h-fit flex-col gap-4 rounded-xl bg-white px-8 py-8 dark:bg-[#111] md:w-[500px]">
          <DialogTitle className="flex flex-row items-center justify-between">
            <p className="text-[14px]">Assign new role</p>
            <div
              onClick={onClose}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
            >
              {/* Close Icon if needed */}
            </div>
          </DialogTitle>
          <div
            className="flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row items-end justify-center gap-2">
              <div className="flex flex-1 flex-col gap-1">
                <label className="text-[12px] text-[#fff]/50">Email</label>
                <input
                  type="text"
                  value={email}
                  disabled
                  className="w-full cursor-not-allowed rounded-md border border-[#565656]/5 bg-[#565656]/5 px-3 py-2 text-[13px] text-[#565656]"
                />
              </div>
              <div className="flex flex-col gap-2">
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
            </div>

            <div className="flex justify-start gap-3 text-[14px]">
              <button
                className="flex items-center gap-1.5 rounded-md bg-[#609328] px-5 py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span>Saving</span>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                  </>
                ) : (
                  <span>Save</span>
                )}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
