import { enmJobStatus } from "@/content/enums";
import { z } from "zod";
export const editJobSchema = z.object({
  jobTitle: z.string().min(3, "Job title is required"),
  companyName: z.string().min(2, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  salaryRange: z
    .number("Salary must be a number")
    .positive("Salary must be positive"),
  status: z.enum([enmJobStatus.open, enmJobStatus.closed]),
  jobDescription: z.string().min(5, "Job description is required"),
});

export type EditJobFormData = z.infer<typeof editJobSchema>;
