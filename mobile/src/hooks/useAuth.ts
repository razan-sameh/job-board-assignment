import { useQuery } from "@tanstack/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchMe, loginApi, logout, signupApi } from "src/api/authApi";

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
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: async (data) => {
      if (data && data.user) {
        queryClient.setQueryData(["auth", "me"], {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.display_name ?? "",
          role: data.user.user_metadata?.role ?? "",
        });
      }
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      email,
      password,
      fullName,
    }: {
      email: string;
      password: string;
      fullName: string;
    }) => signupApi(email, password,fullName),
    onSuccess: async (data) => {
      if (data && data.user) {
        queryClient.setQueryData(["auth", "me"], {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.display_name ?? "",
          role: data.user.user_metadata?.role ?? "",
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
