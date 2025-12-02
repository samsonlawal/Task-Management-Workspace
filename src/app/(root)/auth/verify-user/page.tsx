"use client";

import { Suspense } from "react";
import { VerifyUser } from "@/components/pages/auth/verify-user";

export default function Page() {
  return (
    <Suspense>
      <VerifyUser />
    </Suspense>
  );
}
