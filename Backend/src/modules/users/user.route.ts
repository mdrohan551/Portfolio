import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";
import authMiddleware from "../../middlewares/authMiddleware";

const router = express.Router();

// Public routes
router.post(
  "/register",
  validateRequest(UserValidation.registerUserZodSchema),
  UserControllers.registerUser
);

router.post(
  "/login",
  validateRequest(UserValidation.loginUserZodSchema),
  UserControllers.loginUser
);

// Protected routes
router.get("/profile", authMiddleware, UserControllers.getProfile);

export const UserRoutes = router;
