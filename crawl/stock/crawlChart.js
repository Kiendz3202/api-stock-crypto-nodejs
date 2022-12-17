const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const axios = require('axios');
const puppeteer = require('puppeteer');
const { uploadErrorToDb } = require('../../utils/handleError');
const Hnx30 = require('../../model/stock/stockList/hnx30Model');
// const Hnx = require('../../model/stock/stockList/hnxModel');
// const Vn30 = require('../../model/stock/stockList/vn30Model');
// const Hose = require('../../model/stock/stockList/hoseModel');
// const Upcom = require('../../model/stock/stockList/upcomModel');

// const Hnx30Detail = require('../../model/stock/stockDetail/hnx30DetailModel');
// const HnxDetail = require('../../model/stock/stockDetail/hnxDetailModel');
// const HoseDetail = require('../../model/stock/stockDetail/hoseDetailModel');
// const Vn30Detail = require('../../model/stock/stockDetail/vn30DetailModel');
// const UpcomDetail = require('../../model/stock/stockDetail/upcomDetailModel');

// const AllInvestingDetail = require('../../model/stock/stockDetail/allInvestingDetailModel');

const { delay } = require('../../utils/promise/delayTime/delay');
const Hnx30Chart = require('../../model/stock/chartStock/chart/hnx30ChartModel');
const Hnx = require('../../model/stock/stockList/hnxModel');
const HnxChart = require('../../model/stock/chartStock/chart/hnxChartModel');
const Vn30 = require('../../model/stock/stockList/vn30Model');
const Vn30Chart = require('../../model/stock/chartStock/chart/vn30ChartModel');
const Hose = require('../../model/stock/stockList/hoseModel');
const HoseChart = require('../../model/stock/chartStock/chart/hoseChartModel');
const Upcom = require('../../model/stock/stockList/upcomModel');
const UpcomChart = require('../../model/stock/chartStock/chart/upcomChartModel');
// const AllReportChart = require('../../model/stock/chartStock/reportChart/allReportChartModel');

const crawlChartHnx30 = asyncHandler(async (symbol) => {
	const hnx30Stocks = await Hnx30.find({});
	let currentTime = Math.floor(Date.now() / 1000);
	let count = 0;

	for (const stock of hnx30Stocks) {
		await axios
			.get(
				`https://dchart-api.vndirect.com.vn/dchart/history?resolution=5&symbol=${stock.symbol}&from=1450000000&to=${currentTime}`
			)
			.then((response) => {
				const data = response.data;
				if (data) {
					count++;
					Hnx30Chart.findOneAndUpdate(
						{ symbol: stock.symbol },
						{
							symbol: stock.symbol,
							t: data.t,
							price: data.o,
						},
						{ upsert: true }
					)
						// .then((doc) =>
						// 	console.log(stock.symbol + ' chart HNX30')
						// )
						.catch((err) => {
							console.log(err.message);
							uploadErrorToDb(err.message);
						});
				}
			})
			.catch((err) => {
				{
					console.log(err.message);
					uploadErrorToDb(err.message);
				}
			});
		await delay(1000);
	}
	// console.log(count + ' chart HNX30');
});

const crawlChartHnx = asyncHandler(async (symbol) => {
	const hnxStocks = await Hnx.find({});
	let currentTime = Math.floor(Date.now() / 1000);
	let count = 0;

	for (const stock of hnxStocks) {
		await axios
			.get(
				`https://dchart-api.vndirect.com.vn/dchart/history?resolution=5&symbol=${stock.symbol}&from=1450000000&to=${currentTime}`
			)
			.then((response) => {
				const data = response.data;
				if (data) {
					count++;
					HnxChart.findOneAndUpdate(
						{ symbol: stock.symbol },
						{
							symbol: stock.symbol,
							t: data.t,
							price: data.o,
						},
						{ upsert: true }
					)
						// .then((doc) => console.log(stock.symbol + ' chart HNX'))
						.catch((err) => {
							console.log(err.message);
							uploadErrorToDb(err.message);
						});
				}
			})
			.catch((err) => {
				{
					console.log(err.message);
					uploadErrorToDb(err.message);
				}
			});
		await delay(1000);
	}
	// console.log(count + ' chart HNX');
});

const crawlChartVn30 = asyncHandler(async (symbol) => {
	const vn30Stocks = await Vn30.find({});
	let currentTime = Math.floor(Date.now() / 1000);
	let count = 0;

	for (const stock of vn30Stocks) {
		await axios
			.get(
				`https://dchart-api.vndirect.com.vn/dchart/history?resolution=5&symbol=${stock.symbol}&from=1450000000&to=${currentTime}`
			)
			.then((response) => {
				const data = response.data;
				if (data) {
					count++;
					Vn30Chart.findOneAndUpdate(
						{ symbol: stock.symbol },
						{
							symbol: stock.symbol,
							t: data.t,
							price: data.o,
						},
						{ upsert: true }
					)
						// .then((doc) =>
						// 	console.log(stock.symbol + ' chart VN30')
						// )
						.catch((err) => {
							console.log(err.message);
							uploadErrorToDb(err.message);
						});
				}
			})
			.catch((err) => {
				{
					console.log(err.message);
					uploadErrorToDb(err.message);
				}
			});
		await delay(1000);
	}
	// console.log(count + ' chart VN30');
});

const crawlChartHose = asyncHandler(async (symbol) => {
	const hoseStocks = await Hose.find({});
	let currentTime = Math.floor(Date.now() / 1000);
	let count = 0;

	for (const stock of hoseStocks) {
		await axios
			.get(
				`https://dchart-api.vndirect.com.vn/dchart/history?resolution=5&symbol=${stock.symbol}&from=1450000000&to=${currentTime}`
			)
			.then((response) => {
				const data = response.data;
				if (data) {
					count++;
					HoseChart.findOneAndUpdate(
						{ symbol: stock.symbol },
						{
							symbol: stock.symbol,
							t: data.t,
							price: data.o,
						},
						{ upsert: true }
					)
						// .then((doc) =>
						// 	console.log(stock.symbol + ' chart HOSE')
						// )
						.catch((err) => {
							console.log(err.message);
							uploadErrorToDb(err.message);
						});
				}
			})
			.catch((err) => {
				{
					console.log(err.message);
					uploadErrorToDb(err.message);
				}
			});
		await delay(1000);
	}
	// console.log(count + ' chart HOSE');
});

const crawlChartUpcom = asyncHandler(async (symbol) => {
	const upcomStocks = await Upcom.find({});
	let currentTime = Math.floor(Date.now() / 1000);
	let count = 0;

	for (const stock of upcomStocks) {
		await axios
			.get(
				`https://dchart-api.vndirect.com.vn/dchart/history?resolution=5&symbol=${stock.symbol}&from=1450000000&to=${currentTime}`
			)
			.then((response) => {
				const data = response.data;
				if (data) {
					count++;
					UpcomChart.findOneAndUpdate(
						{ symbol: stock.symbol },
						{
							symbol: stock.symbol,
							t: data.t,
							price: data.o,
						},
						{ upsert: true }
					)
						// .then((doc) =>
						// 	console.log(stock.symbol + ' chart UPCOM')
						// )
						.catch((err) => {
							console.log(err.message);
							uploadErrorToDb(err.message);
						});
				}
			})
			.catch((err) => {
				{
					console.log(err.message);
					uploadErrorToDb(err.message);
				}
			});
		await delay(1000);
	}
	// console.log(count + ' chart UPCOM');
});

module.exports = {
	crawlChartHnx30,
	crawlChartHnx,
	crawlChartVn30,
	crawlChartHose,
	crawlChartUpcom,
};
