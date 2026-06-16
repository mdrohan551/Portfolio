import { z } from "zod";

export const createContactSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    subject: z
      .string()
      .min(1, "Subject is required")
      .max(200, "Subject is too long"),
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(2000, "Message is too long"),
  }),
});

export const updateContactStatusSchema = z.object({
  body: z.object({
    status: z.boolean(),
  }),
});
