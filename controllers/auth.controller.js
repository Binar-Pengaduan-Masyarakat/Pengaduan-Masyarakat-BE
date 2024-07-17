const knex = require("knex")(require("../knexfile")());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const uuid = require("uuid");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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
        roles: "USER",
        verificationToken,
      });

      const verificationLink = `${process.env.EMAIL_VERIFICATION_URL}/api/auth/verify-email?token=${verificationToken}`;

      await transporter.sendMail({
        from: "Admin Pengaduan Masyarakat <noreply@pengaduanmasyarakat.com>", // Add noreply email
        to: email,
        subject: "Verify Your Email Address",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              h2 {
                color: #333;
              }
              p {
                line-height: 1.6;
                color: #555;
              }
              a {
                display: inline-block;
                background-color: #4CAF50;
                color: #ffffff;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Email Verification</h2>
              <p>Dear user,</p>
              <p>To complete your registration, please click the following link to verify your email address:</p>
              <a href="${verificationLink}">Verify Email</a>
              <p>If you did not request this verification, please ignore this email.</p>
              <p>Best regards,</p>
              <p>Admin Pengaduan Masyarakat</p>
              <p style="font-size: 12px; color: #999;">Please do not reply to this email.</p>
            </div>
          </body>
          </html>
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
