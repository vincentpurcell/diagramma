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
        displayName: req.user.displayName || 'Anonymous',
        email: req.user.email,
        isDesigner: req.user.isDesigner || false,
        admin: req.user.admin || false,
        moderator: req.user.moderator || false,
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
            console.log(existingUser);
            return res.status(422).send({ error: 'Username in use' });
        }

        const userParams = req.body;
        userParams.displayName = userParams.displayName || 'Anonymous';

        const user = new User(userParams);

        user.save(user, (err, user) => {
            if (err) {
                return res.status(500).send({ error: 'Error creating user' });
            }

            return res.json({ token: tokenForUser(user) });
        });
    });
};

module.exports = authController;
