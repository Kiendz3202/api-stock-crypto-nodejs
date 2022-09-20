const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const axios = require('axios');
const puppeteer = require('puppeteer');

const Sjc = require('../../model/gold/sjcModel');
const Pnj = require('../../model/gold/pnjModel');
const Doji = require('../../model/gold/dojiModel');
const PhuQuySjc = require('../../model/gold/phuquysjcModel');
const BaoTinMinhChau = require('../../model/gold/baoTinMinhchauModel');
const MiHong = require('../../model/gold/miHongModel');

const SjcChart = require('../../model/gold/sjcChartModel');

const urlSjc = 'https://sjc.com.vn/';
const urlPnj = 'https://www.pnj.com.vn/blog/gia-vang/?zone=';
const urlDoji = 'https://doji.vn/bang-gia-vang/';
const urlPhuQuySjc = 'http://gold.phuquy.com.vn/';
const ulrBaoTinMinhChau = 'https://btmc.vn/bieu-do-gia-vang.html?t=ngay';
const urlMiHong = 'https://www.mihong.vn/vi/gia-vang-trong-nuoc';

//only this function crawlSjc crawl data price of sjc and update both price and chart
const crawlSjc = asyncHandler(async () => {
	// cron.schedule('*/15 * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlSjc, { timeout: 0 });

		await page.waitForTimeout(2000);

		let sjcDetailData = await page.evaluate(async () => {
			// const delay = (m) => new Promise((r) => setTimeout(r, m));

			// document.querySelector(`span[data-value=${symbol}]`).click()

			// await delay(2000);

			let stocks = [];

			let dataJson = {};

			try {
				dataJson.name = 'SJC';

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

				dataJson.sjc1l10lBuy = document.querySelector(
					'#price1 table tbody :nth-child(4) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lSell = document.querySelector(
					'#price1 table tbody :nth-child(4) :nth-child(3)'
				)?.innerText;

				dataJson.sjc5cBuy = document.querySelector(
					'#price1 table tbody :nth-child(5) :nth-child(2)'
				)?.innerText;
				dataJson.sjc5cSell = document.querySelector(
					'#price1 table tbody :nth-child(5) :nth-child(3)'
				)?.innerText;

				dataJson.sjc2c1c5phanBuy = document.querySelector(
					'#price1 table tbody :nth-child(6) :nth-child(2)'
				)?.innerText;
				dataJson.sjc2c1c5phanSell = document.querySelector(
					'#price1 table tbody :nth-child(6) :nth-child(3)'
				)?.innerText;

				dataJson.nhansjc99_991chi2chi5chiBuy = document.querySelector(
					'#price1 table tbody :nth-child(7) :nth-child(2)'
				)?.innerText;
				dataJson.nhansjc99_991chi2chi5chiSell = document.querySelector(
					'#price1 table tbody :nth-child(7) :nth-child(3)'
				)?.innerText;

				dataJson.nhansjc99_99_0_5chiBuy = document.querySelector(
					'#price1 table tbody :nth-child(8) :nth-child(2)'
				)?.innerText;
				dataJson.nhansjc99_99_0_5chiSell = document.querySelector(
					'#price1 table tbody :nth-child(8) :nth-child(3)'
				)?.innerText;

				dataJson.nutrang99_99percentBuy = document.querySelector(
					'#price1 table tbody :nth-child(9) :nth-child(2)'
				)?.innerText;
				dataJson.nutrang99_99percentSell = document.querySelector(
					'#price1 table tbody :nth-child(9) :nth-child(3)'
				)?.innerText;

				dataJson.nutrang99percentBuy = document.querySelector(
					'#price1 table tbody :nth-child(10) :nth-child(2)'
				)?.innerText;
				dataJson.nutrang99percentSell = document.querySelector(
					'#price1 table tbody :nth-child(10) :nth-child(3)'
				)?.innerText;

				dataJson.nutrang75percentBuy = document.querySelector(
					'#price1 table tbody :nth-child(11) :nth-child(2)'
				)?.innerText;
				dataJson.nutrang75percentSell = document.querySelector(
					'#price1 table tbody :nth-child(11) :nth-child(3)'
				)?.innerText;

				dataJson.nutrang58_3percentBuy = document.querySelector(
					'#price1 table tbody :nth-child(12) :nth-child(2)'
				)?.innerText;
				dataJson.nutrang58_3percentSell = document.querySelector(
					'#price1 table tbody :nth-child(12) :nth-child(3)'
				)?.innerText;

				dataJson.nutrang41_7percentBuy = document.querySelector(
					'#price1 table tbody :nth-child(13) :nth-child(2)'
				)?.innerText;
				dataJson.nutrang41_7percentSell = document.querySelector(
					'#price1 table tbody :nth-child(13) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lHaNoiBuy = document.querySelector(
					'#price1 table tbody :nth-child(15) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lHaNoiSell = document.querySelector(
					'#price1 table tbody :nth-child(15) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lDaNangBuy = document.querySelector(
					'#price1 table tbody :nth-child(17) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lDaNangSell = document.querySelector(
					'#price1 table tbody :nth-child(17) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lNhaTrangBuy = document.querySelector(
					'#price1 table tbody :nth-child(19) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lNhaTrangSell = document.querySelector(
					'#price1 table tbody :nth-child(19) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lCaMauBuy = document.querySelector(
					'#price1 table tbody :nth-child(21) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lCaMauSell = document.querySelector(
					'#price1 table tbody :nth-child(21) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lHueBuy = document.querySelector(
					'#price1 table tbody :nth-child(23) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lHueSell = document.querySelector(
					'#price1 table tbody :nth-child(23) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lBinhPhuocBuy = document.querySelector(
					'#price1 table tbody :nth-child(25) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lBinhPhuocSell = document.querySelector(
					'#price1 table tbody :nth-child(25) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lBienHoaBuy = document.querySelector(
					'#price1 table tbody :nth-child(27) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lBienHoaSell = document.querySelector(
					'#price1 table tbody :nth-child(27) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lMienTayBuy = document.querySelector(
					'#price1 table tbody :nth-child(29) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lMienTaySell = document.querySelector(
					'#price1 table tbody :nth-child(29) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lQuangNgaiBuy = document.querySelector(
					'#price1 table tbody :nth-child(31) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lQuangNgaiSell = document.querySelector(
					'#price1 table tbody :nth-child(31) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lLongXuyenBuy = document.querySelector(
					'#price1 table tbody :nth-child(33) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lLongXuyenSell = document.querySelector(
					'#price1 table tbody :nth-child(33) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lBacLieuBuy = document.querySelector(
					'#price1 table tbody :nth-child(35) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lBacLieuSell = document.querySelector(
					'#price1 table tbody :nth-child(35) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lQuyNhonBuy = document.querySelector(
					'#price1 table tbody :nth-child(37) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lQuyNhonSell = document.querySelector(
					'#price1 table tbody :nth-child(37) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lPhanRangBuy = document.querySelector(
					'#price1 table tbody :nth-child(39) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lPhanRangSell = document.querySelector(
					'#price1 table tbody :nth-child(39) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lHaLongBuy = document.querySelector(
					'#price1 table tbody :nth-child(41) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lHaLongSell = document.querySelector(
					'#price1 table tbody :nth-child(41) :nth-child(3)'
				)?.innerText;

				dataJson.sjc1l10lQuangNamBuy = document.querySelector(
					'#price1 table tbody :nth-child(43) :nth-child(2)'
				)?.innerText;
				dataJson.sjc1l10lQuangNamSell = document.querySelector(
					'#price1 table tbody :nth-child(43) :nth-child(3)'
				)?.innerText;

				dataJson.currentTimestamp = Math.floor(Date.now() / 1000);
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(sjcDetailData)

		Sjc.findOneAndUpdate(
			{ name: sjcDetailData.name },
			{
				name: sjcDetailData.name,
				timeUpdate: sjcDetailData.timeUpdate,
				sjc1l10lBuy: sjcDetailData.sjc1l10lBuy,
				sjc5cBuy: sjcDetailData.sjc5cBuy,
				sjc2c1c5phanBuy: sjcDetailData.sjc2c1c5phanBuy,
				nhansjc99_991chi2chi5chiBuy:
					sjcDetailData.nhansjc99_991chi2chi5chiBuy,
				nhansjc99_99_0_5chiBuy: sjcDetailData.nhansjc99_99_0_5chiBuy,
				nutrang99_99percentBuy: sjcDetailData.nutrang99_99percentBuy,
				nutrang99percentBuy: sjcDetailData.nutrang99percentBuy,
				nutrang75percentBuy: sjcDetailData.nutrang75percentBuy,
				nutrang58_3percentBuy: sjcDetailData.nutrang58_3percentBuy,
				nutrang41_7percentBuy: sjcDetailData.nutrang41_7percentBuy,

				sjc1l10lSell: sjcDetailData.sjc1l10lSell,
				sjc5cSell: sjcDetailData.sjc5cSell,
				sjc2c1c5phanSell: sjcDetailData.sjc2c1c5phanSell,
				nhansjc99_991chi2chi5chiSell:
					sjcDetailData.nhansjc99_991chi2chi5chiSell,
				nhansjc99_99_0_5chiSell: sjcDetailData.nhansjc99_99_0_5chiSell,
				nutrang99_99percentSell: sjcDetailData.nutrang99_99percentSell,
				nutrang99percentSell: sjcDetailData.nutrang99percentSell,
				nutrang75percentSell: sjcDetailData.nutrang75percentSell,
				nutrang58_3percentSell: sjcDetailData.nutrang58_3percentSell,
				nutrang41_7percentSell: sjcDetailData.nutrang41_7percentSell,

				sjc1l10lHanoiBuy: sjcDetailData.sjc1l10lHanoiBuy,
				sjc1l10lHaNoiSell: sjcDetailData.sjc1l10lHaNoiSell,

				sjc1l10lDaNangBuy: sjcDetailData.sjc1l10lDaNangBuy,
				sjc1l10lDaNangSell: sjcDetailData.sjc1l10lDaNangSell,

				sjc1l10lNhatrangBuy: sjcDetailData.sjc1l10lNhatrangBuy,
				sjc1l10lNhatrangSell: sjcDetailData.sjc1l10lNhatrangSell,

				sjc1l10lCaMauBuy: sjcDetailData.sjc1l10lCaMauBuy,
				sjc1l10lCaMauSell: sjcDetailData.sjc1l10lCaMauSell,

				sjc1l10lHueBuy: sjcDetailData.sjc1l10lHueBuy,
				sjc1l10lHueSell: sjcDetailData.sjc1l10lHueSell,

				sjc1l10lBinhPhuocBuy: sjcDetailData.sjc1l10lBinhPhuocBuy,
				sjc1l10lBinhPhuocSell: sjcDetailData.sjc1l10lBinhPhuocSell,

				sjc1l10lBienHoaBuy: sjcDetailData.sjc1l10lBienHoaBuy,
				sjc1l10lBienHoaSell: sjcDetailData.sjc1l10lBienHoaSell,

				sjc1l10lMientayBuy: sjcDetailData.sjc1l10lMientayBuy,
				sjc1l10lMientaySell: sjcDetailData.sjc1l10lMientaySell,

				sjc1l10lQuangNgaiBuy: sjcDetailData.sjc1l10lQuangNgaiBuy,
				sjc1l10lQuangNgaiSell: sjcDetailData.sjc1l10lQuangNgaiSell,

				sjc1l10lLongXuyenBuy: sjcDetailData.sjc1l10lLongXuyenBuy,
				sjc1l10lLongXuyenSell: sjcDetailData.sjc1l10lLongXuyenSell,

				sjc1l10lBacLieuBuy: sjcDetailData.sjc1l10lBacLieuBuy,
				sjc1l10lBacLieuSell: sjcDetailData.sjc1l10lBacLieuSell,

				sjc1l10lQuyNhonBuy: sjcDetailData.sjc1l10lQuyNhonBuy,
				sjc1l10lQuyNhonSell: sjcDetailData.sjc1l10lQuyNhonSell,

				sjc1l10lPhanRangBuy: sjcDetailData.sjc1l10lPhanRangBuy,
				sjc1l10lPhanRangSell: sjcDetailData.sjc1l10lPhanRangSell,

				sjc1l10lHaLongBuy: sjcDetailData.sjc1l10lHaLongBuy,
				sjc1l10lHaLongSell: sjcDetailData.sjc1l10lHaLongSell,

				sjc1l10lQuangNamBuy: sjcDetailData.sjc1l10lQuangNamBuy,
				sjc1l10lQuangNamSell: sjcDetailData.sjc1l10lQuangNamSell,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(sjcDetailData.name));

		SjcChart.findOneAndUpdate(
			{ name: sjcDetailData.name },
			{
				$push: {
					t: sjcDetailData.currentTimestamp,
					buy: sjcDetailData.sjc1l10lBuy,
					sell: sjcDetailData.sjc1l10lSell,
				},
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(err));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// });
});

const crawlPnj = asyncHandler(async (localtionNumber, index) => {
	// cron.schedule('*/15 * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(`${urlPnj}${localtionNumber}`, { timeout: 0 });

		await page.waitForTimeout(2000);

		let pnjDetailData = await page.evaluate(
			async (localtionNumber, index) => {
				// const delay = (m) => new Promise((r) => setTimeout(r, m));

				// document.querySelector(`span[data-value=${symbol}]`).click()

				// await delay(2000);

				let stocks = [];

				let dataJson = {};

				try {
					dataJson.name = 'PNJ';
					dataJson.location = document.querySelector(
						`#select_gold_area :nth-child(${index})`
					)?.innerText;

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

					dataJson.vangmiengsjcBuy = document.querySelector(
						'#content-price :nth-child(1) :nth-child(2) span'
					)?.innerText;
					dataJson.vangmiengsjcSell = document.querySelector(
						'#content-price :nth-child(1) :nth-child(3) span'
					)?.innerText;

					dataJson.nhantronpnjBuy = document.querySelector(
						'#content-price :nth-child(2) :nth-child(2) span'
					)?.innerText;
					dataJson.nhantronpnjSell = document.querySelector(
						'#content-price :nth-child(2) :nth-child(3) span'
					)?.innerText;

					dataJson.vangkimbaoBuy = document.querySelector(
						'#content-price :nth-child(3) :nth-child(2) span'
					)?.innerText;
					dataJson.vangkimbaoSell = document.querySelector(
						'#content-price :nth-child(3) :nth-child(3) span'
					)?.innerText;

					dataJson.vangphucloctaiBuy = document.querySelector(
						'#content-price :nth-child(4) :nth-child(2) span'
					)?.innerText;
					dataJson.vangphucloctaiSell = document.querySelector(
						'#content-price :nth-child(4) :nth-child(3) span'
					)?.innerText;

					dataJson.vang24kBuy = document.querySelector(
						'#content-price :nth-child(5) :nth-child(2) span'
					)?.innerText;
					dataJson.vang24kSell = document.querySelector(
						'#content-price :nth-child(5) :nth-child(3) span'
					)?.innerText;

					dataJson.vang750Buy = document.querySelector(
						'#content-price :nth-child(6) :nth-child(2) span'
					)?.innerText;
					dataJson.vang750Sell = document.querySelector(
						'#content-price :nth-child(6) :nth-child(3) span'
					)?.innerText;

					dataJson.vang585Buy = document.querySelector(
						'#content-price :nth-child(7) :nth-child(2) span'
					)?.innerText;
					dataJson.vang585Sell = document.querySelector(
						'#content-price :nth-child(7) :nth-child(3) span'
					)?.innerText;

					dataJson.vang416Buy = document.querySelector(
						'#content-price :nth-child(8) :nth-child(2) span'
					)?.innerText;
					dataJson.vang416Sell = document.querySelector(
						'#content-price :nth-child(8) :nth-child(3) span'
					)?.innerText;

					dataJson.vangmiengpnjBuy = document.querySelector(
						'#content-price :nth-child(9) :nth-child(2) span'
					)?.innerText;
					dataJson.vangmiengpnjSell = document.querySelector(
						'#content-price :nth-child(9) :nth-child(3) span'
					)?.innerText;

					dataJson.vang916Buy = document.querySelector(
						'#content-price :nth-child(10) :nth-child(2) span'
					)?.innerText;
					dataJson.vang916Sell = document.querySelector(
						'#content-price :nth-child(10) :nth-child(3) span'
					)?.innerText;

					dataJson.vang680Buy = document.querySelector(
						'#content-price :nth-child(11) :nth-child(2) span'
					)?.innerText;
					dataJson.vang680Sell = document.querySelector(
						'#content-price :nth-child(11) :nth-child(3) span'
					)?.innerText;

					dataJson.vang650Buy = document.querySelector(
						'#content-price :nth-child(12) :nth-child(2) span'
					)?.innerText;
					dataJson.vang650Sell = document.querySelector(
						'#content-price :nth-child(12) :nth-child(3) span'
					)?.innerText;
				} catch (err) {
					console.log(err);
				}
				return dataJson;
			},
			localtionNumber,
			index
		);

		// console.log(pnjDetailData)

		Pnj.findOneAndUpdate(
			{ name: pnjDetailData.location },
			{
				name: pnjDetailData.name,
				location: pnjDetailData.location,
				timeUpdate: pnjDetailData.timeUpdate,
				vangmiengsjcBuy: pnjDetailData.vangmiengpnjBuy,
				nhantronpnjBuy: pnjDetailData.nhantronpnjBuy,
				vangkimbaoBuy: pnjDetailData.vangkimbaoBuy,
				vangphucloctaiBuy: pnjDetailData.vangphucloctaiBuy,
				vang24kBuy: pnjDetailData.vang24kBuy,
				vang750Buy: pnjDetailData.vang750Buy,
				vang585Buy: pnjDetailData.vang585Buy,
				vang416Buy: pnjDetailData.vang416Buy,
				vangmiengpnjBuy: pnjDetailData.vangmiengpnjBuy,
				vang916Buy: pnjDetailData.vang916Buy,
				vang680Buy: pnjDetailData.vang680Buy,
				vang650Buy: pnjDetailData.vang650Buy,

				vangmiengsjcSell: pnjDetailData.vangmiengpnjSell,
				nhantronpnjSell: pnjDetailData.nhantronpnjSell,
				vangkimbaoSell: pnjDetailData.vangkimbaoSell,
				vangphucloctaiSell: pnjDetailData.vangphucloctaiSell,
				vang24kSell: pnjDetailData.vang24kSell,
				vang750Sell: pnjDetailData.vang750Sell,
				vang585Sell: pnjDetailData.vang585Sell,
				vang416Sell: pnjDetailData.vang416Sell,
				vangmiengpnjSell: pnjDetailData.vangmiengpnjSell,
				vang916Sell: pnjDetailData.vang916Sell,
				vang680Sell: pnjDetailData.vang680Sell,
				vang650Sell: pnjDetailData.vang650Sell,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(pnjDetailData.name));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlDoji = asyncHandler(async (location) => {
	// cron.schedule('*/15 * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlDoji, { timeout: 0 });

		await page.waitForTimeout(2000);

		let dojiDetailData = await page.evaluate(async (localtion) => {
			// const delay = (m) => new Promise((r) => setTimeout(r, m));

			// document.querySelector(`span[data-value=${symbol}]`).click()

			// await delay(2000);

			let stocks = [];

			let dataJson = {};

			try {
				dataJson.name = 'DOJI';

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

				//-----Ha Noi----------
				const tableHN = document.querySelectorAll('._table')[1];
				dataJson.sjcHNBuy = tableHN.querySelector(
					'._content-tab ._buy :nth-child(2)'
				)?.innerText;
				dataJson.AVPLHNBuy = tableHN.querySelector(
					'._content-tab ._buy :nth-child(3)'
				)?.innerText;
				dataJson.nhanHTVHNBuy = tableHN.querySelector(
					'._content-tab ._buy :nth-child(4)'
				)?.innerText;
				dataJson.KTTKimGiapHNBuy = tableHN.querySelector(
					'._content-tab ._buy :nth-child(5)'
				)?.innerText;
				dataJson.phiSjcHNBuy = tableHN.querySelector(
					'._content-tab ._buy :nth-child(6)'
				)?.innerText;
				dataJson.nuTrang9999HNBuy = tableHN.querySelector(
					'._content-tab ._buy :nth-child(7)'
				)?.innerText;
				dataJson.nuTrang999HNBuy = tableHN.querySelector(
					'._content-tab ._buy :nth-child(8)'
				)?.innerText;
				dataJson.nuTrang99HNBuy = tableHN.querySelector(
					'._content-tab ._buy :nth-child(9)'
				)?.innerText;
				dataJson.nuTrang18kHNBuy = tableHN.querySelector(
					'._content-tab ._buy :nth-child(10)'
				)?.innerText;
				dataJson.nuTrang14kHNBuy = tableHN.querySelector(
					'._content-tab ._buy :nth-child(11)'
				)?.innerText;
				dataJson.nuTrang10kHNBuy = tableHN.querySelector(
					'._content-tab ._buy :nth-child(12)'
				)?.innerText;

				dataJson.sjcHNSell = tableHN.querySelector(
					'._content-tab ._Sell :nth-child(2)'
				)?.innerText;
				dataJson.AVPLHNSell = tableHN.querySelector(
					'._content-tab ._Sell :nth-child(3)'
				)?.innerText;
				dataJson.nhanHTVHNSell = tableHN.querySelector(
					'._content-tab ._Sell :nth-child(4)'
				)?.innerText;
				dataJson.KTTKimGiapHNSell = tableHN.querySelector(
					'._content-tab ._Sell :nth-child(5)'
				)?.innerText;
				dataJson.phiSjcHNSell = tableHN.querySelector(
					'._content-tab ._Sell :nth-child(6)'
				)?.innerText;
				dataJson.nuTrang9999HNSell = tableHN.querySelector(
					'._content-tab ._Sell :nth-child(7)'
				)?.innerText;
				dataJson.nuTrang999HNSell = tableHN.querySelector(
					'._content-tab ._Sell :nth-child(8)'
				)?.innerText;
				dataJson.nuTrang99HNSell = tableHN.querySelector(
					'._content-tab ._Sell :nth-child(9)'
				)?.innerText;
				dataJson.nuTrang18kHNSell = tableHN.querySelector(
					'._content-tab ._Sell :nth-child(10)'
				)?.innerText;
				dataJson.nuTrang14kHNSell = tableHN.querySelector(
					'._content-tab ._Sell :nth-child(11)'
				)?.innerText;
				dataJson.nuTrang10kHNSell = tableHN.querySelector(
					'._content-tab ._Sell :nth-child(12)'
				)?.innerText;

				//--------Ho Chi Minh----------
				const tableHCM = document.querySelectorAll('._table')[2];
				dataJson.sjcHCMBuy = tableHCM.querySelector(
					'._content-tab ._buy :nth-child(2)'
				)?.innerText;
				dataJson.AVPLHCMBuy = tableHCM.querySelector(
					'._content-tab ._buy :nth-child(3)'
				)?.innerText;
				dataJson.KNTKTTKimGiapHCMBuy = tableHCM.querySelector(
					'._content-tab ._buy :nth-child(4)'
				)?.innerText;
				dataJson.nhanHTVHCMBuy = tableHCM.querySelector(
					'._content-tab ._buy :nth-child(5)'
				)?.innerText;
				dataJson.nuTrang9999HCMBuy = tableHCM.querySelector(
					'._content-tab ._buy :nth-child(6)'
				)?.innerText;
				dataJson.nuTrang999HCMBuy = tableHCM.querySelector(
					'._content-tab ._buy :nth-child(7)'
				)?.innerText;
				dataJson.nuTrang99HCMBuy = tableHCM.querySelector(
					'._content-tab ._buy :nth-child(8)'
				)?.innerText;
				dataJson.nuTrang75HCMBuy = tableHCM.querySelector(
					'._content-tab ._buy :nth-child(9)'
				)?.innerText;

				dataJson.sjcHCMSell = tableHCM.querySelector(
					'._content-tab ._Sell :nth-child(2)'
				)?.innerText;
				dataJson.AVPLHCMSell = tableHCM.querySelector(
					'._content-tab ._Sell :nth-child(3)'
				)?.innerText;
				dataJson.KNTKTTKimGiapHCMSell = tableHCM.querySelector(
					'._content-tab ._Sell :nth-child(4)'
				)?.innerText;
				dataJson.nhanHTVHCMSell = tableHCM.querySelector(
					'._content-tab ._Sell :nth-child(5)'
				)?.innerText;
				dataJson.nuTrang9999HCMSell = tableHCM.querySelector(
					'._content-tab ._Sell :nth-child(6)'
				)?.innerText;
				dataJson.nuTrang999HCMSell = tableHCM.querySelector(
					'._content-tab ._Sell :nth-child(7)'
				)?.innerText;
				dataJson.nuTrang99HCMSell = tableHCM.querySelector(
					'._content-tab ._Sell :nth-child(8)'
				)?.innerText;
				dataJson.nuTrang75HCMSell = tableHCM.querySelector(
					'._content-tab ._Sell :nth-child(9)'
				)?.innerText;

				//--------Da Nang--------------
				const tableDN = document.querySelectorAll('._table')[3];
				dataJson.sjcDNBuy = tableDN.querySelector(
					'._content-tab ._buy :nth-child(2)'
				)?.innerText;
				dataJson.AVPLDNBuy = tableDN.querySelector(
					'._content-tab ._buy :nth-child(3)'
				)?.innerText;
				dataJson.KNTKTTKimGiapDNBuy = tableDN.querySelector(
					'._content-tab ._buy :nth-child(4)'
				)?.innerText;
				dataJson.nhanHTVDNBuy = tableDN.querySelector(
					'._content-tab ._buy :nth-child(5)'
				)?.innerText;
				dataJson.nuTrang9999DNBuy = tableDN.querySelector(
					'._content-tab ._buy :nth-child(6)'
				)?.innerText;
				dataJson.nuTrang75DNBuy = tableDN.querySelector(
					'._content-tab ._buy :nth-child(7)'
				)?.innerText;
				dataJson.nuTrang68DNBuy = tableDN.querySelector(
					'._content-tab ._buy :nth-child(8)'
				)?.innerText;
				dataJson.nuTrang58_3DNBuy = tableDN.querySelector(
					'._content-tab ._buy :nth-child(9)'
				)?.innerText;

				dataJson.sjcDNSell = tableDN.querySelector(
					'._content-tab ._Sell :nth-child(2)'
				)?.innerText;
				dataJson.AVPLDNSell = tableDN.querySelector(
					'._content-tab ._Sell :nth-child(3)'
				)?.innerText;
				dataJson.KNTKTTKimGiapDNSell = tableDN.querySelector(
					'._content-tab ._Sell :nth-child(4)'
				)?.innerText;
				dataJson.nhanHTVDNSell = tableDN.querySelector(
					'._content-tab ._Sell :nth-child(5)'
				)?.innerText;
				dataJson.nuTrang9999DNSell = tableDN.querySelector(
					'._content-tab ._Sell :nth-child(6)'
				)?.innerText;
				dataJson.nuTrang75DNSell = tableDN.querySelector(
					'._content-tab ._Sell :nth-child(7)'
				)?.innerText;
				dataJson.nuTrang68DNSell = tableDN.querySelector(
					'._content-tab ._Sell :nth-child(8)'
				)?.innerText;
				dataJson.nuTrang58_3DNSell = tableDN.querySelector(
					'._content-tab ._Sell :nth-child(9)'
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		}, location);

		// console.log(dojiDetailData)

		Doji.findOneAndUpdate(
			{ name: dojiDetailData.name },
			{
				name: dojiDetailData.name,
				timeUpdate: dojiDetailData.timeUpdate,
				sjcHNBuy: dojiDetailData.sjcHNBuy,
				sjcHNSell: dojiDetailData.sjcHNSell,
				AVPLHNBuy: dojiDetailData.AVPLHNBuy,
				AVPLHNSell: dojiDetailData.AVPLHNSell,
				nhanHTVHNBuy: dojiDetailData.nhanHTVHNBuy,
				nhanHTVHNSell: dojiDetailData.nhanHTVHNSell,
				KTTKimGiapHNBuy: dojiDetailData.KTTKimGiapHNBuy,
				KTTKimGiapHNSell: dojiDetailData.KTTKimGiapHNSell,
				phiSjcHNBuy: dojiDetailData.phiSjcHNBuy,
				phiSjcHNSell: dojiDetailData.phiSjcHNSell,
				nuTrang9999HNBuy: dojiDetailData.nuTrang9999HNBuy,
				nuTrang9999HNSell: dojiDetailData.nuTrang9999HNSell,
				nuTrang999HNBuy: dojiDetailData.nuTrang999HNBuy,
				nuTrang999HNSell: dojiDetailData.nuTrang999HNSell,
				nuTrang99HNBuy: dojiDetailData.nuTrang99HNBuy,
				nuTrang99HNSell: dojiDetailData.nuTrang99HNSell,
				nuTrang18kHNBuy: dojiDetailData.nuTrang18kHNBuy,
				nuTrang18kHNSell: dojiDetailData.nuTrang18kHNSell,
				nuTrang14kHNBuy: dojiDetailData.nuTrang14kHNBuy,
				nuTrang14kHNSell: dojiDetailData.nuTrang14kHNSell,
				nuTrang10kHNBuy: dojiDetailData.nuTrang10kHNBuy,
				nuTrang10kHNSell: dojiDetailData.nuTrang10kHNSell,

				sjcHCMBuy: dojiDetailData.sjcHCMBuy,
				sjcHCMSell: dojiDetailData.sjcHCMSell,
				AVPLHCMBuy: dojiDetailData.AVPLHCMBuy,
				AVPLHCMSell: dojiDetailData.AVPLHCMSell,
				KNTKTTKimGiapHCMBuy: dojiDetailData.KNTKTTKimGiapHCMBuy,
				KNTKTTKimGiapHCMSell: dojiDetailData.KNTKTTKimGiapHCMSell,
				nhanHTVHCMBuy: dojiDetailData.nhanHTVHCMBuy,
				nhanHTVHCMSell: dojiDetailData.nhanHTVHCMSell,
				nuTrang9999HCMBuy: dojiDetailData.nuTrang9999HCMBuy,
				nuTrang9999HCMSell: dojiDetailData.nuTrang9999HCMSell,
				nuTrang999HCMBuy: dojiDetailData.nuTrang999HCMBuy,
				nuTrang999HCMSell: dojiDetailData.nuTrang999HCMSell,
				nuTrang99HCMBuy: dojiDetailData.nuTrang99HCMBuy,
				nuTrang99HCMSell: dojiDetailData.nuTrang99HCMSell,
				nuTrang75HCMBuy: dojiDetailData.nuTrang75HCMBuy,
				nuTrang75HCMSell: dojiDetailData.nuTrang75HCMSell,

				sjcDNBuy: dojiDetailData.sjcDNBuy,
				sjcDNSell: dojiDetailData.sjcDNSell,
				AVPLDNBuy: dojiDetailData.AVPLDNBuy,
				AVPLDNSell: dojiDetailData.AVPLDNSell,
				KNTKTTKimGiapDNBuy: dojiDetailData.KNTKTTKimGiapDNBuy,
				KNTKTTKimGiapDNSell: dojiDetailData.KNTKTTKimGiapDNSell,
				nhanHTVDNBuy: dojiDetailData.nhanHTVDNBuy,
				nhanHTVDNSell: dojiDetailData.nhanHTVDNSell,
				nuTrang9999DNBuy: dojiDetailData.nuTrang9999DNBuy,
				nuTrang9999DNSell: dojiDetailData.nuTrang9999DNSell,
				nuTrang75DNBuy: dojiDetailData.nuTrang75DNBuy,
				nuTrang75DNSell: dojiDetailData.nuTrang75DNSell,
				nuTrang68DNBuy: dojiDetailData.nuTrang68DNBuy,
				nuTrang68DNSell: dojiDetailData.nuTrang68DNSell,
				nuTrang58_3DNBuy: dojiDetailData.nuTrang58_3DNBuy,
				nuTrang58_3DNSell: dojiDetailData.nuTrang58_3DNSell,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(dojiDetailData.name));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlPhuQuySjc = asyncHandler(async () => {
	// cron.schedule('*/15 * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlPhuQuySjc, { timeout: 0 });

		await page.waitForTimeout(2000);

		let phuQuySjcDetailData = await page.evaluate(async () => {
			// const delay = (m) => new Promise((r) => setTimeout(r, m));

			// document.querySelector(`span[data-value=${symbol}]`).click()

			// await delay(2000);

			let stocks = [];

			let dataJson = {};

			try {
				dataJson.name = 'Phú Quý SJC';
				dataJson.location = 'Hà Nội';

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

				dataJson.sjcBuy = document.querySelector(
					'table tbody :nth-child(1) :nth-child(3)'
				)?.innerText;
				dataJson.sjcSell = document.querySelector(
					'table tbody :nth-child(1) :nth-child(4)'
				)?.innerText;

				dataJson.sjnBuy = document.querySelector(
					'table tbody :nth-child(2) :nth-child(3)'
				)?.innerText;
				dataJson.sjnSell = document.querySelector(
					'table tbody :nth-child(2) :nth-child(4)'
				)?.innerText;

				dataJson.npqBuy = document.querySelector(
					'table tbody :nth-child(3) :nth-child(3)'
				)?.innerText;
				dataJson.npqSell = document.querySelector(
					'table tbody :nth-child(3) :nth-child(4)'
				)?.innerText;

				dataJson.tpqBuy = document.querySelector(
					'table tbody :nth-child(4) :nth-child(3)'
				)?.innerText;
				dataJson.tpqSell = document.querySelector(
					'table tbody :nth-child(4) :nth-child(4)'
				)?.innerText;

				dataJson.cngBuy = document.querySelector(
					'table tbody :nth-child(5) :nth-child(3)'
				)?.innerText;
				dataJson.cngSell = document.querySelector(
					'table tbody :nth-child(5) :nth-child(4)'
				)?.innerText;

				dataJson.vang24kBuy = document.querySelector(
					'table tbody :nth-child(6) :nth-child(3)'
				)?.innerText;
				dataJson.vang24kSell = document.querySelector(
					'table tbody :nth-child(6) :nth-child(4)'
				)?.innerText;

				dataJson.vang999Buy = document.querySelector(
					'table tbody :nth-child(7) :nth-child(3)'
				)?.innerText;
				dataJson.vang999Sell = document.querySelector(
					'table tbody :nth-child(7) :nth-child(4)'
				)?.innerText;

				dataJson.vang099Buy = document.querySelector(
					'table tbody :nth-child(8) :nth-child(3)'
				)?.innerText;
				dataJson.vang099Sell = document.querySelector(
					'table tbody :nth-child(8) :nth-child(4)'
				)?.innerText;

				dataJson.v99Buy = document.querySelector(
					'table tbody :nth-child(10) :nth-child(3)'
				)?.innerText;
				dataJson.v99Sell = document.querySelector(
					'table tbody :nth-child(10) :nth-child(4)'
				)?.innerText;

				dataJson.v999Buy = document.querySelector(
					'table tbody :nth-child(11) :nth-child(3)'
				)?.innerText;
				dataJson.v999Sell = document.querySelector(
					'table tbody :nth-child(11) :nth-child(4)'
				)?.innerText;

				dataJson.v9999Buy = document.querySelector(
					'table tbody :nth-child(12) :nth-child(3)'
				)?.innerText;
				dataJson.v9999Sell = document.querySelector(
					'table tbody :nth-child(12) :nth-child(4)'
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(phuQuySjcDetailData)

		PhuQuySjc.findOneAndUpdate(
			{ name: phuQuySjcDetailData.name },
			{
				name: phuQuySjcDetailData.name,
				location: phuQuySjcDetailData.location,
				timeUpdate: phuQuySjcDetailData.timeUpdate,
				sjcBuy: phuQuySjcDetailData.sjcBuy,
				sjnBuy: phuQuySjcDetailData.sjnBuy,
				npqBuy: phuQuySjcDetailData.npqBuy,
				tpqBuy: phuQuySjcDetailData.tpqBuy,
				cngBuy: phuQuySjcDetailData.cngBuy,
				vang24kBuy: phuQuySjcDetailData.vang24kBuy,
				vang999Buy: phuQuySjcDetailData.vang999Buy,
				vang099Buy: phuQuySjcDetailData.vang099Buy,
				v99Buy: phuQuySjcDetailData.v99Buy,
				v999Buy: phuQuySjcDetailData.v999Buy,
				v9999Buy: phuQuySjcDetailData.v9999Buy,

				sjcSell: phuQuySjcDetailData.sjcSell,
				sjnSell: phuQuySjcDetailData.sjnSell,
				npqSell: phuQuySjcDetailData.npqSell,
				tpqSell: phuQuySjcDetailData.tpqSell,
				cngSell: phuQuySjcDetailData.cngSell,
				vang24kSell: phuQuySjcDetailData.vang24kSell,
				vang999Sell: phuQuySjcDetailData.vang999Sell,
				vang099Sell: phuQuySjcDetailData.vang099Sell,
				v99Sell: phuQuySjcDetailData.v99Sell,
				v999Sell: phuQuySjcDetailData.v999Sell,
				v9999Sell: phuQuySjcDetailData.v9999Sell,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(phuQuySjcDetailData.name));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlBaoTinMinhChau = asyncHandler(async () => {
	// cron.schedule('*/15 * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(ulrBaoTinMinhChau, { timeout: 0 });

		await page.waitForTimeout(2000);

		let baoTinMinhChauDetailData = await page.evaluate(async () => {
			// const delay = (m) => new Promise((r) => setTimeout(r, m));

			// document.querySelector(`span[data-value=${symbol}]`).click()

			// await delay(2000);

			let stocks = [];

			let dataJson = {};

			try {
				dataJson.name = 'Bảo Tín Minh Châu';
				dataJson.location = 'Hà Nội';

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

				dataJson.vangMiengVRTLBuy = document.querySelector(
					'table tbody :nth-child(2) :nth-child(4) b '
				)?.innerText;
				dataJson.vangMiengVRTLSell = document.querySelector(
					'table tbody :nth-child(2) :nth-child(5) b '
				)?.innerText;

				dataJson.nhanTronTronBuy = document.querySelector(
					'table tbody :nth-child(3) :nth-child(3) b '
				)?.innerText;
				dataJson.nhanTronTronSell = document.querySelector(
					'table tbody :nth-child(3) :nth-child(4) b '
				)?.innerText;

				dataJson.quaMungBanViVangBuy = document.querySelector(
					'table tbody :nth-child(4) :nth-child(4) b '
				)?.innerText;
				dataJson.quaMungBanViVangSell = document.querySelector(
					'table tbody :nth-child(4) :nth-child(5) b '
				)?.innerText;

				dataJson.vangMiengSjcBuy = document.querySelector(
					'table tbody :nth-child(5) :nth-child(4) b '
				)?.innerText;
				dataJson.vangMiengSjcSell = document.querySelector(
					'table tbody :nth-child(5) :nth-child(5) b '
				)?.innerText;

				dataJson.trangSucBangVangRongThangLong9999Buy =
					document.querySelector(
						'table tbody :nth-child(6) :nth-child(4) b '
					)?.innerText;
				dataJson.trangSucBangVangRongThangLong9999Sell =
					document.querySelector(
						'table tbody :nth-child(6) :nth-child(5) b '
					)?.innerText;

				dataJson.trangSucBangVangRongThangLong999Buy =
					document.querySelector(
						'table tbody :nth-child(7) :nth-child(3) b '
					)?.innerText;
				dataJson.trangSucBangVangRongThangLong999Sell =
					document.querySelector(
						'table tbody :nth-child(7) :nth-child(4) b '
					)?.innerText;

				dataJson.vangHTBTBuy = document.querySelector(
					'table tbody :nth-child(8) :nth-child(4) b '
				)?.innerText;
				// dataJson.vangHTBTSell = document.querySelector('table tbody :nth-child(8) :nth-child(5) b ')?.innerText

				dataJson.vangNguyenLieuBuy = document.querySelector(
					'table tbody :nth-child(9) :nth-child(4) b '
				)?.innerText;
				// dataJson.vangNguyenLieuSell = document.querySelector('table tbody :nth-child(9) :nth-child(5) b ')?.innerText
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(baoTinMinhChauDetailData)

		BaoTinMinhChau.findOneAndUpdate(
			{ name: baoTinMinhChauDetailData.name },
			{
				name: baoTinMinhChauDetailData.name,
				location: baoTinMinhChauDetailData.location,
				timeUpdate: baoTinMinhChauDetailData.timeUpdate,
				'vangRongThangLong.vangMiengVRTLBuy':
					baoTinMinhChauDetailData.vangMiengVRTLBuy,
				'vangRongThangLong.vangMiengVRTLSell':
					baoTinMinhChauDetailData.vangMiengVRTLSell,
				'vangRongThangLong.nhanTronTronBuy':
					baoTinMinhChauDetailData.nhanTronTronBuy,
				'vangRongThangLong.nhanTronTronSell':
					baoTinMinhChauDetailData.nhanTronTronSell,

				'quaMungVang.quaMungBanViVangBuy':
					baoTinMinhChauDetailData.quaMungBanViVangBuy,
				'quaMungVang.quaMungBanViVangSell':
					baoTinMinhChauDetailData.quaMungBanViVangSell,

				'vangSjc.vangMiengSjcBuy':
					baoTinMinhChauDetailData.vangMiengSjcBuy,
				'vangSjc.vangMiengSjcSell':
					baoTinMinhChauDetailData.vangMiengSjcSell,

				'vangBTMC.trangSucBangVangRongThangLong9999Buy':
					baoTinMinhChauDetailData.trangSucBangVangRongThangLong9999Buy,
				'vangBTMC.trangSucBangVangRongThangLong9999Sell':
					baoTinMinhChauDetailData.trangSucBangVangRongThangLong9999Sell,
				'vangBTMC.trangSucBangVangRongThangLong999Buy':
					baoTinMinhChauDetailData.trangSucBangVangRongThangLong999Buy,
				'vangBTMC.trangSucBangVangRongThangLong999Sell':
					baoTinMinhChauDetailData.trangSucBangVangRongThangLong999Sell,

				'vangHTBT.vangHTBTBuy': baoTinMinhChauDetailData.vangHTBTBuy,
				'vangThiTruong.vangNguyenLieuBuy':
					baoTinMinhChauDetailData.vangNguyenLieuBuy,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(baoTinMinhChauDetailData.name));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlMiHong = asyncHandler(async () => {
	// cron.schedule('*/15 * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		// await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")
		await page.goto(urlMiHong, { timeout: 0 });
		// await page.select('#select_gold_area', localtionNumber)
		await page.waitForTimeout(2000);

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
		// await page.waitForTimeout(2000);

		let miHongDetailData = await page.evaluate(async () => {
			// const delay = (m) => new Promise((r) => setTimeout(r, m));

			// document.querySelector(`span[data-value=${symbol}]`).click()

			// await delay(2000);

			let stocks = [];

			let dataJson = {};

			try {
				dataJson.name = 'Mi Hồng';
				dataJson.location = 'Hồ Chí Minh';

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

				dataJson.sjcBuy = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(1) :nth-child(3) span '
				)?.innerText;
				dataJson.sjcSell = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(1) :nth-child(4) span '
				)?.innerText;

				dataJson.vang999Buy = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(1) :nth-child(7) span '
				)?.innerText;
				dataJson.vang999Sell = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(1) :nth-child(8) span '
				)?.innerText;

				dataJson.vang985Buy = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(2) :nth-child(3) span '
				)?.innerText;
				dataJson.vang985Sell = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(2) :nth-child(4) span '
				)?.innerText;

				dataJson.vang980Buy = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(2) :nth-child(7) span '
				)?.innerText;
				dataJson.vang980Sell = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(2) :nth-child(8) span '
				)?.innerText;

				dataJson.vang950Buy = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(3) :nth-child(3) span '
				)?.innerText;
				dataJson.vang950Sell = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(3) :nth-child(4) span '
				)?.innerText;

				dataJson.vang750Buy = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(3) :nth-child(7) span '
				)?.innerText;
				dataJson.vang750Sell = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(3) :nth-child(8) span '
				)?.innerText;

				dataJson.vang680Buy = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(4) :nth-child(3) span '
				)?.innerText;
				dataJson.vang680Sell = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(4) :nth-child(4) span '
				)?.innerText;

				dataJson.vang610Buy = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(4) :nth-child(7) span '
				)?.innerText;
				dataJson.vang610Sell = document.querySelector(
					'#tblCurrentPrice tbody :nth-child(4) :nth-child(8) span '
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		console.log(miHongDetailData);

		MiHong.findOneAndUpdate(
			{ name: miHongDetailData.name },
			{
				name: miHongDetailData.name,
				location: miHongDetailData.location,
				timeUpdate: miHongDetailData.timeUpdate,

				sjcBuy: miHongDetailData.sjcBuy,
				vang999Buy: miHongDetailData.vang999Buy,
				vang985Buy: miHongDetailData.vang985Buy,
				vang980Buy: miHongDetailData.vang980Buy,
				vang950Buy: miHongDetailData.vang950Buy,
				vang750Buy: miHongDetailData.vang750Buy,
				vang680Buy: miHongDetailData.vang680Buy,
				vang610Buy: miHongDetailData.vang610Buy,

				sjcSell: miHongDetailData.sjcSell,
				vang999Sell: miHongDetailData.vang999Sell,
				vang985Sell: miHongDetailData.vang985Sell,
				vang980Sell: miHongDetailData.vang980Sell,
				vang950Sell: miHongDetailData.vang950Sell,
				vang750Sell: miHongDetailData.vang750Sell,
				vang680Sell: miHongDetailData.vang680Sell,
				vang610Sell: miHongDetailData.vang610Sell,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(miHongDetailData.name));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

module.exports = {
	crawlSjc,
	crawlPnj,
	crawlDoji,
	crawlPhuQuySjc,
	crawlBaoTinMinhChau,
	crawlMiHong,
};
