import { Router } from "express";
import resetPasswordController from "../controllers/resetPassword.controller.js";
const resetPasswordRouter = Router();


// FORGOT PASSWORD
resetPasswordRouter.post(
  "/forgot-password",
  resetPasswordController.forgotPassword
);


// // RESET PASSWORD
resetPasswordRouter.post(
  "/reset-password",
  resetPasswordController.resetPassword
);

export default resetPasswordRouter;