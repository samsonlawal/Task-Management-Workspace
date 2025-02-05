import Navbar from "@/components/main/navbar";
import Sidebar from "@/components/main/sidebar";
import Workspace from "@/components/main/workspace";
import Image from "next/image";

export default function Home() {
  return (
    // <div className="">
    <div className="flex h-screen flex-col">
      {/* <Navbar /> */}
      <div className="flex flex-1 flex-row gap-[10px]">
        <Sidebar />
        <Workspace />
      </div>
      {/* </div> */}
    </div>
  );
}
