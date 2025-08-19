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
import Navbar from "../../main/navbar";
import tasks from "@/components/data";
import Card from "@/components/reusables/Card";
import ListTask from "@/components/reusables/List";

import AddTask from "@/components/reusables/Dialogs/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTasks } from "@/redux/Slices/taskSlice";
import Dashboard from "@/components/pages/Dashboard";
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
  Eye,
} from "lucide-react";
import { useGetUserNotifications } from "@/hooks/api/Notification";
import Team from "@/components/pages/Team";
import Settings from "../Settings";

const tabby = [
  {
    name: "Overview",
    // icon: <LayoutDashboard strokeWidth={1} size={18} />,1
    icon: <GalleryHorizontal strokeWidth={2} size={18} />,
  },
  // {
  //   name: "Board",
  //   icon: <SquareKanban strokeWidth={2} size={18} />,
  // },
  // {
  //   name: "List",
  //   icon: <AlignLeft strokeWidth={2} size={18} />,
  // },
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
      tasks.map((t: any) => t.assignee?._id),
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

  const tabs = ["Overview", "My Tasks"];
  // const tabs = ["Overview", "Board", "List", "My Tasks"];

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
      // safeTasks.filter((task) => task?.status === statusMap["IN-PROGRESS"]),
      // safeTasks.filter((task) => task?.status === "in-review"),
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

  const [list, setList] = useState(false);

  const changeView = () => {
    setList((prevList) => !prevList);
  };

  return (
    <div className="poppins mb-4 flex h-screen w-full flex-1 flex-col bg-white">
      <div className="sticky top-0 w-full">
        <Navbar />
      </div>
      {/* Tabs Navigation */}
      {currentUI === "tasks" ? (
        <>
          {/* <div className="fixed top-16 z-10 w-full bg-white shadow-sm"> */}

          <div className="mb-2 flex h-fit items-center justify-between px-8 pt-6 transition-all duration-300">
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

            <div className="flex h-max flex-row gap-3 border-b border-[#565656]/20">
              {tabby?.map((tab, index) => (
                <div
                  key={index}
                  className={`flex h-fit w-fit cursor-pointer select-none flex-row items-center gap-1 px-3 py-2 text-[12px] font-[500] ${
                    activeTab === index
                      ? "border-b-[2px] border-[#111] text-[#111]"
                      : "border-b-[2px] border-white text-gray-500 hover:border-[#565656]/30"
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

            <div className="flex flex-row items-center justify-center gap-3 pb-1">
              {/* <div className="flex h-fit flex-row items-center gap-1 rounded-sm border-[1.7px] border-[#565656]/20 px-3 py-1 text-[12px] font-medium text-[#111] transition-all duration-300 hover:bg-[#565656]/20">
                <SquareKanban
                  className="text-center text-[#111]"
                  strokeWidth={1.5}
                  size={16}
                />
                <p>Card</p>
              </div> */}

              <div
                className={`flex h-fit cursor-pointer flex-row items-center gap-1 rounded-sm border-[1.7px] border-[#565656]/20 px-3 py-1 text-[12px] font-medium text-[#111] transition-all duration-300 hover:bg-[#565656]/10 active:scale-95 ${list ? "bg-[#565656]/10" : ""}`}
                onClick={changeView}
              >
                <List
                  className="text-center text-[#111]"
                  strokeWidth={1.5}
                  size={14}
                />
                <p>List</p>
              </div>

              <AddTask onGetTasks={onGetTasks} taskData={taskData} />
            </div>
          </div>
          {list ? (
            <div className="px-8">
              <div className="flex min-h-fit w-full flex-row justify-between rounded-sm bg-[#565656]/5 px-3 py-4 text-[14px] font-medium text-[#565656]">
                <div className="flex w-[250px] items-center justify-start">
                  <p className="line-clamp-1 h-fit text-[12px] leading-tight">
                    Title
                  </p>
                </div>
                <div className="flex w-[100px] items-center justify-start text-[#565656]">
                  <p className="text-[12px]">Status</p>
                </div>
                <div className="flex w-[115px] items-center justify-start">
                  <p className="text-[12px]">Assignee</p>
                </div>
                <div className="flex w-[120px] items-center justify-start">
                  <p className="text-center text-[12px]">Deadline</p>
                </div>
                <div className="flex w-[70px] items-center justify-start">
                  <div
                    className={`flex h-fit w-fit flex-row items-center justify-center gap-1 rounded-[6px]`}
                  >
                    <p className={`text-[12px]`}>Priority</p>
                  </div>
                </div>
                <div className="flex w-[70px] items-center justify-start">
                  <p className="cursor-pointer text-center text-[12px]">
                    Actions
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* Tab Content */}
          <div className="w-full flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
            {tasksLoading ? (
              <p className="flex h-full items-center justify-center">
                {" "}
                <Loader loaderSize={40} />
              </p>
            ) : list ? (
              <div className="flex h-fit w-full flex-col flex-wrap justify-between gap-1 rounded-[18px] pb-[6px]">
                <div>
                  {tabContent[activeTab] && tabContent[activeTab].length > 0 ? (
                    tabContent[activeTab]?.map((task, index) =>
                      task ? (
                        <ListTask
                          key={task._id}
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
                        <div
                          className="flex h-full w-full items-center justify-center"
                          key={`no-task-${index}`}
                        >
                          <p className="text-center text-lg text-gray-500">
                            No Task
                          </p>
                        </div>
                      ),
                    )
                  ) : (
                    <div className="flex h-[300px] w-full items-center justify-center">
                      <p className="text-md text-center text-gray-500">
                        No Task
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-fit w-full flex-row flex-wrap justify-between gap-2 rounded-[18px] p-2 pb-[6px]">
                {tabContent[activeTab] && tabContent[activeTab].length > 0 ? (
                  tabContent[activeTab]?.map((task, index) =>
                    task ? (
                      <Card
                        key={task._id}
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
                      <div
                        className="flex h-full w-full items-center justify-center"
                        key={`no-task-${index}`}
                      >
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
      ) : currentUI === "team" ? (
        <Team />
      ) : currentUI === "dashboard" ? (
        <Dashboard />
      ) : (
        <Settings />
      )}
    </div>
  );
}

export default TabComponent;
