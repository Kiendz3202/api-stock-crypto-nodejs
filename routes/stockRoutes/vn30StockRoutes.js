const express = require('express');
const {
	vn30StockList,
	vn30DetailStock,
	vn30DetailReportChart,
	vn30DetailChart,
	vn30CompanyDetail,
} = require('../../controllers/stock/vietstock/vn30StockControllers');

const router = express.Router();

router.get('/stock/vn30', vn30StockList);

router.get('/stock/vn30/:symbol', vn30DetailStock);

router.get('/stock/vn30/chart/:symbol', vn30DetailChart);

router.get('/stock/vn30/chart-report/:symbol', vn30DetailReportChart);

router.get('/stock/vn30/company-info/:symbol', vn30CompanyDetail);

module.exports = router;
