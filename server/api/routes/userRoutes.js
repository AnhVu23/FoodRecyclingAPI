'use strict';
const router = require('express').Router();
const authenticate = require('../../middleware/authenticateMiddleware').authenticate;
const userController = require('../controllers/userController');


router.param('id', userController.param);

router.route('/')
    //Create new user
    .post(userController.signUp)
    //Get a list of users
    .get(authenticate, userController.getAll);

//Get current user
router.route('/me')
    .get(authenticate, userController.getMe)
    .put(authenticate, userController.updateMe);

//Get specific user with given ID
router.route('/:id')
    .get(authenticate, userController.getUser);

//Log out
router.route('/logout')
    .delete(authenticate, userController.logout);

module.exports = router;