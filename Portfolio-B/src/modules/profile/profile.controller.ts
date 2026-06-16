import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  extractPublicId,
} from "../../middlewares/uploadMiddleware";

// Get active profile (public)
const getActiveProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: { isActive: true },
      include: {
        socialLinks: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "No active profile found",
      });
    }

    // Transform data for frontend compatibility
    const transformedData = {
      // mydata format
      getActiveData: {
        image: profile.image,
        entryName: profile.entryName,
        name: profile.name,
        slug: profile.slug,
        email: profile.email,
        phone: profile.phone,
        icons: profile.socialLinks.map((link) => ({
          platform: link.platform,
          href: link.url,
          iconName: link.iconName,
        })),
      },
      // homeBannerData format
      homeBannerData: {
        entryName: profile.bannerEntryName,
        title: profile.bannerTitle,
        description: profile.bannerDescription,
        skillTags: profile.skillTags,
      },
      // aboutData format
      aboutData: {
        title: profile.aboutTitle,
        tagline: profile.aboutTagline,
        description: profile.aboutDescription,
        contributions: profile.contributions,
        remoteMindset: profile.remoteMindset,
        tools: profile.tools,
        closing: profile.aboutClosing,
      },
      // Raw profile data
      profile,
    };

    res.status(200).json(transformedData);
  } catch (err) {
    next(err);
  }
};

// Get all profiles (admin)
const getAllProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = "1", count = "20" } = req.query;

    const pageNum = parseInt(page as string);
    const countNum = parseInt(count as string);
    const skip = (pageNum - 1) * countNum;

    const [profiles, totalCount] = await Promise.all([
      prisma.profile.findMany({
        include: {
          socialLinks: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: countNum,
      }),
      prisma.profile.count(),
    ]);

    res.status(200).json({
      getAllProfiles: profiles,
      totalProfiles: totalCount,
    });
  } catch (err) {
    next(err);
  }
};

// Get profile by ID
const getProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        socialLinks: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

// Create profile
const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profileData = req.body;
    const file = req.file;

    // Upload image if provided
    let imageUrl = "";
    if (file) {
      const imageResult = (await uploadToCloudinary(
        file.buffer,
        "portfolio/profile"
      )) as any;
      imageUrl = imageResult.secure_url;
    }

    const { socialLinks, ...restData } = profileData;

    // Parse JSON fields if they're strings
    const parsedData = {
      ...restData,
      image: imageUrl || undefined,
      bannerTitle:
        typeof restData.bannerTitle === "string"
          ? JSON.parse(restData.bannerTitle)
          : restData.bannerTitle,
      skillTags:
        typeof restData.skillTags === "string"
          ? JSON.parse(restData.skillTags)
          : restData.skillTags,
      aboutTagline:
        typeof restData.aboutTagline === "string"
          ? JSON.parse(restData.aboutTagline)
          : restData.aboutTagline,
      aboutDescription:
        typeof restData.aboutDescription === "string"
          ? JSON.parse(restData.aboutDescription)
          : restData.aboutDescription,
      contributions:
        typeof restData.contributions === "string"
          ? JSON.parse(restData.contributions)
          : restData.contributions,
      tools:
        typeof restData.tools === "string"
          ? JSON.parse(restData.tools)
          : restData.tools,
    };

    const profile = await prisma.profile.create({
      data: {
        ...parsedData,
        socialLinks: socialLinks
          ? {
              create:
                typeof socialLinks === "string"
                  ? JSON.parse(socialLinks)
                  : socialLinks,
            }
          : undefined,
      },
      include: {
        socialLinks: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully!",
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

// Update profile
const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const file = req.file;

    const existingProfile = await prisma.profile.findUnique({
      where: { id },
    });

    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Handle image update
    let imageUrl = existingProfile.image;
    if (file) {
      // Delete old image if exists
      if (existingProfile.image) {
        const publicId = extractPublicId(existingProfile.image);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }
      const imageResult = (await uploadToCloudinary(
        file.buffer,
        "portfolio/profile"
      )) as any;
      imageUrl = imageResult.secure_url;
    }

    // Exclude socialLinks from update data as they are managed separately
    const { socialLinks, ...dataToUpdate } = updateData;

    // Parse JSON fields if they're strings
    const parsedData = {
      ...dataToUpdate,
      image: imageUrl,
      bannerTitle:
        typeof dataToUpdate.bannerTitle === "string"
          ? JSON.parse(dataToUpdate.bannerTitle)
          : dataToUpdate.bannerTitle,
      skillTags:
        typeof dataToUpdate.skillTags === "string"
          ? JSON.parse(dataToUpdate.skillTags)
          : dataToUpdate.skillTags,
      aboutTagline:
        typeof dataToUpdate.aboutTagline === "string"
          ? JSON.parse(dataToUpdate.aboutTagline)
          : dataToUpdate.aboutTagline,
      aboutDescription:
        typeof dataToUpdate.aboutDescription === "string"
          ? JSON.parse(dataToUpdate.aboutDescription)
          : dataToUpdate.aboutDescription,
      contributions:
        typeof dataToUpdate.contributions === "string"
          ? JSON.parse(dataToUpdate.contributions)
          : dataToUpdate.contributions,
      tools:
        typeof dataToUpdate.tools === "string"
          ? JSON.parse(dataToUpdate.tools)
          : dataToUpdate.tools,
    };

    const profile = await prisma.profile.update({
      where: { id },
      data: parsedData,
      include: {
        socialLinks: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

// Delete site profile
const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const existingProfile = await prisma.profile.findUnique({
      where: { id },
    });

    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Delete image from cloudinary
    if (existingProfile.image) {
      const publicId = extractPublicId(existingProfile.image);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    await prisma.profile.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// Set active profile
const setActiveProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // First, deactivate all profiles
    await prisma.profile.updateMany({
      data: { isActive: false },
    });

    // Then activate the selected one
    const profile = await prisma.profile.update({
      where: { id },
      data: { isActive: true },
      include: {
        socialLinks: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Profile activated successfully!",
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

// ============ Social Links Controllers ============

// Add social link to profile
const addSocialLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId } = req.params;
    const linkData = req.body;

    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const socialLink = await prisma.socialLink.create({
      data: {
        ...linkData,
        profileId: profileId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Social link added successfully!",
      data: socialLink,
    });
  } catch (err) {
    next(err);
  }
};

// Update social link
const updateSocialLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { linkId } = req.params;
    const updateData = req.body;

    const existingLink = await prisma.socialLink.findUnique({
      where: { id: linkId },
    });

    if (!existingLink) {
      return res.status(404).json({
        success: false,
        message: "Social link not found",
      });
    }

    const socialLink = await prisma.socialLink.update({
      where: { id: linkId },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      message: "Social link updated successfully!",
      data: socialLink,
    });
  } catch (err) {
    next(err);
  }
};

// Delete social link
const deleteSocialLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { linkId } = req.params;

    const existingLink = await prisma.socialLink.findUnique({
      where: { id: linkId },
    });

    if (!existingLink) {
      return res.status(404).json({
        success: false,
        message: "Social link not found",
      });
    }

    await prisma.socialLink.delete({
      where: { id: linkId },
    });

    res.status(200).json({
      success: true,
      message: "Social link deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const ProfileController = {
  getActiveProfile,
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  setActiveProfile,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
};
