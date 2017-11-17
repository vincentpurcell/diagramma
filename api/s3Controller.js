const AWS = require('aws-sdk')
const async = require('async')
const path = require('path');
const fs = require('fs');
const imagemagick = require('imagemagick');

const Images = require('../models/image');
const User = require('../models/user');

/** Load Config File */
const config = require('../config');

const bucketName = 'diagramma';
AWS.config = {
    "accessKeyId": config.S3_KEY,
    "secretAccessKey": config.S3_SECRET,
    "region": config.AWS_REGION
};

const s3 = new AWS.S3({ region: AWS.config.region });

exports.deleteImage = (req, res) => {
    function deleteFileFromS3(image, thumbnail) {
        const params = {
            Bucket: bucketName,
            Delete: {
                Objects: [{Key: image}, {Key: thumbnail}]
            }
        };

        s3.deleteObjects(params, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.status(200).send('Bye bye, birdie!');
            }
        });
    }

    if (!req.params.id) {
        res.status(400).send('Image ID is required');
    } else {
        Images.findById(req.params.id)
        .exec((err, foundImage)  => {
            if (err) {
                res.status(404).send('Image not found');
            } else {
                deleteFileFromS3(foundImage.filename, `thumbnail-${foundImage.filename}`)
            }
        });
    }
};

exports.uploadImage = (req, res, next) => {
    const image = req.files.image;
    const imageName = req.files.image.originalFilename;
    const imageType = req.files.image.type;
    const imagePath = req.files.image.path;

    function saveImageRecord(params) {
        // Build the file object.
        const newImageObject = {};
        newImageObject.filename = imageName;
        newImageObject.imageUrl = params.fullSize;
        newImageObject.thumbnailUrl = params.thumbnail;
        newImageObject.designer = req.user._id;

        Images.create(newImageObject, (err, newImage) => {
            if (err) res.status(500).send(err);
            Images.findById(newImage.id)
                .populate('designer', 'displayName')
                .exec((err, finishedNewImage)  => {
                    if (err) res.status(404).send('Image saved to S3 but DB record not found');
                    res.json(finishedNewImage);
                });
        });
    }

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
                        saveImageRecord({
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
