const mongoose = require('mongoose');

const Images = require('../models/image');
const User = require('../models/user');

const imageController = {};

imageController.getAllImages = (req, res) => {
    Images.find({}, (err, images) => {
        if (images) {
            res.json(images);
        } else {
            res.status(404).send('Image records not found');
        }
    });
};

imageController.getImagesByDesigner = (req, res) => {
    Images.find({}, (err, images) => {
        if (images) {
            res.json(images);
        } else {
            res.status(404).send('Image records not found');
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
