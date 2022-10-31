const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const axios = require('axios');
const puppeteer = require('puppeteer');

const {
	collectQueryData,
	collectQueryDataHeightScroll,
} = require('../../utils/pupperteer/collectQueryData');

const Hnx30Detail = require('../../model/stock/stockDetail/hnx30DetailModel');
const HnxDetail = require('../../model/stock/stockDetail/hnxDetailModel');
const HoseDetail = require('../../model/stock/stockDetail/hoseDetailModel');
const Vn30Detail = require('../../model/stock/stockDetail/vn30DetailModel');
const UpcomDetail = require('../../model/stock/stockDetail/upcomDetailModel');

const AllInvestingDetail = require('../../model/stock/stockDetail/allInvestingDetailModel');

const HnxChart = require('../../model/stock/chartStock/chart/hnxChartModel');
const Hnx30Chart = require('../../model/stock/chartStock/chart/hnx30ChartModel');
const HoseChart = require('../../model/stock/chartStock/chart/hoseChartModel');
const Vn30Chart = require('../../model/stock/chartStock/chart/vn30ChartModel');
const UpcomChart = require('../../model/stock/chartStock/chart/upcomChartModel');
const Hnx30 = require('../../model/stock/stockList/hnx30Model');
const Hnx = require('../../model/stock/stockList/hnxModel');
const { delay } = require('../../utils/promise/delayTime/delay');
const Vn30 = require('../../model/stock/stockList/vn30Model');
const Hose = require('../../model/stock/stockList/hoseModel');
const Upcom = require('../../model/stock/stockList/upcomModel');

//----------------------main body-------------------------------------

// const page = await browser.newPage();
// 				await page.goto(
// 					`https://finance.vietstock.vn/${stock.symbol}/tai-chinh.htm`,
// 					{ waitUntil: 'load' }
// 				);
// 				await page.waitForTimeout(2000);

// 				let hnx30DetailData = await page.evaluate(

