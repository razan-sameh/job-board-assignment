import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listJobs, getJob, createJob, updateJob, deleteJob } from "../api/jobApi";

export function useJobs(params?: any) {
  return useQuery(["jobs", params], () => listJobs(params));
}

export function useJob(id: string) {
  return useQuery(["job", id], () => getJob(id));
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation(createJob, {
    onSuccess: () => qc.invalidateQueries(["jobs"]),
  });
}

export function useUpdateJob() {
  const qc = useQueryClient();
  return useMutation(({ id, payload }: any) => updateJob(id, payload), {
    onSuccess: () => qc.invalidateQueries(["jobs"]),
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation(deleteJob, {
    onSuccess: () => qc.invalidateQueries(["jobs"]),
  });
}
