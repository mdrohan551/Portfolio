import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SkillControllers } from "./skill.controller";
import { SkillValidation } from "./skill.validation";
import { uploadSingle } from "../../middlewares/uploadMiddleware";

const router = express.Router();

router.post(
  "/",
  uploadSingle("icon"),
  validateRequest(SkillValidation.createSkillZodSchema),
  SkillControllers.createSkill
);

router.get("/", SkillControllers.getAllSkills);

router.get("/:id", SkillControllers.getSkillById);

router.put(
  "/:id",
  uploadSingle("icon"),
  validateRequest(SkillValidation.updateSkillZodSchema),
  SkillControllers.updateSkill
);

router.delete("/:id", SkillControllers.deleteSkill);

export const SkillRoutes = router;
