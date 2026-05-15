import authController from "../controllers/auth.controller.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validator.js";
import { loginSchema, registerSchema } from "../lib/schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/register",validate(registerSchema), authController.Register)
authRouter.post("/login",validate(loginSchema), authController.Login);

export default authRouter;