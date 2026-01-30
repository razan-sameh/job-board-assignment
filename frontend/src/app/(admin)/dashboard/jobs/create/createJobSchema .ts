import { enmJobStatus } from "@/content/enums";
import { z } from "zod";

export const createJobSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"), // location_id as string
  salaryRange: z
    .string()
    .min(1)
    .refine((val) => !isNaN(Number(val)), {
      message: "Salary must be a number",
    }),
  status: z.enum([enmJobStatus.open, enmJobStatus.closed]),
  jobDescription: z.string().min(10, "Description is too short"),
});

export type CreateJobFormData = z.infer<typeof createJobSchema>;
