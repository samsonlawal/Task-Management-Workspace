"use client";

import { StatusPill, PriorityPill, AssigneePill, DueDatePill } from "@/components/reuseables/TaskPills";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUpdateTaskMutation } from "@/redux/api/taskApiSlice";
import { useGetMembersQuery } from "@/redux/api/memberApiSlice";

import { useParams } from "next/navigation";

export default function TaskFields({ taskData }: { taskData: any }) {
  const [updateTask] = useUpdateTaskMutation();
  const params = useParams();
  const workspaceSlug = params.workspaceSlug as string;

  const { user } = useSelector((state: RootState) => state.auth) as {
    user: any;
  };
  
  const { currentWorkspaceId } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  const { data: membersData } = useGetMembersQuery(
    { workspaceId: currentWorkspaceId },
    { skip: !currentWorkspaceId },
  );

  const members =
    membersData?.members ||
    membersData?.data ||
    (Array.isArray(membersData) ? membersData : []);


  const handleUpdateField = async (updatedFields: Partial<any>) => {
    try {
      await updateTask({
        taskId: taskData.id,
        task: updatedFields,
        workspaceSlug: workspaceSlug,
      }).unwrap();
    } catch (err: any) {
      // Reverts silently based on taskApiSlice logic
    }
  };

  // console.log(members)

  return (
    <div className="poppins w-full">
      <div className="flex flex-row flex-wrap items-center gap-1 pt-1">
        <StatusPill status={taskData.status} onChange={(s) => handleUpdateField({ status: s })} />
        <PriorityPill priority={taskData.priority} onChange={(p) => handleUpdateField({ priority: p })} />
        <AssigneePill assigneeObj={taskData.assignee} members={members} onChange={(a) => handleUpdateField({ assignee: a })} />
        <DueDatePill deadline={taskData.deadline} onChange={(d) => handleUpdateField({ deadline: d })} />
      </div>
    </div>
  );
}
