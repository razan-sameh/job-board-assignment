"use client";
import { useJobs } from "@/lib/hooks/useJobs";
import { JobCount } from "./JobCount";
import { JobGrid } from "./JobList";
import { useSearchParams } from "next/dist/client/components/navigation";

function JobBoard() {
  const searchParams = useSearchParams();
  // Convert location to number if it exists
  const locationIdStr = searchParams.get("location");
  const locationId = locationIdStr ? Number(locationIdStr) : undefined;
  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || undefined;

  const { data: jobs } = useJobs({ page: 1, pageSize: 10, locationId, status, search });

  return (
    <>
      <JobCount count={jobs.data.length} />
      <JobGrid jobs={jobs.data} />
    </>
  );
}

export default JobBoard;