const crawlDetailHnx30 = async () => {
	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: [
				'--no-sandbox',
				'--disabled-setupid-sandbox',
				'--disable-accelerated-2d-canvas',
			],
		});
		const hnx30All = await Hnx30.find();

		//start loop
		console.log('starting HNX30...............');
		hnx30All.map(async (stock, index) => {
			setTimeout(async () => {
				const page = await browser.newPage();
				await page.goto(
					`https://finance.vietstock.vn/${stock.symbol}/tai-chinh.htm`
				);
				// await page.waitForTimeout(2000);
				await page.waitForSelector('.stock-price-info');

				let hnx30DetailData = await page.evaluate(
					async (
						name,
						symbol,
						reference,
						ceil,
						floor,
						currentPrice,
						high,
						low,
						change,
						changePercent,
						turnOver
					) => {
						const $ = document.querySelector.bind(document);

						let dataJson = {};

						try {
							dataJson.name = name;
							dataJson.symbol = symbol;
							dataJson.reference = reference;
							dataJson.ceil = ceil;
							dataJson.floor = floor;
							dataJson.currentPrice = currentPrice;
							dataJson.high = high;
							dataJson.low = low;
							dataJson.change = change;
							dataJson.changePercent = changePercent;
							dataJson.openPrice =
								document.getElementById('openprice')?.innerText;
							dataJson.turnOver = turnOver;
							dataJson.marketcap = $(
								'.stock-price-info :nth-child(2) :nth-child(5) b'
							)?.innerText;
							dataJson.overBought = $(
								'.stock-price-info :nth-child(3) :nth-child(1) b'
							)?.innerText;
							dataJson.overSold = $(
								'.stock-price-info :nth-child(3) :nth-child(2) b'
							)?.innerText;
							dataJson.high52Week = $(
								'.stock-price-info :nth-child(3) :nth-child(3) b'
							)?.innerText;
							dataJson.low52Week = $(
								'.stock-price-info :nth-child(3) :nth-child(4) b'
							)?.innerText;
							dataJson.turnOver52WeekAverage = $(
								'.stock-price-info :nth-child(3) :nth-child(5) b'
							)?.innerText;
							dataJson.foreignBuy = $(
								'.stock-price-info :nth-child(4) :nth-child(1) b'
							)?.innerText;
							dataJson.ownedRatio = $(
								'.stock-price-info :nth-child(4) :nth-child(2) b'
							)?.innerText;
							dataJson.dividendCast = $(
								'.stock-price-info :nth-child(4) :nth-child(3) b'
							)?.innerText;
							dataJson.dividendYield = $(
								'.stock-price-info :nth-child(4) :nth-child(4) b'
							)?.innerText;
							dataJson.beta = $(
								'.stock-price-info :nth-child(4) :nth-child(5) b'
							)?.innerText;
							dataJson.eps = $(
								'.stock-price-info :nth-child(5) :nth-child(1) b'
							)?.innerText;
							dataJson.pe = $(
								'.stock-price-info :nth-child(5) :nth-child(2) b'
							)?.innerText;
							dataJson.fpe = $(
								'.stock-price-info :nth-child(5) :nth-child(3) b'
							)?.innerText;
							dataJson.bvps = $(
								'.stock-price-info :nth-child(5) :nth-child(4) b'
							)?.innerText;
							dataJson.pb = $(
								'.stock-price-info :nth-child(5) :nth-child(5) b'
							)?.innerText;

							dataJson.currentTimestamp = Math.floor(
								Date.now() / 1000
							);
						} catch (err) {
							console.log('crawldetail hnx30' + err);
						}
						return dataJson;
					},
					stock.name,
					stock.symbol,
					stock.reference,
					stock.ceil,
					stock.floor,
					stock.currentPrice,
					stock.high,
					stock.low,
					stock.change,
					stock.changePercent,
					stock.turnOver
				);

				await page.close();

				console.log(hnx30DetailData.symbol + ' HNX30');

				await Hnx30Detail.findOneAndUpdate(
					{ symbol: hnx30DetailData.symbol },
					{
						name: hnx30DetailData.name,
						symbol: hnx30DetailData.symbol,
						reference: hnx30DetailData.reference,
						ceil: hnx30DetailData.ceil,
						floor: hnx30DetailData.floor,
						currentPrice: hnx30DetailData.currentPrice,
						change: hnx30DetailData.change,
						changePercent: hnx30DetailData.changePercent,
						openPrice: hnx30DetailData.openPrice,
						high: hnx30DetailData.high,
						low: hnx30DetailData.low,
						turnOver: hnx30DetailData.turnOver,

						marketcap: hnx30DetailData.marketcap,
						overBought: hnx30DetailData.overBought,
						overSold: hnx30DetailData.overSold,
						high52Week: hnx30DetailData.high52Week,
						low52Week: hnx30DetailData.low52Week,
						turnOver52WeekAverage:
							hnx30DetailData.turnOver52WeekAverage,
						foreignBuy: hnx30DetailData.foreignBuy,
						ownedRatio: hnx30DetailData.ownedRatio,
						dividendCast: hnx30DetailData.dividendCast, //cổ tức tiền mặt
						dividendYield: hnx30DetailData.dividendYield, // tỷ lệ cổ tức
						beta: hnx30DetailData.beta,
						eps: hnx30DetailData.eps,
						pe: hnx30DetailData.pe,
						fpe: hnx30DetailData.fpe, // F P/e
						bvps: hnx30DetailData.bvps, //book value per share
						pb: hnx30DetailData.pb,
						companyInfo: hnx30DetailData.symbol,
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail hnx30' + err));

				await Hnx30Chart.findOneAndUpdate(
					{ symbol: hnx30DetailData.symbol },
					{
						symbol: hnx30DetailData.symbol,
						$push: {
							t: hnx30DetailData.currentTimestamp,
							price: hnx30DetailData.currentPrice,
						},
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail hnx30' + err));
				// return hnx30DetailData
			}, 7000 * index);
		});
		await delay(hnx30All.length * 7000 + 10000);
		console.log('end HNX30.............');

		await browser.close();
	} catch (error) {
		console.log('crawldetail hnx30' + error);
	}
	// })
};

const crawlDetailHnx = asyncHandler(async () => {
	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: [
				'--no-sandbox',
				'--disabled-setupid-sandbox',
				'--disable-accelerated-2d-canvas',
			],
		});
		const hnxAll = await Hnx.find();

		//start loop
		console.log('starting HNX...............');
		hnxAll.map(async (stock, index) => {
			setTimeout(async () => {
				const page = await browser.newPage();
				await page.goto(
					`https://finance.vietstock.vn/${stock.symbol}/tai-chinh.htm`,
					{
						waitUntil: 'load',
					}
				);

				// await page.waitForTimeout(2000);
				await page.waitForSelector('.stock-price-info');

				let hnxDetailData = await page.evaluate(
					async (
						name,
						symbol,
						reference,
						ceil,
						floor,
						currentPrice,
						high,
						low,
						change,
						changePercent,
						turnOver
					) => {
						const $ = document.querySelector.bind(document);

						let dataJson = {};

						try {
							dataJson.name = name;
							dataJson.symbol = symbol;
							dataJson.reference = reference;
							dataJson.ceil = ceil;
							dataJson.floor = floor;
							dataJson.currentPrice = currentPrice;
							dataJson.high = high;
							dataJson.low = low;
							dataJson.change = change;
							dataJson.changePercent = changePercent;
							dataJson.openPrice =
								document.getElementById('openprice')?.innerText;
							dataJson.turnOver = turnOver;
							dataJson.marketcap = $(
								'.stock-price-info :nth-child(2) :nth-child(5) b'
							)?.innerText;
							dataJson.overBought = $(
								'.stock-price-info :nth-child(3) :nth-child(1) b'
							)?.innerText;
							dataJson.overSold = $(
								'.stock-price-info :nth-child(3) :nth-child(2) b'
							)?.innerText;
							dataJson.high52Week = $(
								'.stock-price-info :nth-child(3) :nth-child(3) b'
							)?.innerText;
							dataJson.low52Week = $(
								'.stock-price-info :nth-child(3) :nth-child(4) b'
							)?.innerText;
							dataJson.turnOver52WeekAverage = $(
								'.stock-price-info :nth-child(3) :nth-child(5) b'
							)?.innerText;
							dataJson.foreignBuy = $(
								'.stock-price-info :nth-child(4) :nth-child(1) b'
							)?.innerText;
							dataJson.ownedRatio = $(
								'.stock-price-info :nth-child(4) :nth-child(2) b'
							)?.innerText;
							dataJson.dividendCast = $(
								'.stock-price-info :nth-child(4) :nth-child(3) b'
							)?.innerText;
							dataJson.dividendYield = $(
								'.stock-price-info :nth-child(4) :nth-child(4) b'
							)?.innerText;
							dataJson.beta = $(
								'.stock-price-info :nth-child(4) :nth-child(5) b'
							)?.innerText;
							dataJson.eps = $(
								'.stock-price-info :nth-child(5) :nth-child(1) b'
							)?.innerText;
							dataJson.pe = $(
								'.stock-price-info :nth-child(5) :nth-child(2) b'
							)?.innerText;
							dataJson.fpe = $(
								'.stock-price-info :nth-child(5) :nth-child(3) b'
							)?.innerText;
							dataJson.bvps = $(
								'.stock-price-info :nth-child(5) :nth-child(4) b'
							)?.innerText;
							dataJson.pb = $(
								'.stock-price-info :nth-child(5) :nth-child(5) b'
							)?.innerText;

							dataJson.currentTimestamp = Math.floor(
								Date.now() / 1000
							);
						} catch (err) {
							console.log('crawldetail hnx' + err);
						}
						return dataJson;
					},
					stock.name,
					stock.symbol,
					stock.reference,
					stock.ceil,
					stock.floor,
					stock.currentPrice,
					stock.high,
					stock.low,
					stock.change,
					stock.changePercent,
					stock.turnOver
				);

				await page.close();

				console.log(hnxDetailData.symbol + ' HNX');

				// console.log(hnxDetailData);

				await HnxDetail.findOneAndUpdate(
					{ symbol: hnxDetailData.symbol },
					{
						name: hnxDetailData.name,
						symbol: hnxDetailData.symbol,
						reference: hnxDetailData.reference,
						ceil: hnxDetailData.ceil,
						floor: hnxDetailData.floor,
						currentPrice: hnxDetailData.currentPrice,
						change: hnxDetailData.change,
						changePercent: hnxDetailData.changePercent,
						openPrice: hnxDetailData.openPrice,
						high: hnxDetailData.high,
						low: hnxDetailData.low,
						turnOver: hnxDetailData.turnOver,

						marketcap: hnxDetailData.marketcap,
						overBought: hnxDetailData.overBought,
						overSold: hnxDetailData.overSold,
						high52Week: hnxDetailData.high52Week,
						low52Week: hnxDetailData.low52Week,
						turnOver52WeekAverage:
							hnxDetailData.turnOver52WeekAverage,
						foreignBuy: hnxDetailData.foreignBuy,
						ownedRatio: hnxDetailData.ownedRatio,
						dividendCast: hnxDetailData.dividendCast, //cổ tức tiền mặt
						dividendYield: hnxDetailData.dividendYield, // tỷ lệ cổ tức
						beta: hnxDetailData.beta,
						eps: hnxDetailData.eps,
						pe: hnxDetailData.pe,
						fpe: hnxDetailData.fpe, // F P/e
						bvps: hnxDetailData.bvps, //book value per share
						pb: hnxDetailData.pb,
						companyInfo: hnxDetailData.symbol,
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail hnx' + err));

				await HnxChart.findOneAndUpdate(
					{ symbol: hnxDetailData.symbol },
					{
						symbol: hnxDetailData.symbol,
						$push: {
							t: hnxDetailData.currentTimestamp,
							price: hnxDetailData.currentPrice,
						},
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail hnx' + err));
				// return hnxDetailData
			}, 7000 * index);
		});
		await delay(hnxAll.length * 7000 + 20000);
		console.log('end HNX.............');

		await browser.close();
	} catch (error) {
		console.log('crawldetail hnx' + error);
	}
	// })
});

const crawlDetailVn30 = asyncHandler(async () => {
	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: [
				'--no-sandbox',
				'--disabled-setupid-sandbox',
				'--disable-accelerated-2d-canvas',
			],
		});
		const vn30All = await Vn30.find();

		//start loop
		console.log('starting VN30...............');
		vn30All.map(async (stock, index) => {
			setTimeout(async () => {
				const page = await browser.newPage();
				let status = await page.goto(
					`https://finance.vietstock.vn/${stock.symbol}/tai-chinh.htm`
				);

				// await page.waitForTimeout(2000);
				await page.waitForSelector('.stock-price-info');

				let vn30DetailData = await page.evaluate(
					async (
						name,
						symbol,
						reference,
						ceil,
						floor,
						currentPrice,
						high,
						low,
						change,
						changePercent,
						turnOver
					) => {
						const $ = document.querySelector.bind(document);

						let dataJson = {};

						try {
							dataJson.name = name;
							dataJson.symbol = symbol;
							dataJson.reference = reference;
							dataJson.ceil = ceil;
							dataJson.floor = floor;
							dataJson.currentPrice = currentPrice;
							dataJson.high = high;
							dataJson.low = low;
							dataJson.change = change;
							dataJson.changePercent = changePercent;
							dataJson.openPrice =
								document.getElementById('openprice')?.innerText;
							dataJson.turnOver = turnOver;
							dataJson.marketcap = $(
								'.stock-price-info :nth-child(2) :nth-child(5) b'
							)?.innerText;
							dataJson.overBought = $(
								'.stock-price-info :nth-child(3) :nth-child(1) b'
							)?.innerText;
							dataJson.overSold = $(
								'.stock-price-info :nth-child(3) :nth-child(2) b'
							)?.innerText;
							dataJson.high52Week = $(
								'.stock-price-info :nth-child(3) :nth-child(3) b'
							)?.innerText;
							dataJson.low52Week = $(
								'.stock-price-info :nth-child(3) :nth-child(4) b'
							)?.innerText;
							dataJson.turnOver52WeekAverage = $(
								'.stock-price-info :nth-child(3) :nth-child(5) b'
							)?.innerText;
							dataJson.foreignBuy = $(
								'.stock-price-info :nth-child(4) :nth-child(1) b'
							)?.innerText;
							dataJson.ownedRatio = $(
								'.stock-price-info :nth-child(4) :nth-child(2) b'
							)?.innerText;
							dataJson.dividendCast = $(
								'.stock-price-info :nth-child(4) :nth-child(3) b'
							)?.innerText;
							dataJson.dividendYield = $(
								'.stock-price-info :nth-child(4) :nth-child(4) b'
							)?.innerText;
							dataJson.beta = $(
								'.stock-price-info :nth-child(4) :nth-child(5) b'
							)?.innerText;
							dataJson.eps = $(
								'.stock-price-info :nth-child(5) :nth-child(1) b'
							)?.innerText;
							dataJson.pe = $(
								'.stock-price-info :nth-child(5) :nth-child(2) b'
							)?.innerText;
							dataJson.fpe = $(
								'.stock-price-info :nth-child(5) :nth-child(3) b'
							)?.innerText;
							dataJson.bvps = $(
								'.stock-price-info :nth-child(5) :nth-child(4) b'
							)?.innerText;
							dataJson.pb = $(
								'.stock-price-info :nth-child(5) :nth-child(5) b'
							)?.innerText;

							dataJson.currentTimestamp = Math.floor(
								Date.now() / 1000
							);
						} catch (err) {
							console.log('crawldetail vn30' + err);
						}
						return dataJson;
					},
					stock.name,
					stock.symbol,
					stock.reference,
					stock.ceil,
					stock.floor,
					stock.currentPrice,
					stock.high,
					stock.low,
					stock.change,
					stock.changePercent,
					stock.turnOver
				);

				await page.close();

				console.log(vn30DetailData.symbol + ' VN30');

				// console.log(vn30DetailData);

				await Vn30Detail.findOneAndUpdate(
					{ symbol: vn30DetailData.symbol },
					{
						name: vn30DetailData.name,
						symbol: vn30DetailData.symbol,
						reference: vn30DetailData.reference,
						ceil: vn30DetailData.ceil,
						floor: vn30DetailData.floor,
						currentPrice: vn30DetailData.currentPrice,
						change: vn30DetailData.change,
						changePercent: vn30DetailData.changePercent,
						openPrice: vn30DetailData.openPrice,
						high: vn30DetailData.high,
						low: vn30DetailData.low,
						turnOver: vn30DetailData.turnOver,

						marketcap: vn30DetailData.marketcap,
						overBought: vn30DetailData.overBought,
						overSold: vn30DetailData.overSold,
						high52Week: vn30DetailData.high52Week,
						low52Week: vn30DetailData.low52Week,
						turnOver52WeekAverage:
							vn30DetailData.turnOver52WeekAverage,
						foreignBuy: vn30DetailData.foreignBuy,
						ownedRatio: vn30DetailData.ownedRatio,
						dividendCast: vn30DetailData.dividendCast, //cổ tức tiền mặt
						dividendYield: vn30DetailData.dividendYield, // tỷ lệ cổ tức
						beta: vn30DetailData.beta,
						eps: vn30DetailData.eps,
						pe: vn30DetailData.pe,
						fpe: vn30DetailData.fpe, // F P/e
						bvps: vn30DetailData.bvps, //book value per share
						pb: vn30DetailData.pb,
						companyInfo: vn30DetailData.symbol,
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail vn30' + err));

				await Vn30Chart.findOneAndUpdate(
					{ symbol: vn30DetailData.symbol },
					{
						symbol: vn30DetailData.symbol,
						$push: {
							t: vn30DetailData.currentTimestamp,
							price: vn30DetailData.currentPrice,
						},
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail vn30' + err));
				// return vn30DetailData
			}, 7000 * index);
		});
		await delay(vn30All.length * 7000 + 10000);
		console.log('end VN30.............');

		await browser.close();
	} catch (error) {
		console.log('crawldetail vn30' + error);
	}
});

const crawlDetailHose = asyncHandler(async () => {
	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: [
				'--no-sandbox',
				'--disabled-setupid-sandbox',
				'--disable-accelerated-2d-canvas',
			],
		});
		const hoseAll = await Hose.find();

		//start loop
		console.log('starting HOSE...............');
		hoseAll.map(async (stock, index) => {
			setTimeout(async () => {
				const page = await browser.newPage();
				let status = await page.goto(
					`https://finance.vietstock.vn/${stock.symbol}/tai-chinh.htm`
				);

				// await page.waitForTimeout(2000);
				await page.waitForSelector('.stock-price-info');

				let hoseDetailData = await page.evaluate(
					async (
						name,
						symbol,
						reference,
						ceil,
						floor,
						currentPrice,
						high,
						low,
						change,
						changePercent,
						turnOver
					) => {
						const $ = document.querySelector.bind(document);

						let dataJson = {};

						try {
							dataJson.name = name;
							dataJson.symbol = symbol;
							dataJson.reference = reference;
							dataJson.ceil = ceil;
							dataJson.floor = floor;
							dataJson.currentPrice = currentPrice;
							dataJson.high = high;
							dataJson.low = low;
							dataJson.change = change;
							dataJson.changePercent = changePercent;
							dataJson.openPrice =
								document.getElementById('openprice')?.innerText;
							dataJson.turnOver = turnOver;
							dataJson.marketcap = $(
								'.stock-price-info :nth-child(2) :nth-child(5) b'
							)?.innerText;
							dataJson.overBought = $(
								'.stock-price-info :nth-child(3) :nth-child(1) b'
							)?.innerText;
							dataJson.overSold = $(
								'.stock-price-info :nth-child(3) :nth-child(2) b'
							)?.innerText;
							dataJson.high52Week = $(
								'.stock-price-info :nth-child(3) :nth-child(3) b'
							)?.innerText;
							dataJson.low52Week = $(
								'.stock-price-info :nth-child(3) :nth-child(4) b'
							)?.innerText;
							dataJson.turnOver52WeekAverage = $(
								'.stock-price-info :nth-child(3) :nth-child(5) b'
							)?.innerText;
							dataJson.foreignBuy = $(
								'.stock-price-info :nth-child(4) :nth-child(1) b'
							)?.innerText;
							dataJson.ownedRatio = $(
								'.stock-price-info :nth-child(4) :nth-child(2) b'
							)?.innerText;
							dataJson.dividendCast = $(
								'.stock-price-info :nth-child(4) :nth-child(3) b'
							)?.innerText;
							dataJson.dividendYield = $(
								'.stock-price-info :nth-child(4) :nth-child(4) b'
							)?.innerText;
							dataJson.beta = $(
								'.stock-price-info :nth-child(4) :nth-child(5) b'
							)?.innerText;
							dataJson.eps = $(
								'.stock-price-info :nth-child(5) :nth-child(1) b'
							)?.innerText;
							dataJson.pe = $(
								'.stock-price-info :nth-child(5) :nth-child(2) b'
							)?.innerText;
							dataJson.fpe = $(
								'.stock-price-info :nth-child(5) :nth-child(3) b'
							)?.innerText;
							dataJson.bvps = $(
								'.stock-price-info :nth-child(5) :nth-child(4) b'
							)?.innerText;
							dataJson.pb = $(
								'.stock-price-info :nth-child(5) :nth-child(5) b'
							)?.innerText;

							dataJson.currentTimestamp = Math.floor(
								Date.now() / 1000
							);
						} catch (err) {
							console.log('crawldetail hose' + err);
						}
						return dataJson;
					},
					stock.name,
					stock.symbol,
					stock.reference,
					stock.ceil,
					stock.floor,
					stock.currentPrice,
					stock.high,
					stock.low,
					stock.change,
					stock.changePercent,
					stock.turnOver
				);

				await page.close();

				console.log(hoseDetailData.symbol + ' HOSE');

				// console.log(hoseDetailData);

				await HoseDetail.findOneAndUpdate(
					{ symbol: hoseDetailData.symbol },
					{
						name: hoseDetailData.name,
						symbol: hoseDetailData.symbol,
						reference: hoseDetailData.reference,
						ceil: hoseDetailData.ceil,
						floor: hoseDetailData.floor,
						currentPrice: hoseDetailData.currentPrice,
						change: hoseDetailData.change,
						changePercent: hoseDetailData.changePercent,
						openPrice: hoseDetailData.openPrice,
						high: hoseDetailData.high,
						low: hoseDetailData.low,
						turnOver: hoseDetailData.turnOver,

						marketcap: hoseDetailData.marketcap,
						overBought: hoseDetailData.overBought,
						overSold: hoseDetailData.overSold,
						high52Week: hoseDetailData.high52Week,
						low52Week: hoseDetailData.low52Week,
						turnOver52WeekAverage:
							hoseDetailData.turnOver52WeekAverage,
						foreignBuy: hoseDetailData.foreignBuy,
						ownedRatio: hoseDetailData.ownedRatio,
						dividendCast: hoseDetailData.dividendCast, //cổ tức tiền mặt
						dividendYield: hoseDetailData.dividendYield, // tỷ lệ cổ tức
						beta: hoseDetailData.beta,
						eps: hoseDetailData.eps,
						pe: hoseDetailData.pe,
						fpe: hoseDetailData.fpe, // F P/e
						bvps: hoseDetailData.bvps, //book value per share
						pb: hoseDetailData.pb,
						companyInfo: hoseDetailData.symbol,
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail hose' + err));

				await HoseChart.findOneAndUpdate(
					{ symbol: hoseDetailData.symbol },
					{
						symbol: hoseDetailData.symbol,
						$push: {
							t: hoseDetailData.currentTimestamp,
							price: hoseDetailData.currentPrice,
						},
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail hose' + err));
				// return hoseDetailData
			}, 7000 * index);
		});
		await delay(hoseAll.length * 7000 + 20000);
		console.log('end HOSE.............');

		await browser.close();
	} catch (error) {
		console.log('crawldetail hose' + error);
	}
	// })
});

const crawlDetailUpcom = asyncHandler(async () => {
	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: [
				'--no-sandbox',
				'--disabled-setupid-sandbox',
				'--disable-accelerated-2d-canvas',
			],
		});
		const upcomAll = await Upcom.find();

		//start loop
		console.log('starting Upcom...............');
		upcomAll.map(async (stock, index) => {
			setTimeout(async () => {
				const page = await browser.newPage();
				await page.goto(
					`https://finance.vietstock.vn/${stock.symbol}/tai-chinh.htm`
				);

				// await page.waitForTimeout(2000);
				await page.waitForSelector('.stock-price-info');

				let upcomDetailData = await page.evaluate(
					async (
						name,
						symbol,
						reference,
						ceil,
						floor,
						currentPrice,
						high,
						low,
						change,
						changePercent,
						turnOver
					) => {
						const $ = document.querySelector.bind(document);

						let dataJson = {};

						try {
							dataJson.name = name;
							dataJson.symbol = symbol;
							dataJson.reference = reference;
							dataJson.ceil = ceil;
							dataJson.floor = floor;
							dataJson.currentPrice = currentPrice;
							dataJson.high = high;
							dataJson.low = low;
							dataJson.change = change;
							dataJson.changePercent = changePercent;
							dataJson.openPrice =
								document.getElementById('openprice')?.innerText;
							dataJson.turnOver = turnOver;
							dataJson.marketcap = $(
								'.stock-price-info :nth-child(2) :nth-child(5) b'
							)?.innerText;
							dataJson.overBought = $(
								'.stock-price-info :nth-child(3) :nth-child(1) b'
							)?.innerText;
							dataJson.overSold = $(
								'.stock-price-info :nth-child(3) :nth-child(2) b'
							)?.innerText;
							dataJson.high52Week = $(
								'.stock-price-info :nth-child(3) :nth-child(3) b'
							)?.innerText;
							dataJson.low52Week = $(
								'.stock-price-info :nth-child(3) :nth-child(4) b'
							)?.innerText;
							dataJson.turnOver52WeekAverage = $(
								'.stock-price-info :nth-child(3) :nth-child(5) b'
							)?.innerText;
							dataJson.foreignBuy = $(
								'.stock-price-info :nth-child(4) :nth-child(1) b'
							)?.innerText;
							dataJson.ownedRatio = $(
								'.stock-price-info :nth-child(4) :nth-child(2) b'
							)?.innerText;
							dataJson.dividendCast = $(
								'.stock-price-info :nth-child(4) :nth-child(3) b'
							)?.innerText;
							dataJson.dividendYield = $(
								'.stock-price-info :nth-child(4) :nth-child(4) b'
							)?.innerText;
							dataJson.beta = $(
								'.stock-price-info :nth-child(4) :nth-child(5) b'
							)?.innerText;
							dataJson.eps = $(
								'.stock-price-info :nth-child(5) :nth-child(1) b'
							)?.innerText;
							dataJson.pe = $(
								'.stock-price-info :nth-child(5) :nth-child(2) b'
							)?.innerText;
							dataJson.fpe = $(
								'.stock-price-info :nth-child(5) :nth-child(3) b'
							)?.innerText;
							dataJson.bvps = $(
								'.stock-price-info :nth-child(5) :nth-child(4) b'
							)?.innerText;
							dataJson.pb = $(
								'.stock-price-info :nth-child(5) :nth-child(5) b'
							)?.innerText;

							dataJson.currentTimestamp = Math.floor(
								Date.now() / 1000
							);
						} catch (err) {
							console.log('crawldetail upcom' + err);
						}
						return dataJson;
					},
					stock.name,
					stock.symbol,
					stock.reference,
					stock.ceil,
					stock.floor,
					stock.currentPrice,
					stock.high,
					stock.low,
					stock.change,
					stock.changePercent,
					stock.turnOver
				);

				await page.close();

				console.log(upcomDetailData.symbol + ' Upcom');
				// console.log(upcomDetailData);

				await UpcomDetail.findOneAndUpdate(
					{ symbol: upcomDetailData.symbol },
					{
						name: upcomDetailData.name,
						symbol: upcomDetailData.symbol,
						reference: upcomDetailData.reference,
						ceil: upcomDetailData.ceil,
						floor: upcomDetailData.floor,
						currentPrice: upcomDetailData.currentPrice,
						change: upcomDetailData.change,
						changePercent: upcomDetailData.changePercent,
						openPrice: upcomDetailData.openPrice,
						high: upcomDetailData.high,
						low: upcomDetailData.low,
						turnOver: upcomDetailData.turnOver,

						marketcap: upcomDetailData.marketcap,
						overBought: upcomDetailData.overBought,
						overSold: upcomDetailData.overSold,
						high52Week: upcomDetailData.high52Week,
						low52Week: upcomDetailData.low52Week,
						turnOver52WeekAverage:
							upcomDetailData.turnOver52WeekAverage,
						foreignBuy: upcomDetailData.foreignBuy,
						ownedRatio: upcomDetailData.ownedRatio,
						dividendCast: upcomDetailData.dividendCast, //cổ tức tiền mặt
						dividendYield: upcomDetailData.dividendYield, // tỷ lệ cổ tức
						beta: upcomDetailData.beta,
						eps: upcomDetailData.eps,
						pe: upcomDetailData.pe,
						fpe: upcomDetailData.fpe, // F P/e
						bvps: upcomDetailData.bvps, //book value per share
						pb: upcomDetailData.pb,
						companyInfo: upcomDetailData.symbol,
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail upcom' + err));

				await UpcomChart.findOneAndUpdate(
					{ symbol: upcomDetailData.symbol },
					{
						symbol: upcomDetailData.symbol,
						$push: {
							t: upcomDetailData.currentTimestamp,
							price: upcomDetailData.currentPrice,
						},
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail upcom' + err));
				// return upcomDetailData
			}, 7000 * index);
		});
		await delay(hoseAll.length * 7000 + 40000);
		console.log('end HOSE.............');

		await browser.close();
	} catch (error) {
		console.log('crawldetail upcom' + error);
	}
	// })
});

const crawlDetailAllInvesting = asyncHandler(async (id, name, hrefDetail) => {
	try {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		const page = await browser.newPage();
		let status = await page.goto(`https://vn.investing.com${hrefDetail}`, {
			timeout: 0,
		});
		// await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
		// await page.click(`[data-value = ${symbol}]`)
		// const selector = await page.$(`#sym-328`)
		// await page.waitForSelector(`span[data-value=${symbol}]`)
		// await page.click('#sym-328')
		// await page.click(`[data-value=${symbol}]`)
		// await page.waitForSelector('#symbol-detail-popup', { visible: true })
		// await page.evaluate(selector, (selector) => selector.click())
		await page.waitForTimeout(3000);

		// const bodyHandle = await page.$('body');
		// const { height } = await bodyHandle.boundingBox();
		// await bodyHandle.dispose();

		// // Scroll one viewport at a time, pausing to let content load
		// const viewportHeight = page.viewport().height;
		// let viewportIncr = 0;
		// while (viewportIncr + viewportHeight < height) {
		//     await page.evaluate(_viewportHeight => {
		//         window.scrollBy(0, _viewportHeight);
		//     }, viewportHeight);
		//     await page.waitForTimeout(2000);
		//     viewportIncr = viewportIncr + viewportHeight;
		// }

		// // Scroll back to top
		// await page.evaluate(_ => {
		//     window.scrollTo(0, 0);
		// });

		// // Some extra delay to let all data load
		// await page.waitForTimeout(1000);

		let allInvestingDetailData = await page.evaluate(
			async (id, name) => {
				const $ = document.querySelector.bind(document);
				const $$ = document.querySelectorAll.bind(document);

				// let mainElement = document.querySelector("div[data-set='chat-panel-main']").previousSibling
				// let infoCompanyElement = mainElement.querySelector(':nth-last-child(2)')

				let dataJson = {};

				try {
					dataJson.id = id;
					dataJson.name = name;
					dataJson.symbol = $('main div h2')?.innerText.slice(10);
					// dataJson.currentPrice = document.querySelector("span[data-test='instrument-price-last']")?.innerText
					// dataJson.referencePrice = document.querySelector('dl div:nth-child(1) dd span :nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(1) dd span :nth-child(2)')?.innerText
					// dataJson.openPrice = document.querySelector('dl div:nth-child(4) dd span :nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(4) dd span :nth-child(2)')?.innerText
					// dataJson.buyPrice = document.querySelector('[data-test="instrument-header-details"] :nth-child(3) :nth-child(2) :nth-child(2) :nth-child(1)')?.innerText
					// dataJson.sellPrice = document.querySelector('[data-test="instrument-header-details"] :nth-child(3) :nth-child(2) :nth-child(2) :nth-child(3)')?.innerText
					// dataJson.high = high
					// dataJson.low = low
					// dataJson.low1Year = document.querySelector('dl div:nth-child(5) dd span:nth-child(1) span:nth-child(1)')?.innerText
					// dataJson.high1Year = document.querySelector('dl div:nth-child(5) dd span:nth-child(3) span:nth-child(1)')?.innerText
					// dataJson.change = change
					// dataJson.changePercent = changePercent
					// dataJson.changePercent1Year = document.querySelector('dl div:nth-child(13) dd span span:nth-child(1)')?.innerText + "%"
					// dataJson.turnOver = turnOver
					// dataJson.turnOverAverage3Month = document.querySelector('dl div:nth-child(10) dd span span:nth-child(1)')?.innerText
					// dataJson.marketcap = document.querySelector('dl div:nth-child(8) dd span span:nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(8) dd span span:nth-child(2)')?.innerText
					// dataJson.p2eRatio = document.querySelector('dl div:nth-child(11) dd span span:nth-child(1)')?.innerText
					// dataJson.revenue = document.querySelector('dl div:nth-child(3) dd span span:nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(3) dd span span:nth-child(2)')?.innerText
					// dataJson.eps = document.querySelector('dl div:nth-child(6) dd span span:nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(6) dd span span:nth-child(2)')?.innerText
					// dataJson.dividend = document.querySelector('dl div:nth-child(9) dd div span :nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(9) dd div span :nth-child(2)')?.innerText
					// dataJson.yield = document.querySelector('dl div:nth-child(9) dd div div :nth-child(2) :nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(9) dd div div :nth-child(2) :nth-child(2)')?.innerText
					// dataJson.timeReport = document.querySelector('dl div:nth-child(15) dd a')?.innerText
					dataJson.descriptionCompany =
						document.getElementsByClassName(
							'company-profile_profile-description__30Rta'
						)[0]?.innerText;
					let mainElement = $$(
						'.instrumentOverview_overview-section__2hN4A'
					)[5];
					dataJson.major = mainElement.querySelector(
						'div :nth-child(6) div :nth-child(3) :nth-child(1) a '
					)?.innerText;
					dataJson.field = mainElement.querySelector(
						'div :nth-child(6) div :nth-child(3) :nth-child(2) a '
					)?.innerText;
					// dataJson.numberOfEmployees = mainElement.querySelector('div :nth-child(6) div :nth-child(3) :nth-child(3) :nth-child(2) ')?.innerText
					// dataJson.marketLocation = mainElement.querySelector('div :nth-child(6) div :nth-child(3) :nth-child(4) a ')?.innerText
				} catch (err) {
					console.log('crawldetail allinvesting' + err);
				}
				// await delay(2000);
				return dataJson;
			},
			id,
			name
		);

		// console.log(allInvestingDetailData)

		AllInvestingDetail.findOneAndUpdate(
			{ symbol: allInvestingDetailData.symbol },
			{
				_id: allInvestingDetailData.symbol,
				id: allInvestingDetailData.id,
				name: allInvestingDetailData.name,
				symbol: allInvestingDetailData.symbol,
				descriptionCompany: allInvestingDetailData.descriptionCompany,
				major: allInvestingDetailData.major,
				field: allInvestingDetailData.field,
				// currentPrice: hnxInvestingDetailData.currentPrice,
				// referencePrice: hnxInvestingDetailData.referencePrice,
				// openPrice: hnxInvestingDetailData.openPrice,
				// buyPrice: hnxInvestingDetailData.buyPrice,
				// sellPrice: hnxInvestingDetailData.sellPrice,
				// high: hnxInvestingDetailData.high,
				// low: hnxInvestingDetailData.low,
				// high1Year: hnxInvestingDetailData.high1Year,
				// low1Year: hnxInvestingDetailData.low1Year,
				// change: hnxInvestingDetailData.change,
				// changePercent: hnxInvestingDetailData.changePercent,
				// changePercent1Year: hnxInvestingDetailData.changePercent1Year,
				// turnOver: hnxInvestingDetailData.turnOver,
				// turnOverAverage3Month: hnxInvestingDetailData.turnOverAverage3Month,
				// marketcap: hnxInvestingDetailData.marketcap,
				// p2eRatio: hnxInvestingDetailData.p2eRatio,
				// revenue: hnxInvestingDetailData.revenue,
				// eps: hnxInvestingDetailData.eps,
				// dividend: hnxInvestingDetailData.dividend,
				// yield: hnxInvestingDetailData.yield,
				// timeReport: hnxInvestingDetailData.timeReport,
				// numberOfEmployees: hnxInvestingDetailData.numberOfEmployees,
				// marketLocation: hnxInvestingDetailData.marketLocation
			},
			{ upsert: true }
		)
			// .then((doc) => console.log(doc?.sy))
			.catch((err) => console.log('crawldetail allinvesting' + err));

		// return upcomDetailData

		await browser.close();
	} catch (error) {
		console.log('crawldetail allinvesting' + error);
	}
});

// const crawlDetailHnx30 = asyncHandler(
// 	async (name, symbol, reference, ceil, floor) => {
// 		const pageEvaluateFunc = async (
// 			name,
// 			symbol,
// 			reference,
// 			ceil,
// 			floor
// 		) => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = name;
// 				dataJson.symbol = symbol;

// 				let date = new Date();
// 				dataJson.timeUpdate =
// 					date.getHours() +
// 					':' +
// 					date.getMinutes() +
// 					':' +
// 					date.getSeconds() +
// 					' ' +
// 					date.getDate() +
// 					'/' +
// 					(date.getMonth() + 1) +
// 					'/' +
// 					date.getFullYear();

// 				dataJson.reference = reference;
// 				dataJson.ceil = ceil;
// 				dataJson.floor = floor;
// 				dataJson.currentPrice = $(
// 					'#stockprice .price'
// 				)?.innerText.replace(/,/g, '.');
// 				dataJson.high = $('#highestprice')?.innerText;
// 				dataJson.low = $('#lowestprice')?.innerText;

// 				const changeInfo = $('#stockchange')?.innerText.split(' ');

// 				const changeByNumber = changeInfo[0];
// 				const changeByPercent = changeInfo[1].replace(/[\])}[{(]/g, '');
// 				dataJson.change = changeByNumber;
// 				dataJson.changePercent = changeByPercent;

// 				dataJson.openPrice =
// 					document.getElementById('openprice')?.innerText;
// 				dataJson.turnOver = $(
// 					'.stock-price-info :nth-child(2) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.marketcap = $(
// 					'.stock-price-info :nth-child(2) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.overBought = $(
// 					'.stock-price-info :nth-child(3) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.overSold = $(
// 					'.stock-price-info :nth-child(3) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.high52Week = $(
// 					'.stock-price-info :nth-child(3) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.low52Week = $(
// 					'.stock-price-info :nth-child(3) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.turnOver52WeekAverage = $(
// 					'.stock-price-info :nth-child(3) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.foreignBuy = $(
// 					'.stock-price-info :nth-child(4) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.ownedRatio = $(
// 					'.stock-price-info :nth-child(4) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.dividendCast = $(
// 					'.stock-price-info :nth-child(4) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.dividendYield = $(
// 					'.stock-price-info :nth-child(4) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.beta = $(
// 					'.stock-price-info :nth-child(4) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.eps = $(
// 					'.stock-price-info :nth-child(5) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.pe = $(
// 					'.stock-price-info :nth-child(5) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.fpe = $(
// 					'.stock-price-info :nth-child(5) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.bvps = $(
// 					'.stock-price-info :nth-child(5) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.pb = $(
// 					'.stock-price-info :nth-child(5) :nth-child(5) b'
// 				)?.innerText;

// 				dataJson.currentTimestamp = Math.floor(Date.now() / 1000);
// 			} catch (err) {
// 				console.log('crawldetail hnx30' + err);
// 			}
// 			return dataJson;
// 		};

// 		const props = [name, symbol, reference, ceil, floor];

// 		let data = false;
// 		let attemps = 0;
// 		//retry request until it gets data or tries 3 times
// 		while (data == false && attemps < 2) {
// 			console.log('loop' + attemps);
// 			console.time(symbol);
// 			data = await collectQueryData(
// 				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
// 				pageEvaluateFunc,
// 				props
// 			);
// 			console.timeEnd(symbol);
// 			console.log(data);
// 			attemps++;

// 			if (data) {
// 				Hnx30Detail.findOneAndUpdate(
// 					{ symbol: data.symbol },
// 					{
// 						name: data.name,
// 						symbol: data.symbol,
// 						timeUpdate: data.timeUpdate,
// 						reference: data.reference,
// 						ceil: data.ceil,
// 						floor: data.floor,
// 						currentPrice: data.currentPrice,
// 						change: data.change,
// 						changePercent: data.changePercent,
// 						openPrice: data.openPrice,
// 						high: data.high,
// 						low: data.low,
// 						turnOver: data.turnOver,

// 						marketcap: data.marketcap,
// 						overBought: data.overBought,
// 						overSold: data.overSold,
// 						high52Week: data.high52Week,
// 						low52Week: data.low52Week,
// 						turnOver52WeekAverage: data.turnOver52WeekAverage,
// 						foreignBuy: data.foreignBuy,
// 						ownedRatio: data.ownedRatio,
// 						dividendCast: data.dividendCast, //cổ tức tiền mặt
// 						dividendYield: data.dividendYield, // tỷ lệ cổ tức
// 						beta: data.beta,
// 						eps: data.eps,
// 						pe: data.pe,
// 						fpe: data.fpe, // F P/e
// 						bvps: data.bvps, //book value per share
// 						pb: data.pb,
// 						companyInfo: data.symbol,
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));

// 				Hnx30Chart.findOneAndUpdate(
// 					{ symbol: data.symbol },
// 					{
// 						symbol: data.symbol,
// 						$push: {
// 							t: data.currentTimestamp,
// 							price: data.currentPrice,
// 						},
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));

// 				// await browser.close();
// 			}

// 			if (data === false) {
// 				//wait a few second, also a good idea to swap proxy here
// 				console.log('Recrawl........' + attemps);
// 				await new Promise((resolve) => setTimeout(resolve, 3000));
// 			}
// 		}
// 	}
// );

// const crawlDetailHnx = asyncHandler(
// 	async (name, symbol, reference, ceil, floor) => {
// 		const pageEvaluateFunc = async (
// 			name,
// 			symbol,
// 			reference,
// 			ceil,
// 			floor
// 		) => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = name;
// 				dataJson.symbol = symbol;

// 				let date = new Date();
// 				dataJson.timeUpdate =
// 					date.getHours() +
// 					':' +
// 					date.getMinutes() +
// 					':' +
// 					date.getSeconds() +
// 					' ' +
// 					date.getDate() +
// 					'/' +
// 					(date.getMonth() + 1) +
// 					'/' +
// 					date.getFullYear();

// 				dataJson.reference = reference;
// 				dataJson.ceil = ceil;
// 				dataJson.floor = floor;
// 				dataJson.currentPrice = $(
// 					'#stockprice .price'
// 				)?.innerText.replace(/,/g, '.');
// 				dataJson.high = $('#highestprice')?.innerText;
// 				dataJson.low = $('#lowestprice')?.innerText;

// 				const changeInfo = $('#stockchange')?.innerText.split(' ');

// 				const changeByNumber = changeInfo[0];
// 				const changeByPercent = changeInfo[1].replace(/[\])}[{(]/g, '');
// 				dataJson.change = changeByNumber;
// 				dataJson.changePercent = changeByPercent;

// 				dataJson.openPrice =
// 					document.getElementById('openprice')?.innerText;
// 				dataJson.turnOver = $(
// 					'.stock-price-info :nth-child(2) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.marketcap = $(
// 					'.stock-price-info :nth-child(2) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.overBought = $(
// 					'.stock-price-info :nth-child(3) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.overSold = $(
// 					'.stock-price-info :nth-child(3) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.high52Week = $(
// 					'.stock-price-info :nth-child(3) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.low52Week = $(
// 					'.stock-price-info :nth-child(3) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.turnOver52WeekAverage = $(
// 					'.stock-price-info :nth-child(3) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.foreignBuy = $(
// 					'.stock-price-info :nth-child(4) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.ownedRatio = $(
// 					'.stock-price-info :nth-child(4) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.dividendCast = $(
// 					'.stock-price-info :nth-child(4) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.dividendYield = $(
// 					'.stock-price-info :nth-child(4) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.beta = $(
// 					'.stock-price-info :nth-child(4) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.eps = $(
// 					'.stock-price-info :nth-child(5) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.pe = $(
// 					'.stock-price-info :nth-child(5) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.fpe = $(
// 					'.stock-price-info :nth-child(5) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.bvps = $(
// 					'.stock-price-info :nth-child(5) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.pb = $(
// 					'.stock-price-info :nth-child(5) :nth-child(5) b'
// 				)?.innerText;

// 				dataJson.currentTimestamp = Math.floor(Date.now() / 1000);
// 			} catch (err) {
// 				console.log('crawldetail hnx' + err);
// 			}
// 			return dataJson;
// 		};

// 		const props = [name, symbol, reference, ceil, floor];

// 		let data = false;
// 		let attemps = 0;
// 		//retry request until it gets data or tries 3 times
// 		while (data == false && attemps < 2) {
// 			console.log('loop' + attemps);
// 			console.time(symbol);
// 			data = await collectQueryData(
// 				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
// 				pageEvaluateFunc,
// 				props
// 			);
// 			console.timeEnd(symbol);
// 			console.log(data);
// 			attemps++;

// 			if (data) {
// 				HnxDetail.findOneAndUpdate(
// 					{ symbol: data.symbol },
// 					{
// 						name: data.name,
// 						symbol: data.symbol,
// 						timeUpdate: data.timeUpdate,
// 						reference: data.reference,
// 						ceil: data.ceil,
// 						floor: data.floor,
// 						currentPrice: data.currentPrice,
// 						change: data.change,
// 						changePercent: data.changePercent,
// 						openPrice: data.openPrice,
// 						high: data.high,
// 						low: data.low,
// 						turnOver: data.turnOver,

// 						marketcap: data.marketcap,
// 						overBought: data.overBought,
// 						overSold: data.overSold,
// 						high52Week: data.high52Week,
// 						low52Week: data.low52Week,
// 						turnOver52WeekAverage: data.turnOver52WeekAverage,
// 						foreignBuy: data.foreignBuy,
// 						ownedRatio: data.ownedRatio,
// 						dividendCast: data.dividendCast, //cổ tức tiền mặt
// 						dividendYield: data.dividendYield, // tỷ lệ cổ tức
// 						beta: data.beta,
// 						eps: data.eps,
// 						pe: data.pe,
// 						fpe: data.fpe, // F P/e
// 						bvps: data.bvps, //book value per share
// 						pb: data.pb,
// 						companyInfo: data.symbol,
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));

