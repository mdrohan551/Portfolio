import multer from "multer";
import cloudinary from "../config/cloudinary";
import { Request, Response, NextFunction } from "express";

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Cloudinary upload utility
export const uploadToCloudinary = async (buffer: Buffer, folder: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer);
  });
};

// Cloudinary delete utility
export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};

// Extract public ID from Cloudinary URL
export const extractPublicId = (cloudinaryUrl: string): string => {
  if (!cloudinaryUrl) return "";
  
  // Extract public ID from URL like: 
  // https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/filename.jpg
  const parts = cloudinaryUrl.split("/");
  const uploadIndex = parts.findIndex(part => part === "upload");
  
  if (uploadIndex === -1) return "";
  
  // Get everything after version number (v1234567890)
  const pathAfterUpload = parts.slice(uploadIndex + 2).join("/");
  
  // Remove file extension
  return pathAfterUpload.replace(/\.[^/.]+$/, "");
};

// Middleware to handle single file upload
export const uploadSingle = (fieldName: string) => upload.single(fieldName);

// Middleware to handle multiple file uploads
export const uploadMultiple = (fieldName: string, maxCount: number = 10) => 
  upload.array(fieldName, maxCount);

// Middleware to handle multiple fields with files
export const uploadFields = (fields: Array<{ name: string; maxCount?: number }>) =>
  upload.fields(fields);

export default upload;