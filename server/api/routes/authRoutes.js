'use strict';
const router = require('express').Router();
const authController = require('../controllers/authController');
//Log in
router.route('/login')
    .post(authController.login);

module.exports = router;