// 				HnxChart.findOneAndUpdate(
// 					{ symbol: data.symbol },
// 					{
// 						symbol: data.symbol,
// 						$push: {
// 							t: data.currentTimestamp,
// 							price: data.currentPrice,
// 						},
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));

// 				// await browser.close();
// 			}

// 			if (data === false) {
// 				//wait a few second, also a good idea to swap proxy here
// 				console.log('Recrawl........' + attemps);
// 				await new Promise((resolve) => setTimeout(resolve, 3000));
// 			}
// 		}
// 	}
// );

// const crawlDetailVn30 = asyncHandler(
// 	async (name, symbol, reference, ceil, floor) => {
// 		const pageEvaluateFunc = async (
// 			name,
// 			symbol,
// 			reference,
// 			ceil,
// 			floor
// 		) => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = name;
// 				dataJson.symbol = symbol;

// 				let date = new Date();
// 				dataJson.timeUpdate =
// 					date.getHours() +
// 					':' +
// 					date.getMinutes() +
// 					':' +
// 					date.getSeconds() +
// 					' ' +
// 					date.getDate() +
// 					'/' +
// 					(date.getMonth() + 1) +
// 					'/' +
// 					date.getFullYear();

// 				dataJson.reference = reference;
// 				dataJson.ceil = ceil;
// 				dataJson.floor = floor;
// 				dataJson.currentPrice = $(
// 					'#stockprice .price'
// 				)?.innerText.replace(/,/g, '.');
// 				dataJson.high = $('#highestprice')?.innerText;
// 				dataJson.low = $('#lowestprice')?.innerText;

