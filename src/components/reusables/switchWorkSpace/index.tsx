import React from "react";

export default function Switch() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[14px] text-[#707070]">Switch Workspace</p>
      {/* other workspaces */}
      <div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-[8px]">
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[5px] bg-[#cbd627] text-white">
              JB
            </div>
            <div className="flex flex-col -space-y-[6px]">
              <p className="text-[16px]">JobBoard</p>
              <p className="text-[11px] text-[#707070]">12k Members</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[12px]">
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[5px] bg-[#27d6b0] text-white">
              M
            </div>
            <div className="flex flex-col -space-y-[6px]">
              <p className="text-[16px]">Moncs</p>
              <p className="text-[11px] text-[#707070]">9 Members</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[12px]">
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[5px] bg-[#276dd6] text-white">
              HD
            </div>
            <div className="flex flex-col -space-y-[6px]">
              <p className="text-[16px]">Help Desk</p>
              <p className="text-[11px] text-[#707070]">12k Members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
