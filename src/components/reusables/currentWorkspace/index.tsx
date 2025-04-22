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
import AddWorkspace from "../Dialogs/AddWorkspace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Workspace() {
  return (
    <div className="w-full text-left font-madei">
      <Menu>
        <MenuButton className="inline-flex w-full items-center gap-2 rounded-md border-[1px] px-2 py-1.5 text-black transition-all duration-300 hover:bg-gray-100 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
          <div className="flex w-full flex-row items-center gap-[8px]">
            <span className="flex h-[29px] w-[29px] items-center justify-center rounded-[5px] bg-[#A8A8A8] text-white">
              In
            </span>
            <p>Infinity</p>
          </div>{" "}
          <FontAwesomeIcon
            icon={faChevronDown}
            className="fa-xs text-gray-500"
          />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="flex min-h-[300px] w-[234px] origin-top-right flex-col justify-between rounded-md border-[1px] bg-gray-100 px-3 py-4 font-madei text-sm/6 text-black shadow-[0px_4px_10px_rgba(0,0,0,0.001),0px_-2px_5px_rgba(0,0,0,0.001)] transition duration-300 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
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
            <AddWorkspace />
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
