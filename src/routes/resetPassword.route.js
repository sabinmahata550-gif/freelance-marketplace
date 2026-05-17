import { Router } from "express";
import resetPasswordController from "../controllers/resetPassword.controller.js";
import validate from "../middlewares/validator.js";
import { forgotPasswordSchema, resetPasswordSchema } from "../lib/schemas/resetPassword.schema.js";
const resetPasswordRouter = Router();


// FORGOT PASSWORD
resetPasswordRouter.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  resetPasswordController.forgotPassword
);


// // RESET PASSWORD
resetPasswordRouter.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPasswordController.resetPassword
);

export default resetPasswordRouter;