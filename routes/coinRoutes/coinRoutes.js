const express = require('express');

const {
	paginationPageCoinController,
	detailCoinController,
	coinChartController,
} = require('../../controllers/coin/CoinControllers');
const { verifytoken } = require('../../utils/jwt-service/jwt_service');

const router = express.Router();

// router.get('/hb', autoAddTredingCoin)

// router.get('/coin/:page', verifytoken, paginationPageCoinController);
router.get('/coin/:page', verifytoken, paginationPageCoinController);
router.get('/coin/detail/:nameId', detailCoinController);
router.get('/coin/chart/:nameId', coinChartController);

module.exports = router;
