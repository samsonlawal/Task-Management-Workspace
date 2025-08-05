"use client";

import Sidebar from "@/components/main/sidebar";
import Workspace from "@/components/pages/workspace";
import { useRef } from "react";
import { useSelector } from "react-redux";
import "../../ripple.css";

export default function Home() {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);

  // const buttonRef = useRef<HTMLButtonElement>(null);

  // const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const button = buttonRef.current;
  //   if (!button) return;

  //   const ripple = document.createElement("span");
  //   ripple.className = "ripple";

  //   const rect = button.getBoundingClientRect();
  //   const size = Math.max(button.offsetWidth, button.offsetHeight);
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;

  //   ripple.style.width = ripple.style.height = `${size}px`;
  //   ripple.style.left = `${x - size / 2}px`;
  //   ripple.style.top = `${y - size / 2}px`;

  //   button.appendChild(ripple);
  //   setTimeout(() => ripple.remove(), 600);
  // };

  return (
    <div className="poppins flex h-screen w-full flex-col items-center justify-center">
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Welcome, {user.username} 👋</h1>
          <a
            href="/workspace"
            className="w-fit bg-gray-400 px-6 py-2 transition-colors duration-300 hover:bg-gray-500 hover:text-white"
          >
            Workspace
          </a>

          {/* <button
            ref={buttonRef}
            className="ripple-hover"
            onMouseEnter={handleMouseEnter}
          >
            <p>Login</p>
          </button> */}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Welcome to Task Manager</h1>

          <a
            href="/auth/sign-in"
            className="w-fit bg-gray-400 px-6 py-2 transition-colors duration-300 hover:bg-gray-500"
          >
            Login
          </a>
        </div>
      )}
    </div>
  );
}
