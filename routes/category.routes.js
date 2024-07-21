const express = require("express");
const {
  getAllCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getUserCategory,
  getUserCategoryById,
} = require("../controllers/category.controller");
const router = express.Router();

router
  // GET all categories
  .get("/", getAllCategory)

  // POST create category
  .post("/", createCategory)

  // GET category by categoryId
  .get("/:categoryId", getCategoryById)

  // PUT update category by categoryId
  .put("/:categoryId", updateCategory)

  // DELETE category by categoryId
  .delete("/:categoryId", deleteCategory)

  // GET all categories for a user
  .get("/user", getUserCategory)

  // GET categories by userId
  .get("/user/:userId", getUserCategoryById);

module.exports = router;
