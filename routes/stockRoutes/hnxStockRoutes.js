const express = require('express');
const {
	hnxStockList,
	hnxDetailStock,
	hnxDetailReportChart,
	hnxDetailChart,
	hnxCompanyDetail,
} = require('../../controllers/stock/vietstock/hnxStockControllers');

const router = express.Router();

router.get('/stock/hnx', hnxStockList);

router.get('/stock/hnx/:symbol', hnxDetailStock);

router.get('/stock/hnx/chart/:symbol', hnxDetailChart);

router.get('/stock/hnx/chart-report/:symbol', hnxDetailReportChart);

router.get('/stock/hnx/company-info/:symbol', hnxCompanyDetail);

module.exports = router;
