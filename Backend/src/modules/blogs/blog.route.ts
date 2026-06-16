import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogControllers } from "./blog.controller";
import { BlogValidation } from "./blog.validation";
import { uploadFields } from "../../middlewares/uploadMiddleware";

const router = express.Router();

router.post(
  "/",
  uploadFields([
    { name: "img", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  validateRequest(BlogValidation.createBlogZodSchema),
  BlogControllers.createBlog
);

router.get("/", BlogControllers.getAllBlogs);

router.get("/:id", BlogControllers.getBlogById);

router.put(
  "/:id",
  uploadFields([
    { name: "img", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  validateRequest(BlogValidation.updateBlogZodSchema),
  BlogControllers.updateBlog
);

router.delete("/:id", BlogControllers.deleteBlog);

export const BlogRoutes = router;
