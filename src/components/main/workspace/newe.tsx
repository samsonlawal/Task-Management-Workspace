// // import Criteria from "@/components/reusables/Criteria";
// // import WSHeading from "@/components/reusables/WSHeading";
// // import React from "react";
// // import tasks from "@/components/data";
// // import Navbar from "../navbar";
// // import Dashboard from "@/components/reusables/Dashboard";

// // export default function Workspace() {
// //   const CriteriaList = ["TO-DO", "IN-PROGRESS", "AWAITING REVIEW"];
// //   return (
// //     <div className="flex flex-1 flex-col gap-6 font-madei">
// //       <Navbar />
// //       {/* <WSHeading /> */}
// //       <div className="flex flex-row flex-wrap items-start justify-between gap-5 px-[32px]">
// //         {/* {CriteriaList.map((text, index) => (
// //           <Criteria key={index} text={text} />
// //         ))} */}
// //         {/* <Dashboard /> */}

// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useMemo, useState } from "react";
// import Navbar from "../navbar";
// import tasks from "@/components/data";
// import SingleTask from "@/components/reusables/singleTask";
// import AddTask from "@/components/reusables/Dialogs/AddTask";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { setTasks } from "@/redux/Slices/taskSlice";
// import Dashboard from "@/components/reusables/Dashboard";
// import { useGetTasks } from "@/hooks/api/tasks";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Loader from "@/utils/loader";

// function TabComponent() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state: any) => state.auth);
//   const { currentWorkspace } = useSelector(
//     (state: any) => state.currentWorkspace,
//   );

//   const WorkspaceData = useSelector((state: RootState) => state.WorkspaceData);

//   const MemberData = useSelector((state: RootState) => state.MemberData);

//   // Update the tasks selector to ensure array type
//   const tasks = useSelector(
//     (state: RootState) =>
//       // Array.isArray(state.TasksData?.task) ? state.TasksData.task : [],
//       state.TasksData.task,
//   );

//   // let allTasks = TasksData?.task;

//   const { data: taskData, onGetTasks, loading: tasksLoading } = useGetTasks();

//   // useEffect(() => {
//   //   // if (user) {
//   //   // console.log(user);
//   //   // console.log("tasks:", tasks);
//   //   dispatch(setTasks(tasks));
//   //   // console.log(MemberData);
//   //   // }
//   // }, [MemberData, tasks, onGetTasks]);

//   useEffect(() => {
//     if (user) {
//       console.log("USER:", user);
//       console.log("USER_ID:", user?._id);
//     }

//     if (!user) {
//       // router.push("/auth/sign-in");
//     }
//   }, [user]);

//   // if (!user) return null;

//   // const [activeTab, setActiveTab] = useState<number>(0);
//   const [activeTabs, setActiveTabs] = useState<string>("");

//   const currentUI = useSelector((state: RootState) => state.ui.currentUI);
//   // const { data: tasks, onGetTasks } = useGetTasks();

//   // const FilteredTask = tasks.filter(
//   //   (task) => task.workspace._id === currentWorkspace._id,
//   // );

//   // useEffect(() => {
//   //   console.log(activeTabs);
//   // }, [activeTab]);

//   const statusMap = {
//     "TO-DO": "todo",
//     "IN-PROGRESS": "in-progress",
//     "IN-REVIEW": "in-review",
//     DONE: "done",
//   };

//   // const statusMap = []

//   // const tabs = ["ALL", "TO-DO", "IN-PROGRESS", "IN-REVIEW", "DONE"];

//   const tabs = ["Overview", "Board", "List"];

//   const tabContent = useMemo(() => {
//     const safeTasks = Array.isArray(tasks) ? tasks : [];
//     return [
//       safeTasks,
//       safeTasks.filter((task) => task?.status === statusMap["TO-DO"]),
//       safeTasks.filter((task) => task?.status === statusMap["IN-PROGRESS"]),
//       safeTasks.filter((task) => task?.status === "in-review"),
//       safeTasks.filter((task) => task?.status === "done"),
//     ];
//   }, [tasks]);

//   // const tabContent = useMemo(
//   //   () => [
//   //     tasks,
//   //     tasks?.filter((task) => task.status === statusMap["TO-DO"]),
//   //     tasks?.filter((task) => task.status === statusMap["IN-PROGRESS"]),
//   //     tasks?.filter((task) => task.status === statusMap["IN-REVIEW"]),
//   //     tasks?.filter((task) => task.status === statusMap["DONE"]),
//   //     // ...other tabs
//   //   ],
//   //   [tasks],
//   // );

//   const [activeTab, setActiveTab] = useState<"Overview" | "Board" | "List">(
//     "Overview",
//   );

