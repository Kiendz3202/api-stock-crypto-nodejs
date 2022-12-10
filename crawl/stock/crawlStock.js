const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const axios = require('axios');
const puppeteer = require('puppeteer');

const {
	collectQueryData,
	collectQueryDataHeightScroll,
} = require('../../utils/pupperteer/collectQueryData');

const Hnx30 = require('../../model/stock/stockList/hnx30Model');
const Hnx = require('../../model/stock/stockList/hnxModel');
const Vn30 = require('../../model/stock/stockList/vn30Model');
const Hose = require('../../model/stock/stockList/hoseModel');
const Upcom = require('../../model/stock/stockList/upcomModel');

const AllInvesting = require('../../model/stock/stockList/allInvestingModel');
const Hnx30Chart = require('../../model/stock/chartStock/chart/hnx30ChartModel');
const HnxChart = require('../../model/stock/chartStock/chart/hnxChartModel');
const Vn30Chart = require('../../model/stock/chartStock/chart/vn30ChartModel');
const HoseChart = require('../../model/stock/chartStock/chart/hoseChartModel');
const UpcomChart = require('../../model/stock/chartStock/chart/upcomChartModel');

const urlHnx30 = 'https://banggia.vietstock.vn/bang-gia/hnx30';
const urlHnx = 'https://banggia.vietstock.vn/bang-gia/hnx';
const urlVn30 = 'https://banggia.vietstock.vn/bang-gia/vn30';
const urlHose = 'https://banggia.vietstock.vn/bang-gia/hose';
const urlUpcom = 'https://banggia.vietstock.vn/bang-gia/upcom';

const urlInvesting = 'https://vn.investing.com/equities/vietnam';

//--------------------main body------------------------------------------
const crawlHnx30 = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		let stocks = [];
		let stockElements = document.querySelectorAll(
			'#price-board-container tbody tr'
		);

		stockElements.forEach((stock) => {
			let dataJson = {};

			try {
				dataJson.name =
					stock.getElementsByTagName('td')[0]?.dataset.tooltip;

				let symbolCrawl =
					stock.getElementsByTagName('span')[0]?.innerText;
				if (symbolCrawl.includes('*')) {
					let len = symbolCrawl?.length;
					if (symbolCrawl.includes('**')) {
						dataJson.symbol = symbolCrawl.slice(0, len - 2);
					} else {
						dataJson.symbol = symbolCrawl.slice(0, len - 1);
					}
				} else {
					dataJson.symbol = symbolCrawl;
				}

				dataJson.timeUpdate = Math.floor(Date.now() / 1000);

				dataJson.reference = stock.getElementsByClassName(
					'cell-body-highlight'
				)[0]?.innerText;
				dataJson.ceil = stock.getElementsByClassName(
					'cell-body-highlight'
				)[1]?.innerText;
				dataJson.floor = stock.getElementsByClassName(
					'cell-body-highlight'
				)[2]?.innerText;

				dataJson.currentPrice = stock.getElementsByClassName(
					'cell-body-highlight'
				)[3]?.innerText;

				dataJson.high = stock.getElementsByClassName(
					'cell-body-highlight'
				)[7]?.innerText;
				dataJson.low = stock.getElementsByClassName(
					'cell-body-highlight'
				)[8]?.innerText;

				dataJson.change = stock.getElementsByClassName(
					'cell-body-highlight'
				)[5]?.innerText;
				dataJson.changePercent = stock.getElementsByClassName(
					'cell-body-highlight'
				)[6]?.innerText;

				const turnOverElement = stock.getElementsByTagName('td')[20];
				dataJson.turnOver =
					turnOverElement.getElementsByTagName('span')[0]?.innerText;
			} catch (err) {
				console.log(err);
			}

			stocks.push(dataJson);
		});
		return stocks;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		data = await collectQueryData(urlHnx30, pageEvaluateFunc);
		console.log(data.length);
		attemps++;

		if (data) {
			data.forEach((stock) => {
				Hnx30.findOneAndUpdate(
					{ name: stock.name },
					{
						name: stock.name,
						symbol: stock.symbol,
						timeUpdate: stock.timeUpdate,
						reference: stock.reference,
						ceil: stock.ceil,
						floor: stock.floor,
						currentPrice: stock.currentPrice,
						high: stock.high,
						low: stock.low,
						change: stock.change,
						changePercent: stock.changePercent,
						turnOver: stock.turnOver,
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawl hnx30' + err));

				Hnx30Chart.findOneAndUpdate(
					{ symbol: stock.symbol },
					{
						symbol: stock.symbol,
						$push: {
							t: stock.timeUpdate,
							price: stock.currentPrice,
						},
					}
					// { upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail hnx30' + err));
			});
			// await browser.close();
		}

		if (data === false) {
			//wait a few second, also a good idea to swap proxy here
			console.log('Recrawl........' + attemps);
			await new Promise((resolve) => setTimeout(resolve, 3000));
		}
	}
});

