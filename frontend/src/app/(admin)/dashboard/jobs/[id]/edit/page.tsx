import { Suspense } from "react";
import EditJob from "./component/EditJob";
import LoadingSpinner from "@/component/ui/LoadingSpinner";

interface JobPageProps {
  params: { id: number } | Promise<{ id: number }>; // could be promise in Next 14+
}

export default async function JobPage({ params }: JobPageProps) {
  // unwrap params
  const { id } = await params;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EditJob jobId={id} />
    </Suspense>
  );
}
