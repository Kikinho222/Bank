const express = require('express');
const { verifyToken } = require('../Middleware/AuthMiddleware');
const AccountController = require('../Controllers/AccountController');

const router = express.Router();


router.post('/register', AccountController.register);
router.post('/login', AccountController.login);
//router.post('/verifyEmail', AccountController.verifyEmail);

router.get('/account', verifyToken, AccountController.getAccount);
router.post('/account-verification', AccountController.verifyAccount);

module.exports = router;
