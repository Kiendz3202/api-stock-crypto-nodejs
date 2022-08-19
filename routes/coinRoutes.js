const express = require('express')

const { paginationPageCoin, detailCoin } = require('../controllers/CoinControllers')

const router = express.Router()

// router.get('/hb', autoAddTredingCoin)

router.get('/coinlist/:page', paginationPageCoin)
router.get('/coins/:coin', detailCoin)

module.exports = router