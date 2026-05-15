
import userService from "../services/user.service.js";

const updateRole = async (req, res) => {
  try {

    const user = await userService.updateRole(
      req.params.id,
      req.body.roles
    );

    res.status(200).json({
      message: "Role updated successfully",
      user,
    });

  } catch (error) {

    res.status(400).json({
      error: error.message,
    });
  }
};


const getAllUsers = async (req, res) => {
  try {


    const users = await userService.getAllUsers();
    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });

  } catch (error) {

    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {

    await userService.deleteUser(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {

    res.status(400).json({
      error: error.message,
    });
  }
};



const getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    console.log(user)
    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateProfile(
      req.user.id,
      req.file,
    )

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    await userService.deleteProfile(req.user.id);

    res.status(200).json({
      message: "Profile deleted successfully",
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export default {
  getAllUsers,
  deleteUser,
  updateRole,
  getProfile,
  updateProfile,
  deleteProfile,
};

