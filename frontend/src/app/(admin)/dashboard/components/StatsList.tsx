"use client";
import { Briefcase, FileText, Users, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";
import { useDashboardStats } from "@/lib/hooks/useAdmin";
import StatCardSkeleton from "./StatCardSkeleton";

function StatsList() {
  const { data: stats = null, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard
        title="Total Jobs"
        value={stats?.totalJobs}
        subtitle="5 currently open"
        icon={Briefcase}
        iconColor="text-purple-700"
      />
      <StatCard
        title="Total Applications"
        value={stats?.totalApplications}
        subtitle="All time"
        icon={FileText}
        iconColor="text-green-500"
      />
      <StatCard
        title="Total Users"
        value={stats?.totalUsers}
        subtitle="Job seekers"
        icon={Users}
        iconColor="text-purple-500"
      />
      <StatCard
        title="Success Rate"
        value={`${stats?.acceptedApplicationsRate}%`}
        subtitle="Accepted"
        icon={TrendingUp}
        iconColor="text-blue-500"
      />
    </div>
  );
}


export default StatsList;
