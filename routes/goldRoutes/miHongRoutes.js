const express = require('express')

const { miHongData } = require('../../controllers/gold/miHong/miHongController')

const router = express.Router()

router.get('/gold/mihong', miHongData)

module.exports = router