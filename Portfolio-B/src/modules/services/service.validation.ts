import { z } from "zod";

export const ServiceValidation = {
  createServiceZodSchema: z.object({
    body: z.object({
      title: z.string().min(1, "Title is required"),
      shortDesc: z.string().min(1, "Short description is required"),
      tag: z.string().min(1, "Tag is required"),
      hasIcon: z.string().optional().or(z.boolean()),
      stack: z.string().min(1, "Stack is required"),
      detailTitle: z.string().min(1, "Detail title is required"),
      description: z.string().min(1, "Description is required"),
      features: z.string().min(1, "Features are required"),
      faqs: z.string().min(1, "FAQs are required"),
      notes: z.string().min(1, "Notes are required"),
    }),
  }),

  updateServiceZodSchema: z.object({
    body: z.object({
      title: z.string().min(1, "Title is required"),
      shortDesc: z.string().min(1, "Short description is required"),
      tag: z.string().min(1, "Tag is required"),
      hasIcon: z.string().optional().or(z.boolean()),
      stack: z.string().min(1, "Stack is required"),
      detailTitle: z.string().min(1, "Detail title is required"),
      description: z.string().min(1, "Description is required"),
      features: z.string().min(1, "Features are required"),
      faqs: z.string().min(1, "FAQs are required"),
      notes: z.string().min(1, "Notes are required"),
    }),
  }),
};
