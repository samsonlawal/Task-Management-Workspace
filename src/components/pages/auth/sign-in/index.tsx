"use client";

import { useEffect, useState } from "react";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // For validation errors
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.email || !formValues.password) {
      // setError("Email and password are required.");
      return showErrorToast({
        message: "Email and password are required.",
        // description: response?.data?.description || '',
      });
    } else {
      showSuccessToast({
        message: "Message Sent!",
        // description: response?.data?.description || '',
      });
    }

    console.log("Hello");
  };

  return (
    <div className="flex h-svh w-full items-center justify-center p-5 font-madei">
      <div className="flex h-full w-full flex-row rounded-lg">
        {/* Left Section */}
        <div className="flex w-[50%] items-center justify-center rounded-l-lg bg-[#e4e4e4] py-5">
          <div className="flex h-full w-full flex-col items-start justify-between px-10">
            {/* Logo at the top */}
            <div className="flex items-center gap-1">
              <img src="/icons/hexhex.svg" alt="Logo" className="h-6 w-6" />
              <p className="text-[21px] font-[400]">Management</p>
            </div>

            <div className="magicpattern flex-1"></div>

            {/* Copyright at the bottom */}
            <p className="text-sm text-gray-600">
              © Copyright Management 2025.
            </p>
          </div>
        </div>

        {/* Right Section - Auth Form */}
        <div className="flex w-[50%] items-center justify-center p-8">
          <form className="w-full max-w-sm space-y-5" onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-semibold text-gray-800">
              Sign In
            </h2>

            {/* Google Sign-In */}
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-gray-700 hover:bg-gray-100">
              <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
              Sign in with Google
            </button>

            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm text-gray-500">or</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            {/* Email Input */}
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formValues.email}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
              onChange={handleInputChange}
            />

            {/* Password Input */}

            <div className="flex w-full flex-col">
              <div className="relative">
                <input
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={`/icons/${showPassword ? "EyeIcon" : "EyeOffIcon"}.svg`}
                    alt=""
                  />
                </button>
              </div>
            </div>
            {/* <input
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
              type={showPassword ? "text" : "password"}
              onChange={handleInputChange}
              value={formValues.password}
            /> */}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-white accent-black focus:ring-black"
                />
                Remember Me
              </label>
              <a href="#" className="text-gray-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              className="w-full rounded-md bg-black py-2 text-white hover:bg-black/85"
              type="submit"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="/auth/sign-up" className="text-black hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
