import { z } from "zod";

export const SkillValidation = {
  createSkillZodSchema: z.object({
    body: z.object({
      name: z.string().min(1, "Name is required"),
      categoryId: z.string().min(1, "Category ID is required"),
    }),
  }),

  updateSkillZodSchema: z.object({
    body: z.object({
      name: z.string().min(1, "Name is required").optional(),
      categoryId: z.string().min(1, "Category ID is required").optional(),
    }),
  }),
};
