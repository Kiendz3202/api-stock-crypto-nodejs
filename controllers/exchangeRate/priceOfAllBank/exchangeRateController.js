const createError = require('http-errors');

const Agribank = require('../../../model/exchangeRate/agribankModel');
const Bidv = require('../../../model/exchangeRate/bidvModel');
const Mbbank = require('../../../model/exchangeRate/mbbankModel');
const Techcombank = require('../../../model/exchangeRate/techcombankModel');
const Vietcombank = require('../../../model/exchangeRate/vietcombankModel');
const VietinBank = require('../../../model/exchangeRate/vietinbankModel');

const agribankController = async (req, res, next) => {
	try {
		const data = await Agribank.find().select(
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

const bidvController = async (req, res, next) => {
	try {
		const data = await Bidv.find().select(
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

const mbbankController = async (req, res, next) => {
	try {
		const data = await Mbbank.find().select(
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

const techcombankController = async (req, res, next) => {
	try {
		const data = await Techcombank.find().select(
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

const vietcombankController = async (req, res, next) => {
	try {
		const data = await Vietcombank.find().select(
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

const vietinbankController = async (req, res, next) => {
	try {
		const data = await VietinBank.find().select(
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

module.exports = {
	agribankController,
	bidvController,
	mbbankController,
	techcombankController,
	vietcombankController,
	vietinbankController,
};