// 				const changeInfo = $('#stockchange')?.innerText.split(' ');

// 				const changeByNumber = changeInfo[0];
// 				const changeByPercent = changeInfo[1].replace(/[\])}[{(]/g, '');
// 				dataJson.change = changeByNumber;
// 				dataJson.changePercent = changeByPercent;

// 				dataJson.openPrice =
// 					document.getElementById('openprice')?.innerText;
// 				dataJson.turnOver = $(
// 					'.stock-price-info :nth-child(2) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.marketcap = $(
// 					'.stock-price-info :nth-child(2) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.overBought = $(
// 					'.stock-price-info :nth-child(3) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.overSold = $(
// 					'.stock-price-info :nth-child(3) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.high52Week = $(
// 					'.stock-price-info :nth-child(3) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.low52Week = $(
// 					'.stock-price-info :nth-child(3) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.turnOver52WeekAverage = $(
// 					'.stock-price-info :nth-child(3) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.foreignBuy = $(
// 					'.stock-price-info :nth-child(4) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.ownedRatio = $(
// 					'.stock-price-info :nth-child(4) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.dividendCast = $(
// 					'.stock-price-info :nth-child(4) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.dividendYield = $(
// 					'.stock-price-info :nth-child(4) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.beta = $(
// 					'.stock-price-info :nth-child(4) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.eps = $(
// 					'.stock-price-info :nth-child(5) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.pe = $(
// 					'.stock-price-info :nth-child(5) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.fpe = $(
// 					'.stock-price-info :nth-child(5) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.bvps = $(
// 					'.stock-price-info :nth-child(5) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.pb = $(
// 					'.stock-price-info :nth-child(5) :nth-child(5) b'
// 				)?.innerText;

