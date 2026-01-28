import Container from "@/component/ui/Container";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { Suspense } from "react";
import JobDetails from "./component/JobDetails";


export default async function JobPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <Container>
      <Suspense fallback={<LoadingSpinner />}>
        <JobDetails jobId={id} />
      </Suspense>
    </Container>
  );
}
