import { Router }from "express";

import adminController from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.get(
  "/dashboard-summary",
  adminController.getDashboardSummary
);

export default adminRouter;