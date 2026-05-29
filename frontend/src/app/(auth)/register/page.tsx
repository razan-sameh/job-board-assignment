import { Briefcase } from "lucide-react";
import RegisterForm from "./RegisterForm";
import { Suspense } from "react";

export default function RegisterPage() {
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
          Choose a role to get started with JobBoard
        </p>
        <Suspense fallback={<div className="mt-6 h-40" />}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
