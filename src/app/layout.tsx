import type { Metadata } from "next";
import "./globals.css";
// import { GoogleAnalytics } from "@next/third-parties/google";

import Initializers from "./Initializers";

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
      </body>
    </html>
  );
}
