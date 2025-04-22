import type { Metadata } from "next";
import "./globals.css";
// import { GoogleAnalytics } from "@next/third-parties/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

import Initializers from "./Initializers";
import Login from "@/components/pages/auth/sign-in";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "task management workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Initializers>{children}</Initializers>
        {/* <Login /> */}
      </body>
    </html>
  );
}
