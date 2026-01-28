"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchMe, loginApi, logout, signupApi } from "../services/auth";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useMe() {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    retry: 1, // 👈 Avoid infinite retry loops
    staleTime: Infinity,
  });

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isLoading,
    isError,
    refetch,
  };
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      // Set user data directly in cache
      if (data.success && data.user) {
        queryClient.setQueryData(["auth", "me"], {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata.display_name,
          role: data.user.user_metadata.role,
        });
      }
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signupApi,
    onSuccess: async (data) => {
      if (data.success && data.user) {
        // 1. Set user data in cache
        queryClient.setQueryData(["auth", "me"], {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata.display_name,
          role: data.user.user_metadata.role,
        });
      }
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      queryClient.setQueryData(["auth", "me"], null);
    },
  });
}
