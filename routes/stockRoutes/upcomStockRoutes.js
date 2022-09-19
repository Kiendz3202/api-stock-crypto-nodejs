const express = require('express');
const {
	upcomStockList,
	upcomDetailStock,
	upcomDetailReportChart,
	upcomDetailChart,
	upcomCompanyDetail,
} = require('../../controllers/stock/vietstock/upcomStockControllers');

const router = express.Router();

router.get('/stock/upcom', upcomStockList);

router.get('/stock/upcom/:symbol', upcomDetailStock);

router.get('/stock/upcom/chart/:symbol', upcomDetailChart);

router.get('/stock/upcom/chart-report/:symbol', upcomDetailReportChart);

router.get('/stock/upcom/company-info/:symbol', upcomCompanyDetail);

module.exports = router;
