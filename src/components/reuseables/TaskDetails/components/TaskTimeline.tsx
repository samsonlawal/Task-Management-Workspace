import { useEffect } from "react";
import { useGetTaskActivityQuery } from "@/redux/api/taskApiSlice";
import { DateTime } from "luxon";
import { getActivityIcon } from "@/utils/activityIcons";

export default function TaskTimeline({ taskData }: { taskData: any }) {


  const { data: activityData, isLoading } = useGetTaskActivityQuery( 
    { taskId: taskData.id },
    { skip: !taskData?.id }
  );

  useEffect(() => {
    console.log(activityData)
  }, [activityData])

    const activities: any[] = activityData?.activities || []; 
  if (isLoading) {
    return <div className="py-4 text-[12px] text-zinc-500">Loading activities...</div>;
  }
  if (activities.length === 0) {
    return <div className="py-4 text-[12px] italic text-zinc-500">No activities yet.</div>;
  }


  return (
      <div className="flex flex-col gap-0.5 overflow-y-auto max-h-[calc(100vh-250px)] pr-2 scrollbar-hide py-2">
      {activities.map((activity, index) => {
        const isLast = index === activities.length - 1;
        const {icon: Icon, color} = getActivityIcon(activity.type); 
        return (
          <div key={activity._id || index} className="flex flex-row gap-3">
            <div className="relative flex flex-col items-center select-none">
              {!isLast && (
                <div className="absolute top-6 bottom-0 w-[1.5px] bg-zinc-200 dark:bg-zinc-800" />
              )}
              <div className={`flex h-6 w-6 items-center justify-center rounded-sm bg-white border border-zinc-200 text-zinc-400 dark:bg-zinc-900 dark:border-zinc-800 z-10 shadow-xs ${color}`}>
                <Icon size={14} strokeWidth={2} className={color}/>
              </div>
            </div>
            <div className="flex-1 pb-6 pt-0.5 flex flex-row items-center gap-1.5 text-[12px] text-zinc-500 dark:text-zinc-400">
              <p className="text-zinc-600 dark:text-[#fff]/60">
                  {activity.actor?.email || activity.actor?.fullname}{" "}
                {activity.actionText}
              </p>
              <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
              <span className="text-zinc-400 dark:text-zinc-500">
                {DateTime.fromISO(activity.createdAt || activity.timestamp).toRelative()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