const crawlHnx = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		let stocks = [];
		let stockElements = document.querySelectorAll(
			'#price-board-container tbody tr'
		);

		stockElements.forEach((stock) => {
			let dataJson = {};

			try {
				dataJson.name =
					stock.getElementsByTagName('td')[0]?.dataset.tooltip;
				let symbolCrawl =
					stock.getElementsByTagName('span')[0].innerText;
				if (symbolCrawl.includes('*')) {
					let len = symbolCrawl?.length;
					if (symbolCrawl.includes('**')) {
						dataJson.symbol = symbolCrawl.slice(0, len - 2);
					} else {
						dataJson.symbol = symbolCrawl.slice(0, len - 1);
					}
				} else {
					dataJson.symbol = symbolCrawl;
				}

				dataJson.timeUpdate = Math.floor(Date.now() / 1000);

				dataJson.reference = stock.getElementsByClassName(
					'cell-body-highlight'
				)[0]?.innerText;
				dataJson.ceil = stock.getElementsByClassName(
					'cell-body-highlight'
				)[1]?.innerText;
				dataJson.floor = stock.getElementsByClassName(
					'cell-body-highlight'
				)[2]?.innerText;

				dataJson.currentPrice = stock.getElementsByClassName(
					'cell-body-highlight'
				)[3]?.innerText;

				dataJson.high = stock.getElementsByClassName(
					'cell-body-highlight'
				)[7]?.innerText;
				dataJson.low = stock.getElementsByClassName(
					'cell-body-highlight'
				)[8]?.innerText;

				dataJson.change = stock.getElementsByClassName(
					'cell-body-highlight'
				)[5]?.innerText;
				dataJson.changePercent = stock.getElementsByClassName(
					'cell-body-highlight'
				)[6]?.innerText;

				const turnOverElement = stock.getElementsByTagName('td')[20];
				dataJson.turnOver =
					turnOverElement.getElementsByTagName('span')[0]?.innerText;
			} catch (err) {
				console.log(err);
			}

			stocks.push(dataJson);
		});

		return stocks;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		data = await collectQueryDataHeightScroll(urlHnx, pageEvaluateFunc);
		console.log(data.length);
		attemps++;

		if (data) {
			data.forEach((stock) => {
				Hnx.findOneAndUpdate(
					{ name: stock.name },
					{
						name: stock.name,
						symbol: stock.symbol,
						timeUpdate: stock.timeUpdate,
						reference: stock.reference,
						ceil: stock.ceil,
						floor: stock.floor,
						currentPrice: stock.currentPrice,
						high: stock.high,
						low: stock.low,
						change: stock.change,
						changePercent: stock.changePercent,
						turnOver: stock.turnOver,
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawl hnx' + err));

				HnxChart.findOneAndUpdate(
					{ symbol: stock.symbol },
					{
						symbol: stock.symbol,
						$push: {
							t: stock.timeUpdate,
							price: stock.currentPrice,
						},
					}
					// { upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail hnx30' + err));
			});
			// await browser.close();
		}

		if (data === false) {
			//wait a few second, also a good idea to swap proxy here
			console.log('Recrawl........' + attemps);
			await new Promise((resolve) => setTimeout(resolve, 3000));
		}
	}
});

const crawlVn30 = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		let stocks = [];
		let stockElements = document.querySelectorAll(
			'#price-board-container tbody tr'
		);

		stockElements.forEach((stock) => {
			let dataJson = {};

			try {
				dataJson.name =
					stock.getElementsByTagName('td')[0]?.dataset.tooltip;
				let symbolCrawl =
					stock.getElementsByTagName('span')[0]?.innerText;
				if (symbolCrawl.includes('*')) {
					let len = symbolCrawl?.length;
					if (symbolCrawl.includes('**')) {
						dataJson.symbol = symbolCrawl.slice(0, len - 2);
					} else {
						dataJson.symbol = symbolCrawl.slice(0, len - 1);
					}
				} else {
					dataJson.symbol = symbolCrawl;
				}

				dataJson.timeUpdate = Math.floor(Date.now() / 1000);

				dataJson.reference = stock.getElementsByClassName(
					'cell-body-highlight'
				)[0]?.innerText;
				dataJson.ceil = stock.getElementsByClassName(
					'cell-body-highlight'
				)[1]?.innerText;
				dataJson.floor = stock.getElementsByClassName(
					'cell-body-highlight'
				)[2]?.innerText;

				dataJson.currentPrice = stock.getElementsByClassName(
					'cell-body-highlight'
				)[3]?.innerText;

				dataJson.high = stock.getElementsByClassName(
					'cell-body-highlight'
				)[7]?.innerText;
				dataJson.low = stock.getElementsByClassName(
					'cell-body-highlight'
				)[8]?.innerText;

				dataJson.change = stock.getElementsByClassName(
					'cell-body-highlight'
				)[5]?.innerText;
				dataJson.changePercent = stock.getElementsByClassName(
					'cell-body-highlight'
				)[6]?.innerText;

				const turnOverElement = stock.getElementsByTagName('td')[20];
				dataJson.turnOver =
					turnOverElement.getElementsByTagName('span')[0]?.innerText;
			} catch (err) {
				console.log(err);
			}

			stocks.push(dataJson);
		});

		return stocks;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		data = await collectQueryData(urlVn30, pageEvaluateFunc);
		console.log(data.length);
		attemps++;

		if (data) {
			data.forEach((stock) => {
				Vn30.findOneAndUpdate(
					{ name: stock.name },
					{
						name: stock.name,
						symbol: stock.symbol,
						timeUpdate: stock.timeUpdate,
						reference: stock.reference,
						ceil: stock.ceil,
						floor: stock.floor,
						currentPrice: stock.currentPrice,
						high: stock.high,
						low: stock.low,
						change: stock.change,
						changePercent: stock.changePercent,
						turnOver: stock.turnOver,
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawl vn30' + err));

				Vn30Chart.findOneAndUpdate(
					{ symbol: stock.symbol },
					{
						symbol: stock.symbol,
						$push: {
							t: stock.timeUpdate,
							price: stock.currentPrice,
						},
					}
					// { upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail hnx30' + err));
			});
			// await browser.close();
		}

		if (data === false) {
			//wait a few second, also a good idea to swap proxy here
			console.log('Recrawl........' + attemps);
			await new Promise((resolve) => setTimeout(resolve, 3000));
		}
	}
});

