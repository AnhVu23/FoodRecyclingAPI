const router = require('express').Router();
const authenticate = require('../../middleware/authenticateMiddleware').authenticate;
const upload = require('../../middleware/uploadMiddleware');
const photoController = require('../controllers/photoController');
router.route('/upload')
    .post(authenticate, upload.single('photo'), photoController.upload);

module.exports = router;