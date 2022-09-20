const asyncHandler = require('express-async-handler');

const Petrolimex = require('../../model/petrol/petrolimexModel');

const petrolPriceController = async (req, res, next) => {
	try {
		const data = await Petrolimex.find().select(
			'-_id -createdAt -updatedAt -__v'
		);

		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
};

module.exports = { petrolPriceController };
