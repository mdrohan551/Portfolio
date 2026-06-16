import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceControllers } from "./service.controller";
import { ServiceValidation } from "./service.validation";
import { uploadFields } from "../../middlewares/uploadMiddleware";

const router = express.Router();

router.post(
  "/",
  uploadFields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  validateRequest(ServiceValidation.createServiceZodSchema),
  ServiceControllers.createService
);

router.get("/", ServiceControllers.getAllServices);

router.get("/:id", ServiceControllers.getServiceById);

router.put(
  "/:id",
  uploadFields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  validateRequest(ServiceValidation.updateServiceZodSchema),
  ServiceControllers.updateService
);

router.delete("/:id", ServiceControllers.deleteService);

export const ServiceRoutes = router;