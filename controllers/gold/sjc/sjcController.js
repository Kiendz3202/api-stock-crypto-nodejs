const asyncHandler = require('express-async-handler');

const Sjc = require('../../../model/gold/sjcModel');
const SjcChart = require('../../../model/gold/sjcChartModel');

const sjcDataController = asyncHandler(async (req, res, next) => {
	try {
		const data = await Sjc.find().select('-_id -createdAt -updatedAt -__v');
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const sjcChartDataController = asyncHandler(async (req, res, next) => {
	try {
		const data = await SjcChart.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = { sjcDataController, sjcChartDataController };
