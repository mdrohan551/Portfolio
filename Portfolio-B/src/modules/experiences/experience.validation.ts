import { z } from "zod";

export const ExperienceValidation = {
  createExperienceZodSchema: z.object({
    body: z.object({
      title: z.string().min(1, "Title is required"),
      percentage: z.number().min(0, "Percentage must be at least 0").max(100, "Percentage cannot exceed 100"),
    }),
  }),

  updateExperienceZodSchema: z.object({
    body: z.object({
      title: z.string().min(1, "Title is required").optional(),
      percentage: z.number().min(0, "Percentage must be at least 0").max(100, "Percentage cannot exceed 100").optional(),
    }),
  }),
};