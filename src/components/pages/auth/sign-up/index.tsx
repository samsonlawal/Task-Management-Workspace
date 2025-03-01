"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { signupSchema } from "@/components/pages/auth/schema/signupSchema";

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      await signup();
    },
  });

  const signup = async (e: React.FormEvent) => {
    try {
      // Validate form before submission
      e.preventDefault;

      setIsSubmitting(true);
      await formik.validateForm();

      // Check if there are any form errors
      if (Object.keys(formik.errors).length > 0) {
        return;
      }

      const { email, password, name } = formik.values;

      // const { data: existingUser, error: queryError } = await supabase
      //   .from("auth.users") // Replace with your users table name
      //   .select("id")
      //   .eq("email", email)
      //   .single(); // Check for a single user with the provided email

      // if (queryError) {
      //   console.error("Error checking email existence:", queryError);
      //   toast.error("An error occurred while checking the email.");
      //   return;
      // }

      // if (existingUser) {
      //   toast.error("Email already exists. Please use a different email.");
      //   return;
      // }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Optional: Add additional user metadata
          data: {
            full_name: name,
          },
        },
      });

      // if (error) {
      //   // Handle Supabase signup error
      //   console.error("Signup error:", error);
      //   // You might want to set a form-level error or show a toast
      //   formik.setStatus(error.message);
      //   return;
      // }

      // Handle successful signup
      // console.log("Signup successful:", data);
      // toast.success(
      //   "Signup successful! \n\nCerification link sent to your email",
      //   {
      //     duration: 4000,
      //   }
      // );
      // toast.success("Signup successful! Verification link sent to your email", {
      //   duration: 4000,
      // });
      // Optional: Redirect or show success message
      // router.push('/dashboard') or set a success state
    } catch (error) {
      // console.error("Unexpected signup error:", error);
      formik.setStatus("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Right Section - Sign Up Form */}
        <div className="flex w-[50%] items-center justify-center p-8">
          <form className="w-full max-w-sm space-y-5" onSubmit={signup}>
            <h2 className="text-center text-2xl font-semibold text-gray-800">
              Create Account
            </h2>

            {/* Google Sign-Up */}
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-gray-700 hover:bg-gray-100">
              <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
              Sign up with Google
            </button>

            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm text-gray-500">or</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            {/* Name Input */}
            <input
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="Full Name"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
            />

            {/* Email Input */}
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
            />

            {/* Password Input */}
            <div className="flex w-full flex-col">
              <div className="relative">
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className={`mb-1 h-[40px] w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none ${
                    formik.errors.password && formik.touched.password
                      ? "outline-1 outline-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={`/icons/${showPassword ? "EyeIcon" : "EyeOffIcon"}.svg`}
                    alt=""
                  />{" "}
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="text-sm text-red-500">
                  {formik.errors.password}
                </div>
              )}
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
            <div className="flex w-full flex-col">
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
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 text-black accent-black focus:ring-black"
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
              className="w-full rounded-md bg-black py-2 text-white hover:bg-black/85"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600">
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
