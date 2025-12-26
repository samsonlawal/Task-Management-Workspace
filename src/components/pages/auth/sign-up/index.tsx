"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { signupSchema } from "@/components/pages/auth/schema/signupSchema";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useRegister } from "@/hooks/api/auth";
import Brand from "@/components/reuseables/Brand";
import ThemeSwitcher from "@/components/reuseables/ThemeSwitcher";

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [formValues, setFormValues] = useState({ fullname: "", email: "", password: "" });

  const { loading, onRegister } = useRegister();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const formik: any = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      // terms: false,
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      handleSignUp(values);
      console.log(values);
    },
  });

  const handleSignUp = (e: any) => {
    e.preventDefault();
    const { fullname, username, email, password } = formik.values;

    // Trigger validation to populate formik.errors
    formik.validateForm().then((errors: any) => {
      const errorFields = Object.keys(errors);

      if (errorFields.length > 0) {
        errorFields.forEach((field) => {
          // Show error toast for each field with an error
          if (errors[field]) {
            console.log(errors);
            showErrorToast({
              message: errors[field] as string,
            });
          }
        });
        return; // Stop submission if there are errors
      }

      // If no errors, proceed with form submission
      onRegister({
        payload: { fullname, username, email, password },
        successCallback: () => {
          showSuccessToast({ message: "🚀 Sign Up Successful!" });
          // console.log(formik.values);
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
          // console.log(formik.values);
        },
      });
    });
  };

  return (
    <div className="flex h-svh w-full items-center justify-center bg-white p-3 font-madei">
      <div className="flexc-row flex h-full w-full rounded-lg">
        {/* Left Section */}
        <div className="hidden w-[50%] items-center justify-center rounded-lg bg-[#111] bg-[url('/icons/ccchaos.svg')] py-8 text-white md:flex">
          <div className="flex h-full w-full flex-col items-center justify-between gap-3 px-10">
            {/* Logo at the top */}
            <Brand />

            <div className="flex max-w-[280px] flex-col gap-6">
              <div>
                <h2 className="text-center text-lg font-medium text-white">
                  Create Account
                </h2>
                <p className="text-center text-xs text-gray-400">
                  Complete these easy steps to register your account.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="flex flex-row gap-2 rounded-md bg-[white] p-3 text-xs text-black">
                  <p className="h-4 w-4 rounded-full bg-gray-400 text-center">
                    1
                  </p>
                  <p>Sign up your account</p>
                </span>

                <span className="flex flex-row gap-2 rounded-md bg-gray-100/50 p-3 text-xs text-black transition-all duration-300 hover:bg-white">
                  <p className="h-4 w-4 rounded-full bg-gray-400 text-center">
                    2
                  </p>
                  <p>Setup Workspace</p>
                </span>

                <span className="flex flex-row gap-2 rounded-md bg-gray-100/50 p-3 text-xs text-black transition-all duration-300 hover:bg-white">
                  <p className="h-4 w-4 rounded-full bg-gray-400 text-center">
                    3
                  </p>
                  <p>Add members, create tasks</p>
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

        {/* Right Section - Sign Up Form */}
        <div className="flex w-[100%] flex-col items-center justify-start gap-8 px-1 py-4 font-madei md:w-[50%] md:justify-center md:p-8">
          <div className="flex md:hidden">
            <Brand />
          </div>
          <form className="w-full max-w-sm space-y-5" onSubmit={handleSignUp}>
            <div className="flex flex-col gap-1 pb-4 text-center">
              <h2 className="text-center text-xl font-semibold text-[#111]">
                Sign Up Account
              </h2>

              <p className="text-sm font-normal text-gray-700">
                Enter your personal data to create your account
              </p>
            </div>

            {/* Google Sign-Up */}
            {/* <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-1 text-sm text-gray-700 hover:bg-gray-100">
              <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
              <img src="/icons/google-g.svg" alt="Google" className="h-8 w-8" />
              Sign up with Google
            </button>

            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm text-gray-500">or</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div> */}

            {/* Name Input */}
            <div className="flex h-fit w-full flex-col">
              <label className="text-sm text-[#111]">Full Name</label>
              <input
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 text-sm text-[#111] focus:border-black focus:outline-none md:py-2"
              />
            </div>

            <div className="flex h-fit w-full flex-col">
              <label className="text-sm text-[#111]">Username</label>
              <input
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="username"
                className="w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 text-sm text-[#111] focus:border-black focus:outline-none md:py-2"
              />
            </div>

            {/* Email Input */}
            <div className="flex h-fit w-full flex-col">
              <label className="text-sm text-[#111]">Email</label>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                placeholder="Email"
                className="w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 text-sm text-[#111] focus:border-black focus:outline-none md:py-2"
              />
            </div>

            {/* Password Input */}
            <div className="flex w-full flex-col">
              <label className="text-sm text-[#111]">Password</label>

              <div className="relative">
                <input
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 text-sm text-[#111] focus:border-black focus:outline-none md:py-2`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={`/icons/${showPassword ? "eyeIcon" : "eyeSlash"}.svg`}
                    alt=""
                  />{" "}
                </button>
              </div>
              {/* {formik.errors.password && formik.touched.password && (
                <div className="text-sm text-red-500">
                  {formik.errors.password}
                </div>
              )} */}
            </div>
            {/* <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            /> */}

            {/* Confirm Password Input */}
            {/* <div className="flex w-full flex-col">
              <div className="relative">
                <input
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`mb-1 h-[40px] w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none ${
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                      ? "outline-1 outline-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <img
                    src={`/icons/${
                      showConfirmPassword ? "EyeIcon" : "EyeOffIcon"
                    }.svg`}
                    alt=""
                  />
                </button>
              </div>
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <div className="text-sm text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div> */}

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2 text-sm text-[#111]">
              <input
                type="checkbox"
                name="terms"
                checked={formik.values.terms}
                onChange={(e) =>
                  formik.setFieldValue("terms", e.target.checked)
                }
                onBlur={formik.handleBlur}
                className="h-3.5 w-3.5 text-black accent-black [color-scheme:light] focus:ring-black"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-black hover:underline">
                  Terms & Conditions
                </a>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex w-full flex-row items-center justify-center gap-2 rounded-md bg-black py-2 text-[13px] text-white transition-all duration-300 hover:bg-black/85"
            >
              Sign Up
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

            <p className="text-center text-[13px] text-gray-600">
              Already have an account?{" "}
              <a href="/auth/sign-in" className="text-black hover:underline">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
