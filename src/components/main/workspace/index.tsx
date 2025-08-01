// import Criteria from "@/components/reusables/Criteria";
// import WSHeading from "@/components/reusables/WSHeading";
// import React from "react";
// import tasks from "@/components/data";
// import Navbar from "../navbar";
// import Dashboard from "@/components/reusables/Dashboard";

// export default function Workspace() {
//   const CriteriaList = ["TO-DO", "IN-PROGRESS", "AWAITING REVIEW"];
//   return (
//     <div className="flex flex-1 flex-col gap-6 font-madei">
//       <Navbar />
//       {/* <WSHeading /> */}
//       <div className="flex flex-row flex-wrap items-start justify-between gap-5 px-[32px]">
//         {/* {CriteriaList.map((text, index) => (
//           <Criteria key={index} text={text} />
//         ))} */}
//         {/* <Dashboard /> */}

//       </div>
//     </div>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import Navbar from "../navbar";
import tasks from "@/components/data";
import SingleTask from "@/components/reusables/singleTask";
import AddTask from "@/components/reusables/Dialogs/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTasks } from "@/redux/Slices/taskSlice";
import Dashboard from "@/components/reusables/Dashboard";
import { useGetTasks } from "@/hooks/api/tasks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/utils/loader";
import {
  LayoutDashboard,
  GalleryHorizontal,
  SquareKanban,
  List,
  AlignLeft,
  Library,
  Folder,
} from "lucide-react";
import { useGetUserNotifications } from "@/hooks/api/Notification";

const tabby = [
  {
    name: "Overview",
    // icon: <LayoutDashboard strokeWidth={1} size={18} />,1
    icon: <GalleryHorizontal strokeWidth={2} size={18} />,
  },
  {
    name: "Board",
    icon: <SquareKanban strokeWidth={2} size={18} />,
  },
  {
    name: "List",
    icon: <AlignLeft strokeWidth={2} size={18} />,
  },
  {
    name: "My Tasks",
    icon: <Folder strokeWidth={2} size={18} />,
  },
];

