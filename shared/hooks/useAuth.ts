import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, me, register } from "../api/authApi";

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      localStorage.setItem("currentSessionKey", data.sessionKey);
      qc.setQueryData(["me"], data.user);
    },
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: async (data) => {
      localStorage.setItem("currentSessionKey", data.sessionKey);
      qc.setQueryData(["me"], data.user);
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => {
      const sessionKey = localStorage.getItem("currentSessionKey");
      if (!sessionKey) throw new Error("No session");
      return me(sessionKey);
    },
    retry: false,
    staleTime: Infinity,
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      qc.setQueryData(["me"], null);
    },
  });
}
