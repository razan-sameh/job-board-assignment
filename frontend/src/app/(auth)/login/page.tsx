"use client";

import { Briefcase } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "./loginSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/lib/hooks/useAuth";
import { enmRole } from "@/content/enums";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const { mutateAsync, error } = useLogin();


  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await mutateAsync({
        identifier: data.email,
        password: data.password,
      });

      if (result.success && result.user) {
        if (result.user.user_metadata.role === enmRole.admin) {
          router.push("/dashboard");
        } else {
          router.push("/jobs");
        }
      }

    } catch (err) {
      // Handle error
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-background shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Briefcase size={24} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center">Welcome back</h1>
        <p className="text-sm text-content/80 text-center mt-1">
          Sign in to your JobBoard account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-content">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-lightGray/50 focus:ring-indigo-500"
                }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-content">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-lightGray/50 focus:ring-indigo-500"
                }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 py-2.5 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm my-4 text-center">
            {error.message}
          </p>
        )}
        {/* Footer */}
        <p className="mt-6 text-center text-sm text-content">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
