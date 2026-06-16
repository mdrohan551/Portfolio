import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ExperienceControllers } from "./experience.controller";
import { ExperienceValidation } from "./experience.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(ExperienceValidation.createExperienceZodSchema),
  ExperienceControllers.createExperience
);

router.get("/", ExperienceControllers.getAllExperiences);

router.get("/:id", ExperienceControllers.getExperienceById);

router.put(
  "/:id",
  validateRequest(ExperienceValidation.updateExperienceZodSchema),
  ExperienceControllers.updateExperience
);

router.delete("/:id", ExperienceControllers.deleteExperience);

export const ExperienceRoutes = router;
