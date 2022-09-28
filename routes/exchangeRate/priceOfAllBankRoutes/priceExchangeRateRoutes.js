const express = require('express');

const {
	agribankController,
	bidvController,
	mbbankController,
	techcombankController,
	vietcombankController,
	vietinbankController,
} = require('../../../controllers/exchangeRate/priceOfAllBank/exchangeRateController');

const router = express.Router();

router.get('/exchangeRate/agribank', agribankController);
router.get('/exchangeRate/bidv', bidvController);
router.get('/exchangeRate/mbbank', mbbankController);
router.get('/exchangeRate/techcombank', techcombankController);
router.get('/exchangeRate/vietcombank', vietcombankController);
router.get('/exchangeRate/vietinbank', vietinbankController);

module.exports = router;
