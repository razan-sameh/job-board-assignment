import applicationsData from "../mock/applications.json";
import { enmApplicationStatus } from "../types/enums";
import { typApplication } from "../types/types";
import { delay, readFromStorage, STORAGE_KEYS, writeToStorage } from "../types/utils";

let applicationsDB: typApplication[] = [];

function initApplicationsDB() {
  const stored = readFromStorage<typApplication[]>(STORAGE_KEYS.APPLICATIONS);
  applicationsDB = stored ? stored : [...applicationsData];
}

initApplicationsDB();

function saveApplicationsDB() {
  writeToStorage(STORAGE_KEYS.APPLICATIONS, applicationsDB);
}

export async function apply(payload: {
  jobId: string;
  userId: string;
  resumeText: string;
  coverLetter: string;
}) {
  await delay(600);

  const app: typApplication = {
    id: String(applicationsDB.length + 1),
    ...payload,
    status: enmApplicationStatus.submitted,
  };

  applicationsDB.push(app);
  saveApplicationsDB(); // 🔥 حفظ

  return app;
}

export async function listApplicationsByUser(userId: string) {
  await delay(500);
  return applicationsDB.filter((a) => a.userId === userId);
}

export async function listAllApplications() {
  await delay(500);
  return applicationsDB;
}
