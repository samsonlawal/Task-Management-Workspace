// pages/index.tsx or app/page.tsx
import Sidebar from "@/components/main/sidebar";
import Workspace from "@/components/pages/workspace";

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#111]">
      {/* Fixed sidebar */}
      <div className="h-screen w-56 flex-shrink-0 border-r border-[white]/90 dark:border-[#565656]/20">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col border-none">
        <Workspace />
      </div>
    </div>
  );
}
