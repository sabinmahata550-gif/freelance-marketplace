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

const getAllUsers = async (query) => {

  const limit = query.limit ?? 10;

  const offset = query.offset ?? 0;

  const filters = {};

  let sort = {};

  const { name, role } = query;

  // SEARCH BY NAME
  if (name) {

    filters.name = {
      $regex: name,
      $options: "i",
    };
  }

  // FILTER BY ROLE
  if (role) {

    filters.roles = role;
  }

  // SORT
  if (query.sort === "latest") {
    sort = { createdAt: -1 };
  }

  if (query.sort === "oldest") {
    sort = { createdAt: 1 };
  }

  return await User.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset)
    .select("-password");
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

const getTotalUsers = async () => {

  const totalUsers =await User.aggregate([

      {
        $count: "totalUsers"
      }

    ]);

  return totalUsers;
};

export default {
  getTotalUsers,
  getAllUsers,
  updateRole,
  getAllUsers,
  deleteUser,
  getProfile,
  updateProfile,
  deleteProfile
};