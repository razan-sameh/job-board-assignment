"use client";
import { useJobsById } from "@/lib/hooks/useJobs";
import JobDetailsContent from "./JobDetailsContent";

function JobDetails({ jobId }: { jobId: number }) {
  const { data: job } = useJobsById(jobId);

  return <JobDetailsContent job={job} />;
}

export default JobDetails;
