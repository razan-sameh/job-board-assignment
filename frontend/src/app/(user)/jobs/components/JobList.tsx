import { typJob } from "@/content/types";
import { JobCard } from "./JobCard";


interface JobGridProps {
  jobs: typJob[];
}

export function JobGrid({ jobs }: JobGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job, index) => (
        <JobCard key={job.id} job={job} index={index} />
      ))}
    </div>
  );
}
