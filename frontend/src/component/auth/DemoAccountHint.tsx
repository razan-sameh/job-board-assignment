import {
  AuthRoleChoice,
  hasAdminDemoCredentials,
} from "@/content/demoAccounts";
import { enmRole } from "@/content/enums";

type DemoAccountHintProps = {
  role: AuthRoleChoice;
};

export default function DemoAccountHint({ role }: DemoAccountHintProps) {
  if (role === enmRole.admin && hasAdminDemoCredentials()) {
    return (
      <p className="mt-4 rounded-lg border border-indigo-100 bg-indigo-50/80 px-3 py-2 text-xs text-content">
        <span className="font-medium text-indigo-700">Portfolio demo — Admin</span>
        <br />
        Demo admin credentials are already configured. Click below to sign in
        and explore the admin dashboard.
      </p>
    );
  }

  if (role === enmRole.jobseeker) {
    return (
      <p className="mt-4 rounded-lg border border-lightGray/50 bg-lightGray/10 px-3 py-2 text-xs text-content">
        Sign in with your job seeker account, or{" "}
        <span className="font-medium">create one</span> on the register page.
      </p>
    );
  }

  return null;
}