const crawlHose = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		let stocks = [];
		let stockElements = document.querySelectorAll(
			'#price-board-container tbody tr'
		);

		stockElements.forEach((stock) => {
			let dataJson = {};

			try {
				dataJson.name =
					stock.getElementsByTagName('td')[0]?.dataset.tooltip;
				let symbolCrawl =
					stock.getElementsByTagName('span')[0]?.innerText;
				if (symbolCrawl.includes('*')) {
					let len = symbolCrawl?.length;
					if (symbolCrawl.includes('**')) {
						dataJson.symbol = symbolCrawl.slice(0, len - 2);
					} else {
						dataJson.symbol = symbolCrawl.slice(0, len - 1);
					}
				} else {
					dataJson.symbol = symbolCrawl;
				}

				dataJson.timeUpdate = Math.floor(Date.now() / 1000);

				dataJson.reference = stock.getElementsByClassName(
					'cell-body-highlight'
				)[0]?.innerText;
				dataJson.ceil = stock.getElementsByClassName(
					'cell-body-highlight'
				)[1]?.innerText;
				dataJson.floor = stock.getElementsByClassName(
					'cell-body-highlight'
				)[2]?.innerText;

				dataJson.currentPrice = stock.getElementsByClassName(
					'cell-body-highlight'
				)[3]?.innerText;

				dataJson.high = stock.getElementsByClassName(
					'cell-body-highlight'
				)[7]?.innerText;
				dataJson.low = stock.getElementsByClassName(
					'cell-body-highlight'
				)[8]?.innerText;

				dataJson.change = stock.getElementsByClassName(
					'cell-body-highlight'
				)[5]?.innerText;
				dataJson.changePercent = stock.getElementsByClassName(
					'cell-body-highlight'
				)[6]?.innerText;

				const turnOverElement = stock.getElementsByTagName('td')[20];
				dataJson.turnOver =
					turnOverElement.getElementsByTagName('span')[0]?.innerText;
			} catch (err) {
				console.log(err);
			}

			stocks.push(dataJson);
		});

		return stocks;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		data = await collectQueryData(urlHose, pageEvaluateFunc);
		console.log(data.length);
		attemps++;

		if (data) {
			data.forEach((stock) => {
				Hose.findOneAndUpdate(
					{ name: stock.name },
					{
						name: stock.name,
						symbol: stock.symbol,
						timeUpdate: stock.timeUpdate,
						reference: stock.reference,
						ceil: stock.ceil,
						floor: stock.floor,
						currentPrice: stock.currentPrice,
						high: stock.high,
						low: stock.low,
						change: stock.change,
						changePercent: stock.changePercent,
						turnOver: stock.turnOver,
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawl hose' + err));

				HoseChart.findOneAndUpdate(
					{ symbol: stock.symbol },
					{
						symbol: stock.symbol,
						$push: {
							t: stock.timeUpdate,
							price: stock.currentPrice,
						},
					}
					// { upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail hnx30' + err));
			});
			// await browser.close();
		}

		if (data === false) {
			//wait a few second, also a good idea to swap proxy here
			console.log('Recrawl........' + attemps);
			await new Promise((resolve) => setTimeout(resolve, 3000));
		}
	}
});

