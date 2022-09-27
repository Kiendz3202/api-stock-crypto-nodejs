const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const puppeteer = require('puppeteer');

const AbBank = require('../../model/exchangeRate/abBankModel');
const Agribank = require('../../model/exchangeRate/agribankModel');
const Vietcombank = require('../../model/exchangeRate/vietcombankModel');
const Bidv = require('../../model/exchangeRate/bidvModel');
const Techcombank = require('../../model/exchangeRate/techcombankModel');
const Vietinbank = require('../../model/exchangeRate/vietinbankModel');
const Mbbank = require('../../model/exchangeRate/mbbankModel');

const urlAbBank = 'https://www.abbank.vn/thong-tin/ty-gia-ngoai-te-abbank.html';
const urlAgribank = 'https://www.agribank.com.vn/vn/ty-gia';
const urlVietcombank =
	'https://portal.vietcombank.com.vn/Personal/TG/Pages/ty-gia.aspx?devicechannel=default';
const urlBidv = 'https://www.bidv.com.vn/vn/ty-gia-ngoai-te';
const urlTechcombank =
	'https://www.techcombank.com.vn/cong-cu-tien-ich/ti-gia/ti-gia-hoi-doai';
const urlVietinbank = 'https://www.vietinbank.vn/web/home/vn/ty-gia/';
const urlMbbank = 'https://webgia.com/ty-gia/mbbank/';

const collectDataAbBank = async (url) => {
	try {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.setDefaultNavigationTimeout(0);
		await page.goto(url);

		return page.evaluate(async () => {
			const $ = document.querySelector.bind(document);

			let dataJson = {};

			// try {
			dataJson.name = 'Ngân hàng TMCP An Bình';
			dataJson.symbol = 'ABBank';

			let date = new Date();
			dataJson.timeUpdate =
				date.getHours() +
				':' +
				date.getMinutes() +
				':' +
				date.getSeconds() +
				' ' +
				date.getDate() +
				'/' +
				(date.getMonth() + 1) +
				'/' +
				date.getFullYear();

			dataJson.usdBuyCast = $(
				'table tbody :nth-child(17) :nth-child(2) span'
			)?.innerText;
			dataJson.usdBuyTransfer = $(
				'table tbody :nth-child(17) :nth-child(3) span'
			)?.innerText;
			dataJson.usdSellTransfer = $(
				'table tbody :nth-child(17) :nth-child(4) span'
			)?.innerText;
			dataJson.usdSellCast = $(
				'table tbody :nth-child(17) :nth-child(5) span'
			)?.innerText;

			dataJson.eurBuyCast = $(
				'table tbody :nth-child(19) :nth-child(2) span'
			)?.innerText;
			dataJson.eurBuyTransfer = $(
				'table tbody :nth-child(19) :nth-child(3) span'
			)?.innerText;
			dataJson.eurSellTransfer = $(
				'table tbody :nth-child(19) :nth-child(4) span'
			)?.innerText;
			dataJson.eurSellCast = $(
				'table tbody :nth-child(19) :nth-child(5) span'
			)?.innerText;

			dataJson.gbpBuyCast = $(
				'table tbody :nth-child(20) :nth-child(2) span'
			)?.innerText;
			dataJson.gbpBuyTransfer = $(
				'table tbody :nth-child(20) :nth-child(3) span'
			)?.innerText;
			dataJson.gbpSellTransfer = $(
				'table tbody :nth-child(20) :nth-child(4) span'
			)?.innerText;
			dataJson.gbpSellCast = $(
				'table tbody :nth-child(20) :nth-child(5) span'
			)?.innerText;

			dataJson.jpyBuyCast = $(
				'table tbody :nth-child(21) :nth-child(2) span'
			)?.innerText;
			dataJson.jpyBuyTransfer = $(
				'table tbody :nth-child(21) :nth-child(3) span'
			)?.innerText;
			dataJson.jpySellTransfer = $(
				'table tbody :nth-child(21) :nth-child(4) span'
			)?.innerText;
			dataJson.jpySellCast = $(
				'table tbody :nth-child(21) :nth-child(5) span'
			)?.innerText;

			dataJson.audBuyCast = $(
				'table tbody :nth-child(22) :nth-child(2) span'
			)?.innerText;
			dataJson.audBuyTransfer = $(
				'table tbody :nth-child(22) :nth-child(3) span'
			)?.innerText;
			dataJson.audSellTransfer = $(
				'table tbody :nth-child(22) :nth-child(4) span'
			)?.innerText;
			dataJson.audSellCast = $(
				'table tbody :nth-child(22) :nth-child(5) span'
			)?.innerText;

			dataJson.cadBuyCast = $(
				'table tbody :nth-child(23) :nth-child(2) span'
			)?.innerText;
			dataJson.cadBuyTransfer = $(
				'table tbody :nth-child(23) :nth-child(3) span'
			)?.innerText;
			dataJson.cadSellTransfer = $(
				'table tbody :nth-child(23) :nth-child(4) span'
			)?.innerText;
			dataJson.cadSellCast = $(
				'table tbody :nth-child(23) :nth-child(5) span'
			)?.innerText;

			dataJson.nzdBuyCast = $(
				'table tbody :nth-child(24) :nth-child(2) span'
			)?.innerText;
			dataJson.nzdBuyTransfer = $(
				'table tbody :nth-child(24) :nth-child(3) span'
			)?.innerText;
			dataJson.nzdSellTransfer = $(
				'table tbody :nth-child(24) :nth-child(4) span'
			)?.innerText;
			dataJson.nzdSellCast = $(
				'table tbody :nth-child(24) :nth-child(5) span'
			)?.innerText;

			dataJson.sgdBuyCast = $(
				'table tbody :nth-child(25) :nth-child(2) span'
			)?.innerText;
			dataJson.sgdBuyTransfer = $(
				'table tbody :nth-child(25) :nth-child(3) span'
			)?.innerText;
			dataJson.sgdSellTransfer = $(
				'table tbody :nth-child(25) :nth-child(4) span'
			)?.innerText;
			dataJson.sgdSellCast = $(
				'table tbody :nth-child(25) :nth-child(5) span'
			)?.innerText;

			dataJson.chfBuyCast = $(
				'table tbody :nth-child(26) :nth-child(2) span'
			)?.innerText;
			dataJson.chfBuyTransfer = $(
				'table tbody :nth-child(26) :nth-child(3) span'
			)?.innerText;
			dataJson.chfSellTransfer = $(
				'table tbody :nth-child(26) :nth-child(4) span'
			)?.innerText;
			dataJson.chfSellCast = $(
				'table tbody :nth-child(26) :nth-child(5) span'
			)?.innerText;

			dataJson.hkdBuyCast = $(
				'table tbody :nth-child(27) :nth-child(2) span'
			)?.innerText;
			dataJson.hkdBuyTransfer = $(
				'table tbody :nth-child(27) :nth-child(3) span'
			)?.innerText;
			dataJson.hkdSellTransfer = $(
				'table tbody :nth-child(27) :nth-child(4) span'
			)?.innerText;
			dataJson.hkdSellCast = $(
				'table tbody :nth-child(27) :nth-child(5) span'
			)?.innerText;

			dataJson.krwBuyCast = $(
				'table tbody :nth-child(28) :nth-child(2) span'
			)?.innerText;
			dataJson.krwBuyTransfer = $(
				'table tbody :nth-child(28) :nth-child(3) span'
			)?.innerText;
			dataJson.krwSellTransfer = $(
				'table tbody :nth-child(28) :nth-child(4) span'
			)?.innerText;
			dataJson.krwSellCast = $(
				'table tbody :nth-child(28) :nth-child(5) span'
			)?.innerText;
			// } catch (err) {
			// 	console.log(err);
			// }
			return dataJson;
		});
	} catch (error) {
		console.log(error);
		return false;
	}
};

const crawlAbBank = asyncHandler(async () => {
	console.log('start crawl abbank');
	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 3) {
		console.log('loop' + attemps);
		data = await collectDataAbBank(urlAbBank);
		console.log('loop' + data);
		attemps++;

		if (data) {
			console.log(data);
			AbBank.findOneAndUpdate(
				{ symbol: data.symbol },
				{
					name: data.name,
					symbol: data.symbol,
					timeUpdate: data.timeUpdate,

					usdBuyCast: data.usdBuyCast,
					usdBuyTransfer: data.usdBuyTransfer,
					usdSellTransfer: data.usdSellTransfer,
					usdSellCast: data.usdSellCast,

					eurBuyCast: data.eurBuyCast,
					eurBuyTransfer: data.eurBuyTransfer,
					eurSellTransfer: data.eurSellTransfer,
					eurSellCast: data.eurSellCast,

					gbpBuyCast: data.gbpBuyCast,
					gbpBuyTransfer: data.gbpBuyTransfer,
					gbpSellTransfer: data.gbpSellTransfer,
					gbpSellCast: data.gbpSellCast,

					jpyBuyCast: data.jpyBuyCast,
					jpyBuyTransfer: data.jpyBuyTransfer,
					jpySellTransfer: data.jpySellTransfer,
					jpySellCast: data.jpySellCast,

					audBuyCast: data.audBuyCast,
					audBuyTransfer: data.audBuyTransfer,
					audSellTransfer: data.audSellTransfer,
					audSellCast: data.audSellCast,

					cadBuyCast: data.cadBuyCast,
					cadBuyTransfer: data.cadBuyTransfer,
					cadSellTransfer: data.cadSellTransfer,
					cadSellCast: data.cadSellCast,

					nzdBuyCast: data.nzdBuyCast,
					nzdBuyTransfer: data.nzdBuyTransfer,
					nzdSellTransfer: data.nzdSellTransfer,
					nzdSellCast: data.nzdSellCast,

					sgdBuyCast: data.sgdBuyCast,
					sgdBuyTransfer: data.sgdBuyTransfer,
					sgdSellTransfer: data.sgdSellTransfer,
					sgdSellCast: data.sgdSellCast,

					chfBuyCast: data.chfBuyCast,
					chfBuyTransfer: data.chfBuyTransfer,
					chfSellTransfer: data.chfSellTransfer,
					chfSellCast: data.chfSellCast,

					hkdBuyCast: data.hkdBuyCast,
					hkdBuyTransfer: data.hkdBuyTransfer,
					hkdSellTransfer: data.hkdSellTransfer,
					hkdSellCast: data.hkdSellCast,

					krwBuyCast: data.krwBuyCast,
					krwBuyTransfer: data.krwBuyTransfer,
					krwSellTransfer: data.krwSellTransfer,
					krwSellCast: data.krwSellCast,
				},
				{ upsert: true }
			)
				// .then((doc) => console.log(doc))
				.catch((err) => console.log(data.symbol));

			// await browser.close();
		}

		if (data === false) {
			//wait a few second, also a good idea to swap proxy here
			console.log('Recrawl........' + attemps);
			await new Promise((resolve) => setTimeout(resolve, 3000));
		}
	}
});

