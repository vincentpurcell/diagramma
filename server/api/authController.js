const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config.json')

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
    User.findByIdAndUpdate(req.user.id || req.body.id, req.body, (err, updatedUser) => {
        User.findById(req.user.id, (err, user) => {
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

module.exports = authController;
