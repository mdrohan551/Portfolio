import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  extractPublicId,
} from "../../middlewares/uploadMiddleware";

const createTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, role, feedback, rating } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Upload avatar to Cloudinary
    let avatarUrl = "";
    if (files?.avatar?.[0]) {
      const avatarResult = (await uploadToCloudinary(
        files.avatar[0].buffer,
        "portfolio/testimonials/avatars"
      )) as any;
      avatarUrl = avatarResult.secure_url;
    }

    const result = await prisma.testimonial.create({
      data: {
        name,
        role,
        feedback,
        rating: parseInt(rating),
        avatar: avatarUrl,
      },
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllTestimonials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = "1", count = "10" } = req.query;

    const pageNum = parseInt(page as string);
    const countNum = parseInt(count as string);
    const skip = (pageNum - 1) * countNum;

    const [testimonials, totalCount] = await Promise.all([
      prisma.testimonial.findMany({
        orderBy: {
          rating: "desc",
        },
        skip,
        take: countNum,
      }),
      prisma.testimonial.count(),
    ]);

    res.status(200).json({
      getAllTestimonials: testimonials,
      totalTestimonials: totalCount,
    });
  } catch (err) {
    next(err);
  }
};

const getTestimonialById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json(testimonial);
  } catch (err) {
    next(err);
  }
};

const updateTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, role, feedback, rating } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Upload new avatar if provided and delete old one
    let avatarUrl = existingTestimonial.avatar;
    if (files?.avatar?.[0]) {
      // Delete old avatar from Cloudinary if it exists
      if (existingTestimonial.avatar) {
        try {
          const oldAvatarPublicId = extractPublicId(existingTestimonial.avatar);
          if (oldAvatarPublicId) {
            await deleteFromCloudinary(oldAvatarPublicId);
          }
        } catch (error) {
          console.error("Error deleting old avatar:", error);
        }
      }

      const avatarResult = (await uploadToCloudinary(
        files.avatar[0].buffer,
        "portfolio/testimonials/avatars"
      )) as any;
      avatarUrl = avatarResult.secure_url;
    }

    const result = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(role && { role }),
        ...(feedback && { feedback }),
        ...(rating && { rating: parseInt(rating) }),
        avatar: avatarUrl,
      },
    });

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Delete avatar from Cloudinary before deleting the testimonial
    if (existingTestimonial.avatar) {
      try {
        const avatarPublicId = extractPublicId(existingTestimonial.avatar);
        if (avatarPublicId) {
          await deleteFromCloudinary(avatarPublicId);
        }
      } catch (error) {
        console.error("Error deleting avatar from Cloudinary:", error);
      }
    }

    await prisma.testimonial.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const TestimonialControllers = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
