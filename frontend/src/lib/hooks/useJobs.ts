/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  createJob,
  deleteJob,
  fetchJobById,
  fetchJobs,
  fetchLocations,
  updateJob,
} from "../services/job";

// ------------------- Jobs list -------------------
export function useJobs(params: {
  page?: number;
  pageSize?: number;
  locationId?: number;
  status?: string;
  search?: string;
} = {}) {
  const { page = 1, pageSize = 10, locationId, status, search } = params;

  return useSuspenseQuery({
    queryKey: ["jobs", page, pageSize, locationId, status, search],
    queryFn: () => fetchJobs(page, pageSize, locationId, status, search),
    retry: 1,
    staleTime: Infinity,
  });
}

// ------------------- Locations -------------------
export function useJobLocations() {
  return useSuspenseQuery({
    queryKey: ["job-locations"],
    queryFn: fetchLocations,
    retry: 1,
    staleTime: Infinity,
  });
}

// ------------------- Single job -------------------
export function useJobsById(id: number) {
  return useSuspenseQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    retry: 1,
    staleTime: Infinity,
  });
}

// ------------------- Create job -------------------
export function useCreateJob() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      title: string;
      description: string;
      company: string;
      salary: number;
      status: string;
      locationId: number;
      createdBy: number;
    }) =>
      createJob(
        payload.title,
        payload.description,
        payload.company,
        payload.salary,
        payload.status,
        payload.locationId,
        payload.createdBy
      ),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["jobs"] });
      await qc.invalidateQueries({ queryKey: ["job-locations"] });
    },
  });
}

// ------------------- Update job -------------------
export function useUpdateJob() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      id: number;
      salary?: number;
      status?: string;
    }) =>
      updateJob(
        payload.id,
        payload.salary!,
        payload.status!,
      ),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["jobs"] });
      await qc.invalidateQueries({ queryKey: ["job-locations"] });
    },
  });
}

// ------------------- Delete job -------------------
export function useDeleteJob() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteJob(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["jobs"] });
      await qc.invalidateQueries({ queryKey: ["job-locations"] });
    },
  });
}