// 				dataJson.currentTimestamp = Math.floor(Date.now() / 1000);
// 			} catch (err) {
// 				console.log('crawldetail vn30' + err);
// 			}
// 			return dataJson;
// 		};

// 		const props = [name, symbol, reference, ceil, floor];

// 		let data = false;
// 		let attemps = 0;
// 		//retry request until it gets data or tries 3 times
// 		while (data == false && attemps < 2) {
// 			console.log('loop' + attemps);
// 			console.time(symbol);
// 			data = await collectQueryData(
// 				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
// 				pageEvaluateFunc,
// 				props
// 			);
// 			console.timeEnd(symbol);
// 			console.log(data);
// 			attemps++;

// 			if (data) {
// 				Vn30Detail.findOneAndUpdate(
// 					{ symbol: data.symbol },
// 					{
// 						name: data.name,
// 						symbol: data.symbol,
// 						timeUpdate: data.timeUpdate,
// 						reference: data.reference,
// 						ceil: data.ceil,
// 						floor: data.floor,
// 						currentPrice: data.currentPrice,
// 						change: data.change,
// 						changePercent: data.changePercent,
// 						openPrice: data.openPrice,
// 						high: data.high,
// 						low: data.low,
// 						turnOver: data.turnOver,

// 						marketcap: data.marketcap,
// 						overBought: data.overBought,
// 						overSold: data.overSold,
// 						high52Week: data.high52Week,
// 						low52Week: data.low52Week,
// 						turnOver52WeekAverage: data.turnOver52WeekAverage,
// 						foreignBuy: data.foreignBuy,
// 						ownedRatio: data.ownedRatio,
// 						dividendCast: data.dividendCast, //cổ tức tiền mặt
// 						dividendYield: data.dividendYield, // tỷ lệ cổ tức
// 						beta: data.beta,
// 						eps: data.eps,
// 						pe: data.pe,
// 						fpe: data.fpe, // F P/e
// 						bvps: data.bvps, //book value per share
// 						pb: data.pb,
// 						companyInfo: data.symbol,
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));

// 				Vn30Chart.findOneAndUpdate(
// 					{ symbol: data.symbol },
// 					{
// 						symbol: data.symbol,
// 						$push: {
// 							t: data.currentTimestamp,
// 							price: data.currentPrice,
// 						},
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));

// 				// await browser.close();
// 			}

// 			if (data === false) {
// 				//wait a few second, also a good idea to swap proxy here
// 				console.log('Recrawl........' + attemps);
// 				await new Promise((resolve) => setTimeout(resolve, 3000));
// 			}
// 		}
// 	}
// );

// const crawlDetailHose = asyncHandler(
// 	async (name, symbol, reference, ceil, floor) => {
// 		const pageEvaluateFunc = async (
// 			name,
// 			symbol,
// 			reference,
// 			ceil,
// 			floor
// 		) => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = name;
// 				dataJson.symbol = symbol;

// 				let date = new Date();
// 				dataJson.timeUpdate =
// 					date.getHours() +
// 					':' +
// 					date.getMinutes() +
// 					':' +
// 					date.getSeconds() +
// 					' ' +
// 					date.getDate() +
// 					'/' +
// 					(date.getMonth() + 1) +
// 					'/' +
// 					date.getFullYear();

// 				dataJson.reference = reference;
// 				dataJson.ceil = ceil;
// 				dataJson.floor = floor;
// 				dataJson.currentPrice = $(
// 					'#stockprice .price'
// 				)?.innerText.replace(/,/g, '.');
// 				dataJson.high = $('#highestprice')?.innerText;
// 				dataJson.low = $('#lowestprice')?.innerText;

// 				const changeInfo = $('#stockchange')?.innerText.split(' ');

// 				const changeByNumber = changeInfo[0];
// 				const changeByPercent = changeInfo[1].replace(/[\])}[{(]/g, '');
// 				dataJson.change = changeByNumber;
// 				dataJson.changePercent = changeByPercent;

// 				dataJson.openPrice =
// 					document.getElementById('openprice')?.innerText;
// 				dataJson.turnOver = $(
// 					'.stock-price-info :nth-child(2) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.marketcap = $(
// 					'.stock-price-info :nth-child(2) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.overBought = $(
// 					'.stock-price-info :nth-child(3) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.overSold = $(
// 					'.stock-price-info :nth-child(3) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.high52Week = $(
// 					'.stock-price-info :nth-child(3) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.low52Week = $(
// 					'.stock-price-info :nth-child(3) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.turnOver52WeekAverage = $(
// 					'.stock-price-info :nth-child(3) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.foreignBuy = $(
// 					'.stock-price-info :nth-child(4) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.ownedRatio = $(
// 					'.stock-price-info :nth-child(4) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.dividendCast = $(
// 					'.stock-price-info :nth-child(4) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.dividendYield = $(
// 					'.stock-price-info :nth-child(4) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.beta = $(
// 					'.stock-price-info :nth-child(4) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.eps = $(
// 					'.stock-price-info :nth-child(5) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.pe = $(
// 					'.stock-price-info :nth-child(5) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.fpe = $(
// 					'.stock-price-info :nth-child(5) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.bvps = $(
// 					'.stock-price-info :nth-child(5) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.pb = $(
// 					'.stock-price-info :nth-child(5) :nth-child(5) b'
// 				)?.innerText;

// 				dataJson.currentTimestamp = Math.floor(Date.now() / 1000);
// 			} catch (err) {
// 				console.log('crawldetail hose' + err);
// 			}
// 			return dataJson;
// 		};

// 		const props = [name, symbol, reference, ceil, floor];

// 		let data = false;
// 		let attemps = 0;
// 		//retry request until it gets data or tries 3 times
// 		while (data == false && attemps < 2) {
// 			console.log('loop' + attemps);
// 			console.time(symbol);
// 			data = await collectQueryData(
// 				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
// 				pageEvaluateFunc,
// 				props
// 			);
// 			console.timeEnd(symbol);
// 			console.log(data);
// 			attemps++;

// 			if (data) {
// 				HoseDetail.findOneAndUpdate(
// 					{ symbol: data.symbol },
// 					{
// 						name: data.name,
// 						symbol: data.symbol,
// 						timeUpdate: data.timeUpdate,
// 						reference: data.reference,
// 						ceil: data.ceil,
// 						floor: data.floor,
// 						currentPrice: data.currentPrice,
// 						change: data.change,
// 						changePercent: data.changePercent,
// 						openPrice: data.openPrice,
// 						high: data.high,
// 						low: data.low,
// 						turnOver: data.turnOver,

// 						marketcap: data.marketcap,
// 						overBought: data.overBought,
// 						overSold: data.overSold,
// 						high52Week: data.high52Week,
// 						low52Week: data.low52Week,
// 						turnOver52WeekAverage: data.turnOver52WeekAverage,
// 						foreignBuy: data.foreignBuy,
// 						ownedRatio: data.ownedRatio,
// 						dividendCast: data.dividendCast, //cổ tức tiền mặt
// 						dividendYield: data.dividendYield, // tỷ lệ cổ tức
// 						beta: data.beta,
// 						eps: data.eps,
// 						pe: data.pe,
// 						fpe: data.fpe, // F P/e
// 						bvps: data.bvps, //book value per share
// 						pb: data.pb,
// 						companyInfo: data.symbol,
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));

// 				HoseChart.findOneAndUpdate(
// 					{ symbol: data.symbol },
// 					{
// 						symbol: data.symbol,
// 						$push: {
// 							t: data.currentTimestamp,
// 							price: data.currentPrice,
// 						},
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));

// 				// await browser.close();
// 			}

// 			if (data === false) {
// 				//wait a few second, also a good idea to swap proxy here
// 				console.log('Recrawl........' + attemps);
// 				await new Promise((resolve) => setTimeout(resolve, 3000));
// 			}
// 		}
// 	}
// );

// const crawlDetailUpcom = asyncHandler(
// 	async (name, symbol, reference, ceil, floor) => {
// 		const pageEvaluateFunc = async (
// 			name,
// 			symbol,
// 			reference,
// 			ceil,
// 			floor
// 		) => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = name;
// 				dataJson.symbol = symbol;

// 				let date = new Date();
// 				dataJson.timeUpdate =
// 					date.getHours() +
// 					':' +
// 					date.getMinutes() +
// 					':' +
// 					date.getSeconds() +
// 					' ' +
// 					date.getDate() +
// 					'/' +
// 					(date.getMonth() + 1) +
// 					'/' +
// 					date.getFullYear();

// 				dataJson.reference = reference;
// 				dataJson.ceil = ceil;
// 				dataJson.floor = floor;
// 				dataJson.currentPrice = $(
// 					'#stockprice .price'
// 				)?.innerText.replace(/,/g, '.');
// 				dataJson.high = $('#highestprice')?.innerText;
// 				dataJson.low = $('#lowestprice')?.innerText;

// 				const changeInfo = $('#stockchange')?.innerText.split(' ');

// 				const changeByNumber = changeInfo[0];
// 				const changeByPercent = changeInfo[1].replace(/[\])}[{(]/g, '');
// 				dataJson.change = changeByNumber;
// 				dataJson.changePercent = changeByPercent;

// 				dataJson.openPrice =
// 					document.getElementById('openprice')?.innerText;
// 				dataJson.turnOver = $(
// 					'.stock-price-info :nth-child(2) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.marketcap = $(
// 					'.stock-price-info :nth-child(2) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.overBought = $(
// 					'.stock-price-info :nth-child(3) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.overSold = $(
// 					'.stock-price-info :nth-child(3) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.high52Week = $(
// 					'.stock-price-info :nth-child(3) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.low52Week = $(
// 					'.stock-price-info :nth-child(3) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.turnOver52WeekAverage = $(
// 					'.stock-price-info :nth-child(3) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.foreignBuy = $(
// 					'.stock-price-info :nth-child(4) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.ownedRatio = $(
// 					'.stock-price-info :nth-child(4) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.dividendCast = $(
// 					'.stock-price-info :nth-child(4) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.dividendYield = $(
// 					'.stock-price-info :nth-child(4) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.beta = $(
// 					'.stock-price-info :nth-child(4) :nth-child(5) b'
// 				)?.innerText;
// 				dataJson.eps = $(
// 					'.stock-price-info :nth-child(5) :nth-child(1) b'
// 				)?.innerText;
// 				dataJson.pe = $(
// 					'.stock-price-info :nth-child(5) :nth-child(2) b'
// 				)?.innerText;
// 				dataJson.fpe = $(
// 					'.stock-price-info :nth-child(5) :nth-child(3) b'
// 				)?.innerText;
// 				dataJson.bvps = $(
// 					'.stock-price-info :nth-child(5) :nth-child(4) b'
// 				)?.innerText;
// 				dataJson.pb = $(
// 					'.stock-price-info :nth-child(5) :nth-child(5) b'
// 				)?.innerText;

// 				dataJson.currentTimestamp = Math.floor(Date.now() / 1000);
// 			} catch (err) {
// 				console.log('crawldetail upcom' + err);
// 			}
// 			return dataJson;
// 		};

// 		const props = [name, symbol, reference, ceil, floor];

// 		let data = false;
// 		let attemps = 0;
// 		//retry request until it gets data or tries 3 times
// 		while (data == false && attemps < 2) {
// 			console.log('loop' + attemps);
// 			console.time(symbol);
// 			data = await collectQueryData(
// 				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
// 				pageEvaluateFunc,
// 				props
// 			);
// 			console.timeEnd(symbol);
// 			console.log(data);
// 			attemps++;

// 			if (data) {
// 				UpcomDetail.findOneAndUpdate(
// 					{ symbol: data.symbol },
// 					{
// 						name: data.name,
// 						symbol: data.symbol,
// 						timeUpdate: data.timeUpdate,
// 						reference: data.reference,
// 						ceil: data.ceil,
// 						floor: data.floor,
// 						currentPrice: data.currentPrice,
// 						change: data.change,
// 						changePercent: data.changePercent,
// 						openPrice: data.openPrice,
// 						high: data.high,
// 						low: data.low,
// 						turnOver: data.turnOver,

// 						marketcap: data.marketcap,
// 						overBought: data.overBought,
// 						overSold: data.overSold,
// 						high52Week: data.high52Week,
// 						low52Week: data.low52Week,
// 						turnOver52WeekAverage: data.turnOver52WeekAverage,
// 						foreignBuy: data.foreignBuy,
// 						ownedRatio: data.ownedRatio,
// 						dividendCast: data.dividendCast, //cổ tức tiền mặt
// 						dividendYield: data.dividendYield, // tỷ lệ cổ tức
// 						beta: data.beta,
// 						eps: data.eps,
// 						pe: data.pe,
// 						fpe: data.fpe, // F P/e
// 						bvps: data.bvps, //book value per share
// 						pb: data.pb,
// 						companyInfo: data.symbol,
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));

// 				UpcomChart.findOneAndUpdate(
// 					{ symbol: data.symbol },
// 					{
// 						symbol: data.symbol,
// 						$push: {
// 							t: data.currentTimestamp,
// 							price: data.currentPrice,
// 						},
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));

