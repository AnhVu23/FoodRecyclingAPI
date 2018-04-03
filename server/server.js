const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { mongoose } = require('./config/mongoose');

const {User} = require('./model/UserModel');
const {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT || 3000;

app = express();

app.use(bodyParser.json());
//Create a new user
app.post('/users', (req, res) => {
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


//GET current user
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

//Login
app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    User.findByCredential(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).status(200).send(user);
        });
    }).catch((e) => {
        res.status(401).send();
    })

});
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});