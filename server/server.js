const {User} = require('./model/UserModel');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { mongoose } = require('./config/mongoose');

const port = process.env.PORT || 3000;

app = express();

app.use(bodyParser.json());
app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user.toJSON());
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});