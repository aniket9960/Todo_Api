const express = require('express');
const UserController = require('../controller/user');

const router = express.Router();


router.post('/register',UserController.create_user);

router.post('/login',UserController.login_user);

module.exports = router;