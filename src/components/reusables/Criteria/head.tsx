import React from "react";

export default function Head() {
  return (
    <div className="flex h-[51px] w-full flex-row items-center justify-between bg-[#DBDBDB] px-[16px]">
      <p>
        TO DO
        <span className="text-[#707070]"> - 6</span>
      </p>

      <img src="icons/expand.svg" alt="" className="cursor-pointer" />
    </div>
  );
}
