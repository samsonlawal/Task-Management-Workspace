import React from "react";
import AddMember from "../Dialogs/AddMember";

export default function AddMemberUI() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-fit w-[92%] flex-col justify-center gap-[10px] rounded-[6px] border-[1px] border-[#C7C7C7] p-[10px] py-[10px] font-madei">
        {/* <p className="font-regular text-[15px] leading-tight text-[#565656]">
        Members:
      </p> */}
        <div className="flex flex-row -space-x-[10px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex h-9 w-9 -translate-x-2 transform items-center justify-center rounded-full border-2 border-white bg-gray-300 text-sm text-[#565656] transition-transform duration-300 first:translate-x-0 hover:translate-x-0"
            >
              {index === 4 && "+6"}
            </div>
          ))}
        </div>
        <p className="text-[15px] font-regular leading-tight text-[#565656]">
          Add new members to expand your workspace.
        </p>
        <AddMember />
      </div>
    </div>
  );
}
