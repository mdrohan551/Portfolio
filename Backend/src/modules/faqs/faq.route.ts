import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FAQControllers } from "./faq.controller";
import { FAQValidation } from "./faq.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(FAQValidation.createFAQZodSchema),
  FAQControllers.createFAQ
);

router.get("/", FAQControllers.getAllFAQs);

router.get("/categories", FAQControllers.getFAQsByCategory);

router.get("/:id", FAQControllers.getFAQById);

router.put(
  "/:id",
  validateRequest(FAQValidation.updateFAQZodSchema),
  FAQControllers.updateFAQ
);

router.delete("/:id", FAQControllers.deleteFAQ);

export const FAQRoutes = router;
