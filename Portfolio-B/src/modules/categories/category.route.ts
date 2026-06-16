import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryControllers } from "./category.controller";
import { CategoryValidation } from "./category.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryControllers.createCategory
);

router.get("/", CategoryControllers.getAllCategories);

router.get("/:id", CategoryControllers.getCategoryById);

router.put(
  "/:id",
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryControllers.updateCategory
);

router.delete("/:id", CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
