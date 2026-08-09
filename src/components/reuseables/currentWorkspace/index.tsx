"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import AddWorkspace from "../Dialogs/AddWorkspace";
import AddMember from "../Dialogs/AddMember";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/localStorage/AsyncStorage";
import Loader from "@/utils/loader";
import { useGetTasks } from "@/hooks/api/tasks";

import { setCurrentUI } from "@/redux/Slices/uiSlice";
import { Settings } from "lucide-react";
import stringToColor from "@/utils/stringToColor";

import {
  useGetUserWorkspaceQuery,
  useGetSingleWorkspaceQuery,
} from "@/redux/api/workspaceApiSlice";
import Link from "next/link";


export default function CurrentWorkspace() {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex w-full flex-col justify-between gap-[8px]">
        <div className="flex flex-row items-center gap-[8px] px-[12px]">
          <Workspace />
        </div>
      </div>
    </div>
  );
}

function Workspace() {
  const router = useRouter();
  const dispatch = useDispatch();
    const params = useParams();
    const workspaceSlug = (params?.workspaceSlug as string) || "";
  // const [filteredWorkspaces, setFilteredWorkspaces] = useState<any>([]);

  const { user } = useSelector((state: any) => state.auth);
  const { currentWorkspaceId } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const { data: workspacesData, isLoading: workspacingLoading } =
    useGetUserWorkspaceQuery({ userId: user?._id }, { skip: !user?._id });

  const workspaces = workspacesData?.workspaces || workspacesData || [];

  const { data: workspaceData, isLoading: singleWorkspaceLoading } =
    useGetSingleWorkspaceQuery(
      { workspaceId: currentWorkspaceId },
      { skip: !currentWorkspaceId },
    );

  // Populate initial active workspace on boot if not set yet
  useEffect(() => {
    if (!currentWorkspaceId && workspaces.length > 0) {
      const firstId = workspaces[0]?._id;
      if (firstId) {
        dispatch(setCurrentWorkspace(firstId));
      }
    }
  }, [workspaces, currentWorkspaceId, dispatch]);

  

  // Use the unified hook
  // const { data: taskData, onGetTasks, loading: tasksLoading } = useGetTasks();

  // const {
  //   data: workspaces,
  //   onGetUserWorkspace,
  //   loading: workspacingLoading,
  // } = useGetUserWorkspace(user?._id);

  // const {
  //   data: memberData,
  //   onGetMembers,
  //   loading: membersLoading,
  // } = useGetMembers();

  // const {
  //   data: workspaceData,
  //   onGetSingleWorkspace,
  //   loading: singleWorkspaceLoading,
  // } = useGetSingleWorkspace(currentWorkspace);

  // only fetch data when user changes
  // useEffect(() => {
  //   if (user) {
  //     onGetUserWorkspace(user?._id);

  //     getFromLocalStorage({
  //       key: "CurrentWorkspaceId",
  //       cb: (id: string) => {
  //         if (id) {
  //           dispatch(setCurrentWorkspace(id));
  //           onGetSingleWorkspace(id);

  //           // Add success callback to ensure proper handling
  //           onGetTasks({
  //             workspaceId: id,
  //             successCallback: (tasks) => {
  //               console.log("Initial tasks loaded:", tasks);
  //             },
  //           });

  //           onGetMembers({ workspaceId: id });
  //         }
  //       },
  //     });
  //   }
  // }, [user]);

  // Keep filteredWorkspaces in sync with workspaces and workspaceData
  const filteredWorkspaces = useMemo(() => {
    if (!workspaces || !Array.isArray(workspaces)) return [];
    const currentId = workspaceData?.workspace?._id || workspaceData?._id;
    return workspaces.filter((ws: any) => ws._id !== currentId);
  }, [workspaces, workspaceData]);

  // function openWorkspaceDialog() {
  //   onGetUserWorkspace(user?._id);
  // }

  function switchWorkspace(workspace: any) {
    const id = workspace._id;
    const slug = workspace.slug || workspace._id;

    saveToLocalStorage({
      key: "CurrentWorkspaceId",
      value: id,
    });

    dispatch(setCurrentWorkspace(id));
    router.push(`/${slug}/tasks`);
  }

  return (
    <div className="z-100 w-full text-left">
      <Menu>
        <MenuButton className="inline-flex w-full items-center gap-2 rounded-md border-[1px] border-[#565656]/10 bg-[#565656]/10 px-2 py-1.5 text-black transition-all duration-300 hover:bg-[#565656]/20 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
          <div
            className="poppins flex w-full flex-row items-center gap-[8px] text-white"
            // onClick={() => openWorkspaceDialog()}
          >
            {workspaceData?.name ? (
              <>
                <span
                  className="poppins-medium flex h-[24px] w-[24px] items-center justify-center rounded-[5px] text-[12px] font-normal text-white"
                  style={{
                    backgroundColor: stringToColor(workspaceData?.name),
                  }}
                >
                  {workspaceData?.name.charAt(0).toUpperCase()}
                </span>
                <div className="flex flex-col items-start -space-y-1">
                  <p className="text-[13px] text-[#111] dark:text-white">
                    {workspaceData?.name}
                  </p>
                  {/* <p className="poppins text-[10px] font-normal text-[#707070]">
                    {workspaceData?.memberCount} Member
                    {workspaceData?.memberCount === 1 ? "" : "s"}
                  </p> */}
                </div>
              </>
            ) : (
              <div className="flex h-[29px] flex-row items-center gap-2">
                {/* <Loader loaderSize={10} /> */}
                <p className="text-[12px] font-regular text-[#fff]/50">
                  Select Workspace
                </p>
              </div>
            )}
          </div>{" "}
          <img src="/icons/dcaret.svg" alt="" className="w-1.5" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="poppins-medium z-50 flex min-h-fit w-[260px] origin-top-right flex-col justify-between gap-2 rounded-md border-[1px] border-[#565656]/10 bg-white dark:bg-[#1a1a1a] px-3 py-1 text-sm/6 text-white shadow-[0px_4px_10px_rgba(0,0,0,0.001),0px_-2px_5px_rgba(0,0,0,0.001)] transition duration-300 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
   
          <div className="flex flex-col gap-[4px]">
          

            <div className="flex h-fit flex-col gap-[10px] overflow-y-auto rounded-sm">

              
              
              {workspacingLoading && !filteredWorkspaces ? (
                <div className="flex w-full items-center justify-center px-2 py-10">

                  <p className="px-2 text-[13px] text-[#707070]">
                Select Workspace
              </p>
                  {/* <Loader loaderSize={50} /> */}
                  <p className="text-[12px] font-regular text-[#fff]">
                    Getting workspaces...
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col gap-1">
                  {workspaces && workspaces.length > 0 ? (
                    filteredWorkspaces.map((workspace: any, index: any) => (
                      <MenuItem key={index}>
                        <div
                          className="flex cursor-pointer flex-row items-center gap-[12px] rounded-[4px] border border-[#1a1a1a] pl-2 hover:border-[#565656]/10 hover:bg-[#565656]/10 text-[#111] dark:text-[#fff]"
                          onClick={() => switchWorkspace(workspace)}
                        >
                          <div
                            className="flex h-[24px] w-[24px] items-center justify-center rounded-[5px] text-[12px] font-normal text-white"
                            style={{
                              backgroundColor: stringToColor(workspace?.name),
                            }}
                          >
                            {workspace?.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col -space-y-[8px]">
                            <p className="text-[13px] font-normal">
                              {workspace?.name}
                            </p>

                            {/* <p className="text-[10px] font-normal text-[#707070]">
                              {workspace?.memberCount} Member
                              {workspace?.memberCount > 1 ? "s" : ""}
                            </p> */}
                          </div>
                        </div>
                      </MenuItem>
                    ))
                  ) : (
                    <div className="flex w-full items-center justify-center px-2 py-10">
                      <p className="text-[12px] font-regular text-[#fff]">
                        No workspace available.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <MenuItem>
          <div>
            <AddWorkspace />
            {/* <AddMember variant='button'/> */}
            <Link
                      href={`/${workspaceSlug}/settings`}
                      className={`flex w-full cursor-pointer flex-row items-center rounded-[4px] py-1 pl-2 transition-all duration-300 ease-in-out dark:hover:text-white dark:text-[#fff]/50 dark:hover:bg-[#565656]/10 text-[#111] hover:bg-[#565656]/30`}
                    >
                      <Settings size={16} />
                      <p className="px-2 text-[12px] font-regular ">Settings</p>
                    </Link>
</div>
          </MenuItem>
          <div></div>
        </MenuItems>
      </Menu>
    </div>
  );
}
