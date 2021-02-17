const express = require('express')

const router = express.Router();

const loginController = require('../controllers/loginController');

router.get('/', loginController.login);
router.post('/loginUser', loginController.loginUser);
router.get('/logout', loginController.logout);
router.get('/profile',   loginController.profile);

router.get('/signin',   require('./signinRoute'));
router.post('/create',   require('./signinRoute'));


module.exports = router; 

