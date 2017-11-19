const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');

const userController = {};

userController.getActiveUsers = (req, res) => {
    User.find({ active: true })
    .select('id displayName')
    .exec((err, users) => {
        res.json(users);
    });
};

module.exports = userController;
