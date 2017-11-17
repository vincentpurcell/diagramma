const mongoose = require('mongoose');
const Supercluster = require('../models/supercluster');
const User = require('../models/user');

const config = require('../config');

const fixtures = {};

fixtures.initialize = () => {
    console.log('Running fixtures');

    // Create the Universe if it does not exist.
    // To make a diagramma, first you must create the universe.
    Supercluster.find({ displayName: 'Universe' })
    .exec((err, universe) => {
        if (!universe.length) {
            Supercluster.create({
                displayName: 'Universe',
                permanent: true
            }, (err, supercluster) => {
                if (err) throw(err);
                else console.log('Created Universe supercluster');
            });
        } else {
            console.log('Universe exists, skipping...');
        }
    });

    // Create the a super admin if it does not exist.
    // To make a diagramma, first you must create the universe.
    const defaultAdminUsername = config.DEFAULT_APP_ADMIN_USERNAME || 'administrator';
    User.find({ username: defaultAdminUsername })
    .exec((err, superuser) => {
        if (!superuser.length) {
            const superuserPassword = config.DEFAULT_APP_ADMIN_PASSWORD || Math.random().toString(36).slice(2);

            User.register(new User({
                username : defaultAdminUsername,
            }), superuserPassword, (err, user) => {
                if (err) throw(err);
                User.findOne({ username: defaultAdminUsername})
                .update({
                    displayName : 'Admin',
                    admin: true,
                    moderator: true,
                    permanent: true,
                    isDesigner: false
                })
                .exec((err, admin) => {
                    if (err) throw(err);
                    else console.log(`\nCreated superadmin with \nUsername: ${defaultAdminUsername}\nPassword: ${superuserPassword}\n`);
                });
            });
        } else {
            console.log('Superadmin exists, skipping...');
        }
    });
};

module.exports = fixtures;
