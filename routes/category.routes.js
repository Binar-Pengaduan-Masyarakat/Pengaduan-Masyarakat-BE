const express = require("express");
const {
  getAllCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
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
  .delete("/:categoryId", deleteCategory);

module.exports = router;
