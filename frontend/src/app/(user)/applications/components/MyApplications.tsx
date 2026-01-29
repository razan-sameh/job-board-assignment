"use client";
import { useMyApplications } from "@/lib/hooks/useApplications";
import { typApplication } from "@/content/types";
import ApplicationCard from "./ApplicationCard";
import LoadingSpinner from "@/component/ui/LoadingSpinner";

export default function MyApplications() {
  const { data: applications = [], isLoading } = useMyApplications();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="space-y-4">
      {applications.length === 0 ? (
        <p className="text-content">You have not applied to any jobs yet.</p>
      ) : (
        applications.map((application: typApplication) => (
          <ApplicationCard key={application.id} application={application} />
        ))
      )}
    </div>
  );
}
