const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');
const config = require('../config.json');

const authController = {};

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.APPLICATION_SECRET);
};

// Login the user
authController.login = (req, res, next) => {
    res.json({
        token: tokenForUser(req.user),
        id: req.user.id,
        displayName: req.user.displayName,
        email: req.user.email,
        isDesigner: req.user.isDesigner,
        admin: req.user.admin,
        moderator: req.user.moderator,
        superclusters: req.user.superclusters,
    });
};

// Logout user
authController.logout = (req, res) => {
    req.logout();
    res.json({ 'logoutSuccess': true });
};

// Post a new registration
authController.signup = (req, res) => {
    User.findOne({ username: req.body.username }, (err, existingUser) => {
        if (err) { return next(err); }

        if (existingUser) {
            return res.status(422).send({ error: 'Username in use' });
        }

        const userParams = req.body;
        userParams.displayName = userParams.displayName || 'Anonymous';
        userParams.active = false;
        userParams.admin = false;
        userParams.isDesigner = true;

        const user = new User(userParams);

        user.save(user, (err, user) => {
            if (err) {
                return res.status(500).send({ error: 'Error creating user' });
            }

            return res.json({ token: tokenForUser(user) });
        });
    });
};

// Get the current user if valid login
// Get current user
authController.getCurrentUser = (req, res) => {
    User.findById(req.user.id, (err, user) => {
        res.json({
            id: req.user.id,
            displayName: req.user.displayName,
            email: req.user.email,
            isDesigner: req.user.isDesigner,
            admin: req.user.admin,
            moderator: req.user.moderator,
            superclusters: req.user.superclusters,
            token: tokenForUser(req.user)
        });
    });
};

authController.updateUser = (req, res) => {
    const userId = req.body.id || req.user.id;
    const userObj = {};
    if (req.body.username) userObj.username = req.body.username;
    if (req.body.email) userObj.email = req.body.email;
    if (req.body.displayName) userObj.displayName = req.body.displayName;

    // Only allow changing certain parameters by administrators
    if (req.user.admin) {
        if (req.body.active !== null) userObj.active = req.body.active;
        if (req.body.admin) userObj.admin = req.body.admin;
        if (req.body.moderator) userObj.moderator = req.body.moderator;
    }

    // Utility function to save a given user with provided data object.
    const saveUpdatedUser = (data) => {
        User.findByIdAndUpdate(userId, data, (err, updatedUser) => {
            User.findById(userId, (err, user) => {
                res.json({
                    id: user.id,
                    displayName: user.displayName,
                    email: user.email,
                    isDesigner: user.isDesigner,
                    admin: user.admin,
                    moderator: user.moderator,
                    superclusters: user.superclusters,
                    token: tokenForUser(req.user)
                });
            });
        });
    };

    // If setting a new password, hash it.
    if (req.body.password) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) { return res.status(500).send(err); }

            // hash (encrypt) our password using the salt
            bcrypt.hash(req.body.password, salt, null, (err, hash) => {
                if (err) { return res.status(500).send(err); }

                // overwrite plain text password with encrypted password
                userObj.password = hash;

                saveUpdatedUser(userObj);
            });
        });
    } else {
        saveUpdatedUser(userObj);
    }
};

module.exports = authController;
