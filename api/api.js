const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// Controllers
const user = require('./userController.js');
const images = require('./imageController.js');
const fileManagement = require('./fileManagement.js');

// User Actions
router.post('/login', user.doLogin);
router.get('/logout', user.logout);
router.post('/user', user.doRegister);
router.get('/current_user', user.getCurrentUser);

router.get('/images', images.getFilenames);
router.get('/images/:username', images.getFilenames);
router.get('/designers', images.getDesigners);
router.get('/votes/:image_id', images.getImageData);
router.put('/votes/:image_id', images.addVote);

// Uploading a new image.
router.put('/image', multipartMiddleware, fileManagement.upload);


module.exports = router;
