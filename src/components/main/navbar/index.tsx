import React from "react";

export default function Navbar() {
  return (
    <div className="flex h-[58px] items-center justify-between px-[32px]">
      {/* Logo */}
      <div>
        <p className="text-[21px]">Management</p>
      </div>

      {/* Mode */}
      <div className="flex flex-row gap-10">
        <img src="/icons/moon-black.svg" alt="mode" />
        <p>Create Workspace</p>
      </div>
    </div>
  );
}
