import { z } from "zod";

export const applyJobSchema = z.object({

  jobId: z
    .string()
    .min(1, "Job ID is required"),

  proposal: z
    .string()
    .min(10, "Proposal must be at least 10 characters"),
});