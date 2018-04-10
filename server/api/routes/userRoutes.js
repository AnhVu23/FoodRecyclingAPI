'use strict';
const router = require('express').Router();
const authenticate = require('../../middleware/authenticate');
const userController = require('../controllers/userController');

router.route('/')
    //Create new user
    .post((req, res) => {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);
        user.save().then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        }).catch((e) => {
            res.status(400).send(e);
        });
    });

//Get current user
router.route('/me')
    .get(authenticate, (req, res) => {
        res.send(req.user);
    });

//Log out
router.route('/logout')
    .delete(authenticate, (req, res) => {
        req.user.removeToken(req.token).then(() => {
            res.status(200).send();
        }, () => {
            res.status(400).send();
        });
    });

