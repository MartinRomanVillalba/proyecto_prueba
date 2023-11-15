const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersControllers');

router.get('/register', usersController.registerGet)
router.get('/login', usersController.loginGet)



module.exports = router;