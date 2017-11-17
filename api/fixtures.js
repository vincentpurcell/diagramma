const mongoose = require('mongoose');
const Supercluster = require('../models/supercluster');
const User = require('../models/user');

const fixtures = {};

fixtures.initialize = () => {
    console.log('Running fixtures');

    // Create the Universe if it does not exist.
    // To make a diagramma, first you must create the universe.
    Supercluster.find({ displayName: 'Universe' })
    .exec((err, universe) => {
        if (!universe.length) {
            Supercluster.create({ displayName: 'Universe', permanent: true }, (err, supercluster) => {
                if (err) throw(err);
                else console.log('Created Universe supercluster');
            });
        } else {
            console.log('Universe exists, skipping...');
        }
    });

    // Create the a super admin if it does not exist.
    // To make a diagramma, first you must create the universe.
    User.find({ username: 'administrator' })
    .exec((err, superuser) => {
        if (!superuser.length) {
            const superuserPassword = Math.random().toString(36).slice(2);
            User.register(new User({ username : 'administrator', admin: true, moderator: true, permanent: true }), superuserPassword, (err, user) => {
                if (err) throw(err);
                else console.log(`Created superadmin with password ${superuserPassword}`);
            });
        } else {
            console.log('Superadmin exists, skipping...');
        }
    });
};

module.exports = fixtures;
