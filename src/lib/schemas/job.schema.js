import { z } from "zod";

export const createJobSchema = z.object({

  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  budget: z
    .number()
    .positive("Budget must be positive"),
});