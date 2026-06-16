import { z } from "zod";

export const FAQValidation = {
  createFAQZodSchema: z.object({
    body: z.object({
      category: z.string().min(1, "Category is required"),
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    }),
  }),

  updateFAQZodSchema: z.object({
    body: z.object({
      category: z.string().min(1, "Category is required").optional(),
      question: z.string().min(1, "Question is required").optional(),
      answer: z.string().min(1, "Answer is required").optional(),
    }),
  }),
};
