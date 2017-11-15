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
    console.log('req.files.image', req.files.image);
    const image = req.files.image;

    const imageName = req.files.image.originalFilename;
    const imageType = req.files.image.type;

    fs.readFile(image.path, (err, imageData) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            const params = {
                Bucket: bucketName,
                Key: `${imageName}`,
                ContentType: `${imageType}`,
                ACL: 'public-read',
                Body: imageData
            };

            s3.putObject(params, (err, data) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    return res.json({
                        filename: imageName,
                        Location: `https://s3.${AWS.config.region}.amazonaws.com/${bucketName}/${req.files.image.originalFilename}`
                    });
                }
            });
        }
    });
};
