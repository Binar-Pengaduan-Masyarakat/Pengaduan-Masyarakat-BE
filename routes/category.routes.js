const express = require("express");
const {
  getAllCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getUserCategory,
  getUserCategoryById,
  assignUserCategory,
  updateUserCategory,
} = require("../controllers/category.controller");
const router = express.Router();

router
  // GET all category
  .get("/", getAllCategory)

  // GET category by categoryId
  .get("/:categoryId", getCategoryById)

  // POST create category
  .post("/", createCategory)

  // PUT update category by categoryId
  .put("/:categoryId", updateCategory)

  // DELETE category by categoryId
  .delete("/:categoryId", deleteCategory)

  // GET all category for user
  .get("/user", getUserCategory)

  // GET category by userId
  .get("/user/:userId", getUserCategoryById)

  // POST assign category to user
  .post("/user", assignUserCategory)

  // PUT update user category
  .put("/user", updateUserCategory);

module.exports = router;
