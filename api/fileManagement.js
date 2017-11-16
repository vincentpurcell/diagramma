const AWS = require('aws-sdk')
const async = require('async')
const path = require('path');
const fs = require('fs');
const imagemagick = require('imagemagick');

/** Load Config File */
const config = require('../config');

const bucketName = 'diagramma';
AWS.config = {
    "accessKeyId": config.S3_KEY,
    "secretAccessKey": config.S3_SECRET,
    "region": config.AWS_REGION
};

const s3 = new AWS.S3({ region: AWS.config.region });

exports.upload = (req, res, next) => {
    const image = req.files.image;
    const imageName = req.files.image.originalFilename;
    const imageType = req.files.image.type;
    const imagePath = req.files.image.path;

    function sendImage(thumbnailFile) {
        fs.readFile(imagePath, (err, imageData) => {
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
                        sendThumbnail(thumbnailFile);
                    }
                });
            }
        });
    }

    function sendThumbnail(thumbnailFile) {
        fs.readFile(thumbnailFile, (err, imageData) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                const params = {
                    Bucket: bucketName,
                    Key: `${thumbnailFile.replace(`${config.TEMP_PATH}/`, '')}`,
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
                            fullSize: `https://s3.${AWS.config.region}.amazonaws.com/${bucketName}/${imageName}`,
                            thumbnail: `https://s3.${AWS.config.region}.amazonaws.com/${bucketName}/${thumbnailFile.replace(`${config.TEMP_PATH}/`, '')}`
                        });
                    }
                });
            }
        });
    }

    // We want to generate a thumbnail image to serve as a preview,
    // so generate that and then save both to S3 and upload both.
    console.log('Save thumb to ', `${config.TEMP_PATH}/thumbnail-${imageName}`);
    imagemagick.resize({
        srcPath: image.path,
        dstPath: `${config.TEMP_PATH}/thumbnail-${imageName}`,
        width:   50
    }, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            sendImage(`${config.TEMP_PATH}/thumbnail-${imageName}`);
        }
    });
};