function TabComponent() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  const { currentWorkspace } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const WorkspaceData = useSelector((state: RootState) => state.WorkspaceData);

  const MemberData = useSelector((state: RootState) => state.MemberData);

  // Update the tasks selector to ensure array type
  const tasks = useSelector(
    (state: RootState) =>
      Array.isArray(state.TasksData?.task) ? state.TasksData.task : [],
    // state.TasksData.task,
  );

  const { data: taskData, onGetTasks, loading: tasksLoading } = useGetTasks();

  useEffect(() => {
    if (user) {
      console.log("USER:", user);
      console.log("USER_ID:", user?._id);
    }

    if (!user) {
    }
  }, [user]);

  useEffect(() => {
    console.log("USER ID:", user?._id);
    console.log(
      "Task Assignees:",
      tasks.map((t) => t.assignee?._id),
    );
  }, [user, tasks]);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTabs, setActiveTabs] = useState<string>("");

  const currentUI = useSelector((state: RootState) => state.ui.currentUI);

  useEffect(() => {
    console.log(activeTabs);
  }, [activeTab]);

  const statusMap = {
    "TO-DO": "to-do",
    "IN-PROGRESS": "in-progress",
    "IN-REVIEW": "in-review",
    DONE: "done",
  };

  const tabs = ["Overview", "Board", "List", "My Tasks"];
  // const tabs = ["Overview", "To-Do", "In-Progress", "In-Review", "Done"];

  // const tabContent = useMemo(() => {
  //   const safeTasks = Array.isArray(tasks) ? tasks : [];
  //   return [
  //     safeTasks,
  //     safeTasks.filter((task) => task?.status === statusMap["TO-DO"]),
  //     safeTasks.filter((task) => task?.status === statusMap["IN-PROGRESS"]),
  //     safeTasks.filter((task) => task?.status === "in-review"),
  //     safeTasks.filter((task) => task?.status === "done"),
  //   ];
  // }, [tasks]);

  const tabContent = useMemo(() => {
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    return [
      safeTasks,
      safeTasks.filter((task) => task?.status === statusMap["IN-PROGRESS"]),
      safeTasks.filter((task) => task?.status === "in-review"),
      safeTasks.filter((task) => task?.assignee?._id === user?._id),
    ];
  }, [tasks, user]);

  // const tabContent = useMemo(
  //   () => [
  //     tasks,
  //     tasks?.filter((task) => task.status === statusMap["TO-DO"]),
  //     tasks?.filter((task) => task.status === statusMap["IN-PROGRESS"]),
  //     tasks?.filter((task) => task.status === statusMap["IN-REVIEW"]),
  //     tasks?.filter((task) => task.status === statusMap["DONE"]),
  //     // ...other tabs
  //   ],
  //   [tasks],
  // );

  return (
    <div className="poppins mb-4 flex h-screen w-full flex-1 flex-col bg-white">
      <div className="sticky top-0 w-full">
        <Navbar />
      </div>
      {/* Tabs Navigation */}

      {currentUI === "tasks" ? (
        <>
          {/* <div className="fixed top-16 z-10 w-full bg-white shadow-sm"> */}

          <div className="flex h-fit items-center justify-between px-8 pt-6 transition-all duration-300">
            {/* <div className="flex h-max flex-row">
              {tabs?.map((tab, index) => (
                <div
                  key={index}
                  className={`flex h-fit w-fit cursor-pointer select-none flex-row items-center gap-1 rounded-t-sm px-3 py-2 text-[12px] font-[500] ${
                    activeTab === index
                      ? "border-b-2 border-black bg-gray-100/50 text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => {
                    setActiveTab(index);
                    setActiveTabs(tabs[index]);
                  }}
                >
                  {tab}
                  {index === activeTab && (
                    <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-400/40">
                      <p className="text-[10px] font-normal">
                        {tabContent[activeTab]?.length}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div> */}

            <div className="flex h-max flex-row gap-4 rounded-md">
              {tabby?.map((tab, index) => (
                <div
                  key={index}
                  className={`flex h-fit w-fit cursor-pointer select-none flex-row items-center gap-1 rounded-t-sm px-2 py-3 text-[12px] font-[500] ${
                    activeTab === index
                      ? "border-b-[1.5px] border-[#565656]/20 bg-[#565656]/10 text-gray-800"
                      : "hover:bg--[#565656]/10 border-gray-300 text-gray-500 hover:border-b-[1.5px]"
                  } `}
                  onClick={() => {
                    setActiveTab(index);
                    setActiveTabs(tabs[index]);
                  }}
                >
                  {tab.icon}
                  <p>{tab.name}</p>{" "}
                </div>
              ))}
            </div>

            <div className="pb-1">
              <AddTask onGetTasks={onGetTasks} taskData={taskData} />
            </div>
          </div>
          {/* Tab Content */}
          <div className="w-full flex-1 overflow-y-auto bg-[#565656]/10 px-8 pb-8 pt-4 scrollbar-hide">
            {tasksLoading ? (
              <p className="flex h-full items-center justify-center">
                {" "}
                <Loader loaderSize={40} />
              </p>
            ) : (
              <div className="flex h-fit w-full flex-row flex-wrap justify-between gap-2">
                {tabContent[activeTab] && tabContent[activeTab].length > 0 ? (
                  tabContent[activeTab]?.map((task, index) =>
                    task ? (
                      <SingleTask
                        key={index}
                        desc={task.description}
                        // tags={task.tags}
                        deadline={task.deadline}
                        name={task.assignee?.name || task.assignee?.fullname}
                        email={task.assignee?.email}
                        priority={task.priority}
                        image={task.assignee?.profileImage}
                        id={task._id}
                        status={task.status}
                        createdAt={task.createdAt}
                        // workspaceId={task.workspace_id}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="text-center text-lg text-gray-500">
                          No Task
                        </p>
                      </div>
                    ),
                  )
                ) : (
                  <div className="flex h-[300px] w-full items-center justify-center">
                    <p className="text-md text-center text-gray-500">No Task</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default TabComponent;
