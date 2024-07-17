const knex = require("knex")(require("../knexfile")());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const uuid = require("uuid");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cahyonochusaini@gmail.com",
    pass: "xkbhlvaxkbjnideg",
  },
});

module.exports = class {
  static async register(req, res) {
    try {
      const { name, email, password, roles } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = uuid.v4();
      await knex("User").insert({
        name,
        email,
        password: hashedPassword,
        isVerified: false,
        roles,
        verificationToken,
      });

      const verificationLink = `${process.env.EMAIL_VERIFICATION_URL}/api/auth/verify-email?token=${verificationToken}`;

      await transporter.sendMail({
        from: "Admin Pengaduan Masyarakat",
        to: email,
        subject: "Verify Your Email Address",
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Email Verification</h2>
            <p>Dear user,</p>
            <p>To complete your registration, please click the following link to verify your email address:</p>
            <a href="${verificationLink}" style="background-color: #4CAF50; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none;">Verify Email</a>
            <p>If you did not request this verification, please ignore this email.</p>
            <p>Best regards,</p>
            <p>Admin Pengaduan Masyarakat</p>
          </div>
        `,
      });

      res.status(201).json({
        message: "User registered. Check your email for verification link.",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getVerifyEmail(req, res) {
    try {
      const { token } = req.query;

      const user = await knex("User").where("verificationToken", token).first();

      if (!user) {
        return res.status(400).json({ error: "Invalid verification token" });
      }

      await knex("User")
        .where("userId", user.userId)
        .update({ isVerified: true, verificationToken: null });

      res.status(201).json({ message: "Email verified successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await knex("User").where("email", email).first();

      if (!user || !user.isVerified) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user.userId }, "secretkey", {
        expiresIn: "1h",
      });

      res.cookie("token", token, { httpOnly: true });

      res.status(201).json({ message: "Login success..!!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie("token");

      res.redirect("/auth/login");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
