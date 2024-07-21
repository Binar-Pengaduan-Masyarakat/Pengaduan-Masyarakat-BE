const userService = require("../services/user.services");
const fs = require("fs");
const path = require("path");

const getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please check the user ID and try again.",
      });
    }
    const { password, verificationToken, ...userWithoutPassword } = user;
    res.json({
      message: "User profile retrieved successfully.",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Failed to retrieve user profile:", error);
    res.status(500).json({
      message: "Internal server error while retrieving user profile.",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = { ...req.body };
    console.log(req.body);

    if (req.file) {
      const newImagePath = req.file.filename;

      const currentUser = await userService.getUserById(userId);
      if (!currentUser) {
        return res.status(404).json({
          message: "User not found. Please check the user ID and try again.",
        });
      }

      if (currentUser.userImage) {
        const oldImagePath = path.join(
          __dirname,
          "../public/profiles",
          currentUser.userImage
        );
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Failed to delete old profile image:", err);
        });
      }

      updatedData.userImage = newImagePath;
    }

    const updatedUser = await userService.updateUser(userId, updatedData);
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found. Please check the user ID and try again.",
      });
    }
    const { password, verificationToken, ...userWithoutPassword } = updatedUser;
    res.json({
      message: "User profile updated successfully.",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Failed to update user profile:", error);
    res
      .status(500)
      .json({ message: "Internal server error while updating user profile." });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    await userService.deleteUser(req.params.userId);
    res.status(200).json({ message: "User profile deleted successfully." });
  } catch (error) {
    console.error("Failed to delete user profile:", error);
    res
      .status(500)
      .json({ message: "Internal server error while deleting user profile." });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
