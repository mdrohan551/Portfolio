import express from "express";
import { ContactController } from "./contact.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createContactSchema,
  updateContactStatusSchema,
} from "./contact.validation";

const router = express.Router();

// Public route - Submit contact form
router.post(
  "/",
  validateRequest(createContactSchema),
  ContactController.createContact
);

// Admin routes
router.get("/", ContactController.getAllContacts);
router.get("/:id", ContactController.getContactById);
router.patch(
  "/:id/status",
  validateRequest(updateContactStatusSchema),
  ContactController.updateContactStatus
);
router.delete("/:id", ContactController.deleteContact);

export const ContactRoutes = router;
