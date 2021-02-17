const express = require('express');

const router = express.Router();

const signinController = require('../controllers/signinController');

router.get('/signin',   signinController.signin);
router.post('/create',   signinController.create);
module.exports = router;