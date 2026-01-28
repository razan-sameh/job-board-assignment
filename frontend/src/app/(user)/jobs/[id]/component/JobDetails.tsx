"use client";
import { useJobsById } from "@jobboard/shared/hooks/useJobs";
import JobDetailsContent from "./JobDetailsContent";

function JobDetails({ jobId }: { jobId: string }) {
  const { data: job } = useJobsById(jobId);

  return <JobDetailsContent job={job} />;
}

export default JobDetails;
