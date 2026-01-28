"use client";
import { useJobs } from "@jobboard/shared/hooks/useJobs";
import { JobCount } from "./JobCount";
import { JobGrid } from "./JobList";
import { useSearchParams } from "next/dist/client/components/navigation";

function JobBoard() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || undefined;
  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || undefined;
  const { data: jobs } = useJobs({ location, status, search });
  return (
    <>
      <JobCount count={jobs.data.length} />
      <JobGrid jobs={jobs.data} />
    </>
  );
}

export default JobBoard;
