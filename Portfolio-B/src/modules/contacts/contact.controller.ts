import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";

// Create contact (public - for contact form submissions)
const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contactData = req.body;

    const contact = await prisma.contact.create({
      data: contactData,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

// Get all contacts with filters (admin)
const getAllContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = "1",
      count = "20",
      status,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const pageNum = parseInt(page as string);
    const countNum = parseInt(count as string);
    const skip = (pageNum - 1) * countNum;

    // Build where clause
    const whereClause: any = {};

    if (status !== undefined) {
      whereClause.status =
        status === "true" ? true : status === "false" ? false : undefined;
    }

    const [contacts, totalCount] = await Promise.all([
      prisma.contact.findMany({
        where: whereClause,
        orderBy: {
          [sortBy as string]: sortOrder as string,
        },
        skip,
        take: countNum,
      }),
      prisma.contact.count({ where: whereClause }),
    ]);

    // Get counts by status
    const statusCounts = await prisma.contact.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    const statusSummary = {
      unread: 0,
      read: 0,
    };

    statusCounts.forEach((item) => {
      if (item.status) {
        statusSummary.read = item._count.status;
      } else {
        statusSummary.unread = item._count.status;
      }
    });

    res.status(200).json({
      getAllContacts: contacts,
      totalContacts: totalCount,
    });
  } catch (err) {
    next(err);
  }
};

// Get contact by ID
const getContactById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    // // Auto-mark as READ if it was unread
    // if (!contact.status) {
    //   await prisma.contact.update({
    //     where: { id },
    //     data: { status: false },
    //   });
    // }

    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

// Update contact status
const updateContactStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!existingContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({
      success: true,
      message: `Contact marked as ${status ? "read" : "unread"}`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

// Delete contact
const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!existingContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await prisma.contact.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const ContactController = {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
