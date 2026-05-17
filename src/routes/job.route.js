import { Router } from "express";
import jobController from "../controllers/job.controller.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_CLIENT, ROLE_FREELANCER } from "../constants/roles.js";
import validate from "../middlewares/validator.js";
import { createJobSchema } from "../lib/schemas/job.schema.js";

const jobRouter=Router();

jobRouter.post("/",auth,validate(createJobSchema),roleBasedAuth(ROLE_CLIENT),jobController.createJob)
jobRouter.get("/",auth,jobController.getAllJobs)
jobRouter.put("/:id",auth,roleBasedAuth(ROLE_CLIENT),jobController.updateJob)
jobRouter.get("/:id",auth,jobController.getSingleJob)

jobRouter.delete("/:id",jobController.deleteJob)
jobRouter.get(
  "/average-budget",
  jobController.getAverageBudget
);

export default jobRouter;