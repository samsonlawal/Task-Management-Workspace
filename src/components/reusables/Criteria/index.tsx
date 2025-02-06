import React from "react";
import Head from "./head";
import SingleTask from "../singleTask";

export default function Criteria() {
  return (
    <div className="flex h-[522px] w-[312px] flex-col items-center justify-between bg-[#F2F2F2]">
      <Head />

      <div className="flex flex-col justify-between gap-4 px-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <SingleTask />
        ))}
      </div>

      <div
        className="flex h-[45px] w-full items-center justify-center border-[1px] border-[#A8A8A8]"
        style={{ borderStyle: "dashed", borderWidth: "2px" }}
      >
        <img src="/icons/plus.svg" alt="" className="cursor-pointer" />
      </div>
    </div>
  );
}
