const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = { ...userData, password: hashedPassword };
  return User.create(user);
};

const getUserById = async (userId) => {
  return User.findById(userId);
};

const updateUser = async (userId, userData) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  return User.update(userId, userData);
};

const deleteUser = async (userId) => {
  return User.delete(userId);
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
