
import { Router } from "express";
import userController, { deleteProfile, getProfile, updateProfile } from "../controllers/user.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import auth from "../middlewares/auth.js";

const userRouter = Router();
userRouter.get(
  "/",
  auth,
  roleBasedAuth("ADMIN"),
  userController.getAllUsers
);

userRouter.delete(
  "/:id",
  auth,
  roleBasedAuth("ADMIN"),
  userController.deleteUser
);

userRouter.patch("/:id/role",auth, roleBasedAuth('ADMIN'), userController.updateRole);

userRouter.get("/profile", auth, getProfile);
userRouter.patch("/profile", auth, updateProfile);
userRouter.delete("/profile", auth, deleteProfile);

export default userRouter;