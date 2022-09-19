const express = require('express');
const {
	hoseStockList,
	hoseDetailStock,
	hoseDetailReportChart,
	hoseDetailChart,
	hoseCompanyDetail,
} = require('../../controllers/stock/vietstock/hoseStockControllers');

const router = express.Router();

router.get('/stock/hose', hoseStockList);

router.get('/stock/hose/:symbol', hoseDetailStock);

router.get('/stock/hose/chart/:symbol', hoseDetailChart);

router.get('/stock/hose/chart-report/:symbol', hoseDetailReportChart);

router.get('/stock/hose/company-info/:symbol', hoseCompanyDetail);

module.exports = router;