const crawlUpcom = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		let stocks = [];
		let stockElements = document.querySelectorAll(
			'#price-board-container tbody tr'
		);

		stockElements.forEach((stock) => {
			let dataJson = {};

			try {
				dataJson.name =
					stock.getElementsByTagName('td')[0]?.dataset.tooltip;
				let symbolCrawl =
					stock.getElementsByTagName('span')[0]?.innerText;
				if (symbolCrawl.includes('*')) {
					let len = symbolCrawl?.length;
					if (symbolCrawl.includes('**')) {
						dataJson.symbol = symbolCrawl.slice(0, len - 2);
					} else {
						dataJson.symbol = symbolCrawl.slice(0, len - 1);
					}
				} else {
					dataJson.symbol = symbolCrawl;
				}

				dataJson.timeUpdate = Math.floor(Date.now() / 1000);

				dataJson.reference = stock.getElementsByClassName(
					'cell-body-highlight'
				)[0]?.innerText;
				dataJson.ceil = stock.getElementsByClassName(
					'cell-body-highlight'
				)[1]?.innerText;
				dataJson.floor = stock.getElementsByClassName(
					'cell-body-highlight'
				)[2]?.innerText;

				dataJson.currentPrice = stock.getElementsByClassName(
					'cell-body-highlight'
				)[3]?.innerText;

				dataJson.high = stock.getElementsByClassName(
					'cell-body-highlight'
				)[7]?.innerText;
				dataJson.low = stock.getElementsByClassName(
					'cell-body-highlight'
				)[8]?.innerText;

				dataJson.change = stock.getElementsByClassName(
					'cell-body-highlight'
				)[5]?.innerText;
				dataJson.changePercent = stock.getElementsByClassName(
					'cell-body-highlight'
				)[6]?.innerText;

				const turnOverElement = stock.getElementsByTagName('td')[20];
				dataJson.turnOver =
					turnOverElement.getElementsByTagName('span')[0]?.innerText;
			} catch (err) {
				console.log(err);
			}
			stocks.push(dataJson);
		});

		return stocks;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		data = await collectQueryData(urlUpcom, pageEvaluateFunc);
		console.log(data.length);
		attemps++;

		if (data) {
			data.forEach((stock) => {
				Upcom.findOneAndUpdate(
					{ name: stock.name },
					{
						name: stock.name,
						symbol: stock.symbol,
						timeUpdate: stock.timeUpdate,
						reference: stock.reference,
						ceil: stock.ceil,
						floor: stock.floor,
						currentPrice: stock.currentPrice,
						high: stock.high,
						low: stock.low,
						change: stock.change,
						changePercent: stock.changePercent,
						turnOver: stock.turnOver,
					},
					{ upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawl upcom' + err));

				UpcomChart.findOneAndUpdate(
					{ symbol: stock.symbol },
					{
						symbol: stock.symbol,
						$push: {
							t: stock.timeUpdate,
							price: stock.currentPrice,
						},
					}
					// { upsert: true }
				)
					// .then((doc) => console.log(doc?.symbol))
					.catch((err) => console.log('crawldetail hnx30' + err));
			});
			// await browser.close();
		}

		if (data === false) {
			//wait a few second, also a good idea to swap proxy here
			console.log('Recrawl........' + attemps);
			await new Promise((resolve) => setTimeout(resolve, 3000));
		}
	}
});

const crawlAllInvesting = asyncHandler(async () => {
	try {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlInvesting, { timeout: 0 });
		await page.select('#stocksFilter', 'Tất cả cổ phiếu Việt Nam');
		await page.waitForTimeout(40000);
		// const bodyHandle = await page.$('body');
		// const { height } = await bodyHandle.boundingBox();
		// await bodyHandle.dispose();

		// // Scroll one viewport at a time, pausing to let content load
		// const viewportHeight = page.viewport().height;
		// let viewportIncr = 0;
		// while (viewportIncr + viewportHeight < height) {
		// 	await page.evaluate((_viewportHeight) => {
		// 		window.scrollBy(0, _viewportHeight);
		// 	}, viewportHeight);
		// 	await page.waitForTimeout(2000);
		// 	viewportIncr = viewportIncr + viewportHeight;
		// }

		// // Scroll back to top
		// await page.evaluate((_) => {
		// 	window.scrollTo(0, 0);
		// });

		// // Some extra delay to let all data load
		// await page.waitForTimeout(1000);

		let allInvestingData = await page.evaluate(() => {
			let stocks = [];
			let stockElements = document.querySelectorAll(
				'#cross_rate_markets_stocks_1 tbody tr'
			);

			stockElements.forEach((stock) => {
				let dataJson = {};

				try {
					dataJson.id = stock.getAttribute('id').split('_')[1];
					dataJson.name =
						stock.getElementsByTagName('td')[1]?.innerText;

					// dataJson.last = stock.getElementsByTagName('td')[2]?.innerText

					// dataJson.currentPrice = stock.getElementsByClassName('cell-body-highlight')[3]?.innerText

					// dataJson.high = stock.getElementsByTagName('td')[3]?.innerText
					// dataJson.low = stock.getElementsByTagName('td')[4]?.innerText

					// dataJson.change = stock.getElementsByTagName('td')[5]?.innerText
					// dataJson.changePercent = stock.getElementsByTagName('td')[6]?.innerText

					// dataJson.turnOver = stock.getElementsByTagName('td')[7]?.innerText

					// dataJson.time = stock.getElementsByTagName('td')[8]?.innerText
					dataJson.hrefDetail = stock
						.querySelector('a')
						.getAttribute('href');
				} catch (err) {
					console.log(err);
				}
				stocks.push(dataJson);
			});

			return stocks;
		});

		allInvestingData.forEach((stock) => {
			AllInvesting.findOneAndUpdate(
				{ name: stock.name },
				{
					id: stock.id,
					name: stock.name,
					// last: stock.last,
					// currentPrice: stock.currentPrice,
					// high: stock.high,
					// low: stock.low,
					// change: stock.change,
					// changePercent: stock.changePercent,
					// turnOver: stock.turnOver,
					// time: stock.time,
					hrefDetail: stock.hrefDetail,
				},
				{ upsert: true }
			)
				// .then((doc) => console.log(doc?.symbol))
				.catch((err) => console.log('crawl allinvesting' + err));
		});

		await browser.close();
	} catch (error) {
		console.log(error);
	}
});

