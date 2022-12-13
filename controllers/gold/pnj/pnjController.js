const createError = require('http-errors');

const Pnj = require('../../../model/gold/pnjModel');

const pnjData = async (req, res, next) => {
	try {
		const data = await Pnj.find().select('-_id -createdAt -updatedAt -__v');

		if (!data) {
			throw createError.NotFound('can not find data');
		}

		res.status(200).json({ status: 'ok', data: data });
	} catch (error) {
		next(error);
	}
};

module.exports = { pnjData };
