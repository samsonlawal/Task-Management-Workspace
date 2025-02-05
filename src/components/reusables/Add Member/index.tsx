import React from "react";

export default function AddMember() {
  return (
    <div className="font-madei flex h-fit w-full flex-col justify-center gap-[12px] border-y-[1px] border-[#C7C7C7] p-[18px] py-[20px]">
      {/* <p className="font-regular text-[15px] leading-tight text-[#565656]">
        Members:
      </p> */}
      <div className="flex flex-row -space-x-[10px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex h-10 w-10 -translate-x-2 transform items-center justify-center rounded-full border-2 border-white bg-gray-300 text-sm text-[#565656] transition-transform duration-300 first:translate-x-0 hover:translate-x-0"
          >
            {index === 4 && "+6"}
          </div>
        ))}
      </div>
      <p className="font-regular text-[15px] leading-tight text-[#565656]">
        Add new members to expand your workspace.
      </p>
      <button className="font-regular flex h-10 w-full items-center justify-center gap-[16px] rounded-[5px] bg-[#242424] text-[14px] text-white transition-all duration-300 hover:bg-black">
        <img src="/icons/tema-white.svg" alt="" />
        Add Member
      </button>
    </div>
  );
}
