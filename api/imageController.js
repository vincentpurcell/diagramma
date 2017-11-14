const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const Images = require('../models/image');

const imageController = {};

imageController.getFilenames = (req, res) => {
    const directory = (req.params && req.params.username) ? `${path.join(__dirname, '../diagrams')}/${req.params.username}` : path.join(__dirname, '../diagrams');

    const config = {
        'nodir': false
    };

    glob(`${directory}/**/*.jpg`, config, (err, files) => {
        if (err) {
            res.status(404).send('Not found');
        } else {
            const newList = [];
            files.forEach(f => newList.push(f.replace(directory, '')));
            res.json(newList);
        }
    });
};

imageController.getDesigners = (req, res) => {
    const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());
    res.json(dirs(path.join(__dirname, '../diagrams')));
};

imageController.getImageData = (req, res) => {
    Images.findOne({ filename: req.params.image }).exec((err, returnImage) => {
        if (returnImage) {
            res.json(returnImage);
        } else {
            Images.create({ filename: req.params.image, designer: req.params.designer }, (err, createdImage) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    Images.findOne({ filename: req.params.image }).exec((err, confirmedCreatedImage)  => {
                        if (err) { res.status(404).send('Image not found'); } else {
                            res.json(confirmedCreatedImage);
                        }
                    });
                }
            });
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
            Images.create({ filename: req.params.image, designer: req.params.designer }, (err, createdImage) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    Images.findOneAndUpdate({ filename: req.params.image }, {$push: {votes: {timestamp: Date.now()}}}, {safe: true, upsert: true}).exec((err, returnImage) => {
                        if (returnImage) {
                            Images.findOne({ filename: req.params.image }).exec((err, finalImage) => {
                                if (finalImage) {
                                    res.json(finalImage);
                                } else {
                                    res.status(500).send('Error voting');
                                }
                            });
                        } else {
                            res.status(500).send('Error voting');
                        }
                    });
                }
            });
        }
    });
};

module.exports = imageController;
