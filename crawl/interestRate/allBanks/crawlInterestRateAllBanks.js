const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const puppeteer = require('puppeteer');

const VietcombankInterestRate = require('../../../model/interestRate/vietcombankInterestRateModel');
const VietinbankInterestRate = require('../../../model/interestRate/vietinbankInterestRateModel');
const AgribankbankInterestRate = require('../../../model/interestRate/agribankInterestRateModel');
const BidvInterestRate = require('../../../model/interestRate/bidvInterestRateModel');
const ScbInterestRate = require('../../../model/interestRate/scbInterestRateModel');
const MbbankInterestRate = require('../../../model/interestRate/mbbankInterestRateModel');
const VibInterestRate = require('../../../model/interestRate/vibInterestRateModel');
const TpbankInterestRate = require('../../../model/interestRate/tpbankInterestRateModel');
const VpbankInterestRate = require('../../../model/interestRate/vpbankInterestRateModel');

const urlVietcombank =
	'https://portal.vietcombank.com.vn/Personal/lai-suat/Pages/lai-suat.aspx?devicechannel=default';
const urlVietinbank = 'https://www.vietinbank.vn/web/home/vn/lai-suat';
const urlAgribank = 'https://www.agribank.com.vn/vn/lai-suat';
const urlBidv = 'https://www.bidv.com.vn/vn/tra-cuu-lai-suat';
const urlScb = 'https://www.scb.com.vn/vie/lai-suat';
const urlMbbank = 'https://mbbank.com.vn/Fee#/card-info1';
const urlVib =
	'https://www.vib.com.vn/vn/tiet-kiem/bieu-lai-suat-tiet-kiem-tai-quay';

const urlTpbank = 'https://webgia.com/lai-suat/tpbank/';
const urlVpbank = 'https://webgia.com/lai-suat/vpbank/';

