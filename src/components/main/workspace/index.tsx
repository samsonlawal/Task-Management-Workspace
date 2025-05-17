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
import Dashboard from "@/components/reusables/Dashboard";
import { useGetTasks } from "@/hooks/api/tasks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function TabComponent() {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { currentWorkspace } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const WorkspaceData = useSelector((state: RootState) => state.WorkspaceData);

  const MemberData = useSelector((state: RootState) => state.MemberData);

  const tasks = useSelector((state: RootState) => state.TasksData?.task || []);

  // let allTasks = TasksData?.task;

  const { data: taskData, onGetTasks, loading: tasksLoading } = useGetTasks();

  useEffect(() => {
    // if (user) {
    // console.log(user);
    console.log(tasks);
    // console.log(MemberData);
    // }
  }, [MemberData, tasks]);

  useEffect(() => {
    if (user) {
      console.log("USER:", user);
      console.log("USER_ID:", user?._id);
    }

    if (!user) {
      // router.push("/auth/sign-in");
    }
  }, [user]);

  // if (!user) return null;

  const [activeTab, setActiveTab] = useState<number>(0);
  const currentUI = useSelector((state: RootState) => state.ui.currentUI);
  // const { data: tasks, onGetTasks } = useGetTasks();

  // const FilteredTask = tasks.filter(
  //   (task) => task.workspace._id === currentWorkspace._id,
  // );

  const tabs = ["ALL", "TO-DO", "IN-PROGRESS", "IN-REVIEW", "DONE"];
  const tabContent = useMemo(
    () => [
      tasks,
      tasks?.filter((task) => task.status === "todo"),
      tasks?.filter((task) => task.status === "in-progress"),
      tasks?.filter((task) => task.status === "in-review"),
      tasks?.filter((task) => task.status === "done"),
    ],
    [tasks],
  );

  return (
    <div className="mb-4 flex h-screen w-full flex-1 flex-col gap-6 font-madei font-normal">
      <div className="sticky top-0 w-full bg-white">
        <Navbar />
      </div>
      {/* Tabs Navigation */}

      {currentUI === "tasks" ? (
        <>
          {/* <div className="fixed top-16 z-10 w-full bg-white shadow-sm"> */}

          <div className="mx-8 flex justify-between transition-all duration-300">
            <div className="flex flex-row border-b-[1px]">
              {tabs?.map((tab, index) => (
                <div
                  key={index}
                  className={`flex w-fit cursor-pointer select-none flex-row items-center gap-2 px-4 py-2 text-sm font-[400] ${
                    activeTab === index
                      ? "border-b-2 border-black bg-gray-100 text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                  {index === activeTab && (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-400/60 font-normal">
                      <p className="text-xs font-light">
                        {tabContent[activeTab]?.length}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pb-1">
              <AddTask onGetTasks={onGetTasks} taskData={taskData} />
            </div>
          </div>
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto px-8 pb-8">
            {tasksLoading ? (
              <p className="flex h-full items-center justify-center">
                {" "}
                Loading...
              </p>
            ) : (
              <div className="flex h-fit flex-row flex-wrap gap-1">
                {tabContent[activeTab] ? (
                  tabContent[activeTab]?.map((task, index) =>
                    task ? (
                      <SingleTask
                        key={index}
                        desc={task.description}
                        // tags={task.tags}
                        deadline={task.createdAt}
                        name={task.assignee?.name || task.assignee?.fullname}
                        email={task.assignee?.email}
                        priority={task.priority}
                        image={task.assignee?.profileImage}
                      />
                    ) : null,
                  )
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="text-center text-lg text-gray-500">No Task</p>
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
