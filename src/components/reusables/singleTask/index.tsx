import React from "react";

export default function SingleTask({
  desc,
  // tags,
  deadline,
  name,
  email,
  image,
  // priority,
}: {
  desc: string;
  // tags: [];
  deadline: any;
  name: string;
  email: string;
  image: string;
  // priority: string;
}) {
  const priorityColors = {
    high: "border-[#c92727]",
    medium: "border-[#F39C12]",
    // neutral: "border-[#707070]",
  };

  const getBgColor = (firstName: string) => {
    const colors: any = {
      A: "bg-red-500", // Red for 'A'
      B: "bg-blue-500", // Blue for 'B'
      C: "bg-green-500", // Green for 'C'
      D: "bg-yellow-500", // Yellow for 'D'
      // Add more letters/colors as needed
    };

    const firstLetter: string = firstName
      ? firstName.charAt(0).toUpperCase()
      : "";
    return colors[firstLetter] || "bg-gray-500"; // Default to gray if no match
  };

  // const color =
  //   priority in priorityColors
  //     ? priorityColors[priority as keyof typeof priorityColors]
  //     : "bg-[#C0C0C0]";

  return (
    <div className="group relative flex max-h-[189px] min-h-[116px] w-[244px] flex-col justify-between gap-5 rounded-[6px] bg-gray-200 pb-2 pt-2 text-[14px] font-regular">
      <p className="line-clamp-2 h-fit px-[14px] leading-4">{desc}</p>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 px-[14px]">
          {/* <div className="flex flex-row gap-1">
            <span className="rounded-full bg-[#ffce2b] px-2">work</span>
            <span className="rounded-full bg-[#64BC21] px-2">sales</span>
          </div> */}
          <p className="text-[12px] text-[#707070]">
            Deadline:{" "}
            {new Date(deadline).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div
          className={`flex w-full flex-row items-center gap-2 border-t-[1px] border-[#c0c0c0] px-[12px] pt-2`}
        >
          <div
            className={`flex h-[25px] w-[25px] items-center justify-center rounded-full ${image === "none" || "" ? getBgColor(name) : ""}`}
          >
            {image !== "none" || "" ? (
              <img
                src={image}
                alt="User Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <p className="text-xs text-white">
                {name ? name.charAt(0).toUpperCase() : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-[2px] -space-y-2 overflow-hidden">
            <p className="text-[13px]">{name}</p>
            <p className="w-full truncate whitespace-nowrap text-[12px] font-light text-[#707070]">
              {email}
            </p>
          </div>
        </div>
      </div>
      {/* <div
        className={`absolute bottom-0 right-0 h-0 w-0 rounded-[4px] border-r-[10px] border-t-[10px] border-t-transparent ${color}`}
      ></div> */}

      <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 translate-y-2 scale-0 cursor-pointer items-center justify-center rounded-full bg-white leading-none opacity-0 shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
        <img src="/icons/ex.svg" alt="" className="h-2.5 w-2.5" />
      </div>
    </div>
  );
}
