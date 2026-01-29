import Container from "@/component/ui/Container";
import ApplicationSubmit from "./component/ApplicationSubmit";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { Suspense } from "react";

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <Container>
      <Suspense fallback={<LoadingSpinner />}>
        <ApplicationSubmit jobId={id} />
      </Suspense>
    </Container>
  );
}
