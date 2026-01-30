import { enmRole, enmJobStatus, enmApplicationStatus } from "./enums";

export type typUser = {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  role?: enmRole;
};

export type typLocation = {
  id: number;
  name: string;
};

export type typJob = {
  id: number;
  title: string;
  description: string;
  location: typLocation;
  salary: number;
  status: enmJobStatus;
  createdBy: string;
  updatedAt: string;
  company: string;
  createdAt: string;
};

export type typApplication = {
  id: string;
  job: typJob;
  user: typUser;
  resumeText: string;
  coverLetter: string;
  status: enmApplicationStatus;
  createdAt: string;
  updatedAt: string;
};
