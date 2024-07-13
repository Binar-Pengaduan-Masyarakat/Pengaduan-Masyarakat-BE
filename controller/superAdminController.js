const knex = require('../config/database')

const getAllUser = async (req, res) => {
    try {
        const result = await knex.select('*').from('Users');
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
};

const getAllAdmin = async (req, res) => {
    try {
        const result = await knex.select('*').from('Users').where('roles', 'admin');
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching admins' });
    }
};

const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const createdAt = new Date();
        const roles = 'admin';
        const result = await knex('Users').insert({ name, email, password, roles, createdAt });
        if (result) {
            res.status(201).json({ message: 'Admin created successfully' });
        } else {
            res.status(400).json({ message: 'Failed to create admin' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating admin' });
    }
};

module.exports = {
    getAllUser,
    getAllAdmin,
    createAdmin
}