// 				// await browser.close();
// 			}

// 			if (data === false) {
// 				//wait a few second, also a good idea to swap proxy here
// 				console.log('Recrawl........' + attemps);
// 				await new Promise((resolve) => setTimeout(resolve, 3000));
// 			}
// 		}
// 	}
// );

// const crawlDetailAllInvesting = asyncHandler(async (id, name, hrefDetail) => {
// 	const pageEvaluateFunc = async (id, name) => {
// 		const $ = document.querySelector.bind(document);
// 		const $$ = document.querySelectorAll.bind(document);

// 		let dataJson = {};

// 		try {
// 			dataJson.id = id;
// 			dataJson.name = name;
// 			dataJson.symbol = $('main div h2')?.innerText.slice(10);
// 			dataJson.descriptionCompany = document.getElementsByClassName(
// 				'company-profile_profile-description__30Rta'
// 			)[0]?.innerText;
// 			let mainElement = $$(
// 				'.instrumentOverview_overview-section__2hN4A'
// 			)[5];
// 			dataJson.major = mainElement.querySelector(
// 				'div :nth-child(6) div :nth-child(3) :nth-child(1) a '
// 			)?.innerText;
// 			dataJson.field = mainElement.querySelector(
// 				'div :nth-child(6) div :nth-child(3) :nth-child(2) a '
// 			)?.innerText;
// 		} catch (err) {
// 			console.log('crawldetail allinvesting' + err);
// 		}
// 		// await delay(2000);
// 		return dataJson;
// 	};

// 	const props = [id, name];

// 	let data = false;
// 	let attemps = 0;
// 	//retry request until it gets data or tries 3 times
// 	while (data == false && attemps < 2) {
// 		console.log('loop' + attemps);
// 		data = await collectQueryData(
// 			`https://vn.investing.com${hrefDetail}`,
// 			pageEvaluateFunc,
// 			props
// 		);
// 		console.log(data);
// 		attemps++;

// 		if (data) {
// 			AllInvestingDetail.findOneAndUpdate(
// 				{ symbol: allInvestingDetailData.symbol },
// 				{
// 					_id: allInvestingDetailData.symbol,
// 					id: allInvestingDetailData.id,
// 					name: allInvestingDetailData.name,
// 					symbol: allInvestingDetailData.symbol,
// 					descriptionCompany:
// 						allInvestingDetailData.descriptionCompany,
// 					major: allInvestingDetailData.major,
// 					field: allInvestingDetailData.field,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.sy))
// 				.catch((err) => console.log('crawldetail allinvesting' + err));

// 			// await browser.close();
// 		}

// 		if (data === false) {
// 			//wait a few second, also a good idea to swap proxy here
// 			console.log('Recrawl........' + attemps);
// 			await new Promise((resolve) => setTimeout(resolve, 3000));
// 		}
// 	}
// });

module.exports = {
	crawlDetailHnx30,
	crawlDetailHnx,
	crawlDetailVn30,
	crawlDetailHose,
	crawlDetailUpcom,
	crawlDetailAllInvesting,
};

// const crawlDetailHnx30 = asyncHandler(async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const hnx30All = await Hnx30.find();

// 		//start loop
// 		console.log('starting...............');
// 		hnx30All.map(async (stock, index) => {
// 			setTimeout(async () => {
// 				const page = await browser.newPage();
// 				await page.goto(
// 					`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
// 					{ waitUntil: 'load' }
// 				);
// 				await page.waitForTimeout(2000);

// 				let hnx30DetailData = await page.evaluate(async () => {
// 					const $ = document.querySelector.bind(document);

// 					let dataJson = {};

// 					try {
// 						dataJson.name = 'name';
// 						dataJson.symbol = 'symbol';
// 						dataJson.reference = 'reference';
// 						dataJson.ceil = 'ceil';
// 						dataJson.floor = 'floor';
// 						dataJson.currentPrice = 'currentPrice';
// 						dataJson.high = 'high';
// 						dataJson.low = 'low';
// 						dataJson.change = 'change';
// 						dataJson.changePercent = 'changePercent';
// 						dataJson.openPrice =
// 							document.getElementById('openprice')?.innerText;
// 						dataJson.turnOver = 'turnOver';
// 						dataJson.marketcap = $(
// 							'.stock-price-info :nth-child(2) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.overBought = $(
// 							'.stock-price-info :nth-child(3) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.overSold = $(
// 							'.stock-price-info :nth-child(3) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.high52Week = $(
// 							'.stock-price-info :nth-child(3) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.low52Week = $(
// 							'.stock-price-info :nth-child(3) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.turnOver52WeekAverage = $(
// 							'.stock-price-info :nth-child(3) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.foreignBuy = $(
// 							'.stock-price-info :nth-child(4) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.ownedRatio = $(
// 							'.stock-price-info :nth-child(4) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.dividendCast = $(
// 							'.stock-price-info :nth-child(4) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.dividendYield = $(
// 							'.stock-price-info :nth-child(4) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.beta = $(
// 							'.stock-price-info :nth-child(4) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.eps = $(
// 							'.stock-price-info :nth-child(5) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.pe = $(
// 							'.stock-price-info :nth-child(5) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.fpe = $(
// 							'.stock-price-info :nth-child(5) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.bvps = $(
// 							'.stock-price-info :nth-child(5) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.pb = $(
// 							'.stock-price-info :nth-child(5) :nth-child(5) b'
// 						)?.innerText;

// 						dataJson.currentTimestamp = Math.floor(
// 							Date.now() / 1000
// 						);
// 					} catch (err) {
// 						console.log('crawldetail hnx30' + err);
// 					}
// 					return dataJson;
// 				});

// 				await page.close();

// 				console.log(hnx30DetailData.name);

// 				Hnx30Detail.findOneAndUpdate(
// 					{ symbol: hnx30DetailData.symbol },
// 					{
// 						name: hnx30DetailData.name,
// 						symbol: hnx30DetailData.symbol,
// 						reference: hnx30DetailData.reference,
// 						ceil: hnx30DetailData.ceil,
// 						floor: hnx30DetailData.floor,
// 						currentPrice: hnx30DetailData.currentPrice,
// 						change: hnx30DetailData.change,
// 						changePercent: hnx30DetailData.changePercent,
// 						openPrice: hnx30DetailData.openPrice,
// 						high: hnx30DetailData.high,
// 						low: hnx30DetailData.low,
// 						turnOver: hnx30DetailData.turnOver,

// 						marketcap: hnx30DetailData.marketcap,
// 						overBought: hnx30DetailData.overBought,
// 						overSold: hnx30DetailData.overSold,
// 						high52Week: hnx30DetailData.high52Week,
// 						low52Week: hnx30DetailData.low52Week,
// 						turnOver52WeekAverage:
// 							hnx30DetailData.turnOver52WeekAverage,
// 						foreignBuy: hnx30DetailData.foreignBuy,
// 						ownedRatio: hnx30DetailData.ownedRatio,
// 						dividendCast: hnx30DetailData.dividendCast, //cổ tức tiền mặt
// 						dividendYield: hnx30DetailData.dividendYield, // tỷ lệ cổ tức
// 						beta: hnx30DetailData.beta,
// 						eps: hnx30DetailData.eps,
// 						pe: hnx30DetailData.pe,
// 						fpe: hnx30DetailData.fpe, // F P/e
// 						bvps: hnx30DetailData.bvps, //book value per share
// 						pb: hnx30DetailData.pb,
// 						companyInfo: hnx30DetailData.symbol,
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));

// 				Hnx30Chart.findOneAndUpdate(
// 					{ symbol: hnx30DetailData.symbol },
// 					{
// 						symbol: hnx30DetailData.symbol,
// 						$push: {
// 							t: hnx30DetailData.currentTimestamp,
// 							price: hnx30DetailData.currentPrice,
// 						},
// 					},
// 					{ upsert: true }
// 				)
// 					// .then((doc) => console.log(doc?.symbol))
// 					.catch((err) => console.log('crawldetail hnx30' + err));
// 				// return hnx30DetailData
// 			}, 7000 * index);
// 		});
// 		console.log('end.............');

// 		await browser.close();
// 	} catch (error) {
// 		console.log('crawldetail hnx30' + error);
// 	}
// 	// })
// });

// const crawlDetailHnx = asyncHandler(
// 	async (
// 		name,
// 		symbol,
// 		reference,
// 		ceil,
// 		floor,
// 		currentPrice,
// 		high,
// 		low,
// 		change,
// 		changePercent,
// 		turnOver
// 	) => {
// 		try {
// 			const browser = await puppeteer.launch({
// 				args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 			});
// 			const page = await browser.newPage();
// 			let status = await page.goto(
// 				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
// 				{
// 					timeout: 0,
// 				}
// 			);

// 			await page.waitForTimeout(2000);

// 			let hnxDetailData = await page.evaluate(
// 				async (
// 					name,
// 					symbol,
// 					reference,
// 					ceil,
// 					floor,
// 					currentPrice,
// 					high,
// 					low,
// 					change,
// 					changePercent,
// 					turnOver
// 				) => {
// 					const $ = document.querySelector.bind(document);

// 					let dataJson = {};

// 					try {
// 						dataJson.name = name;
// 						dataJson.symbol = symbol;
// 						dataJson.reference = reference;
// 						dataJson.ceil = ceil;
// 						dataJson.floor = floor;
// 						dataJson.currentPrice = currentPrice;
// 						dataJson.high = high;
// 						dataJson.low = low;
// 						dataJson.change = change;
// 						dataJson.changePercent = changePercent;
// 						dataJson.openPrice =
// 							document.getElementById('openprice')?.innerText;
// 						dataJson.turnOver = turnOver;
// 						dataJson.marketcap = $(
// 							'.stock-price-info :nth-child(2) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.overBought = $(
// 							'.stock-price-info :nth-child(3) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.overSold = $(
// 							'.stock-price-info :nth-child(3) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.high52Week = $(
// 							'.stock-price-info :nth-child(3) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.low52Week = $(
// 							'.stock-price-info :nth-child(3) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.turnOver52WeekAverage = $(
// 							'.stock-price-info :nth-child(3) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.foreignBuy = $(
// 							'.stock-price-info :nth-child(4) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.ownedRatio = $(
// 							'.stock-price-info :nth-child(4) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.dividendCast = $(
// 							'.stock-price-info :nth-child(4) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.dividendYield = $(
// 							'.stock-price-info :nth-child(4) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.beta = $(
// 							'.stock-price-info :nth-child(4) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.eps = $(
// 							'.stock-price-info :nth-child(5) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.pe = $(
// 							'.stock-price-info :nth-child(5) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.fpe = $(
// 							'.stock-price-info :nth-child(5) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.bvps = $(
// 							'.stock-price-info :nth-child(5) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.pb = $(
// 							'.stock-price-info :nth-child(5) :nth-child(5) b'
// 						)?.innerText;

// 						dataJson.currentTimestamp = Math.floor(
// 							Date.now() / 1000
// 						);
// 					} catch (err) {
// 						console.log('crawldetail hnx' + err);
// 					}
// 					return dataJson;
// 				},
// 				name,
// 				symbol,
// 				reference,
// 				ceil,
// 				floor,
// 				currentPrice,
// 				high,
// 				low,
// 				change,
// 				changePercent,
// 				turnOver
// 			);

// 			// console.log(hnxDetailData);

// 			HnxDetail.findOneAndUpdate(
// 				{ symbol: hnxDetailData.symbol },
// 				{
// 					name: hnxDetailData.name,
// 					symbol: hnxDetailData.symbol,
// 					reference: hnxDetailData.reference,
// 					ceil: hnxDetailData.ceil,
// 					floor: hnxDetailData.floor,
// 					currentPrice: hnxDetailData.currentPrice,
// 					change: hnxDetailData.change,
// 					changePercent: hnxDetailData.changePercent,
// 					openPrice: hnxDetailData.openPrice,
// 					high: hnxDetailData.high,
// 					low: hnxDetailData.low,
// 					turnOver: hnxDetailData.turnOver,

// 					marketcap: hnxDetailData.marketcap,
// 					overBought: hnxDetailData.overBought,
// 					overSold: hnxDetailData.overSold,
// 					high52Week: hnxDetailData.high52Week,
// 					low52Week: hnxDetailData.low52Week,
// 					turnOver52WeekAverage: hnxDetailData.turnOver52WeekAverage,
// 					foreignBuy: hnxDetailData.foreignBuy,
// 					ownedRatio: hnxDetailData.ownedRatio,
// 					dividendCast: hnxDetailData.dividendCast, //cổ tức tiền mặt
// 					dividendYield: hnxDetailData.dividendYield, // tỷ lệ cổ tức
// 					beta: hnxDetailData.beta,
// 					eps: hnxDetailData.eps,
// 					pe: hnxDetailData.pe,
// 					fpe: hnxDetailData.fpe, // F P/e
// 					bvps: hnxDetailData.bvps, //book value per share
// 					pb: hnxDetailData.pb,
// 					companyInfo: hnxDetailData.symbol,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawldetail hnx' + err));

