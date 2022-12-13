const createError = require('http-errors');

const Vn30 = require('../../../model/stock/stockList/vn30Model');
const Vn30Detail = require('../../../model/stock/stockDetail/vn30DetailModel');
const Vn30Chart = require('../../../model/stock/chartStock/chart/vn30ChartModel');
const AllReportChart = require('../../../model/stock/chartStock/reportChart/allReportChartModel');
const AllInvestingDetail = require('../../../model/stock/stockDetail/allInvestingDetailModel');

// const hnxStockList = asyncHandler(async (req, res, next) => {
// 	const stockList = await Hnx.find({}).select(
// 		'-_id -createdAt -updatedAt -__v'
// 	);

// 	res.status(200).json(stockList);
// });

const vn30StockList = async (req, res, next) => {
	try {
		const stockList = await Vn30.find({}).select(
			'-_id -createdAt -updatedAt -__v'
		);

		if (!stockList) {
			throw createError.NotFound('can not find data');
		}

		res.status(200).json({ status: 'ok', data: stockList });
	} catch (error) {
		next(error);
	}
};

//populate thì đầu tiên cần có data description của tất cả công ty lấy từ web investing đã
const vn30DetailStock = async (req, res, next) => {
	try {
		const symbol = req.params.symbol;
		// console.log(symbol)

		const stock = await Vn30Detail.find({
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

const vn30DetailChart = async (req, res, next) => {
	try {
		const symbol = req.params.symbol;
		const list = await Vn30Chart.find({ symbol: symbol }).select(
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

const vn30DetailReportChart = async (req, res, next) => {
	const symbol = req.params.symbol;
	const listChart = await AllReportChart.find({
		symbol: symbol,
	}).select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(listChart);
};

const vn30CompanyDetail = async (req, res, next) => {
	const symbol = req.params.symbol;

	const list = await AllInvestingDetail.find({
		symbol: symbol,
	}).select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(list);
};

module.exports = {
	vn30StockList,
	vn30DetailStock,
	vn30DetailReportChart,
	vn30DetailChart,
	vn30CompanyDetail,
};
