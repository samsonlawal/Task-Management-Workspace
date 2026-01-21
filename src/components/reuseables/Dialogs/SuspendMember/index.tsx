"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { useSuspendMember } from "@/hooks/api/workspace";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useSelector } from "react-redux";

interface SuspendMemberProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  onSuccess?: () => void;
}

export default function SuspendMember({
  isOpen,
  onClose,
  userId,
  userName,
  onSuccess,
}: SuspendMemberProps) {
  const { currentWorkspaceId } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const { onSuspendMember, loading } = useSuspendMember();

  const handleConfirm = () => {
    onSuspendMember({
      workspaceId: currentWorkspaceId,
      memberId: userId,
      successCallback: () => {
        onSuccess?.();
        onClose();
      },
      errorCallback: ({ message }) => {
        showErrorToast({ message });
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-[60] flex w-screen items-center justify-center bg-black/30 p-4"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="poppins flex h-fit flex-col gap-2 rounded-xl bg-white px-8 py-6 dark:bg-[#111] md:w-[450px]">
          <DialogTitle className="text-[15px] font-normal">
            Suspend Member
          </DialogTitle>
          <Description className="text-[12px] font-normal text-[#777]">
            Are you sure you want to suspend{" "}
            <span className="font-normal text-black dark:text-white">
              {userName}
            </span>
            ?{" "}
            <span className="font-normal text-orange-600 dark:text-orange-400">
              They will not be able to access this workspace until unsuspended.
            </span>
          </Description>
          <div className="mt-3 flex justify-start gap-3 text-[14px]">
            <button
              className="rounded-sm bg-orange-600 px-4 py-2 text-[12px] font-normal text-white transition-all duration-300 hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleConfirm}
              disabled={loading}
            >
              {!loading ? (
                "Suspend Member"
              ) : (
                <span className="flex w-full items-center justify-center gap-2">
                  Suspending
                  <img
                    src="/icons/loaderWhite.svg"
                    alt=""
                    className="w-4 animate-spin"
                  />
                </span>
              )}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