// 			HnxChart.findOneAndUpdate(
// 				{ symbol: hnxDetailData.symbol },
// 				{
// 					symbol: hnxDetailData.symbol,
// 					$push: {
// 						t: hnxDetailData.currentTimestamp,
// 						price: hnxDetailData.currentPrice,
// 					},
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawldetail hnx' + err));
// 			// return hnxDetailData

// 			await browser.close();
// 		} catch (error) {
// 			console.log('crawldetail hnx' + error);
// 		}
// 		// })
// 	}
// );

// const crawlDetailVn30 = asyncHandler(
// 	async (
// 		name,
// 		symbol,
// 		reference,
// 		ceil,
// 		floor,
// 		currentPrice,
// 		high,
// 		low,
// 		change,
// 		changePercent,
// 		turnOver
// 	) => {
// 		try {
// 			const browser = await puppeteer.launch({
// 				args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 			});
// 			const page = await browser.newPage();
// 			let status = await page.goto(
// 				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
// 				{ timeout: 0 }
// 			);

// 			await page.waitForTimeout(2000);

// 			let vn30DetailData = await page.evaluate(
// 				async (
// 					name,
// 					symbol,
// 					reference,
// 					ceil,
// 					floor,
// 					currentPrice,
// 					high,
// 					low,
// 					change,
// 					changePercent,
// 					turnOver
// 				) => {
// 					const $ = document.querySelector.bind(document);

// 					let dataJson = {};

// 					try {
// 						dataJson.name = name;
// 						dataJson.symbol = symbol;
// 						dataJson.reference = reference;
// 						dataJson.ceil = ceil;
// 						dataJson.floor = floor;
// 						dataJson.currentPrice = currentPrice;
// 						dataJson.high = high;
// 						dataJson.low = low;
// 						dataJson.change = change;
// 						dataJson.changePercent = changePercent;
// 						dataJson.openPrice =
// 							document.getElementById('openprice')?.innerText;
// 						dataJson.turnOver = turnOver;
// 						dataJson.marketcap = $(
// 							'.stock-price-info :nth-child(2) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.overBought = $(
// 							'.stock-price-info :nth-child(3) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.overSold = $(
// 							'.stock-price-info :nth-child(3) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.high52Week = $(
// 							'.stock-price-info :nth-child(3) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.low52Week = $(
// 							'.stock-price-info :nth-child(3) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.turnOver52WeekAverage = $(
// 							'.stock-price-info :nth-child(3) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.foreignBuy = $(
// 							'.stock-price-info :nth-child(4) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.ownedRatio = $(
// 							'.stock-price-info :nth-child(4) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.dividendCast = $(
// 							'.stock-price-info :nth-child(4) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.dividendYield = $(
// 							'.stock-price-info :nth-child(4) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.beta = $(
// 							'.stock-price-info :nth-child(4) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.eps = $(
// 							'.stock-price-info :nth-child(5) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.pe = $(
// 							'.stock-price-info :nth-child(5) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.fpe = $(
// 							'.stock-price-info :nth-child(5) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.bvps = $(
// 							'.stock-price-info :nth-child(5) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.pb = $(
// 							'.stock-price-info :nth-child(5) :nth-child(5) b'
// 						)?.innerText;

// 						dataJson.currentTimestamp = Math.floor(
// 							Date.now() / 1000
// 						);
// 					} catch (err) {
// 						console.log('crawldetail vn30' + err);
// 					}
// 					return dataJson;
// 				},
// 				name,
// 				symbol,
// 				reference,
// 				ceil,
// 				floor,
// 				currentPrice,
// 				high,
// 				low,
// 				change,
// 				changePercent,
// 				turnOver
// 			);

// 			// console.log(vn30DetailData);

// 			Vn30Detail.findOneAndUpdate(
// 				{ symbol: vn30DetailData.symbol },
// 				{
// 					name: vn30DetailData.name,
// 					symbol: vn30DetailData.symbol,
// 					reference: vn30DetailData.reference,
// 					ceil: vn30DetailData.ceil,
// 					floor: vn30DetailData.floor,
// 					currentPrice: vn30DetailData.currentPrice,
// 					change: vn30DetailData.change,
// 					changePercent: vn30DetailData.changePercent,
// 					openPrice: vn30DetailData.openPrice,
// 					high: vn30DetailData.high,
// 					low: vn30DetailData.low,
// 					turnOver: vn30DetailData.turnOver,

// 					marketcap: vn30DetailData.marketcap,
// 					overBought: vn30DetailData.overBought,
// 					overSold: vn30DetailData.overSold,
// 					high52Week: vn30DetailData.high52Week,
// 					low52Week: vn30DetailData.low52Week,
// 					turnOver52WeekAverage: vn30DetailData.turnOver52WeekAverage,
// 					foreignBuy: vn30DetailData.foreignBuy,
// 					ownedRatio: vn30DetailData.ownedRatio,
// 					dividendCast: vn30DetailData.dividendCast, //cổ tức tiền mặt
// 					dividendYield: vn30DetailData.dividendYield, // tỷ lệ cổ tức
// 					beta: vn30DetailData.beta,
// 					eps: vn30DetailData.eps,
// 					pe: vn30DetailData.pe,
// 					fpe: vn30DetailData.fpe, // F P/e
// 					bvps: vn30DetailData.bvps, //book value per share
// 					pb: vn30DetailData.pb,
// 					companyInfo: vn30DetailData.symbol,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawldetail vn30' + err));

// 			Vn30Chart.findOneAndUpdate(
// 				{ symbol: vn30DetailData.symbol },
// 				{
// 					symbol: vn30DetailData.symbol,
// 					$push: {
// 						t: vn30DetailData.currentTimestamp,
// 						price: vn30DetailData.currentPrice,
// 					},
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawldetail vn30' + err));
// 			// return vn30DetailData

// 			await browser.close();
// 		} catch (error) {
// 			console.log('crawldetail vn30' + error);
// 		}
// 	}
// );

// const crawlDetailHose = asyncHandler(
// 	async (
// 		name,
// 		symbol,
// 		reference,
// 		ceil,
// 		floor,
// 		currentPrice,
// 		high,
// 		low,
// 		change,
// 		changePercent,
// 		turnOver
// 	) => {
// 		// cron.schedule('*/20 * * * * *', async () =>{

// 		// const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

// 		// let selector = `td[data-tooltip = ${name}]`

// 		try {
// 			const browser = await puppeteer.launch({
// 				args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 			});
// 			const page = await browser.newPage();
// 			let status = await page.goto(
// 				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
// 				{ timeout: 0 }
// 			);
// 			// await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
// 			// await page.click(`[data-value = ${symbol}]`)
// 			// const selector = await page.$(`#sym-328`)
// 			// await page.waitForSelector(`span[data-value=${symbol}]`)
// 			// await page.click('#sym-328')
// 			await page.waitForTimeout(2000);
// 			// await page.click(`[data-value=${symbol}]`)
// 			// await page.waitForSelector('#symbol-detail-popup', { visible: true })

// 			// await page.evaluate(selector, (selector) => selector.click())
// 			// await page.waitForTimeout(3000)
// 			let hoseDetailData = await page.evaluate(
// 				async (
// 					name,
// 					symbol,
// 					reference,
// 					ceil,
// 					floor,
// 					currentPrice,
// 					high,
// 					low,
// 					change,
// 					changePercent,
// 					turnOver
// 				) => {
// 					const $ = document.querySelector.bind(document);

// 					let dataJson = {};

// 					try {
// 						dataJson.name = name;
// 						dataJson.symbol = symbol;
// 						dataJson.reference = reference;
// 						dataJson.ceil = ceil;
// 						dataJson.floor = floor;
// 						dataJson.currentPrice = currentPrice;
// 						dataJson.high = high;
// 						dataJson.low = low;
// 						dataJson.change = change;
// 						dataJson.changePercent = changePercent;
// 						dataJson.openPrice =
// 							document.getElementById('openprice')?.innerText;
// 						dataJson.turnOver = turnOver;
// 						dataJson.marketcap = $(
// 							'.stock-price-info :nth-child(2) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.overBought = $(
// 							'.stock-price-info :nth-child(3) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.overSold = $(
// 							'.stock-price-info :nth-child(3) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.high52Week = $(
// 							'.stock-price-info :nth-child(3) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.low52Week = $(
// 							'.stock-price-info :nth-child(3) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.turnOver52WeekAverage = $(
// 							'.stock-price-info :nth-child(3) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.foreignBuy = $(
// 							'.stock-price-info :nth-child(4) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.ownedRatio = $(
// 							'.stock-price-info :nth-child(4) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.dividendCast = $(
// 							'.stock-price-info :nth-child(4) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.dividendYield = $(
// 							'.stock-price-info :nth-child(4) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.beta = $(
// 							'.stock-price-info :nth-child(4) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.eps = $(
// 							'.stock-price-info :nth-child(5) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.pe = $(
// 							'.stock-price-info :nth-child(5) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.fpe = $(
// 							'.stock-price-info :nth-child(5) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.bvps = $(
// 							'.stock-price-info :nth-child(5) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.pb = $(
// 							'.stock-price-info :nth-child(5) :nth-child(5) b'
// 						)?.innerText;

// 						dataJson.currentTimestamp = Math.floor(
// 							Date.now() / 1000
// 						);
// 					} catch (err) {
// 						console.log('crawldetail hose' + err);
// 					}
// 					return dataJson;
// 				},
// 				name,
// 				symbol,
// 				reference,
// 				ceil,
// 				floor,
// 				currentPrice,
// 				high,
// 				low,
// 				change,
// 				changePercent,
// 				turnOver
// 			);

// 			// console.log(hoseDetailData);

// 			HoseDetail.findOneAndUpdate(
// 				{ symbol: hoseDetailData.symbol },
// 				{
// 					name: hoseDetailData.name,
// 					symbol: hoseDetailData.symbol,
// 					reference: hoseDetailData.reference,
// 					ceil: hoseDetailData.ceil,
// 					floor: hoseDetailData.floor,
// 					currentPrice: hoseDetailData.currentPrice,
// 					change: hoseDetailData.change,
// 					changePercent: hoseDetailData.changePercent,
// 					openPrice: hoseDetailData.openPrice,
// 					high: hoseDetailData.high,
// 					low: hoseDetailData.low,
// 					turnOver: hoseDetailData.turnOver,

// 					marketcap: hoseDetailData.marketcap,
// 					overBought: hoseDetailData.overBought,
// 					overSold: hoseDetailData.overSold,
// 					high52Week: hoseDetailData.high52Week,
// 					low52Week: hoseDetailData.low52Week,
// 					turnOver52WeekAverage: hoseDetailData.turnOver52WeekAverage,
// 					foreignBuy: hoseDetailData.foreignBuy,
// 					ownedRatio: hoseDetailData.ownedRatio,
// 					dividendCast: hoseDetailData.dividendCast, //cổ tức tiền mặt
// 					dividendYield: hoseDetailData.dividendYield, // tỷ lệ cổ tức
// 					beta: hoseDetailData.beta,
// 					eps: hoseDetailData.eps,
// 					pe: hoseDetailData.pe,
// 					fpe: hoseDetailData.fpe, // F P/e
// 					bvps: hoseDetailData.bvps, //book value per share
// 					pb: hoseDetailData.pb,
// 					companyInfo: hoseDetailData.symbol,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawldetail hose' + err));

// 			HoseChart.findOneAndUpdate(
// 				{ symbol: hoseDetailData.symbol },
// 				{
// 					symbol: hoseDetailData.symbol,
// 					$push: {
// 						t: hoseDetailData.currentTimestamp,
// 						price: hoseDetailData.currentPrice,
// 					},
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawldetail hose' + err));
// 			// return hoseDetailData

// 			await browser.close();
// 		} catch (error) {
// 			console.log('crawldetail hose' + error);
// 		}
// 		// })
// 	}
// );

// const crawlDetailUpcom = asyncHandler(
// 	async (
// 		name,
// 		symbol,
// 		reference,
// 		ceil,
// 		floor,
// 		currentPrice,
// 		high,
// 		low,
// 		change,
// 		changePercent,
// 		turnOver
// 	) => {
// 		// cron.schedule('*/20 * * * * *', async () =>{

// 		// const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

// 		// let selector = `td[data-tooltip = ${name}]`

// 		try {
// 			const browser = await puppeteer.launch({
// 				args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 			});
// 			const page = await browser.newPage();
// 			let status = await page.goto(
// 				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
// 				{ timeout: 0 }
// 			);
// 			// await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
// 			// await page.click(`[data-value = ${symbol}]`)
// 			// const selector = await page.$(`#sym-328`)
// 			// await page.waitForSelector(`span[data-value=${symbol}]`)
// 			// await page.click('#sym-328')
// 			await page.waitForTimeout(2000);
// 			// await page.click(`[data-value=${symbol}]`)
// 			// await page.waitForSelector('#symbol-detail-popup', { visible: true })

// 			// await page.evaluate(selector, (selector) => selector.click())
// 			// await page.waitForTimeout(3000)
// 			let upcomDetailData = await page.evaluate(
// 				async (
// 					name,
// 					symbol,
// 					reference,
// 					ceil,
// 					floor,
// 					currentPrice,
// 					high,
// 					low,
// 					change,
// 					changePercent,
// 					turnOver
// 				) => {
// 					const $ = document.querySelector.bind(document);

