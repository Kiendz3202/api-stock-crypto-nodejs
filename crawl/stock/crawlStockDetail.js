const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const axios = require('axios');
const puppeteer = require('puppeteer');
// const Hnx30 = require('../../model/stock/stockList/hnx30Model');
// const Hnx = require('../../model/stock/stockList/hnxModel');
// const Vn30 = require('../../model/stock/stockList/vn30Model');
// const Hose = require('../../model/stock/stockList/hoseModel');
// const Upcom = require('../../model/stock/stockList/upcomModel');

const Hnx30Detail = require('../../model/stock/stockDetail/hnx30DetailModel');
const HnxDetail = require('../../model/stock/stockDetail/hnxDetailModel');
const HoseDetail = require('../../model/stock/stockDetail/hoseDetailModel');
const Vn30Detail = require('../../model/stock/stockDetail/vn30DetailModel');
const UpcomDetail = require('../../model/stock/stockDetail/upcomDetailModel');

const AllInvestingDetail = require('../../model/stock/stockDetail/allInvestingDetailModel');

//update data push arr database lam not
const HnxChart = require('../../model/stock/chartStock/chart/hnxChartModel');
const Hnx30Chart = require('../../model/stock/chartStock/chart/hnx30ChartModel');
const HoseChart = require('../../model/stock/chartStock/chart/hoseChartModel');
const Vn30Chart = require('../../model/stock/chartStock/chart/vn30ChartModel');
const UpcomChart = require('../../model/stock/chartStock/chart/upcomChartModel');

const urlHnx30 = 'https://banggia.vietstock.vn/bang-gia/hnx30';
const urlHnx = 'https://banggia.vietstock.vn/bang-gia/hnx';
const urlVn30 = 'https://banggia.vietstock.vn/bang-gia/vn30';
const urlHose = 'https://banggia.vietstock.vn/bang-gia/hose';
const urlUpcom = 'https://banggia.vietstock.vn/bang-gia/upcom';

const crawlDetailHnx30 = asyncHandler(
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
		// cron.schedule('*/20 * * * * *', async () =>{

		// const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

		// let selector = `td[data-tooltip = ${name}]`

		try {
			const browser = await puppeteer.launch({ headless: true });
			const page = await browser.newPage();
			let status = await page.goto(
				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
				{ timeout: 0 }
			);
			// await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
			// await page.click(`[data-value = ${symbol}]`)
			// const selector = await page.$(`#sym-328`)
			// await page.waitForSelector(`span[data-value=${symbol}]`)
			// await page.click('#sym-328')
			await page.waitForTimeout(2000);
			// await page.click(`[data-value=${symbol}]`)
			// await page.waitForSelector('#symbol-detail-popup', { visible: true })

			// await page.evaluate(selector, (selector) => selector.click())
			// await page.waitForTimeout(3000)
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
					// const delay = (m) => new Promise((r) => setTimeout(r, m));

					// document.querySelector(`span[data-value=${symbol}]`).click()

					// await delay(2000);

					let stocks = [];

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
						dataJson.marketcap = document.querySelector(
							'.stock-price-info :nth-child(2) :nth-child(5) b'
						)?.innerText;
						dataJson.overBought = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(1) b'
						)?.innerText;
						dataJson.overSold = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(2) b'
						)?.innerText;
						dataJson.high52Week = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(3) b'
						)?.innerText;
						dataJson.low52Week = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(4) b'
						)?.innerText;
						dataJson.turnOver52WeekAverage = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(5) b'
						)?.innerText;
						dataJson.foreignBuy = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(1) b'
						)?.innerText;
						dataJson.ownedRatio = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(2) b'
						)?.innerText;
						dataJson.dividendCast = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(3) b'
						)?.innerText;
						dataJson.dividendYield = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(4) b'
						)?.innerText;
						dataJson.beta = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(5) b'
						)?.innerText;
						dataJson.eps = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(1) b'
						)?.innerText;
						dataJson.pe = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(2) b'
						)?.innerText;
						dataJson.fpe = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(3) b'
						)?.innerText;
						dataJson.bvps = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(4) b'
						)?.innerText;
						dataJson.pb = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(5) b'
						)?.innerText;

						dataJson.currentTimestamp = Math.floor(
							Date.now() / 1000
						);
					} catch (err) {
						console.log(err);
					}
					return dataJson;
				},
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
			);

			// console.log(hnx30DetailData);

			Hnx30Detail.findOneAndUpdate(
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
				.then((doc) => console.log(doc?.symbol))
				.catch((err) => console.log(hnx30DetailData.name));

			Hnx30Chart.findOneAndUpdate(
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
				.then((doc) => console.log(doc?.symbol))
				.catch((err) => console.log(err));
			// return hnx30DetailData

			await browser.close();
		} catch (error) {
			console.log(error);
		}
		// })
	}
);

