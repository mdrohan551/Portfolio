import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { ProjectRoutes } from "../modules/projects/project.route";
import { CategoryRoutes } from "../modules/categories/category.route";
import { ServiceRoutes } from "../modules/services/service.route";
import { BlogRoutes } from "../modules/blogs/blog.route";
import { SkillRoutes } from "../modules/skills/skill.route";
import { ExperienceRoutes } from "../modules/experiences/experience.route";
import { TestimonialRoutes } from "../modules/testimonials/testimonial.route";
import { FAQRoutes } from "../modules/faqs/faq.route";
import { ProfileRoutes } from "../modules/profile/profile.route";
import { ContactRoutes } from "../modules/contacts/contact.route";
import authMiddleware from "../middlewares/authMiddleware";

// Middleware to apply auth only to non-GET requests
const conditionalAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.method === "GET") {
    // Skip authentication for GET requests
    return next();
  }
  // Apply authentication for POST, PUT, DELETE, etc.
  return authMiddleware(req, res, next);
};

const router = express.Router();

// Public routes (no authentication required)
router.use("/users", UserRoutes);

// Protected routes (authentication required for non-GET requests)
const protectedRoutes = [
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/skills",
    route: SkillRoutes,
  },
  {
    path: "/experiences",
    route: ExperienceRoutes,
  },
  {
    path: "/testimonials",
    route: TestimonialRoutes,
  },
  {
    path: "/faqs",
    route: FAQRoutes,
  },
  {
    path: "/profile",
    route: ProfileRoutes,
  },
  {
    path: "/contacts",
    route: ContactRoutes,
  },
];

// Apply conditional authentication to all protected routes
protectedRoutes.forEach((route) => {
  router.use(route.path, conditionalAuth, route.route);
});

export default router;
