"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { closeIntegrationModal } from "@/redux/Slices/modalSlice";
import ConnectAccountModal from "./ConnectAccount";

export default function GlobalModals() {
  const dispatch = useDispatch();
  const { isOpen, accountData } = useSelector(
    (state: RootState) => state.modals.integrationModal
  );

  return (
    <>
      <ConnectAccountModal
        isOpen={isOpen}
        account={accountData}
        onClose={() => dispatch(closeIntegrationModal())}
        onConnect={() => {
          // Handle connection logic globally if needed, or dispatch another action
          console.log(`Connecting to ${accountData?.name}...`);
          dispatch(closeIntegrationModal());
        }}
      />
    </>
  );
}
