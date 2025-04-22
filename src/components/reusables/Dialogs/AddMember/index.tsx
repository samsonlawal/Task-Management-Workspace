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

export default function AddMember() {
  let [isOpen, setIsOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // Toggle the main dialog
  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  // Only close the dialog if the select isn't open
  const handleDialogClose = () => {
    if (!isSelectOpen) {
      setIsOpen(false);
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
        className="flex h-10 w-fit items-center justify-center gap-2 rounded-[5px] bg-[#242424] px-3 text-[14px] font-regular text-white transition-all duration-300 hover:bg-black"
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
                  type="email"
                  placeholder="Enter email address"
                  className="h-[36px] flex-1 rounded-md border-[1px] border-gray-400 px-2 text-[14px] font-light text-[#444] placeholder-[#999] outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                />
                <CustomSelect
                  options={[
                    { label: "Member", value: "member" },
                    { label: "Admin", value: "admin" },
                  ]}
                  placeholder="Role"
                  onChange={(value) => console.log("Selected:", value)}
                  onOpenChange={handleSelectOpenChange}
                />
              </div>
              <div className="flex gap-3 text-[14px]">
                <Button
                  text="Cancel"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-black hover:bg-gray-300"
                />
                <Button
                  text="Invite"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#222] px-7 text-white hover:bg-[#111]"
                />
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
