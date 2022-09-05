const express = require('express')

const { pnjData } = require('../../controllers/gold/pnj/pnjController')

const router = express.Router()

router.get('/gold/pnj', pnjData)

module.exports = router