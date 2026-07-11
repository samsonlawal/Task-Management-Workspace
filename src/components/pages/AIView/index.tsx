"use client";

import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/redux/Slices/uiSlice";
import { RootState } from "@/redux/store";
import { setTasks } from "@/redux/Slices/taskSlice";
import { 
  PanelLeft, 
  Sparkles, 
  Bot, 
  Wand2, 
  FileText, 
  Terminal, 
  AlertCircle, 
  Check, 
  Calendar, 
  Clock, 
  Search,
  Brain,
  Zap,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import TaskDetails from "../../reuseables/TaskDetails";

interface MockGeneratedTask {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "to-do" | "in-progress";
  deadline: string;
}

function AIView() {
  const dispatch = useDispatch();

  // Select stats from Redux
  const tasks = useSelector((state: RootState) => state.TasksData?.task || []);
  const members = useSelector((state: RootState) => state.MemberData?.members || []);
  const { user } = useSelector((state: RootState) => state.auth || {}) as { user: any };

  const [activeTab, setActiveTab] = useState<"generator" | "standup" | "query" | "risk">("generator");

  // --- TAB 1: AI TASK GENERATOR ---
  const [taskPrompt, setTaskPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<MockGeneratedTask[]>([]);

  const handleGenerateTasks = () => {
    if (!taskPrompt.trim()) {
      showErrorToast({ message: "Please type a goal description first." });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      // Simulate intelligent breakdown based on prompt
      const term = taskPrompt.toLowerCase();
      let results: MockGeneratedTask[] = [];

      if (term.includes("auth") || term.includes("login") || term.includes("signup")) {
        results = [
          { title: "Set up OAuth login credentials", description: "Register Google & GitHub OAuth client keys in developer portals and configure env files.", priority: "High", status: "to-do", deadline: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10) },
          { title: "Design authentication UI forms", description: "Create responsive Login and Signup form pages with monochrome tailwind inputs and loaders.", priority: "Medium", status: "to-do", deadline: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10) },
          { title: "Implement session middleware validations", description: "Integrate server validations, cookie sessions, and secure route redirects for unauthorized users.", priority: "High", status: "to-do", deadline: new Date(Date.now() + 86400000 * 4).toISOString().slice(0, 10) },
        ];
      } else if (term.includes("stripe") || term.includes("payment") || term.includes("checkout")) {
        results = [
          { title: "Configure Stripe checkout sessions webhook", description: "Write backend endpoint to capture invoice.paid and checkout.session.completed events.", priority: "High", status: "to-do", deadline: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10) },
          { title: "Build billing dashboard UI plans", description: "Create simple billing tier selector buttons to redirect users to Stripe Checkout portals.", priority: "Medium", status: "to-do", deadline: new Date(Date.now() + 86400000 * 4).toISOString().slice(0, 10) },
        ];
      } else {
        // Fallback generic generator
        results = [
          { title: `Initialize scaffold for: ${taskPrompt}`, description: "Prepare components folder, set up initial route, and draft core models.", priority: "Medium", status: "to-do", deadline: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10) },
          { title: `Write unit test suites for new module`, description: "Add coverage for critical controllers, services, and core schema validation rules.", priority: "Low", status: "to-do", deadline: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10) },
        ];
      }

      setGeneratedTasks(results);
      setIsGenerating(false);
      showSuccessToast({ message: `Generated ${results.length} sub-tasks successfully!` });
    }, 1200);
  };

  const handleInsertTasks = () => {
    if (generatedTasks.length === 0) return;

    // Convert to proper schema for Redux tasks
    const formatted = generatedTasks.map((t, idx) => ({
      _id: `ai-gen-${Date.now()}-${idx}`,
      id: `ai-gen-${Date.now()}-${idx}`,
      title: t.title,
      description: t.description,
      priority: t.priority,
      status: t.status,
      deadline: t.deadline,
      assignee: {
        name: user?.fullname || "Unassigned",
        email: user?.email || "",
        image: "none",
      },
      createdAt: new Date().toISOString(),
    }));

    dispatch(setTasks([...tasks, ...formatted]));
    setGeneratedTasks([]);
    setTaskPrompt("");
    showSuccessToast({ message: `Injected ${formatted.length} tasks directly into the Tasks board!` });
  };

  // --- TAB 2: STANDUP AGGREGATOR ---
  const standupReport = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t: any) => t.status?.toLowerCase() === "done" || t.status?.toLowerCase() === "completed").length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // User tasks
    const myTasks = tasks.filter((t: any) => t.assignee?.email === user?.email);
    const myCompleted = myTasks.filter((t: any) => t.status?.toLowerCase() === "done" || t.status?.toLowerCase() === "completed");
    const myActive = myTasks.filter((t: any) => t.status?.toLowerCase() !== "done" && t.status?.toLowerCase() !== "completed");

    return {
      total,
      completed,
      rate,
      myTotal: myTasks.length,
      myCompleted: myCompleted.length,
      myActiveList: myActive,
      summary: `Workspace progress is currently at ${rate}% velocity (${completed}/${total} tasks finished). You have completed ${myCompleted.length} of your assigned items, with ${myActive.length} still in progress.`
    };
  }, [tasks, user]);

  // --- TAB 3: AI QUERY ASSISTANT (Natural Language filter) ---
  const [nlQuery, setNlQuery] = useState("");
  const filteredQueryTasks = useMemo(() => {
    if (!nlQuery.trim()) return [];
    const term = nlQuery.toLowerCase();

    return tasks.filter((t: any) => {
      // Direct keyword matches
      const titleMatch = t.title ? t.title.toLowerCase().includes(term) : false;
      const descMatch = t.description ? t.description.toLowerCase().includes(term) : false;
      const priorityMatch = t.priority ? t.priority.toLowerCase() === term : false;
      const statusMatch = t.status ? (
        t.status.toLowerCase() === term || 
        (term === "todo" && t.status.toLowerCase() === "to-do") ||
        (term === "done" && t.status.toLowerCase() === "completed")
      ) : false;
      const assigneeMatch = (t.assignee?.name && t.assignee.name.toLowerCase().includes(term)) || 
                            (t.assignee?.email && t.assignee.email.toLowerCase().includes(term));

      return titleMatch || descMatch || priorityMatch || statusMatch || assigneeMatch;
    });
  }, [tasks, nlQuery]);

  // --- TAB 4: RISK PREDICTOR ---
  const atRiskTasks = useMemo(() => {
    return tasks.filter((t: any) => {
      const isDone = t.status?.toLowerCase() === "done" || t.status?.toLowerCase() === "completed";
      if (isDone) return false;

      // Check if deadline is past or approaching in 1 day
      if (!t.deadline) return false;
      const dueDate = new Date(t.deadline);
      const diffTime = dueDate.getTime() - Date.now();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays <= 1; // Due today, tomorrow, or overdue
    }).map((t: any) => {
      const dueDate = new Date(t.deadline);
      const diffTime = dueDate.getTime() - Date.now();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let riskLevel: "High" | "Medium" = "Medium";
      let message = "";

      if (diffDays < 0) {
        riskLevel = "High";
        message = `Task is overdue by ${Math.abs(diffDays)} day(s). Needs immediate follow-up.`;
      } else if (diffDays === 0) {
        riskLevel = "High";
        message = "Task is due today and still in-progress.";
      } else {
        message = "Task is due tomorrow and still in-progress.";
      }

      return {
        ...t,
        riskLevel,
        message,
        daysLeft: diffDays
      };
    });
  }, [tasks]);

  return (
    <div className="flex h-fit w-full flex-col gap-5 pb-10 transition-all duration-300">
      {/* Navbar header */}
      <div className="sticky top-0 w-full bg-[white] dark:bg-[#111] z-10 px-4 lg:px-8">
        <div className="poppins flex w-full items-center justify-between border-b border-[#565656]/10 py-[7px]">
          <div className="flex flex-row justify-center items-center">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="flex lg:hidden px-1 lg:p-2 text-[#707070] hover:text-[#111] dark:hover:text-white transition-all duration-300 mr-2"
              title="Toggle Sidebar"
            >
              <PanelLeft size={18} strokeWidth={1.6} />
            </button>
            <h2 className="poppins-medium text-md lg:text-xl text-[#111] dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              <span>AI Workspace Hub</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 flex flex-col gap-6">
        {/* Intro Card */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
              <span>Intelligent Team Companion</span>
              <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold px-2 py-0.5 rounded-full uppercase">Beta</span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed max-w-3xl">
              Supercharge your daily project workflow. Use AI to auto-generate task checklists, draft team standup status cards, query metrics in plain English, and forecast project delivery bottleneck risks.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#565656]/10">
          <button
            onClick={() => setActiveTab("generator")}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "generator"
                ? "border-[#563892] text-[#563892] dark:border-white dark:text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Task Spec Generator</span>
          </button>
          <button
            onClick={() => setActiveTab("standup")}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "standup"
                ? "border-[#563892] text-[#563892] dark:border-white dark:text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Daily Standup Drafts</span>
          </button>
          <button
            onClick={() => setActiveTab("query")}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "query"
                ? "border-[#563892] text-[#563892] dark:border-white dark:text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Natural Language Query</span>
          </button>
          <button
            onClick={() => setActiveTab("risk")}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "risk"
                ? "border-[#563892] text-[#563892] dark:border-white dark:text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Risk Forecasts</span>
            {atRiskTasks.length > 0 && (
              <span className="h-2 w-2 rounded-full bg-rose-500" />
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="mt-2 min-h-[300px]">
          
          {/* TAB 1: GENERATOR */}
          {activeTab === "generator" && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">
                  What feature or module are you building?
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="e.g. Stripe payment checkout screen, OAuth login flows, or PostgreSQL backup schedules"
                    value={taskPrompt}
                    onChange={(e) => setTaskPrompt(e.target.value)}
                    className="flex-1 h-[42px] rounded-lg border border-gray-300 dark:border-zinc-850 bg-transparent px-3 text-xs text-black dark:text-white outline-none focus:border-zinc-500"
                  />
                  <button
                    onClick={handleGenerateTasks}
                    disabled={isGenerating}
                    className="h-[42px] px-5 rounded-lg bg-[#563892] text-white text-xs font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Breaking down...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Generate Specs</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Generated tasks preview list */}
              {generatedTasks.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      AI Generated Specs Checklist
                    </h4>
                    <button
                      onClick={handleInsertTasks}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-95 flex items-center gap-1.5 transition-opacity"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Inject Tasks to Workspace</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {generatedTasks.map((t, idx) => (
                      <div key={idx} className="p-4 border border-[#565656]/15 rounded-lg bg-white dark:bg-[#1a1a1a]/30">
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-semibold text-[#111] dark:text-white">{t.title}</h5>
                          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded ${
                            t.priority === "High" ? "bg-red-500/10 text-red-500" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          }`}>
                            {t.priority}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">{t.description}</p>
                        <div className="flex gap-4 mt-3 pt-3 border-t border-[#565656]/5 text-[10px] text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Due: {t.deadline}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bot className="w-3 h-3 text-[#563892]" />
                            Auto-assignee: You
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DAILY STANDUP */}
          {activeTab === "standup" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl animate-fadeIn">
              {/* Standup report summary card */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-5 border border-[#565656]/15 rounded-xl bg-white dark:bg-[#1a1a1a]/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#565656]/10 pb-3">
                    <h4 className="text-sm font-semibold text-[#111] dark:text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-500" />
                      <span>Workspace Daily Standup Card</span>
                    </h4>
                    <span className="text-[10px] font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                      Velocity: {standupReport.rate}%
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-mono bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-lg border border-[#565656]/5">
                    {standupReport.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 border border-[#565656]/10 rounded-lg">
                      <span className="text-[10px] text-zinc-400 block font-medium uppercase">Tasks Finished</span>
                      <span className="text-xl font-bold text-[#111] dark:text-white mt-1 block">
                        {standupReport.completed}/{standupReport.total}
                      </span>
                    </div>
                    <div className="p-3 border border-[#565656]/10 rounded-lg">
                      <span className="text-[10px] text-zinc-400 block font-medium uppercase">My Workload</span>
                      <span className="text-xl font-bold text-[#111] dark:text-white mt-1 block">
                        {standupReport.myCompleted}/{standupReport.myTotal}
                      </span>
                    </div>
                  </div>
                </div>

                {/* My In progress tasks lists */}
                <div className="p-5 border border-[#565656]/15 rounded-xl bg-white dark:bg-[#1a1a1a]/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    My Active Standup Tasks Checklist
                  </h4>
                  {standupReport.myActiveList.length > 0 ? (
                    <div className="space-y-2">
                      {standupReport.myActiveList.map((t: any) => (
                        <div key={t.id || t._id} className="flex justify-between items-center p-2.5 bg-zinc-50/50 dark:bg-zinc-900/10 border border-[#565656]/5 rounded-md">
                          <span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.title}</span>
                          <span className="text-[9px] font-semibold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-400 italic py-2">You have no active tasks currently pending standup updates.</p>
                  )}
                </div>
              </div>

              {/* Sidebar helper summary */}
              <div className="p-5 border border-[#565656]/15 rounded-xl bg-white dark:bg-[#1a1a1a]/30 h-fit space-y-4">
                <h4 className="text-xs font-bold text-[#111] dark:text-white uppercase tracking-wider">Standup Guidelines</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Standups summarize what you completed yesterday, what you are focusing on today, and any active blockers that prevent you from completing your sprints.
                </p>
                <div className="flex gap-2 items-center text-xs text-zinc-700 dark:text-zinc-300">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>Velocity is calculated across the entire workspace.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NL QUERY */}
          {activeTab === "query" && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-zinc-500" />
                  <span>Natural Language Query Bar</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type keyword e.g. 'High' (priority), 'In-Progress' (status), or member names"
                    value={nlQuery}
                    onChange={(e) => setNlQuery(e.target.value)}
                    className="w-full h-[42px] rounded-lg border border-gray-300 dark:border-zinc-850 bg-transparent pl-10 pr-4 text-xs text-black dark:text-white outline-none focus:border-zinc-500"
                  />
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Query Results listing */}
              {nlQuery.trim() !== "" ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                      Query Aggregations Result ({filteredQueryTasks.length} tasks found)
                    </span>
                  </div>

                  {filteredQueryTasks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2.5">
                      {filteredQueryTasks.map((t: any) => {
                        const priorityColor = 
                          t.priority?.toLowerCase() === "high" 
                            ? "text-red-500 bg-red-500/10" 
                            : t.priority?.toLowerCase() === "medium"
                            ? "text-amber-500 bg-amber-500/10"
                            : "text-zinc-500 bg-zinc-500/10";
                        
                        const taskDataForDetails = {
                          ...t,
                          id: t.id || t._id || "",
                          title: t.title || "Untitled Task",
                          description: t.description || "",
                          priority: t.priority || "Low",
                          status: t.status || "to-do",
                          deadline: t.deadline || "",
                          createdAt: t.createdAt || new Date().toISOString(),
                          assignee: {
                            name: t.assignee?.name || t.assignee?.fullname || "Unassigned",
                            email: t.assignee?.email || "",
                            image: t.assignee?.image || t.assignee?.profileImage || "none"
                          }
                        };

                        return (
                          <div key={t.id || t._id} className="p-3 border border-[#565656]/15 rounded-lg bg-white dark:bg-[#1a1a1a]/30 flex justify-between items-center hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
                            <div className="flex flex-col gap-1 min-w-0">
                              <span className="text-xs font-semibold text-[#111] dark:text-white truncate">{t.title}</span>
                              <span className="text-[10px] text-zinc-400">Assigned to: {t.assignee?.name || "Unassigned"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-[9px] font-semibold px-2 py-0.5 rounded ${priorityColor}`}>
                                {t.priority}
                              </span>
                              <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                {t.status}
                              </span>
                              <div className="cursor-pointer text-zinc-400 hover:text-black dark:hover:text-white">
                                <TaskDetails taskData={taskDataForDetails} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed border-[#565656]/20 rounded-lg text-xs text-zinc-400 italic">
                      No matching workspace tasks found for: "{nlQuery}"
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 text-center border border-dashed border-[#565656]/15 rounded-xl text-zinc-400 text-xs italic">
                  Type in the query bar above to dynamically aggregate and filter workspace cards in real time.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RISK FORECASTS */}
          {activeTab === "risk" && (
            <div className="max-w-4xl space-y-4 animate-fadeIn">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                AI Milestone Risk Forecast Logs
              </h4>

              {atRiskTasks.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {atRiskTasks.map((t: any) => {
                    const taskDataForDetails = {
                      ...t,
                      id: t.id || t._id || "",
                      title: t.title || "Untitled Task",
                      description: t.description || "",
                      priority: t.priority || "Low",
                      status: t.status || "to-do",
                      deadline: t.deadline || "",
                      createdAt: t.createdAt || new Date().toISOString(),
                      assignee: {
                        name: t.assignee?.name || t.assignee?.fullname || "Unassigned",
                        email: t.assignee?.email || "",
                        image: t.assignee?.image || t.assignee?.profileImage || "none"
                      }
                    };

                    return (
                      <div key={t.id || t._id} className="p-4 border border-rose-500/20 bg-rose-500/5 rounded-xl flex items-start gap-4 justify-between">
                        <div className="flex gap-3">
                          <div className="p-2 bg-rose-500/10 text-rose-500 rounded-lg h-fit mt-0.5">
                            <AlertCircle className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                              <span>{t.title}</span>
                              <span className={`text-[8px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500`}>
                                Risk: {t.riskLevel}
                              </span>
                            </h5>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{t.message}</p>
                            <div className="flex gap-4 pt-1.5 text-[10px] text-zinc-400">
                              <span>Assignee: {t.assignee?.name || "Unassigned"}</span>
                              <span>Due date: {t.deadline}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">
                            {t.daysLeft < 0 ? "Overdue" : t.daysLeft === 0 ? "Due Today" : "Due Tomorrow"}
                          </span>
                          <div className="cursor-pointer text-zinc-400 hover:text-black dark:hover:text-white bg-white dark:bg-zinc-900 rounded p-1 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <TaskDetails taskData={taskDataForDetails} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-[#565656]/15 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/10 text-xs text-zinc-400 italic">
                  Excellent! No tasks are currently predicted at risk of missing deadlines.
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AIView;
