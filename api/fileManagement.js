const AWS = require('aws-sdk')
const async = require('async')
const path = require('path');
const fs = require('fs');

let pathParams, image, imageName;

/** Load Config File */
const bucketName = 'diagramma';
AWS.config = {
    "accessKeyId": process.env.S3_KEY,
    "secretAccessKey": process.env.S3_SECRET,
    "region": 'us-east-2'
};

/** After config file load, create object for s3*/
const s3 = new AWS.S3({ region: AWS.config.region });

const createMainBucket = (callback) => {
    // Create the parameters for calling createBucket
    const bucketParams = {
        Bucket : bucketName
    };

    s3.headBucket(bucketParams, (err, data) => {
        if (err) {
            s3.createBucket(bucketParams, function(err, data) {
                if (err) {
                    console.log("Error", err)
                    callback(err, null)
                } else {
                    callback(null, data)
                }
            });
        } else {
            callback(null, data)
        }
    })
}

const createItemObject = (callback) => {
    const params = {
        Bucket: bucketName,
        Key: `${imageName}`,
        ACL: 'public-read',
        Body: image
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.log("Error uploading image: ", err);
            callback(err);
        } else {
            console.log("Successfully uploaded image on S3", data);
            callback(null, data);
        }
    })
}

exports.upload = (req, res, next) => {
    image = req.body.imageBuffer;
    imageName = req.body.imageFilename;

    async.series([
        createMainBucket,
        createItemObject
    ], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.json(result);
        }
    })
};
