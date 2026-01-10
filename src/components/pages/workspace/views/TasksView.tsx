"use client";

import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { SquareKanban, List, Folder, GalleryHorizontal } from "lucide-react";

import { RootState } from "@/redux/store";
import { useGetTasks } from "@/hooks/api/tasks";
import Loader from "@/utils/loader";
import Card from "@/components/reuseables/Card";
import ListTask from "@/components/reuseables/List";
import ListHeader from "@/components/reuseables/List/ListHeader";
import AddTask from "@/components/reuseables/Dialogs/AddTask";
import Notification from "@/components/reuseables/Notification";

const tabby = [
  {
    name: "Overview",
    icon: <GalleryHorizontal strokeWidth={2} size={18} />,
  },
  {
    name: "My Tasks",
    icon: <Folder strokeWidth={2} size={18} />,
  },
];

const STATUS_SECTIONS = ["TO-DO", "IN-PROGRESS", "IN-REVIEW", "DONE"] as const;

function TasksView() {
  const dispatch = useDispatch();
  const { resolvedTheme } = useTheme();

  const { user } = useSelector((state: any) => state.auth);

  // Tasks Logic
  const tasks = useSelector((state: RootState) =>
    Array.isArray(state.TasksData?.task) ? state.TasksData.task : [],
  );

  const { data: taskData, onGetTasks, loading: tasksLoading } = useGetTasks();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTabs, setActiveTabs] = useState<string>("");
  const [byStatus, setByStatus] = useState<boolean>(true);
  const [view, setView] = useState<"board" | "list">("board");

  const tabs = ["Overview", "My Issues"];

  const normalizeStatus = (status?: string) => {
    if (!status) return "TO-DO";
    const s = status.toLowerCase();
    if (s === "to-do") return "TO-DO";
    if (s === "in-progress") return "IN-PROGRESS";
    if (s === "in-review") return "IN-REVIEW";
    if (s === "done") return "DONE";
    return "TO-DO";
  };

  const tabContent = useMemo(() => {
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    return [
      safeTasks,
      safeTasks.filter((task) => task?.assignee?._id === user?._id),
    ];
  }, [tasks, user]);

  const groupedTasks = useMemo(() => {
    const activeTasks = tabContent[activeTab] ?? [];

    // pre-fill sections so they ALWAYS exist
    const initial = STATUS_SECTIONS.reduce<Record<string, any[]>>(
      (acc, status) => {
        acc[status] = [];
        return acc;
      },
      {},
    );

    return activeTasks.reduce((acc, task) => {
      const status = normalizeStatus(task.status);
      acc[status].push(task);
      return acc;
    }, initial);
  }, [tabContent, activeTab]);

  const changeToListView = () => setView("list");
  const changeToBoardView = () => setView("board");

  useEffect(() => {
    // Debug logging preserved from original
    if (user) {
      console.log("USER:", user);
      console.log("USER_ID:", user?._id);
    }
  }, [user]);

  useEffect(() => {
    console.log("USER ID:", user?._id);
    console.log(
      "Task Assignees:",
      tasks.map((t: any) => t.assignee?._id),
    );
  }, [user, tasks]);

  useEffect(() => {
    console.log(activeTabs);
  }, [activeTab]); // activeTabs in dep array of original was missing, but console.log uses it. logic wise it logs updated value? actually activeTabs state update is distinct. keeping as is.

  return (
    <div className="flex h-full w-full flex-col">
      {/* Navbar / Header for Tasks */}
      <div className="sticky top-0 w-full bg-[white] dark:bg-[#111]">
        <div className="poppins flex w-full items-center justify-between border-b-[1px] border-[#565656]/10 px-[32px] py-[7px]">
          <h2 className="poppins-medium text-xl text-[#111] dark:text-white">
            Issues
          </h2>
          <div className="flex flex-row items-center justify-center gap-2">
            <Notification />

            <button
              className={`flex h-[36px] cursor-pointer flex-row items-center gap-1 rounded-[6px] border-[1.7px] border-[#565656]/20 px-3 py-1 text-[12px] font-medium text-[#111] transition-all duration-300 hover:bg-[#565656]/10 active:scale-95 dark:text-[#fff]/50 ${
                byStatus ? "dark:bg-[#565656]/20" : ""
              }`}
              onClick={() => setByStatus(!byStatus)}
            >
              <img
                src={
                  resolvedTheme === "dark"
                    ? "/icons/gbs-dark.svg"
                    : "/icons/gbs.svg"
                }
                alt=""
                className="w-3"
              />
              <p>Group by status</p>
            </button>

            <button
              className="flex h-[36px] cursor-not-allowed flex-row items-center gap-1 rounded-[6px] border-[1.7px] border-[#565656]/20 px-3 py-1 text-[12px] font-medium text-[#111] transition-all duration-300 hover:bg-[#565656]/10 active:scale-95 dark:text-[#fff]/50"
              disabled={true}
            >
              <img
                src={
                  resolvedTheme === "dark"
                    ? "/icons/funnel-dark.svg"
                    : "/icons/funnel.svg"
                }
                alt=""
                className="w-3"
              />
              <p>Filter</p>
            </button>

            <AddTask onGetTasks={onGetTasks} taskData={taskData} />
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-2 flex h-fit items-center justify-between px-8 pt-6 transition-all duration-300">
        <div className="flex h-max flex-row rounded-md bg-[#eee] px-1 py-1 dark:bg-[#1a1a1a]">
          {tabs?.map((tab, index) => (
            <div
              key={index}
              className={`flex h-fit w-fit cursor-pointer select-none flex-row items-center gap-1 rounded-sm px-3 py-1.5 text-[12px] font-[500] ${
                activeTab === index
                  ? "border-[#565656]/20 bg-white text-black dark:bg-[#565656]/20 dark:text-white"
                  : "text-gray-500 hover:text-black dark:text-white/50"
              }`}
              onClick={() => {
                setActiveTab(index);
                setActiveTabs(tabs[index]);
              }}
            >
              {tab}
              {index === activeTab && (
                <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-400/40">
                  <p className="text-[10px] font-regular">
                    {tabContent[activeTab]?.length}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-row items-center justify-center gap-2 pb-1">
          <div
            className={`flex h-[34px] cursor-pointer flex-row items-center gap-1 rounded-[6px] border-[1.7px] border-[#565656]/20 px-3 py-1 text-[12px] font-medium text-[#111] transition-all duration-300 hover:bg-[#565656]/10 active:scale-95 dark:text-[#fff]/50 ${
              view === "board" ? "bg-[#565656]/10 dark:bg-[#565656]/20" : ""
            }`}
            onClick={changeToBoardView}
          >
            <SquareKanban
              className="text-center text-[#111] dark:text-[#fff]/50"
              strokeWidth={1.5}
              size={14}
            />
            <p>Board</p>
          </div>

          <div
            className={`flex h-[34px] cursor-pointer flex-row items-center gap-1 rounded-[6px] border-[1.7px] border-[#565656]/20 px-3 py-1 text-[12px] font-medium text-[#111] transition-all duration-300 hover:bg-[#565656]/10 active:scale-95 dark:text-[#fff]/50 ${
              view === "list" ? "bg-[#565656]/10 dark:bg-[#565656]/20" : ""
            }`}
            onClick={changeToListView}
          >
            <List
              className="text-center text-[#111] dark:text-[#fff]/50"
              strokeWidth={1.5}
              size={14}
            />
            <p>List</p>
          </div>
        </div>
      </div>

      {/* Tasks Content */}
      <div className="w-full flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
        {tasksLoading ? (
          <p className="flex h-full items-center justify-center">
            <Loader loaderSize={40} />
          </p>
        ) : view === "list" ? (
          <div className="flex h-fit w-full flex-col flex-wrap justify-between gap-1 rounded-[18px] pb-[6px]">
            <div>
              <div className="flex h-fit w-full flex-row flex-wrap justify-start gap-5 rounded-[18px] pb-[6px]">
                {byStatus ? (
                  STATUS_SECTIONS.map((status) => (
                    <div
                      key={status}
                      className="flex w-full flex-col gap-1 rounded-md bg-[#eee] p-2 dark:bg-[#565656]/10"
                    >
                      <div className="flex min-h-fit w-full flex-row justify-between rounded-sm px-2 py-2 text-[14px] font-medium text-[#787878]">
                        {status}
                      </div>

                      <ListHeader />

                      <div className="flex h-fit w-full flex-row flex-wrap justify-start rounded-[18px]">
                        {groupedTasks[status].length
                          ? groupedTasks[status].map((task: any) => (
                              <ListTask
                                key={task._id}
                                desc={task.description}
                                deadline={task.deadline}
                                name={
                                  task.assignee?.name || task.assignee?.fullname
                                }
                                email={task.assignee?.email}
                                priority={task.priority}
                                image={task.assignee?.profileImage}
                                id={task._id}
                                status={task.status}
                                createdAt={task.createdAt}
                              />
                            ))
                          : null}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-fit w-full flex-col flex-wrap justify-start rounded-[18px]">
                    <ListHeader />
                    {tabContent[activeTab]?.map((task) =>
                      task ? (
                        <ListTask
                          key={task._id}
                          desc={task.description}
                          deadline={task.deadline}
                          name={task.assignee?.name || task.assignee?.fullname}
                          email={task.assignee?.email}
                          priority={task.priority}
                          image={task.assignee?.profileImage}
                          id={task._id}
                          status={task.status}
                          createdAt={task.createdAt}
                        />
                      ) : null,
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-fit w-full flex-row flex-wrap justify-start gap-5 rounded-[18px] pb-[6px]">
            {byStatus ? (
              STATUS_SECTIONS.map((status) => (
                <div
                  key={status}
                  className="flex w-full flex-col gap-1 rounded-md bg-[#eee] p-2 dark:bg-[#565656]/10"
                >
                  <div className="flex min-h-fit w-full flex-row justify-between rounded-sm px-2 py-2 text-[14px] font-medium text-[#787878]">
                    {status}
                  </div>

                  <div className="flex h-fit w-full flex-row flex-wrap justify-start gap-2 rounded-[18px]">
                    {groupedTasks[status].length
                      ? groupedTasks[status].map((task: any) => (
                          <Card
                            key={task._id}
                            desc={task.description}
                            deadline={task.deadline}
                            name={
                              task.assignee?.name || task.assignee?.fullname
                            }
                            email={task.assignee?.email}
                            priority={task.priority}
                            image={task.assignee?.profileImage}
                            id={task._id}
                            status={task.status}
                            createdAt={task.createdAt}
                          />
                        ))
                      : null}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-fit w-full flex-row flex-wrap justify-start gap-2 rounded-[18px] pb-[6px]">
                {tabContent[activeTab]?.map((task) =>
                  task ? (
                    <Card
                      key={task._id}
                      desc={task.description}
                      deadline={task.deadline}
                      name={task.assignee?.name || task.assignee?.fullname}
                      email={task.assignee?.email}
                      priority={task.priority}
                      image={task.assignee?.profileImage}
                      id={task._id}
                      status={task.status}
                      createdAt={task.createdAt}
                    />
                  ) : null,
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksView;
