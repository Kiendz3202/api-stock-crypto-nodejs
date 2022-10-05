const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const puppeteer = require('puppeteer');

const {
	collectQueryData,
	collectQueryDataHeightScroll,
} = require('../../../utils/pupperteer/collectQueryData');

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
const urlScb = 'https://webgia.com/lai-suat/scb/';
const urlMbbank = 'https://webgia.com/lai-suat/mbbank/';
const urlVib =
	'https://www.vib.com.vn/vn/tiet-kiem/bieu-lai-suat-tiet-kiem-tai-quay';

const urlTpbank = 'https://webgia.com/lai-suat/tpbank/';
const urlVpbank = 'https://webgia.com/lai-suat/vpbank/';

const crawlVietcombankInterestRate = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
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

			dataJson.khongkyhan = $(
				'#danhsachlaisuat tbody :nth-child(3) :nth-child(2)'
			)?.innerText;
			dataJson.day7 = $(
				'#danhsachlaisuat tbody :nth-child(4) :nth-child(2)'
			)?.innerText;
			dataJson.day14 = $(
				'#danhsachlaisuat tbody :nth-child(5) :nth-child(2)'
			)?.innerText;
			dataJson.month1 = $(
				'#danhsachlaisuat tbody :nth-child(6) :nth-child(2)'
			)?.innerText;
			dataJson.month2 = $(
				'#danhsachlaisuat tbody :nth-child(7) :nth-child(2)'
			)?.innerText;
			dataJson.month3 = $(
				'#danhsachlaisuat tbody :nth-child(8) :nth-child(2)'
			)?.innerText;
			dataJson.month6 = $(
				'#danhsachlaisuat tbody :nth-child(9) :nth-child(2)'
			)?.innerText;
			dataJson.month9 = $(
				'#danhsachlaisuat tbody :nth-child(10) :nth-child(2)'
			)?.innerText;
			dataJson.month12 = $(
				'#danhsachlaisuat tbody :nth-child(11) :nth-child(2)'
			)?.innerText;
			dataJson.month24 = $(
				'#danhsachlaisuat tbody :nth-child(12) :nth-child(2)'
			)?.innerText;
			dataJson.month36 = $(
				'#danhsachlaisuat tbody :nth-child(13) :nth-child(2)'
			)?.innerText;
			dataJson.month48 = $(
				'#danhsachlaisuat tbody :nth-child(14) :nth-child(2)'
			)?.innerText;
			dataJson.month60 = $(
				'#danhsachlaisuat tbody :nth-child(15) :nth-child(2)'
			)?.innerText;
		} catch (err) {
			console.log(err);
		}
		return dataJson;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		console.log('loop' + attemps);
		data = await collectQueryData(urlVietcombank, pageEvaluateFunc);
		attemps++;
		console.log(data);
		if (data) {
			VietcombankInterestRate.findOneAndUpdate(
				{ symbol: data.symbol },
				{
					name: data.name,
					symbol: data.symbol,
					timeUpdate: data.timeUpdate,
					khongkyhan: data.khongkyhan,
					day7: data.day7,
					day14: data.day14,
					month1: data.month1,
					month2: data.month2,
					month3: data.month3,
					month6: data.month6,
					month9: data.month9,
					month12: data.month12,
					month24: data.month24,
					month36: data.month36,
					month48: data.month48,
					month60: data.month60,
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

const crawlVietinbankInterestRate = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		const $ = document.querySelector.bind(document);

		let dataJson = {};

		try {
			dataJson.name = 'Ngân hàng Thương mại cổ phần Công Thương Việt Nam';
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
				$('#hor-ex-b tbody :nth-child(4) :nth-child(2) ')?.innerText +
				'%';
			dataJson.khongkyhanBusiness =
				$('#hor-ex-b tbody :nth-child(4) :nth-child(5) ')?.innerText +
				'%';

			dataJson.under1month =
				$('#hor-ex-b tbody :nth-child(5) :nth-child(2) ')?.innerText +
				'%';
			dataJson.under1monthBusiness =
				$('#hor-ex-b tbody :nth-child(5) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from1to2month =
				$('#hor-ex-b tbody :nth-child(6) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from1to2monthBusiness =
				$('#hor-ex-b tbody :nth-child(6) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from2to3month =
				$('#hor-ex-b tbody :nth-child(7) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from2to3monthBusiness =
				$('#hor-ex-b tbody :nth-child(7) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from3to4month =
				$('#hor-ex-b tbody :nth-child(8) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from3to4monthBusiness =
				$('#hor-ex-b tbody :nth-child(8) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from4to5month =
				$('#hor-ex-b tbody :nth-child(9) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from4to5monthBusiness =
				$('#hor-ex-b tbody :nth-child(9) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from5to6month =
				$('#hor-ex-b tbody :nth-child(10) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from5to6monthBusiness =
				$('#hor-ex-b tbody :nth-child(10) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from6to7month =
				$('#hor-ex-b tbody :nth-child(11) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from6to7monthBusiness =
				$('#hor-ex-b tbody :nth-child(11) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from7to8month =
				$('#hor-ex-b tbody :nth-child(12) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from7to8monthBusiness =
				$('#hor-ex-b tbody :nth-child(12) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from8to9month =
				$('#hor-ex-b tbody :nth-child(13) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from8to9monthBusiness =
				$('#hor-ex-b tbody :nth-child(13) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from9to10month =
				$('#hor-ex-b tbody :nth-child(14) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from9to10monthBusiness =
				$('#hor-ex-b tbody :nth-child(14) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from10to11month =
				$('#hor-ex-b tbody :nth-child(15) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from10to11monthBusiness =
				$('#hor-ex-b tbody :nth-child(15) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from11to12month =
				$('#hor-ex-b tbody :nth-child(16) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from11to12monthBusiness =
				$('#hor-ex-b tbody :nth-child(16) :nth-child(5) ')?.innerText +
				'%';

			dataJson.month12 =
				$('#hor-ex-b tbody :nth-child(17) :nth-child(2) ')?.innerText +
				'%';
			dataJson.month12Business =
				$('#hor-ex-b tbody :nth-child(17) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from12to18month =
				$('#hor-ex-b tbody :nth-child(18) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from12to18monthBusiness =
				$('#hor-ex-b tbody :nth-child(18) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from18to24month =
				$('#hor-ex-b tbody :nth-child(19) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from18to24monthBusiness =
				$('#hor-ex-b tbody :nth-child(19) :nth-child(5) ')?.innerText +
				'%';

			dataJson.from24to36month =
				$('#hor-ex-b tbody :nth-child(20) :nth-child(2) ')?.innerText +
				'%';
			dataJson.from24to36monthBusiness =
				$('#hor-ex-b tbody :nth-child(20) :nth-child(5) ')?.innerText +
				'%';

			dataJson.month36 =
				$('#hor-ex-b tbody :nth-child(21) :nth-child(2) ')?.innerText +
				'%';
			dataJson.month36Business =
				$('#hor-ex-b tbody :nth-child(21) :nth-child(5) ')?.innerText +
				'%';

			dataJson.upper36month =
				$('#hor-ex-b tbody :nth-child(22) :nth-child(2) ')?.innerText +
				'%';
			dataJson.upper36monthBusiness =
				$('#hor-ex-b tbody :nth-child(22) :nth-child(5) ')?.innerText +
				'%';
		} catch (err) {
			console.log(err);
		}
		return dataJson;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		console.log('loop' + attemps);
		data = await collectQueryData(urlVietinbank, pageEvaluateFunc);
		attemps++;
		console.log(data);
		if (data) {
			VietinbankInterestRate.findOneAndUpdate(
				{ symbol: data.symbol },
				{
					name: data.name,
					symbol: data.symbol,
					timeUpdate: data.timeUpdate,
					khongkyhan: data.khongkyhan,
					under1month: data.under1month,
					from1to2month: data.from1to2month,
					from2to3month: data.from2to3month,
					from3to4month: data.from3to4month,
					from4to5month: data.from4to5month,
					from5to6month: data.from5to6month,
					from6to7month: data.from6to7month,
					from7to8month: data.from7to8month,
					from8to9month: data.from8to9month,
					from9to10month: data.from9to10month,
					from10to11month: data.from10to11month,
					from11to12month: data.from11to12month,
					month12: data.month12,
					from12to18month: data.from12to18month,
					from18to24month: data.from18to24month,
					from24to36month: data.from24to36month,
					month36: data.month36,
					upper36month: data.upper36month,

					khongkyhanBusiness: data.khongkyhanBusiness,
					under1monthBusiness: data.under1monthBusiness,
					from1to2monthBusiness: data.from1to2monthBusiness,
					from2to3monthBusiness: data.from2to3monthBusiness,
					from3to4monthBusiness: data.from3to4monthBusiness,
					from4to5monthBusiness: data.from4to5monthBusiness,
					from5to6monthBusiness: data.from5to6monthBusiness,
					from6to7monthBusiness: data.from6to7monthBusiness,
					from7to8monthBusiness: data.from7to8monthBusiness,
					from8to9monthBusiness: data.from8to9monthBusiness,
					from9to10monthBusiness: data.from9to10monthBusiness,
					from10to11monthBusiness: data.from10to11monthBusiness,
					from11to12monthBusiness: data.from11to12monthBusiness,
					month12Business: data.month12Business,
					from12to18monthBusiness: data.from12to18monthBusiness,
					from18to24monthBusiness: data.from18to24monthBusiness,
					from24to36monthBusiness: data.from24to36monthBusiness,
					month36Business: data.month36Business,
					upper36monthBusiness: data.upper36monthBusiness,
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

const crawlAgribankbankInterestRate = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		const $$ = document.querySelectorAll.bind(document);

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

			const table1Element = $$('table')[0];
			const table2Element = $$('table')[1];

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
			dataJson.checkableDepositsPersonal = table1Element.querySelector(
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
			dataJson.checkableDepositsBusiness = table2Element.querySelector(
				' tbody :nth-child(18) :nth-child(2)'
			)?.innerText;
		} catch (err) {
			console.log(err);
		}
		return dataJson;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		console.log('loop' + attemps);
		data = await collectQueryData(urlAgribank, pageEvaluateFunc);
		attemps++;
		console.log(data);
		if (data) {
			AgribankbankInterestRate.findOneAndUpdate(
				{ symbol: data.symbol },
				{
					name: data.name,
					symbol: data.symbol,
					timeUpdate: data.timeUpdate,
					khongkyhanPersonal: data.khongkyhanPersonal,
					month1Personal: data.month1Personal,
					month2Personal: data.month2Personal,
					month3Personal: data.month3Personal,
					month4Personal: data.month4Personal,
					month5Personal: data.month5Personal,
					month6Personal: data.month6Personal,
					month7Personal: data.month7Personal,
					month8Personal: data.month8Personal,
					month9Personal: data.month9Personal,
					month10Personal: data.month10Personal,
					month11Personal: data.month11Personal,
					month12Personal: data.month12Personal,
					month13Personal: data.month13Personal,
					month15Personal: data.month15Personal,
					month18Personal: data.month18Personal,
					month24Personal: data.month24Personal,
					checkableDepositsPersonal: data.checkableDepositsPersonal,

					khongkyhanBusiness: data.khongkyhanBusiness,
					month1Business: data.month1Business,
					month2Business: data.month2Business,
					month3Business: data.month3Business,
					month4Business: data.month4Business,
					month5Business: data.month5Business,
					month6Business: data.month6Business,
					month7Business: data.month7Business,
					month8Business: data.month8Business,
					month9Business: data.month9Business,
					month10Business: data.month10Business,
					month11Business: data.month11Business,
					month12Business: data.month12Business,
					month13Business: data.month13Business,
					month15Business: data.month15Business,
					month18Business: data.month18Business,
					month24Business: data.month24Business,
					checkableDepositsBusiness: data.checkableDepositsBusiness,
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

const crawlBidvInterestRate = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
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

			dataJson.khongkyhan = $(
				'#rates table tbody :nth-child(2) :nth-child(4) '
			)?.innerText;
			dataJson.month1 = $(
				'#rates table tbody :nth-child(3) :nth-child(4) '
			)?.innerText;
			dataJson.month2 = $(
				'#rates table tbody :nth-child(4) :nth-child(4) '
			)?.innerText;
			dataJson.month3 = $(
				'#rates table tbody :nth-child(5) :nth-child(4) '
			)?.innerText;
			dataJson.month5 = $(
				'#rates table tbody :nth-child(6) :nth-child(4) '
			)?.innerText;
			dataJson.month6 = $(
				'#rates table tbody :nth-child(7) :nth-child(4) '
			)?.innerText;
			dataJson.month9 = $(
				'#rates table tbody :nth-child(8) :nth-child(4) '
			)?.innerText;
			dataJson.month12 = $(
				'#rates table tbody :nth-child(9) :nth-child(4) '
			)?.innerText;
			dataJson.month13 = $(
				'#rates table tbody :nth-child(10) :nth-child(4) '
			)?.innerText;
			dataJson.month15 = $(
				'#rates table tbody :nth-child(11) :nth-child(4) '
			)?.innerText;
			dataJson.month18 = $(
				'#rates table tbody :nth-child(12) :nth-child(4) '
			)?.innerText;
			dataJson.month24 = $(
				'#rates table tbody :nth-child(13) :nth-child(4) '
			)?.innerText;
			dataJson.month36 = $(
				'#rates table tbody :nth-child(14) :nth-child(4) '
			)?.innerText;
		} catch (err) {
			console.log(err);
		}
		return dataJson;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		console.log('loop' + attemps);
		data = await collectQueryData(urlBidv, pageEvaluateFunc);
		attemps++;
		console.log(data);
		if (data) {
			BidvInterestRate.findOneAndUpdate(
				{ symbol: data.symbol },
				{
					name: data.name,
					symbol: data.symbol,
					timeUpdate: data.timeUpdate,
					khongkyhan: data.khongkyhan,
					month1: data.month1,
					month2: data.month2,
					month3: data.month3,
					month5: data.month5,
					month6: data.month6,
					month9: data.month9,
					month12: data.month12,
					month13: data.month13,
					month15: data.month15,
					month18: data.month18,
					month24: data.month24,
					month36: data.month36,
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

const crawlScbInterestRate = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		const $ = document.querySelector.bind(document);

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
			dataJson.khongkyhan.cuoiky = $(
				'table tbody :nth-child(1) :nth-child(2)'
			)?.innerText;
			dataJson.khongkyhan.hangnam = $(
				'table tbody :nth-child(1) :nth-child(3)'
			)?.innerText;
			dataJson.khongkyhan.hang6thang = $(
				'table tbody :nth-child(1) :nth-child(4)'
			)?.innerText;
			dataJson.khongkyhan.hangquy = $(
				'table tbody :nth-child(1) :nth-child(5)'
			)?.innerText;
			dataJson.khongkyhan.hangthang = $(
				'table tbody :nth-child(1) :nth-child(6)'
			)?.innerText;
			dataJson.khongkyhan.truoc = $(
				'table tbody :nth-child(1) :nth-child(7)'
			)?.innerText;

			dataJson.month1 = {};
			dataJson.month1.cuoiky = $(
				'table tbody :nth-child(2) :nth-child(2)'
			)?.innerText;
			dataJson.month1.hangnam = $(
				'table tbody :nth-child(2) :nth-child(3)'
			)?.innerText;
			dataJson.month1.hang6thang = $(
				'table tbody :nth-child(2) :nth-child(4)'
			)?.innerText;
			dataJson.month1.hangquy = $(
				'table tbody :nth-child(2) :nth-child(5)'
			)?.innerText;
			dataJson.month1.hangthang = $(
				'table tbody :nth-child(2) :nth-child(6)'
			)?.innerText;
			dataJson.month1.truoc = $(
				'table tbody :nth-child(2) :nth-child(7)'
			)?.innerText;

			dataJson.month2 = {};
			dataJson.month2.cuoiky = $(
				'table tbody :nth-child(3) :nth-child(2)'
			)?.innerText;
			dataJson.month2.hangnam = $(
				'table tbody :nth-child(3) :nth-child(3)'
			)?.innerText;
			dataJson.month2.hang6thang = $(
				'table tbody :nth-child(3) :nth-child(4)'
			)?.innerText;
			dataJson.month2.hangquy = $(
				'table tbody :nth-child(3) :nth-child(5)'
			)?.innerText;
			dataJson.month2.hangthang = $(
				'table tbody :nth-child(3) :nth-child(6)'
			)?.innerText;
			dataJson.month2.truoc = $(
				'table tbody :nth-child(3) :nth-child(7)'
			)?.innerText;

			dataJson.month3 = {};
			dataJson.month3.cuoiky = $(
				'table tbody :nth-child(4) :nth-child(2)'
			)?.innerText;
			dataJson.month3.hangnam = $(
				'table tbody :nth-child(4) :nth-child(3)'
			)?.innerText;
			dataJson.month3.hang6thang = $(
				'table tbody :nth-child(4) :nth-child(4)'
			)?.innerText;
			dataJson.month3.hangquy = $(
				'table tbody :nth-child(4) :nth-child(5)'
			)?.innerText;
			dataJson.month3.hangthang = $(
				'table tbody :nth-child(4) :nth-child(6)'
			)?.innerText;
			dataJson.month3.truoc = $(
				'table tbody :nth-child(4) :nth-child(7)'
			)?.innerText;

			dataJson.month4 = {};
			dataJson.month4.cuoiky = $(
				'table tbody :nth-child(5) :nth-child(2)'
			)?.innerText;
			dataJson.month4.hangnam = $(
				'table tbody :nth-child(5) :nth-child(3)'
			)?.innerText;
			dataJson.month4.hang6thang = $(
				'table tbody :nth-child(5) :nth-child(4)'
			)?.innerText;
			dataJson.month4.hangquy = $(
				'table tbody :nth-child(5) :nth-child(5)'
			)?.innerText;
			dataJson.month4.hangthang = $(
				'table tbody :nth-child(5) :nth-child(6)'
			)?.innerText;
			dataJson.month4.truoc = $(
				'table tbody :nth-child(5) :nth-child(7)'
			)?.innerText;

			dataJson.month5 = {};
			dataJson.month5.cuoiky = $(
				'table tbody :nth-child(6) :nth-child(2)'
			)?.innerText;
			dataJson.month5.hangnam = $(
				'table tbody :nth-child(6) :nth-child(3)'
			)?.innerText;
			dataJson.month5.hang6thang = $(
				'table tbody :nth-child(6) :nth-child(4)'
			)?.innerText;
			dataJson.month5.hangquy = $(
				'table tbody :nth-child(6) :nth-child(5)'
			)?.innerText;
			dataJson.month5.hangthang = $(
				'table tbody :nth-child(6) :nth-child(6)'
			)?.innerText;
			dataJson.month5.truoc = $(
				'table tbody :nth-child(6) :nth-child(7)'
			)?.innerText;

			dataJson.month6 = {};
			dataJson.month6.cuoiky = $(
				'table tbody :nth-child(7) :nth-child(2)'
			)?.innerText;
			dataJson.month6.hangnam = $(
				'table tbody :nth-child(7) :nth-child(3)'
			)?.innerText;
			dataJson.month6.hang6thang = $(
				'table tbody :nth-child(7) :nth-child(4)'
			)?.innerText;
			dataJson.month6.hangquy = $(
				'table tbody :nth-child(7) :nth-child(5)'
			)?.innerText;
			dataJson.month6.hangthang = $(
				'table tbody :nth-child(7) :nth-child(6)'
			)?.innerText;
			dataJson.month6.truoc = $(
				'table tbody :nth-child(7) :nth-child(7)'
			)?.innerText;

			dataJson.month7 = {};
			dataJson.month7.cuoiky = $(
				'table tbody :nth-child(8) :nth-child(2)'
			)?.innerText;
			dataJson.month7.hangnam = $(
				'table tbody :nth-child(8) :nth-child(3)'
			)?.innerText;
			dataJson.month7.hang6thang = $(
				'table tbody :nth-child(8) :nth-child(4)'
			)?.innerText;
			dataJson.month7.hangquy = $(
				'table tbody :nth-child(8) :nth-child(5)'
			)?.innerText;
			dataJson.month7.hangthang = $(
				'table tbody :nth-child(8) :nth-child(6)'
			)?.innerText;
			dataJson.month7.truoc = $(
				'table tbody :nth-child(8) :nth-child(7)'
			)?.innerText;

			dataJson.month8 = {};
			dataJson.month8.cuoiky = $(
				'table tbody :nth-child(9) :nth-child(2)'
			)?.innerText;
			dataJson.month8.hangnam = $(
				'table tbody :nth-child(9) :nth-child(3)'
			)?.innerText;
			dataJson.month8.hang6thang = $(
				'table tbody :nth-child(9) :nth-child(4)'
			)?.innerText;
			dataJson.month8.hangquy = $(
				'table tbody :nth-child(9) :nth-child(5)'
			)?.innerText;
			dataJson.month8.hangthang = $(
				'table tbody :nth-child(9) :nth-child(6)'
			)?.innerText;
			dataJson.month8.truoc = $(
				'table tbody :nth-child(9) :nth-child(7)'
			)?.innerText;

			dataJson.month9 = {};
			dataJson.month9.cuoiky = $(
				'table tbody :nth-child(10) :nth-child(2)'
			)?.innerText;
			dataJson.month9.hangnam = $(
				'table tbody :nth-child(10) :nth-child(3)'
			)?.innerText;
			dataJson.month9.hang6thang = $(
				'table tbody :nth-child(10) :nth-child(4)'
			)?.innerText;
			dataJson.month9.hangquy = $(
				'table tbody :nth-child(10) :nth-child(5)'
			)?.innerText;
			dataJson.month9.hangthang = $(
				'table tbody :nth-child(10) :nth-child(6)'
			)?.innerText;
			dataJson.month9.truoc = $(
				'table tbody :nth-child(10) :nth-child(7)'
			)?.innerText;

			dataJson.month10 = {};
			dataJson.month10.cuoiky = $(
				'table tbody :nth-child(11) :nth-child(2)'
			)?.innerText;
			dataJson.month10.hangnam = $(
				'table tbody :nth-child(11) :nth-child(3)'
			)?.innerText;
			dataJson.month10.hang6thang = $(
				'table tbody :nth-child(11) :nth-child(4)'
			)?.innerText;
			dataJson.month10.hangquy = $(
				'table tbody :nth-child(11) :nth-child(5)'
			)?.innerText;
			dataJson.month10.hangthang = $(
				'table tbody :nth-child(11) :nth-child(6)'
			)?.innerText;
			dataJson.month10.truoc = $(
				'table tbody :nth-child(11) :nth-child(7)'
			)?.innerText;

			dataJson.month11 = {};
			dataJson.month11.cuoiky = $(
				'table tbody :nth-child(12) :nth-child(2)'
			)?.innerText;
			dataJson.month11.hangnam = $(
				'table tbody :nth-child(12) :nth-child(3)'
			)?.innerText;
			dataJson.month11.hang6thang = $(
				'table tbody :nth-child(12) :nth-child(4)'
			)?.innerText;
			dataJson.month11.hangquy = $(
				'table tbody :nth-child(12) :nth-child(5)'
			)?.innerText;
			dataJson.month11.hangthang = $(
				'table tbody :nth-child(12) :nth-child(6)'
			)?.innerText;
			dataJson.month11.truoc = $(
				'table tbody :nth-child(12) :nth-child(7)'
			)?.innerText;

			dataJson.month12 = {};
			dataJson.month12.cuoiky = $(
				'table tbody :nth-child(13) :nth-child(2)'
			)?.innerText;
			dataJson.month12.hangnam = $(
				'table tbody :nth-child(13) :nth-child(3)'
			)?.innerText;
			dataJson.month12.hang6thang = $(
				'table tbody :nth-child(13) :nth-child(4)'
			)?.innerText;
			dataJson.month12.hangquy = $(
				'table tbody :nth-child(13) :nth-child(5)'
			)?.innerText;
			dataJson.month12.hangthang = $(
				'table tbody :nth-child(13) :nth-child(6)'
			)?.innerText;
			dataJson.month12.truoc = $(
				'table tbody :nth-child(13) :nth-child(7)'
			)?.innerText;

			dataJson.month15 = {};
			dataJson.month15.cuoiky = $(
				'table tbody :nth-child(14) :nth-child(2)'
			)?.innerText;
			dataJson.month15.hangnam = $(
				'table tbody :nth-child(14) :nth-child(3)'
			)?.innerText;
			dataJson.month15.hang6thang = $(
				'table tbody :nth-child(14) :nth-child(4)'
			)?.innerText;
			dataJson.month15.hangquy = $(
				'table tbody :nth-child(14) :nth-child(5)'
			)?.innerText;
			dataJson.month15.hangthang = $(
				'table tbody :nth-child(14) :nth-child(6)'
			)?.innerText;
			dataJson.month15.truoc = $(
				'table tbody :nth-child(14) :nth-child(7)'
			)?.innerText;

			dataJson.month18 = {};
			dataJson.month18.cuoiky = $(
				'table tbody :nth-child(15) :nth-child(2)'
			)?.innerText;
			dataJson.month18.hangnam = $(
				'table tbody :nth-child(15) :nth-child(3)'
			)?.innerText;
			dataJson.month18.hang6thang = $(
				'table tbody :nth-child(15) :nth-child(4)'
			)?.innerText;
			dataJson.month18.hangquy = $(
				'table tbody :nth-child(15) :nth-child(5)'
			)?.innerText;
			dataJson.month18.hangthang = $(
				'table tbody :nth-child(15) :nth-child(6)'
			)?.innerText;
			dataJson.month18.truoc = $(
				'table tbody :nth-child(15) :nth-child(7)'
			)?.innerText;

			dataJson.month24 = {};
			dataJson.month24.cuoiky = $(
				'table tbody :nth-child(16) :nth-child(2)'
			)?.innerText;
			dataJson.month24.hangnam = $(
				'table tbody :nth-child(16) :nth-child(3)'
			)?.innerText;
			dataJson.month24.hang6thang = $(
				'table tbody :nth-child(16) :nth-child(4)'
			)?.innerText;
			dataJson.month24.hangquy = $(
				'table tbody :nth-child(16) :nth-child(5)'
			)?.innerText;
			dataJson.month24.hangthang = $(
				'table tbody :nth-child(16) :nth-child(6)'
			)?.innerText;
			dataJson.month24.truoc = $(
				'table tbody :nth-child(16) :nth-child(7)'
			)?.innerText;

			dataJson.month36 = {};
			dataJson.month36.cuoiky = $(
				'table tbody :nth-child(17) :nth-child(2)'
			)?.innerText;
			dataJson.month36.hangnam = $(
				'table tbody :nth-child(17) :nth-child(3)'
			)?.innerText;
			dataJson.month36.hang6thang = $(
				'table tbody :nth-child(17) :nth-child(4)'
			)?.innerText;
			dataJson.month36.hangquy = $(
				'table tbody :nth-child(17) :nth-child(5)'
			)?.innerText;
			dataJson.month36.hangthang = $(
				'table tbody :nth-child(17) :nth-child(6)'
			)?.innerText;
			dataJson.month36.truoc = $(
				'table tbody :nth-child(17) :nth-child(7)'
			)?.innerText;
		} catch (err) {
			console.log(err);
		}
		return dataJson;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		console.log('loop' + attemps);
		data = await collectQueryData(urlScb, pageEvaluateFunc);
		attemps++;
		console.log(data);
		if (data) {
			ScbInterestRate.findOneAndUpdate(
				{ symbol: data.symbol },
				{
					name: data.name,
					symbol: data.symbol,
					timeUpdate: data.timeUpdate,

					'khongkyhan.cuoiky': data.khongkyhan.cuoiky,
					'khongkyhan.hangnam': data.khongkyhan.hangnam,
					'khongkyhan.hang6thang': data.khongkyhan.hang6thang,
					'khongkyhan.hangquy': data.khongkyhan.hangquy,
					'khongkyhan.hangthang': data.khongkyhan.hangthang,
					'khongkyhan.truoc': data.khongkyhan.truoc,

					'month1.cuoiky': data.month1.cuoiky,
					'month1.hangnam': data.month1.hangnam,
					'month1.hang6thang': data.month1.hang6thang,
					'month1.hangquy': data.month1.hangquy,
					'month1.hangthang': data.month1.hangthang,
					'month1.truoc': data.month1.truoc,

					'month2.cuoiky': data.month2.cuoiky,
					'month2.hangnam': data.month2.hangnam,
					'month2.hang6thang': data.month2.hang6thang,
					'month2.hangquy': data.month2.hangquy,
					'month2.hangthang': data.month2.hangthang,
					'month2.truoc': data.month2.truoc,

					'month3.cuoiky': data.month3.cuoiky,
					'month3.hangnam': data.month3.hangnam,
					'month3.hang6thang': data.month3.hang6thang,
					'month3.hangquy': data.month3.hangquy,
					'month3.hangthang': data.month3.hangthang,
					'month3.truoc': data.month3.truoc,

					'month4.cuoiky': data.month4.cuoiky,
					'month4.hangnam': data.month4.hangnam,
					'month4.hang6thang': data.month4.hang6thang,
					'month4.hangquy': data.month4.hangquy,
					'month4.hangthang': data.month4.hangthang,
					'month4.truoc': data.month4.truoc,

					'month5.cuoiky': data.month5.cuoiky,
					'month5.hangnam': data.month5.hangnam,
					'month5.hang6thang': data.month5.hang6thang,
					'month5.hangquy': data.month5.hangquy,
					'month5.hangthang': data.month5.hangthang,
					'month5.truoc': data.month5.truoc,

					'month6.cuoiky': data.month6.cuoiky,
					'month6.hangnam': data.month6.hangnam,
					'month6.hang6thang': data.month6.hang6thang,
					'month6.hangquy': data.month6.hangquy,
					'month6.hangthang': data.month6.hangthang,
					'month6.truoc': data.month6.truoc,

					'month7.cuoiky': data.month7.cuoiky,
					'month7.hangnam': data.month7.hangnam,
					'month7.hang6thang': data.month7.hang6thang,
					'month7.hangquy': data.month7.hangquy,
					'month7.hangthang': data.month7.hangthang,
					'month7.truoc': data.month7.truoc,

					'month8.cuoiky': data.month8.cuoiky,
					'month8.hangnam': data.month8.hangnam,
					'month8.hang6thang': data.month8.hang6thang,
					'month8.hangquy': data.month8.hangquy,
					'month8.hangthang': data.month8.hangthang,
					'month8.truoc': data.month8.truoc,

					'month9.cuoiky': data.month9.cuoiky,
					'month9.hangnam': data.month9.hangnam,
					'month9.hang6thang': data.month9.hang6thang,
					'month9.hangquy': data.month9.hangquy,
					'month9.hangthang': data.month9.hangthang,
					'month9.truoc': data.month9.truoc,

					'month10.cuoiky': data.month10.cuoiky,
					'month10.hangnam': data.month10.hangnam,
					'month10.hang6thang': data.month10.hang6thang,
					'month10.hangquy': data.month10.hangquy,
					'month10.hangthang': data.month10.hangthang,
					'month10.truoc': data.month10.truoc,

					'month11.cuoiky': data.month11.cuoiky,
					'month11.hangnam': data.month11.hangnam,
					'month11.hang6thang': data.month11.hang6thang,
					'month11.hangquy': data.month11.hangquy,
					'month11.hangthang': data.month11.hangthang,
					'month11.truoc': data.month11.truoc,

					'month12.cuoiky': data.month12.cuoiky,
					'month12.hangnam': data.month12.hangnam,
					'month12.hang6thang': data.month12.hang6thang,
					'month12.hangquy': data.month12.hangquy,
					'month12.hangthang': data.month12.hangthang,
					'month12.truoc': data.month12.truoc,

					'month15.cuoiky': data.month15.cuoiky,
					'month15.hangnam': data.month15.hangnam,
					'month15.hang6thang': data.month15.hang6thang,
					'month15.hangquy': data.month15.hangquy,
					'month15.hangthang': data.month15.hangthang,
					'month15.truoc': data.month15.truoc,

					'month18.cuoiky': data.month18.cuoiky,
					'month18.hangnam': data.month18.hangnam,
					'month18.hang6thang': data.month18.hang6thang,
					'month18.hangquy': data.month18.hangquy,
					'month18.hangthang': data.month18.hangthang,
					'month18.truoc': data.month18.truoc,

					'month24.cuoiky': data.month24.cuoiky,
					'month24.hangnam': data.month24.hangnam,
					'month24.hang6thang': data.month24.hang6thang,
					'month24.hangquy': data.month24.hangquy,
					'month24.hangthang': data.month24.hangthang,
					'month24.truoc': data.month24.truoc,

					'month36.cuoiky': data.month36.cuoiky,
					'month36.hangnam': data.month36.hangnam,
					'month36.hang6thang': data.month36.hang6thang,
					'month36.hangquy': data.month36.hangquy,
					'month36.hangthang': data.month36.hangthang,
					'month36.truoc': data.month36.truoc,

					'khongkyhan.cuoiky': data.khongkyhan.cuoiky,
					'khongkyhan.hangnam': data.khongkyhan.hangnam,
					'khongkyhan.hang6thang': data.khongkyhan.hang6thang,
					'khongkyhan.hangquy': data.khongkyhan.hangquy,
					'khongkyhan.hangthang': data.khongkyhan.hangthang,
					'khongkyhan.truoc': data.khongkyhan.truoc,
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

const crawlMbbankInterestRate = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
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

			dataJson.khongkyhan = $(
				'section.bang-lai-suat tbody :nth-child(1) :nth-child(2)'
			)?.innerText;

			dataJson.week1 = $(
				'section.bang-lai-suat tbody :nth-child(2) :nth-child(2)'
			)?.innerText;

			dataJson.week2 = $(
				'section.bang-lai-suat tbody :nth-child(3) :nth-child(2)'
			)?.innerText;

			dataJson.week3 = $(
				'section.bang-lai-suat tbody :nth-child(4) :nth-child(2)'
			)?.innerText;

			dataJson.month1 = $(
				'section.bang-lai-suat tbody :nth-child(5) :nth-child(2)'
			)?.innerText;

			dataJson.month2 = $(
				'section.bang-lai-suat tbody :nth-child(6) :nth-child(2)'
			)?.innerText;

			dataJson.month3 = $(
				'section.bang-lai-suat tbody :nth-child(7) :nth-child(2)'
			)?.innerText;

			dataJson.month4 = $(
				'section.bang-lai-suat tbody :nth-child(8) :nth-child(2)'
			)?.innerText;

			dataJson.month5 = $(
				'section.bang-lai-suat tbody :nth-child(9) :nth-child(2)'
			)?.innerText;

			dataJson.month6 = $(
				'section.bang-lai-suat tbody :nth-child(10) :nth-child(2)'
			)?.innerText;

			dataJson.month7 = $(
				'section.bang-lai-suat tbody :nth-child(11) :nth-child(2)'
			)?.innerText;

			dataJson.month8 = $(
				'section.bang-lai-suat tbody :nth-child(12) :nth-child(2)'
			)?.innerText;

			dataJson.month9 = $(
				'section.bang-lai-suat tbody :nth-child(13) :nth-child(2)'
			)?.innerText;

			dataJson.month10 = $(
				'section.bang-lai-suat tbody :nth-child(14) :nth-child(2)'
			)?.innerText;

			dataJson.month11 = $(
				'section.bang-lai-suat tbody :nth-child(15) :nth-child(2)'
			)?.innerText;

			dataJson.month12 = $(
				'section.bang-lai-suat tbody :nth-child(16) :nth-child(2)'
			)?.innerText;

			dataJson.month13 = $(
				'section.bang-lai-suat tbody :nth-child(17) :nth-child(2)'
			)?.innerText;

			dataJson.month15 = $(
				'section.bang-lai-suat tbody :nth-child(18) :nth-child(2)'
			)?.innerText;

			dataJson.month18 = $(
				'section.bang-lai-suat tbody :nth-child(19) :nth-child(2)'
			)?.innerText;

			dataJson.month24 = $(
				'section.bang-lai-suat tbody :nth-child(20) :nth-child(2)'
			)?.innerText;

			dataJson.month36 = $(
				'section.bang-lai-suat tbody :nth-child(21) :nth-child(2)'
			)?.innerText;

			dataJson.month48 = $(
				'section.bang-lai-suat tbody :nth-child(22) :nth-child(2)'
			)?.innerText;

			dataJson.month60 = $(
				'section.bang-lai-suat tbody :nth-child(23) :nth-child(2)'
			)?.innerText;
		} catch (err) {
			console.log(err);
		}
		return dataJson;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		console.log('loop' + attemps);
		data = await collectQueryData(urlMbbank, pageEvaluateFunc);
		attemps++;
		console.log(data);
		if (data) {
			MbbankInterestRate.findOneAndUpdate(
				{ symbol: data.symbol },
				{
					name: data.name,
					symbol: data.symbol,
					timeUpdate: data.timeUpdate,
					khongkyhan: data.khongkyhan,
					week1: data.week1,
					week2: data.week2,
					week3: data.week3,
					month1: data.month1,
					month2: data.month2,
					month3: data.month3,
					month4: data.month4,
					month5: data.month5,
					month6: data.month6,
					month7: data.month7,
					month8: data.month8,
					month9: data.month9,
					month10: data.month10,
					month11: data.month11,
					month12: data.month12,
					month13: data.month13,
					month15: data.month15,
					month18: data.month18,
					month24: data.month24,
					month36: data.month36,
					month48: data.month48,
					month60: data.month60,
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

const crawlVibInterestRate = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		const $$ = document.querySelectorAll.bind(document);

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

			const tableElement = $$(' .vib-v2-right-box-table-expression')[0];

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
			dataJson.month345from10tounder300 = tableElement.querySelectorAll(
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
			dataJson.month10from10tounder300 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(12)'
			)[0]?.innerText;
			dataJson.month11from10tounder300 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(13)'
			)[0]?.innerText;
			dataJson.month1213from10tounder300 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(14)'
			)[0]?.innerText;
			dataJson.month15from10tounder300 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(15)'
			)[0]?.innerText;
			dataJson.month18from10tounder300 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(16)'
			)[0]?.innerText;
			dataJson.month24from10tounder300 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(17)'
			)[0]?.innerText;
			dataJson.month36from10tounder300 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(18)'
			)[0]?.innerText;

			dataJson.under1monthfrom300tounder3000 =
				tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(6)'
				)[1]?.innerText;
			dataJson.month1from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(3)'
			)[1]?.innerText;
			dataJson.month2from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(7)'
			)[1]?.innerText;
			dataJson.month345from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(8)'
			)[1]?.innerText;
			dataJson.month6from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(4)'
			)[1]?.innerText;
			dataJson.month7from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(9)'
			)[1]?.innerText;
			dataJson.month8from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(10)'
			)[1]?.innerText;
			dataJson.month9from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(11)'
			)[1]?.innerText;
			dataJson.month10from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(12)'
			)[1]?.innerText;
			dataJson.month11from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(13)'
			)[1]?.innerText;
			dataJson.month1213from300tounder3000 =
				tableElement.querySelectorAll(
					'div .vib-v2-box-slider-expression :nth-child(14)'
				)[1]?.innerText;
			dataJson.month15from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(15)'
			)[1]?.innerText;
			dataJson.month18from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(16)'
			)[1]?.innerText;
			dataJson.month24from300tounder3000 = tableElement.querySelectorAll(
				'div .vib-v2-box-slider-expression :nth-child(17)'
			)[1]?.innerText;
			dataJson.month36from300tounder3000 = tableElement.querySelectorAll(
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
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		console.log('loop' + attemps);
		data = await collectQueryData(urlVib, pageEvaluateFunc);
		attemps++;
		console.log(data);
		if (data) {
			VibInterestRate.findOneAndUpdate(
				{ symbol: data.symbol },
				{
					name: data.name,
					symbol: data.symbol,
					timeUpdate: data.timeUpdate,
					under1monthfrom10tounder300:
						data.under1monthfrom10tounder300,
					month1from10tounder300: data.month1from10tounder300,
					month2from10tounder300: data.month2from10tounder300,
					month345from10tounder300: data.month345from10tounder300,
					month6from10tounder300: data.month6from10tounder300,
					month7from10tounder300: data.month7from10tounder300,
					month8from10tounder300: data.month8from10tounder300,
					month9from10tounder300: data.month9from10tounder300,
					month10from10tounder300: data.month10from10tounder300,
					month11from10tounder300: data.month11from10tounder300,
					month1213from10tounder300: data.month1213from10tounder300,
					month15from10tounder300: data.month15from10tounder300,
					month18from10tounder300: data.month18from10tounder300,
					month24from10tounder300: data.month24from10tounder300,
					month36from10tounder300: data.month36from10tounder300,

					under1monthfrom300tounder3000:
						data.under1monthfrom300tounder3000,
					month1from300tounder3000: data.month1from300tounder3000,
					month2from300tounder3000: data.month2from300tounder3000,
					month345from300tounder3000: data.month345from300tounder3000,
					month6from300tounder3000: data.month6from300tounder3000,
					month7from300tounder3000: data.month7from300tounder3000,
					month8from300tounder3000: data.month8from300tounder3000,
					month9from300tounder3000: data.month9from300tounder3000,
					month10from300tounder3000: data.month10from300tounder3000,
					month11from300tounder3000: data.month11from300tounder3000,
					month1213from300tounder3000:
						data.month1213from300tounder3000,
					month15from300tounder3000: data.month15from300tounder3000,
					month18from300tounder3000: data.month18from300tounder3000,
					month24from300tounder3000: data.month24from300tounder3000,
					month36from300tounder3000: data.month36from300tounder3000,

					under1monthupper3000: data.under1monthupper3000,
					month1upper3000: data.month1upper3000,
					month2upper3000: data.month2upper3000,
					month345upper3000: data.month345upper3000,
					month6upper3000: data.month6upper3000,
					month7upper3000: data.month7upper3000,
					month8upper3000: data.month8upper3000,
					month9upper3000: data.month9upper3000,
					month10upper3000: data.month10upper3000,
					month11upper3000: data.month11upper3000,
					month1213upper3000: data.month1213upper3000,
					month15upper3000: data.month15upper3000,
					month18upper3000: data.month18upper3000,
					month24upper3000: data.month24upper3000,
					month36upper3000: data.month36upper3000,
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

const crawlTpbankInterestRate = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		const $ = document.querySelector.bind(document);
		const $$ = document.querySelectorAll.bind(document);

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

			dataJson.month1Offline = $(
				'.bang-lai-suat table tbody :nth-child(1) :nth-child(2) '
			)?.innerText;
			dataJson.month3Offline = $(
				'.bang-lai-suat table tbody :nth-child(2) :nth-child(2) '
			)?.innerText;
			dataJson.mont6Offline = $(
				'.bang-lai-suat table tbody :nth-child(3) :nth-child(2) '
			)?.innerText;
			dataJson.month12Offline = $(
				'.bang-lai-suat table tbody :nth-child(4) :nth-child(2) '
			)?.innerText;
			dataJson.month18Offline = $(
				'.bang-lai-suat table tbody :nth-child(5) :nth-child(2) '
			)?.innerText;
			dataJson.month24Offline = $(
				'.bang-lai-suat table tbody :nth-child(6) :nth-child(2) '
			)?.innerText;
			dataJson.month36Offline = $(
				'.bang-lai-suat table tbody :nth-child(7) :nth-child(2) '
			)?.innerText;

			dataJson.month1Online = $$(
				'.bang-lai-suat table tbody :nth-child(1) :nth-child(2) '
			)[1]?.innerText;
			dataJson.month3Online = $$(
				'.bang-lai-suat table tbody :nth-child(2) :nth-child(2) '
			)[1]?.innerText;
			dataJson.month6Online = $$(
				'.bang-lai-suat table tbody :nth-child(3) :nth-child(2) '
			)[1]?.innerText;
			dataJson.month12Online = $$(
				'.bang-lai-suat table tbody :nth-child(4) :nth-child(2) '
			)[1]?.innerText;
			dataJson.month18Online = $$(
				'.bang-lai-suat table tbody :nth-child(5) :nth-child(2) '
			)[1]?.innerText;
			dataJson.month24Online = $$(
				'.bang-lai-suat table tbody :nth-child(6) :nth-child(2) '
			)[1]?.innerText;
			dataJson.month36Online = $$(
				'.bang-lai-suat table tbody :nth-child(7) :nth-child(2) '
			)[1]?.innerText;
		} catch (err) {
			console.log(err);
		}
		return dataJson;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		console.log('loop' + attemps);
		data = await collectQueryData(urlTpbank, pageEvaluateFunc);
		attemps++;
		console.log(data);
		if (data) {
			TpbankInterestRate.findOneAndUpdate(
				{ symbol: data.symbol },
				{
					name: data.name,
					symbol: data.symbol,
					timeUpdate: data.timeUpdate,
					month1Offline: data.month1Offline,
					month3Offline: data.month3Offline,
					month6Offline: data.month6Offline,
					month12Offline: data.month12Offline,
					month18Offline: data.month18Offline,
					month24Offline: data.month24Offline,
					month36Offline: data.month36Offline,

					month1Online: data.month1Online,
					month3Online: data.month3Online,
					month6Online: data.month6Online,
					month12Online: data.month12Online,
					month18Online: data.month18Online,
					month24Online: data.month24Online,
					month36Online: data.month36Online,
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

const crawlVpbankInterestRate = asyncHandler(async () => {
	const pageEvaluateFunc = async () => {
		const $ = document.querySelector.bind(document);

		let dataJson = {};

		try {
			dataJson.name = 'Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng';
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

			dataJson.month1under300 = $(
				'.bang-lai-suat div table tbody :nth-child(1) :nth-child(2)'
			)?.innerText;
			dataJson.month6under300 = $(
				'.bang-lai-suat div table tbody :nth-child(2) :nth-child(2)'
			)?.innerText;
			dataJson.month12under300 = $(
				'.bang-lai-suat div table tbody :nth-child(3) :nth-child(2)'
			)?.innerText;
			dataJson.month24under300 = $(
				'.bang-lai-suat div table tbody :nth-child(4) :nth-child(2)'
			)?.innerText;

			dataJson.month1from300t03000 = $(
				'.bang-lai-suat div table tbody :nth-child(1) :nth-child(3)'
			)?.innerText;
			dataJson.month6from300t03000 = $(
				'.bang-lai-suat div table tbody :nth-child(2) :nth-child(3)'
			)?.innerText;
			dataJson.month12from300t03000 = $(
				'.bang-lai-suat div table tbody :nth-child(3) :nth-child(3)'
			)?.innerText;
			dataJson.month24from300t03000 = $(
				'.bang-lai-suat div table tbody :nth-child(4) :nth-child(3)'
			)?.innerText;

			dataJson.month1from3000to10000 = $(
				'.bang-lai-suat div table tbody :nth-child(1) :nth-child(4)'
			)?.innerText;
			dataJson.month6from3000to10000 = $(
				'.bang-lai-suat div table tbody :nth-child(2) :nth-child(4)'
			)?.innerText;
			dataJson.month12from3000to10000 = $(
				'.bang-lai-suat div table tbody :nth-child(3) :nth-child(4)'
			)?.innerText;
			dataJson.month24from3000to10000 = $(
				'.bang-lai-suat div table tbody :nth-child(4) :nth-child(4)'
			)?.innerText;

			dataJson.month1from10000to50000 = $(
				'.bang-lai-suat div table tbody :nth-child(1) :nth-child(5)'
			)?.innerText;
			dataJson.month6from10000to50000 = $(
				'.bang-lai-suat div table tbody :nth-child(2) :nth-child(5)'
			)?.innerText;
			dataJson.month12from10000to50000 = $(
				'.bang-lai-suat div table tbody :nth-child(3) :nth-child(5)'
			)?.innerText;
			dataJson.month24from10000to50000 = $(
				'.bang-lai-suat div table tbody :nth-child(4) :nth-child(5)'
			)?.innerText;

			dataJson.month1upper50000 = $(
				'.bang-lai-suat div table tbody :nth-child(1) :nth-child(6)'
			)?.innerText;
			dataJson.month6upper50000 = $(
				'.bang-lai-suat div table tbody :nth-child(2) :nth-child(6)'
			)?.innerText;
			dataJson.month12upper50000 = $(
				'.bang-lai-suat div table tbody :nth-child(3) :nth-child(6)'
			)?.innerText;
			dataJson.month24upper50000 = $(
				'.bang-lai-suat div table tbody :nth-child(4) :nth-child(6)'
			)?.innerText;
		} catch (err) {
			console.log(err);
		}
		return dataJson;
	};

	let data = false;
	let attemps = 0;
	//retry request until it gets data or tries 3 times
	while (data == false && attemps < 2) {
		console.log('loop' + attemps);
		data = await collectQueryData(urlVpbank, pageEvaluateFunc);
		attemps++;
		console.log(data);
		if (data) {
			VpbankInterestRate.findOneAndUpdate(
				{ symbol: data.symbol },
				{
					name: data.name,
					symbol: data.symbol,
					timeUpdate: data.timeUpdate,
					month1under300: data.month1under300,
					month6under300: data.month6under300,
					month12under300: data.month12under300,
					month24under300: data.month24under300,

					month1from300to3000: data.month1from300to3000,
					month6from300to3000: data.month6from300to3000,
					month12from300to3000: data.month12from300to3000,
					month24from300to3000: data.month24from300to3000,

					month1from3000to10000: data.month1from3000to10000,
					month6from3000to10000: data.month6from3000to10000,
					month12from3000to10000: data.month12from3000to10000,
					month24from3000to10000: data.month24from3000to10000,

					month1from10000to50000: data.month1from10000to50000,
					month6from10000to50000: data.month6from10000to50000,
					month12from10000to50000: data.month12from10000to50000,
					month24from10000to50000: data.month24from10000to50000,

					month1upper50000: data.month1upper50000,
					month6upper50000: data.month6upper50000,
					month12upper50000: data.month12upper50000,
					month24upper50000: data.month24upper50000,
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

// const crawlVietcombankInterestRate = asyncHandler(async () => {
// 	// cron.schedule('*/50 * * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlVietcombank, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let vietcombankData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name =
// 					'Ngân hàng thương mại cổ phần Ngoại thương Việt Nam';
// 				dataJson.symbol = 'Vietcombank';

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

// 				dataJson.khongkyhan = $(
// 					'#danhsachlaisuat tbody :nth-child(3) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.day7 = $(
// 					'#danhsachlaisuat tbody :nth-child(4) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.day14 = $(
// 					'#danhsachlaisuat tbody :nth-child(5) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month1 = $(
// 					'#danhsachlaisuat tbody :nth-child(6) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month2 = $(
// 					'#danhsachlaisuat tbody :nth-child(7) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month3 = $(
// 					'#danhsachlaisuat tbody :nth-child(8) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month6 = $(
// 					'#danhsachlaisuat tbody :nth-child(9) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month9 = $(
// 					'#danhsachlaisuat tbody :nth-child(10) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month12 = $(
// 					'#danhsachlaisuat tbody :nth-child(11) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month24 = $(
// 					'#danhsachlaisuat tbody :nth-child(12) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month36 = $(
// 					'#danhsachlaisuat tbody :nth-child(13) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month48 = $(
// 					'#danhsachlaisuat tbody :nth-child(14) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month60 = $(
// 					'#danhsachlaisuat tbody :nth-child(15) :nth-child(2)'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(vietcombankData);

// 		VietcombankInterestRate.findOneAndUpdate(
// 			{ symbol: vietcombankData.symbol },
// 			{
// 				name: vietcombankData.name,
// 				symbol: vietcombankData.symbol,
// 				timeUpdate: vietcombankData.timeUpdate,
// 				khongkyhan: vietcombankData.khongkyhan,
// 				day7: vietcombankData.day7,
// 				day14: vietcombankData.day14,
// 				month1: vietcombankData.month1,
// 				month2: vietcombankData.month2,
// 				month3: vietcombankData.month3,
// 				month6: vietcombankData.month6,
// 				month9: vietcombankData.month9,
// 				month12: vietcombankData.month12,
// 				month24: vietcombankData.month24,
// 				month36: vietcombankData.month36,
// 				month48: vietcombankData.month48,
// 				month60: vietcombankData.month60,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(vietcombankData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlVietinbankInterestRate = asyncHandler(async () => {
// 	// cron.schedule('*/50 * * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlVietinbank, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let vietinbankData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name =
// 					'Ngân hàng Thương mại cổ phần Công Thương Việt Nam';
// 				dataJson.symbol = 'Vietinbank';

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

// 				dataJson.khongkyhan =
// 					$('#hor-ex-b tbody :nth-child(4) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.khongkyhanBusiness =
// 					$('#hor-ex-b tbody :nth-child(4) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.under1month =
// 					$('#hor-ex-b tbody :nth-child(5) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.under1monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(5) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from1to2month =
// 					$('#hor-ex-b tbody :nth-child(6) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from1to2monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(6) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from2to3month =
// 					$('#hor-ex-b tbody :nth-child(7) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from2to3monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(7) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from3to4month =
// 					$('#hor-ex-b tbody :nth-child(8) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from3to4monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(8) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from4to5month =
// 					$('#hor-ex-b tbody :nth-child(9) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from4to5monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(9) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from5to6month =
// 					$('#hor-ex-b tbody :nth-child(10) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from5to6monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(10) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from6to7month =
// 					$('#hor-ex-b tbody :nth-child(11) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from6to7monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(11) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from7to8month =
// 					$('#hor-ex-b tbody :nth-child(12) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from7to8monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(12) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from8to9month =
// 					$('#hor-ex-b tbody :nth-child(13) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from8to9monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(13) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from9to10month =
// 					$('#hor-ex-b tbody :nth-child(14) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from9to10monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(14) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from10to11month =
// 					$('#hor-ex-b tbody :nth-child(15) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from10to11monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(15) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from11to12month =
// 					$('#hor-ex-b tbody :nth-child(16) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from11to12monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(16) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.month12 =
// 					$('#hor-ex-b tbody :nth-child(17) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.month12Business =
// 					$('#hor-ex-b tbody :nth-child(17) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from12to18month =
// 					$('#hor-ex-b tbody :nth-child(18) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from12to18monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(18) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from18to24month =
// 					$('#hor-ex-b tbody :nth-child(19) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from18to24monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(19) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.from24to36month =
// 					$('#hor-ex-b tbody :nth-child(20) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.from24to36monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(20) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.month36 =
// 					$('#hor-ex-b tbody :nth-child(21) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.month36Business =
// 					$('#hor-ex-b tbody :nth-child(21) :nth-child(5) ')
// 						?.innerText + '%';

// 				dataJson.upper36month =
// 					$('#hor-ex-b tbody :nth-child(22) :nth-child(2) ')
// 						?.innerText + '%';
// 				dataJson.upper36monthBusiness =
// 					$('#hor-ex-b tbody :nth-child(22) :nth-child(5) ')
// 						?.innerText + '%';
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(vietinbankData);

// 		VietinbankInterestRate.findOneAndUpdate(
// 			{ symbol: vietinbankData.symbol },
// 			{
// 				name: vietinbankData.name,
// 				symbol: vietinbankData.symbol,
// 				timeUpdate: vietinbankData.timeUpdate,
// 				khongkyhan: vietinbankData.khongkyhan,
// 				under1month: vietinbankData.under1month,
// 				from1to2month: vietinbankData.from1to2month,
// 				from2to3month: vietinbankData.from2to3month,
// 				from3to4month: vietinbankData.from3to4month,
// 				from4to5month: vietinbankData.from4to5month,
// 				from5to6month: vietinbankData.from5to6month,
// 				from6to7month: vietinbankData.from6to7month,
// 				from7to8month: vietinbankData.from7to8month,
// 				from8to9month: vietinbankData.from8to9month,
// 				from9to10month: vietinbankData.from9to10month,
// 				from10to11month: vietinbankData.from10to11month,
// 				from11to12month: vietinbankData.from11to12month,
// 				month12: vietinbankData.month12,
// 				from12to18month: vietinbankData.from12to18month,
// 				from18to24month: vietinbankData.from18to24month,
// 				from24to36month: vietinbankData.from24to36month,
// 				month36: vietinbankData.month36,
// 				upper36month: vietinbankData.upper36month,

// 				khongkyhanBusiness: vietinbankData.khongkyhanBusiness,
// 				under1monthBusiness: vietinbankData.under1monthBusiness,
// 				from1to2monthBusiness: vietinbankData.from1to2monthBusiness,
// 				from2to3monthBusiness: vietinbankData.from2to3monthBusiness,
// 				from3to4monthBusiness: vietinbankData.from3to4monthBusiness,
// 				from4to5monthBusiness: vietinbankData.from4to5monthBusiness,
// 				from5to6monthBusiness: vietinbankData.from5to6monthBusiness,
// 				from6to7monthBusiness: vietinbankData.from6to7monthBusiness,
// 				from7to8monthBusiness: vietinbankData.from7to8monthBusiness,
// 				from8to9monthBusiness: vietinbankData.from8to9monthBusiness,
// 				from9to10monthBusiness: vietinbankData.from9to10monthBusiness,
// 				from10to11monthBusiness: vietinbankData.from10to11monthBusiness,
// 				from11to12monthBusiness: vietinbankData.from11to12monthBusiness,
// 				month12Business: vietinbankData.month12Business,
// 				from12to18monthBusiness: vietinbankData.from12to18monthBusiness,
// 				from18to24monthBusiness: vietinbankData.from18to24monthBusiness,
// 				from24to36monthBusiness: vietinbankData.from24to36monthBusiness,
// 				month36Business: vietinbankData.month36Business,
// 				upper36monthBusiness: vietinbankData.upper36monthBusiness,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(vietinbankData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlAgribankbankInterestRate = asyncHandler(async () => {
// 	// cron.schedule('*/50 * * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlAgribank, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let agribankbankData = await page.evaluate(async () => {
// 			const $$ = document.querySelectorAll.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name =
// 					'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam';
// 				dataJson.symbol = 'Agribank';

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

// 				const table1Element = $$('table')[0];
// 				const table2Element = $$('table')[1];

// 				dataJson.khongkyhanPersonal = table1Element.querySelector(
// 					' tbody :nth-child(1) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month1Personal = table1Element.querySelector(
// 					' tbody :nth-child(2) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month2Personal = table1Element.querySelector(
// 					' tbody :nth-child(3) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month3Personal = table1Element.querySelector(
// 					' tbody :nth-child(4) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month4Personal = table1Element.querySelector(
// 					' tbody :nth-child(5) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month5Personal = table1Element.querySelector(
// 					' tbody :nth-child(6) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month6Personal = table1Element.querySelector(
// 					' tbody :nth-child(7) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month7Personal = table1Element.querySelector(
// 					' tbody :nth-child(8) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month8Personal = table1Element.querySelector(
// 					' tbody :nth-child(9) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month9Personal = table1Element.querySelector(
// 					' tbody :nth-child(10) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month10Personal = table1Element.querySelector(
// 					' tbody :nth-child(11) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month11Personal = table1Element.querySelector(
// 					' tbody :nth-child(12) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month12Personal = table1Element.querySelector(
// 					' tbody :nth-child(13) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month13Personal = table1Element.querySelector(
// 					' tbody :nth-child(14) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month15Personal = table1Element.querySelector(
// 					' tbody :nth-child(15) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month18Personal = table1Element.querySelector(
// 					' tbody :nth-child(16) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month24Personal = table1Element.querySelector(
// 					' tbody :nth-child(17) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.checkableDepositsPersonal =
// 					table1Element.querySelector(
// 						' tbody :nth-child(18) :nth-child(2)'
// 					)?.innerText;

// 				dataJson.khongkyhanBusiness = table2Element.querySelector(
// 					' tbody :nth-child(1) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month1Business = table2Element.querySelector(
// 					' tbody :nth-child(2) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month2Business = table2Element.querySelector(
// 					' tbody :nth-child(3) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month3Business = table2Element.querySelector(
// 					' tbody :nth-child(4) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month4Business = table2Element.querySelector(
// 					' tbody :nth-child(5) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month5Business = table2Element.querySelector(
// 					' tbody :nth-child(6) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month6Business = table2Element.querySelector(
// 					' tbody :nth-child(7) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month7Business = table2Element.querySelector(
// 					' tbody :nth-child(8) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month8Business = table2Element.querySelector(
// 					' tbody :nth-child(9) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month9Business = table2Element.querySelector(
// 					' tbody :nth-child(10) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month10Business = table2Element.querySelector(
// 					' tbody :nth-child(11) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month11Business = table2Element.querySelector(
// 					' tbody :nth-child(12) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month12Business = table2Element.querySelector(
// 					' tbody :nth-child(13) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month13Business = table2Element.querySelector(
// 					' tbody :nth-child(14) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month15Business = table2Element.querySelector(
// 					' tbody :nth-child(15) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month18Business = table2Element.querySelector(
// 					' tbody :nth-child(16) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month24Business = table2Element.querySelector(
// 					' tbody :nth-child(17) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.checkableDepositsBusiness =
// 					table2Element.querySelector(
// 						' tbody :nth-child(18) :nth-child(2)'
// 					)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(agribankbankData);

// 		AgribankbankInterestRate.findOneAndUpdate(
// 			{ symbol: agribankbankData.symbol },
// 			{
// 				name: agribankbankData.name,
// 				symbol: agribankbankData.symbol,
// 				timeUpdate: agribankbankData.timeUpdate,
// 				khongkyhanPersonal: agribankbankData.khongkyhanPersonal,
// 				month1Personal: agribankbankData.month1Personal,
// 				month2Personal: agribankbankData.month2Personal,
// 				month3Personal: agribankbankData.month3Personal,
// 				month4Personal: agribankbankData.month4Personal,
// 				month5Personal: agribankbankData.month5Personal,
// 				month6Personal: agribankbankData.month6Personal,
// 				month7Personal: agribankbankData.month7Personal,
// 				month8Personal: agribankbankData.month8Personal,
// 				month9Personal: agribankbankData.month9Personal,
// 				month10Personal: agribankbankData.month10Personal,
// 				month11Personal: agribankbankData.month11Personal,
// 				month12Personal: agribankbankData.month12Personal,
// 				month13Personal: agribankbankData.month13Personal,
// 				month15Personal: agribankbankData.month15Personal,
// 				month18Personal: agribankbankData.month18Personal,
// 				month24Personal: agribankbankData.month24Personal,
// 				checkableDepositsPersonal:
// 					agribankbankData.checkableDepositsPersonal,

// 				khongkyhanBusiness: agribankbankData.khongkyhanBusiness,
// 				month1Business: agribankbankData.month1Business,
// 				month2Business: agribankbankData.month2Business,
// 				month3Business: agribankbankData.month3Business,
// 				month4Business: agribankbankData.month4Business,
// 				month5Business: agribankbankData.month5Business,
// 				month6Business: agribankbankData.month6Business,
// 				month7Business: agribankbankData.month7Business,
// 				month8Business: agribankbankData.month8Business,
// 				month9Business: agribankbankData.month9Business,
// 				month10Business: agribankbankData.month10Business,
// 				month11Business: agribankbankData.month11Business,
// 				month12Business: agribankbankData.month12Business,
// 				month13Business: agribankbankData.month13Business,
// 				month15Business: agribankbankData.month15Business,
// 				month18Business: agribankbankData.month18Business,
// 				month24Business: agribankbankData.month24Business,
// 				checkableDepositsBusiness:
// 					agribankbankData.checkableDepositsBusiness,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(agribankbankData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlBidvInterestRate = asyncHandler(async () => {
// 	// cron.schedule('*/50 * * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlBidv, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let bidvbankData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name =
// 					'Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam';
// 				dataJson.symbol = 'Bidv';

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

// 				dataJson.khongkyhan = $(
// 					'#rates table tbody :nth-child(2) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month1 = $(
// 					'#rates table tbody :nth-child(3) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month2 = $(
// 					'#rates table tbody :nth-child(4) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month3 = $(
// 					'#rates table tbody :nth-child(5) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month5 = $(
// 					'#rates table tbody :nth-child(6) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month6 = $(
// 					'#rates table tbody :nth-child(7) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month9 = $(
// 					'#rates table tbody :nth-child(8) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month12 = $(
// 					'#rates table tbody :nth-child(9) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month13 = $(
// 					'#rates table tbody :nth-child(10) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month15 = $(
// 					'#rates table tbody :nth-child(11) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month18 = $(
// 					'#rates table tbody :nth-child(12) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month24 = $(
// 					'#rates table tbody :nth-child(13) :nth-child(4) '
// 				)?.innerText;
// 				dataJson.month36 = $(
// 					'#rates table tbody :nth-child(14) :nth-child(4) '
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(bidvbankData);

// 		BidvInterestRate.findOneAndUpdate(
// 			{ symbol: bidvbankData.symbol },
// 			{
// 				name: bidvbankData.name,
// 				symbol: bidvbankData.symbol,
// 				timeUpdate: bidvbankData.timeUpdate,
// 				khongkyhan: bidvbankData.khongkyhan,
// 				month1: bidvbankData.month1,
// 				month2: bidvbankData.month2,
// 				month3: bidvbankData.month3,
// 				month5: bidvbankData.month5,
// 				month6: bidvbankData.month6,
// 				month9: bidvbankData.month9,
// 				month12: bidvbankData.month12,
// 				month13: bidvbankData.month13,
// 				month15: bidvbankData.month15,
// 				month18: bidvbankData.month18,
// 				month24: bidvbankData.month24,
// 				month36: bidvbankData.month36,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(bidvbankData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlScbInterestRate = asyncHandler(async () => {
// 	// cron.schedule('*/50 * * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlScb, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let scbData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = 'Ngân hàng Thương mại Cổ phần Sài Gòn';
// 				dataJson.symbol = 'SCB';

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

// 				dataJson.khongkyhan = {};
// 				dataJson.khongkyhan.cuoiky = $(
// 					'.content-table table tbody :nth-child(1) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.khongkyhan.hangnam = $(
// 					'.content-table table tbody :nth-child(1) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.khongkyhan.hang6thang = $(
// 					'.content-table table tbody :nth-child(1) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.khongkyhan.hangquy = $(
// 					'.content-table table tbody :nth-child(1) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.khongkyhan.hangthang = $(
// 					'.content-table table tbody :nth-child(1) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.khongkyhan.truoc = $(
// 					'.content-table table tbody :nth-child(1) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month1 = {};
// 				dataJson.month1.cuoiky = $(
// 					'.content-table table tbody :nth-child(3) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month1.hangnam = $(
// 					'.content-table table tbody :nth-child(3) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month1.hang6thang = $(
// 					'.content-table table tbody :nth-child(3) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month1.hangquy = $(
// 					'.content-table table tbody :nth-child(3) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month1.hangthang = $(
// 					'.content-table table tbody :nth-child(3) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month1.truoc = $(
// 					'.content-table table tbody :nth-child(3) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month2 = {};
// 				dataJson.month2.cuoiky = $(
// 					'.content-table table tbody :nth-child(4) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month2.hangnam = $(
// 					'.content-table table tbody :nth-child(4) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month2.hang6thang = $(
// 					'.content-table table tbody :nth-child(4) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month2.hangquy = $(
// 					'.content-table table tbody :nth-child(4) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month2.hangthang = $(
// 					'.content-table table tbody :nth-child(4) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month2.truoc = $(
// 					'.content-table table tbody :nth-child(4) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month3 = {};
// 				dataJson.month3.cuoiky = $(
// 					'.content-table table tbody :nth-child(5) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month3.hangnam = $(
// 					'.content-table table tbody :nth-child(5) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month3.hang6thang = $(
// 					'.content-table table tbody :nth-child(5) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month3.hangquy = $(
// 					'.content-table table tbody :nth-child(5) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month3.hangthang = $(
// 					'.content-table table tbody :nth-child(5) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month3.truoc = $(
// 					'.content-table table tbody :nth-child(5) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month4 = {};
// 				dataJson.month4.cuoiky = $(
// 					'.content-table table tbody :nth-child(6) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month4.hangnam = $(
// 					'.content-table table tbody :nth-child(6) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month4.hang6thang = $(
// 					'.content-table table tbody :nth-child(6) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month4.hangquy = $(
// 					'.content-table table tbody :nth-child(6) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month4.hangthang = $(
// 					'.content-table table tbody :nth-child(6) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month4.truoc = $(
// 					'.content-table table tbody :nth-child(6) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month5 = {};
// 				dataJson.month5.cuoiky = $(
// 					'.content-table table tbody :nth-child(7) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month5.hangnam = $(
// 					'.content-table table tbody :nth-child(7) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month5.hang6thang = $(
// 					'.content-table table tbody :nth-child(7) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month5.hangquy = $(
// 					'.content-table table tbody :nth-child(7) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month5.hangthang = $(
// 					'.content-table table tbody :nth-child(7) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month5.truoc = $(
// 					'.content-table table tbody :nth-child(7) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month6 = {};
// 				dataJson.month6.cuoiky = $(
// 					'.content-table table tbody :nth-child(8) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month6.hangnam = $(
// 					'.content-table table tbody :nth-child(8) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month6.hang6thang = $(
// 					'.content-table table tbody :nth-child(8) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month6.hangquy = $(
// 					'.content-table table tbody :nth-child(8) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month6.hangthang = $(
// 					'.content-table table tbody :nth-child(8) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month6.truoc = $(
// 					'.content-table table tbody :nth-child(8) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month7 = {};
// 				dataJson.month7.cuoiky = $(
// 					'.content-table table tbody :nth-child(9) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month7.hangnam = $(
// 					'.content-table table tbody :nth-child(9) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month7.hang6thang = $(
// 					'.content-table table tbody :nth-child(9) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month7.hangquy = $(
// 					'.content-table table tbody :nth-child(9) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month7.hangthang = $(
// 					'.content-table table tbody :nth-child(9) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month7.truoc = $(
// 					'.content-table table tbody :nth-child(9) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month8 = {};
// 				dataJson.month8.cuoiky = $(
// 					'.content-table table tbody :nth-child(10) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month8.hangnam = $(
// 					'.content-table table tbody :nth-child(10) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month8.hang6thang = $(
// 					'.content-table table tbody :nth-child(10) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month8.hangquy = $(
// 					'.content-table table tbody :nth-child(10) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month8.hangthang = $(
// 					'.content-table table tbody :nth-child(10) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month8.truoc = $(
// 					'.content-table table tbody :nth-child(10) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month9 = {};
// 				dataJson.month9.cuoiky = $(
// 					'.content-table table tbody :nth-child(11) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month9.hangnam = $(
// 					'.content-table table tbody :nth-child(11) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month9.hang6thang = $(
// 					'.content-table table tbody :nth-child(11) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month9.hangquy = $(
// 					'.content-table table tbody :nth-child(11) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month9.hangthang = $(
// 					'.content-table table tbody :nth-child(11) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month9.truoc = $(
// 					'.content-table table tbody :nth-child(11) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month10 = {};
// 				dataJson.month10.cuoiky = $(
// 					'.content-table table tbody :nth-child(12) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month10.hangnam = $(
// 					'.content-table table tbody :nth-child(12) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month10.hang6thang = $(
// 					'.content-table table tbody :nth-child(12) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month10.hangquy = $(
// 					'.content-table table tbody :nth-child(12) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month10.hangthang = $(
// 					'.content-table table tbody :nth-child(12) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month10.truoc = $(
// 					'.content-table table tbody :nth-child(12) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month11 = {};
// 				dataJson.month11.cuoiky = $(
// 					'.content-table table tbody :nth-child(13) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month11.hangnam = $(
// 					'.content-table table tbody :nth-child(13) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month11.hang6thang = $(
// 					'.content-table table tbody :nth-child(13) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month11.hangquy = $(
// 					'.content-table table tbody :nth-child(13) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month11.hangthang = $(
// 					'.content-table table tbody :nth-child(13) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month11.truoc = $(
// 					'.content-table table tbody :nth-child(13) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month12 = {};
// 				dataJson.month12.cuoiky = $(
// 					'.content-table table tbody :nth-child(14) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month12.hangnam = $(
// 					'.content-table table tbody :nth-child(14) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month12.hang6thang = $(
// 					'.content-table table tbody :nth-child(14) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month12.hangquy = $(
// 					'.content-table table tbody :nth-child(14) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month12.hangthang = $(
// 					'.content-table table tbody :nth-child(14) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month12.truoc = $(
// 					'.content-table table tbody :nth-child(14) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month15 = {};
// 				dataJson.month15.cuoiky = $(
// 					'.content-table table tbody :nth-child(15) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month15.hangnam = $(
// 					'.content-table table tbody :nth-child(15) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month15.hang6thang = $(
// 					'.content-table table tbody :nth-child(15) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month15.hangquy = $(
// 					'.content-table table tbody :nth-child(15) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month15.hangthang = $(
// 					'.content-table table tbody :nth-child(15) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month15.truoc = $(
// 					'.content-table table tbody :nth-child(15) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month18 = {};
// 				dataJson.month18.cuoiky = $(
// 					'.content-table table tbody :nth-child(16) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month18.hangnam = $(
// 					'.content-table table tbody :nth-child(16) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month18.hang6thang = $(
// 					'.content-table table tbody :nth-child(16) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month18.hangquy = $(
// 					'.content-table table tbody :nth-child(16) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month18.hangthang = $(
// 					'.content-table table tbody :nth-child(16) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month18.truoc = $(
// 					'.content-table table tbody :nth-child(16) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month24 = {};
// 				dataJson.month24.cuoiky = $(
// 					'.content-table table tbody :nth-child(17) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month24.hangnam = $(
// 					'.content-table table tbody :nth-child(17) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month24.hang6thang = $(
// 					'.content-table table tbody :nth-child(17) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month24.hangquy = $(
// 					'.content-table table tbody :nth-child(17) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month24.hangthang = $(
// 					'.content-table table tbody :nth-child(17) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month24.truoc = $(
// 					'.content-table table tbody :nth-child(17) :nth-child(7)'
// 				)?.innerText;

// 				dataJson.month36 = {};
// 				dataJson.month36.cuoiky = $(
// 					'.content-table table tbody :nth-child(18) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month36.hangnam = $(
// 					'.content-table table tbody :nth-child(18) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month36.hang6thang = $(
// 					'.content-table table tbody :nth-child(18) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month36.hangquy = $(
// 					'.content-table table tbody :nth-child(18) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month36.hangthang = $(
// 					'.content-table table tbody :nth-child(18) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month36.truoc = $(
// 					'.content-table table tbody :nth-child(18) :nth-child(7)'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(scbData);

// 		ScbInterestRate.findOneAndUpdate(
// 			{ symbol: scbData.symbol },
// 			{
// 				name: scbData.name,
// 				symbol: scbData.symbol,
// 				timeUpdate: scbData.timeUpdate,

// 				'khongkyhan.cuoiky': scbData.khongkyhan.cuoiky,
// 				'khongkyhan.hangnam': scbData.khongkyhan.hangnam,
// 				'khongkyhan.hang6thang': scbData.khongkyhan.hang6thang,
// 				'khongkyhan.hangquy': scbData.khongkyhan.hangquy,
// 				'khongkyhan.hangthang': scbData.khongkyhan.hangthang,
// 				'khongkyhan.truoc': scbData.khongkyhan.truoc,

// 				'month1.cuoiky': scbData.month1.cuoiky,
// 				'month1.hangnam': scbData.month1.hangnam,
// 				'month1.hang6thang': scbData.month1.hang6thang,
// 				'month1.hangquy': scbData.month1.hangquy,
// 				'month1.hangthang': scbData.month1.hangthang,
// 				'month1.truoc': scbData.month1.truoc,

// 				'month2.cuoiky': scbData.month2.cuoiky,
// 				'month2.hangnam': scbData.month2.hangnam,
// 				'month2.hang6thang': scbData.month2.hang6thang,
// 				'month2.hangquy': scbData.month2.hangquy,
// 				'month2.hangthang': scbData.month2.hangthang,
// 				'month2.truoc': scbData.month2.truoc,

// 				'month3.cuoiky': scbData.month3.cuoiky,
// 				'month3.hangnam': scbData.month3.hangnam,
// 				'month3.hang6thang': scbData.month3.hang6thang,
// 				'month3.hangquy': scbData.month3.hangquy,
// 				'month3.hangthang': scbData.month3.hangthang,
// 				'month3.truoc': scbData.month3.truoc,

// 				'month4.cuoiky': scbData.month4.cuoiky,
// 				'month4.hangnam': scbData.month4.hangnam,
// 				'month4.hang6thang': scbData.month4.hang6thang,
// 				'month4.hangquy': scbData.month4.hangquy,
// 				'month4.hangthang': scbData.month4.hangthang,
// 				'month4.truoc': scbData.month4.truoc,

// 				'month5.cuoiky': scbData.month5.cuoiky,
// 				'month5.hangnam': scbData.month5.hangnam,
// 				'month5.hang6thang': scbData.month5.hang6thang,
// 				'month5.hangquy': scbData.month5.hangquy,
// 				'month5.hangthang': scbData.month5.hangthang,
// 				'month5.truoc': scbData.month5.truoc,

// 				'month6.cuoiky': scbData.month6.cuoiky,
// 				'month6.hangnam': scbData.month6.hangnam,
// 				'month6.hang6thang': scbData.month6.hang6thang,
// 				'month6.hangquy': scbData.month6.hangquy,
// 				'month6.hangthang': scbData.month6.hangthang,
// 				'month6.truoc': scbData.month6.truoc,

// 				'month7.cuoiky': scbData.month7.cuoiky,
// 				'month7.hangnam': scbData.month7.hangnam,
// 				'month7.hang6thang': scbData.month7.hang6thang,
// 				'month7.hangquy': scbData.month7.hangquy,
// 				'month7.hangthang': scbData.month7.hangthang,
// 				'month7.truoc': scbData.month7.truoc,

// 				'month8.cuoiky': scbData.month8.cuoiky,
// 				'month8.hangnam': scbData.month8.hangnam,
// 				'month8.hang6thang': scbData.month8.hang6thang,
// 				'month8.hangquy': scbData.month8.hangquy,
// 				'month8.hangthang': scbData.month8.hangthang,
// 				'month8.truoc': scbData.month8.truoc,

// 				'month9.cuoiky': scbData.month9.cuoiky,
// 				'month9.hangnam': scbData.month9.hangnam,
// 				'month9.hang6thang': scbData.month9.hang6thang,
// 				'month9.hangquy': scbData.month9.hangquy,
// 				'month9.hangthang': scbData.month9.hangthang,
// 				'month9.truoc': scbData.month9.truoc,

// 				'month10.cuoiky': scbData.month10.cuoiky,
// 				'month10.hangnam': scbData.month10.hangnam,
// 				'month10.hang6thang': scbData.month10.hang6thang,
// 				'month10.hangquy': scbData.month10.hangquy,
// 				'month10.hangthang': scbData.month10.hangthang,
// 				'month10.truoc': scbData.month10.truoc,

// 				'month11.cuoiky': scbData.month11.cuoiky,
// 				'month11.hangnam': scbData.month11.hangnam,
// 				'month11.hang6thang': scbData.month11.hang6thang,
// 				'month11.hangquy': scbData.month11.hangquy,
// 				'month11.hangthang': scbData.month11.hangthang,
// 				'month11.truoc': scbData.month11.truoc,

// 				'month12.cuoiky': scbData.month12.cuoiky,
// 				'month12.hangnam': scbData.month12.hangnam,
// 				'month12.hang6thang': scbData.month12.hang6thang,
// 				'month12.hangquy': scbData.month12.hangquy,
// 				'month12.hangthang': scbData.month12.hangthang,
// 				'month12.truoc': scbData.month12.truoc,

// 				'month15.cuoiky': scbData.month15.cuoiky,
// 				'month15.hangnam': scbData.month15.hangnam,
// 				'month15.hang6thang': scbData.month15.hang6thang,
// 				'month15.hangquy': scbData.month15.hangquy,
// 				'month15.hangthang': scbData.month15.hangthang,
// 				'month15.truoc': scbData.month15.truoc,

// 				'month18.cuoiky': scbData.month18.cuoiky,
// 				'month18.hangnam': scbData.month18.hangnam,
// 				'month18.hang6thang': scbData.month18.hang6thang,
// 				'month18.hangquy': scbData.month18.hangquy,
// 				'month18.hangthang': scbData.month18.hangthang,
// 				'month18.truoc': scbData.month18.truoc,

// 				'month24.cuoiky': scbData.month24.cuoiky,
// 				'month24.hangnam': scbData.month24.hangnam,
// 				'month24.hang6thang': scbData.month24.hang6thang,
// 				'month24.hangquy': scbData.month24.hangquy,
// 				'month24.hangthang': scbData.month24.hangthang,
// 				'month24.truoc': scbData.month24.truoc,

// 				'month36.cuoiky': scbData.month36.cuoiky,
// 				'month36.hangnam': scbData.month36.hangnam,
// 				'month36.hang6thang': scbData.month36.hang6thang,
// 				'month36.hangquy': scbData.month36.hangquy,
// 				'month36.hangthang': scbData.month36.hangthang,
// 				'month36.truoc': scbData.month36.truoc,

// 				'khongkyhan.cuoiky': scbData.khongkyhan.cuoiky,
// 				'khongkyhan.hangnam': scbData.khongkyhan.hangnam,
// 				'khongkyhan.hang6thang': scbData.khongkyhan.hang6thang,
// 				'khongkyhan.hangquy': scbData.khongkyhan.hangquy,
// 				'khongkyhan.hangthang': scbData.khongkyhan.hangthang,
// 				'khongkyhan.truoc': scbData.khongkyhan.truoc,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(scbData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlMbbankInterestRate = asyncHandler(async () => {
// 	// cron.schedule('*/50 * * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlMbbank, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let mbbankData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = 'Ngân hàng Thương mại Cổ phần Quân đội';
// 				dataJson.symbol = 'Mbbank';

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

// 				dataJson.khongkyhan = $(
// 					'section.bang-lai-suat tbody :nth-child(1) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.week1 = $(
// 					'section.bang-lai-suat tbody :nth-child(2) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.week2 = $(
// 					'section.bang-lai-suat tbody :nth-child(3) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.week3 = $(
// 					'section.bang-lai-suat tbody :nth-child(4) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month1 = $(
// 					'section.bang-lai-suat tbody :nth-child(5) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month2 = $(
// 					'section.bang-lai-suat tbody :nth-child(6) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month3 = $(
// 					'section.bang-lai-suat tbody :nth-child(7) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month4 = $(
// 					'section.bang-lai-suat tbody :nth-child(8) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month5 = $(
// 					'section.bang-lai-suat tbody :nth-child(9) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month6 = $(
// 					'section.bang-lai-suat tbody :nth-child(10) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month7 = $(
// 					'section.bang-lai-suat tbody :nth-child(11) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month8 = $(
// 					'section.bang-lai-suat tbody :nth-child(12) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month9 = $(
// 					'section.bang-lai-suat tbody :nth-child(13) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month10 = $(
// 					'section.bang-lai-suat tbody :nth-child(14) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month11 = $(
// 					'section.bang-lai-suat tbody :nth-child(15) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month12 = $(
// 					'section.bang-lai-suat tbody :nth-child(16) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month13 = $(
// 					'section.bang-lai-suat tbody :nth-child(17) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month15 = $(
// 					'section.bang-lai-suat tbody :nth-child(18) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month18 = $(
// 					'section.bang-lai-suat tbody :nth-child(19) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month24 = $(
// 					'section.bang-lai-suat tbody :nth-child(20) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month36 = $(
// 					'section.bang-lai-suat tbody :nth-child(21) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month48 = $(
// 					'section.bang-lai-suat tbody :nth-child(22) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month60 = $(
// 					'section.bang-lai-suat tbody :nth-child(23) :nth-child(2)'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(mbbankData);

// 		MbbankInterestRate.findOneAndUpdate(
// 			{ symbol: mbbankData.symbol },
// 			{
// 				name: mbbankData.name,
// 				symbol: mbbankData.symbol,
// 				timeUpdate: mbbankData.timeUpdate,
// 				khongkyhan: mbbankData.khongkyhan,
// 				week1: mbbankData.week1,
// 				week2: mbbankData.week2,
// 				week3: mbbankData.week3,
// 				month1: mbbankData.month1,
// 				month2: mbbankData.month2,
// 				month3: mbbankData.month3,
// 				month4: mbbankData.month4,
// 				month5: mbbankData.month5,
// 				month6: mbbankData.month6,
// 				month7: mbbankData.month7,
// 				month8: mbbankData.month8,
// 				month9: mbbankData.month9,
// 				month10: mbbankData.month10,
// 				month11: mbbankData.month11,
// 				month12: mbbankData.month12,
// 				month13: mbbankData.month13,
// 				month15: mbbankData.month15,
// 				month18: mbbankData.month18,
// 				month24: mbbankData.month24,
// 				month36: mbbankData.month36,
// 				month48: mbbankData.month48,
// 				month60: mbbankData.month60,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(mbbankData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlVibInterestRate = asyncHandler(async () => {
// 	// cron.schedule('*/50 * * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlVib, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let vibData = await page.evaluate(async () => {
// 			const $$ = document.querySelectorAll.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = 'Ngân hàng Thương mại Cổ phần Quốc tế Việt Nam';
// 				dataJson.symbol = 'VIB';

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

// 				const tableElement = $$(
// 					' .vib-v2-right-box-table-expression'
// 				)[0];

// 				dataJson.under1monthfrom10tounder300 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(6)'
// 					)[0]?.innerText;
// 				dataJson.month1from10tounder300 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(3)'
// 				)[0]?.innerText;
// 				dataJson.month2from10tounder300 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(7)'
// 				)[0]?.innerText;
// 				dataJson.month345from10tounder300 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(8)'
// 					)[0]?.innerText;
// 				dataJson.month6from10tounder300 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(4)'
// 				)[0]?.innerText;
// 				dataJson.month7from10tounder300 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(9)'
// 				)[0]?.innerText;
// 				dataJson.month8from10tounder300 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(10)'
// 				)[0]?.innerText;
// 				dataJson.month9from10tounder300 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(11)'
// 				)[0]?.innerText;
// 				dataJson.month10from10tounder300 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(12)'
// 					)[0]?.innerText;
// 				dataJson.month11from10tounder300 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(13)'
// 					)[0]?.innerText;
// 				dataJson.month1213from10tounder300 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(14)'
// 					)[0]?.innerText;
// 				dataJson.month15from10tounder300 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(15)'
// 					)[0]?.innerText;
// 				dataJson.month18from10tounder300 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(16)'
// 					)[0]?.innerText;
// 				dataJson.month24from10tounder300 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(17)'
// 					)[0]?.innerText;
// 				dataJson.month36from10tounder300 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(18)'
// 					)[0]?.innerText;

// 				dataJson.under1monthfrom300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(6)'
// 					)[1]?.innerText;
// 				dataJson.month1from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(3)'
// 					)[1]?.innerText;
// 				dataJson.month2from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(7)'
// 					)[1]?.innerText;
// 				dataJson.month345from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(8)'
// 					)[1]?.innerText;
// 				dataJson.month6from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(4)'
// 					)[1]?.innerText;
// 				dataJson.month7from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(9)'
// 					)[1]?.innerText;
// 				dataJson.month8from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(10)'
// 					)[1]?.innerText;
// 				dataJson.month9from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(11)'
// 					)[1]?.innerText;
// 				dataJson.month10from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(12)'
// 					)[1]?.innerText;
// 				dataJson.month11from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(13)'
// 					)[1]?.innerText;
// 				dataJson.month1213from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(14)'
// 					)[1]?.innerText;
// 				dataJson.month15from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(15)'
// 					)[1]?.innerText;
// 				dataJson.month18from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(16)'
// 					)[1]?.innerText;
// 				dataJson.month24from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(17)'
// 					)[1]?.innerText;
// 				dataJson.month36from300tounder3000 =
// 					tableElement.querySelectorAll(
// 						'div .vib-v2-box-slider-expression :nth-child(18)'
// 					)[1]?.innerText;

// 				dataJson.under1monthupper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(6)'
// 				)[2]?.innerText;
// 				dataJson.month1upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(3)'
// 				)[2]?.innerText;
// 				dataJson.month2upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(7)'
// 				)[2]?.innerText;
// 				dataJson.month345upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(8)'
// 				)[2]?.innerText;
// 				dataJson.month6upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(4)'
// 				)[2]?.innerText;
// 				dataJson.month7upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(9)'
// 				)[2]?.innerText;
// 				dataJson.month8upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(10)'
// 				)[2]?.innerText;
// 				dataJson.month9upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(11)'
// 				)[2]?.innerText;
// 				dataJson.month10upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(12)'
// 				)[2]?.innerText;
// 				dataJson.month11upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(13)'
// 				)[2]?.innerText;
// 				dataJson.month1213upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(14)'
// 				)[2]?.innerText;
// 				dataJson.month15upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(15)'
// 				)[2]?.innerText;
// 				dataJson.month18upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(16)'
// 				)[2]?.innerText;
// 				dataJson.month24upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(17)'
// 				)[2]?.innerText;
// 				dataJson.month36upper3000 = tableElement.querySelectorAll(
// 					'div .vib-v2-box-slider-expression :nth-child(18)'
// 				)[2]?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(vibData);

// 		VibInterestRate.findOneAndUpdate(
// 			{ symbol: vibData.symbol },
// 			{
// 				name: vibData.name,
// 				symbol: vibData.symbol,
// 				timeUpdate: vibData.timeUpdate,
// 				under1monthfrom10tounder300:
// 					vibData.under1monthfrom10tounder300,
// 				month1from10tounder300: vibData.month1from10tounder300,
// 				month2from10tounder300: vibData.month2from10tounder300,
// 				month345from10tounder300: vibData.month345from10tounder300,
// 				month6from10tounder300: vibData.month6from10tounder300,
// 				month7from10tounder300: vibData.month7from10tounder300,
// 				month8from10tounder300: vibData.month8from10tounder300,
// 				month9from10tounder300: vibData.month9from10tounder300,
// 				month10from10tounder300: vibData.month10from10tounder300,
// 				month11from10tounder300: vibData.month11from10tounder300,
// 				month1213from10tounder300: vibData.month1213from10tounder300,
// 				month15from10tounder300: vibData.month15from10tounder300,
// 				month18from10tounder300: vibData.month18from10tounder300,
// 				month24from10tounder300: vibData.month24from10tounder300,
// 				month36from10tounder300: vibData.month36from10tounder300,

// 				under1monthfrom300tounder3000:
// 					vibData.under1monthfrom300tounder3000,
// 				month1from300tounder3000: vibData.month1from300tounder3000,
// 				month2from300tounder3000: vibData.month2from300tounder3000,
// 				month345from300tounder3000: vibData.month345from300tounder3000,
// 				month6from300tounder3000: vibData.month6from300tounder3000,
// 				month7from300tounder3000: vibData.month7from300tounder3000,
// 				month8from300tounder3000: vibData.month8from300tounder3000,
// 				month9from300tounder3000: vibData.month9from300tounder3000,
// 				month10from300tounder3000: vibData.month10from300tounder3000,
// 				month11from300tounder3000: vibData.month11from300tounder3000,
// 				month1213from300tounder3000:
// 					vibData.month1213from300tounder3000,
// 				month15from300tounder3000: vibData.month15from300tounder3000,
// 				month18from300tounder3000: vibData.month18from300tounder3000,
// 				month24from300tounder3000: vibData.month24from300tounder3000,
// 				month36from300tounder3000: vibData.month36from300tounder3000,

// 				under1monthupper3000: vibData.under1monthupper3000,
// 				month1upper3000: vibData.month1upper3000,
// 				month2upper3000: vibData.month2upper3000,
// 				month345upper3000: vibData.month345upper3000,
// 				month6upper3000: vibData.month6upper3000,
// 				month7upper3000: vibData.month7upper3000,
// 				month8upper3000: vibData.month8upper3000,
// 				month9upper3000: vibData.month9upper3000,
// 				month10upper3000: vibData.month10upper3000,
// 				month11upper3000: vibData.month11upper3000,
// 				month1213upper3000: vibData.month1213upper3000,
// 				month15upper3000: vibData.month15upper3000,
// 				month18upper3000: vibData.month18upper3000,
// 				month24upper3000: vibData.month24upper3000,
// 				month36upper3000: vibData.month36upper3000,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(vibData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlTpbankInterestRate = asyncHandler(async () => {
// 	// cron.schedule('*/50 * * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlTpbank, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let tpbankData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);
// 			const $$ = document.querySelectorAll.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = 'Ngân hàng Thương mại Cổ phần Tiên Phong';
// 				dataJson.symbol = 'Tpbank';

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

// 				dataJson.month1Offline = $(
// 					'.bang-lai-suat table tbody :nth-child(1) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.month3Offline = $(
// 					'.bang-lai-suat table tbody :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.mont6Offline = $(
// 					'.bang-lai-suat table tbody :nth-child(3) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.month12Offline = $(
// 					'.bang-lai-suat table tbody :nth-child(4) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.month18Offline = $(
// 					'.bang-lai-suat table tbody :nth-child(5) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.month24Offline = $(
// 					'.bang-lai-suat table tbody :nth-child(6) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.month36Offline = $(
// 					'.bang-lai-suat table tbody :nth-child(7) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.month1Online = $$(
// 					'.bang-lai-suat table tbody :nth-child(1) :nth-child(2) '
// 				)[1]?.innerText;
// 				dataJson.month3Online = $$(
// 					'.bang-lai-suat table tbody :nth-child(2) :nth-child(2) '
// 				)[1]?.innerText;
// 				dataJson.month6Online = $$(
// 					'.bang-lai-suat table tbody :nth-child(3) :nth-child(2) '
// 				)[1]?.innerText;
// 				dataJson.month12Online = $$(
// 					'.bang-lai-suat table tbody :nth-child(4) :nth-child(2) '
// 				)[1]?.innerText;
// 				dataJson.month18Online = $$(
// 					'.bang-lai-suat table tbody :nth-child(5) :nth-child(2) '
// 				)[1]?.innerText;
// 				dataJson.month24Online = $$(
// 					'.bang-lai-suat table tbody :nth-child(6) :nth-child(2) '
// 				)[1]?.innerText;
// 				dataJson.month36Online = $$(
// 					'.bang-lai-suat table tbody :nth-child(7) :nth-child(2) '
// 				)[1]?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(tpbankData);
// 		TpbankInterestRate.findOneAndUpdate(
// 			{ symbol: tpbankData.symbol },
// 			{
// 				name: tpbankData.name,
// 				symbol: tpbankData.symbol,
// 				timeUpdate: tpbankData.timeUpdate,
// 				month1Offline: tpbankData.month1Offline,
// 				month3Offline: tpbankData.month3Offline,
// 				month6Offline: tpbankData.month6Offline,
// 				month12Offline: tpbankData.month12Offline,
// 				month18Offline: tpbankData.month18Offline,
// 				month24Offline: tpbankData.month24Offline,
// 				month36Offline: tpbankData.month36Offline,

// 				month1Online: tpbankData.month1Online,
// 				month3Online: tpbankData.month3Online,
// 				month6Online: tpbankData.month6Online,
// 				month12Online: tpbankData.month12Online,
// 				month18Online: tpbankData.month18Online,
// 				month24Online: tpbankData.month24Online,
// 				month36Online: tpbankData.month36Online,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(tpbankData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlVpbankInterestRate = asyncHandler(async () => {
// 	// cron.schedule('*/50 * * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlVpbank, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let vpbankData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name =
// 					'Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng';
// 				dataJson.symbol = 'Vpbank';

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

// 				dataJson.month1under300 = $(
// 					'.bang-lai-suat div table tbody :nth-child(1) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month6under300 = $(
// 					'.bang-lai-suat div table tbody :nth-child(2) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month12under300 = $(
// 					'.bang-lai-suat div table tbody :nth-child(3) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.month24under300 = $(
// 					'.bang-lai-suat div table tbody :nth-child(4) :nth-child(2)'
// 				)?.innerText;

// 				dataJson.month1from300t03000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(1) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month6from300t03000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(2) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month12from300t03000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(3) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.month24from300t03000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(4) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.month1from3000to10000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(1) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month6from3000to10000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(2) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month12from3000to10000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(3) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.month24from3000to10000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(4) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.month1from10000to50000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(1) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month6from10000to50000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(2) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month12from10000to50000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(3) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.month24from10000to50000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(4) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.month1upper50000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(1) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month6upper50000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(2) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month12upper50000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(3) :nth-child(6)'
// 				)?.innerText;
// 				dataJson.month24upper50000 = $(
// 					'.bang-lai-suat div table tbody :nth-child(4) :nth-child(6)'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(vpbankData);

// 		VpbankInterestRate.findOneAndUpdate(
// 			{ symbol: vpbankData.symbol },
// 			{
// 				name: vpbankData.name,
// 				symbol: vpbankData.symbol,
// 				timeUpdate: vpbankData.timeUpdate,
// 				month1under300: vpbankData.month1under300,
// 				month6under300: vpbankData.month6under300,
// 				month12under300: vpbankData.month12under300,
// 				month24under300: vpbankData.month24under300,

// 				month1from300to3000: vpbankData.month1from300to3000,
// 				month6from300to3000: vpbankData.month6from300to3000,
// 				month12from300to3000: vpbankData.month12from300to3000,
// 				month24from300to3000: vpbankData.month24from300to3000,

// 				month1from3000to10000: vpbankData.month1from3000to10000,
// 				month6from3000to10000: vpbankData.month6from3000to10000,
// 				month12from3000to10000: vpbankData.month12from3000to10000,
// 				month24from3000to10000: vpbankData.month24from3000to10000,

// 				month1from10000to50000: vpbankData.month1from10000to50000,
// 				month6from10000to50000: vpbankData.month6from10000to50000,
// 				month12from10000to50000: vpbankData.month12from10000to50000,
// 				month24from10000to50000: vpbankData.month24from10000to50000,

// 				month1upper50000: vpbankData.month1upper50000,
// 				month6upper50000: vpbankData.month6upper50000,
// 				month12upper50000: vpbankData.month12upper50000,
// 				month24upper50000: vpbankData.month24upper50000,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(vpbankData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });
