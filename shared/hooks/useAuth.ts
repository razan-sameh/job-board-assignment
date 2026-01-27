import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, me, register } from "../api/authApi";

export function useLogin() {
  const qc = useQueryClient();
  return useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      qc.setQueryData(["me"], data.user);
    },
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation(register, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      qc.setQueryData(["me"], data.user);
    },
  });
}

export function useMe() {
  return useQuery(["me"], () => me(localStorage.getItem("token") || ""), {
    retry: false,
  });
}
