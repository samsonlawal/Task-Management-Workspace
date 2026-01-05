"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAcceptInvite, useGetPendingInvites } from "@/hooks/api/workspace";

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

function Invitation() {
  const [invites, setInvites] = useState<InviteResponse>();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { user } = useSelector((state: any) => state.auth);
  const {
    data: invite,
    onGetPendingInvites,
    loading: invitesLoading,
  } = useGetPendingInvites(user?._id);

  useEffect(() => {
    if (invite) {
      console.log("invitations", invite);
      setInvites(invite); // set the array directly
    }
  }, [invite]);

  const { onAcceptInvite, loading: acceptInviteLoading } = useAcceptInvite();

  function handleAcceptInvite() {
    const membershipId = invites?.data?.[currentIndex]?.membershipId;

    if (!membershipId) return;
    console.log("data:", invites?.data?.[currentIndex]);
    onAcceptInvite(membershipId);
  }

  return (
    <>
      {/* {currentItem && ( */}
      <div className="flex w-[400px] flex-col gap-2 rounded-lg border-[1px] border-[#565656]/20 bg-[#1a1a1a]/50 p-5">
        {/* Header */}
        <div className="flex flex-col text-left">
          <h1 className="poppins text-[15px] font-medium text-white">
            Invitation to join{" "}
            <span>{invites?.data?.[currentIndex]?.workspaceName}</span>
          </h1>
          <p className="poppins text-[12px] text-[#fff]/50">
            You've been invited to join as an{" "}
            <span>{invites?.data?.[currentIndex]?.role}</span>.
          </p>
        </div>

        <p className="poppins text-[12px] text-[#fff]/50">
          This invite expires in{" "}
          {Math.ceil(
            (Number(invites?.data?.[currentIndex]?.inviteExpires) -
              Date.now()) /
              (1000 * 60 * 60 * 24),
          )}{" "}
          days.
        </p>

        <button
          className="poppins w-fit rounded-sm bg-[#fff] px-4 py-[6px] text-[12px] font-medium text-[#111] transition-all duration-300 hover:bg-[#fff]/80"
          // disabled={!selectedWorkspace}
          onClick={handleAcceptInvite}
        >
          Accept
        </button>
      </div>
      {/* )} */}
    </>
  );
}

export default Invitation;
