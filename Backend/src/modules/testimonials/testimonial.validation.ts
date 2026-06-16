import { z } from "zod";

export const TestimonialValidation = {
  createTestimonialZodSchema: z.object({
    body: z.object({
      name: z.string().min(1, "Name is required"),
      role: z.string().min(1, "Role is required"),
      feedback: z.string().min(1, "Feedback is required"),
      rating: z
        .string()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5"),
    }),
  }),

  updateTestimonialZodSchema: z.object({
    body: z.object({
      name: z.string().min(1, "Name is required").optional(),
      role: z.string().min(1, "Role is required").optional(),
      feedback: z.string().min(1, "Feedback is required").optional(),
      rating: z
        .string()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5")
        .optional(),
    }),
  }),
};
