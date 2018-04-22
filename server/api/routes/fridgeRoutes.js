const router = require('express').Router();
const authenticate = require('../../middleware/authenticateMiddleware').authenticate;
const fridgeController = require('../controllers/fridgeController');

router.param('id', fridgeController.param);
router.route('/')
    .get(authenticate, fridgeController.getAll)
    .post(authenticate, fridgeController.uploadFridge);

router.route('/me')
    .get(authenticate, fridgeController.getMyFridges);

router.route('/:id')
    .get(authenticate, fridgeController.getOneFridge)
    .put(authenticate, fridgeController.updateFridge)
    .delete(authenticate, fridgeController.deleteFridge);

router.route('/users/:uid')
    .get(authenticate, fridgeController.getUserFridges);

module.exports = router;


