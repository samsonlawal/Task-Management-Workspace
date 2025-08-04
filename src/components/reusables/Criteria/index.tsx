import React from "react";
import Head from "./head";
import SingleTask from "../Card";
import tasks from "@/components/data";
import AddTask from "../Dialogs/AddTask";

export default function Criteria({ text }: { text: string }) {
  console.log(tasks);
  return (
    <div className="flex h-fit w-[290px] flex-col items-center justify-between gap-4 bg-[#F2F2F2]">
      <Head header={text} />

      <div className="flex w-full flex-col justify-between gap-4 px-3">
        {tasks
          .filter((each) => each.status === text)
          .slice(0, 2)
          .map((task, index) => (
            <SingleTask
              key={task.id}
              id={task.id}
              status={task.status}
              createdAt={task.created_at}
              desc={task.description}
              // tags={task.tags}
              deadline={task.deadline}
              name={task.assignee.name}
              email={task.assignee.email}
              priority={task.priority}
            />
          ))}
      </div>

      <AddTask />
    </div>
  );
}
