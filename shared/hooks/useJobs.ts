import {
  useQuery,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  listJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  listJobLocations,
} from "../api/jobApi";

export function useJobs(params?: any) {
  return useSuspenseQuery({
    queryKey: ["jobs", params],
    queryFn: () => listJobs(params),
    retry: 1, // 👈 Avoid infinite retry loops
    staleTime: Infinity,
  });
}

export function useJobLocations() {
  return useSuspenseQuery({
    queryKey: ["job-locations"],
    queryFn: listJobLocations,
    retry: 1, // 👈 Avoid infinite retry loops
    staleTime: Infinity,
  });
}

export function useJobsById(id: string) {
  return useSuspenseQuery({
    queryKey: ["job", id],
    queryFn: () => getJob(id), // filters: specialOffer only
    retry: 1, // 👈 Avoid infinite retry loops
    staleTime: Infinity,
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createJob,
    onSuccess: async (data) => {
      await qc.invalidateQueries({ queryKey: ["jobs"] });
      await qc.invalidateQueries({ queryKey: ["job-locations"] });
    },
  });
}

export function useUpdateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: any) => updateJob(id, payload),
    onSuccess: async (data) => {
      await qc.invalidateQueries({ queryKey: ["jobs"] });
      await qc.invalidateQueries({ queryKey: ["job-locations"] });
    },
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: async (data) => {
      await qc.invalidateQueries({ queryKey: ["jobs"] });
      await qc.invalidateQueries({ queryKey: ["job-locations"] });
    },
  });
}
