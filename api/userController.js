const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');

const userController = {};

// Post login
userController.doLogin = (req, res) => {
    passport.authenticate('local')(req, res, (data) => {
        User.findOne({ username: req.body.username })
            .populate('devices', 'serial')
            .exec((err, returnedUser) => {
                res.json(returnedUser);
            });
    });
};

// logout
userController.logout = (req, res) => {
    req.logout();
    res.json({ 'logoutSuccess': true });
};

// Get current user
userController.getCurrentUser = (req, res) => {
    if (req.user) {
        User.findById(req.user.id, (err, user) => {
            res.json(user);
        });
    } else {
        res.status(401).send('Please authenticate.');
    }
};

// Post registration
userController.doRegister = (req, res) => {
    if (req.user) {
        if (req.body.username) {
            User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
                if (err) res.status(500).send(err);
                res.json(user);
            });
        } else {
            res.status(422).send('Missing username');
        }
    } else {
        res.status(401).send('Please authenticate to access this resource');
    }
};

module.exports = userController;
