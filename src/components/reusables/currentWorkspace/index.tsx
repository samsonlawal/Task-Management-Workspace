import React from "react";
import Switch from "../switchWorkSpace";

export default function CurrentWorkspace() {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex w-full flex-col justify-between gap-[8px]">
        <div className="flex w-full flex-row justify-between">
          <p>Workspace</p>
          <img src="/icons/caret-down-gray.svg" alt="" />
        </div>
        <div className="flex flex-row items-center gap-[8px]">
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[5px] bg-[green] text-white">
            In
          </div>
          <p>Infinty</p>
        </div>
      </div>
      <Switch />
    </div>
  );
}
