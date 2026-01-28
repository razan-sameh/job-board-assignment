"use client";
import { Briefcase, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../ui/Container";

function Navigation() {
  const pathname = usePathname(); // current URL path

  return (
    <Container>
      <div className="flex gap-1 py-4">
        {/* Browse Jobs Button */}
        <Link
          href="/jobs"
          className={`px-6 py-2.5 rounded-xl font-semibold  flex items-center gap-2 transition-all duration-300 ${
            pathname === "/jobs"
              ? "bg-primary text-white border border-primary"
              : "bg-white text-content hover:bg-lightGray/20 border border-lightGray"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Browse Jobs
        </Link>

        {/* My Applications Button */}
        <Link
          href="/applications"
          className={`px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ${
            pathname === "/applications"
              ? "bg-primary text-white  border border-primary"
              : "bg-white text-content hover:bg-lightGray/20 border border-lightGray"
          }`}
        >
          <FileText className="w-4 h-4" />
          My Applications
        </Link>
      </div>
    </Container>
  );
}

export default Navigation;
