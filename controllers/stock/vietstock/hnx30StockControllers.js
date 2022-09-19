const asyncHandler = require('express-async-handler');

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
	const stockList = await Hnx30.find({}).select(
		'-_id -createdAt -updatedAt -__v'
	);

	res.status(200).json(stockList);
};

//populate thì đầu tiên cần có data description của tất cả công ty lấy từ web investing đã
const hnx30DetailStock = async (req, res, next) => {
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

	res.status(200).json(stock);
};

const hnx30DetailChart = async (req, res, next) => {
	const symbol = req.params.symbol;
	const list = await Hnx30Chart.find({ symbol: symbol }).select(
		'-_id -createdAt -updatedAt -__v'
	);
	// let arr = []
	// for (let i = 0; i < 1042; i++) {
	//     let todayDate = new Date(t[i] * 1000).toISOString()
	//     arr.push({
	//         time: todayDate.slice(0, 10),
	//         open: o[i],
	//         high: h[i],
	//         low: l[i],
	//         close: c[i]
	//     })
	// }

	res.status(200).json(list);
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
