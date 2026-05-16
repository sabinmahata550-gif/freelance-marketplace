import applicationController from "../controllers/application.controller.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_CLIENT, ROLE_FREELANCER } from "../constants/roles.js";
import validate from "../middlewares/validator.js";
import { applyJobSchema } from "../lib/schemas/application.schema.js";
const applicationRouter=Router()

applicationRouter.post(
  "/apply",
  auth,
  validate(applyJobSchema),
  roleBasedAuth(ROLE_FREELANCER),
 applicationController.applyJob
);

applicationRouter.get(
  "/",
  auth,
  roleBasedAuth(ROLE_FREELANCER),
  applicationController.getApplications
);

applicationRouter.patch(
  "/:id/status",
  auth,
  roleBasedAuth(ROLE_CLIENT),
  applicationController.updateApplicationStatus
);

export default applicationRouter