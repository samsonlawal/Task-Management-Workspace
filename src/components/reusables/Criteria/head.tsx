import React from "react";
import tasks from "@/components/data";

export default function Head({ header }: { header: string }) {
  return (
    <div className="flex h-[51px] w-full flex-row items-center justify-between bg-[#DBDBDB] px-[16px] text-[14px]">
      <p>
        {header}
        <span className="text-[#707070]">
          {" "}
          - {tasks.filter((each) => each.status === header).length}
        </span>
      </p>

      <img src="icons/expand.svg" alt="" className="cursor-pointer" />
    </div>
  );
}
