import { notFound } from "next/navigation";
import supabase from "../supabase";
import { typJob } from "@/content/types";

export async function fetchJobs(
  page: number,
  pageSize: number,
  locationId?: number,
  status?: string,
  search?: string,
) {
  const { data, error } = await supabase.rpc("fetch_jobs_paginated", {
    p_page: page,
    p_page_size: pageSize,
    p_location_id: locationId ?? null,
    p_status: status ?? null,
    p_search: search ?? null,
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
export async function fetchLocations() {
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
export async function createJob(
  title: string,
  description: string,
  company: string,
  salary: number,
  status: string,
  locationId: number,
  createdBy: number,
) {
  const { data, error } = await supabase.rpc("create_job", {
    p_title: title,
    p_description: description,
    p_company: company,
    p_salary: salary,
    p_status: status,
    p_location_id: locationId,
    p_created_by: createdBy,
  });
  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    notFound();
  }

  return data;
}
export async function updateJob(id: number, salary: number, status: string) {
  const { data, error } = await supabase.rpc("update_job", {
    p_job_id: id,
    p_salary: salary,
    p_status: status,
  });

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    notFound();
  }

  return data;
}
export async function deleteJob(id: number) {
  const { data, error } = await supabase.rpc("delete_job", {
    p_job_id: id,
  });

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    notFound();
  }

  return data;
}
