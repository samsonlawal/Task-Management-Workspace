"use client";

import React, { useState } from "react";
import Switch from "../switchWorkSpace";

export default function CurrentWorkspace() {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex w-full flex-col justify-between gap-[8px]">
        <div className="flex w-full">{/* <p>Workspace</p> */}</div>
        <div className="flex flex-row items-center gap-[8px] px-[12px]">
          <Workspace />
        </div>
      </div>
      {/* <AddMember /> */}
    </div>
  );
}

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function Workspace() {
  return (
    <div className="w-full text-left font-madei">
      <Menu>
        <MenuButton className="inline-flex w-full items-center gap-2 rounded-md bg-[#f7f7f7] px-2 py-2 text-black shadow-inner shadow-white/10 hover:bg-gray-200/70 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
          <div className="flex w-full flex-row items-center gap-[8px]">
            <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[5px] bg-[#A8A8A8] text-white">
              In
            </span>
            <p>Infinty</p>
          </div>{" "}
          <img src="/icons/dcaret.svg" alt="" className="cursor-pointer pr-1" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="ml-4 flex min-h-[300px] w-[280px] origin-top-right flex-col justify-between rounded-xl border-[1px] border-[#c7c7c7] bg-white px-3 py-4 font-madei text-sm/6 text-black shadow-[0px_4px_10px_rgba(0,0,0,0.001),0px_-2px_5px_rgba(0,0,0,0.001)] transition duration-100 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="flex flex-col gap-[10px]">
            {/* <MenuItem> */}
            <p className="px-2 pb-2 text-[14px] text-[#707070]">
              Switch Workspace
            </p>
            {/* </MenuItem> */}
            <MenuItem>
              <div className="flex cursor-pointer flex-row items-center gap-[12px] rounded-[4px] py-1 pl-2 hover:bg-gray-200/70">
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[5px] bg-[#A8A8A8] text-[13px] text-white">
                  JB
                </div>
                <div className="flex flex-col -space-y-[8px]">
                  <p className="text-[15px]">Help Desk</p>
                  <p className="text-[11px] text-[#707070]">12k Members</p>
                </div>
              </div>
            </MenuItem>
            {/* <div className="my-1 h-px bg-white/5" /> */}
            <MenuItem>
              <div className="flex cursor-pointer flex-row items-center gap-[12px] rounded-[4px] py-1 pl-2 hover:bg-gray-200/70">
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[5px] bg-[#A8A8A8] text-[13px] text-white">
                  HD
                </div>
                <div className="flex flex-col -space-y-[8px]">
                  <p className="text-[15px]">Moncs</p>
                  <p className="text-[11px] text-[#707070]">9 Members</p>
                </div>
              </div>
            </MenuItem>
          </div>

          <MenuItem>
            <div className="flex w-full cursor-pointer flex-row items-center rounded-[4px] py-2 pl-2 hover:bg-gray-200/70">
              <img src="/icons/plus.svg" alt="" className="cursor-pointer" />

              <p className="px-2 text-[14px] text-[#707070]">Add Workspace</p>
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
