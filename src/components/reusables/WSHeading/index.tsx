import React from "react";

export default function WSHeading() {
  return (
    <div>
      <div className="flex flex-1 flex-row justify-between rounded-bl-[15px] rounded-tl-[15px]">
        <div className="">
          <p>
            <span className="text-[#707070]">workspaces / </span> Infinty
          </p>
        </div>

        <div className="flex flex-row gap-4">
          <p>
            Members:
            <span className="text-[#707070]"> 6</span>
          </p>
          <p>
            Online:
            <span className="text-[#707070]"> 2</span>
          </p>
        </div>
      </div>
    </div>
  );
}
