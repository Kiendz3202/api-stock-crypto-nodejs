const createError = require('http-errors');

const Petrolimex = require('../../model/petrol/petrolimexModel');

const petrolPriceController = async (req, res, next) => {
	try {
		const data = await Petrolimex.find().select(
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

module.exports = { petrolPriceController };
