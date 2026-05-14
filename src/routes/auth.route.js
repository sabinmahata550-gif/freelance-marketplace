import authController from "../controllers/auth.controller.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";
const authRouter=Router();

authRouter.post("/register",authController.Register)
authRouter.post("/login",auth,authController.Login);

export default authRouter;