//   return (
//     <div className="poppins mb-4 flex h-screen w-full flex-1 flex-col gap-2">
//       <div className="sticky top-0 w-full bg-white pb-6">
//         <Navbar />
//       </div>
//       {/* Tabs Navigation */}

//       {currentUI === "tasks" ? (
//         <>
//           {/* <div className="fixed top-16 z-10 w-full bg-white shadow-sm"> */}

//           <div className="mx-6 flex justify-between rounded-md bg-gray-100 px-2 py-1 transition-all duration-300">
//             {/* <div className="flex flex-row">
//               {tabs?.map((tab, index) => (
//                 <div
//                   key={index}
//                   className={`flex w-fit cursor-pointer select-none flex-row items-center gap-1 rounded-t-sm px-2 text-[12px] font-[500] ${
//                     activeTab === index
//                       ? "border-b-2 border-black text-black"
//                       : "text-gray-500 hover:text-black"
//                   }`}
//                   onClick={() => {
//                     setActiveTab(index);
//                     setActiveTabs(tabs[index]);
//                   }}
//                 >
//                   {tab}
//                   {index === activeTab && (
//                     <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-400/40">
//                       <p className="text-[10px] font-normal">
//                         {tabContent[activeTab]?.length}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div> */}

//             {/* <div className="flex flex-row">
//               {tabs?.map((tab, index) => (
//                 <div
//                   key={index}
//                   className={`flex w-fit cursor-pointer select-none flex-row items-center gap-1 rounded-t-sm px-2 text-[12px] font-[500] ${
//                     activeTab === index
//                       ? "border-b-2 border-black text-black"
//                       : "text-gray-500 hover:text-black"
//                   }`}
//                   onClick={() => {
//                     setActiveTab(index);
//                     setActiveTabs(tabs[index]);
//                   }}
//                 >
//                   {tab}
//                   {index === activeTab && (
//                     <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-400/40">
//                       <p className="text-[10px] font-normal">
//                         {tabContent[activeTab]?.length}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div> */}

//             <div className="flex items-center gap-3 text-[12px]">
//               <div className="w-full">
//                 {/* Tab Headers */}
//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => setActiveTab("Overview")}
//                     className={`px-2 py-1 font-normal ${activeTab === "Overview" ? "border-b-2 border-black font-medium text-black" : "text-gray-500 hover:text-gray-700"}`}
//                   >
//                     Overview
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("Board")}
//                     className={`px-2 py-1 font-normal ${activeTab === "Board" ? "border-b-2 border-black font-medium text-black" : "text-gray-500 hover:text-gray-700"}`}
//                   >
//                     Board
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("List")}
//                     className={`px-2 py-1 font-normal ${activeTab === "List" ? "border-b-2 border-black font-medium text-black" : "text-gray-500 hover:text-gray-700"}`}
//                   >
//                     List
//                   </button>
//                 </div>

//                 {/* Tab Content */}
//                 {/* <div className="py-4">
//                   {activeTab === "activity" && (
//                     <div className="space-y-3">
//                       <p>Task created on </p>
//                     </div>
//                   )}

//                   {activeTab === "comments" && (
//                     <div>
//                       <p>No comments yet</p>
//                     </div>
//                   )}

//                   {activeTab === "attachments" && (
//                     <div>
//                       <p>No attachments yet</p>
//                     </div>
//                   )}
//                 </div> */}
//               </div>
//             </div>

//             <div className="">
//               <AddTask onGetTasks={onGetTasks} taskData={taskData} />
//             </div>
//           </div>
//           {/* Tab Content */}
//           <div className="mx-6 flex-1 overflow-y-auto rounded-md bg-gray-200/40 px-2 pb-8 pt-2">
//             {tasksLoading ? (
//               <p className="flex h-full items-center justify-center">
//                 {" "}
//                 <Loader loaderSize={40} />
//               </p>
//             ) : (
//               <div className="flex h-fit flex-row flex-wrap gap-1">
//                 {tabContent[activeTab] ? (
//                   tabContent[activeTab]?.map((task, index) =>
//                     task ? (
//                       <SingleTask
//                         key={index}
//                         desc={task.description}
//                         // tags={task.tags}
//                         deadline={task.deadline}
//                         name={task.assignee?.name || task.assignee?.fullname}
//                         email={task.assignee?.email}
//                         priority={task.priority}
//                         image={task.assignee?.profileImage}
//                         id={task._id}
//                         status={task.status}
//                         createdAt={task.createdAt}
//                         // workspaceId={task.workspace_id}
//                       />
//                     ) : null,
//                   )
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center">
//                     <p className="text-center text-lg text-gray-500">No Task</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </>
//       ) : (
//         <Dashboard />
//       )}
//     </div>
//   );
// }

// export default TabComponent;
