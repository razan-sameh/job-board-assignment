'use client'
import { typApplication } from "@/content/types";
import { formatDate } from "@/content/utils";
import { useApplications } from "@/lib/hooks/useApplications";
import RecentApplicationsRowsSkeleton from "./RecentApplicationsRowsSkeleton";

export default function RecentApplications() {
  const { data: applications = [], isLoading } = useApplications({ isRecentApplications: true });

  return (
    <div className="bg-background rounded-xl border border-lightGray/50 p-4">
      <h3 className="font-semibold mb-4">Recent Applications</h3>

      {isLoading ? (
        <RecentApplicationsRowsSkeleton count={4} />
      ) : (
        <div className="space-y-4">
          {applications.map((app: typApplication, i) => (
            <div key={i} className="flex justify-between text-sm">
              <div>
                <p className="font-medium">{app.job.title}</p>
                <p className="text-content">{app.user.fullName}</p>
              </div>
              <span className="text-content">{formatDate(app.createdAt)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
