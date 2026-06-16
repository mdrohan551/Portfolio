import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  extractPublicId,
} from "../../middlewares/uploadMiddleware";

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogData = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // 1. Upload Images
    let imgUrl = "";
    if (files?.img?.[0]) {
      const imgResult = (await uploadToCloudinary(
        files.img[0].buffer,
        "portfolio/blogs"
      )) as any;
      imgUrl = imgResult.secure_url;
    }

    let detailImages: string[] = [];
    if (files?.images) {
      const imageUploadPromises = files.images.map(async (file) => {
        const result = (await uploadToCloudinary(
          file.buffer,
          "portfolio/blogs/details"
        )) as any;
        return result.secure_url;
      });
      detailImages = await Promise.all(imageUploadPromises);
    }

    // 2. Parse JSON fields (Just like Project's keyFeatures)
    const tag = JSON.parse(blogData.tag || "[]");
    const detailTags = JSON.parse(blogData.detailTags || "[]");
    const contentSections = JSON.parse(blogData.contentSections || "[]");

    // 3. Database Transaction
    const result = await prisma.$transaction(async (tx) => {
      const blog = await tx.blog.create({
        data: {
          img: imgUrl,
          title: blogData.title,
          shortDes: blogData.shortDes,
          tag,
        },
      });

      const blogDetail = await tx.blogDetail.create({
        data: {
          blogId: blog.id,
          title: blogData.detailTitle,
          description: blogData.description,
          images: detailImages,
          tags: detailTags,
          contentSections,
          author: blogData.author,
        },
      });

      return { blog, blogDetail };
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = "1", count = "10" } = req.query;

    const pageNum = parseInt(page as string);
    const countNum = parseInt(count as string);
    const skip = (pageNum - 1) * countNum;

    const [blogs, totalCount] = await Promise.all([
      prisma.blog.findMany({
        include: {
          details: true,
        },
        orderBy: {
          date: "desc",
        },
        skip,
        take: countNum,
      }),
      prisma.blog.count(),
    ]);

    res.status(200).json({
      getAllBlogs: blogs,
      totalBlogs: totalCount,
    });
  } catch (err) {
    next(err);
  }
};

const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        details: true,
      },
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const blogData = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
      include: { details: true },
    });

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // --- Image Logic (Same as Project) ---

    // 1. Main Image
    let imgUrl = existingBlog.img;
    if (files?.img?.[0]) {
      // Delete old
      if (existingBlog.img) {
        try {
          const oldImgPublicId = extractPublicId(existingBlog.img);
          if (oldImgPublicId) {
            await deleteFromCloudinary(oldImgPublicId);
          }
        } catch (error) {
          console.error("Error deleting old blog image:", error);
        }
      }
      // Upload new
      const imgResult = (await uploadToCloudinary(
        files.img[0].buffer,
        "portfolio/blogs"
      )) as any;
      imgUrl = imgResult.secure_url;
    }

    let detailImages = (existingBlog.details?.images as string[]) || [];

    if (files?.images && files.images.length > 0) {
      // Delete old detail images
      if (
        existingBlog.details?.images &&
        Array.isArray(existingBlog.details.images)
      ) {
        try {
          const deletionPromises = (
            existingBlog.details.images as string[]
          ).map(async (imageUrl) => {
            const publicId = extractPublicId(imageUrl);
            if (publicId) return deleteFromCloudinary(publicId);
          });
          await Promise.all(deletionPromises);
        } catch (error) {
          console.error("Error deleting old detail images:", error);
        }
      }

      // Upload new detail images
      const imageUploadPromises = files.images.map(async (file) => {
        const result = (await uploadToCloudinary(
          file.buffer,
          "portfolio/blogs/details"
        )) as any;
        return result.secure_url;
      });
      detailImages = await Promise.all(imageUploadPromises);
    }

    // --- Data Parsing (Same as Project) ---
    const tag = blogData.tag ? JSON.parse(blogData.tag) : existingBlog.tag;
    const detailTags = blogData.detailTags
      ? JSON.parse(blogData.detailTags)
      : existingBlog.details?.tags;
    const contentSections = blogData.contentSections
      ? JSON.parse(blogData.contentSections)
      : existingBlog.details?.contentSections;

    // --- Transaction ---
    const result = await prisma.$transaction(async (tx) => {
      const blog = await tx.blog.update({
        where: { id },
        data: {
          img: imgUrl,
          title: blogData.title || existingBlog.title,
          shortDes: blogData.shortDes || existingBlog.shortDes,
          tag,
        },
      });

      const blogDetail = await tx.blogDetail.update({
        where: { blogId: id },
        data: {
          title: blogData.detailTitle || existingBlog.details!.title,
          description:
            blogData.description || existingBlog.details!.description,
          images: detailImages,
          tags: detailTags,
          contentSections,
          author: blogData.author || existingBlog.details!.author,
        },
      });

      return { blog, blogDetail };
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
      include: { details: true },
    });

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Delete images
    const imageDeletionPromises = [];

    // Main image
    if (existingBlog.img) {
      const imgPublicId = extractPublicId(existingBlog.img);
      if (imgPublicId) {
        imageDeletionPromises.push(deleteFromCloudinary(imgPublicId));
      }
    }

    // Detail images
    if (
      existingBlog.details?.images &&
      Array.isArray(existingBlog.details.images)
    ) {
      (existingBlog.details.images as string[]).forEach((imageUrl) => {
        const publicId = extractPublicId(imageUrl);
        if (publicId) {
          imageDeletionPromises.push(deleteFromCloudinary(publicId));
        }
      });
    }

    try {
      await Promise.all(imageDeletionPromises);
    } catch (error) {
      console.error("Error deleting images from Cloudinary:", error);
    }

    await prisma.blog.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
