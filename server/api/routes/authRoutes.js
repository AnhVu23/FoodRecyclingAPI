'use strict';
const router = require('express').Router();

//Log in
router.route('/login')
    .post((req, res) => {
        const body = _.pick(req.body, ['email', 'password']);
        User.findByCredential(body.email, body.password).then((user) => {
            return user.generateAuthToken().then((token) => {
                res.header('x-auth', token).status(200).send(user);
            });
        }).catch(() => {
            res.status(401).send();
        })
    });

module.exports = {router};