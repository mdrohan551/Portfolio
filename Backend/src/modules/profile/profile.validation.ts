import { z } from "zod";

const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Invalid URL"),
  iconName: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

const taglineSchema = z.object({
  prefix: z.string(),
  highlight1: z.string(),
  mid: z.string(),
  highlight2: z.string(),
  suffix: z.string(),
});

export const createProfileSchema = z.object({
  body: z.object({
    // Personal Info
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),

    // Sidebar data
    entryName: z.string().optional(),
    slug: z.string().optional(),

    // Home Banner data
    bannerTitle: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .refine((arr) => arr.length > 0, "Banner title is required"),
    bannerEntryName: z.string().optional(),
    bannerDescription: z.string().optional(),
    skillTags: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),

    // About data
    aboutTitle: z.string().optional(),
    aboutTagline: z
      .union([taglineSchema, z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),
    aboutDescription: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),
    contributions: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),
    remoteMindset: z.string().optional(),
    tools: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),
    aboutClosing: z.string().optional(),

    isActive: z.boolean().optional(),
    socialLinks: z
      .union([z.array(socialLinkSchema), z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    entryName: z.string().optional(),
    slug: z.string().optional(),
    bannerTitle: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),
    bannerEntryName: z.string().optional(),
    bannerDescription: z.string().optional(),
    skillTags: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),
    aboutTitle: z.string().optional(),
    aboutTagline: z
      .union([taglineSchema, z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),
    aboutDescription: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),
    contributions: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),
    remoteMindset: z.string().optional(),
    tools: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
      .optional(),
    aboutClosing: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

// Social Link validations
export const createSocialLinkSchema = z.object({
  body: socialLinkSchema,
});

export const updateSocialLinkSchema = z.object({
  body: z.object({
    platform: z.string().optional(),
    url: z.string().url().optional(),
    iconName: z.string().optional(),
    order: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
});
