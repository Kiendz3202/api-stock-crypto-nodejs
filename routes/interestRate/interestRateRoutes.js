const express = require('express');

const router = express.Router();

const {
	agribankbankInterestRateController,
	bidvInterestRateController,
	mbbankInterestRateController,
	scbInterestRateController,
	tpbankInterestRateController,
	vibInterestRateController,
	vietcombankInterestRateController,
	vietinbankInterestRateController,
	vpbankInterestRateController,
} = require('../../controllers/interestRate/interestRateController');

router.get('/interestRate/agribank', agribankbankInterestRateController);
router.get('/interestRate/bidv', bidvInterestRateController);
router.get('/interestRate/mbbank', mbbankInterestRateController);
router.get('/interestRate/scb', scbInterestRateController);
router.get('/interestRate/tpbank', tpbankInterestRateController);
router.get('/interestRate/vib', vibInterestRateController);
router.get('/interestRate/vietcombank', vietcombankInterestRateController);
router.get('/interestRate/vietinbank', vietinbankInterestRateController);
router.get('/interestRate/vpbank', vpbankInterestRateController);

module.exports = router;
