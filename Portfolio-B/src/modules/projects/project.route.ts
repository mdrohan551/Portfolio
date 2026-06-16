import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProjectControllers } from "./project.controller";
import { ProjectValidation } from "./project.validation";
import { uploadFields } from "../../middlewares/uploadMiddleware";

const router = express.Router();

router.post(
  "/",
  uploadFields([
    { name: "image", maxCount: 1 },
    { name: "bannerImg", maxCount: 1 },
  ]),
  validateRequest(ProjectValidation.createProjectZodSchema),
  ProjectControllers.createProject
);

router.get("/", ProjectControllers.getAllProjects);

router.get("/:id", ProjectControllers.getProjectById);

router.put(
  "/:id",
  uploadFields([
    { name: "image", maxCount: 1 },
    { name: "bannerImg", maxCount: 1 },
  ]),
  validateRequest(ProjectValidation.updateProjectZodSchema),
  ProjectControllers.updateProject
);

router.delete("/:id", ProjectControllers.deleteProject);

export const ProjectRoutes = router;