const crawlDetailHnx = asyncHandler(
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
		// cron.schedule('*/20 * * * * *', async () =>{

		// const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

		// let selector = `td[data-tooltip = ${name}]`

		try {
			const browser = await puppeteer.launch({ headless: true });
			const page = await browser.newPage();
			let status = await page.goto(
				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
				{ timeout: 0 }
			);
			// await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
			// await page.click(`[data-value = ${symbol}]`)
			// const selector = await page.$(`#sym-328`)
			// await page.waitForSelector(`span[data-value=${symbol}]`)
			// await page.click('#sym-328')
			await page.waitForTimeout(2000);
			// await page.click(`[data-value=${symbol}]`)
			// await page.waitForSelector('#symbol-detail-popup', { visible: true })

			// await page.evaluate(selector, (selector) => selector.click())
			// await page.waitForTimeout(3000)
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
					// const delay = (m) => new Promise((r) => setTimeout(r, m));

					// document.querySelector(`span[data-value=${symbol}]`).click()

					// await delay(2000);

					let stocks = [];

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
						dataJson.marketcap = document.querySelector(
							'.stock-price-info :nth-child(2) :nth-child(5) b'
						)?.innerText;
						dataJson.overBought = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(1) b'
						)?.innerText;
						dataJson.overSold = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(2) b'
						)?.innerText;
						dataJson.high52Week = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(3) b'
						)?.innerText;
						dataJson.low52Week = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(4) b'
						)?.innerText;
						dataJson.turnOver52WeekAverage = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(5) b'
						)?.innerText;
						dataJson.foreignBuy = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(1) b'
						)?.innerText;
						dataJson.ownedRatio = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(2) b'
						)?.innerText;
						dataJson.dividendCast = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(3) b'
						)?.innerText;
						dataJson.dividendYield = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(4) b'
						)?.innerText;
						dataJson.beta = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(5) b'
						)?.innerText;
						dataJson.eps = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(1) b'
						)?.innerText;
						dataJson.pe = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(2) b'
						)?.innerText;
						dataJson.fpe = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(3) b'
						)?.innerText;
						dataJson.bvps = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(4) b'
						)?.innerText;
						dataJson.pb = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(5) b'
						)?.innerText;

						dataJson.currentTimestamp = Math.floor(
							Date.now() / 1000
						);
					} catch (err) {
						console.log(err);
					}
					return dataJson;
				},
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
			);

			// console.log(hnxDetailData);

			HnxDetail.findOneAndUpdate(
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
					turnOver52WeekAverage: hnxDetailData.turnOver52WeekAverage,
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
				.then((doc) => console.log(doc?.symbol))
				.catch((err) => console.log(hnxDetailData.name));

			HnxChart.findOneAndUpdate(
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
				.then((doc) => console.log(doc?.symbol))
				.catch((err) => console.log(err));
			// return hnxDetailData

			await browser.close();
		} catch (error) {
			console.log(error);
		}
		// })
	}
);

