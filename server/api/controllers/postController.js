const Post = require('../model/postModel');
const _ =  require('lodash');

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
  Post.find()
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
  Post.find({uploader: uId}).then((posts) => {
      return res.status(200).send(posts);
  }, (err) => res.status(404).send());
};

exports.getOnePost = (req, res) => {
    const item = req.item;
    return res.status(200).send(item);
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
  const post = req.post;
  post.uploader = req.user._id;
  Post.create(post).then((item) => {
      return res.status(200).send(item);
  }, err => res.status(404).send({
      message: err
  }))
};

exports.getCategoryPosts = (req, res) => {
  const category = req.params.category;
  Post.find({category: category}).then((posts) => {
      return res.status(200).send(posts);
  }, err => {
      return res.status(404).send();

  })
};
