const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
// const usersController = require('../controllers/usersControllers');

router.get('/', mainController.index)

router.get('/register', mainController.registerGet)
router.get('/login', mainController.loginGet)

// router.get('/productos', mainController.productos)
// /router.get('/login-register', usersController.loginRegister)
router.get('/productCart', mainController.cart)


module.exports = router;