const crawlDetailVn30 = asyncHandler(
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
		try {
			const browser = await puppeteer.launch({ headless: true });
			const page = await browser.newPage();
			let status = await page.goto(
				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
				{ timeout: 0 }
			);

			await page.waitForTimeout(2000);

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
						dataJson.marketcap = document.querySelector(
							'.stock-price-info :nth-child(2) :nth-child(5) b'
						)?.innerText;
						dataJson.overBought = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(1) b'
						)?.innerText;
						dataJson.overSold = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(2) b'
						)?.innerText;
						dataJson.high52Week = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(3) b'
						)?.innerText;
						dataJson.low52Week = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(4) b'
						)?.innerText;
						dataJson.turnOver52WeekAverage = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(5) b'
						)?.innerText;
						dataJson.foreignBuy = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(1) b'
						)?.innerText;
						dataJson.ownedRatio = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(2) b'
						)?.innerText;
						dataJson.dividendCast = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(3) b'
						)?.innerText;
						dataJson.dividendYield = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(4) b'
						)?.innerText;
						dataJson.beta = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(5) b'
						)?.innerText;
						dataJson.eps = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(1) b'
						)?.innerText;
						dataJson.pe = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(2) b'
						)?.innerText;
						dataJson.fpe = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(3) b'
						)?.innerText;
						dataJson.bvps = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(4) b'
						)?.innerText;
						dataJson.pb = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(5) b'
						)?.innerText;

						dataJson.currentTimestamp = Math.floor(
							Date.now() / 1000
						);
					} catch (err) {
						console.log(err);
					}
					return dataJson;
				},
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
			);

			// console.log(vn30DetailData);

			Vn30Detail.findOneAndUpdate(
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
					turnOver52WeekAverage: vn30DetailData.turnOver52WeekAverage,
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
				.then((doc) => console.log(doc?.symbol))
				.catch((err) => console.log(vn30DetailData.name));

			Vn30Chart.findOneAndUpdate(
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
				.then((doc) => console.log(doc?.symbol))
				.catch((err) => console.log(err));
			// return vn30DetailData

			await browser.close();
		} catch (error) {
			console.log(error);
		}
	}
);

const crawlDetailHose = asyncHandler(
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
		// cron.schedule('*/20 * * * * *', async () =>{

		// const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

		// let selector = `td[data-tooltip = ${name}]`

		try {
			const browser = await puppeteer.launch({ headless: true });
			const page = await browser.newPage();
			let status = await page.goto(
				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
				{ timeout: 0 }
			);
			// await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
			// await page.click(`[data-value = ${symbol}]`)
			// const selector = await page.$(`#sym-328`)
			// await page.waitForSelector(`span[data-value=${symbol}]`)
			// await page.click('#sym-328')
			await page.waitForTimeout(2000);
			// await page.click(`[data-value=${symbol}]`)
			// await page.waitForSelector('#symbol-detail-popup', { visible: true })

			// await page.evaluate(selector, (selector) => selector.click())
			// await page.waitForTimeout(3000)
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
					// const delay = (m) => new Promise((r) => setTimeout(r, m));

					// document.querySelector(`span[data-value=${symbol}]`).click()

					// await delay(2000);

					let stocks = [];

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
						dataJson.marketcap = document.querySelector(
							'.stock-price-info :nth-child(2) :nth-child(5) b'
						)?.innerText;
						dataJson.overBought = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(1) b'
						)?.innerText;
						dataJson.overSold = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(2) b'
						)?.innerText;
						dataJson.high52Week = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(3) b'
						)?.innerText;
						dataJson.low52Week = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(4) b'
						)?.innerText;
						dataJson.turnOver52WeekAverage = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(5) b'
						)?.innerText;
						dataJson.foreignBuy = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(1) b'
						)?.innerText;
						dataJson.ownedRatio = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(2) b'
						)?.innerText;
						dataJson.dividendCast = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(3) b'
						)?.innerText;
						dataJson.dividendYield = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(4) b'
						)?.innerText;
						dataJson.beta = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(5) b'
						)?.innerText;
						dataJson.eps = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(1) b'
						)?.innerText;
						dataJson.pe = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(2) b'
						)?.innerText;
						dataJson.fpe = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(3) b'
						)?.innerText;
						dataJson.bvps = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(4) b'
						)?.innerText;
						dataJson.pb = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(5) b'
						)?.innerText;

						dataJson.currentTimestamp = Math.floor(
							Date.now() / 1000
						);
					} catch (err) {
						console.log(err);
					}
					return dataJson;
				},
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
			);

			// console.log(hoseDetailData);

			HoseDetail.findOneAndUpdate(
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
					turnOver52WeekAverage: hoseDetailData.turnOver52WeekAverage,
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
				.then((doc) => console.log(doc?.symbol))
				.catch((err) => console.log(hoseDetailData.name));

			HoseChart.findOneAndUpdate(
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
				.then((doc) => console.log(doc?.symbol))
				.catch((err) => console.log(err));
			// return hoseDetailData

			await browser.close();
		} catch (error) {
			console.log(error);
		}
		// })
	}
);

