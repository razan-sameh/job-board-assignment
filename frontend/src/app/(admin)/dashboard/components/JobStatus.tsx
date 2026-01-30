'use client'
import { typJob } from "@/content/types";
import { useJobs } from "@/lib/hooks/useJobs";
export default function JobStatus() {
    const { data: jobs } = useJobs({ page: 1, pageSize: 10, isRecentJobs:true});
  
  return (
      <div className="space-y-4">
        {jobs.data.map((job:typJob, i:number) => (
          <div key={i} className="flex justify-between items-center text-sm">
            <div>
              <p className="font-medium">{job.title}</p>
              <p className="text-content">{job.location.name}</p>
            </div>

            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                job.status === "open"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {job.status}
            </span>
          </div>
        ))}
      </div>
  );
}
