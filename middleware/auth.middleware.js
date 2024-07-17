const knex = require("knex")(require("../knexfile")());
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = class {
  static authenticate(req, res, next) {
    const token = req.headers;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
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
