const express = require('express')

const { phuQuyData } = require('../../controllers/gold/phuQuySjc/phuQuySjcController')

const router = express.Router()

router.get('/gold/phuquysjc', phuQuyData)

module.exports = router