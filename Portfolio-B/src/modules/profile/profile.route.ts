import express from "express";
import { ProfileController } from "./profile.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createProfileSchema,
  updateProfileSchema,
  createSocialLinkSchema,
  updateSocialLinkSchema,
} from "./profile.validation";
import upload from "../../middlewares/uploadMiddleware";

const router = express.Router();

// Public route - Get active profile
router.get("/active", ProfileController.getActiveProfile);

// Admin routes - Profile CRUD
router.get("/", ProfileController.getAllProfiles);
router.get("/:id", ProfileController.getProfileById);
router.post(
  "/",
  upload.single("image"),
  validateRequest(createProfileSchema),
  ProfileController.createProfile
);
router.patch(
  "/:id",
  upload.single("image"),
  validateRequest(updateProfileSchema),
  ProfileController.updateProfile
);
router.delete("/:id", ProfileController.deleteProfile);
router.patch("/:id/activate", ProfileController.setActiveProfile);

// Social Links routes
router.post(
  "/:profileId/social-links",
  validateRequest(createSocialLinkSchema),
  ProfileController.addSocialLink
);
router.patch(
  "/social-links/:linkId",
  validateRequest(updateSocialLinkSchema),
  ProfileController.updateSocialLink
);
router.delete("/social-links/:linkId", ProfileController.deleteSocialLink);

export const ProfileRoutes = router;
