'use strict';
const router = require('express').Router();
const authenticate = require('../../middleware/authenticate');

router.route('/')
    .get(authenticate, (req, res) => {
        res.send(req.user);
    })
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