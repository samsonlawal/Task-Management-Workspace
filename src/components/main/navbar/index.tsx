"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import { useSelector } from "react-redux";


export default function Navbar() {
  const currentUI = useSelector((state: RootState) => state.ui.currentUI);

  return (
    <div className="flex w-full items-center justify-between border-b-[1px] px-[32px] py-[7px]">
      {/* <h2 className="montserrat-bold text-xl">
        {currentUI === "tasks" ? "Workspace" : "Members"}
      </h2> */}

      <h2 className="poppins-semibold text-xl">
        {currentUI === "tasks" ? "Workspace" : "Members"}
      </h2>
      <DropdownMenu />
    </div>
  );
}

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useLogout } from "@/hooks/api/auth";
import { useRouter } from "next/navigation";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DropdownMenu() {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);
  const router = useRouter();

  const { onLogout } = useLogout();
  function handleLogout() {
    onLogout();
    router.push("/");
  }

  return (
    <div className="flex h-[50px] w-fit flex-row items-center justify-center gap-6 text-left">
      {/* <FontAwesomeIcon icon={faBell} className="" /> */}
      <div className="group relative w-fit">
        <img
          src="/icons/bell-line.svg"
          alt="Notifications"
          className="h-[18px] w-[18px] cursor-pointer"
        />
        {/* Notification badge */}
        <span className="absolute -right-[1px] -top-[1px] h-2 w-2 rounded-full border border-white bg-red-500 transition-all duration-300 group-hover:-right-1 group-hover:-top-1"></span>
      </div>
      {/* <div className="h-[80%] border-l-[1px]"></div> */}
      <Menu>
        <MenuButton className="flex w-[210px] items-center justify-center gap-2 rounded-md border-[1px] px-2 py-[8px] text-black shadow-inner shadow-white/10 transition-colors duration-500 hover:bg-gray-200/70 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
          <div className="flex w-full flex-row items-center gap-[8px]">
            {user?.profileImage === "none" ? (
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#99c485] text-white">
                {user?.fullname.charAt(0).toUpperCase()}
              </span>
            ) : (
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full">
                <img
                  src={user?.profileImage}
                  alt=""
                  className="mx-auto rounded-full"
                />
              </span>
            )}
            <div className="flex flex-col items-start -space-y-[5px] leading-5">
              <p className="text-[14px]">{user?.fullname}</p>
              {/* <p className="text-[10px] text-[#707070]">{user?.email}</p> */}
            </div>
          </div>
          <img src="/icons/dcaret.svg" alt="" className="cursor-pointer pr-1" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="flex min-h-fit w-[230px] origin-top-right flex-col justify-between rounded-xl border-[1px] border-[#c7c7c7] bg-white px-3 py-4 text-sm/6 text-black shadow-[0px_4px_10px_rgba(0,0,0,0.001),0px_-2px_5px_rgba(0,0,0,0.001)] transition duration-100 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
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
              <div
                onClick={() => handleLogout()}
                className="flex cursor-pointer flex-row items-center gap-[12px] rounded-[4px] py-1 pl-2 hover:bg-gray-200/70"
              >
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
