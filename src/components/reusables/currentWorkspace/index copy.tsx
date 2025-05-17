// "use client";

// import React, { useEffect, useState } from "react";
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import AddWorkspace from "../Dialogs/AddWorkspace";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   useGetUserWorkspace,
//   useGetSingleWorkspace,
// } from "@/hooks/api/workspace";
// import { setCurrentWorkspace } from "@/redux/Slices/currentWorkspaceSlice";
// import { setWorkspace } from "@/redux/Slices/workspaceSlice";
// import { getFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
// import Loader from "@/utils/loader";

// export default function CurrentWorkspace() {
//   return (
//     <div className="flex flex-col gap-[24px]">
//       <div className="flex w-full flex-col justify-between gap-[8px]">
//         <div className="flex w-full">{/* <p>Workspace</p> */}</div>
//         <div className="flex flex-row items-center gap-[8px] px-[12px]">
//           <Workspace />
//         </div>
//       </div>
//     </div>
//   );
// }

// function Workspace() {
//   const dispatch = useDispatch();
//   const [filteredWorkspaces, setFilteredWorkspaces] = useState<any>([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const { user } = useSelector((state: any) => state.auth);
//   const { currentWorkspace } = useSelector(
//     (state: any) => state.currentWorkspace,
//   );

//   const {
//     data: workspaces,
//     onGetUserWorkspace,
//     loading: workspacesLoading,
//   } = useGetUserWorkspace(user?._Id);

//   const {
//     data: workspaceData,
//     onGetSingleWorkspace,
//     loading: singleWorkspaceLoading,
//   } = useGetSingleWorkspace(currentWorkspace);

//   const loading = workspacesLoading || singleWorkspaceLoading;

//   useEffect(() => {
//     const initializeWorkspace = async () => {
//       if (!user?._id) return;

//       try {
//         // First, get workspace ID from localStorage
//         const workspaceId = await new Promise<string>((resolve) => {
//           getFromLocalStorage({
//             key: "CurrentWorkspaceId",
//             cb: (id: string) => {
//               if (id) {
//                 dispatch(setCurrentWorkspace(id));
//                 resolve(id);
//               } else {
//                 resolve("");
//               }
//             },
//           });
//         });

//         // Then get workspace data from localStorage
//         await new Promise<void>((resolve) => {
//           getFromLocalStorage({
//             key: "WorkspaceData",
//             cb: (data: any) => {
//               if (data) {
//                 dispatch(setWorkspace(data));
//               }
//               resolve();
//             },
//           });
//         });

//         // Then fetch user workspaces
//         const workspaceList = await onGetUserWorkspace(user._id);

//         // If we have a workspace ID, fetch that workspace's details
//         if (workspaceId) {
//           const singleWorkspace = await onGetSingleWorkspace(workspaceId);
//           if (singleWorkspace) {
//             dispatch(setWorkspace(singleWorkspace));
//           }
//         }

//         // Finally, update the filtered workspaces
//         if (workspaceList && workspaceList.length > 0) {
//           updateFilteredWorkspaces(workspaceList, workspaceId);
//         }
//       } catch (error) {
//         console.error("Error initializing workspace:", error);
//       }
//     };

//     initializeWorkspace();
//   }, [user]);

//   // When current workspace changes, update filtered list
//   useEffect(() => {
//     if (workspaces && workspaces.length > 0 && currentWorkspace) {
//       updateFilteredWorkspaces(workspaces, currentWorkspace);
//     }
//   }, [workspaces, currentWorkspace]);

//   // Update workspace data in Redux when it changes
//   useEffect(() => {
//     if (workspaceData) {
//       dispatch(setWorkspace(workspaceData));
//     }
//   }, [workspaceData, dispatch]);

//   const updateFilteredWorkspaces = (
//     workspaceList: any[],
//     currentId: string,
//   ) => {
//     if (workspaceList && workspaceList.length > 0) {
//       setFilteredWorkspaces(
//         workspaceList.filter((workspace) => workspace._id !== currentId) || [],
//       );
//     } else {
//       setFilteredWorkspaces([]);
//     }
//   };

