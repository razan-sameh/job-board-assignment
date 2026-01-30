/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createApplication,
  fetchApplicationById,
  fetchApplications,
  fetchMyApplications,
  hasApplied,
} from "../services/application";

export function useMyApplications(
  params: {
    page?: number;
    pageSize?: number;
    isRecentApplications?: boolean;
  } = {},
) {
  const { page = 1, pageSize = 10, isRecentApplications } = params;
  return useQuery({
    queryKey: ["my-applications", page, pageSize, isRecentApplications],
    queryFn: () => fetchMyApplications(page, pageSize, isRecentApplications),
    retry: 1,
    staleTime: Infinity,
  });
}

export function useApplications(
  params: {
    page?: number;
    pageSize?: number;
    isRecentApplications?: boolean;
  } = {},
) {
  const { page = 1, pageSize = 10, isRecentApplications } = params;
  return useQuery({
    queryKey: ["applications", page, pageSize, isRecentApplications],
    queryFn: () => fetchApplications(page, pageSize, isRecentApplications),
    retry: 1,
    staleTime: Infinity,
  });
}

export function useApplicationById(applicationId: number) {
  return useQuery({
    queryKey: ["application", applicationId],
    queryFn: () => fetchApplicationById(applicationId),
    staleTime: Infinity,
    retry: 1,
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
      await qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}
