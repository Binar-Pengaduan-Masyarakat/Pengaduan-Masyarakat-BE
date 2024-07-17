const knex = require("knex")(require("../knexfile")());
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = class {
  static authenticate(req, res, next) {
    const token = req.headers;
    if (!token) {
      return res.redirect("/auth/login");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.redirect("/auth/login");
      }
      req.user = decoded;
      next();
    });
  }

  static checkUserExist = async (req, res, next) => {
    const { email } = req.body;
    const user = await knex("User").where("email", email);
    if (user.length == 0) {
      next();
    } else {
      res.status(401).json({ status: 401, message: "Email already exist" });
    }
  };
};
