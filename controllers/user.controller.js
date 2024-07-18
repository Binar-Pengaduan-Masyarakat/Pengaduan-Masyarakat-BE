const userService = require("../services/user.services");

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

// const createUserProfile = async (req, res) => {
//   try {
//     const newUser = await userService.createUser(req.body);
//     res
//       .status(201)
//       .json({ message: "User profile created successfully.", data: newUser });
//   } catch (error) {
//     console.error("Failed to create user profile:", error);
//     res
//       .status(500)
//       .json({ message: "Internal server error while creating user profile." });
//   }
// };

const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.userId,
      req.body
    );
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
  // createUserProfile,
  updateUserProfile,
  deleteUserProfile,
};