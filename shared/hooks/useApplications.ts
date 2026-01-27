import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apply, listApplicationsByUser, listAllApplications } from "../api/applicationApi";

export function useApply() {
  const qc = useQueryClient();
  return useMutation(apply, {
    onSuccess: () => qc.invalidateQueries(["myApplications"]),
  });
}

export function useMyApplications(userId: string) {
  return useQuery(["myApplications", userId], () => listApplicationsByUser(userId));
}

export function useAllApplications() {
  return useQuery(["allApplications"], () => listAllApplications());
}
