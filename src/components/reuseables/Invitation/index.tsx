"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  useGetPendingInvites,
  useGetUserWorkspace,
} from "@/hooks/api/workspace";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import Brand from "@/components/reuseables/Brand";

interface Invite {
  workspaceName: string;
  workspaceId: string;
  role: string;
  inviteExpires: string;
  inviteToken: string;
  email: string;
}

type InviteResponse = {
  data: Invite[];
};

function Invitation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [invites, setInvites] = useState<InviteResponse>();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // let currentItem = invites?.invites[currentIndex];
  // const currentInvite = invites[currentIndex];

  const { user } = useSelector((state: any) => state.auth);
  const {
    data: invite,
    onGetPendingInvites,
    loading: invitesLoading,
  } = useGetPendingInvites(user?._id);

  // Helper to generate consistent colors from strings
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };

  useEffect(() => {
    if (invite) {
      console.log("invitations", invite);
      setInvites(invite); // set the array directly
    }
  }, [invite]);

  function handleAcceptInvite() {
    if (invite) {
      console.log("data:", invites?.data);
    }
  }

  return (
    <>
      {/* {currentItem && ( */}
      <div className="flex w-[400px] flex-col gap-4 rounded-lg border-[1px] border-[#565656]/20 bg-[#1a1a1a]/50 p-6">
        {/* Header */}
        <div className="flex flex-col text-left">
          <h1 className="poppins text-[15px] font-semibold text-white">
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
          className="poppins w-fit rounded-sm bg-[#fff] px-4 py-[10px] text-[12px] font-medium text-[#111] transition-all duration-300 hover:bg-[#fff]/80"
          // disabled={!selectedWorkspace}
          onClick={handleAcceptInvite}
        >
          Accept Invitation
        </button>
      </div>
      {/* )} */}
    </>
  );
}

export default Invitation;
