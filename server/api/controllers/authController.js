const _ = require('lodash');
const User = require('../model/userModel');
exports.login = (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    User.findByCredential(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.status(200).send(user);
        });
    }).catch(() => {
        res.status(401).send();
    })
};