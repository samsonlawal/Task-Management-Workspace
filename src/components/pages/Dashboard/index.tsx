"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/redux/Slices/uiSlice";
import { RootState } from "@/redux/store";
import { CustomSelect } from "../../reuseables/select";
import Notification from "@/components/reuseables/Notification";
import stringToColor from "@/utils/stringToColor";
import { 
  PanelLeft, 
  Users, 
  CheckCircle2, 
  Clock, 
  Bot, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  Activity, 
  Sparkles,
  ClipboardList
} from "lucide-react";
import { motion } from "framer-motion";
import AddMember from "../../reuseables/Dialogs/AddMember";

function Dashboard() {
  const dispatch = useDispatch();

  const members = useSelector(
    (state: RootState) => state.MemberData?.members || [],
  );

  const tasks = useSelector(
    (state: RootState) => state.TasksData?.task || [],
  );

  const { currentWorkspaceId } = useSelector(
    (state: any) => state.currentWorkspace,
  );

  // Parse analytics states dynamically
  const totalTasksCount = tasks.length;
  const completedTasksCount = useMemo(() => {
    return tasks.filter((t: any) => t.status?.toLowerCase() === "done" || t.status?.toLowerCase() === "completed").length;
  }, [tasks]);

  const activeTasksCount = totalTasksCount - completedTasksCount;
  
  const completionRate = useMemo(() => {
    return totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
  }, [totalTasksCount, completedTasksCount]);

  // Compute workloads per member
  const memberWorkloads = useMemo(() => {
    return members.map((member: any) => {
      const userObj = member.userId || member;
      const fullname = userObj?.fullname || member?.fullname || "Unknown User";
      const email = userObj?.email || member?.email || "";
      const profileImage = userObj?.profileImage || member?.profileImage || "none";
      
      const memberTasks = tasks.filter((t: any) => t.assignee?.email === email);
      const memberCompleted = memberTasks.filter((t: any) => t.status?.toLowerCase() === "done" || t.status?.toLowerCase() === "completed").length;
      
      return {
        fullname,
        email,
        profileImage,
        totalTasks: memberTasks.length,
        progress: memberTasks.length > 0 ? Math.round((memberCompleted / memberTasks.length) * 100) : 0,
      };
    }).filter(m => m.totalTasks > 0)
      .sort((a, b) => b.totalTasks - a.totalTasks);
  }, [members, tasks]);

  // Urgent upcoming tasks
  const upcomingTasks = useMemo(() => {
    return tasks.filter((t: any) => t.status?.toLowerCase() !== "done" && t.status?.toLowerCase() !== "completed")
      .slice(0, 4)
      .map((t: any) => {
        const priorityColor = 
          t.priority?.toLowerCase() === "high" 
            ? "text-red-500 bg-red-500/10" 
            : t.priority?.toLowerCase() === "medium"
            ? "text-amber-500 bg-amber-500/10"
            : "text-zinc-500 bg-zinc-500/10";

        return {
          id: t.id || t._id,
          title: t.title || "Untitled Task",
          priority: t.priority || "Low",
          deadline: t.deadline || "No due date",
          priorityClass: priorityColor
        };
      });
  }, [tasks]);

  // Mock workspace activity feed
  const recentActivities = [
    { id: 1, type: "commit", text: "s-lawal committed to main: 'fix: resolve workspace select state issue'", time: "2 hours ago", user: "Samson Lawal" },
    { id: 2, type: "comment", text: "Sarah Jenkins commented on #general: 'Let's review the designs tomorrow'", time: "4 hours ago", user: "Sarah Jenkins" },
    { id: 3, type: "task", text: "Michael Chang created task: 'Design login view layout'", time: "1 day ago", user: "Michael Chang" },
    { id: 4, type: "integration", text: "Slack Bridge integration was connected to the workspace", time: "2 days ago", user: "System" }
  ];

  return (
    <div className="flex h-fit w-full flex-col gap-5 px-8 pb-10 transition-all duration-300">
      {/* Top sticky navbar */}
      <div className="sticky top-0 w-full bg-[white] dark:bg-[#111] z-10">
        <div className="poppins flex w-full items-center justify-between border-b border-[#565656]/10 py-[7px]">
          <div className="flex flex-row justify-center items-center">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="flex lg:hidden px-1 lg:p-2 text-[#707070] hover:text-[#111] dark:hover:text-white transition-all duration-300 mr-2"
              title="Toggle Sidebar"
            >
              <PanelLeft size={18} strokeWidth={1.6} />
            </button>
            <h2 className="poppins-medium text-md lg:text-xl text-[#111] dark:text-white">
              Dashboard
            </h2>
          </div>
          
          <div className="flex flex-row items-center justify-center gap-3">
            <Notification />
            <CustomSelect
              options={[
                { label: "Samson's Space", value: "Samson's" },
                { label: "Space's Workspace", value: "Space's" },
                { label: "Global Tracker", value: "Global" },
              ]}
              placeholder="Workspace Selector"
            />
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {/* KPI 1: Active Tasks */}
        <div className="rounded-[8px] border border-[#565656]/15 bg-white p-5 shadow-sm dark:bg-[#1a1a1a]/30 dark:border-[#565656]/10 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium tracking-wide text-[#707070] uppercase">Active Tasks</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
              <ClipboardList className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-[#111] dark:text-white">{activeTasksCount}</span>
            <span className="text-[10px] text-[#707070] font-medium">/{totalTasksCount} total</span>
          </div>
        </div>

        {/* KPI 2: Completion Rate */}
        <div className="rounded-[8px] border border-[#565656]/15 bg-white p-5 shadow-sm dark:bg-[#1a1a1a]/30 dark:border-[#565656]/10 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium tracking-wide text-[#707070] uppercase">Progress</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-[#111] dark:text-white">{completionRate}%</span>
            <span className="text-[10px] text-green-500 font-medium flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> completed
            </span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${completionRate}%` }} />
          </div>
        </div>

        {/* KPI 3: Members */}
        <div className="rounded-[8px] border border-[#565656]/15 bg-white p-5 shadow-sm dark:bg-[#1a1a1a]/30 dark:border-[#565656]/10 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium tracking-wide text-[#707070] uppercase">Team Members</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-[#111] dark:text-white">{members.length}</span>
            <span className="text-[10px] text-[#707070] font-medium">collaborators</span>
          </div>
        </div>

        {/* KPI 4: Active Apps */}
        <div className="rounded-[8px] border border-[#565656]/15 bg-white p-5 shadow-sm dark:bg-[#1a1a1a]/30 dark:border-[#565656]/10 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium tracking-wide text-[#707070] uppercase">Integrations</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <Bot className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-[#111] dark:text-white">1</span>
            <span className="text-[10px] text-amber-500 font-medium">GitHub linked</span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-2">
        
        {/* Left Side: Workload & Urgent tasks */}
        <div className="lg:col-span-2 space-y-5">
          {/* Workload Distribution */}
          <div className="rounded-[8px] border border-[#565656]/15 bg-white p-6 shadow-sm dark:bg-[#1a1a1a]/30 dark:border-[#565656]/10">
            <div className="flex items-center justify-between border-b border-[#565656]/10 pb-4 mb-4">
              <h3 className="text-sm font-semibold text-[#111] dark:text-white flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-zinc-500" />
                <span>Active Workloads</span>
              </h3>
              <span className="text-[11px] text-[#707070]">{memberWorkloads.length} members with tasks</span>
            </div>

            <div className="space-y-4">
              {memberWorkloads.length > 0 ? (
                memberWorkloads.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 w-[180px]">
                      {member.profileImage === "none" ? (
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] text-white font-semibold"
                          style={{ backgroundColor: stringToColor(member.fullname) }}
                        >
                          {member.fullname.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <img src={member.profileImage} alt="" className="h-7 w-7 rounded-full object-cover" />
                      )}
                      <div className="flex flex-col truncate leading-tight">
                        <span className="text-[12px] font-medium text-[#111] dark:text-white truncate">{member.fullname}</span>
                        <span className="text-[10px] text-[#707070] truncate">{member.email}</span>
                      </div>
                    </div>

                    <div className="flex-1 max-w-[200px] bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden mx-4">
                      <div className="bg-zinc-900 dark:bg-white h-full transition-all duration-300" style={{ width: `${member.progress}%` }} />
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[12px] font-medium text-[#111] dark:text-white">{member.totalTasks} Tasks</span>
                      <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                        {member.progress}% done
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[12px] text-gray-500 italic py-4">No tasks currently assigned to workspace collaborators.</p>
              )}
            </div>
          </div>

          {/* Urgent Milestones / Upcoming Tasks */}
          <div className="rounded-[8px] border border-[#565656]/15 bg-white p-6 shadow-sm dark:bg-[#1a1a1a]/30 dark:border-[#565656]/10">
            <div className="flex items-center justify-between border-b border-[#565656]/10 pb-4 mb-4">
              <h3 className="text-sm font-semibold text-[#111] dark:text-white flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-zinc-500" />
                <span>Urgent Milestones</span>
              </h3>
              <span className="text-[11px] text-[#707070]">Upcoming deadlines</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => (
                  <div key={task.id} className="p-3 border border-[#565656]/10 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded ${task.priorityClass}`}>
                        {task.priority}
                      </span>
                      <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.deadline}
                      </span>
                    </div>
                    <h4 className="text-[13px] font-medium text-[#111] dark:text-white mt-2.5 truncate">{task.title}</h4>
                  </div>
                ))
              ) : (
                <p className="col-span-2 text-[12px] text-gray-500 italic py-4 text-center">All upcoming milestones are completed!</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Timeline Activity & Quick Actions */}
        <div className="space-y-5">
          {/* Quick Actions Panel */}
          <div className="rounded-[8px] border border-[#565656]/15 bg-white p-6 shadow-sm dark:bg-[#1a1a1a]/30 dark:border-[#565656]/10">
            <h3 className="text-sm font-semibold text-[#111] dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <AddMember />
              <button 
                onClick={() => dispatch(toggleSidebar())} 
                className="w-full flex items-center justify-between rounded-lg border border-[#565656]/20 bg-gray-50/50 hover:bg-[#565656]/15 px-4 py-2.5 text-[12px] font-medium text-[#111] dark:text-white dark:bg-[#161616]/40 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Configure Integrations</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="rounded-[8px] border border-[#565656]/15 bg-white p-6 shadow-sm dark:bg-[#1a1a1a]/30 dark:border-[#565656]/10">
            <h3 className="text-sm font-semibold text-[#111] dark:text-white flex items-center gap-2 border-b border-[#565656]/10 pb-4 mb-4">
              <Activity className="w-4.5 h-4.5 text-zinc-500" />
              <span>Workspace Activity</span>
            </h3>

            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.map((act, index) => (
                  <li key={act.id}>
                    <div className="relative pb-6">
                      {index !== recentActivities.length - 1 && (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-850 flex items-center justify-center text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                            {act.user.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 pt-1.5">
                          <p className="text-[12px] text-zinc-600 dark:text-zinc-300">
                            {act.text}
                          </p>
                          <div className="text-[10px] text-zinc-400 mt-0.5">
                            {act.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
