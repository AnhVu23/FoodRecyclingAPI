const User = require('../model/userModel');
const _ = require('lodash');
const mongoose = require('mongoose');

exports.param = (req, res, next, id) => {
    User.find({_id: id})
        .select('_id email')
        .then((user) => {
            if(!user) {
                return res.status(404).send();
            }
            req.userFind = user;
            next();
        }, err => res.status(400).send());
};

exports.signUp = async (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        email: body.email,
        password: body.password
    });
    user.save().then(() => {
        return user.generateAuthToken();
    }).then(() => {
        res.status(200).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
};

exports.getMe = (req, res) => {
    res.send(req.user);
};

exports.getUser = (req, res) => {
  const user = req.userFind;
  console.log(user);
  return res.status(200).send(user);
};

exports.getAll = (req, res) => {
  User.find({})
      .select('_id email')
      .then((users) => {
      if(!users) {
          return res.status(404).send();
      }
      return res.status(200).send(users)
  }, err => res.status(404).send())
};

exports.updateMe = (req, res) => {
    const user = req.user;
    const update = _.pick(req.body, ['password']);
    if(!update) {
        return res.status(400).send();
    }
    _.merge(user, update);
    user.save().then(() => {
        return res.status(200).send(user);
    }, err => res.status(400).send());
};

exports.logout = (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
};

