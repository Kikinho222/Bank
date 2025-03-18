const { verifyToken } = require('../Middleware/AuthMiddleware');
const express = require('express');

const router = express.Router();

const TransactionsController = require('../Controllers/TransactionsController');

router.post('/send', verifyToken, TransactionsController.send);
router.get('/getTransactions', TransactionsController.getTransactions);

module.exports = router;
