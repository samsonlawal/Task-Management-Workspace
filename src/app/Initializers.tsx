"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
// import Navbar from '@/components/layout/main/navbar';
// import Footer from '@/components/layout/main/footer';
import { Toaster } from "@/components/ui/sonner";
import { AppThemeProvider } from "@/providers/theme-provider";
// import { AuthContextWrapper } from '@/context/AuthContext';
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthPersistenceWrapper from "@/lib/authPersistenceWrapper";
import GlobalModals from "@/components/reuseables/Dialogs/GlobalModals";
import { initDataFast } from 'datafast';

const datafast = await initDataFast({
  websiteId: 'dfid_9HJsEKHoN09GUvDA5F1fF',
});

function Initializers({ children }: { children: ReactNode }) {
  const isAuthPage = (usePathname() || "")?.startsWith("/auth/");

  const hideNavbar = isAuthPage ? true : false;
  const hideFooter = isAuthPage ? true : false;

  return (
    <>
      <Provider store={store}>
        <AppThemeProvider>
          {/* <AuthContextWrapper> */}
          <NextTopLoader color="#563892" height={3} />
          {/* {hideNavbar ? null : <Navbar />} */}

          {children}
          {/* {hideFooter ? null : <Footer />} */}
          <Toaster richColors />
          <GlobalModals />
          {/* </AuthContextWrapper> */}
        </AppThemeProvider>
        <AuthPersistenceWrapper />
      </Provider>
    </>
  );
}

export default Initializers;
