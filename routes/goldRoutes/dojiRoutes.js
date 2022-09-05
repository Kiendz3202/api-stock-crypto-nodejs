const express = require('express')

const { dojiData } = require('../../controllers/gold/doji/dojiController')

const router = express.Router()

router.get('/gold/doji', dojiData)

module.exports = router