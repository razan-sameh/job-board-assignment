import { notFound } from "next/navigation";
import supabase from "../supabase";
import { typJob, typLocation } from "@/content/types";

export async function fetchJobs(
  page: number,
  pageSize: number,
  locationId?: number,
  status?: string,
  search?: string,
  isRecentJobs?: boolean,
) {
  const { data, error } = await supabase.rpc("fetch_jobs_paginated", {
    p_page: page,
    p_page_size: pageSize,
    p_location_id: locationId ?? null,
    p_status: status ?? null,
    p_search: search ?? null,
    p_recent: isRecentJobs ?? false,
  });

  if (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }

  return data;
}

export async function fetchJobById(jobId: number): Promise<typJob | null> {
  const { data, error } = await supabase.rpc("get_job_by_id", {
    p_job_id: jobId,
  });
  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    notFound();
  }

  return {
    company: data.company,
    createdAt: data.created_at,
    description: data.description,
    id: data.id,
    location: data.location,
    salary: data.salary,
    status: data.status,
    title: data.title,
    updatedAt: data.updated_at,
    createdBy: data.created_by,
  };
}
export async function fetchLocations(): Promise<typLocation[] | null> {
  const { data, error } = await supabase.rpc("get_locations");

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    notFound();
  }

  return data;
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
export async function createJob(
  title: string,
  description: string,
  company: string,
  salary: number,
  status: string,
  locationId: number,
) {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      title: title,
      description: description,
      company: company,
      salary: salary,
      locationId: locationId,
      jobStatus: status,
    }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  const data = await res.json();
  return data?.data;
}

export async function updateJob(
  id: number,
  title?: string,
  description?: string,
  company?: string,
  salary?: number,
  status?: string,
  locationId?: number,
) {
  const res = await fetch(`/api/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      salary,
      status,
      title,
      description,
      company,
      locationId,
    }),
  });

  if (!res.ok) throw new Error("Failed to update job");

  const data = await res.json();
  return data?.data; // return the updated job JSON
}

export async function deleteJob(id: number) {
  const res = await fetch(`/api/jobs/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to update job");

  const data = await res.json();
  return data?.data;
}
