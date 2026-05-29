"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "./loginSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/lib/hooks/useAuth";
import { useAuthRoleFromUrl } from "@/lib/hooks/useAuthRoleFromUrl";
import { enmRole } from "@/content/enums";
import { useState } from "react";
import AuthRoleTabs from "@/component/auth/AuthRoleTabs";
import DemoAccountHint from "@/component/auth/DemoAccountHint";
import {
  AuthRoleChoice,
  getAdminDemoCredentials,
} from "@/content/demoAccounts";

function LoginForm() {
  const { selectedRole, setSelectedRole } = useAuthRoleFromUrl();
  const [roleMismatchError, setRoleMismatchError] = useState<string | null>(
    null,
  );
  const [demoUnavailable, setDemoUnavailable] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const { mutateAsync, error, isPending } = useLogin();

  const isLoading = isSubmitting || isPending;

  const handleRoleChange = (nextRole: AuthRoleChoice) => {
    setSelectedRole(nextRole);
    setRoleMismatchError(null);
    setDemoUnavailable(false);

    if (nextRole === enmRole.jobseeker) {
      reset({ email: "", password: "" });
    }
  };

  const completeLogin = async (identifier: string, password: string) => {
    setRoleMismatchError(null);
    setDemoUnavailable(false);

    const result = await mutateAsync({ identifier, password });

    if (result.success && result.user) {
      const actualRole = result.user.user_metadata.role as enmRole;

      if (actualRole !== selectedRole) {
        const expectedLabel =
          selectedRole === enmRole.admin ? "Admin" : "Job Seeker";
        const actualLabel =
          actualRole === enmRole.admin ? "Admin" : "Job Seeker";
        setRoleMismatchError(
          `This account is registered as ${actualLabel}. Switch to the ${actualLabel} tab or use ${expectedLabel} credentials.`,
        );
        return;
      }

      if (actualRole === enmRole.admin) {
        router.push("/dashboard");
      } else {
        router.push("/jobs");
      }
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await completeLogin(data.email, data.password);
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const onAdminDemoLogin = async () => {
    const demo = getAdminDemoCredentials();
    if (!demo) {
      setDemoUnavailable(true);
      return;
    }

    try {
      await completeLogin(demo.email, demo.password);
    } catch (err) {
      console.error("Admin demo login error:", err);
    }
  };
  return (
    <div>
      <AuthRoleTabs value={selectedRole} onChange={handleRoleChange} />
      <DemoAccountHint role={selectedRole} />
      {selectedRole === enmRole.admin ? (
        <div className="mt-6">
          <button
            type="button"
            onClick={onAdminDemoLogin}
            disabled={isLoading}
            className="w-full rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 py-2.5 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Enter Admin Dashboard"}
          </button>
          {demoUnavailable && (
            <p className="mt-4 text-center text-sm text-red-500">
              Admin demo is not configured. Set demo credentials in your
              environment variables.
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 py-2.5 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in as Job Seeker"}
          </button>
        </form>
      )}
      {(roleMismatchError || error) && (
        <p className="text-red-500 text-sm my-4 text-center">
          {roleMismatchError ?? error?.message}
        </p>
      )}
      <p className="mt-6 text-center text-sm text-content">
        Don&apos;t have an account?{" "}
        <Link
          href={`/register?role=${selectedRole}`}
          className="font-medium text-indigo-600 hover:underline"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
