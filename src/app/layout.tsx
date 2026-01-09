import type { Metadata } from "next";
import "./globals.css";
// import { GoogleAnalytics } from "@next/third-parties/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

import Initializers from "./Initializers";
import Login from "@/components/pages/auth/sign-in";

// In your layout.js or page.js file
import { DM_Sans, Lexend, Outfit, Poppins } from "next/font/google";
import { PostHogProvider } from "./provider";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
    <html lang="en" className={`${lexend.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Happy+Monkey&family=Lexend:wght@100..900&family=Manrope:wght@200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Waiting+for+the+Sunrise&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="bg-white dark:bg-[#111]">
        {/* <PostHogProvider> */}
        <Initializers>{children}</Initializers>
        {/* </PostHogProvider> */}
        {/* <Login /> */}
      </body>
    </html>
  );
}
