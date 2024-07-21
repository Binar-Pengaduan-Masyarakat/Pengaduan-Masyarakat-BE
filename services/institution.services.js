const User = require("../models/user.model");

const getAllInstitutions = async () => {
  return User.findByRole("INSTITUTION");
};

const getInstitutionById = async (id) => {
  return User.findById(id);
};

const updateInstitution = async (id, data) => {
  return User.update(id, data);
};

const deleteInstitution = async (id) => {
  return User.delete(id);
};

module.exports = {
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution,
};