module.exports = {
	crawlHnx30,
	crawlHnx,
	crawlVn30,
	crawlHose,
	crawlUpcom,
	crawlAllInvesting,
};

// const crawlHnx30 = asyncHandler(async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.goto(urlHnx30, { timeout: 0 });

// 		let hnx30Data = await page.evaluate(() => {
// 			let stocks = [];
// 			let stockElements = document.querySelectorAll(
// 				'#price-board-container tbody tr'
// 			);

// 			stockElements.forEach((stock) => {
// 				let dataJson = {};

// 				try {
// 					dataJson.name =
// 						stock.getElementsByTagName('td')[0]?.dataset.tooltip;
// 					let symbolCrawl =
// 						stock.getElementsByTagName('span')[0]?.innerText;
// 					if (symbolCrawl.includes('*')) {
// 						let len = symbolCrawl?.length;
// 						if (symbolCrawl.includes('**')) {
// 							dataJson.symbol = symbolCrawl.slice(0, len - 2);
// 						} else {
// 							dataJson.symbol = symbolCrawl.slice(0, len - 1);
// 						}
// 					} else {
// 						dataJson.symbol = symbolCrawl;
// 					}

// 					dataJson.reference = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[0]?.innerText;
// 					dataJson.ceil = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[1]?.innerText;
// 					dataJson.floor = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[2]?.innerText;

// 					dataJson.currentPrice = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[3]?.innerText;

// 					dataJson.high = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[7]?.innerText;
// 					dataJson.low = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[8]?.innerText;

// 					dataJson.change = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[5]?.innerText;
// 					dataJson.changePercent = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[6]?.innerText;

// 					const turnOverElement =
// 						stock.getElementsByTagName('td')[20];
// 					dataJson.turnOver =
// 						turnOverElement.getElementsByTagName(
// 							'span'
// 						)[0]?.innerText;
// 				} catch (err) {
// 					console.log(err);
// 				}

// 				stocks.push(dataJson);
// 			});
// 			return stocks;
// 		});

// 		// console.log(hnx30Data);
// 		hnx30Data.forEach((stock) => {
// 			Hnx30.findOneAndUpdate(
// 				{ name: stock.name },
// 				{
// 					name: stock.name,
// 					symbol: stock.symbol,
// 					reference: stock.reference,
// 					ceil: stock.ceil,
// 					floor: stock.floor,
// 					currentPrice: stock.currentPrice,
// 					high: stock.high,
// 					low: stock.low,
// 					change: stock.change,
// 					changePercent: stock.changePercent,
// 					turnOver: stock.turnOver,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawl hnx30' + err));
// 		});

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

// const crawlHnx = asyncHandler(async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.goto(urlHnx, { waitUntil: 'load' });
// 		// await page.select('#stocksFilter', 'HNX')
// 		// await page.waitForTimeout(20000)
// 		// Get the height of the rendered page
// 		const bodyHandle = await page.$('body');
// 		const { height } = await bodyHandle.boundingBox();
// 		await bodyHandle.dispose();

// 		// Scroll one viewport at a time, pausing to let content load
// 		const viewportHeight = page.viewport().height;
// 		let viewportIncr = 0;
// 		while (viewportIncr + viewportHeight < height) {
// 			await page.evaluate((_viewportHeight) => {
// 				window.scrollBy(0, _viewportHeight);
// 			}, viewportHeight);
// 			await page.waitForTimeout(2000);
// 			viewportIncr = viewportIncr + viewportHeight;
// 		}

// 		// Scroll back to top
// 		await page.evaluate((_) => {
// 			window.scrollTo(0, 0);
// 		});