// const crawlAbBank = asyncHandler(async () => {
// 	// cron.schedule('*/50 * * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlAbBank, { waitUntil: 'networkidle2' });

// 		await page.waitForTimeout(2000);

// 		let abBankData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = 'Ngân hàng TMCP An Bình';
// 				dataJson.symbol = 'ABBank';

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

// 				dataJson.usdBuyCast = $(
// 					'table tbody :nth-child(17) :nth-child(2) span'
// 				)?.innerText;
// 				dataJson.usdBuyTransfer = $(
// 					'table tbody :nth-child(17) :nth-child(3) span'
// 				)?.innerText;
// 				dataJson.usdSellTransfer = $(
// 					'table tbody :nth-child(17) :nth-child(4) span'
// 				)?.innerText;
// 				dataJson.usdSellCast = $(
// 					'table tbody :nth-child(17) :nth-child(5) span'
// 				)?.innerText;

// 				dataJson.eurBuyCast = $(
// 					'table tbody :nth-child(19) :nth-child(2) span'
// 				)?.innerText;
// 				dataJson.eurBuyTransfer = $(
// 					'table tbody :nth-child(19) :nth-child(3) span'
// 				)?.innerText;
// 				dataJson.eurSellTransfer = $(
// 					'table tbody :nth-child(19) :nth-child(4) span'
// 				)?.innerText;
// 				dataJson.eurSellCast = $(
// 					'table tbody :nth-child(19) :nth-child(5) span'
// 				)?.innerText;

// 				dataJson.gbpBuyCast = $(
// 					'table tbody :nth-child(20) :nth-child(2) span'
// 				)?.innerText;
// 				dataJson.gbpBuyTransfer = $(
// 					'table tbody :nth-child(20) :nth-child(3) span'
// 				)?.innerText;
// 				dataJson.gbpSellTransfer = $(
// 					'table tbody :nth-child(20) :nth-child(4) span'
// 				)?.innerText;
// 				dataJson.gbpSellCast = $(
// 					'table tbody :nth-child(20) :nth-child(5) span'
// 				)?.innerText;

// 				dataJson.jpyBuyCast = $(
// 					'table tbody :nth-child(21) :nth-child(2) span'
// 				)?.innerText;
// 				dataJson.jpyBuyTransfer = $(
// 					'table tbody :nth-child(21) :nth-child(3) span'
// 				)?.innerText;
// 				dataJson.jpySellTransfer = $(
// 					'table tbody :nth-child(21) :nth-child(4) span'
// 				)?.innerText;
// 				dataJson.jpySellCast = $(
// 					'table tbody :nth-child(21) :nth-child(5) span'
// 				)?.innerText;

// 				dataJson.audBuyCast = $(
// 					'table tbody :nth-child(22) :nth-child(2) span'
// 				)?.innerText;
// 				dataJson.audBuyTransfer = $(
// 					'table tbody :nth-child(22) :nth-child(3) span'
// 				)?.innerText;
// 				dataJson.audSellTransfer = $(
// 					'table tbody :nth-child(22) :nth-child(4) span'
// 				)?.innerText;
// 				dataJson.audSellCast = $(
// 					'table tbody :nth-child(22) :nth-child(5) span'
// 				)?.innerText;

// 				dataJson.cadBuyCast = $(
// 					'table tbody :nth-child(23) :nth-child(2) span'
// 				)?.innerText;
// 				dataJson.cadBuyTransfer = $(
// 					'table tbody :nth-child(23) :nth-child(3) span'
// 				)?.innerText;
// 				dataJson.cadSellTransfer = $(
// 					'table tbody :nth-child(23) :nth-child(4) span'
// 				)?.innerText;
// 				dataJson.cadSellCast = $(
// 					'table tbody :nth-child(23) :nth-child(5) span'
// 				)?.innerText;

// 				dataJson.nzdBuyCast = $(
// 					'table tbody :nth-child(24) :nth-child(2) span'
// 				)?.innerText;
// 				dataJson.nzdBuyTransfer = $(
// 					'table tbody :nth-child(24) :nth-child(3) span'
// 				)?.innerText;
// 				dataJson.nzdSellTransfer = $(
// 					'table tbody :nth-child(24) :nth-child(4) span'
// 				)?.innerText;
// 				dataJson.nzdSellCast = $(
// 					'table tbody :nth-child(24) :nth-child(5) span'
// 				)?.innerText;

// 				dataJson.sgdBuyCast = $(
// 					'table tbody :nth-child(25) :nth-child(2) span'
// 				)?.innerText;
// 				dataJson.sgdBuyTransfer = $(
// 					'table tbody :nth-child(25) :nth-child(3) span'
// 				)?.innerText;
// 				dataJson.sgdSellTransfer = $(
// 					'table tbody :nth-child(25) :nth-child(4) span'
// 				)?.innerText;
// 				dataJson.sgdSellCast = $(
// 					'table tbody :nth-child(25) :nth-child(5) span'
// 				)?.innerText;

// 				dataJson.chfBuyCast = $(
// 					'table tbody :nth-child(26) :nth-child(2) span'
// 				)?.innerText;
// 				dataJson.chfBuyTransfer = $(
// 					'table tbody :nth-child(26) :nth-child(3) span'
// 				)?.innerText;
// 				dataJson.chfSellTransfer = $(
// 					'table tbody :nth-child(26) :nth-child(4) span'
// 				)?.innerText;
// 				dataJson.chfSellCast = $(
// 					'table tbody :nth-child(26) :nth-child(5) span'
// 				)?.innerText;

// 				dataJson.hkdBuyCast = $(
// 					'table tbody :nth-child(27) :nth-child(2) span'
// 				)?.innerText;
// 				dataJson.hkdBuyTransfer = $(
// 					'table tbody :nth-child(27) :nth-child(3) span'
// 				)?.innerText;
// 				dataJson.hkdSellTransfer = $(
// 					'table tbody :nth-child(27) :nth-child(4) span'
// 				)?.innerText;
// 				dataJson.hkdSellCast = $(
// 					'table tbody :nth-child(27) :nth-child(5) span'
// 				)?.innerText;

// 				dataJson.krwBuyCast = $(
// 					'table tbody :nth-child(28) :nth-child(2) span'
// 				)?.innerText;
// 				dataJson.krwBuyTransfer = $(
// 					'table tbody :nth-child(28) :nth-child(3) span'
// 				)?.innerText;
// 				dataJson.krwSellTransfer = $(
// 					'table tbody :nth-child(28) :nth-child(4) span'
// 				)?.innerText;
// 				dataJson.krwSellCast = $(
// 					'table tbody :nth-child(28) :nth-child(5) span'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(abBankData)

// 		AbBank.findOneAndUpdate(
// 			{ symbol: abBankData.symbol },
// 			{
// 				name: abBankData.name,
// 				symbol: abBankData.symbol,
// 				timeUpdate: abBankData.timeUpdate,

// 				usdBuyCast: abBankData.usdBuyCast,
// 				usdBuyTransfer: abBankData.usdBuyTransfer,
// 				usdSellTransfer: abBankData.usdSellTransfer,
// 				usdSellCast: abBankData.usdSellCast,

// 				eurBuyCast: abBankData.eurBuyCast,
// 				eurBuyTransfer: abBankData.eurBuyTransfer,
// 				eurSellTransfer: abBankData.eurSellTransfer,
// 				eurSellCast: abBankData.eurSellCast,

// 				gbpBuyCast: abBankData.gbpBuyCast,
// 				gbpBuyTransfer: abBankData.gbpBuyTransfer,
// 				gbpSellTransfer: abBankData.gbpSellTransfer,
// 				gbpSellCast: abBankData.gbpSellCast,

// 				jpyBuyCast: abBankData.jpyBuyCast,
// 				jpyBuyTransfer: abBankData.jpyBuyTransfer,
// 				jpySellTransfer: abBankData.jpySellTransfer,
// 				jpySellCast: abBankData.jpySellCast,

// 				audBuyCast: abBankData.audBuyCast,
// 				audBuyTransfer: abBankData.audBuyTransfer,
// 				audSellTransfer: abBankData.audSellTransfer,
// 				audSellCast: abBankData.audSellCast,

