import { Router } from "express";
import jobController from "../controllers/job.controller.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_CLIENT, ROLE_FREELANCER } from "../constants/roles.js";

const jobRouter=Router();

jobRouter.post("/",auth,roleBasedAuth(ROLE_FREELANCER),jobController.createJob)
jobRouter.get("/",auth,jobController.getAllJobs)
jobRouter.put("/:id",auth,roleBasedAuth(ROLE_FREELANCER),jobController.updateJob)
jobRouter.get("/:id",auth,jobController.getSingleJob)

jobRouter.delete("/:id",jobController.deleteJob)

export default jobRouter;