// 		// Some extra delay to let all data load
// 		await page.waitForTimeout(1000);

// 		let hnxData = await page.evaluate(() => {
// 			let stocks = [];
// 			let stockElements = document.querySelectorAll(
// 				'#price-board-container tbody tr'
// 			);

// 			stockElements.forEach((stock) => {
// 				let dataJson = {};

// 				try {
// 					dataJson.name =
// 						stock.getElementsByTagName('td')[0]?.dataset.tooltip;
// 					let symbolCrawl =
// 						stock.getElementsByTagName('span')[0].innerText;
// 					if (symbolCrawl.includes('*')) {
// 						let len = symbolCrawl?.length;
// 						if (symbolCrawl.includes('**')) {
// 							dataJson.symbol = symbolCrawl.slice(0, len - 2);
// 						} else {
// 							dataJson.symbol = symbolCrawl.slice(0, len - 1);
// 						}
// 					} else {
// 						dataJson.symbol = symbolCrawl;
// 					}

// 					dataJson.reference = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[0]?.innerText;
// 					dataJson.ceil = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[1]?.innerText;
// 					dataJson.floor = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[2]?.innerText;

// 					dataJson.currentPrice = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[3]?.innerText;

// 					dataJson.high = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[7]?.innerText;
// 					dataJson.low = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[8]?.innerText;

// 					dataJson.change = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[5]?.innerText;
// 					dataJson.changePercent = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[6]?.innerText;

// 					const turnOverElement =
// 						stock.getElementsByTagName('td')[20];
// 					dataJson.turnOver =
// 						turnOverElement.getElementsByTagName(
// 							'span'
// 						)[0]?.innerText;
// 				} catch (err) {
// 					console.log(err);
// 				}

// 				stocks.push(dataJson);
// 			});

// 			return stocks;
// 		});

// 		hnxData.forEach((stock) => {
// 			Hnx.findOneAndUpdate(
// 				{ name: stock.name },
// 				{
// 					name: stock.name,
// 					symbol: stock.symbol,
// 					reference: stock.reference,
// 					ceil: stock.ceil,
// 					floor: stock.floor,
// 					currentPrice: stock.currentPrice,
// 					high: stock.high,
// 					low: stock.low,
// 					change: stock.change,
// 					changePercent: stock.changePercent,
// 					turnOver: stock.turnOver,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawl hnx' + err));
// 		});

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

// const crawlVn30 = asyncHandler(async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.goto(urlVn30, { timeout: 0 });

// 		let vn30Data = await page.evaluate(() => {
// 			let stocks = [];
// 			let stockElements = document.querySelectorAll(
// 				'#price-board-container tbody tr'
// 			);

// 			stockElements.forEach((stock) => {
// 				let dataJson = {};

// 				try {
// 					dataJson.name =
// 						stock.getElementsByTagName('td')[0]?.dataset.tooltip;
// 					let symbolCrawl =
// 						stock.getElementsByTagName('span')[0]?.innerText;
// 					if (symbolCrawl.includes('*')) {
// 						let len = symbolCrawl?.length;
// 						if (symbolCrawl.includes('**')) {
// 							dataJson.symbol = symbolCrawl.slice(0, len - 2);
// 						} else {
// 							dataJson.symbol = symbolCrawl.slice(0, len - 1);
// 						}
// 					} else {
// 						dataJson.symbol = symbolCrawl;
// 					}

// 					dataJson.reference = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[0]?.innerText;
// 					dataJson.ceil = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[1]?.innerText;
// 					dataJson.floor = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[2]?.innerText;

// 					dataJson.currentPrice = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[3]?.innerText;

// 					dataJson.high = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[7]?.innerText;
// 					dataJson.low = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[8]?.innerText;

// 					dataJson.change = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[5]?.innerText;
// 					dataJson.changePercent = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[6]?.innerText;

// 					const turnOverElement =
// 						stock.getElementsByTagName('td')[20];
// 					dataJson.turnOver =
// 						turnOverElement.getElementsByTagName(
// 							'span'
// 						)[0]?.innerText;
// 				} catch (err) {
// 					console.log(err);
// 				}

// 				stocks.push(dataJson);
// 			});

// 			return stocks;
// 		});

// 		vn30Data.forEach((stock) => {
// 			Vn30.findOneAndUpdate(
// 				{ name: stock.name },
// 				{
// 					name: stock.name,
// 					symbol: stock.symbol,
// 					reference: stock.reference,
// 					ceil: stock.ceil,
// 					floor: stock.floor,
// 					currentPrice: stock.currentPrice,
// 					high: stock.high,
// 					low: stock.low,
// 					change: stock.change,
// 					changePercent: stock.changePercent,
// 					turnOver: stock.turnOver,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawl vn30' + err));
// 		});

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

// const crawlHose = asyncHandler(async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.goto(urlHose, { waitUntil: 'load' });
// 		// await page.select('#stocksFilter', 'VN Index')
// 		// await page.waitForTimeout(20000)
// 		const bodyHandle = await page.$('body');
// 		const { height } = await bodyHandle.boundingBox();
// 		await bodyHandle.dispose();

