const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// Controllers
const user = require('./userController');
const images = require('./imageController');
const superclusters = require('./superclusterController');
const s3Controller = require('./s3Controller');

// User Actions
router.post('/login', user.doLogin);
router.get('/logout', user.logout);
router.post('/user', user.doRegister);
router.get('/current_user', user.getCurrentUser);

router.get('/images', images.getAllImages);
router.get('/images/:designer', images.getImagesByDesigner);
// router.get('/designers', images.getDesigners);
// router.get('/votes/:image_id', images.getImageData);
// router.put('/votes/:image_id', images.addVote);

// Uploading a new image.
router.put('/image', multipartMiddleware, s3Controller.uploadImage);
router.delete('/image/:id', s3Controller.deleteImage);

// Superclusters

module.exports = router;
