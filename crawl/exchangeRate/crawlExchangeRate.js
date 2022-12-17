const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');

const {
	collectQueryData,
	collectQueryDataHeightScroll,
} = require('../../utils/pupperteer/collectQueryData');

const Agribank = require('../../model/exchangeRate/agribankModel');
const Vietcombank = require('../../model/exchangeRate/vietcombankModel');
const Bidv = require('../../model/exchangeRate/bidvModel');
const Techcombank = require('../../model/exchangeRate/techcombankModel');
const Vietinbank = require('../../model/exchangeRate/vietinbankModel');
const Mbbank = require('../../model/exchangeRate/mbbankModel');

const urlAgribank = 'https://webtygia.com/ty-gia/agribank.html';
const urlVietcombank = 'https://webtygia.com/ty-gia/vietcombank.html';
const urlBidv = 'https://webtygia.com/ty-gia/bidv.html';
const urlTechcombank = 'https://webtygia.com/ty-gia/techcombank.html';
const urlVietinbank = 'https://webtygia.com/ty-gia/vietinbank.html';
const urlMbbank = 'https://webtygia.com/ty-gia/mbbank.html';

const crawlAgribank = async () => {
	const result = await axios(urlAgribank)
		.then((res) => res.data)
		.catch((err) => console.log(err));

	const $ = cheerio.load(result);

	let dataJson = {};

	try {
		dataJson.name =
			'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam';
		dataJson.symbol = 'Agribank';

		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);

		dataJson.usdBuyCast = $('#myTable tbody :nth-child(1) :nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.usdBuyTransfer = $(
			'#myTable tbody :nth-child(1) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.usdSell = $('#myTable tbody :nth-child(1) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.eurBuyCast = $('#myTable tbody :nth-child(3) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.eurBuyTransfer = $(
			'#myTable tbody :nth-child(3) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.eurSell = $('#myTable tbody :nth-child(3) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.gbpBuyCast = $('#myTable tbody :nth-child(5) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.gbpBuyTransfer = $(
			'#myTable tbody :nth-child(5) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.gbpSell = $('#myTable tbody :nth-child(5) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.hkdBuyCast = $('#myTable tbody :nth-child(9) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.hkdBuyTransfer = $(
			'#myTable tbody :nth-child(9) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.hkdSell = $('#myTable tbody :nth-child(9) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.chfBuyCast = $('#myTable tbody :nth-child(4) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.chfBuyTransfer = $(
			'#myTable tbody :nth-child(4) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.chfSell = $('#myTable tbody :nth-child(4) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.jpyBuyCast = $('#myTable tbody :nth-child(2) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.jpyBuyTransfer = $(
			'#myTable tbody :nth-child(2) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.jpySell = $('#myTable tbody :nth-child(2) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.audBuyCast = $('#myTable tbody :nth-child(6) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.audBuyTransfer = $(
			'#myTable tbody :nth-child(6) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.audSell = $('#myTable tbody :nth-child(6) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.sgdBuyCast = $('#myTable tbody :nth-child(7) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sgdBuyTransfer = $(
			'#myTable tbody :nth-child(7) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.sgdSell = $('#myTable tbody :nth-child(7) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.thbBuyCast = $('#myTable tbody :nth-child(10) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.thbBuyTransfer = $(
			'#myTable tbody :nth-child(10) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.thbSell = $('#myTable tbody :nth-child(10) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.cadBuyCast = $('#myTable tbody :nth-child(8) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.cadBuyTransfer = $(
			'#myTable tbody :nth-child(8) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.cadSell = $('#myTable tbody :nth-child(8) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.nzdBuyCast = $('#myTable tbody :nth-child(11) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nzdBuyTransfer = $(
			'#myTable tbody :nth-child(11) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.nzdSell = $('#myTable tbody :nth-child(11) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.krwBuyCast = $('#myTable tbody :nth-child(12) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\,/g, '');
		dataJson.krwBuyTransfer = $(
			'#myTable tbody :nth-child(12) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\,/g, '');
		dataJson.krwSell = $('#myTable tbody :nth-child(12) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\,/g, '');
	} catch (err) {
		console.log(err);
	}

	Agribank.findOneAndUpdate(
		{ symbol: dataJson.symbol },
		{
			name: dataJson.name,
			symbol: dataJson.symbol,
			timeUpdate: dataJson.timeUpdate,

			usdBuyCast: dataJson.usdBuyCast,
			usdBuyTransfer: dataJson.usdBuyTransfer,
			// usdSellTransfer: dataJson.usdSellTransfer,
			usdSell: dataJson.usdSell,

			eurBuyCast: dataJson.eurBuyCast,
			eurBuyTransfer: dataJson.eurBuyTransfer,
			// eurSellTransfer: dataJson.eurSellTransfer,
			eurSell: dataJson.eurSell,

			gbpBuyCast: dataJson.gbpBuyCast,
			gbpBuyTransfer: dataJson.gbpBuyTransfer,
			// gbpSellTransfer: dataJson.gbpSellTransfer,
			gbpSell: dataJson.gbpSell,

			jpyBuyCast: dataJson.jpyBuyCast,
			jpyBuyTransfer: dataJson.jpyBuyTransfer,
			// jpySellTransfer: dataJson.jpySellTransfer,
			jpySell: dataJson.jpySell,

			audBuyCast: dataJson.audBuyCast,
			audBuyTransfer: dataJson.audBuyTransfer,
			// audSellTransfer: dataJson.audSellTransfer,
			audSell: dataJson.audSell,

			cadBuyCast: dataJson.cadBuyCast,
			cadBuyTransfer: dataJson.cadBuyTransfer,
			// cadSellTransfer: dataJson.cadSellTransfer,
			cadSell: dataJson.cadSell,

			nzdBuyCast: dataJson.nzdBuyCast,
			nzdBuyTransfer: dataJson.nzdBuyTransfer,
			// nzdSellTransfer: dataJson.nzdSellTransfer,
			nzdSell: dataJson.nzdSell,

			sgdBuyCast: dataJson.sgdBuyCast,
			sgdBuyTransfer: dataJson.sgdBuyTransfer,
			// sgdSellTransfer: dataJson.sgdSellTransfer,
			sgdSell: dataJson.sgdSell,

			chfBuyCast: dataJson.chfBuyCast,
			chfBuyTransfer: dataJson.chfBuyTransfer,
			// chfSellTransfer: dataJson.chfSellTransfer,
			chfSell: dataJson.chfSell,

			hkdBuyCast: dataJson.hkdBuyCast,
			hkdBuyTransfer: dataJson.hkdBuyTransfer,
			// hkdSellTransfer: dataJson.hkdSellTransfer,
			hkdSell: dataJson.hkdSell,

			krwBuyCast: dataJson.krwBuyCast,
			krwBuyTransfer: dataJson.krwBuyTransfer,
			// krwSellTransfer: dataJson.krwSellTransfer,
			krwSell: dataJson.krwSell,
		},
		{ upsert: true }
	)
		// .then((doc) => console.log(doc))
		.catch((err) => console.log(data.symbol));
};
const crawlVietcombank = async () => {
	const result = await axios(urlVietcombank)
		.then((res) => res.data)
		.catch((err) => console.log(err));

	const $ = cheerio.load(result);

	let dataJson = {};

	try {
		dataJson.name = 'Ngân hàng thương mại cổ phần Ngoại thương Việt Nam';
		dataJson.symbol = 'Vietcombank';

		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);

		dataJson.audBuyCast = $('#myTable tbody :nth-child(6) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -3)
			.replace(/[.,\s]/g, '');
		dataJson.audBuyTransfer = $(
			'#myTable tbody :nth-child(6) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.audSell = $('#myTable tbody :nth-child(6) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.cadBuyCast = $('#myTable tbody :nth-child(8) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -3)
			.replace(/[.,\s]/g, '');
		dataJson.cadBuyTransfer = $(
			'#myTable tbody :nth-child(8) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.cadSell = $('#myTable tbody :nth-child(8) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.chfBuyCast = $('#myTable tbody :nth-child(4) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -3)
			.replace(/[.,\s]/g, '');
		dataJson.chfBuyTransfer = $(
			'#myTable tbody :nth-child(4) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.chfSell = $('#myTable tbody :nth-child(4) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.cnyBuyCast = $('#myTable tbody :nth-child(15) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');
		dataJson.cnyBuyTransfer = $(
			'#myTable tbody :nth-child(15) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');
		dataJson.cnySell = $('#myTable tbody :nth-child(15) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');

		dataJson.dkkBuyCast = $('#myTable tbody :nth-child(13) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.dkkBuyTransfer = $(
			'#myTable tbody :nth-child(13) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.dkkSell = $('#myTable tbody :nth-child(13) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.eurBuyCast = $('#myTable tbody :nth-child(3) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -3)
			.replace(/[.,\s]/g, '');
		dataJson.eurBuyTransfer = $(
			'#myTable tbody :nth-child(3) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.eurSell = $('#myTable tbody :nth-child(3) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.gbpBuyCast = $('#myTable tbody :nth-child(5) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -3)
			.replace(/[.,\s]/g, '');
		dataJson.gbpBuyTransfer = $(
			'#myTable tbody :nth-child(5) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.gbpSell = $('#myTable tbody :nth-child(5) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.hkdBuyCast = $('#myTable tbody :nth-child(9) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -3)
			.replace(/[.,\s]/g, '');
		dataJson.hkdBuyTransfer = $(
			'#myTable tbody :nth-child(9) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.hkdSell = $('#myTable tbody :nth-child(9) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.inrBuyCast = $('#myTable tbody :nth-child(20) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.inrBuyTransfer = $(
			'#myTable tbody :nth-child(20) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.inrSell = $('#myTable tbody :nth-child(20) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.jpyBuyCast = $('#myTable tbody :nth-child(2) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\,/g, '');
		dataJson.jpyBuyTransfer = $(
			'#myTable tbody :nth-child(2) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\,/g, '');
		dataJson.jpySell = $('#myTable tbody :nth-child(2) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\,/g, '');

		dataJson.krwBuyCast = $('#myTable tbody :nth-child(11) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.\s]/g, '');
		dataJson.krwBuyTransfer = $(
			'#myTable tbody :nth-child(11) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.krwSell = $('#myTable tbody :nth-child(11) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.kwdBuyCast = $('#myTable tbody :nth-child(19) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.kwdBuyTransfer = $(
			'#myTable tbody :nth-child(19) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.kwdSell = $('#myTable tbody :nth-child(19) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.myrBuyCast = $('#myTable tbody :nth-child(17) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.myrBuyTransfer = $(
			'#myTable tbody :nth-child(17) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.myrSell = $('#myTable tbody :nth-child(17) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.nokBuyCast = $('#myTable tbody :nth-child(14) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.nokBuyTransfer = $(
			'#myTable tbody :nth-child(14) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.nokSell = $('#myTable tbody :nth-child(14) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.rubBuyCast = $('#myTable tbody :nth-child(16) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.rubBuyTransfer = $(
			'#myTable tbody :nth-child(16) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.rubSell = $('#myTable tbody :nth-child(16) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.sarBuyCast = $('#myTable tbody :nth-child(18) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.sarBuyTransfer = $(
			'#myTable tbody :nth-child(18) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.sarSell = $('#myTable tbody :nth-child(18) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.sekBuyCast = $('#myTable tbody :nth-child(12) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.sekBuyTransfer = $(
			'#myTable tbody :nth-child(12) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.sekSell = $('#myTable tbody :nth-child(12) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.sgdBuyCast = $('#myTable tbody :nth-child(7) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -3)
			.replace(/[.,\s]/g, '');
		dataJson.sgdBuyTransfer = $(
			'#myTable tbody :nth-child(7) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');
		dataJson.sgdSell = $('#myTable tbody :nth-child(7) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -3)
			.replace(/[.,\s]/g, '');

		dataJson.thbBuyCast = $('#myTable tbody :nth-child(10) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.\s]/g, '');
		dataJson.thbBuyTransfer = $(
			'#myTable tbody :nth-child(10) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.thbSell = $('#myTable tbody :nth-child(10) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.usdBuyCast = $('#myTable tbody :nth-child(1) :nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.usdBuyTransfer = $(
			'#myTable tbody :nth-child(1) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.usdSell = $('#myTable tbody :nth-child(1) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
	} catch (err) {
		console.log(err);
	}

	Vietcombank.findOneAndUpdate(
		{ symbol: dataJson.symbol },
		{
			name: dataJson.name,
			symbol: dataJson.symbol,
			timeUpdate: dataJson.timeUpdate,

			audBuyCast: dataJson.audBuyCast,
			audBuyTransfer: dataJson.audBuyTransfer,
			audSell: dataJson.audSell,

			cadBuyCast: dataJson.cadBuyCast,
			cadBuyTransfer: dataJson.cadBuyTransfer,
			cadSell: dataJson.cadSell,

			chfBuyCast: dataJson.chfBuyCast,
			chfBuyTransfer: dataJson.chfBuyTransfer,
			chfSell: dataJson.chfSell,

			cnyBuyCast: dataJson.cnyBuyCast,
			cnyBuyTransfer: dataJson.cnyBuyTransfer,
			cnySell: dataJson.cnySell,

			dkkBuyCast: dataJson.dkkBuyCast,
			dkkBuyTransfer: dataJson.dkkBuyTransfer,
			dkkSell: dataJson.dkkSell,

			eurBuyCast: dataJson.eurBuyCast,
			eurBuyTransfer: dataJson.eurBuyTransfer,
			eurSell: dataJson.eurSell,

			gbpBuyCast: dataJson.gbpBuyCast,
			gbpBuyTransfer: dataJson.gbpBuyTransfer,
			gbpSell: dataJson.gbpSell,

			hkdBuyCast: dataJson.hkdBuyCast,
			hkdBuyTransfer: dataJson.hkdBuyTransfer,
			hkdSell: dataJson.hkdSell,

			inrBuyCast: dataJson.inrBuyCast,
			inrBuyTransfer: dataJson.inrBuyTransfer,
			inrSell: dataJson.inrSell,

			jpyBuyCast: dataJson.jpyBuyCast,
			jpyBuyTransfer: dataJson.jpyBuyTransfer,
			jpySell: dataJson.jpySell,

			krwBuyCast: dataJson.krwBuyCast,
			krwBuyTransfer: dataJson.krwBuyTransfer,
			krwSell: dataJson.krwSell,

			kwdBuyCast: dataJson.kwdBuyCast,
			kwdBuyTransfer: dataJson.kwdBuyTransfer,
			kwdSell: dataJson.kwdSell,

			myrBuyCast: dataJson.myrBuyCast,
			myrBuyTransfer: dataJson.myrBuyTransfer,
			myrSell: dataJson.myrSell,

			nokBuyCast: dataJson.nokBuyCast,
			nokBuyTransfer: dataJson.nokBuyTransfer,
			nokSell: dataJson.nokSell,

			rubBuyCast: dataJson.rubBuyCast,
			rubBuyTransfer: dataJson.rubBuyTransfer,
			rubSell: dataJson.rubSell,

			sarBuyCast: dataJson.sarBuyCast,
			sarBuyTransfer: dataJson.sarBuyTransfer,
			sarSell: dataJson.sarSell,

			sekBuyCast: dataJson.sekBuyCast,
			sekBuyTransfer: dataJson.sekBuyTransfer,
			sekSell: dataJson.sekSell,

			sgdBuyCast: dataJson.sgdBuyCast,
			sgdBuyTransfer: dataJson.sgdBuyTransfer,
			sgdSell: dataJson.sgdSell,

			thbBuyCast: dataJson.thbBuyCast,
			thbBuyTransfer: dataJson.thbBuyTransfer,
			thbSell: dataJson.thbSell,

			usdBuyCast: dataJson.usdBuyCast,
			usdBuyTransfer: dataJson.usdBuyTransfer,
			usdSell: dataJson.usdSell,
		},
		{ upsert: true }
	)
		// .then((doc) => console.log(doc))
		.catch((err) => console.log(dataJson.symbol));
};
const crawlBidv = async () => {
	const result = await axios(urlBidv)
		.then((res) => res.data)
		.catch((err) => console.log(err));

	const $ = cheerio.load(result);

	let dataJson = {};

	try {
		dataJson.name =
			'Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam';
		dataJson.symbol = 'Bidv';

		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);

		dataJson.audBuyCast = $('#myTable tbody :nth-child(6) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.,\s]/g, '');
		dataJson.audBuyTransfer = $(
			'#myTable tbody :nth-child(6) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');
		dataJson.audSell = $('#myTable tbody :nth-child(6) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');

		dataJson.cadBuyCast = $('#myTable tbody :nth-child(8) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.,\s]/g, '');
		dataJson.cadBuyTransfer = $(
			'#myTable tbody :nth-child(8) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');
		dataJson.cadSell = $('#myTable tbody :nth-child(8) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');

		dataJson.chfBuyCast = $('#myTable tbody :nth-child(4) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.,\s]/g, '');
		dataJson.chfBuyTransfer = $(
			'#myTable tbody :nth-child(4) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');
		dataJson.chfSell = $('#myTable tbody :nth-child(4) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');

		dataJson.cnyBuyCast = $('#myTable tbody :nth-child(18) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.cnyBuyTransfer = $(
			'#myTable tbody :nth-child(18) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.cnySell = $('#myTable tbody :nth-child(18) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.dkkBuyCast = $('#myTable tbody :nth-child(16) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');
		dataJson.dkkBuyTransfer = $(
			'#myTable tbody :nth-child(16) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');
		dataJson.dkkSell = $('#myTable tbody :nth-child(16) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');

		dataJson.eurBuyCast = $('#myTable tbody :nth-child(3) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.,\s]/g, '');
		dataJson.eurBuyTransfer = $(
			'#myTable tbody :nth-child(3) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');
		dataJson.eurSell = $('#myTable tbody :nth-child(3) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');

		dataJson.gbpBuyCast = $('#myTable tbody :nth-child(5) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.,\s]/g, '');
		dataJson.gbpBuyTransfer = $(
			'#myTable tbody :nth-child(5) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');
		dataJson.gbpSell = $('#myTable tbody :nth-child(5) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');

		dataJson.hkdBuyCast = $('#myTable tbody :nth-child(9) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.,\s]/g, '');
		dataJson.hkdBuyTransfer = $(
			'#myTable tbody :nth-child(9) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');
		dataJson.hkdSell = $('#myTable tbody :nth-child(9) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');

		// dataJson.inrBuyCast = $('#myTable tbody :nth-child(20) td:nth-child(2)')
		// 	.contents()
		// 	.first()
		// 	.text()
		// 	.slice(0, -1)
		// 	.replace(/[.\s]/g, '');
		// dataJson.inrBuyTransfer = $(
		// 	'#myTable tbody :nth-child(20) td:nth-child(4)'
		// )
		// 	.contents()
		// 	.first()
		// 	.text()
		// 	.slice(0, -1)
		// 	.replace(/[.\s]/g, '');
		// dataJson.inrSell = $('#myTable tbody :nth-child(20) td:nth-child(3)')
		// 	.contents()
		// 	.first()
		// 	.text()
		// 	.slice(0, -1)
		// 	.replace(/[.\s]/g, '');

		dataJson.jpyBuyCast = $('#myTable tbody :nth-child(2) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\,/g, '');
		dataJson.jpyBuyTransfer = $(
			'#myTable tbody :nth-child(2) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\,/g, '');
		dataJson.jpySell = $('#myTable tbody :nth-child(2) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\,/g, '');

		dataJson.krwBuyCast = $('#myTable tbody :nth-child(13) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.\s]/g, '');
		dataJson.krwBuyTransfer = $(
			'#myTable tbody :nth-child(13) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.krwSell = $('#myTable tbody :nth-child(13) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		// dataJson.kwdBuyCast = $('#myTable tbody :nth-child(19) td:nth-child(2)')
		// 	.contents()
		// 	.first()
		// 	.text()
		// 	.slice(0, -3)
		// 	.replace(/[.,\s]/g, '');
		// dataJson.kwdBuyTransfer = $(
		// 	'#myTable tbody :nth-child(19) td:nth-child(4)'
		// )
		// 	.contents()
		// 	.first()
		// 	.text()
		// 	.slice(0, -3)
		// 	.replace(/[.,\s]/g, '');
		// dataJson.kwdSell = $('#myTable tbody :nth-child(19) td:nth-child(3)')
		// 	.contents()
		// 	.first()
		// 	.text()
		// 	.slice(0, -3)
		// 	.replace(/[.,\s]/g, '');

		dataJson.myrBuyCast = $('#myTable tbody :nth-child(20) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.myrBuyTransfer = $(
			'#myTable tbody :nth-child(20) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.myrSell = $('#myTable tbody :nth-child(20) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.nokBuyCast = $('#myTable tbody :nth-child(17) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.nokBuyTransfer = $(
			'#myTable tbody :nth-child(17) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.nokSell = $('#myTable tbody :nth-child(17) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.rubBuyCast = $('#myTable tbody :nth-child(19) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.rubBuyTransfer = $(
			'#myTable tbody :nth-child(19) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.rubSell = $('#myTable tbody :nth-child(19) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		// dataJson.sarBuyCast = $('#myTable tbody :nth-child(18) td:nth-child(2)')
		// 	.contents()
		// 	.first()
		// 	.text()
		// 	.slice(0, -3)
		// 	.replace(/[.,\s]/g, '');
		// dataJson.sarBuyTransfer = $(
		// 	'#myTable tbody :nth-child(18) td:nth-child(4)'
		// )
		// 	.contents()
		// 	.first()
		// 	.text()
		// 	.slice(0, -3)
		// 	.replace(/[.,\s]/g, '');
		// dataJson.sarSell = $('#myTable tbody :nth-child(18) td:nth-child(3)')
		// 	.contents()
		// 	.first()
		// 	.text()
		// 	.slice(0, -3)
		// 	.replace(/[.,\s]/g, '');

		dataJson.sekBuyCast = $('#myTable tbody :nth-child(14) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.sekBuyTransfer = $(
			'#myTable tbody :nth-child(14) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.sekSell = $('#myTable tbody :nth-child(14) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.lakBuyCast = $('#myTable tbody :nth-child(15) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.lakBuyTransfer = $(
			'#myTable tbody :nth-child(15) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.lakSell = $('#myTable tbody :nth-child(15) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.sgdBuyCast = $('#myTable tbody :nth-child(7) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.,\s]/g, '');
		dataJson.sgdBuyTransfer = $(
			'#myTable tbody :nth-child(7) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');
		dataJson.sgdSell = $('#myTable tbody :nth-child(7) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.,\s]/g, '');

		dataJson.thbBuyCast = $('#myTable tbody :nth-child(10) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.\s]/g, '');
		dataJson.thbBuyTransfer = $(
			'#myTable tbody :nth-child(10) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.thbSell = $('#myTable tbody :nth-child(10) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.twdBuyCast = $('#myTable tbody :nth-child(11) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.\s]/g, '');
		dataJson.twdBuyTransfer = $(
			'#myTable tbody :nth-child(11) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.twdSell = $('#myTable tbody :nth-child(11) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.nzdBuyCast = $('#myTable tbody :nth-child(12) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/[.\s]/g, '');
		dataJson.nzdBuyTransfer = $(
			'#myTable tbody :nth-child(12) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');
		dataJson.nzdSell = $('#myTable tbody :nth-child(12) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/[.\s]/g, '');

		dataJson.usdBuyCast = $('#myTable tbody :nth-child(1) :nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.usdBuyTransfer = $(
			'#myTable tbody :nth-child(1) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.usdSell = $('#myTable tbody :nth-child(1) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
	} catch (err) {
		console.log(err);
	}

	Bidv.findOneAndUpdate(
		{ symbol: dataJson.symbol },
		{
			name: dataJson.name,
			symbol: dataJson.symbol,
			timeUpdate: dataJson.timeUpdate,

			usdBuyCast: dataJson.usdBuyCast,
			usdBuyTransfer: dataJson.usdBuyTransfer,
			usdSell: dataJson.usdSell,

			gbpBuyCast: dataJson.gbpBuyCast,
			gbpBuyTransfer: dataJson.gbpBuyTransfer,
			gbpSell: dataJson.gbpSell,

			hkdBuyCast: dataJson.hkdBuyCast,
			hkdBuyTransfer: dataJson.hkdBuyTransfer,
			hkdSell: dataJson.hkdSell,

			chfBuyCast: dataJson.chfBuyCast,
			chfBuyTransfer: dataJson.chfBuyTransfer,
			chfSell: dataJson.chfSell,

			jpyBuyCast: dataJson.jpyBuyCast,
			jpyBuyTransfer: dataJson.jpyBuyTransfer,
			jpySell: dataJson.jpySell,

			thbBuyCast: dataJson.thbBuyCast,
			thbBuyTransfer: dataJson.thbBuyTransfer,
			thbSell: dataJson.thbSell,

			audBuyCast: dataJson.audBuyCast,
			audBuyTransfer: dataJson.audBuyTransfer,
			audSell: dataJson.audSell,

			cadBuyCast: dataJson.cadBuyCast,
			cadBuyTransfer: dataJson.cadBuyTransfer,
			cadSell: dataJson.cadSell,

			sgdBuyCast: dataJson.sgdBuyCast,
			sgdBuyTransfer: dataJson.sgdBuyTransfer,
			sgdSell: dataJson.sgdSell,

			sekBuyCast: dataJson.sekBuyCast,
			sekBuyTransfer: dataJson.sekBuyTransfer,
			sekSell: dataJson.sekSell,

			lakBuyCast: dataJson.lakBuyCast,
			lakBuyTransfer: dataJson.lakBuyTransfer,
			lakSell: dataJson.lakSell,

			dkkBuyCast: dataJson.dkkBuyCast,
			dkkBuyTransfer: dataJson.dkkBuyTransfer,
			dkkSell: dataJson.dkkSell,

			nokBuyCast: dataJson.nokBuyCast,
			nokBuyTransfer: dataJson.nokBuyTransfer,
			nokSell: dataJson.nokSell,

			cnyBuyCast: dataJson.cnyBuyCast,
			cnyBuyTransfer: dataJson.cnyBuyTransfer,
			cnySell: dataJson.cnySell,

			rubBuyCast: dataJson.rubBuyCast,
			rubBuyTransfer: dataJson.rubBuyTransfer,
			rubSell: dataJson.rubSell,

			nzdBuyCast: dataJson.nzdBuyCast,
			nzdBuyTransfer: dataJson.nzdBuyTransfer,
			nzdSell: dataJson.nzdSell,

			krwBuyCast: dataJson.krwBuyCast,
			krwBuyTransfer: dataJson.krwBuyTransfer,
			krwSell: dataJson.krwSell,

			eurBuyCast: dataJson.eurBuyCast,
			eurBuyTransfer: dataJson.eurBuyTransfer,
			eurSell: dataJson.eurSell,

			twdBuyCast: dataJson.twdBuyCast,
			twdBuyTransfer: dataJson.twdBuyTransfer,
			twdSell: dataJson.twdSell,

			myrBuyCast: dataJson.myrBuyCast,
			myrBuyTransfer: dataJson.myrBuyTransfer,
			myrSell: dataJson.myrSell,
		},
		{ upsert: true }
	)
		// .then((doc) => console.log(doc))
		.catch((err) => console.log(dataJson.symbol));
};
const crawlTechcombank = async () => {
	let dataJson = {};
	try {
		const result = await axios(urlTechcombank)
			.then((res) => res.data)
			.catch((err) => console.log(err));

		const $ = cheerio.load(result);

		dataJson.name = 'Ngân hàng Thương mại cổ phần Kỹ Thương Việt Nam';
		dataJson.symbol = 'Techcombank';

		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);

		dataJson.usdBuyCast = $('#myTable tbody :nth-child(1) :nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.usdBuyTransfer = $(
			'#myTable tbody :nth-child(1) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.usdSell = $('#myTable tbody :nth-child(1) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.eurBuyCast = $('#myTable tbody :nth-child(3) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.eurBuyTransfer = $(
			'#myTable tbody :nth-child(3) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.eurSell = $('#myTable tbody :nth-child(3) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.audBuyCast = $('#myTable tbody :nth-child(6) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.audBuyTransfer = $(
			'#myTable tbody :nth-child(6) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.audSell = $('#myTable tbody :nth-child(6) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.cadBuyCast = $('#myTable tbody :nth-child(8) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.cadBuyTransfer = $(
			'#myTable tbody :nth-child(8) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.cadSell = $('#myTable tbody :nth-child(8) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.chfBuyCast = $('#myTable tbody :nth-child(4) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.chfBuyTransfer = $(
			'#myTable tbody :nth-child(4) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.chfSell = $('#myTable tbody :nth-child(4) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.cnyBuyCast = $('#myTable tbody :nth-child(12) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.cnyBuyTransfer = $(
			'#myTable tbody :nth-child(12) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.cnySell = $('#myTable tbody :nth-child(12) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.gbpBuyCast = $('#myTable tbody :nth-child(5) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.gbpBuyTransfer = $(
			'#myTable tbody :nth-child(5) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.gbpSell = $('#myTable tbody :nth-child(5) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.hkdBuyCast = $('#myTable tbody :nth-child(9) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.hkdBuyTransfer = $(
			'#myTable tbody :nth-child(9) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.hkdSell = $('#myTable tbody :nth-child(9) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.jpyBuyCast = $('#myTable tbody :nth-child(2) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.jpyBuyTransfer = $(
			'#myTable tbody :nth-child(2) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.jpySell = $('#myTable tbody :nth-child(2) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.krwBuyCast = $('#myTable tbody :nth-child(11) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.krwBuyTransfer = $(
			'#myTable tbody :nth-child(11) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.krwSell = $('#myTable tbody :nth-child(11) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.sgdBuyCast = $('#myTable tbody :nth-child(7) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sgdBuyTransfer = $(
			'#myTable tbody :nth-child(7) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.sgdSell = $('#myTable tbody :nth-child(7) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.thbBuyCast = $('#myTable tbody :nth-child(10) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -2)
			.replace(/\./g, '');
		dataJson.thbBuyTransfer = $(
			'#myTable tbody :nth-child(10) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.thbSell = $('#myTable tbody :nth-child(10) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
	} catch (err) {
		console.log(err);
	}

	Techcombank.findOneAndUpdate(
		{ symbol: dataJson.symbol },
		{
			name: dataJson.name,
			symbol: dataJson.symbol,
			timeUpdate: dataJson.timeUpdate,

			audBuyCast: dataJson.audBuyCast,
			audBuyTransfer: dataJson.audBuyTransfer,
			audSell: dataJson.audSell,

			cadBuyCast: dataJson.cadBuyCast,
			cadBuyTransfer: dataJson.cadBuyTransfer,
			cadSell: dataJson.cadSell,

			chfBuyCast: dataJson.chfBuyCast,
			chfBuyTransfer: dataJson.chfBuyTransfer,
			chfSell: dataJson.chfSell,

			cnyBuyCast: dataJson.cnyBuyCast,
			cnyBuyTransfer: dataJson.cnyBuyTransfer,
			cnySell: dataJson.cnySell,

			eurBuyCast: dataJson.eurBuyCast,
			eurBuyTransfer: dataJson.eurBuyTransfer,
			eurSell: dataJson.eurSell,

			gbpBuyCast: dataJson.gbpBuyCast,
			gbpBuyTransfer: dataJson.gbpBuyTransfer,
			gbpSell: dataJson.gbpSell,

			hkdBuyCast: dataJson.hkdBuyCast,
			hkdBuyTransfer: dataJson.hkdBuyTransfer,
			hkdSell: dataJson.hkdSell,

			jpyBuyCast: dataJson.jpyBuyCast,
			jpyBuyTransfer: dataJson.jpyBuyTransfer,
			jpySell: dataJson.jpySell,

			krwBuyCast: dataJson.krwBuyCast,
			krwBuyTransfer: dataJson.krwBuyTransfer,
			krwSell: dataJson.krwSell,

			myrBuyCast: dataJson.myrBuyCast,
			myrBuyTransfer: dataJson.myrBuyTransfer,
			myrSell: dataJson.myrSell,

			sgdBuyCast: dataJson.sgdBuyCast,
			sgdBuyTransfer: dataJson.sgdBuyTransfer,
			sgdSell: dataJson.sgdSell,

			thbBuyCast: dataJson.thbBuyCast,
			thbBuyTransfer: dataJson.thbBuyTransfer,
			thbSell: dataJson.thbSell,

			usdBuyCast: dataJson.usdBuyCast,
			usdBuyTransfer: dataJson.usdBuyTransfer,
			usdSell: dataJson.usdSell,
		},
		{ upsert: true }
	)
		// .then((doc) => console.log(doc))
		.catch((err) => console.log(dataJson.symbol));
};
const crawlVietinbank = async () => {
	const result = await axios(urlVietinbank)
		.then((res) => res.data)
		.catch((err) => console.log(err));
	const $ = cheerio.load(result);
	let dataJson = {};
	try {
		dataJson.name = 'Ngân hàng Thương mại cổ phần Công Thương Việt Nam';
		dataJson.symbol = 'VietinBank';
		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);

		dataJson.audBuyCast = $('#myTable tbody :nth-child(6) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.audBuyTransfer = $(
			'#myTable tbody :nth-child(6) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.audSell = $('#myTable tbody :nth-child(6) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.cadBuyCast = $('#myTable tbody :nth-child(8) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.cadBuyTransfer = $(
			'#myTable tbody :nth-child(8) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.cadSell = $('#myTable tbody :nth-child(8) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.chfBuyCast = $('#myTable tbody :nth-child(4) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.chfBuyTransfer = $(
			'#myTable tbody :nth-child(4) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.chfSell = $('#myTable tbody :nth-child(4) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.cnyBuyCast = $('#myTable tbody :nth-child(17) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.cnyBuyTransfer = $(
			'#myTable tbody :nth-child(17) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.cnySell = $('#myTable tbody :nth-child(17) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.dkkBuyCast = $('#myTable tbody :nth-child(15) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.dkkBuyTransfer = $(
			'#myTable tbody :nth-child(15) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.dkkSell = $('#myTable tbody :nth-child(15) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.eurBuyCast = $('#myTable tbody :nth-child(3) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.eurBuyTransfer = $(
			'#myTable tbody :nth-child(3) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.eurSell = $('#myTable tbody :nth-child(3) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.gbpBuyCast = $('#myTable tbody :nth-child(5) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.gbpBuyTransfer = $(
			'#myTable tbody :nth-child(5) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.gbpSell = $('#myTable tbody :nth-child(5) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.hkdBuyCast = $('#myTable tbody :nth-child(9) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.hkdBuyTransfer = $(
			'#myTable tbody :nth-child(9) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.hkdSell = $('#myTable tbody :nth-child(9) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.jpyBuyCast = $('#myTable tbody :nth-child(2) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.jpyBuyTransfer = $(
			'#myTable tbody :nth-child(2) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.jpySell = $('#myTable tbody :nth-child(2) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.krwBuyCast = $('#myTable tbody :nth-child(12) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.krwBuyTransfer = $(
			'#myTable tbody :nth-child(12) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.krwSell = $('#myTable tbody :nth-child(12) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.lakBuyCast = $('#myTable tbody :nth-child(14) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.lakBuyTransfer = $(
			'#myTable tbody :nth-child(14) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.lakSell = $('#myTable tbody :nth-child(14) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.nokBuyCast = $('#myTable tbody :nth-child(16) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nokBuyTransfer = $(
			'#myTable tbody :nth-child(16) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.nokSell = $('#myTable tbody :nth-child(16) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.nzdBuyCast = $('#myTable tbody :nth-child(11) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nzdBuyTransfer = $(
			'#myTable tbody :nth-child(11) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.nzdSell = $('#myTable tbody :nth-child(11) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.sekBuyCast = $('#myTable tbody :nth-child(13) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sekBuyTransfer = $(
			'#myTable tbody :nth-child(13) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.sekSell = $('#myTable tbody :nth-child(13) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.sgdBuyCast = $('#myTable tbody :nth-child(7) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sgdBuyTransfer = $(
			'#myTable tbody :nth-child(7) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.sgdSell = $('#myTable tbody :nth-child(7) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.thbBuyCast = $('#myTable tbody :nth-child(10) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.thbBuyTransfer = $(
			'#myTable tbody :nth-child(10) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.thbSell = $('#myTable tbody :nth-child(10) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.usdBuyCast = $('#myTable tbody :nth-child(1) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.usdBuyTransfer = $(
			'#myTable tbody :nth-child(1) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.usdSell = $('#myTable tbody :nth-child(1) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
	} catch (err) {
		console.log(err);
	}

	Vietinbank.findOneAndUpdate(
		{ symbol: dataJson.symbol },
		{
			name: dataJson.name,
			symbol: dataJson.symbol,
			timeUpdate: dataJson.timeUpdate,

			audBuyCast: dataJson.audBuyCast,
			audBuyTransfer: dataJson.audBuyTransfer,
			audSell: dataJson.audSell,

			cadBuyCast: dataJson.cadBuyCast,
			cadBuyTransfer: dataJson.cadBuyTransfer,
			cadSell: dataJson.cadSell,

			chfBuyCast: dataJson.chfBuyCast,
			chfBuyTransfer: dataJson.chfBuyTransfer,
			chfSell: dataJson.chfSell,

			cnyBuyCast: dataJson.cnyBuyCast,
			cnyBuyTransfer: dataJson.cnyBuyTransfer,
			cnySell: dataJson.cnySell,

			dkkBuyCast: dataJson.dkkBuyCast,
			dkkBuyTransfer: dataJson.dkkBuyTransfer,
			dkkSell: dataJson.dkkSell,

			eurBuyCast: dataJson.eurBuyCast,
			eurBuyTransfer: dataJson.eurBuyTransfer,
			eurSell: dataJson.eurSell,

			gbpBuyCast: dataJson.gbpBuyCast,
			gbpBuyTransfer: dataJson.gbpBuyTransfer,
			gbpSell: dataJson.gbpSell,

			hkdBuyCast: dataJson.hkdBuyCast,
			hkdBuyTransfer: dataJson.hkdBuyTransfer,
			hkdSell: dataJson.hkdSell,

			jpyBuyCast: dataJson.jpyBuyCast,
			jpyBuyTransfer: dataJson.jpyBuyTransfer,
			jpySell: dataJson.jpySell,

			krwBuyCast: dataJson.krwBuyCast,
			krwBuyTransfer: dataJson.krwBuyTransfer,
			krwSell: dataJson.krwSell,

			lakBuyCast: dataJson.lakBuyCast,
			lakBuyTransfer: dataJson.lakBuyTransfer,
			lakSell: dataJson.lakSell,

			nokBuyCast: dataJson.nokBuyCast,
			nokBuyTransfer: dataJson.nokBuyTransfer,
			nokSell: dataJson.nokSell,

			nzdBuyCast: dataJson.nzdBuyCast,
			nzdBuyTransfer: dataJson.nzdBuyTransfer,
			nzdSell: dataJson.nzdSell,

			sekBuyCast: dataJson.sekBuyCast,
			sekBuyTransfer: dataJson.sekBuyTransfer,
			sekSell: dataJson.sekSell,

			sgdBuyCast: dataJson.sgdBuyCast,
			sgdBuyTransfer: dataJson.sgdBuyTransfer,
			sgdSell: dataJson.sgdSell,

			thbBuyCast: dataJson.thbBuyCast,
			thbBuyTransfer: dataJson.thbBuyTransfer,
			thbSell: dataJson.thbSell,

			usdBuyCast: dataJson.usdBuyCast,
			usdBuyTransfer: dataJson.usdBuyTransfer,
			usdSell: dataJson.usdSell,
		},
		{ upsert: true }
	)
		// .then((doc) => console.log(doc))
		.catch((err) => console.log(vietinbankData.symbol));
};

const crawlMbbank = async () => {
	const result = await axios(urlMbbank)
		.then((res) => res.data)
		.catch((err) => console.log(err));

	const $ = cheerio.load(result);

	let dataJson = {};

	try {
		dataJson.name = 'Ngân hàng Thương mại Cổ phần Quân đội';
		dataJson.symbol = 'Mbbank';

		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);

		dataJson.usdBuyCast = $('#myTable tbody :nth-child(1) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.usdBuyTransfer = $(
			'#myTable tbody :nth-child(1) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.usdSell = $('#myTable tbody :nth-child(1) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.eurBuyCast = $('#myTable tbody :nth-child(3) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.eurBuyTransfer = $(
			'#myTable tbody :nth-child(3) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.eurSell = $('#myTable tbody :nth-child(3) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.audBuyCast = $('#myTable tbody :nth-child(1) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.audBuyTransfer = $(
			'#myTable tbody :nth-child(6) td:nth-child(2)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.audSell = $('#myTable tbody :nth-child(6) td:nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.audSellTransfer = $(
			'#myTable tbody :nth-child(6) td:nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.cadBuyCast = $('#myTable tbody :nth-child(8) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.cadBuyTransfer = $(
			'#myTable tbody :nth-child(8) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.cadSell = $('#myTable tbody :nth-child(8) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.chfBuyCast = $('#myTable tbody :nth-child(4) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.chfBuyTransfer = $(
			'#myTable tbody :nth-child(4) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.chfSell = $('#myTable tbody :nth-child(4) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.cnyBuyCast = $('#myTable tbody :nth-child(15) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.cnyBuyTransfer = $(
			'#myTable tbody :nth-child(15) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.cnySell = $('#myTable tbody :nth-child(15) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.gbpBuyCast = $('#myTable tbody :nth-child(5) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.gbpBuyTransfer = $(
			'#myTable tbody :nth-child(5) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.gbpSell = $('#myTable tbody :nth-child(5) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.hkdBuyCast = $('#myTable tbody :nth-child(9) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.hkdBuyTransfer = $(
			'#myTable tbody :nth-child(9) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.hkdSell = $('#myTable tbody :nth-child(9) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.jpyBuyCast = $('#myTable tbody :nth-child(2) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.jpyBuyTransfer = $(
			'#myTable tbody :nth-child(2) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.jpySell = $('#myTable tbody :nth-child(2) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.khrBuyCast = $('#myTable tbody :nth-child(16) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.khrBuyTransfer = $(
			'#myTable tbody :nth-child(16) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.khrSell = $('#myTable tbody :nth-child(16) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.krwBuyCast = $('#myTable tbody :nth-child(12) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.krwBuyTransfer = $(
			'#myTable tbody :nth-child(12) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.krwSell = $('#myTable tbody :nth-child(12) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.lakBuyCast = $('#myTable tbody :nth-child(14) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.lakBuyTransfer = $(
			'#myTable tbody :nth-child(14) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.lakSell = $('#myTable tbody :nth-child(14) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.nzdBuyCast = $('#myTable tbody :nth-child(11) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nzdBuyTransfer = $(
			'#myTable tbody :nth-child(11) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.nzdSell = $('#myTable tbody :nth-child(11) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.sekBuyCast = $('#myTable tbody :nth-child(13) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sekBuyTransfer = $(
			'#myTable tbody :nth-child(13) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.sekSell = $('#myTable tbody :nth-child(13) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.sgdBuyCast = $('#myTable tbody :nth-child(7) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sgdBuyTransfer = $(
			'#myTable tbody :nth-child(7) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.sgdSell = $('#myTable tbody :nth-child(7) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');

		dataJson.thbBuyCast = $('#myTable tbody :nth-child(10) td:nth-child(2)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.thbBuyTransfer = $(
			'#myTable tbody :nth-child(10) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
		dataJson.thbSell = $('#myTable tbody :nth-child(10) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(0, -1)
			.replace(/\./g, '');
	} catch (err) {
		console.log(err);
	}

	Mbbank.findOneAndUpdate(
		{ symbol: dataJson.symbol },
		{
			name: dataJson.name,
			symbol: dataJson.symbol,
			timeUpdate: dataJson.timeUpdate,

			usdBuyCast: dataJson.usdBuyCast,
			usdBuyTransfer: dataJson.usdBuyTransfer,
			usdSell: dataJson.usdSell,
			// usdSellTransfer: dataJson.usdSellTransfer,

			eurBuyCast: dataJson.eurBuyCast,
			eurBuyTransfer: dataJson.eurBuyTransfer,
			eurSell: dataJson.eurSell,
			// eurSellTransfer: dataJson.eurSellTransfer,

			gbpBuyCast: dataJson.gbpBuyCast,
			gbpBuyTransfer: dataJson.gbpBuyTransfer,
			gbpSell: dataJson.gbpSell,
			// gbpSellTransfer: dataJson.gbpSellTransfer,

			jpyBuyCast: dataJson.jpyBuyCast,
			jpyBuyTransfer: dataJson.jpyBuyTransfer,
			jpySell: dataJson.jpySell,
			// jpySellTransfer: dataJson.jpySellTransfer,

			hkdBuyCast: dataJson.hkdBuyCast,
			hkdBuyTransfer: dataJson.hkdBuyTransfer,
			hkdSell: dataJson.hkdSell,
			// hkdSellTransfer: dataJson.hkdSellTransfer,

			cnyBuyCast: dataJson.cnyBuyCast,
			cnyBuyTransfer: dataJson.cnyBuyTransfer,
			cnySell: dataJson.cnySell,
			// cnySellTransfer: dataJson.cnySellTransfer,

			audBuyCast: dataJson.audBuyCast,
			audBuyTransfer: dataJson.audBuyTransfer,
			audSell: dataJson.audSell,
			// audSellTransfer: dataJson.audSellTransfer,

			nzdBuyCast: dataJson.nzdBuyCast,
			nzdBuyTransfer: dataJson.nzdBuyTransfer,
			nzdSell: dataJson.nzdSell,
			// nzdSellTransfer: dataJson.nzdSellTransfer,

			cadBuyCast: dataJson.cadBuyCast,
			cadBuyTransfer: dataJson.cadBuyTransfer,
			cadSell: dataJson.cadSell,
			// cadSellTransfer: dataJson.cadSellTransfer,

			sgdBuyCast: dataJson.sgdBuyCast,
			sgdBuyTransfer: dataJson.sgdBuyTransfer,
			sgdSell: dataJson.sgdSell,
			// sgdSellTransfer: dataJson.sgdSellTransfer,

			thbBuyCast: dataJson.thbBuyCast,
			thbBuyTransfer: dataJson.thbBuyTransfer,
			thbSell: dataJson.thbSell,
			// thbSellTransfer: dataJson.thbSellTransfer,

			chfBuyCast: dataJson.chfBuyCast,
			chfBuyTransfer: dataJson.chfBuyTransfer,
			chfSell: dataJson.chfSell,
			// chfSellTransfer: dataJson.chfSellTransfer,

			krwBuyCast: dataJson.krwBuyCast,
			krwBuyTransfer: dataJson.krwBuyTransfer,
			krwSell: dataJson.krwSell,
			// krwSellTransfer: dataJson.krwSellTransfer,

			lakBuyCast: dataJson.lakBuyCast,
			lakBuyTransfer: dataJson.lakBuyTransfer,
			lakSell: dataJson.lakSell,
			// lakSellTransfer: dataJson.lakSellTransfer,

			khrBuyCast: dataJson.khrBuyCast,
			khrBuyTransfer: dataJson.khrBuyTransfer,
			khrSell: dataJson.khrSell,
			// khrSellTransfer: dataJson.khrSellTransfer,

			sekBuyCast: dataJson.sekBuyCast,
			sekBuyTransfer: dataJson.sekBuyTransfer,
			sekSell: dataJson.sekSell,
			// sekSellTransfer: dataJson.sekSellTransfer,
		},
		{ upsert: true }
	)
		// .then((doc) => console.log(doc))
		.catch((err) => console.log(data.symbol));
};

// const crawlAgribank = asyncHandler(async () => {
// 	const pageEvaluateFunc = async () => {
// 		const $ = document.querySelector.bind(document);

// 		let dataJson = {};
// try {
// 	dataJson.name =
// 		'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam';
// 	dataJson.symbol = 'Agribank';

// 	let date = new Date();
// 	dataJson.timeUpdate =
// 		date.getHours() +
// 		':' +
// 		date.getMinutes() +
// 		':' +
// 		date.getSeconds() +
// 		' ' +
// 		date.getDate() +
// 		'/' +
// 		(date.getMonth() + 1) +
// 		'/' +
// 		date.getFullYear();

// 	dataJson.usdBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(1) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.usdBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(1) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.usdSell = $(
// 		'#tyGiaCn table tbody :nth-child(1) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.eurBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(2) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.eurBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(2) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.eurSell = $(
// 		'#tyGiaCn table tbody :nth-child(2) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.gbpBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(3) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.gbpBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(3) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.gbpSell = $(
// 		'#tyGiaCn table tbody :nth-child(3) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.hkdBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(4) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.hkdBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(4) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.hkdSell = $(
// 		'#tyGiaCn table tbody :nth-child(4) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.chfBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(5) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.chfBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(5) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.chfSell = $(
// 		'#tyGiaCn table tbody :nth-child(5) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.jpyBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(6) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.jpyBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(6) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.jpySell = $(
// 		'#tyGiaCn table tbody :nth-child(6) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.audBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(7) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.audBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(7) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.audSell = $(
// 		'#tyGiaCn table tbody :nth-child(7) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.sgdBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(8) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.sgdBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(8) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.sgdSell = $(
// 		'#tyGiaCn table tbody :nth-child(8) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.thbBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(9) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.thbBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(9) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.thbSell = $(
// 		'#tyGiaCn table tbody :nth-child(9) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.cadBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(10) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.cadBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(10) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.cadSell = $(
// 		'#tyGiaCn table tbody :nth-child(10) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.nzdBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(11) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.nzdBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(11) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.nzdSell = $(
// 		'#tyGiaCn table tbody :nth-child(11) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.krwBuyCast = $(
// 		'#tyGiaCn table tbody :nth-child(12) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.krwBuyTransfer = $(
// 		'#tyGiaCn table tbody :nth-child(12) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.krwSell = $(
// 		'#tyGiaCn table tbody :nth-child(12) :nth-child(4)'
// 	)?.innerText;
// } catch (err) {
// 	console.log(err);
// }

// 		return dataJson;
// 	};

// 	let data = false;
// 	let attemps = 0;
// 	//retry request until it gets data or tries 3 times
// 	while (data == false && attemps < 2) {
// 		console.log('loop' + attemps);
// 		data = await collectQueryData(urlAgribank, pageEvaluateFunc);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// Agribank.findOneAndUpdate(
// 	{ symbol: data.symbol },
// 	{
// 		name: data.name,
// 		symbol: data.symbol,
// 		timeUpdate: data.timeUpdate,

// 		usdBuyCast: data.usdBuyCast,
// 		usdBuyTransfer: data.usdBuyTransfer,
// 		usdSellTransfer: data.usdSellTransfer,
// 		usdSellCast: data.usdSellCast,

// 		eurBuyCast: data.eurBuyCast,
// 		eurBuyTransfer: data.eurBuyTransfer,
// 		eurSellTransfer: data.eurSellTransfer,
// 		eurSellCast: data.eurSellCast,

// 		gbpBuyCast: data.gbpBuyCast,
// 		gbpBuyTransfer: data.gbpBuyTransfer,
// 		gbpSellTransfer: data.gbpSellTransfer,
// 		gbpSellCast: data.gbpSellCast,

// 		jpyBuyCast: data.jpyBuyCast,
// 		jpyBuyTransfer: data.jpyBuyTransfer,
// 		jpySellTransfer: data.jpySellTransfer,
// 		jpySellCast: data.jpySellCast,

// 		audBuyCast: data.audBuyCast,
// 		audBuyTransfer: data.audBuyTransfer,
// 		audSellTransfer: data.audSellTransfer,
// 		audSellCast: data.audSellCast,

// 		cadBuyCast: data.cadBuyCast,
// 		cadBuyTransfer: data.cadBuyTransfer,
// 		cadSellTransfer: data.cadSellTransfer,
// 		cadSellCast: data.cadSellCast,

// 		nzdBuyCast: data.nzdBuyCast,
// 		nzdBuyTransfer: data.nzdBuyTransfer,
// 		nzdSellTransfer: data.nzdSellTransfer,
// 		nzdSellCast: data.nzdSellCast,

// 		sgdBuyCast: data.sgdBuyCast,
// 		sgdBuyTransfer: data.sgdBuyTransfer,
// 		sgdSellTransfer: data.sgdSellTransfer,
// 		sgdSellCast: data.sgdSellCast,

// 		chfBuyCast: data.chfBuyCast,
// 		chfBuyTransfer: data.chfBuyTransfer,
// 		chfSellTransfer: data.chfSellTransfer,
// 		chfSellCast: data.chfSellCast,

// 		hkdBuyCast: data.hkdBuyCast,
// 		hkdBuyTransfer: data.hkdBuyTransfer,
// 		hkdSellTransfer: data.hkdSellTransfer,
// 		hkdSellCast: data.hkdSellCast,

// 		krwBuyCast: data.krwBuyCast,
// 		krwBuyTransfer: data.krwBuyTransfer,
// 		krwSellTransfer: data.krwSellTransfer,
// 		krwSellCast: data.krwSellCast,
// 	},
// 	{ upsert: true }
// )
// 	// .then((doc) => console.log(doc))
// 	.catch((err) => console.log(data.symbol));

// 			// await browser.close();
// 		}

// 		if (data === false) {
// 			//wait a few second, also a good idea to swap proxy here
// 			console.log('Recrawl........' + attemps);
// 			await new Promise((resolve) => setTimeout(resolve, 3000));
// 		}
// 	}
// });

// const crawlVietcombank = asyncHandler(async () => {
// 	const pageEvaluateFunc = async () => {
// 		const $ = document.querySelector.bind(document);

// 		let dataJson = {};

// 		try {
// 			dataJson.name =
// 				'Ngân hàng thương mại cổ phần Ngoại thương Việt Nam';
// 			dataJson.symbol = 'Vietcombank';

// 			let date = new Date();
// 			dataJson.timeUpdate =
// 				date.getHours() +
// 				':' +
// 				date.getMinutes() +
// 				':' +
// 				date.getSeconds() +
// 				' ' +
// 				date.getDate() +
// 				'/' +
// 				(date.getMonth() + 1) +
// 				'/' +
// 				date.getFullYear();

// 			dataJson.audBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.audBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.audSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.cadBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.cadBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.cadSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.chfBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.chfBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.chfSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.cnyBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.cnyBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.cnySell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.dkkBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.dkkBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.dkkSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.eurBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.eurBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.eurSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.gbpBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.gbpBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.gbpSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.hkdBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.hkdBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.hkdSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.inrBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.inrBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.inrSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.jpyBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.jpyBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.jpySell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.krwBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.krwBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.krwSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.kwdBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.kwdBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.kwdSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.myrBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.myrBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.myrSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.nokBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.nokBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.nokSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.rubBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.rubBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.rubSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.sarBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.sarBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.sarSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.sekBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.sekBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.sekSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.sgdBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.sgdBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.sgdSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.thbBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.thbBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.thbSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(5)'
// 			)?.innerText;

// 			dataJson.usdBuyCast = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(3)'
// 			)?.innerText;
// 			dataJson.usdBuyTransfer = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(4)'
// 			)?.innerText;
// 			dataJson.usdSell = $(
// 				'#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(5)'
// 			)?.innerText;
// 		} catch (err) {
// 			console.log(err);
// 		}
// 		return dataJson;
// 	};

// 	let data = false;
// 	let attemps = 0;
// 	//retry request until it gets data or tries 3 times
// 	while (data == false && attemps < 2) {
// 		console.log('loop' + attemps);
// 		data = await collectQueryData(urlVietcombank, pageEvaluateFunc);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// Vietcombank.findOneAndUpdate(
// 	{ symbol: data.symbol },
// 	{
// 		name: data.name,
// 		symbol: data.symbol,
// 		timeUpdate: data.timeUpdate,

// 		audBuyCast: data.audBuyCast,
// 		audBuyTransfer: data.audBuyTransfer,
// 		audSell: data.audSell,

// 		cadBuyCast: data.cadBuyCast,
// 		cadBuyTransfer: data.cadBuyTransfer,
// 		cadSell: data.cadSell,

// 		chfBuyCast: data.chfBuyCast,
// 		chfBuyTransfer: data.chfBuyTransfer,
// 		chfSell: data.chfSell,

// 		cnyBuyCast: data.cnyBuyCast,
// 		cnyBuyTransfer: data.cnyBuyTransfer,
// 		cnySell: data.cnySell,

// 		dkkBuyCast: data.dkkBuyCast,
// 		dkkBuyTransfer: data.dkkBuyTransfer,
// 		dkkSell: data.dkkSell,

// 		eurBuyCast: data.eurBuyCast,
// 		eurBuyTransfer: data.eurBuyTransfer,
// 		eurSell: data.eurSell,

// 		gbpBuyCast: data.gbpBuyCast,
// 		gbpBuyTransfer: data.gbpBuyTransfer,
// 		gbpSell: data.gbpSell,

// 		hkdBuyCast: data.hkdBuyCast,
// 		hkdBuyTransfer: data.hkdBuyTransfer,
// 		hkdSell: data.hkdSell,

// 		inrBuyCast: data.inrBuyCast,
// 		inrBuyTransfer: data.inrBuyTransfer,
// 		inrSell: data.inrSell,

// 		jpyBuyCast: data.jpyBuyCast,
// 		jpyBuyTransfer: data.jpyBuyTransfer,
// 		jpySell: data.jpySell,

// 		krwBuyCast: data.krwBuyCast,
// 		krwBuyTransfer: data.krwBuyTransfer,
// 		krwSell: data.krwSell,

// 		kwdBuyCast: data.kwdBuyCast,
// 		kwdBuyTransfer: data.kwdBuyTransfer,
// 		kwdSell: data.kwdSell,

// 		myrBuyCast: data.myrBuyCast,
// 		myrBuyTransfer: data.myrBuyTransfer,
// 		myrSell: data.myrSell,

// 		nokBuyCast: data.nokBuyCast,
// 		nokBuyTransfer: data.nokBuyTransfer,
// 		nokSell: data.nokSell,

// 		rubBuyCast: data.rubBuyCast,
// 		rubBuyTransfer: data.rubBuyTransfer,
// 		rubSell: data.rubSell,

// 		sarBuyCast: data.sarBuyCast,
// 		sarBuyTransfer: data.sarBuyTransfer,
// 		sarSell: data.sarSell,

// 		sekBuyCast: data.sekBuyCast,
// 		sekBuyTransfer: data.sekBuyTransfer,
// 		sekSell: data.sekSell,

// 		sgdBuyCast: data.sgdBuyCast,
// 		sgdBuyTransfer: data.sgdBuyTransfer,
// 		sgdSell: data.sgdSell,

// 		thbBuyCast: data.thbBuyCast,
// 		thbBuyTransfer: data.thbBuyTransfer,
// 		thbSell: data.thbSell,

// 		usdBuyCast: data.usdBuyCast,
// 		usdBuyTransfer: data.usdBuyTransfer,
// 		usdSell: data.usdSell,
// 	},
// 	{ upsert: true }
// )
// 	// .then((doc) => console.log(doc))
// 	.catch((err) => console.log(data.symbol));

// 			// await browser.close();
// 		}

// 		if (data === false) {
// 			//wait a few second, also a good idea to swap proxy here
// 			console.log('Recrawl........' + attemps);
// 			await new Promise((resolve) => setTimeout(resolve, 3000));
// 		}
// 	}
// });

// const crawlBidv = asyncHandler(async () => {
// 	const pageEvaluateFunc = async () => {
// 		const $ = document.querySelector.bind(document);

// 		let dataJson = {};

// 		try {
// 			dataJson.name =
// 				'Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam';
// 			dataJson.symbol = 'Bidv';

// 			let date = new Date();
// 			dataJson.timeUpdate =
// 				date.getHours() +
// 				':' +
// 				date.getMinutes() +
// 				':' +
// 				date.getSeconds() +
// 				' ' +
// 				date.getDate() +
// 				'/' +
// 				(date.getMonth() + 1) +
// 				'/' +
// 				date.getFullYear();

// 			dataJson.usdBuyCast = $(
// 				'table tbody :nth-child(1) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.usdBuyTransfer = $(
// 				'table tbody :nth-child(1) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.usdSell = $(
// 				'table tbody :nth-child(1) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.gbpBuyCast = $(
// 				'table tbody :nth-child(4) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.gbpBuyTransfer = $(
// 				'table tbody :nth-child(4) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.gbpSell = $(
// 				'table tbody :nth-child(4) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.hkdBuyCast = $(
// 				'table tbody :nth-child(5) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.hkdBuyTransfer = $(
// 				'table tbody :nth-child(5) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.hkdSell = $(
// 				'table tbody :nth-child(5) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.chfBuyCast = $(
// 				'table tbody :nth-child(6) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.chfBuyTransfer = $(
// 				'table tbody :nth-child(6) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.chfSell = $(
// 				'table tbody :nth-child(6) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.jpyBuyCast = $(
// 				'table tbody :nth-child(7) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.jpyBuyTransfer = $(
// 				'table tbody :nth-child(7) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.jpySell = $(
// 				'table tbody :nth-child(7) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.thbBuyCast = $(
// 				'table tbody :nth-child(8) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.thbBuyTransfer = $(
// 				'table tbody :nth-child(8) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.thbSell = $(
// 				'table tbody :nth-child(8) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.audBuyCast = $(
// 				'table tbody :nth-child(9) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.audBuyTransfer = $(
// 				'table tbody :nth-child(9) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.audSell = $(
// 				'table tbody :nth-child(9) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.cadBuyCast = $(
// 				'table tbody :nth-child(10) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.cadBuyTransfer = $(
// 				'table tbody :nth-child(10) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.cadSell = $(
// 				'table tbody :nth-child(10) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.sgdBuyCast = $(
// 				'table tbody :nth-child(11) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.sgdBuyTransfer = $(
// 				'table tbody :nth-child(11) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.sgdSell = $(
// 				'table tbody :nth-child(11) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.sekBuyCast = $(
// 				'table tbody :nth-child(12) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.sekBuyTransfer = $(
// 				'table tbody :nth-child(12) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.sekSell = $(
// 				'table tbody :nth-child(12) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.lakBuyCast = $(
// 				'table tbody :nth-child(13) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.lakBuyTransfer = $(
// 				'table tbody :nth-child(13) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.lakSell = $(
// 				'table tbody :nth-child(13) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.dkkBuyCast = $(
// 				'table tbody :nth-child(14) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.dkkBuyTransfer = $(
// 				'table tbody :nth-child(14) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.dkkSell = $(
// 				'table tbody :nth-child(14) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.nokBuyCast = $(
// 				'table tbody :nth-child(15) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.nokBuyTransfer = $(
// 				'table tbody :nth-child(15) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.nokSell = $(
// 				'table tbody :nth-child(15) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.cnyBuyCast = $(
// 				'table tbody :nth-child(16) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.cnyBuyTransfer = $(
// 				'table tbody :nth-child(16) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.cnySell = $(
// 				'table tbody :nth-child(16) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.rubBuyCast = $(
// 				'table tbody :nth-child(17) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.rubBuyTransfer = $(
// 				'table tbody :nth-child(17) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.rubSell = $(
// 				'table tbody :nth-child(17) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.nzdBuyCast = $(
// 				'table tbody :nth-child(18) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.nzdBuyTransfer = $(
// 				'table tbody :nth-child(18) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.nzdSell = $(
// 				'table tbody :nth-child(18) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.krwBuyCast = $(
// 				'table tbody :nth-child(19) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.krwBuyTransfer = $(
// 				'table tbody :nth-child(19) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.krwSell = $(
// 				'table tbody :nth-child(19) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.eurBuyCast = $(
// 				'table tbody :nth-child(20) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.eurBuyTransfer = $(
// 				'table tbody :nth-child(20) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.eurSell = $(
// 				'table tbody :nth-child(20) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.twdBuyCast = $(
// 				'table tbody :nth-child(21) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.twdBuyTransfer = $(
// 				'table tbody :nth-child(21) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.twdSell = $(
// 				'table tbody :nth-child(21) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;

// 			dataJson.myrBuyCast = $(
// 				'table tbody :nth-child(22) :nth-child(3) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.myrBuyTransfer = $(
// 				'table tbody :nth-child(22) :nth-child(4) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 			dataJson.myrSell = $(
// 				'table tbody :nth-child(22) :nth-child(5) :nth-child(2) :nth-child(2) '
// 			)?.innerText;
// 		} catch (err) {
// 			console.log(err);
// 		}
// 		return dataJson;
// 	};

// 	let data = false;
// 	let attemps = 0;
// 	//retry request until it gets data or tries 3 times
// 	while (data == false && attemps < 2) {
// 		console.log('loop' + attemps);
// 		data = await collectQueryData(urlBidv, pageEvaluateFunc);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// Bidv.findOneAndUpdate(
// 	{ symbol: data.symbol },
// 	{
// 		name: data.name,
// 		symbol: data.symbol,
// 		timeUpdate: data.timeUpdate,

// 		usdBuyCast: data.usdBuyCast,
// 		usdBuyTransfer: data.usdBuyTransfer,
// 		usdSell: data.usdSell,

// 		gbpBuyCast: data.gbpBuyCast,
// 		gbpBuyTransfer: data.gbpBuyTransfer,
// 		gbpSell: data.gbpSell,

// 		hkdBuyCast: data.hkdBuyCast,
// 		hkdBuyTransfer: data.hkdBuyTransfer,
// 		hkdSell: data.hkdSell,

// 		chfBuyCast: data.chfBuyCast,
// 		chfBuyTransfer: data.chfBuyTransfer,
// 		chfSell: data.chfSell,

// 		jpyBuyCast: data.jpyBuyCast,
// 		jpyBuyTransfer: data.jpyBuyTransfer,
// 		jpySell: data.jpySell,

// 		thbBuyCast: data.thbBuyCast,
// 		thbBuyTransfer: data.thbBuyTransfer,
// 		thbSell: data.thbSell,

// 		audBuyCast: data.audBuyCast,
// 		audBuyTransfer: data.audBuyTransfer,
// 		audSell: data.audSell,

// 		cadBuyCast: data.cadBuyCast,
// 		cadBuyTransfer: data.cadBuyTransfer,
// 		cadSell: data.cadSell,

// 		sgdBuyCast: data.sgdBuyCast,
// 		sgdBuyTransfer: data.sgdBuyTransfer,
// 		sgdSell: data.sgdSell,

// 		sekBuyCast: data.sekBuyCast,
// 		sekBuyTransfer: data.sekBuyTransfer,
// 		sekSell: data.sekSell,

// 		lakBuyCast: data.lakBuyCast,
// 		lakBuyTransfer: data.lakBuyTransfer,
// 		lakSell: data.lakSell,

// 		dkkBuyCast: data.dkkBuyCast,
// 		dkkBuyTransfer: data.dkkBuyTransfer,
// 		dkkSell: data.dkkSell,

// 		nokBuyCast: data.nokBuyCast,
// 		nokBuyTransfer: data.nokBuyTransfer,
// 		nokSell: data.nokSell,

// 		cnyBuyCast: data.cnyBuyCast,
// 		cnyBuyTransfer: data.cnyBuyTransfer,
// 		cnySell: data.cnySell,

// 		rubBuyCast: data.rubBuyCast,
// 		rubBuyTransfer: data.rubBuyTransfer,
// 		rubSell: data.rubSell,

// 		nzdBuyCast: data.nzdBuyCast,
// 		nzdBuyTransfer: data.nzdBuyTransfer,
// 		nzdSell: data.nzdSell,

// 		krwBuyCast: data.krwBuyCast,
// 		krwBuyTransfer: data.krwBuyTransfer,
// 		krwSell: data.krwSell,

// 		eurBuyCast: data.eurBuyCast,
// 		eurBuyTransfer: data.eurBuyTransfer,
// 		eurSell: data.eurSell,

// 		twdBuyCast: data.twdBuyCast,
// 		twdBuyTransfer: data.twdBuyTransfer,
// 		twdSell: data.twdSell,

// 		myrBuyCast: data.myrBuyCast,
// 		myrBuyTransfer: data.myrBuyTransfer,
// 		myrSell: data.myrSell,
// 	},
// 	{ upsert: true }
// )
// 	// .then((doc) => console.log(doc))
// 	.catch((err) => console.log(data.symbol));

// 			// await browser.close();
// 		}

// 		if (data === false) {
// 			//wait a few second, also a good idea to swap proxy here
// 			console.log('Recrawl........' + attemps);
// 			await new Promise((resolve) => setTimeout(resolve, 3000));
// 		}
// 	}
// });

// const crawlTechcombank = asyncHandler(async () => {
// 	const pageEvaluateFunc = async () => {
// 		const $ = document.querySelector.bind(document);

// 		let dataJson = {};

// try {
// 	dataJson.name = 'Ngân hàng Thương mại cổ phần Kỹ Thương Việt Nam';
// 	dataJson.symbol = 'Techcombank';

// 	let date = new Date();
// 	dataJson.timeUpdate =
// 		date.getHours() +
// 		':' +
// 		date.getMinutes() +
// 		':' +
// 		date.getSeconds() +
// 		' ' +
// 		date.getDate() +
// 		'/' +
// 		(date.getMonth() + 1) +
// 		'/' +
// 		date.getFullYear();

// 	dataJson.usdBuyCast = $(
// 		'table tbody :nth-child(1) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.usdBuyTransfer = $(
// 		'table tbody :nth-child(1) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.usdSell = $(
// 		'table tbody :nth-child(1) :nth-child(3)'
// 	)?.innerText;

// 	dataJson.eurBuyCast = $(
// 		'table tbody :nth-child(4) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.eurBuyTransfer = $(
// 		'table tbody :nth-child(4) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.eurSell = $(
// 		'table tbody :nth-child(4) :nth-child(3)'
// 	)?.innerText;

// 	dataJson.audBuyCast = $(
// 		'table tbody :nth-child(5) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.audBuyTransfer = $(
// 		'table tbody :nth-child(5) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.audSell = $(
// 		'table tbody :nth-child(5) :nth-child(3)'
// 	)?.innerText;

// 	dataJson.cadBuyCast = $(
// 		'table tbody :nth-child(6) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.cadBuyTransfer = $(
// 		'table tbody :nth-child(6) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.cadSell = $(
// 		'table tbody :nth-child(6) :nth-child(3)'
// 	)?.innerText;

// 	dataJson.chfBuyCast = $(
// 		'table tbody :nth-child(7) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.chfBuyTransfer = $(
// 		'table tbody :nth-child(7) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.chfSell = $(
// 		'table tbody :nth-child(7) :nth-child(3)'
// 	)?.innerText;

// 	dataJson.cnyBuyCast = $(
// 		'table tbody :nth-child(8) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.cnyBuyTransfer = $(
// 		'table tbody :nth-child(8) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.cnySell = $(
// 		'table tbody :nth-child(8) :nth-child(3)'
// 	)?.innerText;

// 	dataJson.gbpBuyCast = $(
// 		'table tbody :nth-child(9) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.gbpBuyTransfer = $(
// 		'table tbody :nth-child(9) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.gbpSell = $(
// 		'table tbody :nth-child(9) :nth-child(3)'
// 	)?.innerText;

// 	dataJson.hkdBuyCast = $(
// 		'table tbody :nth-child(10) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.hkdBuyTransfer = $(
// 		'table tbody :nth-child(10) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.hkdSell = $(
// 		'table tbody :nth-child(10) :nth-child(3)'
// 	)?.innerText;
// 	//
// 	dataJson.jpyBuyCast = $(
// 		'table tbody :nth-child(11) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.jpyBuyTransfer = $(
// 		'table tbody :nth-child(11) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.jpySell = $(
// 		'table tbody :nth-child(11) :nth-child(3)'
// 	)?.innerText;

// 	dataJson.krwBuyCast = $(
// 		'table tbody :nth-child(12) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.krwBuyTransfer = $(
// 		'table tbody :nth-child(12) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.krwSell = $(
// 		'table tbody :nth-child(12) :nth-child(3)'
// 	)?.innerText;

// 	dataJson.sgdBuyCast = $(
// 		'table tbody :nth-child(13) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.sgdBuyTransfer = $(
// 		'table tbody :nth-child(13) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.sgdSell = $(
// 		'table tbody :nth-child(13) :nth-child(3)'
// 	)?.innerText;

// 	dataJson.thbBuyCast = $(
// 		'table tbody :nth-child(14) :nth-child(2)'
// 	)?.innerText;
// 	dataJson.thbBuyTransfer = $(
// 		'table tbody :nth-child(14) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.thbSell = $(
// 		'table tbody :nth-child(14) :nth-child(3)'
// 	)?.innerText;
// } catch (err) {
// 	console.log(err);
// }
// 		return dataJson;
// 	};

// 	let data = false;
// 	let attemps = 0;
// 	//retry request until it gets data or tries 3 times
// 	while (data == false && attemps < 2) {
// 		console.log('loop' + attemps);
// 		data = await collectQueryData(urlTechcombank, pageEvaluateFunc);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// Techcombank.findOneAndUpdate(
// 	{ symbol: data.symbol },
// 	{
// 		name: data.name,
// 		symbol: data.symbol,
// 		timeUpdate: data.timeUpdate,

// 		audBuyCast: data.audBuyCast,
// 		audBuyTransfer: data.audBuyTransfer,
// 		audSell: data.audSell,

// 		cadBuyCast: data.cadBuyCast,
// 		cadBuyTransfer: data.cadBuyTransfer,
// 		cadSell: data.cadSell,

// 		chfBuyCast: data.chfBuyCast,
// 		chfBuyTransfer: data.chfBuyTransfer,
// 		chfSell: data.chfSell,

// 		cnyBuyCast: data.cnyBuyCast,
// 		cnyBuyTransfer: data.cnyBuyTransfer,
// 		cnySell: data.cnySell,

// 		eurBuyCast: data.eurBuyCast,
// 		eurBuyTransfer: data.eurBuyTransfer,
// 		eurSell: data.eurSell,

// 		gbpBuyCast: data.gbpBuyCast,
// 		gbpBuyTransfer: data.gbpBuyTransfer,
// 		gbpSell: data.gbpSell,

// 		hkdBuyCast: data.hkdBuyCast,
// 		hkdBuyTransfer: data.hkdBuyTransfer,
// 		hkdSell: data.hkdSell,

// 		jpyBuyCast: data.jpyBuyCast,
// 		jpyBuyTransfer: data.jpyBuyTransfer,
// 		jpySell: data.jpySell,

// 		krwBuyCast: data.krwBuyCast,
// 		krwBuyTransfer: data.krwBuyTransfer,
// 		krwSell: data.krwSell,

// 		myrBuyCast: data.myrBuyCast,
// 		myrBuyTransfer: data.myrBuyTransfer,
// 		myrSell: data.myrSell,

// 		sgdBuyCast: data.sgdBuyCast,
// 		sgdBuyTransfer: data.sgdBuyTransfer,
// 		sgdSell: data.sgdSell,

// 		thbBuyCast: data.thbBuyCast,
// 		thbBuyTransfer: data.thbBuyTransfer,
// 		thbSell: data.thbSell,

// 		usdBuyCast: data.usdBuyCast,
// 		usdBuyTransfer: data.usdBuyTransfer,
// 		usdSell: data.usdSell,
// 	},
// 	{ upsert: true }
// )
// 	// .then((doc) => console.log(doc))
// 	.catch((err) => console.log(data.symbol));

// 			// await browser.close();
// 		}

// 		if (data === false) {
// 			//wait a few second, also a good idea to swap proxy here
// 			console.log('Recrawl........' + attemps);
// 			await new Promise((resolve) => setTimeout(resolve, 3000));
// 		}
// 	}
// });

// const crawlVietinbank = asyncHandler(async () => {
// 	const pageEvaluateFunc = async () => {
// 		const $ = document.querySelector.bind(document);

// 		let dataJson = {};

// try {
// 	dataJson.name = 'Ngân hàng Thương mại cổ phần Công Thương Việt Nam';
// 	dataJson.symbol = 'VietinBank';

// 	let date = new Date();
// 	dataJson.timeUpdate =
// 		date.getHours() +
// 		':' +
// 		date.getMinutes() +
// 		':' +
// 		date.getSeconds() +
// 		' ' +
// 		date.getDate() +
// 		'/' +
// 		(date.getMonth() + 1) +
// 		'/' +
// 		date.getFullYear();

// 	dataJson.audBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(3) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.audBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(3) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.audSell = $(
// 		'#hor-ex-b tbody :nth-child(3) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.cadBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(4) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.cadBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(4) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.cadSell = $(
// 		'#hor-ex-b tbody :nth-child(4) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.chfBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(5) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.chfBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(5) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.chfSell = $(
// 		'#hor-ex-b tbody :nth-child(5) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.cnyBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(6) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.cnyBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(6) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.cnySell = $(
// 		'#hor-ex-b tbody :nth-child(6) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.dkkBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(7) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.dkkBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(7) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.dkkSell = $(
// 		'#hor-ex-b tbody :nth-child(7) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.eurBuyCast = document
// 		.querySelector('#hor-ex-b tbody :nth-child(8) :nth-child(3)')
// 		?.innerText.slice(1);
// 	dataJson.eurBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(8) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.eurSell = $(
// 		'#hor-ex-b tbody :nth-child(8) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.gbpBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(10) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.gbpBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(10) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.gbpSell = $(
// 		'#hor-ex-b tbody :nth-child(10) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.hkdBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(11) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.hkdBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(11) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.hkdSell = $(
// 		'#hor-ex-b tbody :nth-child(11) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.jpyBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(12) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.jpyBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(12) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.jpySell = $(
// 		'#hor-ex-b tbody :nth-child(12) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.krwBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(13) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.krwBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(13) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.krwSell = $(
// 		'#hor-ex-b tbody :nth-child(13) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.lakBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(14) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.lakBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(14) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.lakSell = $(
// 		'#hor-ex-b tbody :nth-child(14) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.nokBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(15) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.nokBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(15) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.nokSell = $(
// 		'#hor-ex-b tbody :nth-child(15) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.nzdBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(16) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.nzdBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(16) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.nzdSell = $(
// 		'#hor-ex-b tbody :nth-child(16) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.sekBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(17) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.sekBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(17) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.sekSell = $(
// 		'#hor-ex-b tbody :nth-child(17) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.sgdBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(18) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.sgdBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(18) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.sgdSell = $(
// 		'#hor-ex-b tbody :nth-child(18) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.thbBuyCast = $(
// 		'#hor-ex-b tbody :nth-child(19) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.thbBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(19) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.thbSell = $(
// 		'#hor-ex-b tbody :nth-child(19) :nth-child(5)'
// 	)?.innerText;

// 	dataJson.usdBuyCast = document
// 		.querySelector('#hor-ex-b tbody :nth-child(20) :nth-child(3)')
// 		?.innerText.slice(1);
// 	dataJson.usdBuyTransfer = $(
// 		'#hor-ex-b tbody :nth-child(20) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.usdSell = $(
// 		'#hor-ex-b tbody :nth-child(20) :nth-child(5)'
// 	)?.innerText;
// } catch (err) {
// 	console.log(err);
// }
// 		return dataJson;
// 	};

// 	let data = false;
// 	let attemps = 0;
// 	//retry request until it gets data or tries 3 times
// 	while (data == false && attemps < 2) {
// 		console.log('loop' + attemps);
// 		data = await collectQueryData(urlVietinbank, pageEvaluateFunc);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// 			Vietinbank.findOneAndUpdate(
// 				{ symbol: data.symbol },
// 				{
// 					name: data.name,
// 					symbol: data.symbol,
// 					timeUpdate: data.timeUpdate,

// 					audBuyCast: data.audBuyCast,
// 					audBuyTransfer: data.audBuyTransfer,
// 					audSell: data.audSell,

// 					cadBuyCast: data.cadBuyCast,
// 					cadBuyTransfer: data.cadBuyTransfer,
// 					cadSell: data.cadSell,

// 					chfBuyCast: data.chfBuyCast,
// 					chfBuyTransfer: data.chfBuyTransfer,
// 					chfSell: data.chfSell,

// 					cnyBuyCast: data.cnyBuyCast,
// 					cnyBuyTransfer: data.cnyBuyTransfer,
// 					cnySell: data.cnySell,

// 					dkkBuyCast: data.dkkBuyCast,
// 					dkkBuyTransfer: data.dkkBuyTransfer,
// 					dkkSell: data.dkkSell,

// 					eurBuyCast: data.eurBuyCast,
// 					eurBuyTransfer: data.eurBuyTransfer,
// 					eurSell: data.eurSell,

// 					gbpBuyCast: data.gbpBuyCast,
// 					gbpBuyTransfer: data.gbpBuyTransfer,
// 					gbpSell: data.gbpSell,

// 					hkdBuyCast: data.hkdBuyCast,
// 					hkdBuyTransfer: data.hkdBuyTransfer,
// 					hkdSell: data.hkdSell,

// 					jpyBuyCast: data.jpyBuyCast,
// 					jpyBuyTransfer: data.jpyBuyTransfer,
// 					jpySell: data.jpySell,

// 					krwBuyCast: data.krwBuyCast,
// 					krwBuyTransfer: data.krwBuyTransfer,
// 					krwSell: data.krwSell,

// 					lakBuyCast: data.lakBuyCast,
// 					lakBuyTransfer: data.lakBuyTransfer,
// 					lakSell: data.lakSell,

// 					nokBuyCast: data.nokBuyCast,
// 					nokBuyTransfer: data.nokBuyTransfer,
// 					nokSell: data.nokSell,

// 					nzdBuyCast: data.nzdBuyCast,
// 					nzdBuyTransfer: data.nzdBuyTransfer,
// 					nzdSell: data.nzdSell,

// 					sekBuyCast: data.sekBuyCast,
// 					sekBuyTransfer: data.sekBuyTransfer,
// 					sekSell: data.sekSell,

// 					sgdBuyCast: data.sgdBuyCast,
// 					sgdBuyTransfer: data.sgdBuyTransfer,
// 					sgdSell: data.sgdSell,

// 					thbBuyCast: data.thbBuyCast,
// 					thbBuyTransfer: data.thbBuyTransfer,
// 					thbSell: data.thbSell,

// 					usdBuyCast: data.usdBuyCast,
// 					usdBuyTransfer: data.usdBuyTransfer,
// 					usdSell: data.usdSell,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc))
// 				.catch((err) => console.log(data.symbol));

// 			// await browser.close();
// 		}

// 		if (data === false) {
// 			//wait a few second, also a good idea to swap proxy here
// 			console.log('Recrawl........' + attemps);
// 			await new Promise((resolve) => setTimeout(resolve, 3000));
// 		}
// 	}
// });

// const crawlMbbank = asyncHandler(async () => {
// 	const pageEvaluateFunc = async () => {
// 		const $ = document.querySelector.bind(document);

// 		let dataJson = {};

// try {
// 	dataJson.name = 'Ngân hàng Thương mại Cổ phần Quân đội';
// 	dataJson.symbol = 'Mbbank';

// 	let date = new Date();
// 	dataJson.timeUpdate =
// 		date.getHours() +
// 		':' +
// 		date.getMinutes() +
// 		':' +
// 		date.getSeconds() +
// 		' ' +
// 		date.getDate() +
// 		'/' +
// 		(date.getMonth() + 1) +
// 		'/' +
// 		date.getFullYear();

// 	dataJson.usdBuyCast = $(
// 		'#main tbody :nth-child(1) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.usdBuyTransfer = $(
// 		'#main tbody :nth-child(1) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.usdSellCast = $(
// 		'#main tbody :nth-child(1) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.usdSellTransfer = $(
// 		'#main tbody :nth-child(1) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.eurBuyCast = $(
// 		'#main tbody :nth-child(4) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.eurBuyTransfer = $(
// 		'#main tbody :nth-child(4) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.eurSellCast = $(
// 		'#main tbody :nth-child(4) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.eurSellTransfer = $(
// 		'#main tbody :nth-child(4) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.audBuyCast = $(
// 		'#main tbody :nth-child(5) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.audBuyTransfer = $(
// 		'#main tbody :nth-child(5) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.audSellCast = $(
// 		'#main tbody :nth-child(5) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.audSellTransfer = $(
// 		'#main tbody :nth-child(5) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.cadBuyCast = $(
// 		'#main tbody :nth-child(6) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.cadBuyTransfer = $(
// 		'#main tbody :nth-child(6) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.cadSellCast = $(
// 		'#main tbody :nth-child(6) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.cadSellTransfer = $(
// 		'#main tbody :nth-child(6) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.chfBuyCast = $(
// 		'#main tbody :nth-child(7) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.chfBuyTransfer = $(
// 		'#main tbody :nth-child(7) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.chfSellCast = $(
// 		'#main tbody :nth-child(7) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.chfSellTransfer = $(
// 		'#main tbody :nth-child(7) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.cnyBuyCast = $(
// 		'#main tbody :nth-child(8) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.cnyBuyTransfer = $(
// 		'#main tbody :nth-child(8) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.cnySellCast = $(
// 		'#main tbody :nth-child(8) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.cnySellTransfer = $(
// 		'#main tbody :nth-child(8) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.gbpBuyCast = $(
// 		'#main tbody :nth-child(9) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.gbpBuyTransfer = $(
// 		'#main tbody :nth-child(9) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.gbpSellCast = $(
// 		'#main tbody :nth-child(9) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.gbpSellTransfer = $(
// 		'#main tbody :nth-child(9) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.hkdBuyCast = $(
// 		'#main tbody :nth-child(10) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.hkdBuyTransfer = $(
// 		'#main tbody :nth-child(10) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.hkdSellCast = $(
// 		'#main tbody :nth-child(10) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.hkdSellTransfer = $(
// 		'#main tbody :nth-child(10) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.jpyBuyCast = $(
// 		'#main tbody :nth-child(11) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.jpyBuyTransfer = $(
// 		'#main tbody :nth-child(11) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.jpySellCast = $(
// 		'#main tbody :nth-child(11) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.jpySellTransfer = $(
// 		'#main tbody :nth-child(11) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.khrBuyCast = $(
// 		'#main tbody :nth-child(12) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.khrBuyTransfer = $(
// 		'#main tbody :nth-child(12) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.khrSellCast = $(
// 		'#main tbody :nth-child(12) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.khrSellTransfer = $(
// 		'#main tbody :nth-child(12) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.krwBuyCast = $(
// 		'#main tbody :nth-child(13) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.krwBuyTransfer = $(
// 		'#main tbody :nth-child(13) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.krwSellCast = $(
// 		'#main tbody :nth-child(13) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.krwSellTransfer = $(
// 		'#main tbody :nth-child(13) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.lakBuyCast = $(
// 		'#main tbody :nth-child(14) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.lakBuyTransfer = $(
// 		'#main tbody :nth-child(14) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.lakSellCast = $(
// 		'#main tbody :nth-child(14) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.lakSellTransfer = $(
// 		'#main tbody :nth-child(14) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.nzdBuyCast = $(
// 		'#main tbody :nth-child(15) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.nzdBuyTransfer = $(
// 		'#main tbody :nth-child(15) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.nzdSellCast = $(
// 		'#main tbody :nth-child(15) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.nzdSellTransfer = $(
// 		'#main tbody :nth-child(15) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.sekBuyCast = $(
// 		'#main tbody :nth-child(16) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.sekBuyTransfer = $(
// 		'#main tbody :nth-child(16) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.sekSellCast = $(
// 		'#main tbody :nth-child(16) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.sekSellTransfer = $(
// 		'#main tbody :nth-child(16) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.sgdBuyCast = $(
// 		'#main tbody :nth-child(17) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.sgdBuyTransfer = $(
// 		'#main tbody :nth-child(17) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.sgdSellCast = $(
// 		'#main tbody :nth-child(17) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.sgdSellTransfer = $(
// 		'#main tbody :nth-child(17) :nth-child(6)'
// 	)?.innerText;

// 	dataJson.thbBuyCast = $(
// 		'#main tbody :nth-child(18) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.thbBuyTransfer = $(
// 		'#main tbody :nth-child(18) :nth-child(4)'
// 	)?.innerText;
// 	dataJson.thbSellCast = $(
// 		'#main tbody :nth-child(18) :nth-child(5)'
// 	)?.innerText;
// 	dataJson.thbSellTransfer = $(
// 		'#main tbody :nth-child(18) :nth-child(6)'
// 	)?.innerText;
// } catch (err) {
// 	console.log(err);
// }
// 		return dataJson;
// 	};

// 	let data = false;
// 	let attemps = 0;
// 	//retry request until it gets data or tries 3 times
// 	while (data == false && attemps < 2) {
// 		console.log('loop' + attemps);
// 		data = await collectQueryData(urlMbbank, pageEvaluateFunc);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// Mbbank.findOneAndUpdate(
// 	{ symbol: data.symbol },
// 	{
// 		name: data.name,
// 		symbol: data.symbol,
// 		timeUpdate: data.timeUpdate,

// 		usdBuyCast: data.usdBuyCast,
// 		usdBuyTransfer: data.usdBuyTransfer,
// 		usdSellCast: data.usdSellCast,
// 		usdSellTransfer: data.usdSellTransfer,

// 		eurBuyCast: data.eurBuyCast,
// 		eurBuyTransfer: data.eurBuyTransfer,
// 		eurSellCast: data.eurSellCast,
// 		eurSellTransfer: data.eurSellTransfer,

// 		gbpBuyCast: data.gbpBuyCast,
// 		gbpBuyTransfer: data.gbpBuyTransfer,
// 		gbpSellCast: data.gbpSellCast,
// 		gbpSellTransfer: data.gbpSellTransfer,

// 		jpyBuyCast: data.jpyBuyCast,
// 		jpyBuyTransfer: data.jpyBuyTransfer,
// 		jpySellCast: data.jpySellCast,
// 		jpySellTransfer: data.jpySellTransfer,

// 		hkdBuyCast: data.hkdBuyCast,
// 		hkdBuyTransfer: data.hkdBuyTransfer,
// 		hkdSellCast: data.hkdSellCast,
// 		hkdSellTransfer: data.hkdSellTransfer,

// 		cnyBuyCast: data.cnyBuyCast,
// 		cnyBuyTransfer: data.cnyBuyTransfer,
// 		cnySellCast: data.cnySellCast,
// 		cnySellTransfer: data.cnySellTransfer,

// 		audBuyCast: data.audBuyCast,
// 		audBuyTransfer: data.audBuyTransfer,
// 		audSellCast: data.audSellCast,
// 		audSellTransfer: data.audSellTransfer,

// 		nzdBuyCast: data.nzdBuyCast,
// 		nzdBuyTransfer: data.nzdBuyTransfer,
// 		nzdSellCast: data.nzdSellCast,
// 		nzdSellTransfer: data.nzdSellTransfer,

// 		cadBuyCast: data.cadBuyCast,
// 		cadBuyTransfer: data.cadBuyTransfer,
// 		cadSellCast: data.cadSellCast,
// 		cadSellTransfer: data.cadSellTransfer,

// 		sgdBuyCast: data.sgdBuyCast,
// 		sgdBuyTransfer: data.sgdBuyTransfer,
// 		sgdSellCast: data.sgdSellCast,
// 		sgdSellTransfer: data.sgdSellTransfer,

// 		thbBuyCast: data.thbBuyCast,
// 		thbBuyTransfer: data.thbBuyTransfer,
// 		thbSellCast: data.thbSellCast,
// 		thbSellTransfer: data.thbSellTransfer,

// 		chfBuyCast: data.chfBuyCast,
// 		chfBuyTransfer: data.chfBuyTransfer,
// 		chfSellCast: data.chfSellCast,
// 		chfSellTransfer: data.chfSellTransfer,

// 		krwBuyCast: data.krwBuyCast,
// 		krwBuyTransfer: data.krwBuyTransfer,
// 		krwSellCast: data.krwSellCast,
// 		krwSellTransfer: data.krwSellTransfer,

// 		lakBuyCast: data.lakBuyCast,
// 		lakBuyTransfer: data.lakBuyTransfer,
// 		lakSellCast: data.lakSellCast,
// 		lakSellTransfer: data.lakSellTransfer,

// 		khrBuyCast: data.khrBuyCast,
// 		khrBuyTransfer: data.khrBuyTransfer,
// 		khrSellCast: data.khrSellCast,
// 		khrSellTransfer: data.khrSellTransfer,

// 		sekBuyCast: data.sekBuyCast,
// 		sekBuyTransfer: data.sekBuyTransfer,
// 		sekSellCast: data.sekSellCast,
// 		sekSellTransfer: data.sekSellTransfer,
// 	},
// 	{ upsert: true }
// )
// 	// .then((doc) => console.log(doc))
// 	.catch((err) => console.log(data.symbol));

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
	crawlAgribank,
	crawlVietcombank,
	crawlBidv,
	crawlTechcombank,
	crawlVietinbank,
	crawlMbbank,
};

// const crawlAgribank = asyncHandler(async () => {
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

// 		let agribankData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

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

// 				dataJson.usdBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(1) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.usdBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(1) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.usdSell = $(
// 					'#tyGiaCn table tbody :nth-child(1) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.eurBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(2) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.eurBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(2) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.eurSell = $(
// 					'#tyGiaCn table tbody :nth-child(2) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.gbpBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(3) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.gbpBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(3) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.gbpSell = $(
// 					'#tyGiaCn table tbody :nth-child(3) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.hkdBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(4) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.hkdBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(4) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.hkdSell = $(
// 					'#tyGiaCn table tbody :nth-child(4) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.chfBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(5) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.chfBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(5) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.chfSell = $(
// 					'#tyGiaCn table tbody :nth-child(5) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.jpyBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(6) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.jpyBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(6) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.jpySell = $(
// 					'#tyGiaCn table tbody :nth-child(6) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.audBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(7) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.audBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(7) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.audSell = $(
// 					'#tyGiaCn table tbody :nth-child(7) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.sgdBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(8) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sgdBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(8) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.sgdSell = $(
// 					'#tyGiaCn table tbody :nth-child(8) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.thbBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(9) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.thbBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(9) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.thbSell = $(
// 					'#tyGiaCn table tbody :nth-child(9) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.cadBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(10) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.cadBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(10) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.cadSell = $(
// 					'#tyGiaCn table tbody :nth-child(10) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.nzdBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(11) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.nzdBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(11) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.nzdSell = $(
// 					'#tyGiaCn table tbody :nth-child(11) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.krwBuyCast = $(
// 					'#tyGiaCn table tbody :nth-child(12) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.krwBuyTransfer = $(
// 					'#tyGiaCn table tbody :nth-child(12) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.krwSell = $(
// 					'#tyGiaCn table tbody :nth-child(12) :nth-child(4)'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(agribankData)

// 		Agribank.findOneAndUpdate(
// 			{ symbol: agribankData.symbol },
// 			{
// 				name: agribankData.name,
// 				symbol: agribankData.symbol,
// 				timeUpdate: agribankData.timeUpdate,

// 				usdBuyCast: agribankData.usdBuyCast,
// 				usdBuyTransfer: agribankData.usdBuyTransfer,
// 				usdSell: agribankData.usdSell,

// 				eurBuyCast: agribankData.eurBuyCast,
// 				eurBuyTransfer: agribankData.eurBuyTransfer,
// 				eurSell: agribankData.eurSell,

// 				gbpBuyCast: agribankData.gbpBuyCast,
// 				gbpBuyTransfer: agribankData.gbpBuyTransfer,
// 				gbpSell: agribankData.gbpSell,

// 				hkdBuyCast: agribankData.hkdBuyCast,
// 				hkdBuyTransfer: agribankData.hkdBuyTransfer,
// 				hkdSell: agribankData.hkdSell,

// 				chfBuyCast: agribankData.chfBuyCast,
// 				chfBuyTransfer: agribankData.chfBuyTransfer,
// 				chfSell: agribankData.chfSell,

// 				jpyBuyCast: agribankData.jpyBuyCast,
// 				jpyBuyTransfer: agribankData.jpyBuyTransfer,
// 				jpySell: agribankData.jpySell,

// 				audBuyCast: agribankData.audBuyCast,
// 				audBuyTransfer: agribankData.audBuyTransfer,
// 				audSell: agribankData.audSell,

// 				sgdBuyCast: agribankData.sgdBuyCast,
// 				sgdBuyTransfer: agribankData.sgdBuyTransfer,
// 				sgdSell: agribankData.sgdSell,

// 				thbBuyCast: agribankData.thbBuyCast,
// 				thbBuyTransfer: agribankData.thbBuyTransfer,
// 				thbSell: agribankData.thbSell,

// 				cadBuyCast: agribankData.cadBuyCast,
// 				cadBuyTransfer: agribankData.cadBuyTransfer,
// 				cadSell: agribankData.cadSell,

// 				nzdBuyCast: agribankData.nzdBuyCast,
// 				nzdBuyTransfer: agribankData.nzdBuyTransfer,
// 				nzdSell: agribankData.nzdSell,

// 				krwBuyCast: agribankData.krwBuyCast,
// 				krwBuyTransfer: agribankData.krwBuyTransfer,
// 				krwSell: agribankData.krwSell,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(agribankData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlVietcombank = asyncHandler(async () => {
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

// 				dataJson.audBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.audBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.audSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(3) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.cadBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.cadBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.cadSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(4) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.chfBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.chfBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.chfSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(5) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.cnyBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.cnyBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.cnySell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(6) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.dkkBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.dkkBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.dkkSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(7) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.eurBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.eurBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.eurSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(8) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.gbpBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.gbpBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.gbpSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(9) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.hkdBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.hkdBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.hkdSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(10) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.inrBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.inrBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.inrSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(11) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.jpyBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.jpyBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.jpySell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(12) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.krwBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.krwBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.krwSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(13) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.kwdBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.kwdBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.kwdSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(14) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.myrBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.myrBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.myrSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(15) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.nokBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.nokBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.nokSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(16) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.rubBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.rubBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.rubSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(17) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.sarBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.sarBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.sarSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(18) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.sekBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.sekBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.sekSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(19) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.sgdBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.sgdBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.sgdSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(20) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.thbBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.thbBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.thbSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(21) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.usdBuyCast = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.usdBuyTransfer = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.usdSell = $(
// 					'#ctl00_Content_ExrateView tbody :nth-child(22) :nth-child(5)'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(vietcombankData)

// 		Vietcombank.findOneAndUpdate(
// 			{ symbol: vietcombankData.symbol },
// 			{
// 				name: vietcombankData.name,
// 				symbol: vietcombankData.symbol,
// 				timeUpdate: vietcombankData.timeUpdate,

// 				audBuyCast: vietcombankData.audBuyCast,
// 				audBuyTransfer: vietcombankData.audBuyTransfer,
// 				audSell: vietcombankData.audSell,

// 				cadBuyCast: vietcombankData.cadBuyCast,
// 				cadBuyTransfer: vietcombankData.cadBuyTransfer,
// 				cadSell: vietcombankData.cadSell,

// 				chfBuyCast: vietcombankData.chfBuyCast,
// 				chfBuyTransfer: vietcombankData.chfBuyTransfer,
// 				chfSell: vietcombankData.chfSell,

// 				cnyBuyCast: vietcombankData.cnyBuyCast,
// 				cnyBuyTransfer: vietcombankData.cnyBuyTransfer,
// 				cnySell: vietcombankData.cnySell,

// 				dkkBuyCast: vietcombankData.dkkBuyCast,
// 				dkkBuyTransfer: vietcombankData.dkkBuyTransfer,
// 				dkkSell: vietcombankData.dkkSell,

// 				eurBuyCast: vietcombankData.eurBuyCast,
// 				eurBuyTransfer: vietcombankData.eurBuyTransfer,
// 				eurSell: vietcombankData.eurSell,

// 				gbpBuyCast: vietcombankData.gbpBuyCast,
// 				gbpBuyTransfer: vietcombankData.gbpBuyTransfer,
// 				gbpSell: vietcombankData.gbpSell,

// 				hkdBuyCast: vietcombankData.hkdBuyCast,
// 				hkdBuyTransfer: vietcombankData.hkdBuyTransfer,
// 				hkdSell: vietcombankData.hkdSell,

// 				inrBuyCast: vietcombankData.inrBuyCast,
// 				inrBuyTransfer: vietcombankData.inrBuyTransfer,
// 				inrSell: vietcombankData.inrSell,

// 				jpyBuyCast: vietcombankData.jpyBuyCast,
// 				jpyBuyTransfer: vietcombankData.jpyBuyTransfer,
// 				jpySell: vietcombankData.jpySell,

// 				krwBuyCast: vietcombankData.krwBuyCast,
// 				krwBuyTransfer: vietcombankData.krwBuyTransfer,
// 				krwSell: vietcombankData.krwSell,

// 				kwdBuyCast: vietcombankData.kwdBuyCast,
// 				kwdBuyTransfer: vietcombankData.kwdBuyTransfer,
// 				kwdSell: vietcombankData.kwdSell,

// 				myrBuyCast: vietcombankData.myrBuyCast,
// 				myrBuyTransfer: vietcombankData.myrBuyTransfer,
// 				myrSell: vietcombankData.myrSell,

// 				nokBuyCast: vietcombankData.nokBuyCast,
// 				nokBuyTransfer: vietcombankData.nokBuyTransfer,
// 				nokSell: vietcombankData.nokSell,

// 				rubBuyCast: vietcombankData.rubBuyCast,
// 				rubBuyTransfer: vietcombankData.rubBuyTransfer,
// 				rubSell: vietcombankData.rubSell,

// 				sarBuyCast: vietcombankData.sarBuyCast,
// 				sarBuyTransfer: vietcombankData.sarBuyTransfer,
// 				sarSell: vietcombankData.sarSell,

// 				sekBuyCast: vietcombankData.sekBuyCast,
// 				sekBuyTransfer: vietcombankData.sekBuyTransfer,
// 				sekSell: vietcombankData.sekSell,

// 				sgdBuyCast: vietcombankData.sgdBuyCast,
// 				sgdBuyTransfer: vietcombankData.sgdBuyTransfer,
// 				sgdSell: vietcombankData.sgdSell,

// 				thbBuyCast: vietcombankData.thbBuyCast,
// 				thbBuyTransfer: vietcombankData.thbBuyTransfer,
// 				thbSell: vietcombankData.thbSell,

// 				usdBuyCast: vietcombankData.usdBuyCast,
// 				usdBuyTransfer: vietcombankData.usdBuyTransfer,
// 				usdSell: vietcombankData.usdSell,
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

// const crawlBidv = asyncHandler(async () => {
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

// 		let bidvData = await page.evaluate(async () => {
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

// 				dataJson.usdBuyCast = $(
// 					'table tbody :nth-child(1) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.usdBuyTransfer = $(
// 					'table tbody :nth-child(1) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.usdSell = $(
// 					'table tbody :nth-child(1) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.gbpBuyCast = $(
// 					'table tbody :nth-child(4) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.gbpBuyTransfer = $(
// 					'table tbody :nth-child(4) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.gbpSell = $(
// 					'table tbody :nth-child(4) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.hkdBuyCast = $(
// 					'table tbody :nth-child(5) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.hkdBuyTransfer = $(
// 					'table tbody :nth-child(5) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.hkdSell = $(
// 					'table tbody :nth-child(5) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.chfBuyCast = $(
// 					'table tbody :nth-child(6) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.chfBuyTransfer = $(
// 					'table tbody :nth-child(6) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.chfSell = $(
// 					'table tbody :nth-child(6) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.jpyBuyCast = $(
// 					'table tbody :nth-child(7) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.jpyBuyTransfer = $(
// 					'table tbody :nth-child(7) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.jpySell = $(
// 					'table tbody :nth-child(7) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.thbBuyCast = $(
// 					'table tbody :nth-child(8) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.thbBuyTransfer = $(
// 					'table tbody :nth-child(8) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.thbSell = $(
// 					'table tbody :nth-child(8) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.audBuyCast = $(
// 					'table tbody :nth-child(9) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.audBuyTransfer = $(
// 					'table tbody :nth-child(9) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.audSell = $(
// 					'table tbody :nth-child(9) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.cadBuyCast = $(
// 					'table tbody :nth-child(10) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.cadBuyTransfer = $(
// 					'table tbody :nth-child(10) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.cadSell = $(
// 					'table tbody :nth-child(10) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.sgdBuyCast = $(
// 					'table tbody :nth-child(11) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.sgdBuyTransfer = $(
// 					'table tbody :nth-child(11) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.sgdSell = $(
// 					'table tbody :nth-child(11) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.sekBuyCast = $(
// 					'table tbody :nth-child(12) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.sekBuyTransfer = $(
// 					'table tbody :nth-child(12) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.sekSell = $(
// 					'table tbody :nth-child(12) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.lakBuyCast = $(
// 					'table tbody :nth-child(13) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.lakBuyTransfer = $(
// 					'table tbody :nth-child(13) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.lakSell = $(
// 					'table tbody :nth-child(13) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.dkkBuyCast = $(
// 					'table tbody :nth-child(14) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.dkkBuyTransfer = $(
// 					'table tbody :nth-child(14) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.dkkSell = $(
// 					'table tbody :nth-child(14) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.nokBuyCast = $(
// 					'table tbody :nth-child(15) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.nokBuyTransfer = $(
// 					'table tbody :nth-child(15) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.nokSell = $(
// 					'table tbody :nth-child(15) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.cnyBuyCast = $(
// 					'table tbody :nth-child(16) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.cnyBuyTransfer = $(
// 					'table tbody :nth-child(16) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.cnySell = $(
// 					'table tbody :nth-child(16) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.rubBuyCast = $(
// 					'table tbody :nth-child(17) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.rubBuyTransfer = $(
// 					'table tbody :nth-child(17) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.rubSell = $(
// 					'table tbody :nth-child(17) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.nzdBuyCast = $(
// 					'table tbody :nth-child(18) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.nzdBuyTransfer = $(
// 					'table tbody :nth-child(18) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.nzdSell = $(
// 					'table tbody :nth-child(18) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.krwBuyCast = $(
// 					'table tbody :nth-child(19) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.krwBuyTransfer = $(
// 					'table tbody :nth-child(19) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.krwSell = $(
// 					'table tbody :nth-child(19) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.eurBuyCast = $(
// 					'table tbody :nth-child(20) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.eurBuyTransfer = $(
// 					'table tbody :nth-child(20) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.eurSell = $(
// 					'table tbody :nth-child(20) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.twdBuyCast = $(
// 					'table tbody :nth-child(21) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.twdBuyTransfer = $(
// 					'table tbody :nth-child(21) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.twdSell = $(
// 					'table tbody :nth-child(21) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;

// 				dataJson.myrBuyCast = $(
// 					'table tbody :nth-child(22) :nth-child(3) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.myrBuyTransfer = $(
// 					'table tbody :nth-child(22) :nth-child(4) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 				dataJson.myrSell = $(
// 					'table tbody :nth-child(22) :nth-child(5) :nth-child(2) :nth-child(2) '
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(bidvData);

// 		Bidv.findOneAndUpdate(
// 			{ symbol: bidvData.symbol },
// 			{
// 				name: bidvData.name,
// 				symbol: bidvData.symbol,
// 				timeUpdate: bidvData.timeUpdate,

// 				usdBuyCast: bidvData.usdBuyCast,
// 				usdBuyTransfer: bidvData.usdBuyTransfer,
// 				usdSell: bidvData.usdSell,

// 				gbpBuyCast: bidvData.gbpBuyCast,
// 				gbpBuyTransfer: bidvData.gbpBuyTransfer,
// 				gbpSell: bidvData.gbpSell,

// 				hkdBuyCast: bidvData.hkdBuyCast,
// 				hkdBuyTransfer: bidvData.hkdBuyTransfer,
// 				hkdSell: bidvData.hkdSell,

// 				chfBuyCast: bidvData.chfBuyCast,
// 				chfBuyTransfer: bidvData.chfBuyTransfer,
// 				chfSell: bidvData.chfSell,

// 				jpyBuyCast: bidvData.jpyBuyCast,
// 				jpyBuyTransfer: bidvData.jpyBuyTransfer,
// 				jpySell: bidvData.jpySell,

// 				thbBuyCast: bidvData.thbBuyCast,
// 				thbBuyTransfer: bidvData.thbBuyTransfer,
// 				thbSell: bidvData.thbSell,

// 				audBuyCast: bidvData.audBuyCast,
// 				audBuyTransfer: bidvData.audBuyTransfer,
// 				audSell: bidvData.audSell,

// 				cadBuyCast: bidvData.cadBuyCast,
// 				cadBuyTransfer: bidvData.cadBuyTransfer,
// 				cadSell: bidvData.cadSell,

// 				sgdBuyCast: bidvData.sgdBuyCast,
// 				sgdBuyTransfer: bidvData.sgdBuyTransfer,
// 				sgdSell: bidvData.sgdSell,

// 				sekBuyCast: bidvData.sekBuyCast,
// 				sekBuyTransfer: bidvData.sekBuyTransfer,
// 				sekSell: bidvData.sekSell,

// 				lakBuyCast: bidvData.lakBuyCast,
// 				lakBuyTransfer: bidvData.lakBuyTransfer,
// 				lakSell: bidvData.lakSell,

// 				dkkBuyCast: bidvData.dkkBuyCast,
// 				dkkBuyTransfer: bidvData.dkkBuyTransfer,
// 				dkkSell: bidvData.dkkSell,

// 				nokBuyCast: bidvData.nokBuyCast,
// 				nokBuyTransfer: bidvData.nokBuyTransfer,
// 				nokSell: bidvData.nokSell,

// 				cnyBuyCast: bidvData.cnyBuyCast,
// 				cnyBuyTransfer: bidvData.cnyBuyTransfer,
// 				cnySell: bidvData.cnySell,

// 				rubBuyCast: bidvData.rubBuyCast,
// 				rubBuyTransfer: bidvData.rubBuyTransfer,
// 				rubSell: bidvData.rubSell,

// 				nzdBuyCast: bidvData.nzdBuyCast,
// 				nzdBuyTransfer: bidvData.nzdBuyTransfer,
// 				nzdSell: bidvData.nzdSell,

// 				krwBuyCast: bidvData.krwBuyCast,
// 				krwBuyTransfer: bidvData.krwBuyTransfer,
// 				krwSell: bidvData.krwSell,

// 				eurBuyCast: bidvData.eurBuyCast,
// 				eurBuyTransfer: bidvData.eurBuyTransfer,
// 				eurSell: bidvData.eurSell,

// 				twdBuyCast: bidvData.twdBuyCast,
// 				twdBuyTransfer: bidvData.twdBuyTransfer,
// 				twdSell: bidvData.twdSell,

// 				myrBuyCast: bidvData.myrBuyCast,
// 				myrBuyTransfer: bidvData.myrBuyTransfer,
// 				myrSell: bidvData.myrSell,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(bidvData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlTechcombank = asyncHandler(async () => {
// 	// cron.schedule('*/50 * * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlTechcombank, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let techcombankData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name =
// 					'Ngân hàng Thương mại cổ phần Kỹ Thương Việt Nam';
// 				dataJson.symbol = 'Techcombank';

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

// 				dataJson.audBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(5) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.audBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(5) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.audSell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(5) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.cadBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(7) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.cadBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(7) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.cadSell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(7) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.chfBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(9) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.chfBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(9) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.chfSell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(9) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.cnyBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(11) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.cnyBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(11) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.cnySell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(11) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.eurBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(13) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.eurBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(13) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.eurSell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(13) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.gbpBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(15) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.gbpBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(15) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.gbpSell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(15) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.hkdBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(17) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.hkdBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(17) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.hkdSell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(17) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.jpyBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(19) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.jpyBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(19) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.jpySell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(19) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.krwBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(21) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.krwBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(21) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.krwSell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(21) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.myrBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(23) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.myrBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(23) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.myrSell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(23) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.sgdBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(25) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.sgdBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(25) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.sgdSell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(25) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.thbBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(27) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.thbBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(27) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.thbSell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(27) :nth-child(4) strong '
// 				)?.innerText;

// 				dataJson.usdBuyCast = $(
// 					'#exchangeFilterContainer table tbody :nth-child(33) :nth-child(2) strong '
// 				)?.innerText;
// 				dataJson.usdBuyTransfer = $(
// 					'#exchangeFilterContainer table tbody :nth-child(33) :nth-child(3) strong '
// 				)?.innerText;
// 				dataJson.usdSell = $(
// 					'#exchangeFilterContainer table tbody :nth-child(33) :nth-child(4) strong '
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(techcombankData)

// 		Techcombank.findOneAndUpdate(
// 			{ symbol: techcombankData.symbol },
// 			{
// 				name: techcombankData.name,
// 				symbol: techcombankData.symbol,
// 				timeUpdate: techcombankData.timeUpdate,

// 				audBuyCast: techcombankData.audBuyCast,
// 				audBuyTransfer: techcombankData.audBuyTransfer,
// 				audSell: techcombankData.audSell,

// 				cadBuyCast: techcombankData.cadBuyCast,
// 				cadBuyTransfer: techcombankData.cadBuyTransfer,
// 				cadSell: techcombankData.cadSell,

// 				chfBuyCast: techcombankData.chfBuyCast,
// 				chfBuyTransfer: techcombankData.chfBuyTransfer,
// 				chfSell: techcombankData.chfSell,

// 				cnyBuyCast: techcombankData.cnyBuyCast,
// 				cnyBuyTransfer: techcombankData.cnyBuyTransfer,
// 				cnySell: techcombankData.cnySell,

// 				eurBuyCast: techcombankData.eurBuyCast,
// 				eurBuyTransfer: techcombankData.eurBuyTransfer,
// 				eurSell: techcombankData.eurSell,

// 				gbpBuyCast: techcombankData.gbpBuyCast,
// 				gbpBuyTransfer: techcombankData.gbpBuyTransfer,
// 				gbpSell: techcombankData.gbpSell,

// 				hkdBuyCast: techcombankData.hkdBuyCast,
// 				hkdBuyTransfer: techcombankData.hkdBuyTransfer,
// 				hkdSell: techcombankData.hkdSell,

// 				jpyBuyCast: techcombankData.jpyBuyCast,
// 				jpyBuyTransfer: techcombankData.jpyBuyTransfer,
// 				jpySell: techcombankData.jpySell,

// 				krwBuyCast: techcombankData.krwBuyCast,
// 				krwBuyTransfer: techcombankData.krwBuyTransfer,
// 				krwSell: techcombankData.krwSell,

// 				myrBuyCast: techcombankData.myrBuyCast,
// 				myrBuyTransfer: techcombankData.myrBuyTransfer,
// 				myrSell: techcombankData.myrSell,

// 				sgdBuyCast: techcombankData.sgdBuyCast,
// 				sgdBuyTransfer: techcombankData.sgdBuyTransfer,
// 				sgdSell: techcombankData.sgdSell,

// 				thbBuyCast: techcombankData.thbBuyCast,
// 				thbBuyTransfer: techcombankData.thbBuyTransfer,
// 				thbSell: techcombankData.thbSell,

// 				usdBuyCast: techcombankData.usdBuyCast,
// 				usdBuyTransfer: techcombankData.usdBuyTransfer,
// 				usdSell: techcombankData.usdSell,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(techcombankData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlVietinbank = asyncHandler(async () => {
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
// 				dataJson.symbol = 'VietinBank';

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

// 				dataJson.audBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(3) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.audBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(3) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.audSell = $(
// 					'#hor-ex-b tbody :nth-child(3) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.cadBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(4) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.cadBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(4) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.cadSell = $(
// 					'#hor-ex-b tbody :nth-child(4) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.chfBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(5) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.chfBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(5) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.chfSell = $(
// 					'#hor-ex-b tbody :nth-child(5) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.cnyBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(6) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.cnyBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(6) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.cnySell = $(
// 					'#hor-ex-b tbody :nth-child(6) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.dkkBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(7) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.dkkBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(7) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.dkkSell = $(
// 					'#hor-ex-b tbody :nth-child(7) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.eurBuyCast = document
// 					.querySelector(
// 						'#hor-ex-b tbody :nth-child(8) :nth-child(3)'
// 					)
// 					?.innerText.slice(1);
// 				dataJson.eurBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(8) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.eurSell = $(
// 					'#hor-ex-b tbody :nth-child(8) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.gbpBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(10) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.gbpBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(10) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.gbpSell = $(
// 					'#hor-ex-b tbody :nth-child(10) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.hkdBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(11) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.hkdBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(11) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.hkdSell = $(
// 					'#hor-ex-b tbody :nth-child(11) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.jpyBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(12) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.jpyBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(12) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.jpySell = $(
// 					'#hor-ex-b tbody :nth-child(12) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.krwBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(13) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.krwBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(13) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.krwSell = $(
// 					'#hor-ex-b tbody :nth-child(13) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.lakBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(14) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.lakBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(14) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.lakSell = $(
// 					'#hor-ex-b tbody :nth-child(14) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.nokBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(15) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.nokBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(15) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.nokSell = $(
// 					'#hor-ex-b tbody :nth-child(15) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.nzdBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(16) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.nzdBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(16) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.nzdSell = $(
// 					'#hor-ex-b tbody :nth-child(16) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.sekBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(17) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.sekBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(17) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.sekSell = $(
// 					'#hor-ex-b tbody :nth-child(17) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.sgdBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(18) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.sgdBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(18) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.sgdSell = $(
// 					'#hor-ex-b tbody :nth-child(18) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.thbBuyCast = $(
// 					'#hor-ex-b tbody :nth-child(19) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.thbBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(19) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.thbSell = $(
// 					'#hor-ex-b tbody :nth-child(19) :nth-child(5)'
// 				)?.innerText;

// 				dataJson.usdBuyCast = document
// 					.querySelector(
// 						'#hor-ex-b tbody :nth-child(20) :nth-child(3)'
// 					)
// 					?.innerText.slice(1);
// 				dataJson.usdBuyTransfer = $(
// 					'#hor-ex-b tbody :nth-child(20) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.usdSell = $(
// 					'#hor-ex-b tbody :nth-child(20) :nth-child(5)'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(vietinbankData)

// Vietinbank.findOneAndUpdate(
// 	{ symbol: vietinbankData.symbol },
// 	{
// 		name: vietinbankData.name,
// 		symbol: vietinbankData.symbol,
// 		timeUpdate: vietinbankData.timeUpdate,

// 		audBuyCast: vietinbankData.audBuyCast,
// 		audBuyTransfer: vietinbankData.audBuyTransfer,
// 		audSell: vietinbankData.audSell,

// 		cadBuyCast: vietinbankData.cadBuyCast,
// 		cadBuyTransfer: vietinbankData.cadBuyTransfer,
// 		cadSell: vietinbankData.cadSell,

// 		chfBuyCast: vietinbankData.chfBuyCast,
// 		chfBuyTransfer: vietinbankData.chfBuyTransfer,
// 		chfSell: vietinbankData.chfSell,

// 		cnyBuyCast: vietinbankData.cnyBuyCast,
// 		cnyBuyTransfer: vietinbankData.cnyBuyTransfer,
// 		cnySell: vietinbankData.cnySell,

// 		dkkBuyCast: vietinbankData.dkkBuyCast,
// 		dkkBuyTransfer: vietinbankData.dkkBuyTransfer,
// 		dkkSell: vietinbankData.dkkSell,

// 		eurBuyCast: vietinbankData.eurBuyCast,
// 		eurBuyTransfer: vietinbankData.eurBuyTransfer,
// 		eurSell: vietinbankData.eurSell,

// 		gbpBuyCast: vietinbankData.gbpBuyCast,
// 		gbpBuyTransfer: vietinbankData.gbpBuyTransfer,
// 		gbpSell: vietinbankData.gbpSell,

// 		hkdBuyCast: vietinbankData.hkdBuyCast,
// 		hkdBuyTransfer: vietinbankData.hkdBuyTransfer,
// 		hkdSell: vietinbankData.hkdSell,

// 		jpyBuyCast: vietinbankData.jpyBuyCast,
// 		jpyBuyTransfer: vietinbankData.jpyBuyTransfer,
// 		jpySell: vietinbankData.jpySell,

// 		krwBuyCast: vietinbankData.krwBuyCast,
// 		krwBuyTransfer: vietinbankData.krwBuyTransfer,
// 		krwSell: vietinbankData.krwSell,

// 		lakBuyCast: vietinbankData.lakBuyCast,
// 		lakBuyTransfer: vietinbankData.lakBuyTransfer,
// 		lakSell: vietinbankData.lakSell,

// 		nokBuyCast: vietinbankData.nokBuyCast,
// 		nokBuyTransfer: vietinbankData.nokBuyTransfer,
// 		nokSell: vietinbankData.nokSell,

// 		nzdBuyCast: vietinbankData.nzdBuyCast,
// 		nzdBuyTransfer: vietinbankData.nzdBuyTransfer,
// 		nzdSell: vietinbankData.nzdSell,

// 		sekBuyCast: vietinbankData.sekBuyCast,
// 		sekBuyTransfer: vietinbankData.sekBuyTransfer,
// 		sekSell: vietinbankData.sekSell,

// 		sgdBuyCast: vietinbankData.sgdBuyCast,
// 		sgdBuyTransfer: vietinbankData.sgdBuyTransfer,
// 		sgdSell: vietinbankData.sgdSell,

// 		thbBuyCast: vietinbankData.thbBuyCast,
// 		thbBuyTransfer: vietinbankData.thbBuyTransfer,
// 		thbSell: vietinbankData.thbSell,

// 		usdBuyCast: vietinbankData.usdBuyCast,
// 		usdBuyTransfer: vietinbankData.usdBuyTransfer,
// 		usdSell: vietinbankData.usdSell,
// 	},
// 	{ upsert: true }
// )
// 	// .then((doc) => console.log(doc))
// 	.catch((err) => console.log(vietinbankData.symbol));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlMbbank = asyncHandler(async () => {
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

// 				dataJson.usdBuyCast = $(
// 					'#main tbody :nth-child(1) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.usdBuyTransfer = $(
// 					'#main tbody :nth-child(1) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.usdSellCast = $(
// 					'#main tbody :nth-child(1) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.usdSellTransfer = $(
// 					'#main tbody :nth-child(1) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.eurBuyCast = $(
// 					'#main tbody :nth-child(4) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.eurBuyTransfer = $(
// 					'#main tbody :nth-child(4) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.eurSellCast = $(
// 					'#main tbody :nth-child(4) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.eurSellTransfer = $(
// 					'#main tbody :nth-child(4) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.audBuyCast = $(
// 					'#main tbody :nth-child(5) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.audBuyTransfer = $(
// 					'#main tbody :nth-child(5) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.audSellCast = $(
// 					'#main tbody :nth-child(5) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.audSellTransfer = $(
// 					'#main tbody :nth-child(5) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.cadBuyCast = $(
// 					'#main tbody :nth-child(6) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.cadBuyTransfer = $(
// 					'#main tbody :nth-child(6) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.cadSellCast = $(
// 					'#main tbody :nth-child(6) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.cadSellTransfer = $(
// 					'#main tbody :nth-child(6) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.chfBuyCast = $(
// 					'#main tbody :nth-child(7) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.chfBuyTransfer = $(
// 					'#main tbody :nth-child(7) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.chfSellCast = $(
// 					'#main tbody :nth-child(7) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.chfSellTransfer = $(
// 					'#main tbody :nth-child(7) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.cnyBuyCast = $(
// 					'#main tbody :nth-child(8) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.cnyBuyTransfer = $(
// 					'#main tbody :nth-child(8) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.cnySellCast = $(
// 					'#main tbody :nth-child(8) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.cnySellTransfer = $(
// 					'#main tbody :nth-child(8) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.gbpBuyCast = $(
// 					'#main tbody :nth-child(9) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.gbpBuyTransfer = $(
// 					'#main tbody :nth-child(9) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.gbpSellCast = $(
// 					'#main tbody :nth-child(9) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.gbpSellTransfer = $(
// 					'#main tbody :nth-child(9) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.hkdBuyCast = $(
// 					'#main tbody :nth-child(10) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.hkdBuyTransfer = $(
// 					'#main tbody :nth-child(10) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.hkdSellCast = $(
// 					'#main tbody :nth-child(10) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.hkdSellTransfer = $(
// 					'#main tbody :nth-child(10) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.jpyBuyCast = $(
// 					'#main tbody :nth-child(11) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.jpyBuyTransfer = $(
// 					'#main tbody :nth-child(11) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.jpySellCast = $(
// 					'#main tbody :nth-child(11) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.jpySellTransfer = $(
// 					'#main tbody :nth-child(11) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.khrBuyCast = $(
// 					'#main tbody :nth-child(12) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.khrBuyTransfer = $(
// 					'#main tbody :nth-child(12) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.khrSellCast = $(
// 					'#main tbody :nth-child(12) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.khrSellTransfer = $(
// 					'#main tbody :nth-child(12) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.krwBuyCast = $(
// 					'#main tbody :nth-child(13) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.krwBuyTransfer = $(
// 					'#main tbody :nth-child(13) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.krwSellCast = $(
// 					'#main tbody :nth-child(13) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.krwSellTransfer = $(
// 					'#main tbody :nth-child(13) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.lakBuyCast = $(
// 					'#main tbody :nth-child(14) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.lakBuyTransfer = $(
// 					'#main tbody :nth-child(14) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.lakSellCast = $(
// 					'#main tbody :nth-child(14) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.lakSellTransfer = $(
// 					'#main tbody :nth-child(14) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.nzdBuyCast = $(
// 					'#main tbody :nth-child(15) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.nzdBuyTransfer = $(
// 					'#main tbody :nth-child(15) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.nzdSellCast = $(
// 					'#main tbody :nth-child(15) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.nzdSellTransfer = $(
// 					'#main tbody :nth-child(15) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.sekBuyCast = $(
// 					'#main tbody :nth-child(16) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.sekBuyTransfer = $(
// 					'#main tbody :nth-child(16) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.sekSellCast = $(
// 					'#main tbody :nth-child(16) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.sekSellTransfer = $(
// 					'#main tbody :nth-child(16) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.sgdBuyCast = $(
// 					'#main tbody :nth-child(17) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.sgdBuyTransfer = $(
// 					'#main tbody :nth-child(17) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.sgdSellCast = $(
// 					'#main tbody :nth-child(17) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.sgdSellTransfer = $(
// 					'#main tbody :nth-child(17) :nth-child(6)'
// 				)?.innerText;

// 				dataJson.thbBuyCast = $(
// 					'#main tbody :nth-child(18) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.thbBuyTransfer = $(
// 					'#main tbody :nth-child(18) :nth-child(4)'
// 				)?.innerText;
// 				dataJson.thbSellCast = $(
// 					'#main tbody :nth-child(18) :nth-child(5)'
// 				)?.innerText;
// 				dataJson.thbSellTransfer = $(
// 					'#main tbody :nth-child(18) :nth-child(6)'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(mbbankData);

// 		Mbbank.findOneAndUpdate(
// 			{ symbol: mbbankData.symbol },
// 			{
// 				name: mbbankData.name,
// 				symbol: mbbankData.symbol,
// 				timeUpdate: mbbankData.timeUpdate,

// 				usdBuyCast: mbbankData.usdBuyCast,
// 				usdBuyTransfer: mbbankData.usdBuyTransfer,
// 				usdSellCast: mbbankData.usdSellCast,
// 				usdSellTransfer: mbbankData.usdSellTransfer,

// 				eurBuyCast: mbbankData.eurBuyCast,
// 				eurBuyTransfer: mbbankData.eurBuyTransfer,
// 				eurSellCast: mbbankData.eurSellCast,
// 				eurSellTransfer: mbbankData.eurSellTransfer,

// 				gbpBuyCast: mbbankData.gbpBuyCast,
// 				gbpBuyTransfer: mbbankData.gbpBuyTransfer,
// 				gbpSellCast: mbbankData.gbpSellCast,
// 				gbpSellTransfer: mbbankData.gbpSellTransfer,

// 				jpyBuyCast: mbbankData.jpyBuyCast,
// 				jpyBuyTransfer: mbbankData.jpyBuyTransfer,
// 				jpySellCast: mbbankData.jpySellCast,
// 				jpySellTransfer: mbbankData.jpySellTransfer,

// 				hkdBuyCast: mbbankData.hkdBuyCast,
// 				hkdBuyTransfer: mbbankData.hkdBuyTransfer,
// 				hkdSellCast: mbbankData.hkdSellCast,
// 				hkdSellTransfer: mbbankData.hkdSellTransfer,

// 				cnyBuyCast: mbbankData.cnyBuyCast,
// 				cnyBuyTransfer: mbbankData.cnyBuyTransfer,
// 				cnySellCast: mbbankData.cnySellCast,
// 				cnySellTransfer: mbbankData.cnySellTransfer,

// 				audBuyCast: mbbankData.audBuyCast,
// 				audBuyTransfer: mbbankData.audBuyTransfer,
// 				audSellCast: mbbankData.audSellCast,
// 				audSellTransfer: mbbankData.audSellTransfer,

// 				nzdBuyCast: mbbankData.nzdBuyCast,
// 				nzdBuyTransfer: mbbankData.nzdBuyTransfer,
// 				nzdSellCast: mbbankData.nzdSellCast,
// 				nzdSellTransfer: mbbankData.nzdSellTransfer,

// 				cadBuyCast: mbbankData.cadBuyCast,
// 				cadBuyTransfer: mbbankData.cadBuyTransfer,
// 				cadSellCast: mbbankData.cadSellCast,
// 				cadSellTransfer: mbbankData.cadSellTransfer,

// 				sgdBuyCast: mbbankData.sgdBuyCast,
// 				sgdBuyTransfer: mbbankData.sgdBuyTransfer,
// 				sgdSellCast: mbbankData.sgdSellCast,
// 				sgdSellTransfer: mbbankData.sgdSellTransfer,

// 				thbBuyCast: mbbankData.thbBuyCast,
// 				thbBuyTransfer: mbbankData.thbBuyTransfer,
// 				thbSellCast: mbbankData.thbSellCast,
// 				thbSellTransfer: mbbankData.thbSellTransfer,

// 				chfBuyCast: mbbankData.chfBuyCast,
// 				chfBuyTransfer: mbbankData.chfBuyTransfer,
// 				chfSellCast: mbbankData.chfSellCast,
// 				chfSellTransfer: mbbankData.chfSellTransfer,

// 				krwBuyCast: mbbankData.krwBuyCast,
// 				krwBuyTransfer: mbbankData.krwBuyTransfer,
// 				krwSellCast: mbbankData.krwSellCast,
// 				krwSellTransfer: mbbankData.krwSellTransfer,

// 				lakBuyCast: mbbankData.lakBuyCast,
// 				lakBuyTransfer: mbbankData.lakBuyTransfer,
// 				lakSellCast: mbbankData.lakSellCast,
// 				lakSellTransfer: mbbankData.lakSellTransfer,

// 				khrBuyCast: mbbankData.khrBuyCast,
// 				khrBuyTransfer: mbbankData.khrBuyTransfer,
// 				khrSellCast: mbbankData.khrSellCast,
// 				khrSellTransfer: mbbankData.khrSellTransfer,

// 				sekBuyCast: mbbankData.sekBuyCast,
// 				sekBuyTransfer: mbbankData.sekBuyTransfer,
// 				sekSellCast: mbbankData.sekSellCast,
// 				sekSellTransfer: mbbankData.sekSellTransfer,
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
