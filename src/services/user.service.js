
import { email } from "zod";
import User from "../models/User.js";

const updateRole = async (userId, roles) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.roles = roles;

  await user.save();

  return {
    name:user.name,
    email:user.email,
    phone:user.phone,
    address:user.address,
    roles:user.roles
  };
};



const getAllUsers = async () => {
  return await User.find();
};

const deleteUser = async (id) => {

  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(id);

  return;
};

export default {
  getAllUsers,
  updateRole,
  deleteUser,
};