// 		// Scroll one viewport at a time, pausing to let content load
// 		const viewportHeight = page.viewport().height;
// 		let viewportIncr = 0;
// 		while (viewportIncr + viewportHeight < height) {
// 			await page.evaluate((_viewportHeight) => {
// 				window.scrollBy(0, _viewportHeight);
// 			}, viewportHeight);
// 			await page.waitForTimeout(2000);
// 			viewportIncr = viewportIncr + viewportHeight;
// 		}

// 		// Scroll back to top
// 		await page.evaluate((_) => {
// 			window.scrollTo(0, 0);
// 		});

// 		// Some extra delay to let all data load
// 		await page.waitForTimeout(1000);

// 		let hoseData = await page.evaluate(() => {
// 			let stocks = [];
// 			let stockElements = document.querySelectorAll(
// 				'#price-board-container tbody tr'
// 			);

// 			stockElements.forEach((stock) => {
// 				let dataJson = {};

// 				try {
// 					dataJson.name =
// 						stock.getElementsByTagName('td')[0]?.dataset.tooltip;
// 					let symbolCrawl =
// 						stock.getElementsByTagName('span')[0]?.innerText;
// 					if (symbolCrawl.includes('*')) {
// 						let len = symbolCrawl?.length;
// 						if (symbolCrawl.includes('**')) {
// 							dataJson.symbol = symbolCrawl.slice(0, len - 2);
// 						} else {
// 							dataJson.symbol = symbolCrawl.slice(0, len - 1);
// 						}
// 					} else {
// 						dataJson.symbol = symbolCrawl;
// 					}

// 					dataJson.reference = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[0]?.innerText;
// 					dataJson.ceil = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[1]?.innerText;
// 					dataJson.floor = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[2]?.innerText;

// 					dataJson.currentPrice = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[3]?.innerText;

// 					dataJson.high = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[7]?.innerText;
// 					dataJson.low = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[8]?.innerText;

// 					dataJson.change = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[5]?.innerText;
// 					dataJson.changePercent = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[6]?.innerText;

// 					const turnOverElement =
// 						stock.getElementsByTagName('td')[20];
// 					dataJson.turnOver =
// 						turnOverElement.getElementsByTagName(
// 							'span'
// 						)[0]?.innerText;
// 				} catch (err) {
// 					console.log(err);
// 				}

// 				stocks.push(dataJson);
// 			});

// 			return stocks;
// 		});

// 		hoseData.forEach((stock) => {
// 			Hose.findOneAndUpdate(
// 				{ name: stock.name },
// 				{
// 					name: stock.name,
// 					symbol: stock.symbol,
// 					reference: stock.reference,
// 					ceil: stock.ceil,
// 					floor: stock.floor,
// 					currentPrice: stock.currentPrice,
// 					high: stock.high,
// 					low: stock.low,
// 					change: stock.change,
// 					changePercent: stock.changePercent,
// 					turnOver: stock.turnOver,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawl hose' + err));
// 		});

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

// const crawlUpcom = asyncHandler(async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlUpcom, { timeout: 0 });
// 		// await page.select('#stocksFilter', 'VN Index')
// 		await page.waitForTimeout(20000);
// 		// const bodyHandle = await page.$('body');
// 		// const { height } = await bodyHandle.boundingBox();
// 		// await bodyHandle.dispose();

// 		// // Scroll one viewport at a time, pausing to let content load
// 		// const viewportHeight = page.viewport().height;
// 		// let viewportIncr = 0;
// 		// while (viewportIncr + viewportHeight < height) {
// 		// 	await page.evaluate((_viewportHeight) => {
// 		// 		window.scrollBy(0, _viewportHeight);
// 		// 	}, viewportHeight);
// 		// 	await page.waitForTimeout(2000);
// 		// 	viewportIncr = viewportIncr + viewportHeight;
// 		// }

// 		// // Scroll back to top
// 		// await page.evaluate((_) => {
// 		// 	window.scrollTo(0, 0);
// 		// });

// 		// // Some extra delay to let all data load
// 		// await page.waitForTimeout(1000);

// 		let upcomData = await page.evaluate(() => {
// 			let stocks = [];
// 			let stockElements = document.querySelectorAll(
// 				'#price-board-container tbody tr'
// 			);

// 			stockElements.forEach((stock) => {
// 				let dataJson = {};

// 				try {
// 					dataJson.name =
// 						stock.getElementsByTagName('td')[0]?.dataset.tooltip;
// 					let symbolCrawl =
// 						stock.getElementsByTagName('span')[0]?.innerText;
// 					if (symbolCrawl.includes('*')) {
// 						let len = symbolCrawl?.length;
// 						if (symbolCrawl.includes('**')) {
// 							dataJson.symbol = symbolCrawl.slice(0, len - 2);
// 						} else {
// 							dataJson.symbol = symbolCrawl.slice(0, len - 1);
// 						}
// 					} else {
// 						dataJson.symbol = symbolCrawl;
// 					}

