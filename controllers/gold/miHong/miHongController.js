const createError = require('http-errors');

const MiHong = require('../../../model/gold/miHongModel');

const miHongData = async (req, res, next) => {
	try {
		const data = await MiHong.find().select(
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

module.exports = { miHongData };
