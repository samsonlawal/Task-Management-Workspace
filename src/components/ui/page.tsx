import Navbar from "@/components/main/navbar";
import Sidebar from "@/components/main/sidebar";
import Workspace from "@/components/main/workspace";
import Login from "@/components/pages/auth/sign-in";
import TaskView from "@/components/reusables/TaskView";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <>
      <Login />

      {/* <TaskView /> */}
      <Toaster richColors />
    </>
  );
}
