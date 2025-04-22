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

import { useState } from "react";
import Navbar from "../navbar";
import tasks from "@/components/data";
import SingleTask from "@/components/reusables/singleTask";
import AddTask from "@/components/reusables/Dialogs/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Dashboard from "@/components/reusables/Dashboard";
import { useGetTasks } from "@/hooks/api/tasks";

function TabComponent() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentUI = useSelector((state: RootState) => state.ui.currentUI);
  const { data: tasks, onGetTasks } = useGetTasks();

  const tabs = ["ALL", "TO-DO", "IN-PROGRESS", "IN-REVIEW", "DONE"];
  const tabContent = [
    tasks,
    tasks.filter((task) => task.status === "todo"),
    tasks.filter((task) => task.status === "in-progress"),
    tasks.filter((task) => task.status === "in-review"),
    tasks.filter((task) => task.status === "done"),
  ];

  return (
    <div className="flex w-full flex-1 flex-col gap-6 font-madei font-normal">
      <Navbar />
      {/* Tabs Navigation */}

      {currentUI === "tasks" ? (
        <>
          <div className="mx-8 flex justify-between border-b border-gray-300 transition-all duration-300">
            <div className="flex flex-row">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`flex w-fit cursor-pointer select-none flex-row items-center gap-2 px-4 py-2 text-sm ${
                    activeTab === index
                      ? "border-b-2 border-black bg-gray-100 text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                  {index === activeTab && (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-400/60">
                      <p className="text-xs">{tabContent[activeTab].length}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pb-1">
              <AddTask />
            </div>
          </div>
          {/* Tab Content */}
          <div className="mx-8">
            <div className="flex flex-row flex-wrap gap-3">
              {tabContent[activeTab]?.length > 0 ? (
                tabContent[activeTab].map((task, index) =>
                  task ? (
                    <SingleTask
                      key={index}
                      desc={task.description}
                      // tags={task.tags}
                      deadline={task.deadline}
                      name={task.assignee?.name}
                      email={task.assignee?.email}
                      // priority={task.priority}
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
          </div>
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default TabComponent;
