import userController from "../controllers/user.controller.js"
import { Router } from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import multer from 'multer'
const upload = multer({ storage: multer.memoryStorage() })
const userRouter = Router();


// SELF PROFILE ROUTES
userRouter.get("/profile", auth, userController.getProfile);

userRouter.patch("/profile", auth,upload.single("profile"),
userController.updateProfile);

userRouter.delete("/profile", auth, userController.deleteProfile);


// ADMIN ROUTES
userRouter.get(
  "/",
  auth,
  roleBasedAuth("ADMIN"),
  userController.getAllUsers
);

userRouter.get(
  "/total-users",
  userController.getTotalUsers
);
userRouter.patch(
  "/:id/role",
  auth,
  roleBasedAuth("ADMIN"),
  userController.updateRole
);

userRouter.delete(
  "/:id",
  auth,
  roleBasedAuth("ADMIN"),
  userController.deleteUser
);

export default userRouter;