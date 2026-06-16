import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";

const createFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const faqData = req.body;

    const result = await prisma.fAQ.create({
      data: faqData,
    });

    res.status(201).json({
      success: true,
      message: "FAQ created successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllFAQs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = "1", count = "20", category } = req.query;

    const pageNum = parseInt(page as string);
    const countNum = parseInt(count as string);
    const skip = (pageNum - 1) * countNum;

    const whereClause = category ? { category: category as string } : {};

    const [faqs, totalCount] = await Promise.all([
      prisma.fAQ.findMany({
        where: whereClause,
        orderBy: {
          category: "asc",
        },
        skip,
        take: countNum,
      }),
      prisma.fAQ.count({ where: whereClause }),
    ]);

    res.status(200).json({
      getAllFAQs: faqs,
      totalFAQs: totalCount,
    });
  } catch (err) {
    next(err);
  }
};

const getFAQsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: [{ category: "asc" }, { question: "asc" }],
    });

    // Group FAQs by category
    const groupedFAQs = faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {} as Record<string, typeof faqs>);

    res.status(200).json(groupedFAQs);
  } catch (err) {
    next(err);
  }
};

const getFAQById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const faq = await prisma.fAQ.findUnique({
      where: { id },
    });

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json(faq);
  } catch (err) {
    next(err);
  }
};

const updateFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const faqData = req.body;

    const existingFAQ = await prisma.fAQ.findUnique({
      where: { id },
    });

    if (!existingFAQ) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    const result = await prisma.fAQ.update({
      where: { id },
      data: faqData,
    });

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const existingFAQ = await prisma.fAQ.findUnique({
      where: { id },
    });

    if (!existingFAQ) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    await prisma.fAQ.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const FAQControllers = {
  createFAQ,
  getAllFAQs,
  getFAQsByCategory,
  getFAQById,
  updateFAQ,
  deleteFAQ,
};
