import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  extractPublicId,
} from "../../middlewares/uploadMiddleware";

const createSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skillData = req.body;
    const file = req.file;

    // Upload icon if provided
    let iconPath = "";
    if (file) {
      const iconResult = (await uploadToCloudinary(
        file.buffer,
        "portfolio/skills"
      )) as any;
      iconPath = iconResult.secure_url;
    }

    const result = await prisma.skill.create({
      data: {
        ...skillData,
        iconPath,
      },
    });

    res.status(201).json({
      success: true,
      message: "Skill created successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = "1", count = "20", categoryId } = req.query;

    const pageNum = parseInt(page as string);
    const countNum = parseInt(count as string);
    const skip = (pageNum - 1) * countNum;

    const whereClause = categoryId ? { categoryId: categoryId as string } : {};

    const [skills, totalCount] = await Promise.all([
      prisma.skill.findMany({
        where: whereClause,
        include: {
          category: true,
        },
        orderBy: {
          category: {
            name: "asc",
          },
        },
        skip,
        take: countNum,
      }),
      prisma.skill.count({ where: whereClause }),
    ]);

    res.status(200).json({
      getAllSkills: skills,
      totalSkills: totalCount,
    });
  } catch (err) {
    next(err);
  }
};

const getSkillById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const skill = await prisma.skill.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json(skill);
  } catch (err) {
    next(err);
  }
};

const updateSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const skillData = req.body;
    const file = req.file;

    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    let iconPath = existingSkill.iconPath;

    // Upload new icon if provided
    if (file) {
      // Delete old icon from Cloudinary if exists
      if (existingSkill.iconPath) {
        const publicId = extractPublicId(existingSkill.iconPath);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }

      const iconResult = (await uploadToCloudinary(
        file.buffer,
        "portfolio/skills"
      )) as any;
      iconPath = iconResult.secure_url;
    }

    const result = await prisma.skill.update({
      where: { id },
      data: {
        ...skillData,
        iconPath,
      },
    });

    res.status(200).json({
      success: true,
      message: "Skill updated successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // Delete icon from Cloudinary if exists
    if (existingSkill.iconPath) {
      const publicId = extractPublicId(existingSkill.iconPath);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    await prisma.skill.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const SkillControllers = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
