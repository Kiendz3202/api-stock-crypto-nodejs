const asyncHandler = require('express-async-handler');

const Agribank = require('../../../model/exchangeRate/agribankModel');
const Bidv = require('../../../model/exchangeRate/bidvModel');
const Mbbank = require('../../../model/exchangeRate/mbbankModel');
const Techcombank = require('../../../model/exchangeRate/techcombankModel');
const Vietcombank = require('../../../model/exchangeRate/vietcombankModel');
const VietinBank = require('../../../model/exchangeRate/vietinbankModel');

const agribankController = asyncHandler(async (req, res, next) => {
	try {
		const data = await Agribank.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const bidvController = asyncHandler(async (req, res, next) => {
	try {
		const data = await Bidv.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const mbbankController = asyncHandler(async (req, res, next) => {
	try {
		const data = await Mbbank.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const techcombankController = asyncHandler(async (req, res, next) => {
	try {
		const data = await Techcombank.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const vietcombankController = asyncHandler(async (req, res, next) => {
	try {
		const data = await Vietcombank.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const vietinbankController = asyncHandler(async (req, res, next) => {
	try {
		const data = await VietinBank.find().select(
			'-_id -createdAt -updatedAt -__v'
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = {
	agribankController,
	bidvController,
	mbbankController,
	techcombankController,
	vietcombankController,
	vietinbankController,
};
