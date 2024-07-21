const knex = require("knex")(require("../knexfile")());
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const getAllUsers = async (req, res) => {
  try {
    const result = await knex
      .select(
        "userId",
        "userImage",
        "name",
        "email",
        "roles",
        "isVerified",
        "createdAt"
      )
      .from("User");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
};

const getAllInstitutions = async (req, res) => {
  try {
    const result = await knex
      .select(
        "userId",
        "userImage",
        "name",
        "email",
        "roles",
        "isVerified",
        "createdAt"
      )
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
    const { name, email, password, categoryId } = req.body;
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

    const categorySubmit = await knex("UserCategory").insert({
      userId,
    });

    if (result) {
      await transporter.sendMail({
        from: "Admin Pengaduan Masyarakat <noreply@pengaduanmasyarakat.com>", // Add noreply email
        to: email,
        subject: "Institution Created",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Institution Created</title>
            <style>
              /* Same styles as above */
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Institution Created</h2>
              <p>Dear ${name},</p>
              <p>Your institution has been created successfully.</p>
              <p>Your login credentials are:</p>
              <ul>
                <li>Email: ${email}</li>
                <li>Password: ${password}</li>
              </ul>
              <p>Please keep this information safe.</p>
              <p>Best regards,</p>
              <p>Admin Pengaduan Masyarakat</p>
              <p style="font-size: 12px; color: #999;">Please do not reply to this email.</p>
            </div>
          </body>
          </html>
        `,
      });

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

const assignUserCategory = async (req, res) => {
  const { userId, categoryId } = req.body;
  try {
    const result = await knex("UserCategory").insert({ userId, categoryId });
    if (result) {
      res.status(200).json({ message: "Category assigned successfully" });
    } else {
      res.status(404).json({ message: "Category cant be assigned" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to assign user category" });
  }
};

const updateUserCategory = async (req, res) => {
  const { userId, categoryId } = req.body;

  if (!userId || !categoryId) {
    return res
      .status(400)
      .json({ message: "userId and categoryId are required" });
  }

  try {
    const result = await knex("UserCategory")
      .where({ userId })
      .update({ categoryId });

    if (result) {
      res.status(200).json({ message: "Category updated successfully" });
    } else {
      res.status(404).json({ message: "Category cannot be updated" });
    }
  } catch (error) {
    console.error("Error updating user category:", error);
    res.status(500).json({ error: "Failed to update user category" });
  }
};

module.exports = {
  getAllUsers,
  getAllInstitutions,
  createInstitution,
  assignUserCategory,
  updateUserCategory,
};
