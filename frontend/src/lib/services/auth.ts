/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
interface LoginCredentials {
  identifier: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user: any;
  error?: string;
}

interface SignupCredentials {
  email: string;
  password: string;
  username: string;
}

interface SignupResponse {
  success: boolean;
  user?: any;
  message?: string;
  emailConfirmationPending?: boolean;
  error?: string;
}

export async function fetchMe() {
  const res = await fetch("/api/auth/me", { credentials: "include" });
  if (!res.ok) return null;

  const data = await res.json();

  if (!data) {
    notFound();
  }
  return {
    id: data.user.id,
    email: data.user.email,
    fullName: data.user.user_metadata.display_name,
    role: data.user.user_metadata.role,
  };
}

export async function loginApi(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const text = await response.text();
  const result = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(result.error || "Failed to login");
  }

  return result;
}

export async function signupApi(
  credentials: SignupCredentials,
): Promise<SignupResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to create user");
  }

  return result;
}

export async function logout() {
  const response = await fetch("/api/auth/logout", { method: "POST" });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to logout");
  }

  return result;
}
