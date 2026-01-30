"use client";

import { LayoutDashboard, Briefcase, FileText, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Jobs", icon: Briefcase, href: "/dashboard/jobs" },
  { label: "Applications", icon: FileText, href: "/dashboard/applications" },
  { label: "Job Seekers", icon: Users, href: "/dashboard/JobSeekers" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background border-r border-lightGray/50 px-4 py-6">
      <h1 className="text-xl font-semibold mb-6">Dashboard</h1>

      <nav className="space-y-1">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href; // check exact match
          return (
            <Link
              key={label}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-lightGray/30
                ${isActive && "text-secondary bg-secondary/10 font-medium"}
              `}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
