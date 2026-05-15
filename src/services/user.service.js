import User from "../models/User.js";
import uplodFile from "../util/fileuploader.js";

const updateRole = async (userId, roles) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.roles = roles;

  await user.save();

  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    roles: user.roles
  };
};

const getAllUsers = async () => {
  return await User.find().select("-password");
};

const deleteUser = async (id) => {

  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(id);
};

const getProfile = async (id) => {

  return await User.findById(id)
    .select("-password");

};

const updateProfile = async (userId, file) => {
  const uploadedFiles = await uplodFile([file])
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      profileImageUrl: uploadedFiles[0].url
    },
    {
      returnDocument: "after"
    }
  ).select("-password");

  return updatedUser;

};

const deleteProfile = async (id) => {

  await User.findByIdAndDelete(id);

};

export default {
  updateRole,
  getAllUsers,
  deleteUser,
  getProfile,
  updateProfile,
  deleteProfile
};