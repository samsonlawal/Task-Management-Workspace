import React from "react";

export default function Navbar() {
  return (
    <div className="flex w-full items-center justify-end border-b-[1px] px-[32px] py-[12px]">
      <DropdownMenu />
    </div>
  );
}

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function DropdownMenu() {
  return (
    <div className="w-fit text-left font-madei">
      <Menu>
        <MenuButton className="flex w-[230px] items-center gap-2 self-end rounded-md border-[1px] px-2 py-1.5 text-black shadow-inner shadow-white/10 hover:bg-gray-200/70 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
          <div className="flex w-full flex-row items-center gap-[8px]">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[5px] bg-[#99c485] text-white">
              D
            </span>
            <div className="flex flex-col items-start -space-y-[5px] leading-5">
              <p>Deji</p>
              <p className="text-[12px] text-[#707070]">deji@gmail.com</p>
            </div>
          </div>
          <img src="/icons/dcaret.svg" alt="" className="cursor-pointer pr-1" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="flex min-h-fit w-[230px] origin-top-right flex-col justify-between rounded-xl border-[1px] border-[#c7c7c7] bg-white px-3 py-4 font-madei text-sm/6 text-black shadow-[0px_4px_10px_rgba(0,0,0,0.001),0px_-2px_5px_rgba(0,0,0,0.001)] transition duration-100 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="flex flex-col gap-[10px]">
            {/* </MenuItem> */}
            {/* <MenuItem> */}
            <div className="flex cursor-pointer flex-row items-center gap-[12px] rounded-[4px] py-1 pl-2">
              <div className="flex flex-col -space-y-[8px]">
                <p className="text-[15px]">Theme</p>
              </div>
            </div>
            {/* </MenuItem> */}
            <div className="my-1 h-px bg-[#c7c7c7]" />

            <MenuItem>
              <div className="flex cursor-pointer flex-row items-center gap-[12px] rounded-[4px] py-1 pl-2 hover:bg-gray-200/70">
                <div className="flex flex-row items-center justify-center gap-2 -space-y-[8px]">
                  <p className="text-[15px]">Profile</p>
                </div>
              </div>
            </MenuItem>
            {/* <div className="my-1 h-px bg-white/5" /> */}
            <MenuItem>
              <div className="flex cursor-pointer flex-row items-center gap-[12px] rounded-[4px] py-1 pl-2 hover:bg-gray-200/70">
                <div className="flex flex-col -space-y-[8px]">
                  <p className="text-[15px]">Logout</p>
                </div>
              </div>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
