import Sidebar from "@/components/main/sidebar";
import Workspace from "@/components/main/workspace";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-row">
        <Sidebar />
        <Workspace />
      </div>
    </div>
  );
}