const crawlDetailUpcom = asyncHandler(
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
		// cron.schedule('*/20 * * * * *', async () =>{

		// const hnx30List = await Hnx30.find({}).sort({ symbol: 'asc' })

		// let selector = `td[data-tooltip = ${name}]`

		try {
			const browser = await puppeteer.launch({ headless: true });
			const page = await browser.newPage();
			let status = await page.goto(
				`https://finance.vietstock.vn/${symbol}/tai-chinh.htm`,
				{ timeout: 0 }
			);
			// await page.click('[data-tooltip = "CTCP Xi măng Bỉm Sơn"]')
			// await page.click(`[data-value = ${symbol}]`)
			// const selector = await page.$(`#sym-328`)
			// await page.waitForSelector(`span[data-value=${symbol}]`)
			// await page.click('#sym-328')
			await page.waitForTimeout(2000);
			// await page.click(`[data-value=${symbol}]`)
			// await page.waitForSelector('#symbol-detail-popup', { visible: true })

			// await page.evaluate(selector, (selector) => selector.click())
			// await page.waitForTimeout(3000)
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
					// const delay = (m) => new Promise((r) => setTimeout(r, m));

					// document.querySelector(`span[data-value=${symbol}]`).click()

					// await delay(2000);

					let stocks = [];

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
						dataJson.marketcap = document.querySelector(
							'.stock-price-info :nth-child(2) :nth-child(5) b'
						)?.innerText;
						dataJson.overBought = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(1) b'
						)?.innerText;
						dataJson.overSold = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(2) b'
						)?.innerText;
						dataJson.high52Week = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(3) b'
						)?.innerText;
						dataJson.low52Week = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(4) b'
						)?.innerText;
						dataJson.turnOver52WeekAverage = document.querySelector(
							'.stock-price-info :nth-child(3) :nth-child(5) b'
						)?.innerText;
						dataJson.foreignBuy = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(1) b'
						)?.innerText;
						dataJson.ownedRatio = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(2) b'
						)?.innerText;
						dataJson.dividendCast = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(3) b'
						)?.innerText;
						dataJson.dividendYield = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(4) b'
						)?.innerText;
						dataJson.beta = document.querySelector(
							'.stock-price-info :nth-child(4) :nth-child(5) b'
						)?.innerText;
						dataJson.eps = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(1) b'
						)?.innerText;
						dataJson.pe = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(2) b'
						)?.innerText;
						dataJson.fpe = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(3) b'
						)?.innerText;
						dataJson.bvps = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(4) b'
						)?.innerText;
						dataJson.pb = document.querySelector(
							'.stock-price-info :nth-child(5) :nth-child(5) b'
						)?.innerText;

						dataJson.currentTimestamp = Math.floor(
							Date.now() / 1000
						);
					} catch (err) {
						console.log(err);
					}
					return dataJson;
				},
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
			);

			// console.log(upcomDetailData);

			UpcomDetail.findOneAndUpdate(
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
				.then((doc) => console.log(doc?.symbol))
				.catch((err) => console.log(upcomDetailData.name));

			UpcomChart.findOneAndUpdate(
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
				.then((doc) => console.log(doc?.symbol))
				.catch((err) => console.log(err));
			// return upcomDetailData

			await browser.close();
		} catch (error) {
			console.log(error);
		}
		// })
	}
);

const crawlDetailAllInvesting = asyncHandler(async (id, name, hrefDetail) => {
	try {
		const browser = await puppeteer.launch({ headless: true });
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
				const delay = (m) => new Promise((r) => setTimeout(r, m));

				// document.querySelector(`span[data-value=${symbol}]`).click()

				// await delay(2000);

				let stocks = [];

				// let mainElement = document.querySelector("div[data-set='chat-panel-main']").previousSibling
				// let infoCompanyElement = mainElement.querySelector(':nth-last-child(2)')

				let dataJson = {};

				try {
					dataJson.id = id;
					dataJson.name = name;
					dataJson.symbol = document
						.querySelector('main div h2')
						?.innerText.slice(10);
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
					let mainElement = document.querySelectorAll(
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
					console.log(err);
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
			.then((doc) => console.log(doc?.sy))
			.catch((err) => console.log(err));

		// return upcomDetailData

		await browser.close();
	} catch (error) {
		console.log(error);
	}
});

module.exports = {
	crawlDetailHnx30,
	crawlDetailHnx,
	crawlDetailVn30,
	crawlDetailHose,
	crawlDetailUpcom,
	crawlDetailAllInvesting,
};
