const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');

const userController = {};

// Get current user
userController.getCurrentUser = (req, res) => {
    User.findById(req.user.id, (err, user) => {
        res.json(user);
    });
};

userController.getActiveUsers = (req, res) => {
    User.find({ active: true }, (err, users) => {
        res.json(users);
    });
};

module.exports = userController;
