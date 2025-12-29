"use client";

import { Suspense } from "react";
import { ActivateUser } from "@/components/pages/auth/activate-account";

export default function Page() {
  return (
    <Suspense>
      <ActivateUser />
    </Suspense>
  );
}
