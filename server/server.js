require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { mongoose } = require('./config/mongoose');

const {User} = require('./api/model/userModel');
const {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT || 3000;

app = express();

app.use(bodyParser.json());

//Login
app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    User.findByCredential(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).status(200).send(user);
        });
    }).catch(() => {
        res.status(401).send();
    })
});

//Logout
app.delete('/users/me/token', authenticate, (req, res) => {
   req.user.removeToken(req.token).then(() => {
       res.status(200).send();
   }, () => {
       res.status(400).send();
   });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};