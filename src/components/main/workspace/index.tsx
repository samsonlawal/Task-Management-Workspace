import Criteria from "@/components/reusables/Criteria";
import WSHeading from "@/components/reusables/WSHeading";
import React from "react";
import tasks from "@/components/data";
import Navbar from "../navbar";

export default function Workspace() {
  const CriteriaList = ["TO-DO", "IN-PROGRESS", "AWAITING REVIEW"];
  return (
    <div className="flex flex-1 flex-col gap-8 pb-[31px] font-madei">
      <Navbar />
      {/* <WSHeading /> */}
      <div className="flex flex-row flex-wrap items-start justify-between gap-5 px-[32px]">
        {CriteriaList.map((text, index) => (
          <Criteria key={index} text={text} />
        ))}
      </div>
    </div>
  );
}
