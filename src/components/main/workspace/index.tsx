import Criteria from "@/components/reusables/Criteria";
import WSHeading from "@/components/reusables/WSHeading";
import React from "react";

export default function Workspace() {
  return (
    <div className="flex flex-1 flex-col gap-8 rounded-bl-[15px] rounded-tl-[15px] px-[18px] py-[31px] font-madei">
      <WSHeading />
      <Criteria />
    </div>
  );
}
