const knex = require("knex")(require("../knexfile")());
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const result = await knex.select("*").from("User");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
};

const getAllInstitutions = async (req, res) => {
  try {
    const result = await knex
      .select("*")
      .from("User")
      .where("roles", "INSTITUTION");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching INSTITUTION" });
  }
};

const createInstitution = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createdAt = new Date();
    const roles = "INSTITUTION";
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await knex("User").insert({
      name,
      email,
      password: hashedPassword,
      roles,
      isVerified: true,
      createdAt,
    });
    if (result) {
      res.status(201).json({ message: "Institution created successfully" });
    } else {
      res.status(400).json({ message: "Failed to create Institution" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating Institution" });
  }
};

module.exports = {
  getAllUsers,
  getAllInstitutions,
  createInstitution,
};