// 					dataJson.reference = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[0]?.innerText;
// 					dataJson.ceil = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[1]?.innerText;
// 					dataJson.floor = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[2]?.innerText;

// 					dataJson.currentPrice = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[3]?.innerText;

// 					dataJson.high = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[7]?.innerText;
// 					dataJson.low = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[8]?.innerText;

// 					dataJson.change = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[5]?.innerText;
// 					dataJson.changePercent = stock.getElementsByClassName(
// 						'cell-body-highlight'
// 					)[6]?.innerText;

// 					const turnOverElement =
// 						stock.getElementsByTagName('td')[20];
// 					dataJson.turnOver =
// 						turnOverElement.getElementsByTagName(
// 							'span'
// 						)[0]?.innerText;
// 				} catch (err) {
// 					console.log(err);
// 				}
// 				stocks.push(dataJson);
// 			});

// 			return stocks;
// 		});

// 		upcomData.forEach((stock) => {
// 			Upcom.findOneAndUpdate(
// 				{ name: stock.name },
// 				{
// 					name: stock.name,
// 					symbol: stock.symbol,
// 					reference: stock.reference,
// 					ceil: stock.ceil,
// 					floor: stock.floor,
// 					currentPrice: stock.currentPrice,
// 					high: stock.high,
// 					low: stock.low,
// 					change: stock.change,
// 					changePercent: stock.changePercent,
// 					turnOver: stock.turnOver,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawl upcom' + err));
// 		});

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

// const crawlAllInvesting = asyncHandler(async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlInvesting, { timeout: 0 });
// 		await page.select('#stocksFilter', 'Tất cả cổ phiếu Việt Nam');
// 		await page.waitForTimeout(40000);
// 		// const bodyHandle = await page.$('body');
// 		// const { height } = await bodyHandle.boundingBox();
// 		// await bodyHandle.dispose();

// 		// // Scroll one viewport at a time, pausing to let content load
// 		// const viewportHeight = page.viewport().height;
// 		// let viewportIncr = 0;
// 		// while (viewportIncr + viewportHeight < height) {
// 		// 	await page.evaluate((_viewportHeight) => {
// 		// 		window.scrollBy(0, _viewportHeight);
// 		// 	}, viewportHeight);
// 		// 	await page.waitForTimeout(2000);
// 		// 	viewportIncr = viewportIncr + viewportHeight;
// 		// }

// 		// // Scroll back to top
// 		// await page.evaluate((_) => {
// 		// 	window.scrollTo(0, 0);
// 		// });

// 		// // Some extra delay to let all data load
// 		// await page.waitForTimeout(1000);

// 		let allInvestingData = await page.evaluate(() => {
// 			let stocks = [];
// 			let stockElements = document.querySelectorAll(
// 				'#cross_rate_markets_stocks_1 tbody tr'
// 			);

// 			stockElements.forEach((stock) => {
// 				let dataJson = {};

// 				try {
// 					dataJson.id = stock.getAttribute('id').split('_')[1];
// 					dataJson.name =
// 						stock.getElementsByTagName('td')[1]?.innerText;

// 					// dataJson.last = stock.getElementsByTagName('td')[2]?.innerText

// 					// dataJson.currentPrice = stock.getElementsByClassName('cell-body-highlight')[3]?.innerText

// 					// dataJson.high = stock.getElementsByTagName('td')[3]?.innerText
// 					// dataJson.low = stock.getElementsByTagName('td')[4]?.innerText

// 					// dataJson.change = stock.getElementsByTagName('td')[5]?.innerText
// 					// dataJson.changePercent = stock.getElementsByTagName('td')[6]?.innerText

// 					// dataJson.turnOver = stock.getElementsByTagName('td')[7]?.innerText

// 					// dataJson.time = stock.getElementsByTagName('td')[8]?.innerText
// 					dataJson.hrefDetail = stock
// 						.querySelector('a')
// 						.getAttribute('href');
// 				} catch (err) {
// 					console.log(err);
// 				}
// 				stocks.push(dataJson);
// 			});

// 			return stocks;
// 		});

// 		allInvestingData.forEach((stock) => {
// 			AllInvesting.findOneAndUpdate(
// 				{ name: stock.name },
// 				{
// 					id: stock.id,
// 					name: stock.name,
// 					// last: stock.last,
// 					// currentPrice: stock.currentPrice,
// 					// high: stock.high,
// 					// low: stock.low,
// 					// change: stock.change,
// 					// changePercent: stock.changePercent,
// 					// turnOver: stock.turnOver,
// 					// time: stock.time,
// 					hrefDetail: stock.hrefDetail,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc?.symbol))
// 				.catch((err) => console.log('crawl allinvesting' + err));
// 		});

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// });
