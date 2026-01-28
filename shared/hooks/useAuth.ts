import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, me, register } from "../api/authApi";

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Login failed");
      const data = await res.json();
      qc.setQueryData(["me"], data.user);
      return data;
    },
  });
}

export function useRegister() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      fullName: string;
      email: string;
      password: string;
    }) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Register failed");
      }

      const data = await res.json();

      // Update React Query cache for "me"
      qc.setQueryData(["me"], data.user);

      return data;
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
