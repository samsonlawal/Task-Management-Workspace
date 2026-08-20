"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAcceptInvite, useGetPendingInvites } from "@/hooks/api/workspace";

import {
  useGetPendingInvitesQuery,
  useAcceptInviteMutation,
} from "@/redux/api/workspaceApiSlice";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";

interface Invite {
  workspaceName: string;
  workspaceId: string;
  role: string;
  inviteExpires: string;
  inviteToken: string;
  email: string;
  membershipId: string;
}

type InviteResponse = {
  data: Invite[];
};

interface InvitationProps {
  onInviteAccepted?: () => void;
  onSkip?: () => void;
  onInvitesCountChange?: (count: number) => void;
}

function Invitation({
  onInviteAccepted,
  onSkip,
  onInvitesCountChange,
}: InvitationProps) {
  const [invites, setInvites] = useState<InviteResponse>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { user } = useSelector((state: any) => state.auth);

  // Fetch pending invites
  const { data: invite, isLoading: invitesLoading } = useGetPendingInvitesQuery(
    { userId: user?._id },
    { skip: !user?._id },
  );

  // Accept invite mutation
  const [acceptInvite, { isLoading: acceptInviteLoading }] =
    useAcceptInviteMutation();

  useEffect(() => {
    if (invite) {
      console.log("invitations", invite);
      setInvites(invite);
      const count = invite.data?.length || 0;
      onInvitesCountChange?.(count);
      // Adjust current index if it exceeds array length
      if (currentIndex >= count && count > 0) {
        setCurrentIndex(count - 1);
      }
    }
  }, [invite]);

  const totalInvites = invites?.data?.length || 0;

  async function handleAcceptInvite() {
    const currentInvite = invites?.data?.[currentIndex];
    if (!currentInvite) return;
    const { membershipId, email } = currentInvite;

    try {
      await acceptInvite({
        membershipId,
        email,
      }).unwrap();
      showSuccessToast({ message: "Invitation accepted!" });
      onInviteAccepted?.();
    } catch (err: any) {
      showErrorToast({
        message: err?.data?.message || "Failed to accept invite",
      });
    }
  }

  function handleNext() {
    if (totalInvites <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalInvites);
  }

  if (!totalInvites) return null;

  const currentInvite = invites?.data?.[currentIndex];
  const expiresDays = currentInvite?.inviteExpires
    ? Math.ceil(
        (Number(currentInvite.inviteExpires) - Date.now()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;

  return (
    <div className="flex flex-col gap-1">
      {/* Top Bar: Title & Counter / Navigation */}
      <div className="flex items-center justify-between">
        <span className="poppins px-2 py-[2px] text-[12px] font-normal text-[#565656] dark:text-white/50">
          Invitations{" - "}
          {totalInvites > 0 ? `${currentIndex + 1} of ${totalInvites}` : ""}
        </span>

        {totalInvites > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={handleNext}
              type="button"
              className="poppins flex w-fit items-center justify-center rounded-sm px-2 py-1 text-[#111]/80 dark:text-white/50 transition-all hover:text-[#111]/80 dark:hover:text-white"
              title="Next Invitation"
            >
              <p className="text-[12px]">Next</p>
            </button>
          </div>
        )}
      </div>

      <div className="flex w-[400px] flex-col gap-3 rounded-lg border-[1px] border-[#565656]/10 dark:bg-[#1a1a1a]/50  p-5">
        {/* Main Invitation Details */}
        <div className="flex flex-col text-left">
          <h1 className="poppins text-[15px] font-medium text-[#111] dark:text-white">
            Invitation to join{" "}
            <span className="rounded-sm text-[#111] dark:text-white">
              {currentInvite?.workspaceName}
            </span>
          </h1>
          <p className="poppins text-[12px] text-[#111]/80 dark:text-[#fff]/60">
            You've been invited to join as an{" "}
            <span className="font-normal text-[#111] dark:text-white">
              {currentInvite?.role}
            </span>
            . Invite expires in{" "}
            <span className="font-normal text-[#111] dark:text-white">{expiresDays}</span>{" "}
            {expiresDays > 1 ? "days." : "day."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            className="poppins flex-1 rounded-sm bg-[#111] dark:bg-white px-4 py-[7px] text-[12px] text-[#fff] dark:text-[#111] transition-all duration-300 hover:bg-[#111]/90 dark:hover:bg-white/90 disabled:opacity-50"
            disabled={acceptInviteLoading}
            onClick={handleAcceptInvite}
          >
            {acceptInviteLoading ? "Accepting..." : "Accept Invite"}
          </button>
        </div>
      </div>
      {onSkip && (
        <button
          className="poppins transition-a;; group flex w-full items-center justify-center gap-1 px-3 py-[8px] text-[12px] font-normal text-[#111] dark:text-white/80 duration-300 hover:gap-2"
          onClick={onSkip}
          type="button"
        >
          <p className="text-center">Skip for now</p>
          <svg
            className="inline h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          {/* </span> */}
        </button>
      )}
    </div>
  );
}

export default Invitation;
