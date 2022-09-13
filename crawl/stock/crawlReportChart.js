const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const axios = require('axios');
const puppeteer = require('puppeteer');
const Hnx30 = require('../../model/stock/stockList/hnx30Model');
const Hnx = require('../../model/stock/stockList/hnxModel');
const Vn30 = require('../../model/stock/stockList/vn30Model');
const Hose = require('../../model/stock/stockList/hoseModel');
const Upcom = require('../../model/stock/stockList/upcomModel');

const Hnx30Detail = require('../../model/stock/stockDetail/hnx30DetailModel');
const HnxDetail = require('../../model/stock/stockDetail/hnxDetailModel');
const HoseDetail = require('../../model/stock/stockDetail/hoseDetailModel');
const Vn30Detail = require('../../model/stock/stockDetail/vn30DetailModel');
const UpcomDetail = require('../../model/stock/stockDetail/upcomDetailModel');

const AllInvestingDetail = require('../../model/stock/stockDetail/allInvestingDetailModel');

const AllReportChart = require('../../model/stock/chartStock/reportChart/allReportChartModel');

const crawlDetailReportChartHnx = asyncHandler(async (id, symbol) => {
	// cron.schedule('*/20 * * * * *', async () => {
	axios
		.get(
			`https://api.investing.com/api/financialdata/revenue/chart/?instrumentid=${id}&period=Annual&pointscount=8`
		)
		.then((response) => {
			AllReportChart.findOneAndUpdate(
				{ id: id },
				{
					id: id,
					symbol: symbol,
					interval: response.data.chart_data.interval,
					datasets: response.data.chart_data.datasets,
				},
				{ upsert: true }
			)
				.then((doc) => console.log(doc))
				.catch((err) => console.log(err));
		})
		.catch((err) => {
			console.log(err);
		});
	// })
});

module.exports = { crawlDetailReportChartHnx };
