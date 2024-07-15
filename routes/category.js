var express = require('express');
const { getAllCategory, 
    createCategory, 
    getCategoryById, 
    updateCategory,
    deleteCategory } = 
    require('../controller/categoryController');
var router = express.Router();

/* GET all category listing. */
router.get('/', function(req, res, next) {
    getAllCategory(req, res)
});

/* GET category by id. */
router.get('/:categoryId', function(req, res, next) {
    getCategoryById(req, res)
});

/* POST create category. */
router.post('/create-category', function(req, res, next) {
    createCategory(req, res)
});

/* PUT update category. */
router.put('/update-category/:categoryId', function(req, res, next) {
    updateCategory(req, res)
});

/* DELETE delete category. */
router.delete('/delete-category/:categoryId', function(req, res, next) {
    deleteCategory(req, res)
});

module.exports = router;
