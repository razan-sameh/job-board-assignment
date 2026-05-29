import { enmRole } from "./enums";

export type AuthRoleChoice = enmRole.admin | enmRole.jobseeker;

export function getAdminDemoCredentials() {
  const email = process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL ?? "";
  const password = process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD ?? "";
  if (!email || !password) return null;
  return { email, password };
}

export function hasAdminDemoCredentials() {
  return getAdminDemoCredentials() !== null;
}
