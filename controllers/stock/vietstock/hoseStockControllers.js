const createError = require('http-errors');

const Hose = require('../../../model/stock/stockList/hoseModel');
const HoseDetail = require('../../../model/stock/stockDetail/hoseDetailModel');
const HoseChart = require('../../../model/stock/chartStock/chart/hoseChartModel');
const AllReportChart = require('../../../model/stock/chartStock/reportChart/allReportChartModel');
const AllInvestingDetail = require('../../../model/stock/stockDetail/allInvestingDetailModel');

// const hnxStockList = asyncHandler(async (req, res, next) => {
// 	const stockList = await Hnx.find({}).select(
// 		'-_id -createdAt -updatedAt -__v'
// 	);

// 	res.status(200).json(stockList);
// });

const hoseStockList = async (req, res, next) => {
	try {
		const perPage = req.query.per_page || 25;
		const page = req.query.page || 1;
		if (
			!(
				Number.isInteger(parseFloat(perPage)) && parseFloat(perPage) > 0
			) ||
			!(Number.isInteger(parseFloat(page)) && parseFloat(page) > 0)
		) {
			throw createError.BadRequest(
				'query per_page and page must be integer and larger than 0'
			);
		}
		const allStock = await Hose.find();
		const allStockLength = allStock.length;
		const countPage = Math.ceil(allStockLength / perPage);

		//-------------pagination by mongoose------------------------
		const stockList = await Hose.find({})
			.sort({ rank: 1 })
			.skip(perPage * page - perPage)
			.limit(perPage)
			.select('-_id -createdAt -updatedAt -__v');

		if (!stockList) {
			throw createError.NotFound('can not find data');
		}

		res.status(200).json({
			status: 'ok',
			data: { stockList, pages: countPage },
		});
	} catch (error) {
		next(error);
	}
};

//populate thì đầu tiên cần có data description của tất cả công ty lấy từ web investing đã
const hoseDetailStock = async (req, res, next) => {
	try {
		const symbol = req.params.symbol;
		// console.log(symbol)

		const stock = await HoseDetail.find({
			symbol: symbol,
		})
			// .populate(
			// 	'companyInfo',
			// 	'-_id -createdAt -updatedAt -__v -name -symbol'
			// )
			.select('-_id -createdAt -updatedAt -__v');

		if (!stock) {
			throw createError.NotFound('can not find data');
		}

		res.status(200).json({ status: 'ok', data: stock });
	} catch (error) {
		next(error);
	}
};

const hoseDetailChart = async (req, res, next) => {
	try {
		const symbol = req.params.symbol;
		const list = await HoseChart.find({ symbol: symbol }).select(
			'-_id -createdAt -updatedAt -__v'
		);

		if (!list) {
			throw createError.NotFound('can not find data');
		}

		res.status(200).json({ status: 'ok', data: list });
	} catch (error) {
		next(error);
	}
};

const hoseDetailReportChart = async (req, res, next) => {
	const symbol = req.params.symbol;
	const listChart = await AllReportChart.find({
		symbol: symbol,
	}).select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(listChart);
};

const hoseCompanyDetail = async (req, res, next) => {
	const symbol = req.params.symbol;

	const list = await AllInvestingDetail.find({
		symbol: symbol,
	}).select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(list);
};

module.exports = {
	hoseStockList,
	hoseDetailStock,
	hoseDetailReportChart,
	hoseDetailChart,
	hoseCompanyDetail,
};
