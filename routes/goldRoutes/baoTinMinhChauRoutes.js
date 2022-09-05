const express = require('express')

const { baoTinMinhChauData } = require('../../controllers/gold/baoTinMinhChau/baoTinMinhChauController')

const router = express.Router()

router.get('/gold/baotinminhchau', baoTinMinhChauData)

module.exports = router