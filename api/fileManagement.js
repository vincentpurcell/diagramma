const AWS = require('aws-sdk')
const async = require('async')
const path = require('path');
const fs = require('fs');
const config = require('../config');

/** Load Config File */
const bucketName = 'diagramma';
AWS.config = {
    "accessKeyId": config.S3_KEY,
    "secretAccessKey": config.S3_SECRET,
    "region": config.AWS_REGION
};

const s3 = new AWS.S3({ region: AWS.config.region });

exports.upload = (req, res, next) => {
    const image = req.body.data;
    const imageName = req.body.filename;

    const params = {
        Bucket: bucketName,
        Key: `${imageName}`,
        ACL: 'public-read',
        Body: image
    };

    s3.upload(params, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.json(data);
        }
    });
};
