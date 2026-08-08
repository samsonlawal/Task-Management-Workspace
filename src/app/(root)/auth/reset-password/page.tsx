import { Suspense } from "react";
import ResetPassword from "@/components/pages/auth/reset-password";

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-sm text-zinc-500">Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
