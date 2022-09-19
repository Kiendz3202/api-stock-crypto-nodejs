const asyncHandler = require('express-async-handler');

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
	const stockList = await Vn30.find({}).select(
		'-_id -createdAt -updatedAt -__v'
	);

	res.status(200).json(stockList);
};

//populate thì đầu tiên cần có data description của tất cả công ty lấy từ web investing đã
const vn30DetailStock = async (req, res, next) => {
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

	res.status(200).json(stock);
};

const vn30DetailChart = async (req, res, next) => {
	const symbol = req.params.symbol;
	const list = await Vn30Chart.find({ symbol: symbol }).select(
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
