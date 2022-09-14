const express = require('express');

const {
	sjcDataController,
	sjcChartDataController,
} = require('../../controllers/gold/sjc/sjcController');

const router = express.Router();

router.get('/gold/sjc', sjcDataController);
router.get('/gold/chart/sjc', sjcChartDataController);

module.exports = router;
