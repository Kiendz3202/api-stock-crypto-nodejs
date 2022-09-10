const asyncHandler = require('express-async-handler');

const AgribankbankInterestRate = require('../../model/interestRate/agribankInterestRateModel');
const BidvInterestRate = require('../../model/interestRate/bidvInterestRateModel');
const MbbankInterestRate = require('../../model/interestRate/mbbankInterestRateModel');
const ScbInterestRate = require('../../model/interestRate/scbInterestRateModel');
const TpbankInterestRate = require('../../model/interestRate/tpbankInterestRateModel');
const VibInterestRate = require('../../model/interestRate/vibInterestRateModel');
const VietcombankInterestRate = require('../../model/interestRate/vietcombankInterestRateModel');
const VietinbankInterestRate = require('../../model/interestRate/vietinbankInterestRateModel');
const VpbankInterestRate = require('../../model/interestRate/vpbankInterestRateModel');

const agribankbankInterestRateController = asyncHandler(
	async (req, res, next) => {
		try {
			const data = await AgribankbankInterestRate.find().select(
				'-_id -createdAt -updatedAt -__v'
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}
);

const bidvInterestRateController = asyncHandler(async (req, res, next) => {
	try {
		const data = await BidvInterestRate.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const mbbankInterestRateController = asyncHandler(async (req, res, next) => {
	try {
		const data = await MbbankInterestRate.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const scbInterestRateController = asyncHandler(async (req, res, next) => {
	try {
		const data = await ScbInterestRate.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const tpbankInterestRateController = asyncHandler(async (req, res, next) => {
	try {
		const data = await TpbankInterestRate.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const vibInterestRateController = asyncHandler(async (req, res, next) => {
	try {
		const data = await VibInterestRate.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const vietcombankInterestRateController = asyncHandler(
	async (req, res, next) => {
		try {
			const data = await VietcombankInterestRate.find().select(
				'-_id -createdAt -updatedAt -__v'
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}
);

const vietinbankInterestRateController = asyncHandler(
	async (req, res, next) => {
		try {
			const data = await VietinbankInterestRate.find().select(
				'-_id -createdAt -updatedAt -__v'
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}
);

const vpbankInterestRateController = asyncHandler(async (req, res, next) => {
	try {
		const data = await VpbankInterestRate.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = {
	agribankbankInterestRateController,
	bidvInterestRateController,
	mbbankInterestRateController,
	scbInterestRateController,
	tpbankInterestRateController,
	vibInterestRateController,
	vietcombankInterestRateController,
	vietinbankInterestRateController,
	vpbankInterestRateController,
};
