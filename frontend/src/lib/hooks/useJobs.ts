/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createJob,
  deleteJob,
  fetchJobById,
  fetchJobs,
  fetchLocations,
  updateJob,
} from "../services/job";

// ------------------- Jobs list -------------------
export function useJobs(
  params: {
    page?: number;
    pageSize?: number;
    locationId?: number;
    status?: string;
    search?: string;
    isRecentJobs?: boolean;
  } = {},
) {
  const {
    page = 1,
    pageSize = 10,
    locationId,
    status,
    search,
    isRecentJobs,
  } = params;

  return useSuspenseQuery({
    queryKey: [
      "jobs",
      page,
      pageSize,
      locationId,
      status,
      search,
      isRecentJobs,
    ],
    queryFn: () =>
      fetchJobs(page, pageSize, locationId, status, search, isRecentJobs),
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
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      title: string;
      description: string;
      company: string;
      salary: number;
      status: string;
      locationId: number;
    }) =>
      createJob(
        payload.title,
        payload.description,
        payload.company,
        payload.salary,
        payload.status,
        payload.locationId,
      ),

    onMutate: async (newJob) => {
      await queryClient.cancelQueries({ queryKey: ["jobs"] });
      const previousJobs = queryClient.getQueryData<any[]>(["jobs"]);

      // Optimistically add the job to cache
      queryClient.setQueryData(["jobs"], (old: any[] = []) => [
        ...old,
        { ...newJob, id: Date.now() }, // temporary ID
      ]);

      return { previousJobs };
    },

    onError: (err, newJob, context) => {
      if (context?.previousJobs) {
        queryClient.setQueryData(["jobs"], context.previousJobs);
      }
    },

    onSuccess: (createdJob) => {
      // Replace temporary job with server response
      queryClient.setQueryData(["jobs"], (old: any[] = []) =>
        old.map((job) => (job.id === createdJob.id ? createdJob : job)),
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      id: number;
      title?: string;
      description?: string;
      company?: string;
      salary?: number;
      status?: string;
      locationId?: number;
    }) =>
      updateJob(
        payload.id,
        payload.title,
        payload.description,
        payload.company,
        payload.salary,
        payload.status,
        payload.locationId,
      ),

    onMutate: async (updatedJob) => {
      await queryClient.cancelQueries({ queryKey: ["jobs"] });
      const previousJobs = queryClient.getQueryData<any[]>(["jobs"]);

      // Optimistically update jobs list cache
      queryClient.setQueryData(["jobs"], (old: any[] = []) =>
        old.map((job) =>
          job.id === updatedJob.id ? { ...job, ...updatedJob } : job,
        ),
      );

      // Also optimistically update single job cache
      queryClient.setQueryData(["job", updatedJob.id], (old: any) => ({
        ...old,
        ...updatedJob,
      }));

      return { previousJobs };
    },

    onError: (err, updatedJob, context) => {
      if (context?.previousJobs) {
        queryClient.setQueryData(["jobs"], context.previousJobs);
      }
    },

    onSettled: (updated) => {
      if (!updated) return;
      // ✅ Invalidate both jobs list and single job queries
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", updated.id] });
    },
  });
}

// ------------------- Delete job -------------------
// export function useDeleteJob() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: (id: number) => deleteJob(id),
//     onSuccess: async () => {
//       await qc.invalidateQueries({ queryKey: ["jobs"] });
//       await qc.invalidateQueries({ queryKey: ["job-locations"] });
//     },
//   });
// }
export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteJob(id),

    onMutate: async (jobId) => {
      await queryClient.cancelQueries({ queryKey: ["jobs"] });
      const previousJobs = queryClient.getQueryData<any[]>(["jobs"]);

      // Optimistically remove from cache
      queryClient.setQueryData(["jobs"], (old: any[] = []) =>
        old.filter((job) => job.id !== jobId),
      );

      return { previousJobs };
    },

    onError: (err, jobId, context) => {
      if (context?.previousJobs) {
        queryClient.setQueryData(["jobs"], context.previousJobs);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}
