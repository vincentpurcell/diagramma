const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// Controllers
const auth = require('./authController');
const user = require('./userController');
const images = require('./imageController');
const superclusters = require('./superclusterController');
const s3Controller = require('./s3Controller');

// Authentication Actions
router.post('/login', requireSignin, auth.login);
router.get('/logout', auth.logout);
router.post('/signup', auth.signup);

// User actions
router.get('/user/current', requireAuth, user.getCurrentUser);

// General images
router.get('/images', images.getAllImages);
router.get('/images/:designer', images.getImagesByDesigner);
router.get('/designers', user.getActiveUsers);

// Voting
router.get('/votes/:image', images.getVotes);
router.put('/vote/:image', images.addVote);

// Uploading
router.put('/image', [requireAuth, multipartMiddleware], s3Controller.uploadImage);
router.delete('/image/:id', requireAuth, s3Controller.deleteImage);

// Superclusters
//

module.exports = router;
