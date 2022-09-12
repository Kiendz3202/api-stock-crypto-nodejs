const asyncHandler = require('express-async-handler');

const Hnx = require('../../../model/stock/stockList/hnxModel');
const HnxDetail = require('../../../model/stock/stockDetail/hnxDetailModel');
const HnxChart = require('../../../model/stock/chartStock/chart/hnxChartModel');
const HnxReportChart = require('../../../model/stock/chartStock/reportChart/hnxReportChartModel');
const HnxInvestingDetail = require('../../../model/stock/stockDetail/hnxInvestingDetailModel');

const hnxStockList = asyncHandler(async (req, res, next) => {
	const stockList = await Hnx.find({}).select(
		'-_id -createdAt -updatedAt -__v'
	);

	res.status(200).json(stockList);
});

const hnxDetailStock = asyncHandler(async (req, res, next) => {
	const symbol = req.params.symbol;
	// console.log(symbol)

	const stock = await HnxDetail.find({
		symbol: symbol,
	})
		.populate(
			'companyInfo',
			'-_id -createdAt -updatedAt -__v -name -symbol'
		)
		.select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(stock);
});

const hnxDetailChart = asyncHandler(async (req, res, next) => {
	const symbol = req.params.symbol;
	const list = await HnxChart.find({ symbol: symbol }).select(
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

	res.status(200).json(list); // muốn return chỉ các trường cần thiết ko bao gồm id và timestamp??chưa làm dc
});

const hnxDetailReportChart = asyncHandler(async (req, res, next) => {
	const symbol = req.params.symbol;
	const listChart = await HnxReportChart.find({
		symbol: symbol,
	}).select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(listChart);
});

const hnxCompanyDetail = asyncHandler(async (req, res, next) => {
	const symbol = req.params.symbol;

	const list = await HnxInvestingDetail.find({
		symbol: symbol,
	}).select('-_id -createdAt -updatedAt -__v');

	res.status(200).json(list);
});

module.exports = {
	hnxStockList,
	hnxDetailStock,
	hnxDetailReportChart,
	hnxDetailChart,
	hnxCompanyDetail,
};
