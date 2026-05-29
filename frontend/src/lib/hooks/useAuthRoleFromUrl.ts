"use client";

import { AuthRoleChoice } from "@/content/demoAccounts";
import { enmRole } from "@/content/enums";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function roleFromSearchParams(searchParams: URLSearchParams): AuthRoleChoice {
  return searchParams.get("role") === enmRole.admin
    ? enmRole.admin
    : enmRole.jobseeker;
}

export function useAuthRoleFromUrl() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedRole = roleFromSearchParams(searchParams);

  const setSelectedRole = (nextRole: AuthRoleChoice) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", nextRole);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { selectedRole, setSelectedRole };
}
