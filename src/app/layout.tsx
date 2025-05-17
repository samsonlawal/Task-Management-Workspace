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
import { DM_Sans, Lexend, Outfit, Poppins, } from 'next/font/google'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

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
      <body className="">
        <Initializers>{children}</Initializers>
        {/* <Login /> */}
      </body>
    </html>
  );
}
