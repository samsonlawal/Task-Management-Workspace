import tasks from "@/components/data";
import SingleTask from "../singleTask";

export default function TaskView() {
  return (
    <div className="flex h-screen flex-col gap-10 px-20 py-10 font-madei">
      {/* <div className="flex flex-1 flex-row">
        <Sidebar />
        <Workspace />
      </div> */}

      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center justify-center gap-3">
          <img src="/icons/arrow.svg" alt="" className="cursor-pointer" />
          <div className="flex flex-row gap-1 leading-3">
            <p className="text-[#707070]">
              Workspace / Infinty / <span className="text-[#000]"> to-do</span>
            </p>{" "}
          </div>
        </div>

        <div className="">
          TO-DO : <span className="text-[#707070]">{tasks.length}</span>
        </div>
      </div>

      {/* tasks */}
      <div className="flex w-full flex-row flex-wrap gap-4">
        {tasks.map((task, index) => (
          <SingleTask
            key={task.id}
            desc={task.description}
            // tags={task.tags}
            deadline={task.deadline}
            name={task.assignee.name}
            email={task.assignee.email}
            priority={task.priority}
          />
        ))}
      </div>
    </div>
  );
}
