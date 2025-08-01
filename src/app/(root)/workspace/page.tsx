// pages/index.tsx or app/page.tsx
import Sidebar from "@/components/main/sidebar";
import Workspace from "@/components/pages/workspace";

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Fixed sidebar */}
      <div className="h-screen w-64 flex-shrink-0 border-r border-gray-200 bg-white">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col border-none">
        <Workspace />
      </div>
    </div>
  );
}
