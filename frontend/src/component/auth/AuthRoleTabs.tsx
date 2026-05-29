"use client";

import { AuthRoleChoice } from "@/content/demoAccounts";
import { enmRole } from "@/content/enums";

type AuthRoleTabsProps = {
  value: AuthRoleChoice;
  onChange: (role: AuthRoleChoice) => void;
};

const tabs: { role: AuthRoleChoice; label: string }[] = [
  { role: enmRole.jobseeker, label: "Job Seeker" },
  { role: enmRole.admin, label: "Admin" },
];

export default function AuthRoleTabs({ value, onChange }: AuthRoleTabsProps) {
  return (
    <div
      className="mt-6 flex rounded-lg border border-lightGray/50 p-1 bg-lightGray/10"
      role="tablist"
      aria-label="Sign in as"
    >
      {tabs.map(({ role, label }) => {
        const isActive = value === role;
        return (
          <button
            key={role}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(role)}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              isActive
                ? "bg-background text-indigo-600 shadow-sm"
                : "text-content/70 hover:text-content"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
