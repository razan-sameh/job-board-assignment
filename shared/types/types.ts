import { enmRole, enmJobStatus, enmApplicationStatus } from "./enums";

export type typUser = {
  id: string;
  fullName: string;
  email: string;
  role: enmRole;
};

export type typJob = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  status: enmJobStatus;
  createdBy: string;
};

export type typApplication = {
  id: string;
  jobId: string;
  userId: string;
  resumeText: string;
  coverLetter: string;
  status: enmApplicationStatus;
};
