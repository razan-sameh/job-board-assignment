import Link from "next/link";
import JobTable from "./Component/JobTable";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { Suspense } from "react";

export default function JobManagePage() {

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage Jobs</h1>
          <p className="text-content">Create, edit, and manage job postings</p>
        </div>
        <Link
          href={"/dashboard/jobs/create"}
          className="bg-background text-content px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <span className="text-xl">+</span>
          Add New Job
        </Link>
      </div>

      {/* Job Listings Table */}
      <Suspense fallback={<LoadingSpinner />}>
        <JobTable />
      </Suspense>
    </div>
  );
}
