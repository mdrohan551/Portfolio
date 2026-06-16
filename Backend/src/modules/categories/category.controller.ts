import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";
import { get } from "node:http";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, slug } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
        slug,
      },
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully!",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = "1", count = "10" } = req.query;

    const pageNum = parseInt(page as string);
    const countNum = parseInt(count as string);
    const skip = (pageNum - 1) * countNum;

    const [categories, totalCount] = await Promise.all([
      prisma.category.findMany({
        include: {
          projects: true,
          skills: true,
        },
        orderBy: {
          name: "asc",
        },
        skip,
        take: countNum,
      }),
      prisma.category.count(),
    ]);

    res.status(200).json({
      getAllCategories: categories,
      totalCategories: totalCount,
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        projects: true,
        skills: true,
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: name || existingCategory.name,
        slug: slug || existingCategory.slug,
      },
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully!",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        projects: true,
      },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (existingCategory.projects.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category with associated projects",
      });
    }

    await prisma.category.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Category deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
