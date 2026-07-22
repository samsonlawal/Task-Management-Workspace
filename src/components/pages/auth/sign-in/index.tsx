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
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between bg-[#0a0a0a] px-4 py-8 text-white overflow-hidden">
      {/* Radial Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none" />

      {/* Header Logo */}
      <div className="mt-6 mb-4 relative z-10">
        <Brand />
      </div>

      {/* Glassmorphic Sign-in Card */}
      <div className="my-auto relative z-10 w-full max-w-[420px] p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 shadow-2xl flex flex-col justify-center">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col text-center gap-1">
            <h2 className="text-xl font-medium tracking-tight text-white">Welcome Back</h2>
            <p className="text-xs text-zinc-400 max-w-[280px] mx-auto leading-relaxed">
              Enter your credentials to access your workspaces and tasks
            </p>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-300">Email</label>
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-300">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formValues.password}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 pl-3 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-colors"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-white transition-colors"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white transition-colors select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-3.5 w-3.5 bg-transparent border-zinc-850 text-indigo-600 rounded focus:ring-indigo-500 focus:ring-offset-zinc-900 focus:outline-none accent-indigo-600"
              />
              Remember Me
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-zinc-450 hover:text-white transition-colors hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white hover:bg-zinc-200 px-4 py-2.5 text-sm font-semibold text-black transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Sign In</span>
            {loading && <Loader2 size={16} className="animate-spin text-black" />}
          </button>

          <p className="text-center text-xs text-zinc-400 mt-2">
            Don’t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors hover:underline"
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
