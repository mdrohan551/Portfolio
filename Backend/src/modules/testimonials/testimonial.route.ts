import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TestimonialControllers } from "./testimonial.controller";
import { TestimonialValidation } from "./testimonial.validation";
import { uploadFields } from "../../middlewares/uploadMiddleware";

const router = express.Router();

router.post(
  "/",
  uploadFields([{ name: "avatar", maxCount: 1 }]),
  validateRequest(TestimonialValidation.createTestimonialZodSchema),
  TestimonialControllers.createTestimonial
);

router.get("/", TestimonialControllers.getAllTestimonials);

router.get("/:id", TestimonialControllers.getTestimonialById);

router.put(
  "/:id",
  uploadFields([{ name: "avatar", maxCount: 1 }]),
  validateRequest(TestimonialValidation.updateTestimonialZodSchema),
  TestimonialControllers.updateTestimonial
);

router.delete("/:id", TestimonialControllers.deleteTestimonial);

export const TestimonialRoutes = router;
