const express = require('express')

const { sjcData } = require('../../controllers/gold/sjc/sjcController')

const router = express.Router()

router.get('/gold/sjc', sjcData)

module.exports = router