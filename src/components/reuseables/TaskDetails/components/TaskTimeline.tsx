import { useMemo } from "react";
import { DateTime } from "luxon";
import { Plus, UserPlus, CheckCircle2, Flag, Info } from "lucide-react";
import { getStatusStyles } from "@/utils/taskStyles";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function TaskTimeline({ taskData }: { taskData: any }) {
  const MemberData = useSelector((state: RootState) => state.MemberData);
  const members = MemberData?.members || [];

  const activities = useMemo(() => {
    const list = [];
    
    // Find creator details
    const creatorMember = members.find(
      (m: any) => (m.userId?._id || m._id) === taskData.createdBy
    );
    const creatorName = creatorMember?.userId?.fullname || creatorMember?.fullname || "Workspace Member";
    
    // 1. Create activity
    list.push({
      id: "act-create",
      actor: {
        name: creatorName,
        profileImage: undefined,
      },
      type: "create" as const,
      action: "created this task",
      timestamp: taskData.createdAt,
    });

    // 2. Assignee activity
    if (taskData.assignee?.name) {
      list.push({
        id: "act-assign",
        actor: {
          name: "Workspace Member",
          profileImage: undefined,
        },
        type: "assignee" as const,
        action: `assigned this task to ${taskData.assignee.name}`,
        timestamp: taskData.createdAt,
      });
    }

    // 3. Status activity
    if (taskData.status !== "to-do" && taskData.status !== "TO-DO") {
      list.push({
        id: "act-status",
        actor: {
          name: taskData.assignee?.name || "Workspace Member",
          profileImage: taskData.assignee?.image,
        },
        type: "status" as const,
        action: `updated status to ${getStatusStyles(taskData.status).label}`,
        timestamp: DateTime.fromISO(taskData.createdAt).plus({ minutes: 30 }).toISO() || taskData.createdAt,
      });
    }

    // 4. Priority activity
    list.push({
      id: "act-priority",
      actor: {
        name: "Workspace Member",
        profileImage: undefined,
      },
      type: "priority" as const,
      action: `set priority to ${taskData.priority}`,
      timestamp: taskData.createdAt,
    });

    // Sort by timestamp
    return list.sort((a, b) => DateTime.fromISO(a.timestamp).toMillis() - DateTime.fromISO(b.timestamp).toMillis());
  }, [taskData]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "create":
        return <Plus size={11} className="text-emerald-500" />;
      case "assignee":
        return <UserPlus size={11} className="text-blue-500" />;
      case "status":
        return <CheckCircle2 size={11} className="text-indigo-500" />;
      case "priority":
        return <Flag size={11} className="text-amber-500" />;
      default:
        return <Info size={11} className="text-zinc-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-0.5 overflow-y-auto max-h-[calc(100vh-250px)] pr-2 scrollbar-hide py-2">
      {activities.map((activity, index) => {
        const isLast = index === activities.length - 1;
        return (
          <div key={activity.id} className="flex flex-row gap-3">
            {/* Icon & Connection Line Column */}
            <div className="relative flex flex-col items-center select-none">
              {/* Connection Line running through the center of the icon circle */}
              {!isLast && (
                <div className="absolute top-6 bottom-0 w-[1.5px] bg-zinc-200 dark:bg-zinc-800" />
              )}
              {/* Icon Circle */}
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-400 dark:bg-zinc-900 dark:border-zinc-800 z-10 shadow-xs">
                {getActivityIcon(activity.type)}
              </div>
            </div>
            
            {/* Content Column */}
            <div className="flex-1 pb-6 pt-0.5 flex flex-row items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
              <p className="text-zinc-600 dark:text-zinc-300">
                <span className="font-semibold text-zinc-800 dark:text-white">{activity.actor.name}</span> {activity.action}
              </p>
              <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
              <span className="text-zinc-400 dark:text-zinc-500">
                {DateTime.fromISO(activity.timestamp).toRelative()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
