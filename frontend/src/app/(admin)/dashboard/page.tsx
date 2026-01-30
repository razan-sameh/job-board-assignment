import StatsList from "./components/StatsList";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { Suspense } from "react";
import RecentApplications from "./components/skeleton/RecentApplications";
import JobStatus from "./components/JobStatus";
import RecentJobsSkeleton from "./components/skeleton/RecentJobsSkeleton";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-sm text-content">
          Overview of your job board performance
        </p>
      </div>

      {/* Stats */}
      <StatsList />

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentApplications />
        <div className="bg-background rounded-xl border border-lightGray/50 p-4">
          <h3 className="font-semibold mb-4">Recent Jobs</h3>
          <Suspense fallback={<RecentJobsSkeleton count={4} />}>
            <JobStatus />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