// 				cadBuyCast: abBankData.cadBuyCast,
// 				cadBuyTransfer: abBankData.cadBuyTransfer,
// 				cadSellTransfer: abBankData.cadSellTransfer,
// 				cadSellCast: abBankData.cadSellCast,

// 				nzdBuyCast: abBankData.nzdBuyCast,
// 				nzdBuyTransfer: abBankData.nzdBuyTransfer,
// 				nzdSellTransfer: abBankData.nzdSellTransfer,
// 				nzdSellCast: abBankData.nzdSellCast,

// 				sgdBuyCast: abBankData.sgdBuyCast,
// 				sgdBuyTransfer: abBankData.sgdBuyTransfer,
// 				sgdSellTransfer: abBankData.sgdSellTransfer,
// 				sgdSellCast: abBankData.sgdSellCast,

// 				chfBuyCast: abBankData.chfBuyCast,
// 				chfBuyTransfer: abBankData.chfBuyTransfer,
// 				chfSellTransfer: abBankData.chfSellTransfer,
// 				chfSellCast: abBankData.chfSellCast,

// 				hkdBuyCast: abBankData.hkdBuyCast,
// 				hkdBuyTransfer: abBankData.hkdBuyTransfer,
// 				hkdSellTransfer: abBankData.hkdSellTransfer,
// 				hkdSellCast: abBankData.hkdSellCast,

// 				krwBuyCast: abBankData.krwBuyCast,
// 				krwBuyTransfer: abBankData.krwBuyTransfer,
// 				krwSellTransfer: abBankData.krwSellTransfer,
// 				krwSellCast: abBankData.krwSellCast,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(abBankData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

