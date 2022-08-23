const express = require('express')
const { hnxStockList, hnxDetailStock, hnxDetailReportChart, hnxDetailChart } = require('../controllers/stock/vietstock/hnxStockControllers')
const { t, o, h, l, c } = require('../fakedata')

const router = express.Router()

router.get('/stock/hnx', hnxStockList)

router.get('/stock/hnx/:symbol', hnxDetailStock)

router.get('/stock/hnx/chart-report/:symbol', hnxDetailReportChart)

router.get('/stock/hnx/chart/:symbol', hnxDetailChart)

module.exports = router