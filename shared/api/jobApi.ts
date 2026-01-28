import { typJob } from "../types/types";
import jobsData from "../mock/jobs.json";
import { delay } from "../types/utils";
import { readFromStorage, writeToStorage, STORAGE_KEYS } from "../types/utils";
import { enmJobStatus } from "../types/enums";

let jobsDB: typJob[] = [];

function initJobsDB() {
  const stored = readFromStorage<typJob[]>(STORAGE_KEYS.JOBS);
  jobsDB = stored
    ? stored
    : jobsData.map((j: any) => ({
        ...j,
        status: j.status as enmJobStatus,
      }));
}

initJobsDB();

function saveJobsDB() {
  writeToStorage(STORAGE_KEYS.JOBS, jobsDB);
}

/* ---------- Jobs ---------- */
export async function listJobs(params?: {
  location?: string;
  status?: enmJobStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  await delay(500);

  let data = jobsDB;

  if (params?.location) {
    data = data.filter((j) =>
      j.location.toLowerCase().includes(params.location!.toLowerCase()),
    );
  }

  if (params?.status) {
    data = data.filter((j) => j.status === params.status);
  }

  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    data = data.filter(
      (j) =>
        j.title.toLowerCase().includes(searchLower) ||
        j.description.toLowerCase().includes(searchLower) ||
        j.company.toLowerCase().includes(searchLower),
    );
  }

  const page = params?.page || 1;
  const pageSize = params?.pageSize || 10;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginated = data.slice(start, end);

  return { data: paginated, total: data.length, page, pageSize };
}

export async function getJob(id: string) {
  await delay(400);

  const job = jobsDB.find((j) => j.id === id);
  if (!job) throw new Error("Job not found");
  return job;
}

export async function listJobLocations() {
  await delay(300);

  const locations = Array.from(new Set(jobsDB.map((job) => job.location)));

  return locations;
}
export async function createJob(payload: Omit<typJob, "id">) {
  await delay(600);

  const job: typJob = {
    ...payload,
    id: String(jobsDB.length + 1),
  };

  jobsDB.push(job);
  saveJobsDB(); // 🔥 حفظ

  return job;
}

export async function updateJob(id: string, payload: Partial<typJob>) {
  await delay(600);

  const idx = jobsDB.findIndex((j) => j.id === id);
  if (idx === -1) throw new Error("Job not found");

  jobsDB[idx] = { ...jobsDB[idx], ...payload };
  saveJobsDB(); // 🔥 حفظ

  return jobsDB[idx];
}

export async function deleteJob(id: string) {
  await delay(400);

  jobsDB = jobsDB.filter((j) => j.id !== id);
  saveJobsDB(); // 🔥 حفظ

  return { success: true };
}
