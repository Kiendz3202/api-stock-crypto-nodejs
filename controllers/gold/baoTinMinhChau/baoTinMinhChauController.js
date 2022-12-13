const createError = require('http-errors');

const BaoTinMinhChau = require('../../../model/gold/baoTinMinhchauModel');

const baoTinMinhChauData = async (req, res, next) => {
	try {
		const data = await BaoTinMinhChau.find().select(
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

module.exports = { baoTinMinhChauData };