//   const handleWorkspaceSelection = async (id: string) => {
//     try {
//       // Close the menu first for better UX
//       setIsMenuOpen(false);

//       // Fetch the workspace details
//       await onGetSingleWorkspace(id);

//       // Update current workspace in Redux
//       dispatch(setCurrentWorkspace(id));

//       // Update filtered workspaces
//       if (workspaces && workspaces.length > 0) {
//         updateFilteredWorkspaces(workspaces, id);
//       }
//     } catch (error) {
//       console.error("Error selecting workspace:", error);
//     }
//   };

//   return (
//     <div className="w-full text-left font-madei">
//       <Menu as="div" className="relative inline-block w-full text-left">
//         {({ open }) => {
//           // Sync the internal state with the menu's open state
//           if (open !== isMenuOpen) setIsMenuOpen(open);

//           return (
//             <>
//               <MenuButton className="inline-flex w-full items-center gap-2 rounded-md border-[1px] px-2 py-1.5 text-black transition-all duration-300 hover:bg-gray-100 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
//                 <div className="flex w-full flex-row items-center gap-[8px]">
//                   <span className="flex h-[29px] w-[29px] items-center justify-center rounded-[5px] bg-[#A8A8A8] text-white">
//                     {workspaceData?.workspace?.name?.charAt(0).toUpperCase() ||
//                       ""}
//                   </span>
//                   <p>{workspaceData?.workspace?.name || ""}</p>
//                 </div>
//                 <FontAwesomeIcon
//                   icon={faChevronDown}
//                   className="fa-xs text-gray-500"
//                 />
//               </MenuButton>

//               <MenuItems
//                 transition
//                 anchor="bottom start"
//                 className="flex min-h-[300px] w-[260px] origin-top-right flex-col justify-between rounded-md border-[1px] bg-gray-100 px-3 py-4 font-madei text-sm/6 text-black shadow-[0px_4px_10px_rgba(0,0,0,0.001),0px_-2px_5px_rgba(0,0,0,0.001)] transition duration-300 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
//               >
//                 <div className="flex flex-col gap-[10px]">
//                   <p className="px-2 pb-2 text-[14px] text-[#707070]">
//                     Switch Workspace
//                   </p>

//                   <div className="flex h-[180px] flex-col gap-[10px] overflow-y-auto">
//                     {loading ? (
//                       <div className="flex h-full w-full items-center justify-center">
//                         <Loader />
//                       </div>
//                     ) : filteredWorkspaces.length > 0 ? (
//                       filteredWorkspaces.map(
//                         (workspace: any, index: number) => (
//                           <MenuItem key={workspace._id || index}>
//                             {({ active }) => (
//                               <div
//                                 className={`flex cursor-pointer flex-row items-center gap-[12px] rounded-[4px] py-1 pl-2 ${active ? "bg-gray-200/70" : ""}`}
//                                 onClick={() =>
//                                   handleWorkspaceSelection(workspace._id)
//                                 }
//                               >
//                                 <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[5px] bg-[#A8A8A8] text-[13px] text-white">
//                                   {workspace?.name?.charAt(0).toUpperCase() ||
//                                     ""}
//                                 </div>
//                                 <div className="flex flex-col -space-y-[8px]">
//                                   <p className="text-[15px]">
//                                     {workspace?.name}
//                                   </p>
//                                   <p className="text-[11px] text-[#707070]">
//                                     {workspace?.memberCount} Member
//                                     {workspace?.memberCount !== 1 ? "s" : ""}
//                                   </p>
//                                 </div>
//                               </div>
//                             )}
//                           </MenuItem>
//                         ),
//                       )
//                     ) : (
//                       <div className="flex h-full w-full items-center justify-center">
//                         <p className="text-gray-500">
//                           No other workspaces available
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <MenuItem>
//                   {({ active }) => (
//                     <div
//                       className={active ? "rounded-[4px] bg-gray-200/70" : ""}
//                     >
//                       <AddWorkspace />
//                     </div>
//                   )}
//                 </MenuItem>
//               </MenuItems>
//             </>
//           );
//         }}
//       </Menu>
//     </div>
//   );
// }
