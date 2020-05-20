let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its working',
        message: 'Welcome to something'
    })
})
// Contact Controller & Routes
var contactController = require('../controllers/contactController');

router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new)

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete)

// User Controller & Routes
var userController = require('../controllers/userController');

router.route('/users')
    .get(userController.index)
    .post(userController.new)

router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete)

// House Controller & Routes
var homeController = require('../controllers/homeController');

router.route('/homes')
    .get(homeController.index)
    .post(homeController.new)

router.route('/homes/:home_id')
    .get(homeController.view)
    .patch(homeController.update)
    .put(homeController.update)
    .delete(homeController.delete)

module.exports = router;