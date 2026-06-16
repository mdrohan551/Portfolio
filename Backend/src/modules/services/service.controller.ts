import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  extractPublicId,
} from "../../middlewares/uploadMiddleware";

const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const serviceData = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Upload thumbnail to Cloudinary
    let thumbnailUrl = "";
    if (files?.thumbnail?.[0]) {
      const thumbnailResult = (await uploadToCloudinary(
        files.thumbnail[0].buffer,
        "portfolio/services/thumbnails"
      )) as any;
      thumbnailUrl = thumbnailResult.secure_url;
    }

    // Upload detail images to Cloudinary
    let detailImages: string[] = [];
    if (files?.images) {
      const imageUploadPromises = files.images.map(async (file) => {
        const result = (await uploadToCloudinary(
          file.buffer,
          "portfolio/services/details"
        )) as any;
        return result.secure_url;
      });
      detailImages = await Promise.all(imageUploadPromises);
    }

    // Parse JSON fields
    const stack = JSON.parse(serviceData.stack || "[]");
    const features = JSON.parse(serviceData.features || "[]");
    const faqs = JSON.parse(serviceData.faqs || "[]");
    const notes = JSON.parse(serviceData.notes || "[]");

    // Create service with details in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const service = await tx.service.create({
        data: {
          title: serviceData.title,
          shortDesc: serviceData.shortDesc,
          tag: serviceData.tag,
          hasIcon: serviceData.hasIcon === "true",
          stack,
          thumbnail: thumbnailUrl,
        },
      });

      const serviceDetail = await tx.serviceDetail.create({
        data: {
          serviceId: service.id,
          title: serviceData.detailTitle,
          description: serviceData.description,
          features,
          faqs,
          notes,
          images: detailImages,
        },
      });

      return { service, serviceDetail };
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = "1", count = "10", tag } = req.query;

    const pageNum = parseInt(page as string);
    const countNum = parseInt(count as string);
    const skip = (pageNum - 1) * countNum;

    const whereClause = tag ? { tag: tag as string } : {};

    const [services, totalCount] = await Promise.all([
      prisma.service.findMany({
        where: whereClause,
        include: {
          details: true,
        },
        orderBy: {
          title: "asc",
        },
        skip,
        take: countNum,
      }),
      prisma.service.count({ where: whereClause }),
    ]);

    res.status(200).json({
      getAllServices: services,
      totalServices: totalCount,
    });
  } catch (err) {
    next(err);
  }
};

const getServiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        details: true,
      },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json(service);
  } catch (err) {
    next(err);
  }
};

const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const serviceData = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id },
      include: { details: true },
    });

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Upload new thumbnail if provided and delete old one
    let thumbnailUrl = existingService.thumbnail;
    if (files?.thumbnail?.[0]) {
      // Delete old thumbnail from Cloudinary if it exists
      if (existingService.thumbnail) {
        try {
          const oldThumbnailPublicId = extractPublicId(
            existingService.thumbnail
          );
          if (oldThumbnailPublicId) {
            await deleteFromCloudinary(oldThumbnailPublicId);
          }
        } catch (error) {
          console.error("Error deleting old thumbnail:", error);
        }
      }

      const thumbnailResult = (await uploadToCloudinary(
        files.thumbnail[0].buffer,
        "portfolio/services/thumbnails"
      )) as any;
      thumbnailUrl = thumbnailResult.secure_url;
    }

    // Upload new detail images if provided and delete old ones
    let detailImages = (existingService.details?.images as string[]) || [];
    if (files?.images) {
      // Delete old detail images from Cloudinary if they exist
      if (
        existingService.details?.images &&
        Array.isArray(existingService.details.images)
      ) {
        try {
          const deletionPromises = (
            existingService.details.images as string[]
          ).map(async (imageUrl) => {
            const publicId = extractPublicId(imageUrl);
            if (publicId) {
              return deleteFromCloudinary(publicId);
            }
          });
          await Promise.all(deletionPromises);
        } catch (error) {
          console.error("Error deleting old detail images:", error);
        }
      }

      const imageUploadPromises = files.images.map(async (file) => {
        const result = (await uploadToCloudinary(
          file.buffer,
          "portfolio/services/details"
        )) as any;
        return result.secure_url;
      });
      detailImages = await Promise.all(imageUploadPromises);
    }

    // Parse JSON fields if provided
    const stack = serviceData.stack
      ? JSON.parse(serviceData.stack)
      : existingService.stack;
    const features = serviceData.features
      ? JSON.parse(serviceData.features)
      : existingService.details?.features;
    const faqs = serviceData.faqs
      ? JSON.parse(serviceData.faqs)
      : existingService.details?.faqs;
    const notes = serviceData.notes
      ? JSON.parse(serviceData.notes)
      : existingService.details?.notes;

    // Update service with details in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const service = await tx.service.update({
        where: { id },
        data: {
          title: serviceData.title || existingService.title,
          shortDesc: serviceData.shortDesc || existingService.shortDesc,
          tag: serviceData.tag || existingService.tag,
          hasIcon:
            serviceData.hasIcon !== undefined
              ? serviceData.hasIcon === "true"
              : existingService.hasIcon,
          stack,
          thumbnail: thumbnailUrl,
        },
      });

      const serviceDetail = await tx.serviceDetail.update({
        where: { serviceId: id },
        data: {
          title: serviceData.detailTitle || existingService.details!.title,
          description:
            serviceData.description || existingService.details!.description,
          features,
          faqs,
          notes,
          images: detailImages,
        },
      });

      return { service, serviceDetail };
    });

    res.status(200).json({
      success: true,
      message: "Service updated successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const existingService = await prisma.service.findUnique({
      where: { id },
      include: { details: true },
    });

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Delete images from Cloudinary before deleting the service
    const imageDeletionPromises = [];

    // Delete thumbnail
    if (existingService.thumbnail) {
      const thumbnailPublicId = extractPublicId(existingService.thumbnail);
      if (thumbnailPublicId) {
        imageDeletionPromises.push(deleteFromCloudinary(thumbnailPublicId));
      }
    }

    // Delete detail images
    if (
      existingService.details?.images &&
      Array.isArray(existingService.details.images)
    ) {
      (existingService.details.images as string[]).forEach((imageUrl) => {
        const publicId = extractPublicId(imageUrl);
        if (publicId) {
          imageDeletionPromises.push(deleteFromCloudinary(publicId));
        }
      });
    }

    // Delete images from Cloudinary (don't fail the operation if this fails)
    try {
      await Promise.all(imageDeletionPromises);
    } catch (error) {
      console.error("Error deleting images from Cloudinary:", error);
    }

    await prisma.service.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Service deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const ServiceControllers = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
