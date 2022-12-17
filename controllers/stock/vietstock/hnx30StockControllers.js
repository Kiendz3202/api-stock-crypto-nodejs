const createError = require('http-errors');

const Hnx30 = require('../../../model/stock/stockList/hnx30Model');
const Hnx30Detail = require('../../../model/stock/stockDetail/hnx30DetailModel');
const Hnx30Chart = require('../../../model/stock/chartStock/chart/hnx30ChartModel');
const AllReportChart = require('../../../model/stock/chartStock/reportChart/allReportChartModel');
const AllInvestingDetail = require('../../../model/stock/stockDetail/allInvestingDetailModel');

// const hnxStockList = asyncHandler(async (req, res, next) => {
// 	const stockList = await Hnx.find({}).select(
// 		'-_id -createdAt -updatedAt -__v'
// 	);

// 	res.status(200).json(stockList);
// });

const hnx30StockList = async (req, res, next) => {
	try {
		const perPage = req.query.per_page || 25;
		const page = req.query.page || 1;
		const allStock = await Hnx30.find();
		const allStockLength = allStock.length;
		const countPage = Math.ceil(allStockLength / perPage);

		//-------------pagination by mongoose------------------------
		const stockList = await Hnx30.find({})
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
const hnx30DetailStock = async (req, res, next) => {
	try {
		const symbol = req.params.symbol;
		// console.log(symbol)

		const stock = await Hnx30Detail.find({
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

const hnx30DetailChart = async (req, res, next) => {
	try {
		const symbol = req.params.symbol;
		const list = await Hnx30Chart.find({ symbol: symbol }).select(
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

const hnx30DetailReportChart = async (req, res, next) => {
	const symbol = req.params.symbol;
	const listChart = await AllReportChart.find({
		symbol: symbol,
	}).select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(listChart);
};

const hnx30CompanyDetail = async (req, res, next) => {
	const symbol = req.params.symbol;

	const list = await AllInvestingDetail.find({
		symbol: symbol,
	}).select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(list);
};

module.exports = {
	hnx30StockList,
	hnx30DetailStock,
	hnx30DetailReportChart,
	hnx30DetailChart,
	hnx30CompanyDetail,
};
