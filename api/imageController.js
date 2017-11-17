const mongoose = require('mongoose');

const Images = require('../models/image');

const imageController = {};

imageController.getAllImages = (req, res) => {
    Images.find({})
    .populate('designer', 'displayName')
    .exec((err, images) => {
        if (images) {
            res.json(images);
        } else {
            res.json([]);
        }
    });
};

imageController.getImagesByDesigner = (req, res) => {
    Images.find({ designer: req.params.designer })
    .populate('designer', 'displayName')
    .exec((err, images) => {
        if (images) {
            res.json(images);
        } else {
            res.json([]);
        }
    });
};

imageController.addVote = (req, res) => {
    Images.findOneAndUpdate({ filename: req.params.image }, {$push: {votes: {timestamp: Date.now()}}}, {safe: true, upsert: true}).exec((err, returnImage) => {
        if (returnImage) {
            Images.findOne({ filename: req.params.image }).exec((err, updatedImage) => {
                if (updatedImage) {
                    res.json(updatedImage);
                } else {
                    res.status(500).send('Error voting');
                }
            });
        } else {
            res.status(404).send('Image record not found');
        }
    });
};

module.exports = imageController;
