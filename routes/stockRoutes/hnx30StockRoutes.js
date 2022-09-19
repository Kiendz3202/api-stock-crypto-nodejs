const express = require('express');
const {
	hnx30StockList,
	hnx30DetailStock,
	hnx30DetailReportChart,
	hnx30DetailChart,
	hnx30CompanyDetail,
} = require('../../controllers/stock/vietstock/hnx30StockControllers');

const router = express.Router();

router.get('/stock/hnx30', hnx30StockList);

router.get('/stock/hnx30/:symbol', hnx30DetailStock);

router.get('/stock/hnx30/chart/:symbol', hnx30DetailChart);

router.get('/stock/hnx30/chart-report/:symbol', hnx30DetailReportChart);

router.get('/stock/hnx30/company-info/:symbol', hnx30CompanyDetail);

module.exports = router;
