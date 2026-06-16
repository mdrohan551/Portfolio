import { z } from "zod";

export const CategoryValidation = {
  createCategoryZodSchema: z.object({
    body: z.object({
      name: z.string().min(1, "Name is required"),
      slug: z.string().min(1, "Slug is required"),
    }),
  }),

  updateCategoryZodSchema: z.object({
    body: z.object({
      name: z.string().min(1, "Name is required").optional(),
      slug: z.string().min(1, "Slug is required").optional(),
    }),
  }),
};
