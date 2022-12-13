const createError = require('http-errors');

const AgribankbankInterestRate = require('../../model/interestRate/agribankInterestRateModel');
const BidvInterestRate = require('../../model/interestRate/bidvInterestRateModel');
const MbbankInterestRate = require('../../model/interestRate/mbbankInterestRateModel');
const ScbInterestRate = require('../../model/interestRate/scbInterestRateModel');
const VibInterestRate = require('../../model/interestRate/vibInterestRateModel');
const VietcombankInterestRate = require('../../model/interestRate/vietcombankInterestRateModel');
const VietinbankInterestRate = require('../../model/interestRate/vietinbankInterestRateModel');

const agribankbankInterestRateController = async (req, res, next) => {
	try {
		const data = await AgribankbankInterestRate.find().select(
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
const bidvInterestRateController = async (req, res, next) => {
	try {
		const data = await BidvInterestRate.find().select(
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

const mbbankInterestRateController = async (req, res, next) => {
	try {
		const data = await MbbankInterestRate.find().select(
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

const scbInterestRateController = async (req, res, next) => {
	try {
		const data = await ScbInterestRate.find().select(
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

const vibInterestRateController = async (req, res, next) => {
	try {
		const data = await VibInterestRate.find().select(
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

const vietcombankInterestRateController = async (req, res, next) => {
	try {
		const data = await VietcombankInterestRate.find().select(
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
const vietinbankInterestRateController = async (req, res, next) => {
	try {
		const data = await VietinbankInterestRate.find().select(
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
	agribankbankInterestRateController,
	bidvInterestRateController,
	mbbankInterestRateController,
	scbInterestRateController,
	vibInterestRateController,
	vietcombankInterestRateController,
	vietinbankInterestRateController,
};
