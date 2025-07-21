"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import { useSelector } from "react-redux";
import { useGetUserNotifications } from "@/hooks/api/Notification";

export default function Navbar() {
  const currentUI = useSelector((state: RootState) => state.ui.currentUI);

  return (
    <div className="poppins flex w-full items-center justify-between border-b-[1px] px-[32px] py-[7px]">
      {/* <h2 className="montserrat-bold text-xl">
        {currentUI === "tasks" ? "Workspace" : "Members"}
      </h2> */}

      <h2 className="poppins-semibold text-xl">
        {currentUI === "tasks" ? "Workspace" : "Members"}
      </h2>
      <div className="flex flex-row gap-6">
        <Notification />
        <DropdownMenu />
      </div>
    </div>
  );
}

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useLogout } from "@/hooks/api/auth";
import { useRouter } from "next/navigation";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TNotification } from "@/types";
import { BellOff } from "lucide-react";
import { formatTimeAgo } from "@/utils/formatTimeAgo";

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
      {/* <div className="group relative w-fit">
        <img
          src="/icons/bell-line.svg"
          alt="Notifications"
          className="h-[18px] w-[18px] cursor-pointer"
        />
        <span className="absolute -right-[1px] -top-[1px] h-2 w-2 rounded-full border border-white bg-red-500 transition-all duration-300 group-hover:-right-1 group-hover:-top-1"></span>
      </div> */}
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

function Notification() {
  const typeToIcon: Record<number, string> = {
    1: "/icons/notification/assigned.svg",
    2: "/icons/notification/chat.svg",
    3: "/icons/notification/mention.svg",
    4: "/icons/notification/edit.svg",
    5: "/icons/notification/calendar.svg",
    6: "/icons/notification/flag.svg",
  };

  const { user } = useSelector((state: any) => state.auth);

  const {
    loading: notificationLoading,
    onGetUserNotification,
    data: notificationData,
  } = useGetUserNotifications();

  function getNotif() {
    onGetUserNotification(user?._id);
  }

  return (
    <div className="poppins flex h-[50px] w-fit flex-row items-center justify-center gap-6 text-left">
      {/* <FontAwesomeIcon icon={faBell} className="" /> */}

      {/* <div className="h-[80%] border-l-[1px]"></div> */}
      <Menu>
        <MenuButton className="" onClick={getNotif}>
          <div className="group relative w-fit">
            <img
              src="/icons/bell-line.svg"
              alt="Notifications"
              className="h-[18px] w-[18px] cursor-pointer"
            />
            {/* Notification badge */}
            <span className="absolute -right-[1px] -top-[1px] h-2 w-2 rounded-full border border-white bg-red-500 transition-all duration-300 group-hover:-right-1 group-hover:-top-1"></span>
          </div>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="scrollbar-hide flex h-[431px] w-[458px] origin-top-right flex-col justify-between overflow-auto rounded-xl border-[1px] bg-white text-sm/6 text-black shadow-[0px_4px_10px_rgba(0,0,0,0.001),0px_-2px_5px_rgba(0,0,0,0.001)] transition duration-100 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="flex flex-col">
            {/* <div className="flex cursor-pointer flex-row items-center gap-[12px] rounded-[4px] py-1 pl-2"> */}
            <div className="items poppins flex w-full flex-row items-center justify-between px-6 py-[20px]">
              <p className="text-[20px] font-semibold">Notification</p>
              <button className="rounded-full bg-[#F3F3F3] px-[15px] py-[6px] text-[12px] font-normal">
                Mark all as read
              </button>
            </div>

            {/* Tabs */}
            <div className="poppins flex flex-row gap-4 border-b-[1px] border-[#E4E4E4] px-6">
              <button className="border-b-2 border-[#4E4E4E] px-[6px] py-[3px] text-[12px] font-medium">
                Updates
              </button>

              <button className="px-[6px] py-[3px] text-[12px] font-medium text-[#4E4E4E]">
                Unread
              </button>
            </div>

            {/* Notifications */}
            <div className="flex flex-col">
              <div>
                {notificationLoading ? (
                  <p>Loading....</p>
                ) : Array.isArray(notificationData) &&
                  notificationData.length > 0 ? (
                  notificationData.map((notif: TNotification) => (
                    <div
                      key={notif._id}
                      className={`poppins flex h-[80px] flex-row items-center gap-[10px] border-b-[1px] border-[#E4E4E4] px-6 ${!notif.isRead ? "bg-[#F3F3F3]" : ""}`}
                    >
                      {/* icon */}
                      <img src={typeToIcon[notif.type]} alt="" />

                      {/* message */}
                      <div className="flex flex-1 flex-row justify-between">
                        <div className="flex flex-col">
                          <p className="text-[12px] text-[#4E4E4E]">
                            {notif.message}
                          </p>
                          <div className="flex flex-row gap-[10px] text-[10px] text-[#8c8c8c]">
                            <p className="text-[12px]">
                              {formatTimeAgo(notif.createdAt)}
                            </p>
                          </div>
                        </div>

                        {/* unread status */}
                        {!notif.isRead && (
                          <img src="/icons/unread.svg" alt="" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  //  No notification fallback
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="flex h-[250px] flex-col items-center justify-center text-gray-500">
                      <BellOff size={50} strokeWidth={1} />
                      <p className="mt-4 text-sm font-semibold text-gray-500">
                        No notifications yet
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* </div> */}
        </MenuItems>
      </Menu>
    </div>
  );
}

function NotificationPrototype() {}