const crawlAgribank = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlAgribank, { timeout: 0 });

		await page.waitForTimeout(2000);

		let agribankData = await page.evaluate(async () => {
			const $ = document.querySelector.bind(document);

			let dataJson = {};

			try {
				dataJson.name =
					'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam';
				dataJson.symbol = 'Agribank';

				let date = new Date();
				dataJson.timeUpdate =
					date.getHours() +
					':' +
					date.getMinutes() +
					':' +
					date.getSeconds() +
					' ' +
					date.getDate() +
					'/' +
					(date.getMonth() + 1) +
					'/' +
					date.getFullYear();

				dataJson.usdBuyCast = $(
					'#tyGiaCn table tbody :nth-child(1) :nth-child(2)'
				)?.innerText;
				dataJson.usdBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(1) :nth-child(3)'
				)?.innerText;
				dataJson.usdSell = $(
					'#tyGiaCn table tbody :nth-child(1) :nth-child(4)'
				)?.innerText;

				dataJson.eurBuyCast = $(
					'#tyGiaCn table tbody :nth-child(2) :nth-child(2)'
				)?.innerText;
				dataJson.eurBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(2) :nth-child(3)'
				)?.innerText;
				dataJson.eurSell = $(
					'#tyGiaCn table tbody :nth-child(2) :nth-child(4)'
				)?.innerText;

				dataJson.gbpBuyCast = $(
					'#tyGiaCn table tbody :nth-child(3) :nth-child(2)'
				)?.innerText;
				dataJson.gbpBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(3) :nth-child(3)'
				)?.innerText;
				dataJson.gbpSell = $(
					'#tyGiaCn table tbody :nth-child(3) :nth-child(4)'
				)?.innerText;

				dataJson.hkdBuyCast = $(
					'#tyGiaCn table tbody :nth-child(4) :nth-child(2)'
				)?.innerText;
				dataJson.hkdBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(4) :nth-child(3)'
				)?.innerText;
				dataJson.hkdSell = $(
					'#tyGiaCn table tbody :nth-child(4) :nth-child(4)'
				)?.innerText;

				dataJson.chfBuyCast = $(
					'#tyGiaCn table tbody :nth-child(5) :nth-child(2)'
				)?.innerText;
				dataJson.chfBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(5) :nth-child(3)'
				)?.innerText;
				dataJson.chfSell = $(
					'#tyGiaCn table tbody :nth-child(5) :nth-child(4)'
				)?.innerText;

				dataJson.jpyBuyCast = $(
					'#tyGiaCn table tbody :nth-child(6) :nth-child(2)'
				)?.innerText;
				dataJson.jpyBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(6) :nth-child(3)'
				)?.innerText;
				dataJson.jpySell = $(
					'#tyGiaCn table tbody :nth-child(6) :nth-child(4)'
				)?.innerText;

				dataJson.audBuyCast = $(
					'#tyGiaCn table tbody :nth-child(7) :nth-child(2)'
				)?.innerText;
				dataJson.audBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(7) :nth-child(3)'
				)?.innerText;
				dataJson.audSell = $(
					'#tyGiaCn table tbody :nth-child(7) :nth-child(4)'
				)?.innerText;

				dataJson.sgdBuyCast = $(
					'#tyGiaCn table tbody :nth-child(8) :nth-child(2)'
				)?.innerText;
				dataJson.sgdBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(8) :nth-child(3)'
				)?.innerText;
				dataJson.sgdSell = $(
					'#tyGiaCn table tbody :nth-child(8) :nth-child(4)'
				)?.innerText;

				dataJson.thbBuyCast = $(
					'#tyGiaCn table tbody :nth-child(9) :nth-child(2)'
				)?.innerText;
				dataJson.thbBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(9) :nth-child(3)'
				)?.innerText;
				dataJson.thbSell = $(
					'#tyGiaCn table tbody :nth-child(9) :nth-child(4)'
				)?.innerText;

				dataJson.cadBuyCast = $(
					'#tyGiaCn table tbody :nth-child(10) :nth-child(2)'
				)?.innerText;
				dataJson.cadBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(10) :nth-child(3)'
				)?.innerText;
				dataJson.cadSell = $(
					'#tyGiaCn table tbody :nth-child(10) :nth-child(4)'
				)?.innerText;

				dataJson.nzdBuyCast = $(
					'#tyGiaCn table tbody :nth-child(11) :nth-child(2)'
				)?.innerText;
				dataJson.nzdBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(11) :nth-child(3)'
				)?.innerText;
				dataJson.nzdSell = $(
					'#tyGiaCn table tbody :nth-child(11) :nth-child(4)'
				)?.innerText;

				dataJson.krwBuyCast = $(
					'#tyGiaCn table tbody :nth-child(12) :nth-child(2)'
				)?.innerText;
				dataJson.krwBuyTransfer = $(
					'#tyGiaCn table tbody :nth-child(12) :nth-child(3)'
				)?.innerText;
				dataJson.krwSell = $(
					'#tyGiaCn table tbody :nth-child(12) :nth-child(4)'
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(agribankData)

		Agribank.findOneAndUpdate(
			{ symbol: agribankData.symbol },
			{
				name: agribankData.name,
				symbol: agribankData.symbol,
				timeUpdate: agribankData.timeUpdate,

				usdBuyCast: agribankData.usdBuyCast,
				usdBuyTransfer: agribankData.usdBuyTransfer,
				usdSell: agribankData.usdSell,

				eurBuyCast: agribankData.eurBuyCast,
				eurBuyTransfer: agribankData.eurBuyTransfer,
				eurSell: agribankData.eurSell,

				gbpBuyCast: agribankData.gbpBuyCast,
				gbpBuyTransfer: agribankData.gbpBuyTransfer,
				gbpSell: agribankData.gbpSell,

				hkdBuyCast: agribankData.hkdBuyCast,
				hkdBuyTransfer: agribankData.hkdBuyTransfer,
				hkdSell: agribankData.hkdSell,

				chfBuyCast: agribankData.chfBuyCast,
				chfBuyTransfer: agribankData.chfBuyTransfer,
				chfSell: agribankData.chfSell,

				jpyBuyCast: agribankData.jpyBuyCast,
				jpyBuyTransfer: agribankData.jpyBuyTransfer,
				jpySell: agribankData.jpySell,

				audBuyCast: agribankData.audBuyCast,
				audBuyTransfer: agribankData.audBuyTransfer,
				audSell: agribankData.audSell,

				sgdBuyCast: agribankData.sgdBuyCast,
				sgdBuyTransfer: agribankData.sgdBuyTransfer,
				sgdSell: agribankData.sgdSell,

				thbBuyCast: agribankData.thbBuyCast,
				thbBuyTransfer: agribankData.thbBuyTransfer,
				thbSell: agribankData.thbSell,

				cadBuyCast: agribankData.cadBuyCast,
				cadBuyTransfer: agribankData.cadBuyTransfer,
				cadSell: agribankData.cadSell,

				nzdBuyCast: agribankData.nzdBuyCast,
				nzdBuyTransfer: agribankData.nzdBuyTransfer,
				nzdSell: agribankData.nzdSell,

				krwBuyCast: agribankData.krwBuyCast,
				krwBuyTransfer: agribankData.krwBuyTransfer,
				krwSell: agribankData.krwSell,
			},
			{ upsert: true }
		)
			// .then((doc) => console.log(doc))
			.catch((err) => console.log(agribankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlVietcombank = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlVietcombank, { timeout: 0 });

		await page.waitForTimeout(2000);

		let vietcombankData = await page.evaluate(async () => {
			const $ = document.querySelector.bind(document);

			let dataJson = {};

			try {
				dataJson.name =
					'Ngân hàng thương mại cổ phần Ngoại thương Việt Nam';
				dataJson.symbol = 'Vietcombank';

				let date = new Date();
				dataJson.timeUpdate =
					date.getHours() +
					':' +
					date.getMinutes() +
					':' +
					date.getSeconds() +
					' ' +
					date.getDate() +
					'/' +
					(date.getMonth() + 1) +
					'/' +
					date.getFullYear();

				dataJson.audBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(3)'
				)?.innerText;
				dataJson.audBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(4)'
				)?.innerText;
				dataJson.audSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(5)'
				)?.innerText;

				dataJson.cadBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(3)'
				)?.innerText;
				dataJson.cadBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(4)'
				)?.innerText;
				dataJson.cadSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(5)'
				)?.innerText;

				dataJson.chfBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(3)'
				)?.innerText;
				dataJson.chfBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(4)'
				)?.innerText;
				dataJson.chfSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(5)'
				)?.innerText;

				dataJson.cnyBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(3)'
				)?.innerText;
				dataJson.cnyBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(4)'
				)?.innerText;
				dataJson.cnySell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(5)'
				)?.innerText;

				dataJson.dkkBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(3)'
				)?.innerText;
				dataJson.dkkBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(4)'
				)?.innerText;
				dataJson.dkkSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(5)'
				)?.innerText;

				dataJson.eurBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(3)'
				)?.innerText;
				dataJson.eurBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(4)'
				)?.innerText;
				dataJson.eurSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(5)'
				)?.innerText;

				dataJson.gbpBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(3)'
				)?.innerText;
				dataJson.gbpBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(4)'
				)?.innerText;
				dataJson.gbpSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(5)'
				)?.innerText;

				dataJson.hkdBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(3)'
				)?.innerText;
				dataJson.hkdBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(4)'
				)?.innerText;
				dataJson.hkdSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(5)'
				)?.innerText;

				dataJson.inrBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(3)'
				)?.innerText;
				dataJson.inrBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(4)'
				)?.innerText;
				dataJson.inrSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(5)'
				)?.innerText;

				dataJson.jpyBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(3)'
				)?.innerText;
				dataJson.jpyBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(4)'
				)?.innerText;
				dataJson.jpySell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(5)'
				)?.innerText;

				dataJson.krwBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(3)'
				)?.innerText;
				dataJson.krwBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(4)'
				)?.innerText;
				dataJson.krwSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(5)'
				)?.innerText;

				dataJson.kwdBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(3)'
				)?.innerText;
				dataJson.kwdBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(4)'
				)?.innerText;
				dataJson.kwdSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(5)'
				)?.innerText;

				dataJson.myrBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(3)'
				)?.innerText;
				dataJson.myrBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(4)'
				)?.innerText;
				dataJson.myrSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(5)'
				)?.innerText;

				dataJson.nokBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(3)'
				)?.innerText;
				dataJson.nokBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(4)'
				)?.innerText;
				dataJson.nokSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(5)'
				)?.innerText;

				dataJson.rubBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(3)'
				)?.innerText;
				dataJson.rubBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(4)'
				)?.innerText;
				dataJson.rubSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(5)'
				)?.innerText;

				dataJson.sarBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(3)'
				)?.innerText;
				dataJson.sarBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(4)'
				)?.innerText;
				dataJson.sarSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(5)'
				)?.innerText;

				dataJson.sekBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(3)'
				)?.innerText;
				dataJson.sekBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(4)'
				)?.innerText;
				dataJson.sekSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(5)'
				)?.innerText;

				dataJson.sgdBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(3)'
				)?.innerText;
				dataJson.sgdBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(4)'
				)?.innerText;
				dataJson.sgdSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(5)'
				)?.innerText;

				dataJson.thbBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(3)'
				)?.innerText;
				dataJson.thbBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(4)'
				)?.innerText;
				dataJson.thbSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(5)'
				)?.innerText;

				dataJson.usdBuyCast = $(
					'#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(3)'
				)?.innerText;
				dataJson.usdBuyTransfer = $(
					'#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(4)'
				)?.innerText;
				dataJson.usdSell = $(
					'#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(5)'
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(vietcombankData)

		Vietcombank.findOneAndUpdate(
			{ symbol: vietcombankData.symbol },
			{
				name: vietcombankData.name,
				symbol: vietcombankData.symbol,
				timeUpdate: vietcombankData.timeUpdate,

				audBuyCast: vietcombankData.audBuyCast,
				audBuyTransfer: vietcombankData.audBuyTransfer,
				audSell: vietcombankData.audSell,

				cadBuyCast: vietcombankData.cadBuyCast,
				cadBuyTransfer: vietcombankData.cadBuyTransfer,
				cadSell: vietcombankData.cadSell,

				chfBuyCast: vietcombankData.chfBuyCast,
				chfBuyTransfer: vietcombankData.chfBuyTransfer,
				chfSell: vietcombankData.chfSell,

				cnyBuyCast: vietcombankData.cnyBuyCast,
				cnyBuyTransfer: vietcombankData.cnyBuyTransfer,
				cnySell: vietcombankData.cnySell,

				dkkBuyCast: vietcombankData.dkkBuyCast,
				dkkBuyTransfer: vietcombankData.dkkBuyTransfer,
				dkkSell: vietcombankData.dkkSell,

				eurBuyCast: vietcombankData.eurBuyCast,
				eurBuyTransfer: vietcombankData.eurBuyTransfer,
				eurSell: vietcombankData.eurSell,

				gbpBuyCast: vietcombankData.gbpBuyCast,
				gbpBuyTransfer: vietcombankData.gbpBuyTransfer,
				gbpSell: vietcombankData.gbpSell,

				hkdBuyCast: vietcombankData.hkdBuyCast,
				hkdBuyTransfer: vietcombankData.hkdBuyTransfer,
				hkdSell: vietcombankData.hkdSell,

				inrBuyCast: vietcombankData.inrBuyCast,
				inrBuyTransfer: vietcombankData.inrBuyTransfer,
				inrSell: vietcombankData.inrSell,

				jpyBuyCast: vietcombankData.jpyBuyCast,
				jpyBuyTransfer: vietcombankData.jpyBuyTransfer,
				jpySell: vietcombankData.jpySell,

				krwBuyCast: vietcombankData.krwBuyCast,
				krwBuyTransfer: vietcombankData.krwBuyTransfer,
				krwSell: vietcombankData.krwSell,

				kwdBuyCast: vietcombankData.kwdBuyCast,
				kwdBuyTransfer: vietcombankData.kwdBuyTransfer,
				kwdSell: vietcombankData.kwdSell,

				myrBuyCast: vietcombankData.myrBuyCast,
				myrBuyTransfer: vietcombankData.myrBuyTransfer,
				myrSell: vietcombankData.myrSell,

				nokBuyCast: vietcombankData.nokBuyCast,
				nokBuyTransfer: vietcombankData.nokBuyTransfer,
				nokSell: vietcombankData.nokSell,

				rubBuyCast: vietcombankData.rubBuyCast,
				rubBuyTransfer: vietcombankData.rubBuyTransfer,
				rubSell: vietcombankData.rubSell,

				sarBuyCast: vietcombankData.sarBuyCast,
				sarBuyTransfer: vietcombankData.sarBuyTransfer,
				sarSell: vietcombankData.sarSell,

				sekBuyCast: vietcombankData.sekBuyCast,
				sekBuyTransfer: vietcombankData.sekBuyTransfer,
				sekSell: vietcombankData.sekSell,

				sgdBuyCast: vietcombankData.sgdBuyCast,
				sgdBuyTransfer: vietcombankData.sgdBuyTransfer,
				sgdSell: vietcombankData.sgdSell,

				thbBuyCast: vietcombankData.thbBuyCast,
				thbBuyTransfer: vietcombankData.thbBuyTransfer,
				thbSell: vietcombankData.thbSell,

				usdBuyCast: vietcombankData.usdBuyCast,
				usdBuyTransfer: vietcombankData.usdBuyTransfer,
				usdSell: vietcombankData.usdSell,
			},
			{ upsert: true }
		)
			// .then((doc) => console.log(doc))
			.catch((err) => console.log(vietcombankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlBidv = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlBidv, { timeout: 0 });

		await page.waitForTimeout(2000);

		let bidvData = await page.evaluate(async () => {
			const $ = document.querySelector.bind(document);

			let dataJson = {};

			try {
				dataJson.name =
					'Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam';
				dataJson.symbol = 'Bidv';

				let date = new Date();
				dataJson.timeUpdate =
					date.getHours() +
					':' +
					date.getMinutes() +
					':' +
					date.getSeconds() +
					' ' +
					date.getDate() +
					'/' +
					(date.getMonth() + 1) +
					'/' +
					date.getFullYear();

				dataJson.usdBuyCast = $(
					'table tbody :nth-child(1) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.usdBuyTransfer = $(
					'table tbody :nth-child(1) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.usdSell = $(
					'table tbody :nth-child(1) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.gbpBuyCast = $(
					'table tbody :nth-child(4) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.gbpBuyTransfer = $(
					'table tbody :nth-child(4) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.gbpSell = $(
					'table tbody :nth-child(4) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.hkdBuyCast = $(
					'table tbody :nth-child(5) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.hkdBuyTransfer = $(
					'table tbody :nth-child(5) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.hkdSell = $(
					'table tbody :nth-child(5) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.chfBuyCast = $(
					'table tbody :nth-child(6) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.chfBuyTransfer = $(
					'table tbody :nth-child(6) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.chfSell = $(
					'table tbody :nth-child(6) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.jpyBuyCast = $(
					'table tbody :nth-child(7) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.jpyBuyTransfer = $(
					'table tbody :nth-child(7) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.jpySell = $(
					'table tbody :nth-child(7) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.thbBuyCast = $(
					'table tbody :nth-child(8) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.thbBuyTransfer = $(
					'table tbody :nth-child(8) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.thbSell = $(
					'table tbody :nth-child(8) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.audBuyCast = $(
					'table tbody :nth-child(9) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.audBuyTransfer = $(
					'table tbody :nth-child(9) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.audSell = $(
					'table tbody :nth-child(9) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.cadBuyCast = $(
					'table tbody :nth-child(10) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.cadBuyTransfer = $(
					'table tbody :nth-child(10) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.cadSell = $(
					'table tbody :nth-child(10) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.sgdBuyCast = $(
					'table tbody :nth-child(11) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.sgdBuyTransfer = $(
					'table tbody :nth-child(11) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.sgdSell = $(
					'table tbody :nth-child(11) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.sekBuyCast = $(
					'table tbody :nth-child(12) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.sekBuyTransfer = $(
					'table tbody :nth-child(12) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.sekSell = $(
					'table tbody :nth-child(12) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.lakBuyCast = $(
					'table tbody :nth-child(13) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.lakBuyTransfer = $(
					'table tbody :nth-child(13) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.lakSell = $(
					'table tbody :nth-child(13) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.dkkBuyCast = $(
					'table tbody :nth-child(14) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.dkkBuyTransfer = $(
					'table tbody :nth-child(14) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.dkkSell = $(
					'table tbody :nth-child(14) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.nokBuyCast = $(
					'table tbody :nth-child(15) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.nokBuyTransfer = $(
					'table tbody :nth-child(15) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.nokSell = $(
					'table tbody :nth-child(15) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.cnyBuyCast = $(
					'table tbody :nth-child(16) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.cnyBuyTransfer = $(
					'table tbody :nth-child(16) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.cnySell = $(
					'table tbody :nth-child(16) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.rubBuyCast = $(
					'table tbody :nth-child(17) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.rubBuyTransfer = $(
					'table tbody :nth-child(17) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.rubSell = $(
					'table tbody :nth-child(17) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.nzdBuyCast = $(
					'table tbody :nth-child(18) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.nzdBuyTransfer = $(
					'table tbody :nth-child(18) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.nzdSell = $(
					'table tbody :nth-child(18) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.krwBuyCast = $(
					'table tbody :nth-child(19) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.krwBuyTransfer = $(
					'table tbody :nth-child(19) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.krwSell = $(
					'table tbody :nth-child(19) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.eurBuyCast = $(
					'table tbody :nth-child(20) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.eurBuyTransfer = $(
					'table tbody :nth-child(20) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.eurSell = $(
					'table tbody :nth-child(20) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.twdBuyCast = $(
					'table tbody :nth-child(21) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.twdBuyTransfer = $(
					'table tbody :nth-child(21) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.twdSell = $(
					'table tbody :nth-child(21) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.myrBuyCast = $(
					'table tbody :nth-child(22) :nth-child(3) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.myrBuyTransfer = $(
					'table tbody :nth-child(22) :nth-child(4) :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.myrSell = $(
					'table tbody :nth-child(22) :nth-child(5) :nth-child(2) :nth-child(2) '
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(bidvData);

		Bidv.findOneAndUpdate(
			{ symbol: bidvData.symbol },
			{
				name: bidvData.name,
				symbol: bidvData.symbol,
				timeUpdate: bidvData.timeUpdate,

				usdBuyCast: bidvData.usdBuyCast,
				usdBuyTransfer: bidvData.usdBuyTransfer,
				usdSell: bidvData.usdSell,

				gbpBuyCast: bidvData.gbpBuyCast,
				gbpBuyTransfer: bidvData.gbpBuyTransfer,
				gbpSell: bidvData.gbpSell,

				hkdBuyCast: bidvData.hkdBuyCast,
				hkdBuyTransfer: bidvData.hkdBuyTransfer,
				hkdSell: bidvData.hkdSell,

				chfBuyCast: bidvData.chfBuyCast,
				chfBuyTransfer: bidvData.chfBuyTransfer,
				chfSell: bidvData.chfSell,

				jpyBuyCast: bidvData.jpyBuyCast,
				jpyBuyTransfer: bidvData.jpyBuyTransfer,
				jpySell: bidvData.jpySell,

				thbBuyCast: bidvData.thbBuyCast,
				thbBuyTransfer: bidvData.thbBuyTransfer,
				thbSell: bidvData.thbSell,

				audBuyCast: bidvData.audBuyCast,
				audBuyTransfer: bidvData.audBuyTransfer,
				audSell: bidvData.audSell,

				cadBuyCast: bidvData.cadBuyCast,
				cadBuyTransfer: bidvData.cadBuyTransfer,
				cadSell: bidvData.cadSell,

				sgdBuyCast: bidvData.sgdBuyCast,
				sgdBuyTransfer: bidvData.sgdBuyTransfer,
				sgdSell: bidvData.sgdSell,

				sekBuyCast: bidvData.sekBuyCast,
				sekBuyTransfer: bidvData.sekBuyTransfer,
				sekSell: bidvData.sekSell,

				lakBuyCast: bidvData.lakBuyCast,
				lakBuyTransfer: bidvData.lakBuyTransfer,
				lakSell: bidvData.lakSell,

				dkkBuyCast: bidvData.dkkBuyCast,
				dkkBuyTransfer: bidvData.dkkBuyTransfer,
				dkkSell: bidvData.dkkSell,

				nokBuyCast: bidvData.nokBuyCast,
				nokBuyTransfer: bidvData.nokBuyTransfer,
				nokSell: bidvData.nokSell,

				cnyBuyCast: bidvData.cnyBuyCast,
				cnyBuyTransfer: bidvData.cnyBuyTransfer,
				cnySell: bidvData.cnySell,

				rubBuyCast: bidvData.rubBuyCast,
				rubBuyTransfer: bidvData.rubBuyTransfer,
				rubSell: bidvData.rubSell,

				nzdBuyCast: bidvData.nzdBuyCast,
				nzdBuyTransfer: bidvData.nzdBuyTransfer,
				nzdSell: bidvData.nzdSell,

				krwBuyCast: bidvData.krwBuyCast,
				krwBuyTransfer: bidvData.krwBuyTransfer,
				krwSell: bidvData.krwSell,

				eurBuyCast: bidvData.eurBuyCast,
				eurBuyTransfer: bidvData.eurBuyTransfer,
				eurSell: bidvData.eurSell,

				twdBuyCast: bidvData.twdBuyCast,
				twdBuyTransfer: bidvData.twdBuyTransfer,
				twdSell: bidvData.twdSell,

				myrBuyCast: bidvData.myrBuyCast,
				myrBuyTransfer: bidvData.myrBuyTransfer,
				myrSell: bidvData.myrSell,
			},
			{ upsert: true }
		)
			// .then((doc) => console.log(doc))
			.catch((err) => console.log(bidvData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlTechcombank = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlTechcombank, { timeout: 0 });

		await page.waitForTimeout(2000);

		let techcombankData = await page.evaluate(async () => {
			const $ = document.querySelector.bind(document);

			let dataJson = {};

			try {
				dataJson.name =
					'Ngân hàng Thương mại cổ phần Kỹ Thương Việt Nam';
				dataJson.symbol = 'Techcombank';

				let date = new Date();
				dataJson.timeUpdate =
					date.getHours() +
					':' +
					date.getMinutes() +
					':' +
					date.getSeconds() +
					' ' +
					date.getDate() +
					'/' +
					(date.getMonth() + 1) +
					'/' +
					date.getFullYear();

				dataJson.audBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(5) :nth-child(2) strong '
				)?.innerText;
				dataJson.audBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(5) :nth-child(3) strong '
				)?.innerText;
				dataJson.audSell = $(
					'#exchangeFilterContainer table tbody :nth-child(5) :nth-child(4) strong '
				)?.innerText;

				dataJson.cadBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(7) :nth-child(2) strong '
				)?.innerText;
				dataJson.cadBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(7) :nth-child(3) strong '
				)?.innerText;
				dataJson.cadSell = $(
					'#exchangeFilterContainer table tbody :nth-child(7) :nth-child(4) strong '
				)?.innerText;

				dataJson.chfBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(9) :nth-child(2) strong '
				)?.innerText;
				dataJson.chfBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(9) :nth-child(3) strong '
				)?.innerText;
				dataJson.chfSell = $(
					'#exchangeFilterContainer table tbody :nth-child(9) :nth-child(4) strong '
				)?.innerText;

				dataJson.cnyBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(11) :nth-child(2) strong '
				)?.innerText;
				dataJson.cnyBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(11) :nth-child(3) strong '
				)?.innerText;
				dataJson.cnySell = $(
					'#exchangeFilterContainer table tbody :nth-child(11) :nth-child(4) strong '
				)?.innerText;

				dataJson.eurBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(13) :nth-child(2) strong '
				)?.innerText;
				dataJson.eurBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(13) :nth-child(3) strong '
				)?.innerText;
				dataJson.eurSell = $(
					'#exchangeFilterContainer table tbody :nth-child(13) :nth-child(4) strong '
				)?.innerText;

				dataJson.gbpBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(15) :nth-child(2) strong '
				)?.innerText;
				dataJson.gbpBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(15) :nth-child(3) strong '
				)?.innerText;
				dataJson.gbpSell = $(
					'#exchangeFilterContainer table tbody :nth-child(15) :nth-child(4) strong '
				)?.innerText;

				dataJson.hkdBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(17) :nth-child(2) strong '
				)?.innerText;
				dataJson.hkdBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(17) :nth-child(3) strong '
				)?.innerText;
				dataJson.hkdSell = $(
					'#exchangeFilterContainer table tbody :nth-child(17) :nth-child(4) strong '
				)?.innerText;

				dataJson.jpyBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(19) :nth-child(2) strong '
				)?.innerText;
				dataJson.jpyBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(19) :nth-child(3) strong '
				)?.innerText;
				dataJson.jpySell = $(
					'#exchangeFilterContainer table tbody :nth-child(19) :nth-child(4) strong '
				)?.innerText;

				dataJson.krwBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(21) :nth-child(2) strong '
				)?.innerText;
				dataJson.krwBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(21) :nth-child(3) strong '
				)?.innerText;
				dataJson.krwSell = $(
					'#exchangeFilterContainer table tbody :nth-child(21) :nth-child(4) strong '
				)?.innerText;

				dataJson.myrBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(23) :nth-child(2) strong '
				)?.innerText;
				dataJson.myrBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(23) :nth-child(3) strong '
				)?.innerText;
				dataJson.myrSell = $(
					'#exchangeFilterContainer table tbody :nth-child(23) :nth-child(4) strong '
				)?.innerText;

				dataJson.sgdBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(25) :nth-child(2) strong '
				)?.innerText;
				dataJson.sgdBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(25) :nth-child(3) strong '
				)?.innerText;
				dataJson.sgdSell = $(
					'#exchangeFilterContainer table tbody :nth-child(25) :nth-child(4) strong '
				)?.innerText;

				dataJson.thbBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(27) :nth-child(2) strong '
				)?.innerText;
				dataJson.thbBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(27) :nth-child(3) strong '
				)?.innerText;
				dataJson.thbSell = $(
					'#exchangeFilterContainer table tbody :nth-child(27) :nth-child(4) strong '
				)?.innerText;

				dataJson.usdBuyCast = $(
					'#exchangeFilterContainer table tbody :nth-child(33) :nth-child(2) strong '
				)?.innerText;
				dataJson.usdBuyTransfer = $(
					'#exchangeFilterContainer table tbody :nth-child(33) :nth-child(3) strong '
				)?.innerText;
				dataJson.usdSell = $(
					'#exchangeFilterContainer table tbody :nth-child(33) :nth-child(4) strong '
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(techcombankData)

		Techcombank.findOneAndUpdate(
			{ symbol: techcombankData.symbol },
			{
				name: techcombankData.name,
				symbol: techcombankData.symbol,
				timeUpdate: techcombankData.timeUpdate,

				audBuyCast: techcombankData.audBuyCast,
				audBuyTransfer: techcombankData.audBuyTransfer,
				audSell: techcombankData.audSell,

				cadBuyCast: techcombankData.cadBuyCast,
				cadBuyTransfer: techcombankData.cadBuyTransfer,
				cadSell: techcombankData.cadSell,

				chfBuyCast: techcombankData.chfBuyCast,
				chfBuyTransfer: techcombankData.chfBuyTransfer,
				chfSell: techcombankData.chfSell,

				cnyBuyCast: techcombankData.cnyBuyCast,
				cnyBuyTransfer: techcombankData.cnyBuyTransfer,
				cnySell: techcombankData.cnySell,

				eurBuyCast: techcombankData.eurBuyCast,
				eurBuyTransfer: techcombankData.eurBuyTransfer,
				eurSell: techcombankData.eurSell,

				gbpBuyCast: techcombankData.gbpBuyCast,
				gbpBuyTransfer: techcombankData.gbpBuyTransfer,
				gbpSell: techcombankData.gbpSell,

				hkdBuyCast: techcombankData.hkdBuyCast,
				hkdBuyTransfer: techcombankData.hkdBuyTransfer,
				hkdSell: techcombankData.hkdSell,

				jpyBuyCast: techcombankData.jpyBuyCast,
				jpyBuyTransfer: techcombankData.jpyBuyTransfer,
				jpySell: techcombankData.jpySell,

				krwBuyCast: techcombankData.krwBuyCast,
				krwBuyTransfer: techcombankData.krwBuyTransfer,
				krwSell: techcombankData.krwSell,

				myrBuyCast: techcombankData.myrBuyCast,
				myrBuyTransfer: techcombankData.myrBuyTransfer,
				myrSell: techcombankData.myrSell,

				sgdBuyCast: techcombankData.sgdBuyCast,
				sgdBuyTransfer: techcombankData.sgdBuyTransfer,
				sgdSell: techcombankData.sgdSell,

				thbBuyCast: techcombankData.thbBuyCast,
				thbBuyTransfer: techcombankData.thbBuyTransfer,
				thbSell: techcombankData.thbSell,

				usdBuyCast: techcombankData.usdBuyCast,
				usdBuyTransfer: techcombankData.usdBuyTransfer,
				usdSell: techcombankData.usdSell,
			},
			{ upsert: true }
		)
			// .then((doc) => console.log(doc))
			.catch((err) => console.log(techcombankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlVietinbank = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlVietinbank, { timeout: 0 });

		await page.waitForTimeout(2000);

		let vietinbankData = await page.evaluate(async () => {
			const $ = document.querySelector.bind(document);

			let dataJson = {};

			try {
				dataJson.name =
					'Ngân hàng Thương mại cổ phần Công Thương Việt Nam';
				dataJson.symbol = 'VietinBank';

				let date = new Date();
				dataJson.timeUpdate =
					date.getHours() +
					':' +
					date.getMinutes() +
					':' +
					date.getSeconds() +
					' ' +
					date.getDate() +
					'/' +
					(date.getMonth() + 1) +
					'/' +
					date.getFullYear();

				dataJson.audBuyCast = $(
					'#hor-ex-b tbody :nth-child(3) :nth-child(3)'
				)?.innerText;
				dataJson.audBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(3) :nth-child(4)'
				)?.innerText;
				dataJson.audSell = $(
					'#hor-ex-b tbody :nth-child(3) :nth-child(5)'
				)?.innerText;

				dataJson.cadBuyCast = $(
					'#hor-ex-b tbody :nth-child(4) :nth-child(3)'
				)?.innerText;
				dataJson.cadBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(4) :nth-child(4)'
				)?.innerText;
				dataJson.cadSell = $(
					'#hor-ex-b tbody :nth-child(4) :nth-child(5)'
				)?.innerText;

				dataJson.chfBuyCast = $(
					'#hor-ex-b tbody :nth-child(5) :nth-child(3)'
				)?.innerText;
				dataJson.chfBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(5) :nth-child(4)'
				)?.innerText;
				dataJson.chfSell = $(
					'#hor-ex-b tbody :nth-child(5) :nth-child(5)'
				)?.innerText;

				dataJson.cnyBuyCast = $(
					'#hor-ex-b tbody :nth-child(6) :nth-child(3)'
				)?.innerText;
				dataJson.cnyBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(6) :nth-child(4)'
				)?.innerText;
				dataJson.cnySell = $(
					'#hor-ex-b tbody :nth-child(6) :nth-child(5)'
				)?.innerText;

				dataJson.dkkBuyCast = $(
					'#hor-ex-b tbody :nth-child(7) :nth-child(3)'
				)?.innerText;
				dataJson.dkkBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(7) :nth-child(4)'
				)?.innerText;
				dataJson.dkkSell = $(
					'#hor-ex-b tbody :nth-child(7) :nth-child(5)'
				)?.innerText;

				dataJson.eurBuyCast = document
					.querySelector(
						'#hor-ex-b tbody :nth-child(8) :nth-child(3)'
					)
					?.innerText.slice(1);
				dataJson.eurBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(8) :nth-child(4)'
				)?.innerText;
				dataJson.eurSell = $(
					'#hor-ex-b tbody :nth-child(8) :nth-child(5)'
				)?.innerText;

				dataJson.gbpBuyCast = $(
					'#hor-ex-b tbody :nth-child(10) :nth-child(3)'
				)?.innerText;
				dataJson.gbpBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(10) :nth-child(4)'
				)?.innerText;
				dataJson.gbpSell = $(
					'#hor-ex-b tbody :nth-child(10) :nth-child(5)'
				)?.innerText;

				dataJson.hkdBuyCast = $(
					'#hor-ex-b tbody :nth-child(11) :nth-child(3)'
				)?.innerText;
				dataJson.hkdBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(11) :nth-child(4)'
				)?.innerText;
				dataJson.hkdSell = $(
					'#hor-ex-b tbody :nth-child(11) :nth-child(5)'
				)?.innerText;

				dataJson.jpyBuyCast = $(
					'#hor-ex-b tbody :nth-child(12) :nth-child(3)'
				)?.innerText;
				dataJson.jpyBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(12) :nth-child(4)'
				)?.innerText;
				dataJson.jpySell = $(
					'#hor-ex-b tbody :nth-child(12) :nth-child(5)'
				)?.innerText;

				dataJson.krwBuyCast = $(
					'#hor-ex-b tbody :nth-child(13) :nth-child(3)'
				)?.innerText;
				dataJson.krwBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(13) :nth-child(4)'
				)?.innerText;
				dataJson.krwSell = $(
					'#hor-ex-b tbody :nth-child(13) :nth-child(5)'
				)?.innerText;

				dataJson.lakBuyCast = $(
					'#hor-ex-b tbody :nth-child(14) :nth-child(3)'
				)?.innerText;
				dataJson.lakBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(14) :nth-child(4)'
				)?.innerText;
				dataJson.lakSell = $(
					'#hor-ex-b tbody :nth-child(14) :nth-child(5)'
				)?.innerText;

				dataJson.nokBuyCast = $(
					'#hor-ex-b tbody :nth-child(15) :nth-child(3)'
				)?.innerText;
				dataJson.nokBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(15) :nth-child(4)'
				)?.innerText;
				dataJson.nokSell = $(
					'#hor-ex-b tbody :nth-child(15) :nth-child(5)'
				)?.innerText;

				dataJson.nzdBuyCast = $(
					'#hor-ex-b tbody :nth-child(16) :nth-child(3)'
				)?.innerText;
				dataJson.nzdBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(16) :nth-child(4)'
				)?.innerText;
				dataJson.nzdSell = $(
					'#hor-ex-b tbody :nth-child(16) :nth-child(5)'
				)?.innerText;

				dataJson.sekBuyCast = $(
					'#hor-ex-b tbody :nth-child(17) :nth-child(3)'
				)?.innerText;
				dataJson.sekBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(17) :nth-child(4)'
				)?.innerText;
				dataJson.sekSell = $(
					'#hor-ex-b tbody :nth-child(17) :nth-child(5)'
				)?.innerText;

				dataJson.sgdBuyCast = $(
					'#hor-ex-b tbody :nth-child(18) :nth-child(3)'
				)?.innerText;
				dataJson.sgdBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(18) :nth-child(4)'
				)?.innerText;
				dataJson.sgdSell = $(
					'#hor-ex-b tbody :nth-child(18) :nth-child(5)'
				)?.innerText;

				dataJson.thbBuyCast = $(
					'#hor-ex-b tbody :nth-child(19) :nth-child(3)'
				)?.innerText;
				dataJson.thbBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(19) :nth-child(4)'
				)?.innerText;
				dataJson.thbSell = $(
					'#hor-ex-b tbody :nth-child(19) :nth-child(5)'
				)?.innerText;

				dataJson.usdBuyCast = document
					.querySelector(
						'#hor-ex-b tbody :nth-child(20) :nth-child(3)'
					)
					?.innerText.slice(1);
				dataJson.usdBuyTransfer = $(
					'#hor-ex-b tbody :nth-child(20) :nth-child(4)'
				)?.innerText;
				dataJson.usdSell = $(
					'#hor-ex-b tbody :nth-child(20) :nth-child(5)'
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(vietinbankData)

		Vietinbank.findOneAndUpdate(
			{ symbol: vietinbankData.symbol },
			{
				name: vietinbankData.name,
				symbol: vietinbankData.symbol,
				timeUpdate: vietinbankData.timeUpdate,

				audBuyCast: vietinbankData.audBuyCast,
				audBuyTransfer: vietinbankData.audBuyTransfer,
				audSell: vietinbankData.audSell,

				cadBuyCast: vietinbankData.cadBuyCast,
				cadBuyTransfer: vietinbankData.cadBuyTransfer,
				cadSell: vietinbankData.cadSell,

				chfBuyCast: vietinbankData.chfBuyCast,
				chfBuyTransfer: vietinbankData.chfBuyTransfer,
				chfSell: vietinbankData.chfSell,

				cnyBuyCast: vietinbankData.cnyBuyCast,
				cnyBuyTransfer: vietinbankData.cnyBuyTransfer,
				cnySell: vietinbankData.cnySell,

				dkkBuyCast: vietinbankData.dkkBuyCast,
				dkkBuyTransfer: vietinbankData.dkkBuyTransfer,
				dkkSell: vietinbankData.dkkSell,

				eurBuyCast: vietinbankData.eurBuyCast,
				eurBuyTransfer: vietinbankData.eurBuyTransfer,
				eurSell: vietinbankData.eurSell,

				gbpBuyCast: vietinbankData.gbpBuyCast,
				gbpBuyTransfer: vietinbankData.gbpBuyTransfer,
				gbpSell: vietinbankData.gbpSell,

				hkdBuyCast: vietinbankData.hkdBuyCast,
				hkdBuyTransfer: vietinbankData.hkdBuyTransfer,
				hkdSell: vietinbankData.hkdSell,

				jpyBuyCast: vietinbankData.jpyBuyCast,
				jpyBuyTransfer: vietinbankData.jpyBuyTransfer,
				jpySell: vietinbankData.jpySell,

				krwBuyCast: vietinbankData.krwBuyCast,
				krwBuyTransfer: vietinbankData.krwBuyTransfer,
				krwSell: vietinbankData.krwSell,

				lakBuyCast: vietinbankData.lakBuyCast,
				lakBuyTransfer: vietinbankData.lakBuyTransfer,
				lakSell: vietinbankData.lakSell,

				nokBuyCast: vietinbankData.nokBuyCast,
				nokBuyTransfer: vietinbankData.nokBuyTransfer,
				nokSell: vietinbankData.nokSell,

				nzdBuyCast: vietinbankData.nzdBuyCast,
				nzdBuyTransfer: vietinbankData.nzdBuyTransfer,
				nzdSell: vietinbankData.nzdSell,

				sekBuyCast: vietinbankData.sekBuyCast,
				sekBuyTransfer: vietinbankData.sekBuyTransfer,
				sekSell: vietinbankData.sekSell,

				sgdBuyCast: vietinbankData.sgdBuyCast,
				sgdBuyTransfer: vietinbankData.sgdBuyTransfer,
				sgdSell: vietinbankData.sgdSell,

				thbBuyCast: vietinbankData.thbBuyCast,
				thbBuyTransfer: vietinbankData.thbBuyTransfer,
				thbSell: vietinbankData.thbSell,

				usdBuyCast: vietinbankData.usdBuyCast,
				usdBuyTransfer: vietinbankData.usdBuyTransfer,
				usdSell: vietinbankData.usdSell,
			},
			{ upsert: true }
		)
			// .then((doc) => console.log(doc))
			.catch((err) => console.log(vietinbankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlMbbank = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlMbbank, { timeout: 0 });

		await page.waitForTimeout(2000);

		let mbbankData = await page.evaluate(async () => {
			const $ = document.querySelector.bind(document);

			let dataJson = {};

			try {
				dataJson.name = 'Ngân hàng Thương mại Cổ phần Quân đội';
				dataJson.symbol = 'Mbbank';

				let date = new Date();
				dataJson.timeUpdate =
					date.getHours() +
					':' +
					date.getMinutes() +
					':' +
					date.getSeconds() +
					' ' +
					date.getDate() +
					'/' +
					(date.getMonth() + 1) +
					'/' +
					date.getFullYear();

				dataJson.usdBuyCast = $(
					'#main tbody :nth-child(1) :nth-child(3)'
				)?.innerText;
				dataJson.usdBuyTransfer = $(
					'#main tbody :nth-child(1) :nth-child(4)'
				)?.innerText;
				dataJson.usdSellCast = $(
					'#main tbody :nth-child(1) :nth-child(5)'
				)?.innerText;
				dataJson.usdSellTransfer = $(
					'#main tbody :nth-child(1) :nth-child(6)'
				)?.innerText;

				dataJson.eurBuyCast = $(
					'#main tbody :nth-child(4) :nth-child(3)'
				)?.innerText;
				dataJson.eurBuyTransfer = $(
					'#main tbody :nth-child(4) :nth-child(4)'
				)?.innerText;
				dataJson.eurSellCast = $(
					'#main tbody :nth-child(4) :nth-child(5)'
				)?.innerText;
				dataJson.eurSellTransfer = $(
					'#main tbody :nth-child(4) :nth-child(6)'
				)?.innerText;

				dataJson.audBuyCast = $(
					'#main tbody :nth-child(5) :nth-child(3)'
				)?.innerText;
				dataJson.audBuyTransfer = $(
					'#main tbody :nth-child(5) :nth-child(4)'
				)?.innerText;
				dataJson.audSellCast = $(
					'#main tbody :nth-child(5) :nth-child(5)'
				)?.innerText;
				dataJson.audSellTransfer = $(
					'#main tbody :nth-child(5) :nth-child(6)'
				)?.innerText;

				dataJson.cadBuyCast = $(
					'#main tbody :nth-child(6) :nth-child(3)'
				)?.innerText;
				dataJson.cadBuyTransfer = $(
					'#main tbody :nth-child(6) :nth-child(4)'
				)?.innerText;
				dataJson.cadSellCast = $(
					'#main tbody :nth-child(6) :nth-child(5)'
				)?.innerText;
				dataJson.cadSellTransfer = $(
					'#main tbody :nth-child(6) :nth-child(6)'
				)?.innerText;

				dataJson.chfBuyCast = $(
					'#main tbody :nth-child(7) :nth-child(3)'
				)?.innerText;
				dataJson.chfBuyTransfer = $(
					'#main tbody :nth-child(7) :nth-child(4)'
				)?.innerText;
				dataJson.chfSellCast = $(
					'#main tbody :nth-child(7) :nth-child(5)'
				)?.innerText;
				dataJson.chfSellTransfer = $(
					'#main tbody :nth-child(7) :nth-child(6)'
				)?.innerText;

				dataJson.cnyBuyCast = $(
					'#main tbody :nth-child(8) :nth-child(3)'
				)?.innerText;
				dataJson.cnyBuyTransfer = $(
					'#main tbody :nth-child(8) :nth-child(4)'
				)?.innerText;
				dataJson.cnySellCast = $(
					'#main tbody :nth-child(8) :nth-child(5)'
				)?.innerText;
				dataJson.cnySellTransfer = $(
					'#main tbody :nth-child(8) :nth-child(6)'
				)?.innerText;

				dataJson.gbpBuyCast = $(
					'#main tbody :nth-child(9) :nth-child(3)'
				)?.innerText;
				dataJson.gbpBuyTransfer = $(
					'#main tbody :nth-child(9) :nth-child(4)'
				)?.innerText;
				dataJson.gbpSellCast = $(
					'#main tbody :nth-child(9) :nth-child(5)'
				)?.innerText;
				dataJson.gbpSellTransfer = $(
					'#main tbody :nth-child(9) :nth-child(6)'
				)?.innerText;

				dataJson.hkdBuyCast = $(
					'#main tbody :nth-child(10) :nth-child(3)'
				)?.innerText;
				dataJson.hkdBuyTransfer = $(
					'#main tbody :nth-child(10) :nth-child(4)'
				)?.innerText;
				dataJson.hkdSellCast = $(
					'#main tbody :nth-child(10) :nth-child(5)'
				)?.innerText;
				dataJson.hkdSellTransfer = $(
					'#main tbody :nth-child(10) :nth-child(6)'
				)?.innerText;

				dataJson.jpyBuyCast = $(
					'#main tbody :nth-child(11) :nth-child(3)'
				)?.innerText;
				dataJson.jpyBuyTransfer = $(
					'#main tbody :nth-child(11) :nth-child(4)'
				)?.innerText;
				dataJson.jpySellCast = $(
					'#main tbody :nth-child(11) :nth-child(5)'
				)?.innerText;
				dataJson.jpySellTransfer = $(
					'#main tbody :nth-child(11) :nth-child(6)'
				)?.innerText;

				dataJson.khrBuyCast = $(
					'#main tbody :nth-child(12) :nth-child(3)'
				)?.innerText;
				dataJson.khrBuyTransfer = $(
					'#main tbody :nth-child(12) :nth-child(4)'
				)?.innerText;
				dataJson.khrSellCast = $(
					'#main tbody :nth-child(12) :nth-child(5)'
				)?.innerText;
				dataJson.khrSellTransfer = $(
					'#main tbody :nth-child(12) :nth-child(6)'
				)?.innerText;

				dataJson.krwBuyCast = $(
					'#main tbody :nth-child(13) :nth-child(3)'
				)?.innerText;
				dataJson.krwBuyTransfer = $(
					'#main tbody :nth-child(13) :nth-child(4)'
				)?.innerText;
				dataJson.krwSellCast = $(
					'#main tbody :nth-child(13) :nth-child(5)'
				)?.innerText;
				dataJson.krwSellTransfer = $(
					'#main tbody :nth-child(13) :nth-child(6)'
				)?.innerText;

				dataJson.lakBuyCast = $(
					'#main tbody :nth-child(14) :nth-child(3)'
				)?.innerText;
				dataJson.lakBuyTransfer = $(
					'#main tbody :nth-child(14) :nth-child(4)'
				)?.innerText;
				dataJson.lakSellCast = $(
					'#main tbody :nth-child(14) :nth-child(5)'
				)?.innerText;
				dataJson.lakSellTransfer = $(
					'#main tbody :nth-child(14) :nth-child(6)'
				)?.innerText;

				dataJson.nzdBuyCast = $(
					'#main tbody :nth-child(15) :nth-child(3)'
				)?.innerText;
				dataJson.nzdBuyTransfer = $(
					'#main tbody :nth-child(15) :nth-child(4)'
				)?.innerText;
				dataJson.nzdSellCast = $(
					'#main tbody :nth-child(15) :nth-child(5)'
				)?.innerText;
				dataJson.nzdSellTransfer = $(
					'#main tbody :nth-child(15) :nth-child(6)'
				)?.innerText;

				dataJson.sekBuyCast = $(
					'#main tbody :nth-child(16) :nth-child(3)'
				)?.innerText;
				dataJson.sekBuyTransfer = $(
					'#main tbody :nth-child(16) :nth-child(4)'
				)?.innerText;
				dataJson.sekSellCast = $(
					'#main tbody :nth-child(16) :nth-child(5)'
				)?.innerText;
				dataJson.sekSellTransfer = $(
					'#main tbody :nth-child(16) :nth-child(6)'
				)?.innerText;

				dataJson.sgdBuyCast = $(
					'#main tbody :nth-child(17) :nth-child(3)'
				)?.innerText;
				dataJson.sgdBuyTransfer = $(
					'#main tbody :nth-child(17) :nth-child(4)'
				)?.innerText;
				dataJson.sgdSellCast = $(
					'#main tbody :nth-child(17) :nth-child(5)'
				)?.innerText;
				dataJson.sgdSellTransfer = $(
					'#main tbody :nth-child(17) :nth-child(6)'
				)?.innerText;

				dataJson.thbBuyCast = $(
					'#main tbody :nth-child(18) :nth-child(3)'
				)?.innerText;
				dataJson.thbBuyTransfer = $(
					'#main tbody :nth-child(18) :nth-child(4)'
				)?.innerText;
				dataJson.thbSellCast = $(
					'#main tbody :nth-child(18) :nth-child(5)'
				)?.innerText;
				dataJson.thbSellTransfer = $(
					'#main tbody :nth-child(18) :nth-child(6)'
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(mbbankData);

		Mbbank.findOneAndUpdate(
			{ symbol: mbbankData.symbol },
			{
				name: mbbankData.name,
				symbol: mbbankData.symbol,
				timeUpdate: mbbankData.timeUpdate,

				usdBuyCast: mbbankData.usdBuyCast,
				usdBuyTransfer: mbbankData.usdBuyTransfer,
				usdSellCast: mbbankData.usdSellCast,
				usdSellTransfer: mbbankData.usdSellTransfer,

				eurBuyCast: mbbankData.eurBuyCast,
				eurBuyTransfer: mbbankData.eurBuyTransfer,
				eurSellCast: mbbankData.eurSellCast,
				eurSellTransfer: mbbankData.eurSellTransfer,

				gbpBuyCast: mbbankData.gbpBuyCast,
				gbpBuyTransfer: mbbankData.gbpBuyTransfer,
				gbpSellCast: mbbankData.gbpSellCast,
				gbpSellTransfer: mbbankData.gbpSellTransfer,

				jpyBuyCast: mbbankData.jpyBuyCast,
				jpyBuyTransfer: mbbankData.jpyBuyTransfer,
				jpySellCast: mbbankData.jpySellCast,
				jpySellTransfer: mbbankData.jpySellTransfer,

				hkdBuyCast: mbbankData.hkdBuyCast,
				hkdBuyTransfer: mbbankData.hkdBuyTransfer,
				hkdSellCast: mbbankData.hkdSellCast,
				hkdSellTransfer: mbbankData.hkdSellTransfer,

				cnyBuyCast: mbbankData.cnyBuyCast,
				cnyBuyTransfer: mbbankData.cnyBuyTransfer,
				cnySellCast: mbbankData.cnySellCast,
				cnySellTransfer: mbbankData.cnySellTransfer,

				audBuyCast: mbbankData.audBuyCast,
				audBuyTransfer: mbbankData.audBuyTransfer,
				audSellCast: mbbankData.audSellCast,
				audSellTransfer: mbbankData.audSellTransfer,

				nzdBuyCast: mbbankData.nzdBuyCast,
				nzdBuyTransfer: mbbankData.nzdBuyTransfer,
				nzdSellCast: mbbankData.nzdSellCast,
				nzdSellTransfer: mbbankData.nzdSellTransfer,

				cadBuyCast: mbbankData.cadBuyCast,
				cadBuyTransfer: mbbankData.cadBuyTransfer,
				cadSellCast: mbbankData.cadSellCast,
				cadSellTransfer: mbbankData.cadSellTransfer,

				sgdBuyCast: mbbankData.sgdBuyCast,
				sgdBuyTransfer: mbbankData.sgdBuyTransfer,
				sgdSellCast: mbbankData.sgdSellCast,
				sgdSellTransfer: mbbankData.sgdSellTransfer,

				thbBuyCast: mbbankData.thbBuyCast,
				thbBuyTransfer: mbbankData.thbBuyTransfer,
				thbSellCast: mbbankData.thbSellCast,
				thbSellTransfer: mbbankData.thbSellTransfer,

				chfBuyCast: mbbankData.chfBuyCast,
				chfBuyTransfer: mbbankData.chfBuyTransfer,
				chfSellCast: mbbankData.chfSellCast,
				chfSellTransfer: mbbankData.chfSellTransfer,

				krwBuyCast: mbbankData.krwBuyCast,
				krwBuyTransfer: mbbankData.krwBuyTransfer,
				krwSellCast: mbbankData.krwSellCast,
				krwSellTransfer: mbbankData.krwSellTransfer,

				lakBuyCast: mbbankData.lakBuyCast,
				lakBuyTransfer: mbbankData.lakBuyTransfer,
				lakSellCast: mbbankData.lakSellCast,
				lakSellTransfer: mbbankData.lakSellTransfer,

				khrBuyCast: mbbankData.khrBuyCast,
				khrBuyTransfer: mbbankData.khrBuyTransfer,
				khrSellCast: mbbankData.khrSellCast,
				khrSellTransfer: mbbankData.khrSellTransfer,

				sekBuyCast: mbbankData.sekBuyCast,
				sekBuyTransfer: mbbankData.sekBuyTransfer,
				sekSellCast: mbbankData.sekSellCast,
				sekSellTransfer: mbbankData.sekSellTransfer,
			},
			{ upsert: true }
		)
			// .then((doc) => console.log(doc))
			.catch((err) => console.log(mbbankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

module.exports = {
	crawlAbBank,
	crawlAgribank,
	crawlVietcombank,
	crawlBidv,
	crawlTechcombank,
	crawlVietinbank,
	crawlMbbank,
};
