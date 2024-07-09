const knex = require('../config/database')
const { v4: uuidv4 } = require('uuid');

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