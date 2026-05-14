import applicationController from "../controllers/application.controller.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_FREELANCER } from "../constants/roles.js";
const applicationRouter=Router()

applicationRouter.post(
  "/",
  auth,
  roleBasedAuth(ROLE_FREELANCER),
 applicationController.applyJob
);

applicationRouter.get(
  "/:jobId",
  auth,
  roleBasedAuth(ROLE_FREELANCER),
 applicationController.getApplications
);
export default applicationRouter