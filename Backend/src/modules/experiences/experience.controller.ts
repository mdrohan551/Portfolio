import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";

const createExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const experienceData = req.body;

    const result = await prisma.experience.create({
      data: experienceData,
    });

    res.status(201).json({
      success: true,
      message: "Experience created successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllExperiences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = "1", count = "10" } = req.query;

    const pageNum = parseInt(page as string);
    const countNum = parseInt(count as string);
    const skip = (pageNum - 1) * countNum;

    const [experiences, totalCount] = await Promise.all([
      prisma.experience.findMany({
        orderBy: {
          percentage: "desc",
        },
        skip,
        take: countNum,
      }),
      prisma.experience.count(),
    ]);

    res.status(200).json({
      getAllExperiences: experiences,
      totalExperiences: totalCount,
    });
  } catch (err) {
    next(err);
  }
};

const getExperienceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json(experience);
  } catch (err) {
    next(err);
  }
};

const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const experienceData = req.body;

    const existingExperience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!existingExperience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    const result = await prisma.experience.update({
      where: { id },
      data: experienceData,
    });

    res.status(200).json({
      success: true,
      message: "Experience updated successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const existingExperience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!existingExperience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    await prisma.experience.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const ExperienceControllers = {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
