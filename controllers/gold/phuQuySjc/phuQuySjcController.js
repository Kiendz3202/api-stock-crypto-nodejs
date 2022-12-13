const createError = require('http-errors');

const PhuQuySjc = require('../../../model/gold/phuquysjcModel');

const phuQuyData = async (req, res, next) => {
	try {
		const data = await PhuQuySjc.find().select(
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

module.exports = { phuQuyData };