// 					let dataJson = {};

// 					try {
// 						dataJson.name = name;
// 						dataJson.symbol = symbol;
// 						dataJson.reference = reference;
// 						dataJson.ceil = ceil;
// 						dataJson.floor = floor;
// 						dataJson.currentPrice = currentPrice;
// 						dataJson.high = high;
// 						dataJson.low = low;
// 						dataJson.change = change;
// 						dataJson.changePercent = changePercent;
// 						dataJson.openPrice =
// 							document.getElementById('openprice')?.innerText;
// 						dataJson.turnOver = turnOver;
// 						dataJson.marketcap = $(
// 							'.stock-price-info :nth-child(2) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.overBought = $(
// 							'.stock-price-info :nth-child(3) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.overSold = $(
// 							'.stock-price-info :nth-child(3) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.high52Week = $(
// 							'.stock-price-info :nth-child(3) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.low52Week = $(
// 							'.stock-price-info :nth-child(3) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.turnOver52WeekAverage = $(
// 							'.stock-price-info :nth-child(3) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.foreignBuy = $(
// 							'.stock-price-info :nth-child(4) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.ownedRatio = $(
// 							'.stock-price-info :nth-child(4) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.dividendCast = $(
// 							'.stock-price-info :nth-child(4) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.dividendYield = $(
// 							'.stock-price-info :nth-child(4) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.beta = $(
// 							'.stock-price-info :nth-child(4) :nth-child(5) b'
// 						)?.innerText;
// 						dataJson.eps = $(
// 							'.stock-price-info :nth-child(5) :nth-child(1) b'
// 						)?.innerText;
// 						dataJson.pe = $(
// 							'.stock-price-info :nth-child(5) :nth-child(2) b'
// 						)?.innerText;
// 						dataJson.fpe = $(
// 							'.stock-price-info :nth-child(5) :nth-child(3) b'
// 						)?.innerText;
// 						dataJson.bvps = $(
// 							'.stock-price-info :nth-child(5) :nth-child(4) b'
// 						)?.innerText;
// 						dataJson.pb = $(
// 							'.stock-price-info :nth-child(5) :nth-child(5) b'
// 						)?.innerText;

// 						dataJson.currentTimestamp = Math.floor(
// 							Date.now() / 1000
// 						);
// 					} catch (err) {
// 						console.log('crawldetail upcom' + err);
// 					}
// 					return dataJson;
// 				},
// 				name,
// 				symbol,
// 				reference,
// 				ceil,
// 				floor,
// 				currentPrice,
// 				high,
// 				low,
// 				change,
// 				changePercent,
// 				turnOver
// 			);

// 			// console.log(upcomDetailData);

// 			UpcomDetail.findOneAndUpdate(
// 				{ symbol: upcomDetailData.symbol },
// 				{
// 					name: upcomDetailData.name,
// 					symbol: upcomDetailData.symbol,
// 					reference: upcomDetailData.reference,
// 					ceil: upcomDetailData.ceil,
// 					floor: upcomDetailData.floor,
// 					currentPrice: upcomDetailData.currentPrice,
// 					change: upcomDetailData.change,
// 					changePercent: upcomDetailData.changePercent,
// 					openPrice: upcomDetailData.openPrice,
// 					high: upcomDetailData.high,
// 					low: upcomDetailData.low,
// 					turnOver: upcomDetailData.turnOver,

// 					marketcap: upcomDetailData.marketcap,
// 					overBought: upcomDetailData.overBought,
// 					overSold: upcomDetailData.overSold,
// 					high52Week: upcomDetailData.high52Week,
// 					low52Week: upcomDetailData.low52Week,
// 					turnOver52WeekAverage:
// 						upcomDetailData.turnOver52WeekAverage,
// 					foreignBuy: upcomDetailData.foreignBuy,
// 					ownedRatio: upcomDetailData.ownedRatio,
// 					dividendCast: upcomDetailData.dividendCast, //cổ tức tiền mặt
// 					dividendYield: upcomDetailData.dividendYield, // tỷ lệ cổ tức
// 					beta: upcomDetailData.beta,
// 					eps: upcomDetailData.eps,
// 					pe: upcomDetailData.pe,
// 					fpe: upcomDetailData.fpe, // F P/e
// 					bvps: upcomDetailData.bvps, //book value per share
// 					pb: upcomDetailData.pb,
// 					companyInfo: upcomDetailData.symbol,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawldetail upcom' + err));

// 			UpcomChart.findOneAndUpdate(
// 				{ symbol: upcomDetailData.symbol },
// 				{
// 					symbol: upcomDetailData.symbol,
// 					$push: {
// 						t: upcomDetailData.currentTimestamp,
// 						price: upcomDetailData.currentPrice,
// 					},
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawldetail upcom' + err));
// 			// return upcomDetailData

// 			await browser.close();
// 		} catch (error) {
// 			console.log('crawldetail upcom' + error);
// 		}
// 		// })
// 	}
// );

// const crawlDetailAllInvesting = asyncHandler(async (id, name, hrefDetail) => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		let status = await page.goto(`https://vn.investing.com${hrefDetail}`, {
// 			timeout: 0,
// 		});
// 		// await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
// 		// await page.click(`[data-value = ${symbol}]`)
// 		// const selector = await page.$(`#sym-328`)
// 		// await page.waitForSelector(`span[data-value=${symbol}]`)
// 		// await page.click('#sym-328')
// 		// await page.click(`[data-value=${symbol}]`)
// 		// await page.waitForSelector('#symbol-detail-popup', { visible: true })
// 		// await page.evaluate(selector, (selector) => selector.click())
// 		await page.waitForTimeout(3000);

// 		// const bodyHandle = await page.$('body');
// 		// const { height } = await bodyHandle.boundingBox();
// 		// await bodyHandle.dispose();

// 		// // Scroll one viewport at a time, pausing to let content load
// 		// const viewportHeight = page.viewport().height;
// 		// let viewportIncr = 0;
// 		// while (viewportIncr + viewportHeight < height) {
// 		//     await page.evaluate(_viewportHeight => {
// 		//         window.scrollBy(0, _viewportHeight);
// 		//     }, viewportHeight);
// 		//     await page.waitForTimeout(2000);
// 		//     viewportIncr = viewportIncr + viewportHeight;
// 		// }

// 		// // Scroll back to top
// 		// await page.evaluate(_ => {
// 		//     window.scrollTo(0, 0);
// 		// });

// 		// // Some extra delay to let all data load
// 		// await page.waitForTimeout(1000);

// 		let allInvestingDetailData = await page.evaluate(
// 			async (id, name) => {
// 				const $ = document.querySelector.bind(document);
// 				const $$ = document.querySelectorAll.bind(document);

// 				// let mainElement = document.querySelector("div[data-set='chat-panel-main']").previousSibling
// 				// let infoCompanyElement = mainElement.querySelector(':nth-last-child(2)')

// 				let dataJson = {};

// 				try {
// 					dataJson.id = id;
// 					dataJson.name = name;
// 					dataJson.symbol = $('main div h2')?.innerText.slice(10);
// 					// dataJson.currentPrice = document.querySelector("span[data-test='instrument-price-last']")?.innerText
// 					// dataJson.referencePrice = document.querySelector('dl div:nth-child(1) dd span :nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(1) dd span :nth-child(2)')?.innerText
// 					// dataJson.openPrice = document.querySelector('dl div:nth-child(4) dd span :nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(4) dd span :nth-child(2)')?.innerText
// 					// dataJson.buyPrice = document.querySelector('[data-test="instrument-header-details"] :nth-child(3) :nth-child(2) :nth-child(2) :nth-child(1)')?.innerText
// 					// dataJson.sellPrice = document.querySelector('[data-test="instrument-header-details"] :nth-child(3) :nth-child(2) :nth-child(2) :nth-child(3)')?.innerText
// 					// dataJson.high = high
// 					// dataJson.low = low
// 					// dataJson.low1Year = document.querySelector('dl div:nth-child(5) dd span:nth-child(1) span:nth-child(1)')?.innerText
// 					// dataJson.high1Year = document.querySelector('dl div:nth-child(5) dd span:nth-child(3) span:nth-child(1)')?.innerText
// 					// dataJson.change = change
// 					// dataJson.changePercent = changePercent
// 					// dataJson.changePercent1Year = document.querySelector('dl div:nth-child(13) dd span span:nth-child(1)')?.innerText + "%"
// 					// dataJson.turnOver = turnOver
// 					// dataJson.turnOverAverage3Month = document.querySelector('dl div:nth-child(10) dd span span:nth-child(1)')?.innerText
// 					// dataJson.marketcap = document.querySelector('dl div:nth-child(8) dd span span:nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(8) dd span span:nth-child(2)')?.innerText
// 					// dataJson.p2eRatio = document.querySelector('dl div:nth-child(11) dd span span:nth-child(1)')?.innerText
// 					// dataJson.revenue = document.querySelector('dl div:nth-child(3) dd span span:nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(3) dd span span:nth-child(2)')?.innerText
// 					// dataJson.eps = document.querySelector('dl div:nth-child(6) dd span span:nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(6) dd span span:nth-child(2)')?.innerText
// 					// dataJson.dividend = document.querySelector('dl div:nth-child(9) dd div span :nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(9) dd div span :nth-child(2)')?.innerText
// 					// dataJson.yield = document.querySelector('dl div:nth-child(9) dd div div :nth-child(2) :nth-child(1)')?.innerText + document.querySelector('dl div:nth-child(9) dd div div :nth-child(2) :nth-child(2)')?.innerText
// 					// dataJson.timeReport = document.querySelector('dl div:nth-child(15) dd a')?.innerText
// 					dataJson.descriptionCompany =
// 						document.getElementsByClassName(
// 							'company-profile_profile-description__30Rta'
// 						)[0]?.innerText;
// 					let mainElement = $$(
// 						'.instrumentOverview_overview-section__2hN4A'
// 					)[5];
// 					dataJson.major = mainElement.querySelector(
// 						'div :nth-child(6) div :nth-child(3) :nth-child(1) a '
// 					)?.innerText;
// 					dataJson.field = mainElement.querySelector(
// 						'div :nth-child(6) div :nth-child(3) :nth-child(2) a '
// 					)?.innerText;
// 					// dataJson.numberOfEmployees = mainElement.querySelector('div :nth-child(6) div :nth-child(3) :nth-child(3) :nth-child(2) ')?.innerText
// 					// dataJson.marketLocation = mainElement.querySelector('div :nth-child(6) div :nth-child(3) :nth-child(4) a ')?.innerText
// 				} catch (err) {
// 					console.log('crawldetail allinvesting' + err);
// 				}
// 				// await delay(2000);
// 				return dataJson;
// 			},
// 			id,
// 			name
// 		);

// 		// console.log(allInvestingDetailData)

// 		AllInvestingDetail.findOneAndUpdate(
// 			{ symbol: allInvestingDetailData.symbol },
// 			{
// 				_id: allInvestingDetailData.symbol,
// 				id: allInvestingDetailData.id,
// 				name: allInvestingDetailData.name,
// 				symbol: allInvestingDetailData.symbol,
// 				descriptionCompany: allInvestingDetailData.descriptionCompany,
// 				major: allInvestingDetailData.major,
// 				field: allInvestingDetailData.field,
// 				// currentPrice: hnxInvestingDetailData.currentPrice,
// 				// referencePrice: hnxInvestingDetailData.referencePrice,
// 				// openPrice: hnxInvestingDetailData.openPrice,
// 				// buyPrice: hnxInvestingDetailData.buyPrice,
// 				// sellPrice: hnxInvestingDetailData.sellPrice,
// 				// high: hnxInvestingDetailData.high,
// 				// low: hnxInvestingDetailData.low,
// 				// high1Year: hnxInvestingDetailData.high1Year,
// 				// low1Year: hnxInvestingDetailData.low1Year,
// 				// change: hnxInvestingDetailData.change,
// 				// changePercent: hnxInvestingDetailData.changePercent,
// 				// changePercent1Year: hnxInvestingDetailData.changePercent1Year,
// 				// turnOver: hnxInvestingDetailData.turnOver,
// 				// turnOverAverage3Month: hnxInvestingDetailData.turnOverAverage3Month,
// 				// marketcap: hnxInvestingDetailData.marketcap,
// 				// p2eRatio: hnxInvestingDetailData.p2eRatio,
// 				// revenue: hnxInvestingDetailData.revenue,
// 				// eps: hnxInvestingDetailData.eps,
// 				// dividend: hnxInvestingDetailData.dividend,
// 				// yield: hnxInvestingDetailData.yield,
// 				// timeReport: hnxInvestingDetailData.timeReport,
// 				// numberOfEmployees: hnxInvestingDetailData.numberOfEmployees,
// 				// marketLocation: hnxInvestingDetailData.marketLocation
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc?.sy))
// 			.catch((err) => console.log('crawldetail allinvesting' + err));

// 		// return upcomDetailData

// 		await browser.close();
// 	} catch (error) {
// 		console.log('crawldetail allinvesting' + error);
// 	}
// });
