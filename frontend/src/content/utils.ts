import moment from "moment";
import { enmApplicationStatus, enmJobStatus } from "./enums";

export function formatDate(
  isoDate: moment.MomentInput,
  format = "DD/MM/YYYY hh:mm A",
) {
  return moment.utc(isoDate).local().format(format);
}

export const applicationStatusColors: Record<enmApplicationStatus, string> = {
  submitted: "bg-blue-100 text-blue-700",
  reviewed: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
};

export const jobStatusColors: Record<enmJobStatus, string> = {
  open: "bg-emerald-100 text-emerald-700",
  closed: "bg-slate-100 text-slate-600",
};