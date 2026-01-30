/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchDashboardStats() {
  const res = await fetch("/api/dashboard", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  const { data } = await res.json();

  const stats = data?.[0]; // 👈 unwrap here

  if (!stats) return null;

  return {
    totalJobs: stats.total_jobs,
    totalApplications: stats.total_applications,
    totalUsers: stats.total_users,
    acceptedApplicationsRate: stats.accepted_applications_rate,
  };
}

export async function fetchJobSeekers(page: number, pageSize: number) {
  const query = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  }).toString();

  const res = await fetch(`/api/users?${query}`, {
    credentials: "include",
  });

  if (!res.ok) {
    console.error("Failed to fetch users");
    return [];
  }

  const json = await res.json();

  const usersArray = json.data || [];

  return usersArray.map((user: any) => ({
    id: user.id,
    email: user.email,
    fullName: user.display_name,
    role: user.role,
  }));
}