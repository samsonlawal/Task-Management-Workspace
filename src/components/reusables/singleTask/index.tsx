import React from "react";

export default function SingleTask({
  desc,
  // tags,
  deadline,
  name,
  email,
  priority,
}: {
  desc: string;
  // tags: [];
  deadline: any;
  name: string;
  email: string;
  priority: string;
}) {
  const priorityColors = {
    high: "border-[#c92727]",
    medium: "border-[#F39C12]",
    // neutral: "border-[#707070]",
  };

  const color =
    priority in priorityColors
      ? priorityColors[priority as keyof typeof priorityColors]
      : "bg-[#C0C0C0]";

  return (
    <div className="group relative flex h-fit max-h-[189px] w-[264px] flex-col justify-between gap-5 rounded-[6px] bg-[#DBDBDB] pb-2 pt-2 text-[14px] font-regular">
      <p className="line-clamp-2 px-[14px] leading-4">{desc}</p>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 px-[14px]">
          <div className="flex flex-row gap-1">
            <span className="rounded-full bg-[#ffce2b] px-2">work</span>
            <span className="rounded-full bg-[#64BC21] px-2">sales</span>
          </div>
          <p className="text-[14px] text-[#707070]">
            Deadline:{" "}
            {new Date(deadline).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div
          className={`bg-red] flex flex-row items-center gap-2 border-t-[1px] border-[#c0c0c0] px-[14px] pt-2`}
        >
          <div className={`h-[30px] w-[30px] rounded-full bg-[#c7c7c7]`}> </div>
          <div className="flex flex-col items-start -space-y-2">
            <p>{name}</p>
            <p className="text-[14px] font-light text-[#707070]">{email}</p>
          </div>
        </div>
      </div>
      <div
        className={`absolute bottom-0 right-0 h-0 w-0 rounded-[4px] border-r-[10px] border-t-[10px] border-t-transparent ${color}`}
      ></div>

      <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 translate-y-2 scale-0 cursor-pointer items-center justify-center rounded-full bg-white leading-none opacity-0 shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
        <img src="/icons/ex.svg" alt="" className="h-2.5 w-2.5" />
      </div>
    </div>
  );
}
