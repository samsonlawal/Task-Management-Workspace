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
import { TAddMember } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useAddMember, useGetMembers } from "@/hooks/api/workspace";
import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import { setMembers } from "@/redux/Slices/memberSlice";
import { useUploadAvatar } from "@/hooks/api/account";

export default function AddMember() {
  const dispatch = useDispatch();

  const { loading, onUploadAvatar } = useUploadAvatar();

  let [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);
    onUploadAvatar(formData);
  };
  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleDialog}
        className="rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium text-[#fff]/50 transition-colors duration-300 hover:border-[#565656]/10 hover:bg-[#565656]/10 hover:text-white/50"
      >
        Upload Avatar
      </button>
      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        transition
        className="poppins fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="h-fit w-[540px] space-y-2 rounded-xl bg-white px-8 py-8 dark:bg-[#111]">
            <DialogTitle className="flex flex-row items-center justify-between font-medium">
              <p className="text-[18px] font-medium text-[#111] dark:text-[#fff]">
                Upload Image
              </p>
              <div
                onClick={() => setIsOpen(false)}
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black dark:bg-[#565656]"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-[10px] text-[#fff] dark:text-[#111]"
                />
              </div>
            </DialogTitle>
            <Description className="pb-6">
              {/* <p className="w-[80%] text-[14px] font-light leading-4 text-[#777]">
                New members will gain access to your workspace and can start
                collaborating immediately.
              </p> */}
            </Description>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col items-center justify-center gap-6">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-[80px] w-[80px] rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full border-[1px] border-[#565656]/60">
                    {/* <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-[20px] text-[#565656]"
                  /> */}
                  </div>
                )}
                <label
                  htmlFor="file"
                  className="w-fit rounded-md border-[1px] border-[#565656]/60 px-[12px] py-1 text-[11px] font-medium text-[#fff]/50 transition-colors duration-300 hover:border-[#565656]/10 hover:bg-[#565656]/10 hover:text-white/50"
                >
                  Upload photo
                </label>

                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="mt-4 flex w-full items-center justify-end gap-2 rounded-b-[14px] px-6 py-5 dark:bg-[#1a1a1a]/50">
                <button
                  className={`rounded-md border-[1px] border-[#565656]/60 px-[14px] py-1 text-[11px] font-medium text-[#fff] transition-colors duration-300 hover:border-[#565656]/10 hover:bg-[#565656]/10 hover:text-white/50`}
                  onClick={() => {
                    handleDialogClose();
                    setPreview(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`rounded-md border-[1px] border-[#565656]/60 bg-[white] px-[18px] py-1 text-[11px] font-medium text-[#111] transition-colors duration-300 hover:border-[#565656]/10 hover:bg-[#565656]/10 hover:text-white/50`}
                  onClick={handleSave}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
