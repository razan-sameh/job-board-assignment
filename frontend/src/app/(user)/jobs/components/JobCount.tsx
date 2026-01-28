interface JobCountProps {
  count: number;
}

export function JobCount({ count }: JobCountProps) {
  return (
    <div className="mb-6">
      <p className="text-content font-semibold text-lg">{count} jobs found</p>
    </div>
  );
}
