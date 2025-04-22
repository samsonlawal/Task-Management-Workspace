"use client";

import { useEffect, useState } from "react";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";
import { useLogin } from "@/hooks/api/auth";
// import AlertError from "@/components/reusables/Alert";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState<string | null>(null); // For validation errors
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errorMsg, seterrorMsg] = useState("");
  const [remember, setremember] = useState(false);

  const { loading, onLogin } = useLogin();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // setError(null);
  };

  useEffect(() => {
    if (errorMsg?.trim()?.length)
      window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formValues;
    let errorMsg = "";

    if (!formValues.email && !formValues.password) {
      errorMsg = "Email and password are required.";
    } else if (!formValues.email) {
      errorMsg = "Email is required.";
    } else if (!formValues.password) {
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

    // console.log(formValues);
  };

  return (
    <div className="flex h-svh w-full items-center justify-center p-5 font-madei">
      <div className="flex h-full w-full flex-row rounded-lg">
        {/* Left Section */}
        <div className="flex w-[50%] items-center justify-center rounded-lg bg-[#111] py-8 text-white">
          <div className="flex h-full w-full flex-col items-center justify-end gap-3 px-10">
            {/* Logo at the top */}
            <div className="flex items-center justify-center">
              <img src="/icons/new-logo2.svg" alt="Logo" className="h-8 w-8" />
              <p className="text-[21px] font-[400]">StackTask</p>
            </div>

            <div className="flex w-[260px] flex-col gap-6">
              <div>
                <h2 className="text-center text-lg font-medium text-white">
                  Log In
                </h2>
                <p className="text-center text-sm text-gray-400">
                  Complete these easy steps to access your account.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="flex flex-row gap-2 rounded-md bg-[white] p-3 text-xs text-black">
                  <p className="h-4 w-4 rounded-full bg-gray-400 text-center">
                    1
                  </p>
                  <p>Enter your credentials.</p>
                </span>

                <span className="flex flex-row gap-2 rounded-md bg-gray-100/50 p-3 text-xs text-black transition-all duration-300 hover:bg-white">
                  <p className="h-4 w-4 rounded-full bg-gray-300 text-center">
                    2
                  </p>
                  <p>Navigate to your Workspace</p>
                </span>

                <span className="flex flex-row gap-2 rounded-md bg-gray-100/50 p-3 text-xs text-black transition-all duration-300 hover:bg-white">
                  <p className="h-4 w-4 rounded-full bg-gray-300 text-center">
                    3
                  </p>
                  <p>Manage your workspace</p>
                </span>
              </div>
            </div>

            {/* <div className="magicpattern flex-1"></div> */}

            {/* Copyright at the bottom */}
            {/* <p className="text-sm text-gray-600">
              © Copyright Management 2025.
            </p> */}
          </div>
        </div>

        {/* Right Section - Auth Form */}
        <div className="flex w-[50%] items-center justify-center p-8 font-madei">
          <form className="w-full max-w-sm space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 text-center">
              <h2 className="text-center text-xl font-medium">
                Sign In Account
              </h2>
              <p className="text-sm text-gray-700">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Google Sign-In */}
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-1 text-sm text-gray-700 hover:bg-gray-100">
              {/* <img src="/icons/google.svg" alt="Google" className="h-5 w-5" /> */}
              <img src="/icons/google-g.svg" alt="Google" className="h-8 w-8" />
              Sign in with Google
            </button>

            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm text-gray-500">or</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            {/* Email Input */}
            <div className="flex h-fit w-full flex-col gap-1">
              <label className="text-sm">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter Email"
                value={formValues.email}
                className="mt-0 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none"
                onChange={handleInputChange}
              />
            </div>

            {/* Password Input */}

            <div className="flex w-full flex-col gap-1">
              <label className="text-sm">Password</label>
              <div className="relative">
                <input
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={`/icons/${showPassword ? "eyeIcon" : "eyeSlash"}.svg`}
                    className="w-4"
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
              className="flex w-full flex-row items-center justify-center gap-2 rounded-md bg-black py-2 text-white hover:bg-black/85"
              type="submit"
            >
              Sign In
              {loading ? (
                <span>
                  <img
                    src="/icons/loaderWhite.svg"
                    alt=""
                    className="w-4 animate-spin"
                  />
                </span>
              ) : (
                ""
              )}
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
