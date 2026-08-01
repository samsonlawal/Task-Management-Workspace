"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { signupSchema } from "@/components/pages/auth/schema/signupSchema";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useRegister } from "@/hooks/api/auth";
import Brand from "@/components/reuseables/Brand";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const { loading, onRegister } = useRegister();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const formik: any = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      terms: false,
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      // Handled by manual handler below
    },
  });

  const handleSignUp = (e: any) => {
    e.preventDefault();
    const { fullname, username, email, password, terms } = formik.values;

    if (!terms) {
      showErrorToast({ message: "You must agree to the Terms & Conditions." });
      return;
    }

    formik.validateForm().then((errors: any) => {
      const errorFields = Object.keys(errors);

      if (errorFields.length > 0) {
        errorFields.forEach((field) => {
          if (errors[field]) {
            showErrorToast({
              message: errors[field] as string,
            });
          }
        });
        return;
      }

      onRegister({
        payload: { fullname, username, email, password },
        successCallback: () => {
          showSuccessToast({ message: "🚀 Sign Up Successful!" });
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
        },
      });
    });
  };

  return (
    <div className="poppins relative flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-[#111] px-4 py-8 text-[#111] dark:text-white overflow-hidden">
      {/* Header Logo */}
      <div className="mt-6 mb-4 relative z-10">
        <Brand />
      </div>

      {/* Sign-up Card Container */}
      <div className="my-auto relative z-10 w-full max-w-[420px] p-6 rounded-lg border border-[#EEEEEE] bg-white dark:border-[#565656]/20 dark:bg-[#1a1a1a]/50 shadow-lg flex flex-col justify-center">
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div className="flex flex-col text-center gap-1 pb-2">
            <h2 className="text-xl font-medium tracking-tight text-[#111] dark:text-white">Create Account</h2>
            <p className="text-xs text-[#565656] dark:text-[#fff]/50 max-w-[280px] mx-auto leading-relaxed">
              Enter your personal data to set up your workspace profile
            </p>
          </div>

          {/* Full Name Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#111] dark:text-white/80">Full Name</label>
            <input
              name="fullname"
              type="text"
              placeholder="John Doe"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 dark:border-[#565656]/20 dark:bg-[#111]/30 px-3 py-2.5 text-sm text-[#111] dark:text-white placeholder-zinc-400 focus:border-[#609328] focus:outline-none transition-colors"
            />
          </div>

          {/* Username Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#111] dark:text-white/80">Username</label>
            <input
              name="username"
              type="text"
              placeholder="johndoe"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 dark:border-[#565656]/20 dark:bg-[#111]/30 px-3 py-2.5 text-sm text-[#111] dark:text-white placeholder-zinc-400 focus:border-[#609328] focus:outline-none transition-colors"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#111] dark:text-white/80">Email</label>
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-md border border-[#EEEEEE] bg-[#EEEEEE]/30 dark:border-[#565656]/20 dark:bg-[#111]/30 px-3 py-2.5 text-sm text-[#111] dark:text-white placeholder-zinc-400 focus:border-[#609328] focus:outline-none transition-colors"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#111] dark:text-white/80">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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

          {/* Terms & Conditions */}
          <div className="flex items-center gap-2 text-xs text-[#565656] dark:text-[#fff]/70 pt-1 select-none">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                className="h-3.5 w-3.5 bg-transparent border-[#565656]/30 text-[#609328] rounded focus:ring-[#609328] focus:outline-none accent-[#609328] cursor-pointer"
              />
              <span>I agree to the</span>
            </label>
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-[#609328] hover:text-[#609328]/80 transition-colors hover:underline outline-none"
            >
              Terms & Conditions
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#609328] hover:bg-[#609328]/90 px-4 py-2.5 text-sm font-medium text-white transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Sign Up</span>
            {loading && <Loader2 size={16} className="animate-spin text-white" />}
          </button>

          <p className="text-center text-xs text-zinc-400 mt-2">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-[#609328] hover:text-[#609328]/80 font-medium transition-colors hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-200 shadow-2xl space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-semibold text-white">Terms & Conditions</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-zinc-400 hover:text-white transition-colors text-sm font-medium px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700"
              >
                Close
              </button>
            </div>
            <div className="space-y-3 overflow-y-auto text-xs leading-relaxed text-zinc-300 pr-2">
              <p>
                Welcome to Taskstack. By registering and using our service, you agree to comply with and be bound by the following terms and conditions of use.
              </p>
              <h4 className="font-semibold text-white text-sm">1. Account & Workspace</h4>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities occurring under your workspace.
              </p>
              <h4 className="font-semibold text-white text-sm">2. Data Privacy & Security</h4>
              <p>
                Your personal and workspace data is protected using enterprise-grade security standards. We do not sell your personal data to third parties.
              </p>
              <h4 className="font-semibold text-white text-sm">3. Acceptable Use</h4>
              <p>
                You agree not to use Taskstack for unlawful activity, transmitting malicious content, or violating intellectual property rights.
              </p>
              <h4 className="font-semibold text-white text-sm">4. Service Modifications</h4>
              <p>
                We reserve the right to modify or discontinue features to continuously improve performance and platform security.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  formik.setFieldValue("terms", true);
                  setShowTermsModal(false);
                }}
                className="rounded-lg bg-[#609328] hover:bg-[#609328]/90 px-4 py-2 text-xs font-medium text-white transition-colors"
              >
                I Agree & Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="m-4 relative z-10">
        <p className="text-[11px] text-white/50 font-normal tracking-wide select-none">
          © {new Date().getFullYear()} @Taskstackhq. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
