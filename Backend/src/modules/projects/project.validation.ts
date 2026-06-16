import { z } from "zod";

export const ProjectValidation = {
  createProjectZodSchema: z.object({
    body: z.object({
      title: z.string().min(1, "Title is required"),
      slug: z.string().min(1, "Slug is required"),
      categoryId: z.string().min(1, "Category ID is required"),
      date: z.string().min(1, "Date is required"),
      overview: z.string().min(1, "Overview is required"),
      keyFeatures: z.string().min(1, "Key features are required"),
      technologies: z.string().min(1, "Technologies are required"),
      liveLink: z.string().url().optional(),
    }),
  }),

  updateProjectZodSchema: z.object({
    body: z.object({
      title: z.string().min(1, "Title is required").optional(),
      slug: z.string().min(1, "Slug is required").optional(),
      categoryId: z.string().min(1, "Category ID is required").optional(),
      date: z.string().min(1, "Date is required").optional(),
      overview: z.string().min(1, "Overview is required").optional(),
      keyFeatures: z.string().min(1, "Key features are required"),
      technologies: z.string().min(1, "Technologies are required"),
      liveLink: z.string().url().optional().or(z.literal("")),
    }),
  }),
};
