const mongoose = require('mongoose');
const Supercluster = require('../models/supercluster');

const SuperclusterController = {};

SuperclusterController.getAllClusters = (req, res) => {
    Supercluster.find({})
    .exec((err, superclusters) => {
        if (superclusters) {
            res.json(superclusters);
        } else {
            res.json([]);
        }
    });
};

SuperclusterController.createNew = (req, res) => {
    if (req.user) {
        // Build the supercluster object.
        const newSupercluster = {};
        newSupercluster.displayName = req.body.displayName;
        if (req.body.active) newSupercluster.active = true;

        Supercluster.create(newSupercluster, (err, supercluster) => {
            if (err) res.status(500).send(err);
            res.json(supercluster);
        });
    } else {
        res.status(401).send('Please authenticate.')
    }
};

module.exports = SuperclusterController;
