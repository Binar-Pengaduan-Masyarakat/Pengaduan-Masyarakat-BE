const knex = require("knex")(require("../knexfile")());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cahyonochusaini@gmail.com",
    pass: "xkbhlvaxkbjnideg",
  },
});

module.exports = class {
  static register = async (req, res, next) => {
    try {
      const { name, email, password, roles } = req.body;

      console.log("Registering user:", name, email);

      const hashedPassword = await bcrypt.hash(password, 10);
      const [userId] = await knex("User")
        .insert({
          name,
          email,
          password: hashedPassword,
          isVerified: false,
          roles,
        })
        .returning("*");

      console.log("User created:", userId);

      const token = jwt.sign(userId, "secretkey", { expiresIn: "1h" });
      console.log("Token generated:", token);

      const verificationLink = `${process.env.EMAIL_VERIFICATION_URL}/api/auth/verify-email?token=${token}`;
      console.log("Verification link:", verificationLink);

      await transporter.sendMail({
        from: "Admin Pengaduan Masyarakat",
        to: email,
        subject: "Email Verification",
        text: `Click the following link to verify your email: ${verificationLink}`,
      });

      console.log("Email sent");

      res.status(201).json({
        message: "User registered. Check your email for verification link.",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: error.message });
    }
  };

  static getVerifyEmail = async (req, res, next) => {
    try {
      const { token } = req.query;

      const decoded = jwt.verify(token, "secretkey");

      await knex("User")
        .where("userId", decoded.userId)
        .update({ isVerified: true });
      res.status(201).json({ message: "Email verified successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const users = await knex("User").where("email", email).first();
      if (!users) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      if (!users.isVerified) {
        return res.status(400).json({ error: "Email not verified" });
      }

      const isPasswordValid = await bcrypt.compare(password, users.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: users.userId }, "secretkey", {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });
      //res.redirect('/profile');
      res.status(201).json({ message: "Login success..!!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static logout = async (req, res, next) => {
    try {
      res.clearCookie("token");
      res.redirect("/auth/login");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};
