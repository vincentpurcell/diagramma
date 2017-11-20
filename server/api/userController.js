const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');

const userController = {};

userController.getUsers = (req, res) => {
    if (req.query.getAll) {
        User.find({})
        .exec((err, users) => {
            res.json(users);
        });
    } else {
        User.find({ active: true })
        .select('id displayName')
        .exec((err, users) => {
            res.json(users);
        });
    }
};

module.exports = userController;
