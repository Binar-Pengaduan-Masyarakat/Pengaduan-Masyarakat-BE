var express = require('express');
const
    {
        getAllUser,
        getAllAdmin,
        createAdmin
    } = require('../controller/superAdminController');
var router = express.Router();

/* GET All users listing. */
router.get('/all-users', function (req, res, next) {
    getAllUser(req, res)
});

/* GET All admin only listing. */
router.get('/admin', function (req, res, next) {
    getAllAdmin(req, res)
});

/* POST create admin. */
router.post('/create-admin', function (req, res, next) {
    createAdmin(req, res)
});

module.exports = router;