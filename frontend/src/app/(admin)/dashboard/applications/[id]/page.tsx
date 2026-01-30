import ApplicationDetails from "./components/ApplicationDetails";

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return <ApplicationDetails applicationId={id} />;
}
