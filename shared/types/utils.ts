export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
import moment from "moment";

export const STORAGE_KEYS = {
  USERS: "wtm_users",
  JOBS: "wtm_jobs",
  APPLICATIONS: "wtm_applications",
};

export function readFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
}

export function writeToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function formatDate(isoDate: moment.MomentInput, format = "DD/MM/YYYY hh:mm A") {
  return moment.utc(isoDate).local().format(format);
}