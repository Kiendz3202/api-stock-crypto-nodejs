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

const HnxChart = require('../../model/stock/chartStock/chart/hnxChartModel');
const AllReportChart = require('../../model/stock/chartStock/reportChart/allReportChartModel');

const crawlDetailChartHnx = asyncHandler(async (symbol) => {
	let currentTime = Math.floor(Date.now() / 1000);
	axios
		.get(
			`https://api.vietstock.vn/ta/history?symbol=${symbol}&resolution=D&from=1500000000&to=${currentTime}`
		)
		.then((response) => {
			const data = JSON.parse(response.data);
			HnxChart.findOneAndUpdate(
				{ symbol: symbol },
				{
					symbol: symbol,
					t: data.t,
					o: data.o,
					h: data.h,
					l: data.l,
					c: data.c,
				},
				{ upsert: true }
			)
				.then((doc) => console.log(doc))
				.catch((err) => console.log(err));
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = { crawlDetailChartHnx };
