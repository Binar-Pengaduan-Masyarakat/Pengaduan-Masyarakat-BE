const knex = require("knex")(require("../knexfile")());

const getAllCategory = async (req, res) => {
    try {
        const result = await knex.select('*').from('Category');
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching categories' });
    }
};

const getCategoryById = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const result = await knex.select('*').from('Category').where('categoryId', categoryId);
        if (result.length === 0) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching category' });
    }
};

const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const result = await knex('Category').insert({ categoryName: categoryName });
        if (result) {
            res.status(201).json({ message: 'Category created successfully' });
        } else {
            res.status(400).json({ message: 'Failed to create category' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating category' });
    }
};

const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { categoryName } = req.body;
    try {
        const result = await knex('Category').where('categoryId', categoryId).update({ categoryName: categoryName });
        if (result) {
            res.status(200).json({ message: 'Category updated successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating category' });
    }
};

const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const result = await knex('Category').where('categoryId', categoryId).del();
        if (result) {
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting category' });
    }
};

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
