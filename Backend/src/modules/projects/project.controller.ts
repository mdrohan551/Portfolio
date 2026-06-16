import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  extractPublicId,
} from "../../middlewares/uploadMiddleware";

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectData = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Upload images to Cloudinary
    let imageUrl = "";
    let bannerImgUrl = "";

    if (files?.image?.[0]) {
      const imageResult = (await uploadToCloudinary(
        files.image[0].buffer,
        "portfolio/projects"
      )) as any;
      imageUrl = imageResult.secure_url;
    }

    if (files?.bannerImg?.[0]) {
      const bannerResult = (await uploadToCloudinary(
        files.bannerImg[0].buffer,
        "portfolio/projects/banners"
      )) as any;
      bannerImgUrl = bannerResult.secure_url;
    }

    // Parse JSON fields
    const keyFeatures = JSON.parse(projectData.keyFeatures || "[]");
    const technologies = JSON.parse(projectData.technologies || "[]");

    // Create project with details in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          title: projectData.title,
          slug: projectData.slug,
          image: imageUrl,
          categoryId: projectData.categoryId,
        },
      });

      const projectDetail = await tx.projectDetail.create({
        data: {
          projectId: project.id,
          date: new Date(projectData.date),
          bannerImg: bannerImgUrl,
          overview: projectData.overview,
          keyFeatures,
          technologies,
          liveLink: projectData.liveLink || null,
        },
      });

      return { project, projectDetail };
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// Updated getAllProjects in project.controller.ts
const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = "1", count = "10", categoryId } = req.query;

    const pageNum = parseInt(page as string);
    const countNum = parseInt(count as string);
    const skip = (pageNum - 1) * countNum;

    const whereClause = categoryId ? { categoryId: categoryId as string } : {};

    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where: whereClause,
        include: {
          details: true,
          category: true,
        },
        orderBy: {
          details: {
            date: "desc",
          },
        },
        skip,
        take: countNum,
      }),
      prisma.project.count({ where: whereClause }),
    ]);

    res.status(200).json({
      getAllProjects: projects,
      totalProjects: totalCount,
    });
  } catch (err) {
    next(err);
  }
};
const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        details: true,
        category: true,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const projectData = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
      include: { details: true },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Upload new images if provided and delete old ones
    let imageUrl = existingProject.image;
    let bannerImgUrl = existingProject.details?.bannerImg || "";

    if (files?.image?.[0]) {
      // Delete old image from Cloudinary if it exists
      if (existingProject.image) {
        try {
          const oldImagePublicId = extractPublicId(existingProject.image);
          if (oldImagePublicId) {
            await deleteFromCloudinary(oldImagePublicId);
          }
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }

      const imageResult = (await uploadToCloudinary(
        files.image[0].buffer,
        "portfolio/projects"
      )) as any;
      imageUrl = imageResult.secure_url;
    }

    if (files?.bannerImg?.[0]) {
      // Delete old banner image from Cloudinary if it exists
      if (existingProject.details?.bannerImg) {
        try {
          const oldBannerPublicId = extractPublicId(
            existingProject.details.bannerImg
          );
          if (oldBannerPublicId) {
            await deleteFromCloudinary(oldBannerPublicId);
          }
        } catch (error) {
          console.error("Error deleting old banner image:", error);
        }
      }
      const bannerResult = (await uploadToCloudinary(
        files.bannerImg[0].buffer,
        "portfolio/projects/banners"
      )) as any;
      bannerImgUrl = bannerResult.secure_url;
    }

    // Parse JSON fields if provided
    const keyFeatures = projectData.keyFeatures
      ? JSON.parse(projectData.keyFeatures)
      : existingProject.details?.keyFeatures;
    const technologies = projectData.technologies
      ? JSON.parse(projectData.technologies)
      : existingProject.details?.technologies;

    // Update project with details in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const project = await tx.project.update({
        where: { id },
        data: {
          title: projectData.title || existingProject.title,
          slug: projectData.slug || existingProject.slug,
          image: imageUrl,
          categoryId: projectData.categoryId || existingProject.categoryId,
        },
      });

      const projectDetail = await tx.projectDetail.update({
        where: { projectId: id },
        data: {
          date: projectData.date
            ? new Date(projectData.date)
            : existingProject.details!.date,
          bannerImg: bannerImgUrl,
          overview: projectData.overview || existingProject.details!.overview,
          keyFeatures,
          technologies,
          liveLink:
            projectData.liveLink !== undefined
              ? projectData.liveLink || null
              : existingProject.details!.liveLink,
        },
      });

      return { project, projectDetail };
    });

    res.status(200).json({
      success: true,
      message: "Project updated successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const existingProject = await prisma.project.findUnique({
      where: { id },
      include: { details: true },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete images from Cloudinary before deleting the project
    const imageDeletionPromises = [];

    if (existingProject.image) {
      const imagePublicId = extractPublicId(existingProject.image);
      if (imagePublicId) {
        imageDeletionPromises.push(deleteFromCloudinary(imagePublicId));
      }
    }

    if (existingProject.details?.bannerImg) {
      const bannerPublicId = extractPublicId(existingProject.details.bannerImg);
      if (bannerPublicId) {
        imageDeletionPromises.push(deleteFromCloudinary(bannerPublicId));
      }
    }

    // Delete images from Cloudinary (don't fail the operation if this fails)
    try {
      await Promise.all(imageDeletionPromises);
    } catch (error) {
      console.error("Error deleting images from Cloudinary:", error);
    }

    await prisma.project.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Project deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
