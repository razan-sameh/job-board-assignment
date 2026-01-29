/* eslint-disable @typescript-eslint/no-explicit-any */
import { typApplication } from "@/content/types";
import { notFound } from "next/navigation";

export async function fetchMyApplications(): Promise<typApplication[]> {
  const res = await fetch("/api/applications/my", {
    credentials: "include",
  });

  if (!res.ok) {
    console.error("Failed to fetch applications");
    return [];
  }

  const { data } = await res.json();
  
  return data.map((app:any) => ({
    id: app.id,
    resumeText: app.resume_link,
    coverLetter: app.cover_letter,
    status: app.status,
    job: app.job,
    user: app.user || null,
    createdAt: app.created_at || null,
    updatedAt: app.updated_at || null,
  }));
}

export async function hasApplied(jobId: number): Promise<boolean> {
  const res = await fetch(
    `/api/applications/has-applied?jobId=${jobId}`,
    { credentials: "include" },
  );

  if (!res.ok) {
    throw new Error("Failed to check application status");
  }

  const { applied } = await res.json();
  return applied;
}


export async function createApplication(
  jobId: number,
  resumeLink: string,
  coverLetter: string,
) {
  const res = await fetch("/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      jobId: jobId,
      resumeLink: resumeLink,
      coverLetter: coverLetter,
    }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
}

export async function updateApplicationStatus(
  applicationId: number,
  status: string,
) {
  const res = await fetch(`/api/applications/${applicationId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update application");
  }

  const { data } = await res.json();
  return data;
}
