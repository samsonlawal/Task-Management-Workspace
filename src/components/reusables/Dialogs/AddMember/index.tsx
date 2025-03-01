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

export default function AddMember() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-full items-center justify-center gap-[16px] rounded-[5px] bg-[#242424] text-[14px] font-regular text-white transition-all duration-300 hover:bg-black"
      >
        <img src="/icons/tema-white.svg" alt="" />
        Add Member
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="h-[300px] max-w-[540px] space-y-2 rounded-xl bg-white px-10 py-8">
            <DialogTitle className="flex flex-row items-center justify-between font-medium">
              <p>Invite New Member</p>
              <img
                src="/icons/ex.svg"
                alt=""
                className="h-3 w-3 hover:cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </DialogTitle>
            <Description className="pb-6">
              <p className="text-[14px] leading-snug text-[#444]">
                New members will gain access to your workspace and can start
                collaborating immediately.
              </p>
            </Description>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="h-[36px] flex-1 rounded-md border-[1px] border-gray-500 px-2 text-[14px] font-light text-[#444] placeholder-[#444] outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                />
                <CustomSelect
                  // label="Role"
                  options={[
                    { label: "Member", value: "member" },
                    { label: "Admin", value: "admin" },
                  ]}
                  placeholder="Role"
                  onChange={(value: any) => console.log("Selected:", value)}
                />
              </div>
              <div className="flex gap-4 text-[14px]">
                {/* <button onClick={() => setIsOpen(false)} className="">
                  Cancel
                </button> */}

                <Button
                  text="Cancel"
                  onClick={() => setIsOpen(false)}
                  className="text-black"
                />
                <Button
                  text="Invite"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#000] text-white"
                />
                {/* <button onClick={() => setIsOpen(false)}>Invite</button> */}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
