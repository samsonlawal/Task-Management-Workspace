"use client";
import React, { ReactNode, useEffect  } from "react";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { AppThemeProvider } from "@/providers/theme-provider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthPersistenceWrapper from "@/lib/authPersistenceWrapper";
import GlobalModals from "@/components/reuseables/Dialogs/GlobalModals";
import { initDataFast } from 'datafast';

  useEffect(() => {
    initDataFast({
      websiteId: 'dfid_9HJsEKHoN09GUvDA5F1fF',
      autoCapturePageviews: true,
      allowLocalhost: process.env.NODE_ENV !== 'production', // allows testing on localhost
    });
  }, []);

function Initializers({ children }: { children: ReactNode }) {
  const isAuthPage = (usePathname() || "")?.startsWith("/auth/");

  const hideNavbar = isAuthPage ? true : false;
  const hideFooter = isAuthPage ? true : false;

  return (
    <>
      <Provider store={store}>
        <AppThemeProvider>
          <NextTopLoader color="#563892" height={3} />
          {children}
          <Toaster richColors />
          <GlobalModals />
        </AppThemeProvider>
        <AuthPersistenceWrapper />
      </Provider>
    </>
  );
}

export default Initializers;
