import { z } from "zod";

export const BlogValidation = {
  createBlogZodSchema: z.object({
    body: z.object({
      title: z.string().min(1, "Title is required"),
      shortDes: z.string().min(1, "Short description is required"),

      // Treat these as strings (JSON strings), handled in controller
      tag: z.string().min(1, "Tag is required"),

      // Blog details
      detailTitle: z.string().min(1, "Detail title is required"),
      description: z.string().min(1, "Description is required"),
      detailTags: z.string().min(1, "Detail tag is required"),
      contentSections: z.string().min(1, "Content sections are required"),
      author: z.string().min(1, "Author is required"),
    }),
  }),

  updateBlogZodSchema: z.object({
    body: z.object({
      title: z.string().min(1, "Title is required").optional(),
      shortDes: z.string().min(1, "Short description is required").optional(),
      tag: z.string().min(1, "Tag is required").optional(),

      // Blog details
      detailTitle: z.string().min(1, "Detail title is required").optional(),
      description: z.string().min(1, "Description is required").optional(),
      detailTags: z.string().min(1, "Detail tag is required").optional(),
      contentSections: z
        .string()
        .min(1, "Content sections are required")
        .optional(),
      author: z.string().min(1, "Author is required").optional(),
    }),
  }),
};
