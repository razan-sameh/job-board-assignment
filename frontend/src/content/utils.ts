import moment from "moment";

export function formatDate(isoDate: moment.MomentInput, format = "DD/MM/YYYY hh:mm A") {
  return moment.utc(isoDate).local().format(format);
}