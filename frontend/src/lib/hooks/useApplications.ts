/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createApplication,
  fetchMyApplications,
  hasApplied,
  updateApplicationStatus,
} from "../services/application";

export function useMyApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: () => fetchMyApplications(),
    retry: 1,
    staleTime: Infinity,
  });
}

export function useHasApplied(jobId?: number) {
  return useQuery({
    queryKey: ["has-applied", jobId],
    queryFn: () => hasApplied(jobId!),
    enabled: !!jobId,
    staleTime: Infinity,
    retry: 1,
  });
}

export function useCreateApplication() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      jobId: number;
      resumeLink: string;
      coverLetter: string;
    }) =>
      createApplication(payload.jobId, payload.resumeLink, payload.coverLetter),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useUpdateApplicationStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { applicationId: number; status: string }) =>
      updateApplicationStatus(payload.applicationId, payload.status),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
