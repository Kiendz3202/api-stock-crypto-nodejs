const createError = require('http-errors');

const Sjc = require('../../../model/gold/sjcModel');
const SjcChart = require('../../../model/gold/sjcChartModel');

const sjcDataController = async (req, res, next) => {
	try {
		const data = await Sjc.find().select('-_id -createdAt -updatedAt -__v');

		if (!data) {
			throw createError.NotFound('can not find data');
		}

		res.status(200).json({ status: 'ok', data: data });
	} catch (error) {
		next(error);
	}
};

const sjcChartDataController = async (req, res, next) => {
	try {
		const data = await SjcChart.find().select(
			'-_id -createdAt -updatedAt -__v'
		);

		if (!data) {
			throw createError.NotFound('can not find data');
		}

		res.status(200).json({ status: 'ok', data: data });
	} catch (error) {
		next(error);
	}
};

module.exports = { sjcDataController, sjcChartDataController };