const crawlVietcombankInterestRate = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlVietcombank, { timeout: 0 });

		await page.waitForTimeout(2000);

		let vietcombankData = await page.evaluate(async () => {
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

				dataJson.khongkyhan = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(3) :nth-child(2)'
				)?.innerText;
				dataJson.day7 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(4) :nth-child(2)'
				)?.innerText;
				dataJson.day14 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(5) :nth-child(2)'
				)?.innerText;
				dataJson.month1 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(6) :nth-child(2)'
				)?.innerText;
				dataJson.month2 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(7) :nth-child(2)'
				)?.innerText;
				dataJson.month3 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(8) :nth-child(2)'
				)?.innerText;
				dataJson.month6 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(9) :nth-child(2)'
				)?.innerText;
				dataJson.month9 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(10) :nth-child(2)'
				)?.innerText;
				dataJson.month12 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(11) :nth-child(2)'
				)?.innerText;
				dataJson.month24 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(12) :nth-child(2)'
				)?.innerText;
				dataJson.month36 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(13) :nth-child(2)'
				)?.innerText;
				dataJson.month48 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(14) :nth-child(2)'
				)?.innerText;
				dataJson.month60 = document.querySelector(
					'#danhsachlaisuat tbody :nth-child(15) :nth-child(2)'
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(vietcombankData);

		VietcombankInterestRate.findOneAndUpdate(
			{ symbol: vietcombankData.symbol },
			{
				name: vietcombankData.name,
				symbol: vietcombankData.symbol,
				timeUpdate: vietcombankData.timeUpdate,
				khongkyhan: vietcombankData.khongkyhan,
				day7: vietcombankData.day7,
				day14: vietcombankData.day14,
				month1: vietcombankData.month1,
				month2: vietcombankData.month2,
				month3: vietcombankData.month3,
				month6: vietcombankData.month6,
				month9: vietcombankData.month9,
				month12: vietcombankData.month12,
				month24: vietcombankData.month24,
				month36: vietcombankData.month36,
				month48: vietcombankData.month48,
				month60: vietcombankData.month60,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(vietcombankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlVietinbankInterestRate = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlVietinbank, { timeout: 0 });

		await page.waitForTimeout(2000);

		let vietinbankData = await page.evaluate(async () => {
			let dataJson = {};

			try {
				dataJson.name =
					'Ngân hàng Thương mại cổ phần Công Thương Việt Nam';
				dataJson.symbol = 'Vietinbank';

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

				dataJson.khongkyhan =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(4) :nth-child(2) '
					)?.innerText + '%';
				dataJson.khongkyhanBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(4) :nth-child(5) '
					)?.innerText + '%';

				dataJson.under1month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(5) :nth-child(2) '
					)?.innerText + '%';
				dataJson.under1monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(5) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from1to2month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(6) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from1to2monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(6) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from2to3month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(7) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from2to3monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(7) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from3to4month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(8) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from3to4monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(8) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from4to5month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(9) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from4to5monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(9) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from5to6month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(10) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from5to6monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(10) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from6to7month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(11) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from6to7monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(11) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from7to8month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(12) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from7to8monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(12) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from8to9month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(13) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from8to9monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(13) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from9to10month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(14) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from9to10monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(14) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from10to11month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(15) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from10to11monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(15) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from11to12month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(16) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from11to12monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(16) :nth-child(5) '
					)?.innerText + '%';

				dataJson.month12 =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(17) :nth-child(2) '
					)?.innerText + '%';
				dataJson.month12Business =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(17) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from12to18month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(18) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from12to18monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(18) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from18to24month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(19) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from18to24monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(19) :nth-child(5) '
					)?.innerText + '%';

				dataJson.from24to36month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(20) :nth-child(2) '
					)?.innerText + '%';
				dataJson.from24to36monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(20) :nth-child(5) '
					)?.innerText + '%';

				dataJson.month36 =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(21) :nth-child(2) '
					)?.innerText + '%';
				dataJson.month36Business =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(21) :nth-child(5) '
					)?.innerText + '%';

				dataJson.upper36month =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(22) :nth-child(2) '
					)?.innerText + '%';
				dataJson.upper36monthBusiness =
					document.querySelector(
						'#hor-ex-b tbody :nth-child(22) :nth-child(5) '
					)?.innerText + '%';
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(vietinbankData);

		VietinbankInterestRate.findOneAndUpdate(
			{ symbol: vietinbankData.symbol },
			{
				name: vietinbankData.name,
				symbol: vietinbankData.symbol,
				timeUpdate: vietinbankData.timeUpdate,
				khongkyhan: vietinbankData.khongkyhan,
				under1month: vietinbankData.under1month,
				from1to2month: vietinbankData.from1to2month,
				from2to3month: vietinbankData.from2to3month,
				from3to4month: vietinbankData.from3to4month,
				from4to5month: vietinbankData.from4to5month,
				from5to6month: vietinbankData.from5to6month,
				from6to7month: vietinbankData.from6to7month,
				from7to8month: vietinbankData.from7to8month,
				from8to9month: vietinbankData.from8to9month,
				from9to10month: vietinbankData.from9to10month,
				from10to11month: vietinbankData.from10to11month,
				from11to12month: vietinbankData.from11to12month,
				month12: vietinbankData.month12,
				from12to18month: vietinbankData.from12to18month,
				from18to24month: vietinbankData.from18to24month,
				from24to36month: vietinbankData.from24to36month,
				month36: vietinbankData.month36,
				upper36month: vietinbankData.upper36month,

				khongkyhanBusiness: vietinbankData.khongkyhanBusiness,
				under1monthBusiness: vietinbankData.under1monthBusiness,
				from1to2monthBusiness: vietinbankData.from1to2monthBusiness,
				from2to3monthBusiness: vietinbankData.from2to3monthBusiness,
				from3to4monthBusiness: vietinbankData.from3to4monthBusiness,
				from4to5monthBusiness: vietinbankData.from4to5monthBusiness,
				from5to6monthBusiness: vietinbankData.from5to6monthBusiness,
				from6to7monthBusiness: vietinbankData.from6to7monthBusiness,
				from7to8monthBusiness: vietinbankData.from7to8monthBusiness,
				from8to9monthBusiness: vietinbankData.from8to9monthBusiness,
				from9to10monthBusiness: vietinbankData.from9to10monthBusiness,
				from10to11monthBusiness: vietinbankData.from10to11monthBusiness,
				from11to12monthBusiness: vietinbankData.from11to12monthBusiness,
				month12Business: vietinbankData.month12Business,
				from12to18monthBusiness: vietinbankData.from12to18monthBusiness,
				from18to24monthBusiness: vietinbankData.from18to24monthBusiness,
				from24to36monthBusiness: vietinbankData.from24to36monthBusiness,
				month36Business: vietinbankData.month36Business,
				upper36monthBusiness: vietinbankData.upper36monthBusiness,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(vietinbankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlAgribankbankInterestRate = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlAgribank, { timeout: 0 });

		await page.waitForTimeout(2000);

		let agribankbankData = await page.evaluate(async () => {
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

				const table1Element = document.querySelectorAll('table')[0];
				const table2Element = document.querySelectorAll('table')[1];

				dataJson.khongkyhanPersonal = table1Element.querySelector(
					' tbody :nth-child(1) :nth-child(2)'
				)?.innerText;
				dataJson.month1Personal = table1Element.querySelector(
					' tbody :nth-child(2) :nth-child(2)'
				)?.innerText;
				dataJson.month2Personal = table1Element.querySelector(
					' tbody :nth-child(3) :nth-child(2)'
				)?.innerText;
				dataJson.month3Personal = table1Element.querySelector(
					' tbody :nth-child(4) :nth-child(2)'
				)?.innerText;
				dataJson.month4Personal = table1Element.querySelector(
					' tbody :nth-child(5) :nth-child(2)'
				)?.innerText;
				dataJson.month5Personal = table1Element.querySelector(
					' tbody :nth-child(6) :nth-child(2)'
				)?.innerText;
				dataJson.month6Personal = table1Element.querySelector(
					' tbody :nth-child(7) :nth-child(2)'
				)?.innerText;
				dataJson.month7Personal = table1Element.querySelector(
					' tbody :nth-child(8) :nth-child(2)'
				)?.innerText;
				dataJson.month8Personal = table1Element.querySelector(
					' tbody :nth-child(9) :nth-child(2)'
				)?.innerText;
				dataJson.month9Personal = table1Element.querySelector(
					' tbody :nth-child(10) :nth-child(2)'
				)?.innerText;
				dataJson.month10Personal = table1Element.querySelector(
					' tbody :nth-child(11) :nth-child(2)'
				)?.innerText;
				dataJson.month11Personal = table1Element.querySelector(
					' tbody :nth-child(12) :nth-child(2)'
				)?.innerText;
				dataJson.month12Personal = table1Element.querySelector(
					' tbody :nth-child(13) :nth-child(2)'
				)?.innerText;
				dataJson.month13Personal = table1Element.querySelector(
					' tbody :nth-child(14) :nth-child(2)'
				)?.innerText;
				dataJson.month15Personal = table1Element.querySelector(
					' tbody :nth-child(15) :nth-child(2)'
				)?.innerText;
				dataJson.month18Personal = table1Element.querySelector(
					' tbody :nth-child(16) :nth-child(2)'
				)?.innerText;
				dataJson.month24Personal = table1Element.querySelector(
					' tbody :nth-child(17) :nth-child(2)'
				)?.innerText;
				dataJson.checkableDepositsPersonal =
					table1Element.querySelector(
						' tbody :nth-child(18) :nth-child(2)'
					)?.innerText;

				dataJson.khongkyhanBusiness = table2Element.querySelector(
					' tbody :nth-child(1) :nth-child(2)'
				)?.innerText;
				dataJson.month1Business = table2Element.querySelector(
					' tbody :nth-child(2) :nth-child(2)'
				)?.innerText;
				dataJson.month2Business = table2Element.querySelector(
					' tbody :nth-child(3) :nth-child(2)'
				)?.innerText;
				dataJson.month3Business = table2Element.querySelector(
					' tbody :nth-child(4) :nth-child(2)'
				)?.innerText;
				dataJson.month4Business = table2Element.querySelector(
					' tbody :nth-child(5) :nth-child(2)'
				)?.innerText;
				dataJson.month5Business = table2Element.querySelector(
					' tbody :nth-child(6) :nth-child(2)'
				)?.innerText;
				dataJson.month6Business = table2Element.querySelector(
					' tbody :nth-child(7) :nth-child(2)'
				)?.innerText;
				dataJson.month7Business = table2Element.querySelector(
					' tbody :nth-child(8) :nth-child(2)'
				)?.innerText;
				dataJson.month8Business = table2Element.querySelector(
					' tbody :nth-child(9) :nth-child(2)'
				)?.innerText;
				dataJson.month9Business = table2Element.querySelector(
					' tbody :nth-child(10) :nth-child(2)'
				)?.innerText;
				dataJson.month10Business = table2Element.querySelector(
					' tbody :nth-child(11) :nth-child(2)'
				)?.innerText;
				dataJson.month11Business = table2Element.querySelector(
					' tbody :nth-child(12) :nth-child(2)'
				)?.innerText;
				dataJson.month12Business = table2Element.querySelector(
					' tbody :nth-child(13) :nth-child(2)'
				)?.innerText;
				dataJson.month13Business = table2Element.querySelector(
					' tbody :nth-child(14) :nth-child(2)'
				)?.innerText;
				dataJson.month15Business = table2Element.querySelector(
					' tbody :nth-child(15) :nth-child(2)'
				)?.innerText;
				dataJson.month18Business = table2Element.querySelector(
					' tbody :nth-child(16) :nth-child(2)'
				)?.innerText;
				dataJson.month24Business = table2Element.querySelector(
					' tbody :nth-child(17) :nth-child(2)'
				)?.innerText;
				dataJson.checkableDepositsBusiness =
					table2Element.querySelector(
						' tbody :nth-child(18) :nth-child(2)'
					)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(agribankbankData);

		AgribankbankInterestRate.findOneAndUpdate(
			{ symbol: agribankbankData.symbol },
			{
				name: agribankbankData.name,
				symbol: agribankbankData.symbol,
				timeUpdate: agribankbankData.timeUpdate,
				khongkyhanPersonal: agribankbankData.khongkyhanPersonal,
				month1Personal: agribankbankData.month1Personal,
				month2Personal: agribankbankData.month2Personal,
				month3Personal: agribankbankData.month3Personal,
				month4Personal: agribankbankData.month4Personal,
				month5Personal: agribankbankData.month5Personal,
				month6Personal: agribankbankData.month6Personal,
				month7Personal: agribankbankData.month7Personal,
				month8Personal: agribankbankData.month8Personal,
				month9Personal: agribankbankData.month9Personal,
				month10Personal: agribankbankData.month10Personal,
				month11Personal: agribankbankData.month11Personal,
				month12Personal: agribankbankData.month12Personal,
				month13Personal: agribankbankData.month13Personal,
				month15Personal: agribankbankData.month15Personal,
				month18Personal: agribankbankData.month18Personal,
				month24Personal: agribankbankData.month24Personal,
				checkableDepositsPersonal:
					agribankbankData.checkableDepositsPersonal,

				khongkyhanBusiness: agribankbankData.khongkyhanBusiness,
				month1Business: agribankbankData.month1Business,
				month2Business: agribankbankData.month2Business,
				month3Business: agribankbankData.month3Business,
				month4Business: agribankbankData.month4Business,
				month5Business: agribankbankData.month5Business,
				month6Business: agribankbankData.month6Business,
				month7Business: agribankbankData.month7Business,
				month8Business: agribankbankData.month8Business,
				month9Business: agribankbankData.month9Business,
				month10Business: agribankbankData.month10Business,
				month11Business: agribankbankData.month11Business,
				month12Business: agribankbankData.month12Business,
				month13Business: agribankbankData.month13Business,
				month15Business: agribankbankData.month15Business,
				month18Business: agribankbankData.month18Business,
				month24Business: agribankbankData.month24Business,
				checkableDepositsBusiness:
					agribankbankData.checkableDepositsBusiness,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(agribankbankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlBidvInterestRate = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlBidv, { timeout: 0 });

		await page.waitForTimeout(2000);

		let bidvbankData = await page.evaluate(async () => {
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

				dataJson.khongkyhan = document.querySelector(
					'#rates table tbody :nth-child(2) :nth-child(4) '
				)?.innerText;
				dataJson.month1 = document.querySelector(
					'#rates table tbody :nth-child(3) :nth-child(4) '
				)?.innerText;
				dataJson.month2 = document.querySelector(
					'#rates table tbody :nth-child(4) :nth-child(4) '
				)?.innerText;
				dataJson.month3 = document.querySelector(
					'#rates table tbody :nth-child(5) :nth-child(4) '
				)?.innerText;
				dataJson.month5 = document.querySelector(
					'#rates table tbody :nth-child(6) :nth-child(4) '
				)?.innerText;
				dataJson.month6 = document.querySelector(
					'#rates table tbody :nth-child(7) :nth-child(4) '
				)?.innerText;
				dataJson.month9 = document.querySelector(
					'#rates table tbody :nth-child(8) :nth-child(4) '
				)?.innerText;
				dataJson.month12 = document.querySelector(
					'#rates table tbody :nth-child(9) :nth-child(4) '
				)?.innerText;
				dataJson.month13 = document.querySelector(
					'#rates table tbody :nth-child(10) :nth-child(4) '
				)?.innerText;
				dataJson.month15 = document.querySelector(
					'#rates table tbody :nth-child(11) :nth-child(4) '
				)?.innerText;
				dataJson.month18 = document.querySelector(
					'#rates table tbody :nth-child(12) :nth-child(4) '
				)?.innerText;
				dataJson.month24 = document.querySelector(
					'#rates table tbody :nth-child(13) :nth-child(4) '
				)?.innerText;
				dataJson.month36 = document.querySelector(
					'#rates table tbody :nth-child(14) :nth-child(4) '
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(bidvbankData);

		BidvInterestRate.findOneAndUpdate(
			{ symbol: bidvbankData.symbol },
			{
				name: bidvbankData.name,
				symbol: bidvbankData.symbol,
				timeUpdate: bidvbankData.timeUpdate,
				khongkyhan: bidvbankData.khongkyhan,
				month1: bidvbankData.month1,
				month2: bidvbankData.month2,
				month3: bidvbankData.month3,
				month5: bidvbankData.month5,
				month6: bidvbankData.month6,
				month9: bidvbankData.month9,
				month12: bidvbankData.month12,
				month13: bidvbankData.month13,
				month15: bidvbankData.month15,
				month18: bidvbankData.month18,
				month24: bidvbankData.month24,
				month36: bidvbankData.month36,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(bidvbankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlScbInterestRate = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlScb, { timeout: 0 });

		await page.waitForTimeout(2000);

		let scbData = await page.evaluate(async () => {
			let dataJson = {};

			try {
				dataJson.name = 'Ngân hàng Thương mại Cổ phần Sài Gòn';
				dataJson.symbol = 'SCB';

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

				dataJson.khongkyhan = {};
				dataJson.khongkyhan.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(1) :nth-child(2)'
				)?.innerText;
				dataJson.khongkyhan.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(1) :nth-child(3)'
				)?.innerText;
				dataJson.khongkyhan.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(1) :nth-child(4)'
				)?.innerText;
				dataJson.khongkyhan.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(1) :nth-child(5)'
				)?.innerText;
				dataJson.khongkyhan.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(1) :nth-child(6)'
				)?.innerText;
				dataJson.khongkyhan.truoc = document.querySelector(
					'.content-table table tbody :nth-child(1) :nth-child(7)'
				)?.innerText;

				dataJson.month1 = {};
				dataJson.month1.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(3) :nth-child(2)'
				)?.innerText;
				dataJson.month1.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(3) :nth-child(3)'
				)?.innerText;
				dataJson.month1.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(3) :nth-child(4)'
				)?.innerText;
				dataJson.month1.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(3) :nth-child(5)'
				)?.innerText;
				dataJson.month1.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(3) :nth-child(6)'
				)?.innerText;
				dataJson.month1.truoc = document.querySelector(
					'.content-table table tbody :nth-child(3) :nth-child(7)'
				)?.innerText;

				dataJson.month2 = {};
				dataJson.month2.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(4) :nth-child(2)'
				)?.innerText;
				dataJson.month2.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(4) :nth-child(3)'
				)?.innerText;
				dataJson.month2.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(4) :nth-child(4)'
				)?.innerText;
				dataJson.month2.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(4) :nth-child(5)'
				)?.innerText;
				dataJson.month2.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(4) :nth-child(6)'
				)?.innerText;
				dataJson.month2.truoc = document.querySelector(
					'.content-table table tbody :nth-child(4) :nth-child(7)'
				)?.innerText;

				dataJson.month3 = {};
				dataJson.month3.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(5) :nth-child(2)'
				)?.innerText;
				dataJson.month3.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(5) :nth-child(3)'
				)?.innerText;
				dataJson.month3.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(5) :nth-child(4)'
				)?.innerText;
				dataJson.month3.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(5) :nth-child(5)'
				)?.innerText;
				dataJson.month3.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(5) :nth-child(6)'
				)?.innerText;
				dataJson.month3.truoc = document.querySelector(
					'.content-table table tbody :nth-child(5) :nth-child(7)'
				)?.innerText;

				dataJson.month4 = {};
				dataJson.month4.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(6) :nth-child(2)'
				)?.innerText;
				dataJson.month4.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(6) :nth-child(3)'
				)?.innerText;
				dataJson.month4.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(6) :nth-child(4)'
				)?.innerText;
				dataJson.month4.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(6) :nth-child(5)'
				)?.innerText;
				dataJson.month4.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(6) :nth-child(6)'
				)?.innerText;
				dataJson.month4.truoc = document.querySelector(
					'.content-table table tbody :nth-child(6) :nth-child(7)'
				)?.innerText;

				dataJson.month5 = {};
				dataJson.month5.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(7) :nth-child(2)'
				)?.innerText;
				dataJson.month5.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(7) :nth-child(3)'
				)?.innerText;
				dataJson.month5.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(7) :nth-child(4)'
				)?.innerText;
				dataJson.month5.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(7) :nth-child(5)'
				)?.innerText;
				dataJson.month5.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(7) :nth-child(6)'
				)?.innerText;
				dataJson.month5.truoc = document.querySelector(
					'.content-table table tbody :nth-child(7) :nth-child(7)'
				)?.innerText;

				dataJson.month6 = {};
				dataJson.month6.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(8) :nth-child(2)'
				)?.innerText;
				dataJson.month6.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(8) :nth-child(3)'
				)?.innerText;
				dataJson.month6.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(8) :nth-child(4)'
				)?.innerText;
				dataJson.month6.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(8) :nth-child(5)'
				)?.innerText;
				dataJson.month6.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(8) :nth-child(6)'
				)?.innerText;
				dataJson.month6.truoc = document.querySelector(
					'.content-table table tbody :nth-child(8) :nth-child(7)'
				)?.innerText;

				dataJson.month7 = {};
				dataJson.month7.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(9) :nth-child(2)'
				)?.innerText;
				dataJson.month7.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(9) :nth-child(3)'
				)?.innerText;
				dataJson.month7.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(9) :nth-child(4)'
				)?.innerText;
				dataJson.month7.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(9) :nth-child(5)'
				)?.innerText;
				dataJson.month7.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(9) :nth-child(6)'
				)?.innerText;
				dataJson.month7.truoc = document.querySelector(
					'.content-table table tbody :nth-child(9) :nth-child(7)'
				)?.innerText;

				dataJson.month8 = {};
				dataJson.month8.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(10) :nth-child(2)'
				)?.innerText;
				dataJson.month8.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(10) :nth-child(3)'
				)?.innerText;
				dataJson.month8.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(10) :nth-child(4)'
				)?.innerText;
				dataJson.month8.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(10) :nth-child(5)'
				)?.innerText;
				dataJson.month8.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(10) :nth-child(6)'
				)?.innerText;
				dataJson.month8.truoc = document.querySelector(
					'.content-table table tbody :nth-child(10) :nth-child(7)'
				)?.innerText;

				dataJson.month9 = {};
				dataJson.month9.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(11) :nth-child(2)'
				)?.innerText;
				dataJson.month9.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(11) :nth-child(3)'
				)?.innerText;
				dataJson.month9.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(11) :nth-child(4)'
				)?.innerText;
				dataJson.month9.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(11) :nth-child(5)'
				)?.innerText;
				dataJson.month9.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(11) :nth-child(6)'
				)?.innerText;
				dataJson.month9.truoc = document.querySelector(
					'.content-table table tbody :nth-child(11) :nth-child(7)'
				)?.innerText;

				dataJson.month10 = {};
				dataJson.month10.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(12) :nth-child(2)'
				)?.innerText;
				dataJson.month10.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(12) :nth-child(3)'
				)?.innerText;
				dataJson.month10.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(12) :nth-child(4)'
				)?.innerText;
				dataJson.month10.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(12) :nth-child(5)'
				)?.innerText;
				dataJson.month10.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(12) :nth-child(6)'
				)?.innerText;
				dataJson.month10.truoc = document.querySelector(
					'.content-table table tbody :nth-child(12) :nth-child(7)'
				)?.innerText;

				dataJson.month11 = {};
				dataJson.month11.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(13) :nth-child(2)'
				)?.innerText;
				dataJson.month11.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(13) :nth-child(3)'
				)?.innerText;
				dataJson.month11.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(13) :nth-child(4)'
				)?.innerText;
				dataJson.month11.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(13) :nth-child(5)'
				)?.innerText;
				dataJson.month11.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(13) :nth-child(6)'
				)?.innerText;
				dataJson.month11.truoc = document.querySelector(
					'.content-table table tbody :nth-child(13) :nth-child(7)'
				)?.innerText;

				dataJson.month12 = {};
				dataJson.month12.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(14) :nth-child(2)'
				)?.innerText;
				dataJson.month12.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(14) :nth-child(3)'
				)?.innerText;
				dataJson.month12.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(14) :nth-child(4)'
				)?.innerText;
				dataJson.month12.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(14) :nth-child(5)'
				)?.innerText;
				dataJson.month12.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(14) :nth-child(6)'
				)?.innerText;
				dataJson.month12.truoc = document.querySelector(
					'.content-table table tbody :nth-child(14) :nth-child(7)'
				)?.innerText;

				dataJson.month15 = {};
				dataJson.month15.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(15) :nth-child(2)'
				)?.innerText;
				dataJson.month15.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(15) :nth-child(3)'
				)?.innerText;
				dataJson.month15.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(15) :nth-child(4)'
				)?.innerText;
				dataJson.month15.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(15) :nth-child(5)'
				)?.innerText;
				dataJson.month15.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(15) :nth-child(6)'
				)?.innerText;
				dataJson.month15.truoc = document.querySelector(
					'.content-table table tbody :nth-child(15) :nth-child(7)'
				)?.innerText;

				dataJson.month18 = {};
				dataJson.month18.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(16) :nth-child(2)'
				)?.innerText;
				dataJson.month18.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(16) :nth-child(3)'
				)?.innerText;
				dataJson.month18.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(16) :nth-child(4)'
				)?.innerText;
				dataJson.month18.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(16) :nth-child(5)'
				)?.innerText;
				dataJson.month18.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(16) :nth-child(6)'
				)?.innerText;
				dataJson.month18.truoc = document.querySelector(
					'.content-table table tbody :nth-child(16) :nth-child(7)'
				)?.innerText;

				dataJson.month24 = {};
				dataJson.month24.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(17) :nth-child(2)'
				)?.innerText;
				dataJson.month24.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(17) :nth-child(3)'
				)?.innerText;
				dataJson.month24.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(17) :nth-child(4)'
				)?.innerText;
				dataJson.month24.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(17) :nth-child(5)'
				)?.innerText;
				dataJson.month24.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(17) :nth-child(6)'
				)?.innerText;
				dataJson.month24.truoc = document.querySelector(
					'.content-table table tbody :nth-child(17) :nth-child(7)'
				)?.innerText;

				dataJson.month36 = {};
				dataJson.month36.cuoiky = document.querySelector(
					'.content-table table tbody :nth-child(18) :nth-child(2)'
				)?.innerText;
				dataJson.month36.hangnam = document.querySelector(
					'.content-table table tbody :nth-child(18) :nth-child(3)'
				)?.innerText;
				dataJson.month36.hang6thang = document.querySelector(
					'.content-table table tbody :nth-child(18) :nth-child(4)'
				)?.innerText;
				dataJson.month36.hangquy = document.querySelector(
					'.content-table table tbody :nth-child(18) :nth-child(5)'
				)?.innerText;
				dataJson.month36.hangthang = document.querySelector(
					'.content-table table tbody :nth-child(18) :nth-child(6)'
				)?.innerText;
				dataJson.month36.truoc = document.querySelector(
					'.content-table table tbody :nth-child(18) :nth-child(7)'
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		console.log(scbData);

		ScbInterestRate.findOneAndUpdate(
			{ symbol: scbData.symbol },
			{
				name: scbData.name,
				symbol: scbData.symbol,
				timeUpdate: scbData.timeUpdate,

				'khongkyhan.cuoiky': scbData.khongkyhan.cuoiky,
				'khongkyhan.hangnam': scbData.khongkyhan.hangnam,
				'khongkyhan.hang6thang': scbData.khongkyhan.hang6thang,
				'khongkyhan.hangquy': scbData.khongkyhan.hangquy,
				'khongkyhan.hangthang': scbData.khongkyhan.hangthang,
				'khongkyhan.truoc': scbData.khongkyhan.truoc,

				'month1.cuoiky': scbData.month1.cuoiky,
				'month1.hangnam': scbData.month1.hangnam,
				'month1.hang6thang': scbData.month1.hang6thang,
				'month1.hangquy': scbData.month1.hangquy,
				'month1.hangthang': scbData.month1.hangthang,
				'month1.truoc': scbData.month1.truoc,

				'month2.cuoiky': scbData.month2.cuoiky,
				'month2.hangnam': scbData.month2.hangnam,
				'month2.hang6thang': scbData.month2.hang6thang,
				'month2.hangquy': scbData.month2.hangquy,
				'month2.hangthang': scbData.month2.hangthang,
				'month2.truoc': scbData.month2.truoc,

				'month3.cuoiky': scbData.month3.cuoiky,
				'month3.hangnam': scbData.month3.hangnam,
				'month3.hang6thang': scbData.month3.hang6thang,
				'month3.hangquy': scbData.month3.hangquy,
				'month3.hangthang': scbData.month3.hangthang,
				'month3.truoc': scbData.month3.truoc,

				'month4.cuoiky': scbData.month4.cuoiky,
				'month4.hangnam': scbData.month4.hangnam,
				'month4.hang6thang': scbData.month4.hang6thang,
				'month4.hangquy': scbData.month4.hangquy,
				'month4.hangthang': scbData.month4.hangthang,
				'month4.truoc': scbData.month4.truoc,

				'month5.cuoiky': scbData.month5.cuoiky,
				'month5.hangnam': scbData.month5.hangnam,
				'month5.hang6thang': scbData.month5.hang6thang,
				'month5.hangquy': scbData.month5.hangquy,
				'month5.hangthang': scbData.month5.hangthang,
				'month5.truoc': scbData.month5.truoc,

				'month6.cuoiky': scbData.month6.cuoiky,
				'month6.hangnam': scbData.month6.hangnam,
				'month6.hang6thang': scbData.month6.hang6thang,
				'month6.hangquy': scbData.month6.hangquy,
				'month6.hangthang': scbData.month6.hangthang,
				'month6.truoc': scbData.month6.truoc,

				'month7.cuoiky': scbData.month7.cuoiky,
				'month7.hangnam': scbData.month7.hangnam,
				'month7.hang6thang': scbData.month7.hang6thang,
				'month7.hangquy': scbData.month7.hangquy,
				'month7.hangthang': scbData.month7.hangthang,
				'month7.truoc': scbData.month7.truoc,

				'month8.cuoiky': scbData.month8.cuoiky,
				'month8.hangnam': scbData.month8.hangnam,
				'month8.hang6thang': scbData.month8.hang6thang,
				'month8.hangquy': scbData.month8.hangquy,
				'month8.hangthang': scbData.month8.hangthang,
				'month8.truoc': scbData.month8.truoc,

				'month9.cuoiky': scbData.month9.cuoiky,
				'month9.hangnam': scbData.month9.hangnam,
				'month9.hang6thang': scbData.month9.hang6thang,
				'month9.hangquy': scbData.month9.hangquy,
				'month9.hangthang': scbData.month9.hangthang,
				'month9.truoc': scbData.month9.truoc,

				'month10.cuoiky': scbData.month10.cuoiky,
				'month10.hangnam': scbData.month10.hangnam,
				'month10.hang6thang': scbData.month10.hang6thang,
				'month10.hangquy': scbData.month10.hangquy,
				'month10.hangthang': scbData.month10.hangthang,
				'month10.truoc': scbData.month10.truoc,

				'month11.cuoiky': scbData.month11.cuoiky,
				'month11.hangnam': scbData.month11.hangnam,
				'month11.hang6thang': scbData.month11.hang6thang,
				'month11.hangquy': scbData.month11.hangquy,
				'month11.hangthang': scbData.month11.hangthang,
				'month11.truoc': scbData.month11.truoc,

				'month12.cuoiky': scbData.month12.cuoiky,
				'month12.hangnam': scbData.month12.hangnam,
				'month12.hang6thang': scbData.month12.hang6thang,
				'month12.hangquy': scbData.month12.hangquy,
				'month12.hangthang': scbData.month12.hangthang,
				'month12.truoc': scbData.month12.truoc,

				'month15.cuoiky': scbData.month15.cuoiky,
				'month15.hangnam': scbData.month15.hangnam,
				'month15.hang6thang': scbData.month15.hang6thang,
				'month15.hangquy': scbData.month15.hangquy,
				'month15.hangthang': scbData.month15.hangthang,
				'month15.truoc': scbData.month15.truoc,

				'month18.cuoiky': scbData.month18.cuoiky,
				'month18.hangnam': scbData.month18.hangnam,
				'month18.hang6thang': scbData.month18.hang6thang,
				'month18.hangquy': scbData.month18.hangquy,
				'month18.hangthang': scbData.month18.hangthang,
				'month18.truoc': scbData.month18.truoc,

				'month24.cuoiky': scbData.month24.cuoiky,
				'month24.hangnam': scbData.month24.hangnam,
				'month24.hang6thang': scbData.month24.hang6thang,
				'month24.hangquy': scbData.month24.hangquy,
				'month24.hangthang': scbData.month24.hangthang,
				'month24.truoc': scbData.month24.truoc,

				'month36.cuoiky': scbData.month36.cuoiky,
				'month36.hangnam': scbData.month36.hangnam,
				'month36.hang6thang': scbData.month36.hang6thang,
				'month36.hangquy': scbData.month36.hangquy,
				'month36.hangthang': scbData.month36.hangthang,
				'month36.truoc': scbData.month36.truoc,

				'khongkyhan.cuoiky': scbData.khongkyhan.cuoiky,
				'khongkyhan.hangnam': scbData.khongkyhan.hangnam,
				'khongkyhan.hang6thang': scbData.khongkyhan.hang6thang,
				'khongkyhan.hangquy': scbData.khongkyhan.hangquy,
				'khongkyhan.hangthang': scbData.khongkyhan.hangthang,
				'khongkyhan.truoc': scbData.khongkyhan.truoc,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(scbData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlMbbankInterestRate = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlMbbank, { timeout: 0 });

		await page.waitForTimeout(2000);

		let mbbankData = await page.evaluate(async () => {
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

				dataJson.khongkyhan = document.querySelector(
					'.detail-panel-body table tbody :nth-child(2) :nth-child(2) '
				)?.innerText;

				dataJson.week1 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(3) :nth-child(2) '
				)?.innerText;

				dataJson.week2 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(4) :nth-child(2) '
				)?.innerText;

				dataJson.week3 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(5) :nth-child(2) '
				)?.innerText;

				dataJson.month1 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(6) :nth-child(2) '
				)?.innerText;

				dataJson.month2 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(7) :nth-child(2) '
				)?.innerText;

				dataJson.month3 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(8) :nth-child(2) '
				)?.innerText;

				dataJson.month4 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(9) :nth-child(2) '
				)?.innerText;

				dataJson.month5 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(10) :nth-child(2) '
				)?.innerText;

				dataJson.month6 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(11) :nth-child(2) '
				)?.innerText;

				dataJson.month7 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(12) :nth-child(2) '
				)?.innerText;

				dataJson.month8 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(13) :nth-child(2) '
				)?.innerText;

				dataJson.month9 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(14) :nth-child(2) '
				)?.innerText;

				dataJson.month10 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(15) :nth-child(2) '
				)?.innerText;

				dataJson.month11 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(16) :nth-child(2) '
				)?.innerText;

				dataJson.month12 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(17) :nth-child(2) '
				)?.innerText;

				dataJson.month13 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(18) :nth-child(2) '
				)?.innerText;

				dataJson.month15 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(19) :nth-child(2) '
				)?.innerText;

				dataJson.month18 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(20) :nth-child(2) '
				)?.innerText;

				dataJson.month24 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(21) :nth-child(2) '
				)?.innerText;

				dataJson.month36 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(22) :nth-child(2) '
				)?.innerText;

				dataJson.month48 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(23) :nth-child(2) '
				)?.innerText;

				dataJson.month60 = document.querySelector(
					'.detail-panel-body table tbody :nth-child(24) :nth-child(2) '
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(mbbankData);

		MbbankInterestRate.findOneAndUpdate(
			{ symbol: mbbankData.symbol },
			{
				name: mbbankData.name,
				symbol: mbbankData.symbol,
				timeUpdate: mbbankData.timeUpdate,
				khongkyhan: mbbankData.khongkyhan,
				week1: mbbankData.week1,
				week2: mbbankData.week2,
				week3: mbbankData.week3,
				month1: mbbankData.month1,
				month2: mbbankData.month2,
				month3: mbbankData.month3,
				month4: mbbankData.month4,
				month5: mbbankData.month5,
				month6: mbbankData.month6,
				month7: mbbankData.month7,
				month8: mbbankData.month8,
				month9: mbbankData.month9,
				month10: mbbankData.month10,
				month11: mbbankData.month11,
				month12: mbbankData.month12,
				month13: mbbankData.month13,
				month15: mbbankData.month15,
				month18: mbbankData.month18,
				month24: mbbankData.month24,
				month36: mbbankData.month36,
				month48: mbbankData.month48,
				month60: mbbankData.month60,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(mbbankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlVibInterestRate = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlVib, { timeout: 0 });

		await page.waitForTimeout(2000);

		let vibData = await page.evaluate(async () => {
			let dataJson = {};

			try {
				dataJson.name = 'Ngân hàng Thương mại Cổ phần Quốc tế Việt Nam';
				dataJson.symbol = 'VIB';

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

				const tableElement = document.querySelectorAll(
					' .vib-v2-right-box-table-expression'
				)[0];

				dataJson.under1monthfrom10tounder300 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(6)'
					)[0]?.innerText;
				dataJson.month1from10tounder300 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(3)'
				)[0]?.innerText;
				dataJson.month2from10tounder300 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(7)'
				)[0]?.innerText;
				dataJson.month345from10tounder300 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(8)'
					)[0]?.innerText;
				dataJson.month6from10tounder300 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(4)'
				)[0]?.innerText;
				dataJson.month7from10tounder300 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(9)'
				)[0]?.innerText;
				dataJson.month8from10tounder300 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(10)'
				)[0]?.innerText;
				dataJson.month9from10tounder300 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(11)'
				)[0]?.innerText;
				dataJson.month10from10tounder300 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(12)'
					)[0]?.innerText;
				dataJson.month11from10tounder300 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(13)'
					)[0]?.innerText;
				dataJson.month1213from10tounder300 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(14)'
					)[0]?.innerText;
				dataJson.month15from10tounder300 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(15)'
					)[0]?.innerText;
				dataJson.month18from10tounder300 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(16)'
					)[0]?.innerText;
				dataJson.month24from10tounder300 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(17)'
					)[0]?.innerText;
				dataJson.month36from10tounder300 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(18)'
					)[0]?.innerText;

				dataJson.under1monthfrom300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(6)'
					)[1]?.innerText;
				dataJson.month1from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(3)'
					)[1]?.innerText;
				dataJson.month2from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(7)'
					)[1]?.innerText;
				dataJson.month345from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(8)'
					)[1]?.innerText;
				dataJson.month6from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(4)'
					)[1]?.innerText;
				dataJson.month7from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(9)'
					)[1]?.innerText;
				dataJson.month8from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(10)'
					)[1]?.innerText;
				dataJson.month9from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(11)'
					)[1]?.innerText;
				dataJson.month10from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(12)'
					)[1]?.innerText;
				dataJson.month11from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(13)'
					)[1]?.innerText;
				dataJson.month1213from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(14)'
					)[1]?.innerText;
				dataJson.month15from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(15)'
					)[1]?.innerText;
				dataJson.month18from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(16)'
					)[1]?.innerText;
				dataJson.month24from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(17)'
					)[1]?.innerText;
				dataJson.month36from300tounder3000 =
					tableElement.querySelectorAll(
						'div .vib-v2-box-slider-expression :nth-child(18)'
					)[1]?.innerText;

				dataJson.under1monthupper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(6)'
				)[2]?.innerText;
				dataJson.month1upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(3)'
				)[2]?.innerText;
				dataJson.month2upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(7)'
				)[2]?.innerText;
				dataJson.month345upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(8)'
				)[2]?.innerText;
				dataJson.month6upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(4)'
				)[2]?.innerText;
				dataJson.month7upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(9)'
				)[2]?.innerText;
				dataJson.month8upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(10)'
				)[2]?.innerText;
				dataJson.month9upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(11)'
				)[2]?.innerText;
				dataJson.month10upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(12)'
				)[2]?.innerText;
				dataJson.month11upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(13)'
				)[2]?.innerText;
				dataJson.month1213upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(14)'
				)[2]?.innerText;
				dataJson.month15upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(15)'
				)[2]?.innerText;
				dataJson.month18upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(16)'
				)[2]?.innerText;
				dataJson.month24upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(17)'
				)[2]?.innerText;
				dataJson.month36upper3000 = tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(18)'
				)[2]?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(vibData);

		VibInterestRate.findOneAndUpdate(
			{ symbol: vibData.symbol },
			{
				name: vibData.name,
				symbol: vibData.symbol,
				timeUpdate: vibData.timeUpdate,
				under1monthfrom10tounder300:
					vibData.under1monthfrom10tounder300,
				month1from10tounder300: vibData.month1from10tounder300,
				month2from10tounder300: vibData.month2from10tounder300,
				month345from10tounder300: vibData.month345from10tounder300,
				month6from10tounder300: vibData.month6from10tounder300,
				month7from10tounder300: vibData.month7from10tounder300,
				month8from10tounder300: vibData.month8from10tounder300,
				month9from10tounder300: vibData.month9from10tounder300,
				month10from10tounder300: vibData.month10from10tounder300,
				month11from10tounder300: vibData.month11from10tounder300,
				month1213from10tounder300: vibData.month1213from10tounder300,
				month15from10tounder300: vibData.month15from10tounder300,
				month18from10tounder300: vibData.month18from10tounder300,
				month24from10tounder300: vibData.month24from10tounder300,
				month36from10tounder300: vibData.month36from10tounder300,

				under1monthfrom300tounder3000:
					vibData.under1monthfrom300tounder3000,
				month1from300tounder3000: vibData.month1from300tounder3000,
				month2from300tounder3000: vibData.month2from300tounder3000,
				month345from300tounder3000: vibData.month345from300tounder3000,
				month6from300tounder3000: vibData.month6from300tounder3000,
				month7from300tounder3000: vibData.month7from300tounder3000,
				month8from300tounder3000: vibData.month8from300tounder3000,
				month9from300tounder3000: vibData.month9from300tounder3000,
				month10from300tounder3000: vibData.month10from300tounder3000,
				month11from300tounder3000: vibData.month11from300tounder3000,
				month1213from300tounder3000:
					vibData.month1213from300tounder3000,
				month15from300tounder3000: vibData.month15from300tounder3000,
				month18from300tounder3000: vibData.month18from300tounder3000,
				month24from300tounder3000: vibData.month24from300tounder3000,
				month36from300tounder3000: vibData.month36from300tounder3000,

				under1monthupper3000: vibData.under1monthupper3000,
				month1upper3000: vibData.month1upper3000,
				month2upper3000: vibData.month2upper3000,
				month345upper3000: vibData.month345upper3000,
				month6upper3000: vibData.month6upper3000,
				month7upper3000: vibData.month7upper3000,
				month8upper3000: vibData.month8upper3000,
				month9upper3000: vibData.month9upper3000,
				month10upper3000: vibData.month10upper3000,
				month11upper3000: vibData.month11upper3000,
				month1213upper3000: vibData.month1213upper3000,
				month15upper3000: vibData.month15upper3000,
				month18upper3000: vibData.month18upper3000,
				month24upper3000: vibData.month24upper3000,
				month36upper3000: vibData.month36upper3000,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(vibData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlTpbankInterestRate = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlTpbank, { timeout: 0 });

		await page.waitForTimeout(2000);

		let tpbankData = await page.evaluate(async () => {
			let dataJson = {};

			try {
				dataJson.name = 'Ngân hàng Thương mại Cổ phần Tiên Phong';
				dataJson.symbol = 'Tpbank';

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

				dataJson.month1Offline = document.querySelector(
					'.bang-lai-suat table tbody :nth-child(1) :nth-child(2) '
				)?.innerText;
				dataJson.month3Offline = document.querySelector(
					'.bang-lai-suat table tbody :nth-child(2) :nth-child(2) '
				)?.innerText;
				dataJson.mont6Offline = document.querySelector(
					'.bang-lai-suat table tbody :nth-child(3) :nth-child(2) '
				)?.innerText;
				dataJson.month12Offline = document.querySelector(
					'.bang-lai-suat table tbody :nth-child(4) :nth-child(2) '
				)?.innerText;
				dataJson.month18Offline = document.querySelector(
					'.bang-lai-suat table tbody :nth-child(5) :nth-child(2) '
				)?.innerText;
				dataJson.month24Offline = document.querySelector(
					'.bang-lai-suat table tbody :nth-child(6) :nth-child(2) '
				)?.innerText;
				dataJson.month36Offline = document.querySelector(
					'.bang-lai-suat table tbody :nth-child(7) :nth-child(2) '
				)?.innerText;

				dataJson.month1Online = document.querySelectorAll(
					'.bang-lai-suat table tbody :nth-child(1) :nth-child(2) '
				)[1]?.innerText;
				dataJson.month3Online = document.querySelectorAll(
					'.bang-lai-suat table tbody :nth-child(2) :nth-child(2) '
				)[1]?.innerText;
				dataJson.month6Online = document.querySelectorAll(
					'.bang-lai-suat table tbody :nth-child(3) :nth-child(2) '
				)[1]?.innerText;
				dataJson.month12Online = document.querySelectorAll(
					'.bang-lai-suat table tbody :nth-child(4) :nth-child(2) '
				)[1]?.innerText;
				dataJson.month18Online = document.querySelectorAll(
					'.bang-lai-suat table tbody :nth-child(5) :nth-child(2) '
				)[1]?.innerText;
				dataJson.month24Online = document.querySelectorAll(
					'.bang-lai-suat table tbody :nth-child(6) :nth-child(2) '
				)[1]?.innerText;
				dataJson.month36Online = document.querySelectorAll(
					'.bang-lai-suat table tbody :nth-child(7) :nth-child(2) '
				)[1]?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		// console.log(tpbankData);
		TpbankInterestRate.findOneAndUpdate(
			{ symbol: tpbankData.symbol },
			{
				name: tpbankData.name,
				symbol: tpbankData.symbol,
				timeUpdate: tpbankData.timeUpdate,
				month1Offline: tpbankData.month1Offline,
				month3Offline: tpbankData.month3Offline,
				month6Offline: tpbankData.month6Offline,
				month12Offline: tpbankData.month12Offline,
				month18Offline: tpbankData.month18Offline,
				month24Offline: tpbankData.month24Offline,
				month36Offline: tpbankData.month36Offline,

				month1Online: tpbankData.month1Online,
				month3Online: tpbankData.month3Online,
				month6Online: tpbankData.month6Online,
				month12Online: tpbankData.month12Online,
				month18Online: tpbankData.month18Online,
				month24Online: tpbankData.month24Online,
				month36Online: tpbankData.month36Online,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(tpbankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

const crawlVpbankInterestRate = asyncHandler(async () => {
	// cron.schedule('*/50 * * * * *', async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
		);
		await page.goto(urlVpbank, { timeout: 0 });

		await page.waitForTimeout(2000);

		let vpbankData = await page.evaluate(async () => {
			let dataJson = {};

			try {
				dataJson.name =
					'Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng';
				dataJson.symbol = 'Vpbank';

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

				dataJson.month1under300 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(1) :nth-child(2)'
				)?.innerText;
				dataJson.month6under300 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(2) :nth-child(2)'
				)?.innerText;
				dataJson.month12under300 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(3) :nth-child(2)'
				)?.innerText;
				dataJson.month24under300 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(4) :nth-child(2)'
				)?.innerText;

				dataJson.month1from300t03000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(1) :nth-child(3)'
				)?.innerText;
				dataJson.month6from300t03000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(2) :nth-child(3)'
				)?.innerText;
				dataJson.month12from300t03000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(3) :nth-child(3)'
				)?.innerText;
				dataJson.month24from300t03000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(4) :nth-child(3)'
				)?.innerText;

				dataJson.month1from3000to10000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(1) :nth-child(4)'
				)?.innerText;
				dataJson.month6from3000to10000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(2) :nth-child(4)'
				)?.innerText;
				dataJson.month12from3000to10000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(3) :nth-child(4)'
				)?.innerText;
				dataJson.month24from3000to10000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(4) :nth-child(4)'
				)?.innerText;

				dataJson.month1from10000to50000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(1) :nth-child(5)'
				)?.innerText;
				dataJson.month6from10000to50000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(2) :nth-child(5)'
				)?.innerText;
				dataJson.month12from10000to50000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(3) :nth-child(5)'
				)?.innerText;
				dataJson.month24from10000to50000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(4) :nth-child(5)'
				)?.innerText;

				dataJson.month1upper50000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(1) :nth-child(6)'
				)?.innerText;
				dataJson.month6upper50000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(2) :nth-child(6)'
				)?.innerText;
				dataJson.month12upper50000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(3) :nth-child(6)'
				)?.innerText;
				dataJson.month24upper50000 = document.querySelector(
					'.bang-lai-suat div table tbody :nth-child(4) :nth-child(6)'
				)?.innerText;
			} catch (err) {
				console.log(err);
			}
			return dataJson;
		});

		console.log(vpbankData);
		VpbankInterestRate.findOneAndUpdate(
			{ symbol: vpbankData.symbol },
			{
				name: vpbankData.name,
				symbol: vpbankData.symbol,
				timeUpdate: vpbankData.timeUpdate,
				month1under300: vpbankData.month1under300,
				month6under300: vpbankData.month6under300,
				month12under300: vpbankData.month12under300,
				month24under300: vpbankData.month24under300,

				month1from300to3000: vpbankData.month1from300to3000,
				month6from300to3000: vpbankData.month6from300to3000,
				month12from300to3000: vpbankData.month12from300to3000,
				month24from300to3000: vpbankData.month24from300to3000,

				month1from3000to10000: vpbankData.month1from3000to10000,
				month6from3000to10000: vpbankData.month6from3000to10000,
				month12from3000to10000: vpbankData.month12from3000to10000,
				month24from3000to10000: vpbankData.month24from3000to10000,

				month1from10000to50000: vpbankData.month1from10000to50000,
				month6from10000to50000: vpbankData.month6from10000to50000,
				month12from10000to50000: vpbankData.month12from10000to50000,
				month24from10000to50000: vpbankData.month24from10000to50000,

				month1upper50000: vpbankData.month1upper50000,
				month6upper50000: vpbankData.month6upper50000,
				month12upper50000: vpbankData.month12upper50000,
				month24upper50000: vpbankData.month24upper50000,
			},
			{ upsert: true }
		)
			.then((doc) => console.log(doc))
			.catch((err) => console.log(vpbankData.symbol));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
	// })
});

module.exports = {
	crawlVietcombankInterestRate,
	crawlVietinbankInterestRate,
	crawlAgribankbankInterestRate,
	crawlBidvInterestRate,
	crawlScbInterestRate,
	crawlMbbankInterestRate,
	crawlVibInterestRate,
	crawlTpbankInterestRate,
	crawlVpbankInterestRate,
};
