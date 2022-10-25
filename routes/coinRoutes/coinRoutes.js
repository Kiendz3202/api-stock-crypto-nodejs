const express = require('express');

const {
	paginationPageCoinController,
	detailCoinController,
	coinChartController,
} = require('../../controllers/coin/CoinControllers');
const { verifytoken } = require('../../utils/jwt-service/jwt_service');

const router = express.Router();

// router.get('/hb', autoAddTredingCoin)

router.get('/coin/:page', verifytoken, paginationPageCoinController);
router.get('/coin/detail/:coin', detailCoinController);
router.get('/coin/chart/:coin', coinChartController);

module.exports = router;
