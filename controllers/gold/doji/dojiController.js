const createError = require('http-errors');

const Doji = require('../../../model/gold/dojiModel');

const dojiData = async (req, res, next) => {
	try {
		const data = await Doji.find().select(
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

module.exports = { dojiData };
