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
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddWorkspace() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full cursor-pointer flex-row items-center rounded-[4px] py-2 pl-2 hover:bg-gray-200/70"
      >
        <img src="/icons/plus.svg" alt="" className="cursor-pointer" />

        <p className="px-2 text-[14px] text-[#707070]">Create Workspace</p>
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="h-fit max-w-[540px] space-y-2 rounded-xl bg-white px-8 py-8">
            <DialogTitle className="flex flex-row items-center justify-between font-medium">
              <p className="text-[18px]">Create New Workspace</p>
              <div
                onClick={() => setIsOpen(false)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black"
              >
                <FontAwesomeIcon icon={faXmark} className="fa-sm text-white" />
              </div>
            </DialogTitle>
            <Description className="pb-6">
              <p className="w-[80%] text-[14px] font-light leading-4 text-[#777]">
                Set up a space to manage your tasks and collaborate with your
                team.
              </p>
            </Description>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="spaceName" className="text-[14px]">
                    Name
                  </label>
                  <input
                    name="spaceName"
                    type="text"
                    placeholder="Enter space name"
                    className="h-[36px] w-full rounded-md border-[1px] border-gray-400 px-2 text-[14px] font-light text-[#444] placeholder-[#999] outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="spaceName" className="text-[14px]">
                    Description
                    <span className="font-light text-[#999]">(optional)</span>
                  </label>
                  <input
                    name="spaceName"
                    type="text"
                    placeholder="Enter description"
                    className="h-[36px] w-full rounded-md border-[1px] border-gray-400 px-2 text-[14px] font-light text-[#444] placeholder-[#999] outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  />
                </div>
                {/* <CustomSelect
                  // label="Role"
                  options={[
                    { label: "Member", value: "member" },
                    { label: "Admin", value: "admin" },
                  ]}
                  placeholder="Role"
                  onChange={(value: any) => console.log("Selected:", value)}
                /> */}

                {/* <CustomSelect
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "member", label: "Member" },
                  ]}
                  placeholder="Select Role"
                  className="max-w-[110px] rounded-lg bg-gray-200"
                /> */}
              </div>
              <div className="flex gap-3 text-[14px]">
                <Button
                  text="Cancel"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-black hover:bg-gray-300"
                />
                <Button
                  text="Create"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#222] px-7 text-white hover:bg-[#111]"
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
