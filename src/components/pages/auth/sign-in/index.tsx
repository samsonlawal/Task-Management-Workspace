"use client";

import { useEffect, useState } from "react";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import { useLogin } from "@/hooks/api/auth";
import Brand from "@/components/reuseables/Brand";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);

  const { loading, onLogin } = useLogin();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formValues;
    let errorMsg = "";

    if (!email && !password) {
      errorMsg = "Email and password are required.";
    } else if (!email) {
      errorMsg = "Email is required.";
    } else if (!password) {
      errorMsg = "Password is required.";
    }

    if (errorMsg) {
      showErrorToast({ message: errorMsg });
    } else {
      onLogin({
        payload: { email, password },
        successCallback: () => {
          showSuccessToast({ message: "🚀 Login Success!" });
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    }
  };

  return (
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-[#111] px-4 py-8 text-[#111] dark:text-white overflow-hidden">
      {/* Header Logo */}
      <div className="mt-6 mb-4 relative z-10">
        <Brand />
      </div>

      {/* Sign-in Card Container */}
      <div className="my-auto relative z-10 w-full max-w-[420px] p-6 rounded-lg border border-[#EEEEEE] bg-white dark:border-[#565656]/20 dark:bg-[#1a1a1a]/50 shadow-lg flex flex-col justify-center">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col text-center gap-1">
            <h2 className="text-xl font-medium tracking-tight text-[#111] dark:text-white">Welcome Back</h2>
            <p className="text-xs text-[#565656] dark:text-[#fff]/50 max-w-[280px] mx-auto leading-relaxed">
              Enter your credentials to access your workspaces and tasks
            </p>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#111] dark:text-white/80">Email</label>
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 dark:border-[#565656]/20 dark:bg-[#111]/30 px-3 py-2.5 text-sm text-[#111] dark:text-white placeholder-zinc-400 focus:border-[#609328] focus:outline-none transition-colors"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#111] dark:text-white/80">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formValues.password}
                onChange={handleInputChange}
                className="w-full rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 dark:border-[#565656]/20 dark:bg-[#111]/30 pl-3 pr-10 py-2.5 text-sm text-[#111] dark:text-white placeholder-zinc-400 focus:border-[#609328] focus:outline-none transition-colors"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-[#111] dark:hover:text-white transition-colors"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-[#565656] dark:text-[#fff]/70 hover:text-[#111] dark:hover:text-white transition-colors select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-3.5 w-3.5 bg-transparent border-[#565656]/30 text-[#609328] rounded focus:ring-[#609328] focus:outline-none accent-[#609328]"
              />
              Remember Me
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-[#609328] hover:text-[#609328]/80 transition-colors hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#609328] hover:bg-[#609328]/90 px-4 py-2.5 text-sm font-medium text-white transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Sign In</span>
            {loading && <Loader2 size={16} className="animate-spin text-white" />}
          </button>

          <p className="text-center text-xs text-zinc-400 mt-2">
            Don’t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-[#609328] hover:text-[#609328]/80 font-medium transition-colors hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="mb-4 relative z-10">
        <p className="text-[11px] text-white/50 font-normal tracking-wide select-none">
          © {new Date().getFullYear()} @Taskstackhq. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
