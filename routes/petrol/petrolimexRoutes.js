const express = require('express');

const {
	petrolPriceController,
} = require('../../controllers/petrol/petrolimexControllers');

const router = express.Router();

router.get('/petrol/petrolimex', petrolPriceController);

module.exports = router;
