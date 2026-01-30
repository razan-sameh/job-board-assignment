import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats, fetchJobSeekers } from "../services/admin";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => fetchDashboardStats(),
    retry: 1,
    staleTime: Infinity,
  });
}

export function useJobSeekers(
  params: {
    page?: number;
    pageSize?: number;
  } = {},
) {
  const { page = 1, pageSize = 10 } = params;
  return useQuery({
    queryKey: ["JobSeekers", page, pageSize],
    queryFn: () => fetchJobSeekers(page, pageSize),
    retry: 1,
    staleTime: Infinity,
  });
}
