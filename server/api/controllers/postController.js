const Post = require('../model/postModel');
const _ =  require('lodash');
const mongoose = require('mongoose');
const Fridge = require('../model/fridgeModel');
exports.param = (req, res, next, id) => {
  Post.findById(id)
      .populate('uploader', '_id email')
      .exec()
      .then((post) => {
        if(!post) {
            return Promise.reject();
        }
        req.post = post;
        next();
      }, (err) => Promise.reject());
};

exports.getAll = (req, res) => {
  Post.find({status: 'available'})
      .populate('uploader', '_id email')
      .exec()
      .then((posts) => {
          if(!posts) {
              return res.status(404).send();
          }
          return res.status(400).send(posts);
      }, (err) => res.status(404).send());
};

exports.getMyPosts = (req, res) => {
    const uId = req.user._id;
  Post.find({uploader: uId, status: 'available'}).then((posts) => {
      return res.status(200).send(posts);
  }, (err) => res.status(404).send());
};

exports.getOnePost = (req, res) => {
    const post = req.post;
    return res.status(200).send(post);
};

exports.updatePost = (req, res) => {
    const uId = req.user._id;
    const uploaderId = req.post.uploader._id;
    if (!(uId === uploaderId)) {
        return res.status(401).send();
    }
    const post = req.post;
    const update = req.body;
    _.merge(post, update);
    post.save().then(() => {
        return res.status(200).send();
    }, err => res.status(404).send({
        message: err
    }));
};

exports.deletePost = (req, res) => {
    const uId = req.user._id;
    const uploaderId = req.post.uploader._id;
    if (!(uId === uploaderId)) {
        return res.status(401).send();
    }
    req.item.remove().then(() => {
        return res.status(200).send();
    }, err => res.status(404).send({
        message: err
    }))
};

exports.uploadPost = (req, res) => {
  const body= _.pick(req.body, ['description', 'imgPath', 'category', 'fridge']);
  const post = new Post({
     _id: mongoose.Types.ObjectId(),
      fridge: body.fridge,
      description: body.description,
      imgPath: body.imgPath,
      category: body.category
  });
  post.uploader = req.user._id;
  Fridge.findById(post.fridge).then((fridge) => {
      if(!fridge) {
          res.status(400).send({message: 'Invalid fridge'})
      }
     _.merge(fridge, {posts: post});
      fridge.save().then(() => {
          return res.status(200).send(post);
      }).catch(e => res.status(400).send(e));
  }, err => res.status(400).send({message: err}));
  post.save().then(() => {
      return res.status(200).send(post);
  }).catch(e => res.status(400).send(e));
};

exports.getCategory = (req, res) => {
  const category = req.query.category;
    Post.find({category: category, status: 'available'}).then((posts) => {
        if(!posts) {
            return res.status(404).send();
        }
        return res.status(200).send(posts)
    }, err => res.status(4042).send())
};

exports.getUserPosts = (req, res) => {
  const uid = req.params.uid;
    Post.find({uploader: uid}).
    populate('uploader', '_id email').
    exec().
    then((posts) => {
        if(!posts) {
            return res.status(404).send({message: 'Invalid user id'})
        }
        return res.status(200).send(posts);
    }, (err) => {
        return res.status(404).send({
            message: err
        });
    });
};