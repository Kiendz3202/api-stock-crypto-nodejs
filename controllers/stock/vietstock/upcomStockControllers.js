const asyncHandler = require('express-async-handler');

const Upcom = require('../../../model/stock/stockList/upcomModel');
const UpcomDetail = require('../../../model/stock/stockDetail/upcomDetailModel');
const UpcomChart = require('../../../model/stock/chartStock/chart/upcomChartModel');
const AllReportChart = require('../../../model/stock/chartStock/reportChart/allReportChartModel');
const AllInvestingDetail = require('../../../model/stock/stockDetail/allInvestingDetailModel');

// const hnxStockList = asyncHandler(async (req, res, next) => {
// 	const stockList = await Hnx.find({}).select(
// 		'-_id -createdAt -updatedAt -__v'
// 	);

// 	res.status(200).json(stockList);
// });

const upcomStockList = async (req, res, next) => {
	const stockList = await Upcom.find({}).select(
		'-_id -createdAt -updatedAt -__v'
	);

	res.status(200).json(stockList);
};

//populate thì đầu tiên cần có data description của tất cả công ty lấy từ web investing đã
const upcomDetailStock = async (req, res, next) => {
	const symbol = req.params.symbol;
	// console.log(symbol)

	const stock = await UpcomDetail.find({
		symbol: symbol,
	})
		// .populate(
		// 	'companyInfo',
		// 	'-_id -createdAt -updatedAt -__v -name -symbol'
		// )
		.select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(stock);
};

const upcomDetailChart = async (req, res, next) => {
	const symbol = req.params.symbol;
	const list = await UpcomChart.find({ symbol: symbol }).select(
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

const upcomDetailReportChart = async (req, res, next) => {
	const symbol = req.params.symbol;
	const listChart = await AllReportChart.find({
		symbol: symbol,
	}).select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(listChart);
};

const upcomCompanyDetail = async (req, res, next) => {
	const symbol = req.params.symbol;

	const list = await AllInvestingDetail.find({
		symbol: symbol,
	}).select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(list);
};

module.exports = {
	upcomStockList,
	upcomDetailStock,
	upcomDetailReportChart,
	upcomDetailChart,
	upcomCompanyDetail,
};
