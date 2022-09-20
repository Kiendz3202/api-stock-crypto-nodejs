const express = require('express');

const {
	paginationPageCoinController,
	detailCoinController,
	coinChartController,
} = require('../../controllers/coin/CoinControllers');

const router = express.Router();

// router.get('/hb', autoAddTredingCoin)

router.get('/coin/:page', paginationPageCoinController);
router.get('/coin/detail/:coin', detailCoinController);
router.get('/coin/chart/:coin', coinChartController);

module.exports = router;
