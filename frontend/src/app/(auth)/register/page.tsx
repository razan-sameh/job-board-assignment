"use client";

import { Briefcase } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "./registerSchema";
import Link from "next/link";
import { useRegister } from "@jobboard/shared/hooks/useAuth";
import { enmRole } from "@jobboard/shared/types/enums";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const { mutateAsync, error } = useRegister();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const result = await mutateAsync({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      // Navigate based on role
      if (result.user.role === enmRole.admin) {
        router.push("/dashboard");
      } else {
        router.push("/jobs");
      }
    } catch (err) {
      // Handle error
      console.log("Login Error:", err);
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
        <h1 className="text-2xl font-semibold text-center">
          Create an account
        </h1>
        <p className="text-sm text-content/80 text-center mt-1">
          Get started with JobBoard today
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-content">
              Full Name
            </label>
            <input
              {...register("fullName")}
              type="text"
              placeholder="John Doe"
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-lightGray/50 focus:ring-indigo-500"
                }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

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
            className="mt-4 w-full rounded-lg bg-liner-to-r from-indigo-600 to-purple-600 py-2.5 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-60"
          >
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm my-4 text-center">
            {error.message}
          </p>
        )}
        {/* Footer */}
        <p className="mt-6 text-center text-sm text-content">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
