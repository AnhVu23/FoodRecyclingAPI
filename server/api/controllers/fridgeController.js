const Fridge = require('../model/fridgeModel');
const mongoose = require('mongoose');
const _ =  require('lodash');

exports.param = (req,res,next,id) => {
    Fridge.findById(id)
        .populate('uploader', '_id email', 'posts')
        .exec()
        .then((fridge) => {
            if(!fridge) {
                return res.status(404).send({
                    message: 'Invalid id'
                })
            }
            req.fridge = fridge;
            next();
        }, err => res.status(404).send({
            message: err
        }))
};

exports.getAll = (req, res) => {
    Fridge.find({})
        .populate('uploader', '_id email')
        .populate('posts')
        .exec()
        .then((fridges) => {
            if(!fridges) {
                return res.status(404).send({
                    message: 'Invalid id'
                })
            }
            return res.status(200).send(fridges);
        }, err => res.status(404).send({
            message: err
        }))
};

exports.uploadFridge = (req, res) => {
    const body= _.pick(req.body, ['name', 'description']);
    const fridge = new Fridge({
        _id: mongoose.Types.ObjectId(),
        description: body.description,
        name: body.name
    });
    fridge.uploader = req.user._id;
    fridge.save().then(() => {
        return res.status(200).send(fridge);
    }).catch(e => res.status(400).send(e));
};

exports.getMyFridges = (req, res) => {
    const uid = req.user._id;
    Fridge.find({uploader: uid})
        .populate('posts')
        .exec()
        .then((fridges) => {
        if(!fridges) {
            return res.status(404).send({message: 'Invalid id'});
        }
        return res.status(200).send(fridges);
    }, err => res.status(404).send({message: err}))
};

exports.getOneFridge = (req, res) => {
    const fridge = req.fridge;
    return res.status(200).send(fridge);
};

exports.updateFridge = (req, res) => {
    const uId = req.user._id;
    const uploaderId = req.fridge.uploader._id;
    if (!(uId === uploaderId)) {
        return res.status(401).send({
            message: 'Unauthorized'
        });
    }
    const fridge = req.fridge;
    const update = req.body;
    _.merge(fridge, update);
    fridge.save().then(() => {
        return res.status(200).send();
    }, err => res.status(404).send({
        message: err
    }));
};

exports.deleteFridge = (req, res) => {
    const uId = req.user._id;
    const uploaderId = req.fridge.uploader._id;
    if (!(uId === uploaderId)) {
        return res.status(401).send();
    }
    req.fridge.remove().then(() => {
        return res.status(200).send();
    }, err => res.status(404).send({
        message: err
    }))
};

exports.getUserFridges = (req, res) => {
    const uid = req.params.uid;
    Fridge.find({uploader: uid})
        .populate('uploader', '_id email', 'posts')
        .exec().
    then((fridges) => {
        if(!fridges) {
            return res.status(404).send({message: 'Invalid user id'})
        }
        return res.status(200).send(fridges);
    }, (err) => {
        return res.status(404).send({
            message: err
        });
    });
};

