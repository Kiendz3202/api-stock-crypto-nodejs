const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { uploadErrorToDb } = require('../../utils/handleError');

const { collectQueryData } = require('../../utils/pupperteer/collectQueryData');

const Sjc = require('../../model/gold/sjcModel');
const Pnj = require('../../model/gold/pnjModel');
const Doji = require('../../model/gold/dojiModel');
const PhuQuySjc = require('../../model/gold/phuquysjcModel');
const BaoTinMinhChau = require('../../model/gold/baoTinMinhchauModel');
const MiHong = require('../../model/gold/miHongModel');

const SjcChart = require('../../model/gold/sjcChartModel');

const urlSjc = 'https://webtygia.com/gia-vang-sjc.html';
const urlPnj = 'https://www.pnj.com.vn/blog/gia-vang/?zone=';
const urlDoji = 'https://doji.vn/bang-gia-vang/';
const urlPhuQuySjc = 'https://webtygia.com/gia-vang-phu-quy.html';
const ulrBaoTinMinhChau =
	'https://webtygia.com/gia-vang-bao-tin-minh-chau.html';
const urlMiHong = 'https://webtygia.com/gia-vang-mi-hong.html';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// const querySelectorAll = require('query-selector');
// const request = require('request-promise');

const crawlSjc = async () => {
	console.time('sjc');
	const result = await axios(urlSjc)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err.code + ' ' + err.response.status + ' sjc');
			uploadErrorToDb(err.code + ' ' + err.response.status + ' sjc');
		});

	const $ = cheerio.load(result);

	let dataJson = {};

	try {
		dataJson.name = 'SJC';

		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);

		dataJson.sjc1l10lBuy = $('#myTable tbody :nth-child(2) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lSell = $('#myTable tbody :nth-child(2) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.nhansjc99_991chi2chi5chiBuy = $(
			'#myTable tbody :nth-child(9) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nhansjc99_991chi2chi5chiSell = $(
			'#myTable tbody :nth-child(9) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.nhansjc99_99_0_5chiBuy = $(
			'#myTable tbody :nth-child(8) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nhansjc99_99_0_5chiSell = $(
			'#myTable tbody :nth-child(8) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.nutrang99_99percentBuy = $(
			'#myTable tbody :nth-child(7) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nutrang99_99percentSell = $(
			'#myTable tbody :nth-child(7) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.nutrang99percentBuy = $(
			'#myTable tbody :nth-child(6) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nutrang99percentSell = $(
			'#myTable tbody :nth-child(6) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.nutrang75percentBuy = $(
			'#myTable tbody :nth-child(5) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nutrang75percentSell = $(
			'#myTable tbody :nth-child(5) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.nutrang58_3percentBuy = $(
			'#myTable tbody :nth-child(4) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nutrang58_3percentSell = $(
			'#myTable tbody :nth-child(4) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.nutrang41_7percentBuy = $(
			'#myTable tbody :nth-child(3) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nutrang41_7percentSell = $(
			'#myTable tbody :nth-child(3) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lHaNoiBuy = $(
			'#myTable tbody :nth-child(15) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lHaNoiSell = $(
			'#myTable tbody :nth-child(15) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lDaNangBuy = $(
			'#myTable tbody :nth-child(10) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lDaNangSell = $(
			'#myTable tbody :nth-child(10) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lNhaTrangBuy = $(
			'#myTable tbody :nth-child(17) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lNhaTrangSell = $(
			'#myTable tbody :nth-child(17) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lCaMauBuy = $(
			'#myTable tbody :nth-child(11) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lCaMauSell = $(
			'#myTable tbody :nth-child(11) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lHueBuy = $(
			'#myTable tbody :nth-child(23) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lHueSell = $(
			'#myTable tbody :nth-child(23) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lBinhPhuocBuy = $(
			'#myTable tbody :nth-child(22) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lBinhPhuocSell = $(
			'#myTable tbody :nth-child(22) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lBienHoaBuy = $(
			'#myTable tbody :nth-child(13) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lBienHoaSell = $(
			'#myTable tbody :nth-child(13) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lMienTayBuy = $(
			'#myTable tbody :nth-child(12) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lMienTaySell = $(
			'#myTable tbody :nth-child(12) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lQuangNgaiBuy = $(
			'#myTable tbody :nth-child(14) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lQuangNgaiSell = $(
			'#myTable tbody :nth-child(14) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lLongXuyenBuy = $(
			'#myTable tbody :nth-child(1) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lLongXuyenSell = $(
			'#myTable tbody :nth-child(1) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lBacLieuBuy = $(
			'#myTable tbody :nth-child(16) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lBacLieuSell = $(
			'#myTable tbody :nth-child(16) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lQuyNhonBuy = $(
			'#myTable tbody :nth-child(18) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lQuyNhonSell = $(
			'#myTable tbody :nth-child(18) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lPhanRangBuy = $(
			'#myTable tbody :nth-child(19) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lPhanRangSell = $(
			'#myTable tbody :nth-child(19) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lHaLongBuy = $(
			'#myTable tbody :nth-child(20) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lHaLongSell = $(
			'#myTable tbody :nth-child(20) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjc1l10lQuangNamBuy = $(
			'#myTable tbody :nth-child(21) :nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjc1l10lQuangNamSell = $(
			'#myTable tbody :nth-child(21) :nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.currentTimestamp = Math.floor(Date.now() / 1000);
	} catch (err) {
		console.log(err.message);
	}
	Sjc.findOneAndUpdate(
		{ name: dataJson.name },
		{
			name: dataJson.name,
			timeUpdate: dataJson.timeUpdate,
			sjc1l10lBuy: dataJson.sjc1l10lBuy,
			nhansjc99_991chi2chi5chiBuy: dataJson.nhansjc99_991chi2chi5chiBuy,
			nhansjc99_99_0_5chiBuy: dataJson.nhansjc99_99_0_5chiBuy,
			nutrang99_99percentBuy: dataJson.nutrang99_99percentBuy,
			nutrang99percentBuy: dataJson.nutrang99percentBuy,
			nutrang75percentBuy: dataJson.nutrang75percentBuy,
			nutrang58_3percentBuy: dataJson.nutrang58_3percentBuy,
			nutrang41_7percentBuy: dataJson.nutrang41_7percentBuy,

			sjc1l10lSell: dataJson.sjc1l10lSell,
			nhansjc99_991chi2chi5chiSell: dataJson.nhansjc99_991chi2chi5chiSell,
			nhansjc99_99_0_5chiSell: dataJson.nhansjc99_99_0_5chiSell,
			nutrang99_99percentSell: dataJson.nutrang99_99percentSell,
			nutrang99percentSell: dataJson.nutrang99percentSell,
			nutrang75percentSell: dataJson.nutrang75percentSell,
			nutrang58_3percentSell: dataJson.nutrang58_3percentSell,
			nutrang41_7percentSell: dataJson.nutrang41_7percentSell,

			sjc1l10lHanoiBuy: dataJson.sjc1l10lHanoiBuy,
			sjc1l10lHaNoiSell: dataJson.sjc1l10lHaNoiSell,

			sjc1l10lDaNangBuy: dataJson.sjc1l10lDaNangBuy,
			sjc1l10lDaNangSell: dataJson.sjc1l10lDaNangSell,

			sjc1l10lNhatrangBuy: dataJson.sjc1l10lNhatrangBuy,
			sjc1l10lNhatrangSell: dataJson.sjc1l10lNhatrangSell,

			sjc1l10lCaMauBuy: dataJson.sjc1l10lCaMauBuy,
			sjc1l10lCaMauSell: dataJson.sjc1l10lCaMauSell,

			sjc1l10lHueBuy: dataJson.sjc1l10lHueBuy,
			sjc1l10lHueSell: dataJson.sjc1l10lHueSell,

			sjc1l10lBinhPhuocBuy: dataJson.sjc1l10lBinhPhuocBuy,
			sjc1l10lBinhPhuocSell: dataJson.sjc1l10lBinhPhuocSell,

			sjc1l10lBienHoaBuy: dataJson.sjc1l10lBienHoaBuy,
			sjc1l10lBienHoaSell: dataJson.sjc1l10lBienHoaSell,

			sjc1l10lMientayBuy: dataJson.sjc1l10lMientayBuy,
			sjc1l10lMientaySell: dataJson.sjc1l10lMientaySell,

			sjc1l10lQuangNgaiBuy: dataJson.sjc1l10lQuangNgaiBuy,
			sjc1l10lQuangNgaiSell: dataJson.sjc1l10lQuangNgaiSell,

			sjc1l10lLongXuyenBuy: dataJson.sjc1l10lLongXuyenBuy,
			sjc1l10lLongXuyenSell: dataJson.sjc1l10lLongXuyenSell,

			sjc1l10lBacLieuBuy: dataJson.sjc1l10lBacLieuBuy,
			sjc1l10lBacLieuSell: dataJson.sjc1l10lBacLieuSell,

			sjc1l10lQuyNhonBuy: dataJson.sjc1l10lQuyNhonBuy,
			sjc1l10lQuyNhonSell: dataJson.sjc1l10lQuyNhonSell,

			sjc1l10lPhanRangBuy: dataJson.sjc1l10lPhanRangBuy,
			sjc1l10lPhanRangSell: dataJson.sjc1l10lPhanRangSell,

			sjc1l10lHaLongBuy: dataJson.sjc1l10lHaLongBuy,
			sjc1l10lHaLongSell: dataJson.sjc1l10lHaLongSell,

			sjc1l10lQuangNamBuy: dataJson.sjc1l10lQuangNamBuy,
			sjc1l10lQuangNamSell: dataJson.sjc1l10lQuangNamSell,
		},
		{ upsert: true }
	)
		.then((doc) => console.timeEnd('sjc'))
		.catch((err) => {
			console.log(err.code + ' ' + err.response.status + ' sjc');
			uploadErrorToDb(err.code + ' ' + err.response.status + ' sjc');
		});

	SjcChart.findOneAndUpdate(
		{ name: dataJson.name },
		{
			$push: {
				t: dataJson.currentTimestamp,
				buy: dataJson.sjc1l10lBuy,
				sell: dataJson.sjc1l10lSell,
			},
		},
		{ upsert: true }
	)
		// .then((doc) => console.log(doc))
		.catch((err) => {
			console.log(err.code + ' ' + err.response.status + ' sjc');
			uploadErrorToDb(err.code + ' ' + err.response.status + ' sjc');
		});
};

const crawlPnj = async (localtionNumber, index) => {
	console.time('pnj' + index);
	const result = await axios(`${urlPnj}${localtionNumber}`)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err.code + ' ' + err.response.status + ' pnj');
			uploadErrorToDb(err.code + ' ' + err.response.status + ' pnj');
		});

	const $ = cheerio.load(result);

	let dataJson = {};

	try {
		dataJson.name = 'PNJ';
		dataJson.location = $(`#select_gold_area :nth-child(${index})`).text();

		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);

		dataJson.vangmiengsjcBuy = (
			$('#content-price :nth-child(1) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.vangmiengsjcSell = (
			$('#content-price :nth-child(1) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();

		dataJson.nhantronpnjBuy = (
			$('#content-price :nth-child(2) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.nhantronpnjSell = (
			$('#content-price :nth-child(2) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();

		dataJson.vangkimbaoBuy = (
			$('#content-price :nth-child(3) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.vangkimbaoSell = (
			$('#content-price :nth-child(3) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();

		dataJson.vangphucloctaiBuy = (
			$('#content-price :nth-child(4) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.vangphucloctaiSell = (
			$('#content-price :nth-child(4) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();

		dataJson.vang24kBuy = (
			$('#content-price :nth-child(5) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.vang24kSell = (
			$('#content-price :nth-child(5) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();

		dataJson.vang750Buy = (
			$('#content-price :nth-child(6) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.vang750Sell = (
			$('#content-price :nth-child(6) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();

		dataJson.vang585Buy = (
			$('#content-price :nth-child(7) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.vang585Sell = (
			$('#content-price :nth-child(7) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();

		dataJson.vang416Buy = (
			$('#content-price :nth-child(8) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.vang416Sell = (
			$('#content-price :nth-child(8) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();

		dataJson.vangmiengpnjBuy = (
			$('#content-price :nth-child(9) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.vangmiengpnjSell = (
			$('#content-price :nth-child(9) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();

		dataJson.vang916Buy = (
			$('#content-price :nth-child(10) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.vang916Sell = (
			$('#content-price :nth-child(10) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();

		dataJson.vang680Buy = (
			$('#content-price :nth-child(11) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.vang680Sell = (
			$('#content-price :nth-child(11) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();

		dataJson.vang650Buy = (
			$('#content-price :nth-child(12) :nth-child(2) span')
				.text()
				.replace(',', '') * 10000
		).toString();
		dataJson.vang650Sell = (
			$('#content-price :nth-child(12) :nth-child(3) span')
				.text()
				.replace(',', '') * 10000
		).toString();
	} catch (err) {
		console.log(err.code + ' ' + err.response.status + ' pnj');
	}

	Pnj.findOneAndUpdate(
		{ location: dataJson.location },
		{
			name: dataJson.name,
			location: dataJson.location,
			timeUpdate: dataJson.timeUpdate,
			vangmiengsjcBuy: dataJson.vangmiengpnjBuy,
			nhantronpnjBuy: dataJson.nhantronpnjBuy,
			vangkimbaoBuy: dataJson.vangkimbaoBuy,
			vangphucloctaiBuy: dataJson.vangphucloctaiBuy,
			vang24kBuy: dataJson.vang24kBuy,
			vang750Buy: dataJson.vang750Buy,
			vang585Buy: dataJson.vang585Buy,
			vang416Buy: dataJson.vang416Buy,
			vangmiengpnjBuy: dataJson.vangmiengpnjBuy,
			vang916Buy: dataJson.vang916Buy,
			vang680Buy: dataJson.vang680Buy,
			vang650Buy: dataJson.vang650Buy,

			vangmiengsjcSell: dataJson.vangmiengpnjSell,
			nhantronpnjSell: dataJson.nhantronpnjSell,
			vangkimbaoSell: dataJson.vangkimbaoSell,
			vangphucloctaiSell: dataJson.vangphucloctaiSell,
			vang24kSell: dataJson.vang24kSell,
			vang750Sell: dataJson.vang750Sell,
			vang585Sell: dataJson.vang585Sell,
			vang416Sell: dataJson.vang416Sell,
			vangmiengpnjSell: dataJson.vangmiengpnjSell,
			vang916Sell: dataJson.vang916Sell,
			vang680Sell: dataJson.vang680Sell,
			vang650Sell: dataJson.vang650Sell,
		},
		{ upsert: true }
	)
		.then((doc) => console.timeEnd('pnj' + index))
		.catch((err) => {
			console.log(err.code + ' ' + err.response.status + ' pnj');
			uploadErrorToDb(err.code + ' ' + err.response.status + ' pnj');
		});
};

const crawlDoji = async () => {
	console.time('doji');
	const result = await axios(urlDoji)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err.code + ' ' + err.response.status + ' doji');
			uploadErrorToDb(err.code + ' ' + err.response.status + ' doji');
		});

	const $ = cheerio.load(result);

	let dataJson = {};

	try {
		dataJson.name = 'DOJI';

		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);
		$('._table').each((index, el) => {
			if (index == 1) {
				//-----Ha Noi----------
				dataJson.sjcHNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(2)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.AVPLHNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(3)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nhanHTVHNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(4)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.KTTKimGiapHNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(5)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.phiSjcHNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(6)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang9999HNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(7)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang999HNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(8)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang99HNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(9)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang18kHNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(10)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang14kHNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(11)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang10kHNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(12)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();

				dataJson.sjcHNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(2)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.AVPLHNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(3)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nhanHTVHNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(4)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.KTTKimGiapHNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(5)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.phiSjcHNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(6)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang9999HNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(7)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang999HNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(8)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang99HNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(9)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang18kHNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(10)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang14kHNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(11)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang10kHNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(12)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
			}
			if (index == 2) {
				//--------Ho Chi Minh----------
				dataJson.sjcHCMBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(2)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.AVPLHCMBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(3)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.KNTKTTKimGiapHCMBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(4)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nhanHTVHCMBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(5)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang9999HCMBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(6)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang999HCMBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(7)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang99HCMBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(8)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang75HCMBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(9)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();

				dataJson.sjcHCMSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(2)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.AVPLHCMSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(3)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.KNTKTTKimGiapHCMSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(4)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nhanHTVHCMSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(5)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang9999HCMSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(6)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang999HCMSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(7)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang99HCMSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(8)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang75HCMSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(9)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
			}
			if (index == 3) {
				//--------Da Nang--------------
				dataJson.sjcDNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(2)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.AVPLDNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(3)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.KNTKTTKimGiapDNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(4)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nhanHTVDNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(5)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang9999DNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(6)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang75DNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(7)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang68DNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(8)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang58_3DNBuy = (
					$(el)
						.find('._content-tab ._buy :nth-child(9)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();

				dataJson.sjcDNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(2)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.AVPLDNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(3)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.KNTKTTKimGiapDNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(4)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nhanHTVDNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(5)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang9999DNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(6)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang75DNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(7)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang68DNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(8)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
				dataJson.nuTrang58_3DNSell = (
					$(el)
						.find('._content-tab ._Sell :nth-child(9)')
						.text()
						.replace(/\s/g, '')
						.replace(',', '') * 10000
				).toString();
			}
		});
	} catch (error) {
		console.log(error.message);
	}

	Doji.findOneAndUpdate(
		{ name: dataJson.name },
		{
			name: dataJson.name,
			timeUpdate: dataJson.timeUpdate,
			sjcHNBuy: dataJson.sjcHNBuy,
			sjcHNSell: dataJson.sjcHNSell,
			AVPLHNBuy: dataJson.AVPLHNBuy,
			AVPLHNSell: dataJson.AVPLHNSell,
			nhanHTVHNBuy: dataJson.nhanHTVHNBuy,
			nhanHTVHNSell: dataJson.nhanHTVHNSell,
			KTTKimGiapHNBuy: dataJson.KTTKimGiapHNBuy,
			KTTKimGiapHNSell: dataJson.KTTKimGiapHNSell,
			phiSjcHNBuy: dataJson.phiSjcHNBuy,
			phiSjcHNSell: dataJson.phiSjcHNSell,
			nuTrang9999HNBuy: dataJson.nuTrang9999HNBuy,
			nuTrang9999HNSell: dataJson.nuTrang9999HNSell,
			nuTrang999HNBuy: dataJson.nuTrang999HNBuy,
			nuTrang999HNSell: dataJson.nuTrang999HNSell,
			nuTrang99HNBuy: dataJson.nuTrang99HNBuy,
			nuTrang99HNSell: dataJson.nuTrang99HNSell,
			nuTrang18kHNBuy: dataJson.nuTrang18kHNBuy,
			nuTrang18kHNSell: dataJson.nuTrang18kHNSell,
			nuTrang14kHNBuy: dataJson.nuTrang14kHNBuy,
			nuTrang14kHNSell: dataJson.nuTrang14kHNSell,
			nuTrang10kHNBuy: dataJson.nuTrang10kHNBuy,
			nuTrang10kHNSell: dataJson.nuTrang10kHNSell,

			sjcHCMBuy: dataJson.sjcHCMBuy,
			sjcHCMSell: dataJson.sjcHCMSell,
			AVPLHCMBuy: dataJson.AVPLHCMBuy,
			AVPLHCMSell: dataJson.AVPLHCMSell,
			KNTKTTKimGiapHCMBuy: dataJson.KNTKTTKimGiapHCMBuy,
			KNTKTTKimGiapHCMSell: dataJson.KNTKTTKimGiapHCMSell,
			nhanHTVHCMBuy: dataJson.nhanHTVHCMBuy,
			nhanHTVHCMSell: dataJson.nhanHTVHCMSell,
			nuTrang9999HCMBuy: dataJson.nuTrang9999HCMBuy,
			nuTrang9999HCMSell: dataJson.nuTrang9999HCMSell,
			nuTrang999HCMBuy: dataJson.nuTrang999HCMBuy,
			nuTrang999HCMSell: dataJson.nuTrang999HCMSell,
			nuTrang99HCMBuy: dataJson.nuTrang99HCMBuy,
			nuTrang99HCMSell: dataJson.nuTrang99HCMSell,
			nuTrang75HCMBuy: dataJson.nuTrang75HCMBuy,
			nuTrang75HCMSell: dataJson.nuTrang75HCMSell,

			sjcDNBuy: dataJson.sjcDNBuy,
			sjcDNSell: dataJson.sjcDNSell,
			AVPLDNBuy: dataJson.AVPLDNBuy,
			AVPLDNSell: dataJson.AVPLDNSell,
			KNTKTTKimGiapDNBuy: dataJson.KNTKTTKimGiapDNBuy,
			KNTKTTKimGiapDNSell: dataJson.KNTKTTKimGiapDNSell,
			nhanHTVDNBuy: dataJson.nhanHTVDNBuy,
			nhanHTVDNSell: dataJson.nhanHTVDNSell,
			nuTrang9999DNBuy: dataJson.nuTrang9999DNBuy,
			nuTrang9999DNSell: dataJson.nuTrang9999DNSell,
			nuTrang75DNBuy: dataJson.nuTrang75DNBuy,
			nuTrang75DNSell: dataJson.nuTrang75DNSell,
			nuTrang68DNBuy: dataJson.nuTrang68DNBuy,
			nuTrang68DNSell: dataJson.nuTrang68DNSell,
			nuTrang58_3DNBuy: dataJson.nuTrang58_3DNBuy,
			nuTrang58_3DNSell: dataJson.nuTrang58_3DNSell,
		},
		{ upsert: true }
	)
		.then((doc) => console.timeEnd('doji'))
		.catch((err) => {
			console.log(err.code + ' ' + err.response.status + ' doji');
			uploadErrorToDb(err.code + ' ' + err.response.status + ' doji');
		});
};

const crawlPhuQuySjc = async () => {
	console.time('phuquy');
	const result = await axios(urlPhuQuySjc)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err.code + ' ' + err.response.status + ' Phú Quý SJC');
			uploadErrorToDb(
				err.code + ' ' + err.response.status + ' Phú Quý SJC'
			);
		});

	const $ = cheerio.load(result);

	let dataJson = {};

	try {
		dataJson.name = 'Phú Quý SJC';
		dataJson.location = 'Hà Nội';

		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);

		dataJson.sjcBuy = $('#myTable tbody :nth-child(1) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjcSell = $('#myTable tbody :nth-child(1) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjnBuy = $('#myTable tbody :nth-child(12) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.sjnSell = $('#myTable tbody :nth-child(12) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.npqBuy = $('#myTable tbody :nth-child(11) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.npqSell = $('#myTable tbody :nth-child(11) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.cngBuy = $('#myTable tbody :nth-child(10) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.cngSell = $('#myTable tbody :nth-child(10) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vang24kBuy = $('#myTable tbody :nth-child(9) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vang24kSell = $('#myTable tbody :nth-child(9) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vang999Buy = $('#myTable tbody :nth-child(7) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vang999Sell = $('#myTable tbody :nth-child(7) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vang099Buy = $('#myTable tbody :nth-child(5) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vang099Sell = $('#myTable tbody :nth-child(5) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.v99Buy = $('#myTable tbody :nth-child(4) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.v99Sell = $('#myTable tbody :nth-child(4) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.v999Buy = $('#myTable tbody :nth-child(6) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.v999Sell = $('#myTable tbody :nth-child(6) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.v9999Buy = $('#myTable tbody :nth-child(8) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.v9999Sell = $('#myTable tbody :nth-child(8) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
	} catch (err) {
		console.log(err);
	}

	PhuQuySjc.findOneAndUpdate(
		{ name: dataJson.name },
		{
			name: dataJson.name,
			location: dataJson.location,
			timeUpdate: dataJson.timeUpdate,
			sjcBuy: dataJson.sjcBuy,
			sjnBuy: dataJson.sjnBuy,
			npqBuy: dataJson.npqBuy,
			cngBuy: dataJson.cngBuy,
			vang24kBuy: dataJson.vang24kBuy,
			vang999Buy: dataJson.vang999Buy,
			vang099Buy: dataJson.vang099Buy,
			v99Buy: dataJson.v99Buy,
			v999Buy: dataJson.v999Buy,
			v9999Buy: dataJson.v9999Buy,

			sjcSell: dataJson.sjcSell,
			sjnSell: dataJson.sjnSell,
			npqSell: dataJson.npqSell,
			cngSell: dataJson.cngSell,
			vang24kSell: dataJson.vang24kSell,
			vang999Sell: dataJson.vang999Sell,
			vang099Sell: dataJson.vang099Sell,
			v99Sell: dataJson.v99Sell,
			v999Sell: dataJson.v999Sell,
			v9999Sell: dataJson.v9999Sell,
		},
		{ upsert: true }
	)
		.then((doc) => console.timeEnd('phuquy'))
		.catch((err) => {
			console.log(err.code + ' ' + err.response.status + ' Phú Quý SJC');
			uploadErrorToDb(
				err.code + ' ' + err.response.status + ' Phú Quý SJC'
			);
		});
};

const crawlBaoTinMinhChau = async () => {
	console.time('baotinminhchau');
	const result = await axios(ulrBaoTinMinhChau)
		.then((res) => res.data)
		.catch((err) => {
			console.log(
				err.code + ' ' + err.response.status + ' baotinminhchau'
			);
			uploadErrorToDb(
				err.code + ' ' + err.response.status + ' baotinminhchau'
			);
		});

	const $ = cheerio.load(result);

	let dataJson = {};

	try {
		dataJson.name = 'Bảo Tín Minh Châu';
		dataJson.location = 'Hà Nội';

		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);

		dataJson.vangMiengVRTLBuy = $(
			'#myTable tbody :nth-child(2) td:nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vangMiengVRTLSell = $(
			'#myTable tbody :nth-child(2) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.nhanTronTronBuy = $(
			'#myTable tbody :nth-child(1) td:nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.nhanTronTronSell = $(
			'#myTable tbody :nth-child(1) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.quaMungBanViVangBuy = $(
			'#myTable tbody :nth-child(8) td:nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.quaMungBanViVangSell = $(
			'#myTable tbody :nth-child(8) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vangMiengSjcBuy = $(
			'#myTable tbody :nth-child(6) td:nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vangMiengSjcSell = $(
			'#myTable tbody :nth-child(6) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.trangSucBangVangRongThangLong9999Buy = $(
			'#myTable tbody :nth-child(3) td:nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.trangSucBangVangRongThangLong9999Sell = $(
			'#myTable tbody :nth-child(3) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.trangSucBangVangRongThangLong999Buy = $(
			'#myTable tbody :nth-child(4) td:nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.trangSucBangVangRongThangLong999Sell = $(
			'#myTable tbody :nth-child(4) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vangHTBTBuy = $('#myTable tbody :nth-child(5) td:nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vangHTBTSell = $(
			'#myTable tbody :nth-child(5) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vangNguyenLieuBuy = $(
			'#myTable tbody :nth-child(7) td:nth-child(3)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vangNguyenLieuSell = $(
			'#myTable tbody :nth-child(7) td:nth-child(4)'
		)
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
	} catch (err) {
		console.log(err);
	}
	// console.log(dataJson);

	BaoTinMinhChau.findOneAndUpdate(
		{ name: dataJson.name },
		{
			name: dataJson.name,
			location: dataJson.location,
			timeUpdate: dataJson.timeUpdate,
			'vangRongThangLong.vangMiengVRTLBuy': dataJson.vangMiengVRTLBuy,
			'vangRongThangLong.vangMiengVRTLSell': dataJson.vangMiengVRTLSell,
			'vangRongThangLong.nhanTronTronBuy': dataJson.nhanTronTronBuy,
			'vangRongThangLong.nhanTronTronSell': dataJson.nhanTronTronSell,

			'quaMungVang.quaMungBanViVangBuy': dataJson.quaMungBanViVangBuy,
			'quaMungVang.quaMungBanViVangSell': dataJson.quaMungBanViVangSell,

			'vangSjc.vangMiengSjcBuy': dataJson.vangMiengSjcBuy,
			'vangSjc.vangMiengSjcSell': dataJson.vangMiengSjcSell,

			'vangBTMC.trangSucBangVangRongThangLong9999Buy':
				dataJson.trangSucBangVangRongThangLong9999Buy,
			'vangBTMC.trangSucBangVangRongThangLong9999Sell':
				dataJson.trangSucBangVangRongThangLong9999Sell,
			'vangBTMC.trangSucBangVangRongThangLong999Buy':
				dataJson.trangSucBangVangRongThangLong999Buy,
			'vangBTMC.trangSucBangVangRongThangLong999Sell':
				dataJson.trangSucBangVangRongThangLong999Sell,

			'vangHTBT.vangHTBTBuy': dataJson.vangHTBTBuy,
			'vangHTBT.vangHTBTSell': dataJson.vangHTBTSell,
			'vangThiTruong.vangNguyenLieuBuy': dataJson.vangNguyenLieuBuy,
			'vangThiTruong.vangNguyenLieuSell': dataJson.vangNguyenLieuSell,
		},
		{ upsert: true }
	)
		.then((doc) => console.timeEnd('baotinminhchau'))
		.catch((err) => {
			console.log(
				err.code + ' ' + err.response.status + ' baotinminhchau'
			);
			uploadErrorToDb(
				err.code + ' ' + err.response.status + ' baotinminhchau'
			);
		});
};

const crawlMiHong = async () => {
	console.time('mihong');
	const result = await axios(urlMiHong)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err.code + ' ' + err.response.status + ' mihong');
			uploadErrorToDb(err.code + ' ' + err.response.status + ' mihong');
		});

	const $ = cheerio.load(result);

	let dataJson = {};

	try {
		dataJson.name = 'Mi Hồng';
		dataJson.location = 'Hồ Chí Minh';

		let date = new Date();
		dataJson.timeUpdate = Math.floor(Date.now() / 1000);

		dataJson.sjcBuy = $('#myTable tbody :nth-child(1) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.sjcSell = $('#myTable tbody :nth-child(1) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vang999Buy = $('#myTable tbody :nth-child(2) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vang999Sell = $('#myTable tbody :nth-child(2) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vang985Buy = $('#myTable tbody :nth-child(3) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vang985Sell = $('#myTable tbody :nth-child(3) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vang980Buy = $('#myTable tbody :nth-child(4) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vang980Sell = $('#myTable tbody :nth-child(4) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vang950Buy = $('#myTable tbody :nth-child(7) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vang950Sell = $('#myTable tbody :nth-child(7) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vang750Buy = $('#myTable tbody :nth-child(8) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vang750Sell = $('#myTable tbody :nth-child(8) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vang680Buy = $('#myTable tbody :nth-child(5) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vang680Sell = $('#myTable tbody :nth-child(5) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');

		dataJson.vang610Buy = $('#myTable tbody :nth-child(6) :nth-child(3)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
		dataJson.vang610Sell = $('#myTable tbody :nth-child(6) :nth-child(4)')
			.contents()
			.first()
			.text()
			.slice(1, -1)
			.replace(/\./g, '');
	} catch (err) {
		console.log(err);
	}

	MiHong.findOneAndUpdate(
		{ name: dataJson.name },
		{
			name: dataJson.name,
			location: dataJson.location,
			timeUpdate: dataJson.timeUpdate,

			sjcBuy: dataJson.sjcBuy,
			vang999Buy: dataJson.vang999Buy,
			vang985Buy: dataJson.vang985Buy,
			vang980Buy: dataJson.vang980Buy,
			vang950Buy: dataJson.vang950Buy,
			vang750Buy: dataJson.vang750Buy,
			vang680Buy: dataJson.vang680Buy,
			vang610Buy: dataJson.vang610Buy,

			sjcSell: dataJson.sjcSell,
			vang999Sell: dataJson.vang999Sell,
			vang985Sell: dataJson.vang985Sell,
			vang980Sell: dataJson.vang980Sell,
			vang950Sell: dataJson.vang950Sell,
			vang750Sell: dataJson.vang750Sell,
			vang680Sell: dataJson.vang680Sell,
			vang610Sell: dataJson.vang610Sell,
		},
		{ upsert: true }
	)
		.then((doc) => console.timeEnd('mihong'))
		.catch((err) => {
			console.log(err.code + ' ' + err.response.status + ' mihong');
			uploadErrorToDb(err.code + ' ' + err.response.status + ' mihong');
		});
};

//only this function crawlSjc crawl data price of sjc and update both price and chart
// const crawlSjc = asyncHandler(async () => {
// const pageEvaluateFunc = async () => {
// 	const $ = document.querySelector.bind(document);

// 	let dataJson = {};

// 	try {
// 		dataJson.name = 'SJC';

// 		let date = new Date();
// 		dataJson.timeUpdate =
// 			date.getHours() +
// 			':' +
// 			date.getMinutes() +
// 			':' +
// 			date.getSeconds() +
// 			' ' +
// 			date.getDate() +
// 			'/' +
// 			(date.getMonth() + 1) +
// 			'/' +
// 			date.getFullYear();

// 		dataJson.sjc1l10lBuy = $(
// 			'#price1 table tbody :nth-child(4) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lSell = $(
// 			'#price1 table tbody :nth-child(4) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc5cBuy = $(
// 			'#price1 table tbody :nth-child(5) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc5cSell = $(
// 			'#price1 table tbody :nth-child(5) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc2c1c5phanBuy = $(
// 			'#price1 table tbody :nth-child(6) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc2c1c5phanSell = $(
// 			'#price1 table tbody :nth-child(6) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.nhansjc99_991chi2chi5chiBuy = $(
// 			'#price1 table tbody :nth-child(7) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.nhansjc99_991chi2chi5chiSell = $(
// 			'#price1 table tbody :nth-child(7) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.nhansjc99_99_0_5chiBuy = $(
// 			'#price1 table tbody :nth-child(8) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.nhansjc99_99_0_5chiSell = $(
// 			'#price1 table tbody :nth-child(8) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.nutrang99_99percentBuy = $(
// 			'#price1 table tbody :nth-child(9) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.nutrang99_99percentSell = $(
// 			'#price1 table tbody :nth-child(9) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.nutrang99percentBuy = $(
// 			'#price1 table tbody :nth-child(10) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.nutrang99percentSell = $(
// 			'#price1 table tbody :nth-child(10) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.nutrang75percentBuy = $(
// 			'#price1 table tbody :nth-child(11) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.nutrang75percentSell = $(
// 			'#price1 table tbody :nth-child(11) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.nutrang58_3percentBuy = $(
// 			'#price1 table tbody :nth-child(12) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.nutrang58_3percentSell = $(
// 			'#price1 table tbody :nth-child(12) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.nutrang41_7percentBuy = $(
// 			'#price1 table tbody :nth-child(13) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.nutrang41_7percentSell = $(
// 			'#price1 table tbody :nth-child(13) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lHaNoiBuy = $(
// 			'#price1 table tbody :nth-child(15) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lHaNoiSell = $(
// 			'#price1 table tbody :nth-child(15) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lDaNangBuy = $(
// 			'#price1 table tbody :nth-child(17) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lDaNangSell = $(
// 			'#price1 table tbody :nth-child(17) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lNhaTrangBuy = $(
// 			'#price1 table tbody :nth-child(19) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lNhaTrangSell = $(
// 			'#price1 table tbody :nth-child(19) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lCaMauBuy = $(
// 			'#price1 table tbody :nth-child(21) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lCaMauSell = $(
// 			'#price1 table tbody :nth-child(21) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lHueBuy = $(
// 			'#price1 table tbody :nth-child(23) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lHueSell = $(
// 			'#price1 table tbody :nth-child(23) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lBinhPhuocBuy = $(
// 			'#price1 table tbody :nth-child(25) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lBinhPhuocSell = $(
// 			'#price1 table tbody :nth-child(25) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lBienHoaBuy = $(
// 			'#price1 table tbody :nth-child(27) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lBienHoaSell = $(
// 			'#price1 table tbody :nth-child(27) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lMienTayBuy = $(
// 			'#price1 table tbody :nth-child(29) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lMienTaySell = $(
// 			'#price1 table tbody :nth-child(29) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lQuangNgaiBuy = $(
// 			'#price1 table tbody :nth-child(31) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lQuangNgaiSell = $(
// 			'#price1 table tbody :nth-child(31) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lLongXuyenBuy = $(
// 			'#price1 table tbody :nth-child(33) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lLongXuyenSell = $(
// 			'#price1 table tbody :nth-child(33) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lBacLieuBuy = $(
// 			'#price1 table tbody :nth-child(35) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lBacLieuSell = $(
// 			'#price1 table tbody :nth-child(35) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lQuyNhonBuy = $(
// 			'#price1 table tbody :nth-child(37) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lQuyNhonSell = $(
// 			'#price1 table tbody :nth-child(37) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lPhanRangBuy = $(
// 			'#price1 table tbody :nth-child(39) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lPhanRangSell = $(
// 			'#price1 table tbody :nth-child(39) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lHaLongBuy = $(
// 			'#price1 table tbody :nth-child(41) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lHaLongSell = $(
// 			'#price1 table tbody :nth-child(41) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.sjc1l10lQuangNamBuy = $(
// 			'#price1 table tbody :nth-child(43) :nth-child(2)'
// 		)?.innerText;
// 		dataJson.sjc1l10lQuangNamSell = $(
// 			'#price1 table tbody :nth-child(43) :nth-child(3)'
// 		)?.innerText;

// 		dataJson.currentTimestamp = Math.floor(Date.now() / 1000);
// 	} catch (err) {
// 		console.log(err);
// 	}
// 	return dataJson;
// };

// 	let data = false;
// 	let attemps = 0;
// 	//retry request until it gets data or tries 3 times
// 	while (data == false && attemps < 2) {
// 		console.log('loop' + attemps);
// 		data = await collectQueryData(urlSjc, pageEvaluateFunc);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// Sjc.findOneAndUpdate(
// 	{ name: data.name },
// 	{
// 		name: data.name,
// 		timeUpdate: data.timeUpdate,
// 		sjc1l10lBuy: data.sjc1l10lBuy,
// 		sjc5cBuy: data.sjc5cBuy,
// 		sjc2c1c5phanBuy: data.sjc2c1c5phanBuy,
// 		nhansjc99_991chi2chi5chiBuy:
// 			data.nhansjc99_991chi2chi5chiBuy,
// 		nhansjc99_99_0_5chiBuy: data.nhansjc99_99_0_5chiBuy,
// 		nutrang99_99percentBuy: data.nutrang99_99percentBuy,
// 		nutrang99percentBuy: data.nutrang99percentBuy,
// 		nutrang75percentBuy: data.nutrang75percentBuy,
// 		nutrang58_3percentBuy: data.nutrang58_3percentBuy,
// 		nutrang41_7percentBuy: data.nutrang41_7percentBuy,

// 		sjc1l10lSell: data.sjc1l10lSell,
// 		sjc5cSell: data.sjc5cSell,
// 		sjc2c1c5phanSell: data.sjc2c1c5phanSell,
// 		nhansjc99_991chi2chi5chiSell:
// 			data.nhansjc99_991chi2chi5chiSell,
// 		nhansjc99_99_0_5chiSell: data.nhansjc99_99_0_5chiSell,
// 		nutrang99_99percentSell: data.nutrang99_99percentSell,
// 		nutrang99percentSell: data.nutrang99percentSell,
// 		nutrang75percentSell: data.nutrang75percentSell,
// 		nutrang58_3percentSell: data.nutrang58_3percentSell,
// 		nutrang41_7percentSell: data.nutrang41_7percentSell,

// 		sjc1l10lHanoiBuy: data.sjc1l10lHanoiBuy,
// 		sjc1l10lHaNoiSell: data.sjc1l10lHaNoiSell,

// 		sjc1l10lDaNangBuy: data.sjc1l10lDaNangBuy,
// 		sjc1l10lDaNangSell: data.sjc1l10lDaNangSell,

// 		sjc1l10lNhatrangBuy: data.sjc1l10lNhatrangBuy,
// 		sjc1l10lNhatrangSell: data.sjc1l10lNhatrangSell,

// 		sjc1l10lCaMauBuy: data.sjc1l10lCaMauBuy,
// 		sjc1l10lCaMauSell: data.sjc1l10lCaMauSell,

// 		sjc1l10lHueBuy: data.sjc1l10lHueBuy,
// 		sjc1l10lHueSell: data.sjc1l10lHueSell,

// 		sjc1l10lBinhPhuocBuy: data.sjc1l10lBinhPhuocBuy,
// 		sjc1l10lBinhPhuocSell: data.sjc1l10lBinhPhuocSell,

// 		sjc1l10lBienHoaBuy: data.sjc1l10lBienHoaBuy,
// 		sjc1l10lBienHoaSell: data.sjc1l10lBienHoaSell,

// 		sjc1l10lMientayBuy: data.sjc1l10lMientayBuy,
// 		sjc1l10lMientaySell: data.sjc1l10lMientaySell,

// 		sjc1l10lQuangNgaiBuy: data.sjc1l10lQuangNgaiBuy,
// 		sjc1l10lQuangNgaiSell: data.sjc1l10lQuangNgaiSell,

// 		sjc1l10lLongXuyenBuy: data.sjc1l10lLongXuyenBuy,
// 		sjc1l10lLongXuyenSell: data.sjc1l10lLongXuyenSell,

// 		sjc1l10lBacLieuBuy: data.sjc1l10lBacLieuBuy,
// 		sjc1l10lBacLieuSell: data.sjc1l10lBacLieuSell,

// 		sjc1l10lQuyNhonBuy: data.sjc1l10lQuyNhonBuy,
// 		sjc1l10lQuyNhonSell: data.sjc1l10lQuyNhonSell,

// 		sjc1l10lPhanRangBuy: data.sjc1l10lPhanRangBuy,
// 		sjc1l10lPhanRangSell: data.sjc1l10lPhanRangSell,

// 		sjc1l10lHaLongBuy: data.sjc1l10lHaLongBuy,
// 		sjc1l10lHaLongSell: data.sjc1l10lHaLongSell,

// 		sjc1l10lQuangNamBuy: data.sjc1l10lQuangNamBuy,
// 		sjc1l10lQuangNamSell: data.sjc1l10lQuangNamSell,
// 	},
// 	{ upsert: true }
// )
// 	// .then((doc) => console.log(doc))
// 	.catch((err) => console.log(err));

// SjcChart.findOneAndUpdate(
// 	{ name: data.name },
// 	{
// 		$push: {
// 			t: data.currentTimestamp,
// 			buy: data.sjc1l10lBuy,
// 			sell: data.sjc1l10lSell,
// 		},
// 	},
// 	{ upsert: true }
// )
// 	// .then((doc) => console.log(doc))
// 	.catch((err) => console.log(err));

// 			// await browser.close();
// 		}

// 		if (data === false) {
// 			//wait a few second, also a good idea to swap proxy here
// 			console.log('Recrawl........' + attemps);
// 			await new Promise((resolve) => setTimeout(resolve, 3000));
// 		}
// 	}
// });

// const crawlPnj1 = asyncHandler(async (localtionNumber, index) => {
// 	const pageEvaluateFunc = async (localtionNumber, index) => {
// 		const $ = document.querySelector.bind(document);

// 		let dataJson = {};

// 		try {
// 			dataJson.name = 'PNJ';
// 			dataJson.location = document.querySelector(
// 				`#select_gold_area :nth-child(${index})`
// 			)?.innerText;

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

// 			dataJson.vangmiengsjcBuy = $(
// 				'#content-price :nth-child(1) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.vangmiengsjcSell = $(
// 				'#content-price :nth-child(1) :nth-child(3) span'
// 			)?.innerText;

// 			dataJson.nhantronpnjBuy = $(
// 				'#content-price :nth-child(2) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.nhantronpnjSell = $(
// 				'#content-price :nth-child(2) :nth-child(3) span'
// 			)?.innerText;

// 			dataJson.vangkimbaoBuy = $(
// 				'#content-price :nth-child(3) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.vangkimbaoSell = $(
// 				'#content-price :nth-child(3) :nth-child(3) span'
// 			)?.innerText;

// 			dataJson.vangphucloctaiBuy = $(
// 				'#content-price :nth-child(4) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.vangphucloctaiSell = $(
// 				'#content-price :nth-child(4) :nth-child(3) span'
// 			)?.innerText;

// 			dataJson.vang24kBuy = $(
// 				'#content-price :nth-child(5) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.vang24kSell = $(
// 				'#content-price :nth-child(5) :nth-child(3) span'
// 			)?.innerText;

// 			dataJson.vang750Buy = $(
// 				'#content-price :nth-child(6) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.vang750Sell = $(
// 				'#content-price :nth-child(6) :nth-child(3) span'
// 			)?.innerText;

// 			dataJson.vang585Buy = $(
// 				'#content-price :nth-child(7) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.vang585Sell = $(
// 				'#content-price :nth-child(7) :nth-child(3) span'
// 			)?.innerText;

// 			dataJson.vang416Buy = $(
// 				'#content-price :nth-child(8) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.vang416Sell = $(
// 				'#content-price :nth-child(8) :nth-child(3) span'
// 			)?.innerText;

// 			dataJson.vangmiengpnjBuy = $(
// 				'#content-price :nth-child(9) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.vangmiengpnjSell = $(
// 				'#content-price :nth-child(9) :nth-child(3) span'
// 			)?.innerText;

// 			dataJson.vang916Buy = $(
// 				'#content-price :nth-child(10) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.vang916Sell = $(
// 				'#content-price :nth-child(10) :nth-child(3) span'
// 			)?.innerText;

// 			dataJson.vang680Buy = $(
// 				'#content-price :nth-child(11) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.vang680Sell = $(
// 				'#content-price :nth-child(11) :nth-child(3) span'
// 			)?.innerText;

// 			dataJson.vang650Buy = $(
// 				'#content-price :nth-child(12) :nth-child(2) span'
// 			)?.innerText;
// 			dataJson.vang650Sell = $(
// 				'#content-price :nth-child(12) :nth-child(3) span'
// 			)?.innerText;
// 		} catch (err) {
// 			console.log(err);
// 		}
// 		return dataJson;
// 	};

// 	const props = [localtionNumber, index];

// 	let data = false;
// 	let attemps = 0;
// 	//retry request until it gets data or tries 3 times
// 	while (data == false && attemps < 2) {
// 		console.log('loop' + attemps);
// 		data = await collectQueryData(
// 			`${urlPnj}${localtionNumber}`,
// 			pageEvaluateFunc,
// 			props
// 		);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// 			Pnj.findOneAndUpdate(
// 				{ location: data.location },
// 				{
// 					name: data.name,
// 					location: data.location,
// 					timeUpdate: data.timeUpdate,
// 					vangmiengsjcBuy: data.vangmiengpnjBuy,
// 					nhantronpnjBuy: data.nhantronpnjBuy,
// 					vangkimbaoBuy: data.vangkimbaoBuy,
// 					vangphucloctaiBuy: data.vangphucloctaiBuy,
// 					vang24kBuy: data.vang24kBuy,
// 					vang750Buy: data.vang750Buy,
// 					vang585Buy: data.vang585Buy,
// 					vang416Buy: data.vang416Buy,
// 					vangmiengpnjBuy: data.vangmiengpnjBuy,
// 					vang916Buy: data.vang916Buy,
// 					vang680Buy: data.vang680Buy,
// 					vang650Buy: data.vang650Buy,

// 					vangmiengsjcSell: data.vangmiengpnjSell,
// 					nhantronpnjSell: data.nhantronpnjSell,
// 					vangkimbaoSell: data.vangkimbaoSell,
// 					vangphucloctaiSell: data.vangphucloctaiSell,
// 					vang24kSell: data.vang24kSell,
// 					vang750Sell: data.vang750Sell,
// 					vang585Sell: data.vang585Sell,
// 					vang416Sell: data.vang416Sell,
// 					vangmiengpnjSell: data.vangmiengpnjSell,
// 					vang916Sell: data.vang916Sell,
// 					vang680Sell: data.vang680Sell,
// 					vang650Sell: data.vang650Sell,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc))
// 				.catch((err) => console.log(data.name));

// 			// await browser.close();
// 		}

// 		if (data === false) {
// 			//wait a few second, also a good idea to swap proxy here
// 			console.log('Recrawl........' + attemps);
// 			await new Promise((resolve) => setTimeout(resolve, 3000));
// 		}
// 	}
// });

// const crawlDoji1 = asyncHandler(async (location) => {
// 	const pageEvaluateFunc = async (localtion) => {
// 		const $ = document.querySelector.bind(document);
// 		const $$ = document.querySelectorAll.bind(document);

// 		let dataJson = {};

// 		try {
// 			dataJson.name = 'DOJI';

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

// 			//-----Ha Noi----------
// 			const tableHN = $$('._table')[1];
// 			dataJson.sjcHNBuy = tableHN.querySelector(
// 				'._content-tab ._buy :nth-child(2)'
// 			)?.innerText;
// 			dataJson.AVPLHNBuy = tableHN.querySelector(
// 				'._content-tab ._buy :nth-child(3)'
// 			)?.innerText;
// 			dataJson.nhanHTVHNBuy = tableHN.querySelector(
// 				'._content-tab ._buy :nth-child(4)'
// 			)?.innerText;
// 			dataJson.KTTKimGiapHNBuy = tableHN.querySelector(
// 				'._content-tab ._buy :nth-child(5)'
// 			)?.innerText;
// 			dataJson.phiSjcHNBuy = tableHN.querySelector(
// 				'._content-tab ._buy :nth-child(6)'
// 			)?.innerText;
// 			dataJson.nuTrang9999HNBuy = tableHN.querySelector(
// 				'._content-tab ._buy :nth-child(7)'
// 			)?.innerText;
// 			dataJson.nuTrang999HNBuy = tableHN.querySelector(
// 				'._content-tab ._buy :nth-child(8)'
// 			)?.innerText;
// 			dataJson.nuTrang99HNBuy = tableHN.querySelector(
// 				'._content-tab ._buy :nth-child(9)'
// 			)?.innerText;
// 			dataJson.nuTrang18kHNBuy = tableHN.querySelector(
// 				'._content-tab ._buy :nth-child(10)'
// 			)?.innerText;
// 			dataJson.nuTrang14kHNBuy = tableHN.querySelector(
// 				'._content-tab ._buy :nth-child(11)'
// 			)?.innerText;
// 			dataJson.nuTrang10kHNBuy = tableHN.querySelector(
// 				'._content-tab ._buy :nth-child(12)'
// 			)?.innerText;

// 			dataJson.sjcHNSell = tableHN.querySelector(
// 				'._content-tab ._Sell :nth-child(2)'
// 			)?.innerText;
// 			dataJson.AVPLHNSell = tableHN.querySelector(
// 				'._content-tab ._Sell :nth-child(3)'
// 			)?.innerText;
// 			dataJson.nhanHTVHNSell = tableHN.querySelector(
// 				'._content-tab ._Sell :nth-child(4)'
// 			)?.innerText;
// 			dataJson.KTTKimGiapHNSell = tableHN.querySelector(
// 				'._content-tab ._Sell :nth-child(5)'
// 			)?.innerText;
// 			dataJson.phiSjcHNSell = tableHN.querySelector(
// 				'._content-tab ._Sell :nth-child(6)'
// 			)?.innerText;
// 			dataJson.nuTrang9999HNSell = tableHN.querySelector(
// 				'._content-tab ._Sell :nth-child(7)'
// 			)?.innerText;
// 			dataJson.nuTrang999HNSell = tableHN.querySelector(
// 				'._content-tab ._Sell :nth-child(8)'
// 			)?.innerText;
// 			dataJson.nuTrang99HNSell = tableHN.querySelector(
// 				'._content-tab ._Sell :nth-child(9)'
// 			)?.innerText;
// 			dataJson.nuTrang18kHNSell = tableHN.querySelector(
// 				'._content-tab ._Sell :nth-child(10)'
// 			)?.innerText;
// 			dataJson.nuTrang14kHNSell = tableHN.querySelector(
// 				'._content-tab ._Sell :nth-child(11)'
// 			)?.innerText;
// 			dataJson.nuTrang10kHNSell = tableHN.querySelector(
// 				'._content-tab ._Sell :nth-child(12)'
// 			)?.innerText;

// 			//--------Ho Chi Minh----------
// 			const tableHCM = document.querySelectorAll('._table')[2];
// 			dataJson.sjcHCMBuy = tableHCM.querySelector(
// 				'._content-tab ._buy :nth-child(2)'
// 			)?.innerText;
// 			dataJson.AVPLHCMBuy = tableHCM.querySelector(
// 				'._content-tab ._buy :nth-child(3)'
// 			)?.innerText;
// 			dataJson.KNTKTTKimGiapHCMBuy = tableHCM.querySelector(
// 				'._content-tab ._buy :nth-child(4)'
// 			)?.innerText;
// 			dataJson.nhanHTVHCMBuy = tableHCM.querySelector(
// 				'._content-tab ._buy :nth-child(5)'
// 			)?.innerText;
// 			dataJson.nuTrang9999HCMBuy = tableHCM.querySelector(
// 				'._content-tab ._buy :nth-child(6)'
// 			)?.innerText;
// 			dataJson.nuTrang999HCMBuy = tableHCM.querySelector(
// 				'._content-tab ._buy :nth-child(7)'
// 			)?.innerText;
// 			dataJson.nuTrang99HCMBuy = tableHCM.querySelector(
// 				'._content-tab ._buy :nth-child(8)'
// 			)?.innerText;
// 			dataJson.nuTrang75HCMBuy = tableHCM.querySelector(
// 				'._content-tab ._buy :nth-child(9)'
// 			)?.innerText;

// 			dataJson.sjcHCMSell = tableHCM.querySelector(
// 				'._content-tab ._Sell :nth-child(2)'
// 			)?.innerText;
// 			dataJson.AVPLHCMSell = tableHCM.querySelector(
// 				'._content-tab ._Sell :nth-child(3)'
// 			)?.innerText;
// 			dataJson.KNTKTTKimGiapHCMSell = tableHCM.querySelector(
// 				'._content-tab ._Sell :nth-child(4)'
// 			)?.innerText;
// 			dataJson.nhanHTVHCMSell = tableHCM.querySelector(
// 				'._content-tab ._Sell :nth-child(5)'
// 			)?.innerText;
// 			dataJson.nuTrang9999HCMSell = tableHCM.querySelector(
// 				'._content-tab ._Sell :nth-child(6)'
// 			)?.innerText;
// 			dataJson.nuTrang999HCMSell = tableHCM.querySelector(
// 				'._content-tab ._Sell :nth-child(7)'
// 			)?.innerText;
// 			dataJson.nuTrang99HCMSell = tableHCM.querySelector(
// 				'._content-tab ._Sell :nth-child(8)'
// 			)?.innerText;
// 			dataJson.nuTrang75HCMSell = tableHCM.querySelector(
// 				'._content-tab ._Sell :nth-child(9)'
// 			)?.innerText;

// 			//--------Da Nang--------------
// 			const tableDN = document.querySelectorAll('._table')[3];
// 			dataJson.sjcDNBuy = tableDN.querySelector(
// 				'._content-tab ._buy :nth-child(2)'
// 			)?.innerText;
// 			dataJson.AVPLDNBuy = tableDN.querySelector(
// 				'._content-tab ._buy :nth-child(3)'
// 			)?.innerText;
// 			dataJson.KNTKTTKimGiapDNBuy = tableDN.querySelector(
// 				'._content-tab ._buy :nth-child(4)'
// 			)?.innerText;
// 			dataJson.nhanHTVDNBuy = tableDN.querySelector(
// 				'._content-tab ._buy :nth-child(5)'
// 			)?.innerText;
// 			dataJson.nuTrang9999DNBuy = tableDN.querySelector(
// 				'._content-tab ._buy :nth-child(6)'
// 			)?.innerText;
// 			dataJson.nuTrang75DNBuy = tableDN.querySelector(
// 				'._content-tab ._buy :nth-child(7)'
// 			)?.innerText;
// 			dataJson.nuTrang68DNBuy = tableDN.querySelector(
// 				'._content-tab ._buy :nth-child(8)'
// 			)?.innerText;
// 			dataJson.nuTrang58_3DNBuy = tableDN.querySelector(
// 				'._content-tab ._buy :nth-child(9)'
// 			)?.innerText;

// 			dataJson.sjcDNSell = tableDN.querySelector(
// 				'._content-tab ._Sell :nth-child(2)'
// 			)?.innerText;
// 			dataJson.AVPLDNSell = tableDN.querySelector(
// 				'._content-tab ._Sell :nth-child(3)'
// 			)?.innerText;
// 			dataJson.KNTKTTKimGiapDNSell = tableDN.querySelector(
// 				'._content-tab ._Sell :nth-child(4)'
// 			)?.innerText;
// 			dataJson.nhanHTVDNSell = tableDN.querySelector(
// 				'._content-tab ._Sell :nth-child(5)'
// 			)?.innerText;
// 			dataJson.nuTrang9999DNSell = tableDN.querySelector(
// 				'._content-tab ._Sell :nth-child(6)'
// 			)?.innerText;
// 			dataJson.nuTrang75DNSell = tableDN.querySelector(
// 				'._content-tab ._Sell :nth-child(7)'
// 			)?.innerText;
// 			dataJson.nuTrang68DNSell = tableDN.querySelector(
// 				'._content-tab ._Sell :nth-child(8)'
// 			)?.innerText;
// 			dataJson.nuTrang58_3DNSell = tableDN.querySelector(
// 				'._content-tab ._Sell :nth-child(9)'
// 			)?.innerText;
// 		} catch (err) {
// 			console.log(err);
// 		}
// 		return dataJson;
// 	};

// 	const props = [location];

// 	let data = false;
// 	let attemps = 0;
// 	//retry request until it gets data or tries 3 times
// 	while (data == false && attemps < 2) {
// 		console.log('loop' + attemps);
// 		data = await collectQueryData(urlDoji, pageEvaluateFunc, props);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// 			Doji.findOneAndUpdate(
// 				{ name: data.name },
// 				{
// 					name: data.name,
// 					timeUpdate: data.timeUpdate,
// 					sjcHNBuy: data.sjcHNBuy,
// 					sjcHNSell: data.sjcHNSell,
// 					AVPLHNBuy: data.AVPLHNBuy,
// 					AVPLHNSell: data.AVPLHNSell,
// 					nhanHTVHNBuy: data.nhanHTVHNBuy,
// 					nhanHTVHNSell: data.nhanHTVHNSell,
// 					KTTKimGiapHNBuy: data.KTTKimGiapHNBuy,
// 					KTTKimGiapHNSell: data.KTTKimGiapHNSell,
// 					phiSjcHNBuy: data.phiSjcHNBuy,
// 					phiSjcHNSell: data.phiSjcHNSell,
// 					nuTrang9999HNBuy: data.nuTrang9999HNBuy,
// 					nuTrang9999HNSell: data.nuTrang9999HNSell,
// 					nuTrang999HNBuy: data.nuTrang999HNBuy,
// 					nuTrang999HNSell: data.nuTrang999HNSell,
// 					nuTrang99HNBuy: data.nuTrang99HNBuy,
// 					nuTrang99HNSell: data.nuTrang99HNSell,
// 					nuTrang18kHNBuy: data.nuTrang18kHNBuy,
// 					nuTrang18kHNSell: data.nuTrang18kHNSell,
// 					nuTrang14kHNBuy: data.nuTrang14kHNBuy,
// 					nuTrang14kHNSell: data.nuTrang14kHNSell,
// 					nuTrang10kHNBuy: data.nuTrang10kHNBuy,
// 					nuTrang10kHNSell: data.nuTrang10kHNSell,

// 					sjcHCMBuy: data.sjcHCMBuy,
// 					sjcHCMSell: data.sjcHCMSell,
// 					AVPLHCMBuy: data.AVPLHCMBuy,
// 					AVPLHCMSell: data.AVPLHCMSell,
// 					KNTKTTKimGiapHCMBuy: data.KNTKTTKimGiapHCMBuy,
// 					KNTKTTKimGiapHCMSell: data.KNTKTTKimGiapHCMSell,
// 					nhanHTVHCMBuy: data.nhanHTVHCMBuy,
// 					nhanHTVHCMSell: data.nhanHTVHCMSell,
// 					nuTrang9999HCMBuy: data.nuTrang9999HCMBuy,
// 					nuTrang9999HCMSell: data.nuTrang9999HCMSell,
// 					nuTrang999HCMBuy: data.nuTrang999HCMBuy,
// 					nuTrang999HCMSell: data.nuTrang999HCMSell,
// 					nuTrang99HCMBuy: data.nuTrang99HCMBuy,
// 					nuTrang99HCMSell: data.nuTrang99HCMSell,
// 					nuTrang75HCMBuy: data.nuTrang75HCMBuy,
// 					nuTrang75HCMSell: data.nuTrang75HCMSell,

// 					sjcDNBuy: data.sjcDNBuy,
// 					sjcDNSell: data.sjcDNSell,
// 					AVPLDNBuy: data.AVPLDNBuy,
// 					AVPLDNSell: data.AVPLDNSell,
// 					KNTKTTKimGiapDNBuy: data.KNTKTTKimGiapDNBuy,
// 					KNTKTTKimGiapDNSell: data.KNTKTTKimGiapDNSell,
// 					nhanHTVDNBuy: data.nhanHTVDNBuy,
// 					nhanHTVDNSell: data.nhanHTVDNSell,
// 					nuTrang9999DNBuy: data.nuTrang9999DNBuy,
// 					nuTrang9999DNSell: data.nuTrang9999DNSell,
// 					nuTrang75DNBuy: data.nuTrang75DNBuy,
// 					nuTrang75DNSell: data.nuTrang75DNSell,
// 					nuTrang68DNBuy: data.nuTrang68DNBuy,
// 					nuTrang68DNSell: data.nuTrang68DNSell,
// 					nuTrang58_3DNBuy: data.nuTrang58_3DNBuy,
// 					nuTrang58_3DNSell: data.nuTrang58_3DNSell,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc))
// 				.catch((err) => console.log(data.name));

// 			// await browser.close();
// 		}

// 		if (data === false) {
// 			//wait a few second, also a good idea to swap proxy here
// 			console.log('Recrawl........' + attemps);
// 			await new Promise((resolve) => setTimeout(resolve, 3000));
// 		}
// 	}
// });

// const crawlPhuQuySjc1 = asyncHandler(async () => {
// 	const pageEvaluateFunc = async () => {
// 		const $ = document.querySelector.bind(document);

// 		let dataJson = {};

// try {
// 	dataJson.name = 'Phú Quý SJC';
// 	dataJson.location = 'Hà Nội';

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

// 	dataJson.sjcBuy = $(
// 		'table tbody :nth-child(1) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.sjcSell = $(
// 		'table tbody :nth-child(1) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.sjnBuy = $(
// 		'table tbody :nth-child(2) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.sjnSell = $(
// 		'table tbody :nth-child(2) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.npqBuy = $(
// 		'table tbody :nth-child(3) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.npqSell = $(
// 		'table tbody :nth-child(3) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.tpqBuy = $(
// 		'table tbody :nth-child(4) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.tpqSell = $(
// 		'table tbody :nth-child(4) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.cngBuy = $(
// 		'table tbody :nth-child(5) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.cngSell = $(
// 		'table tbody :nth-child(5) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.vang24kBuy = $(
// 		'table tbody :nth-child(6) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.vang24kSell = $(
// 		'table tbody :nth-child(6) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.vang999Buy = $(
// 		'table tbody :nth-child(7) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.vang999Sell = $(
// 		'table tbody :nth-child(7) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.vang099Buy = $(
// 		'table tbody :nth-child(8) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.vang099Sell = $(
// 		'table tbody :nth-child(8) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.v99Buy = $(
// 		'table tbody :nth-child(10) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.v99Sell = $(
// 		'table tbody :nth-child(10) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.v999Buy = $(
// 		'table tbody :nth-child(11) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.v999Sell = $(
// 		'table tbody :nth-child(11) :nth-child(4)'
// 	)?.innerText;

// 	dataJson.v9999Buy = $(
// 		'table tbody :nth-child(12) :nth-child(3)'
// 	)?.innerText;
// 	dataJson.v9999Sell = $(
// 		'table tbody :nth-child(12) :nth-child(4)'
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
// 		data = await collectQueryData(urlPhuQuySjc, pageEvaluateFunc);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// PhuQuySjc.findOneAndUpdate(
// 	{ name: data.name },
// 	{
// 		name: data.name,
// 		location: data.location,
// 		timeUpdate: data.timeUpdate,
// 		sjcBuy: data.sjcBuy,
// 		sjnBuy: data.sjnBuy,
// 		npqBuy: data.npqBuy,
// 		tpqBuy: data.tpqBuy,
// 		cngBuy: data.cngBuy,
// 		vang24kBuy: data.vang24kBuy,
// 		vang999Buy: data.vang999Buy,
// 		vang099Buy: data.vang099Buy,
// 		v99Buy: data.v99Buy,
// 		v999Buy: data.v999Buy,
// 		v9999Buy: data.v9999Buy,

// 		sjcSell: data.sjcSell,
// 		sjnSell: data.sjnSell,
// 		npqSell: data.npqSell,
// 		tpqSell: data.tpqSell,
// 		cngSell: data.cngSell,
// 		vang24kSell: data.vang24kSell,
// 		vang999Sell: data.vang999Sell,
// 		vang099Sell: data.vang099Sell,
// 		v99Sell: data.v99Sell,
// 		v999Sell: data.v999Sell,
// 		v9999Sell: data.v9999Sell,
// 	},
// 	{ upsert: true }
// )
// 	// .then((doc) => console.log(doc))
// 	.catch((err) => console.log(err));

// 			// await browser.close();
// 		}

// 		if (data === false) {
// 			//wait a few second, also a good idea to swap proxy here
// 			console.log('Recrawl........' + attemps);
// 			await new Promise((resolve) => setTimeout(resolve, 3000));
// 		}
// 	}
// });

// const crawlBaoTinMinhChau1 = asyncHandler(async () => {
// 	const pageEvaluateFunc = async () => {
// 		const $ = document.querySelector.bind(document);

// 		let dataJson = {};

// 		try {
// 			dataJson.name = 'Bảo Tín Minh Châu';
// 			dataJson.location = 'Hà Nội';

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

// 			dataJson.vangMiengVRTLBuy = $(
// 				'table tbody :nth-child(2) :nth-child(4) b '
// 			)?.innerText;
// 			dataJson.vangMiengVRTLSell = $(
// 				'table tbody :nth-child(2) :nth-child(5) b '
// 			)?.innerText;

// 			dataJson.nhanTronTronBuy = $(
// 				'table tbody :nth-child(3) :nth-child(3) b '
// 			)?.innerText;
// 			dataJson.nhanTronTronSell = $(
// 				'table tbody :nth-child(3) :nth-child(4) b '
// 			)?.innerText;

// 			dataJson.quaMungBanViVangBuy = $(
// 				'table tbody :nth-child(4) :nth-child(4) b '
// 			)?.innerText;
// 			dataJson.quaMungBanViVangSell = $(
// 				'table tbody :nth-child(4) :nth-child(5) b '
// 			)?.innerText;

// 			dataJson.vangMiengSjcBuy = $(
// 				'table tbody :nth-child(5) :nth-child(4) b '
// 			)?.innerText;
// 			dataJson.vangMiengSjcSell = $(
// 				'table tbody :nth-child(5) :nth-child(5) b '
// 			)?.innerText;

// 			dataJson.trangSucBangVangRongThangLong9999Buy = $(
// 				'table tbody :nth-child(6) :nth-child(4) b '
// 			)?.innerText;
// 			dataJson.trangSucBangVangRongThangLong9999Sell = $(
// 				'table tbody :nth-child(6) :nth-child(5) b '
// 			)?.innerText;

// 			dataJson.trangSucBangVangRongThangLong999Buy = $(
// 				'table tbody :nth-child(7) :nth-child(3) b '
// 			)?.innerText;
// 			dataJson.trangSucBangVangRongThangLong999Sell = $(
// 				'table tbody :nth-child(7) :nth-child(4) b '
// 			)?.innerText;

// 			dataJson.vangHTBTBuy = $(
// 				'table tbody :nth-child(8) :nth-child(4) b '
// 			)?.innerText;
// 			// dataJson.vangHTBTSell = $('table tbody :nth-child(8) :nth-child(5) b ')?.innerText

// 			dataJson.vangNguyenLieuBuy = $(
// 				'table tbody :nth-child(9) :nth-child(4) b '
// 			)?.innerText;
// 			// dataJson.vangNguyenLieuSell = $('table tbody :nth-child(9) :nth-child(5) b ')?.innerText
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
// 		data = await collectQueryData(ulrBaoTinMinhChau, pageEvaluateFunc);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// 			BaoTinMinhChau.findOneAndUpdate(
// 				{ name: data.name },
// 				{
// 					name: data.name,
// 					location: data.location,
// 					timeUpdate: data.timeUpdate,
// 					'vangRongThangLong.vangMiengVRTLBuy': data.vangMiengVRTLBuy,
// 					'vangRongThangLong.vangMiengVRTLSell':
// 						data.vangMiengVRTLSell,
// 					'vangRongThangLong.nhanTronTronBuy': data.nhanTronTronBuy,
// 					'vangRongThangLong.nhanTronTronSell': data.nhanTronTronSell,

// 					'quaMungVang.quaMungBanViVangBuy': data.quaMungBanViVangBuy,
// 					'quaMungVang.quaMungBanViVangSell':
// 						data.quaMungBanViVangSell,

// 					'vangSjc.vangMiengSjcBuy': data.vangMiengSjcBuy,
// 					'vangSjc.vangMiengSjcSell': data.vangMiengSjcSell,

// 					'vangBTMC.trangSucBangVangRongThangLong9999Buy':
// 						data.trangSucBangVangRongThangLong9999Buy,
// 					'vangBTMC.trangSucBangVangRongThangLong9999Sell':
// 						data.trangSucBangVangRongThangLong9999Sell,
// 					'vangBTMC.trangSucBangVangRongThangLong999Buy':
// 						data.trangSucBangVangRongThangLong999Buy,
// 					'vangBTMC.trangSucBangVangRongThangLong999Sell':
// 						data.trangSucBangVangRongThangLong999Sell,

// 					'vangHTBT.vangHTBTBuy': data.vangHTBTBuy,
// 					'vangThiTruong.vangNguyenLieuBuy': data.vangNguyenLieuBuy,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc))
// 				.catch((err) => console.log(data.name));

// 			// await browser.close();
// 		}

// 		if (data === false) {
// 			//wait a few second, also a good idea to swap proxy here
// 			console.log('Recrawl........' + attemps);
// 			await new Promise((resolve) => setTimeout(resolve, 3000));
// 		}
// 	}
// });

// const crawlMiHong1 = asyncHandler(async () => {
// 	const pageEvaluateFunc = async () => {
// 		const $ = document.querySelector.bind(document);

// 		let dataJson = {};

// 		try {
// 			dataJson.name = 'Mi Hồng';
// 			dataJson.location = 'Hồ Chí Minh';

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

// 			dataJson.sjcBuy = $(
// 				'#tblCurrentPrice tbody :nth-child(1) :nth-child(3) span '
// 			)?.innerText;
// 			dataJson.sjcSell = $(
// 				'#tblCurrentPrice tbody :nth-child(1) :nth-child(4) span '
// 			)?.innerText;

// 			dataJson.vang999Buy = $(
// 				'#tblCurrentPrice tbody :nth-child(1) :nth-child(7) span '
// 			)?.innerText;
// 			dataJson.vang999Sell = $(
// 				'#tblCurrentPrice tbody :nth-child(1) :nth-child(8) span '
// 			)?.innerText;

// 			dataJson.vang985Buy = $(
// 				'#tblCurrentPrice tbody :nth-child(2) :nth-child(3) span '
// 			)?.innerText;
// 			dataJson.vang985Sell = $(
// 				'#tblCurrentPrice tbody :nth-child(2) :nth-child(4) span '
// 			)?.innerText;

// 			dataJson.vang980Buy = $(
// 				'#tblCurrentPrice tbody :nth-child(2) :nth-child(7) span '
// 			)?.innerText;
// 			dataJson.vang980Sell = $(
// 				'#tblCurrentPrice tbody :nth-child(2) :nth-child(8) span '
// 			)?.innerText;

// 			dataJson.vang950Buy = $(
// 				'#tblCurrentPrice tbody :nth-child(3) :nth-child(3) span '
// 			)?.innerText;
// 			dataJson.vang950Sell = $(
// 				'#tblCurrentPrice tbody :nth-child(3) :nth-child(4) span '
// 			)?.innerText;

// 			dataJson.vang750Buy = $(
// 				'#tblCurrentPrice tbody :nth-child(3) :nth-child(7) span '
// 			)?.innerText;
// 			dataJson.vang750Sell = $(
// 				'#tblCurrentPrice tbody :nth-child(3) :nth-child(8) span '
// 			)?.innerText;

// 			dataJson.vang680Buy = $(
// 				'#tblCurrentPrice tbody :nth-child(4) :nth-child(3) span '
// 			)?.innerText;
// 			dataJson.vang680Sell = $(
// 				'#tblCurrentPrice tbody :nth-child(4) :nth-child(4) span '
// 			)?.innerText;

// 			dataJson.vang610Buy = $(
// 				'#tblCurrentPrice tbody :nth-child(4) :nth-child(7) span '
// 			)?.innerText;
// 			dataJson.vang610Sell = $(
// 				'#tblCurrentPrice tbody :nth-child(4) :nth-child(8) span '
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
// 		data = await collectQueryData(urlMiHong, pageEvaluateFunc);
// 		attemps++;
// 		console.log(data);
// 		if (data) {
// 			MiHong.findOneAndUpdate(
// 				{ name: data.name },
// 				{
// 					name: data.name,
// 					location: data.location,
// 					timeUpdate: data.timeUpdate,

// 					sjcBuy: data.sjcBuy,
// 					vang999Buy: data.vang999Buy,
// 					vang985Buy: data.vang985Buy,
// 					vang980Buy: data.vang980Buy,
// 					vang950Buy: data.vang950Buy,
// 					vang750Buy: data.vang750Buy,
// 					vang680Buy: data.vang680Buy,
// 					vang610Buy: data.vang610Buy,

// 					sjcSell: data.sjcSell,
// 					vang999Sell: data.vang999Sell,
// 					vang985Sell: data.vang985Sell,
// 					vang980Sell: data.vang980Sell,
// 					vang950Sell: data.vang950Sell,
// 					vang750Sell: data.vang750Sell,
// 					vang680Sell: data.vang680Sell,
// 					vang610Sell: data.vang610Sell,
// 				},
// 				{ upsert: true }
// 			)
// 				// .then((doc) => console.log(doc))
// 				.catch((err) => console.log(data.name));

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
	crawlSjc,
	crawlPnj,
	crawlDoji,
	crawlPhuQuySjc,
	crawlBaoTinMinhChau,
	crawlMiHong,
};

// const crawlSjc = asyncHandler(async () => {
// 	// cron.schedule('*/15 * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlSjc, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let sjcDetailData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = 'SJC';

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

// 				dataJson.sjc1l10lBuy = $(
// 					'#price1 table tbody :nth-child(4) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lSell = $(
// 					'#price1 table tbody :nth-child(4) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc5cBuy = $(
// 					'#price1 table tbody :nth-child(5) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc5cSell = $(
// 					'#price1 table tbody :nth-child(5) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc2c1c5phanBuy = $(
// 					'#price1 table tbody :nth-child(6) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc2c1c5phanSell = $(
// 					'#price1 table tbody :nth-child(6) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.nhansjc99_991chi2chi5chiBuy = $(
// 					'#price1 table tbody :nth-child(7) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.nhansjc99_991chi2chi5chiSell = $(
// 					'#price1 table tbody :nth-child(7) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.nhansjc99_99_0_5chiBuy = $(
// 					'#price1 table tbody :nth-child(8) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.nhansjc99_99_0_5chiSell = $(
// 					'#price1 table tbody :nth-child(8) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.nutrang99_99percentBuy = $(
// 					'#price1 table tbody :nth-child(9) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.nutrang99_99percentSell = $(
// 					'#price1 table tbody :nth-child(9) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.nutrang99percentBuy = $(
// 					'#price1 table tbody :nth-child(10) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.nutrang99percentSell = $(
// 					'#price1 table tbody :nth-child(10) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.nutrang75percentBuy = $(
// 					'#price1 table tbody :nth-child(11) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.nutrang75percentSell = $(
// 					'#price1 table tbody :nth-child(11) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.nutrang58_3percentBuy = $(
// 					'#price1 table tbody :nth-child(12) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.nutrang58_3percentSell = $(
// 					'#price1 table tbody :nth-child(12) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.nutrang41_7percentBuy = $(
// 					'#price1 table tbody :nth-child(13) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.nutrang41_7percentSell = $(
// 					'#price1 table tbody :nth-child(13) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lHaNoiBuy = $(
// 					'#price1 table tbody :nth-child(15) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lHaNoiSell = $(
// 					'#price1 table tbody :nth-child(15) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lDaNangBuy = $(
// 					'#price1 table tbody :nth-child(17) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lDaNangSell = $(
// 					'#price1 table tbody :nth-child(17) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lNhaTrangBuy = $(
// 					'#price1 table tbody :nth-child(19) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lNhaTrangSell = $(
// 					'#price1 table tbody :nth-child(19) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lCaMauBuy = $(
// 					'#price1 table tbody :nth-child(21) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lCaMauSell = $(
// 					'#price1 table tbody :nth-child(21) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lHueBuy = $(
// 					'#price1 table tbody :nth-child(23) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lHueSell = $(
// 					'#price1 table tbody :nth-child(23) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lBinhPhuocBuy = $(
// 					'#price1 table tbody :nth-child(25) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lBinhPhuocSell = $(
// 					'#price1 table tbody :nth-child(25) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lBienHoaBuy = $(
// 					'#price1 table tbody :nth-child(27) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lBienHoaSell = $(
// 					'#price1 table tbody :nth-child(27) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lMienTayBuy = $(
// 					'#price1 table tbody :nth-child(29) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lMienTaySell = $(
// 					'#price1 table tbody :nth-child(29) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lQuangNgaiBuy = $(
// 					'#price1 table tbody :nth-child(31) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lQuangNgaiSell = $(
// 					'#price1 table tbody :nth-child(31) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lLongXuyenBuy = $(
// 					'#price1 table tbody :nth-child(33) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lLongXuyenSell = $(
// 					'#price1 table tbody :nth-child(33) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lBacLieuBuy = $(
// 					'#price1 table tbody :nth-child(35) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lBacLieuSell = $(
// 					'#price1 table tbody :nth-child(35) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lQuyNhonBuy = $(
// 					'#price1 table tbody :nth-child(37) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lQuyNhonSell = $(
// 					'#price1 table tbody :nth-child(37) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lPhanRangBuy = $(
// 					'#price1 table tbody :nth-child(39) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lPhanRangSell = $(
// 					'#price1 table tbody :nth-child(39) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lHaLongBuy = $(
// 					'#price1 table tbody :nth-child(41) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lHaLongSell = $(
// 					'#price1 table tbody :nth-child(41) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.sjc1l10lQuangNamBuy = $(
// 					'#price1 table tbody :nth-child(43) :nth-child(2)'
// 				)?.innerText;
// 				dataJson.sjc1l10lQuangNamSell = $(
// 					'#price1 table tbody :nth-child(43) :nth-child(3)'
// 				)?.innerText;

// 				dataJson.currentTimestamp = Math.floor(Date.now() / 1000);
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(sjcDetailData)

// 		Sjc.findOneAndUpdate(
// 			{ name: sjcDetailData.name },
// 			{
// 				name: sjcDetailData.name,
// 				timeUpdate: sjcDetailData.timeUpdate,
// 				sjc1l10lBuy: sjcDetailData.sjc1l10lBuy,
// 				sjc5cBuy: sjcDetailData.sjc5cBuy,
// 				sjc2c1c5phanBuy: sjcDetailData.sjc2c1c5phanBuy,
// 				nhansjc99_991chi2chi5chiBuy:
// 					sjcDetailData.nhansjc99_991chi2chi5chiBuy,
// 				nhansjc99_99_0_5chiBuy: sjcDetailData.nhansjc99_99_0_5chiBuy,
// 				nutrang99_99percentBuy: sjcDetailData.nutrang99_99percentBuy,
// 				nutrang99percentBuy: sjcDetailData.nutrang99percentBuy,
// 				nutrang75percentBuy: sjcDetailData.nutrang75percentBuy,
// 				nutrang58_3percentBuy: sjcDetailData.nutrang58_3percentBuy,
// 				nutrang41_7percentBuy: sjcDetailData.nutrang41_7percentBuy,

// 				sjc1l10lSell: sjcDetailData.sjc1l10lSell,
// 				sjc5cSell: sjcDetailData.sjc5cSell,
// 				sjc2c1c5phanSell: sjcDetailData.sjc2c1c5phanSell,
// 				nhansjc99_991chi2chi5chiSell:
// 					sjcDetailData.nhansjc99_991chi2chi5chiSell,
// 				nhansjc99_99_0_5chiSell: sjcDetailData.nhansjc99_99_0_5chiSell,
// 				nutrang99_99percentSell: sjcDetailData.nutrang99_99percentSell,
// 				nutrang99percentSell: sjcDetailData.nutrang99percentSell,
// 				nutrang75percentSell: sjcDetailData.nutrang75percentSell,
// 				nutrang58_3percentSell: sjcDetailData.nutrang58_3percentSell,
// 				nutrang41_7percentSell: sjcDetailData.nutrang41_7percentSell,

// 				sjc1l10lHanoiBuy: sjcDetailData.sjc1l10lHanoiBuy,
// 				sjc1l10lHaNoiSell: sjcDetailData.sjc1l10lHaNoiSell,

// 				sjc1l10lDaNangBuy: sjcDetailData.sjc1l10lDaNangBuy,
// 				sjc1l10lDaNangSell: sjcDetailData.sjc1l10lDaNangSell,

// 				sjc1l10lNhatrangBuy: sjcDetailData.sjc1l10lNhatrangBuy,
// 				sjc1l10lNhatrangSell: sjcDetailData.sjc1l10lNhatrangSell,

// 				sjc1l10lCaMauBuy: sjcDetailData.sjc1l10lCaMauBuy,
// 				sjc1l10lCaMauSell: sjcDetailData.sjc1l10lCaMauSell,

// 				sjc1l10lHueBuy: sjcDetailData.sjc1l10lHueBuy,
// 				sjc1l10lHueSell: sjcDetailData.sjc1l10lHueSell,

// 				sjc1l10lBinhPhuocBuy: sjcDetailData.sjc1l10lBinhPhuocBuy,
// 				sjc1l10lBinhPhuocSell: sjcDetailData.sjc1l10lBinhPhuocSell,

// 				sjc1l10lBienHoaBuy: sjcDetailData.sjc1l10lBienHoaBuy,
// 				sjc1l10lBienHoaSell: sjcDetailData.sjc1l10lBienHoaSell,

// 				sjc1l10lMientayBuy: sjcDetailData.sjc1l10lMientayBuy,
// 				sjc1l10lMientaySell: sjcDetailData.sjc1l10lMientaySell,

// 				sjc1l10lQuangNgaiBuy: sjcDetailData.sjc1l10lQuangNgaiBuy,
// 				sjc1l10lQuangNgaiSell: sjcDetailData.sjc1l10lQuangNgaiSell,

// 				sjc1l10lLongXuyenBuy: sjcDetailData.sjc1l10lLongXuyenBuy,
// 				sjc1l10lLongXuyenSell: sjcDetailData.sjc1l10lLongXuyenSell,

// 				sjc1l10lBacLieuBuy: sjcDetailData.sjc1l10lBacLieuBuy,
// 				sjc1l10lBacLieuSell: sjcDetailData.sjc1l10lBacLieuSell,

// 				sjc1l10lQuyNhonBuy: sjcDetailData.sjc1l10lQuyNhonBuy,
// 				sjc1l10lQuyNhonSell: sjcDetailData.sjc1l10lQuyNhonSell,

// 				sjc1l10lPhanRangBuy: sjcDetailData.sjc1l10lPhanRangBuy,
// 				sjc1l10lPhanRangSell: sjcDetailData.sjc1l10lPhanRangSell,

// 				sjc1l10lHaLongBuy: sjcDetailData.sjc1l10lHaLongBuy,
// 				sjc1l10lHaLongSell: sjcDetailData.sjc1l10lHaLongSell,

// 				sjc1l10lQuangNamBuy: sjcDetailData.sjc1l10lQuangNamBuy,
// 				sjc1l10lQuangNamSell: sjcDetailData.sjc1l10lQuangNamSell,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(sjcDetailData.name));

// 		SjcChart.findOneAndUpdate(
// 			{ name: sjcDetailData.name },
// 			{
// 				$push: {
// 					t: sjcDetailData.currentTimestamp,
// 					buy: sjcDetailData.sjc1l10lBuy,
// 					sell: sjcDetailData.sjc1l10lSell,
// 				},
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(err));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// });
// });

// const crawlPnj = asyncHandler(async (localtionNumber, index) => {
// 	// cron.schedule('*/15 * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(`${urlPnj}${localtionNumber}`, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let pnjDetailData = await page.evaluate(
// 			async (localtionNumber, index) => {
// 				const $ = document.querySelector.bind(document);

// 				let dataJson = {};

// 				try {
// 					dataJson.name = 'PNJ';
// 					dataJson.location = document.querySelector(
// 						`#select_gold_area :nth-child(${index})`
// 					)?.innerText;

// 					let date = new Date();
// 					dataJson.timeUpdate =
// 						date.getHours() +
// 						':' +
// 						date.getMinutes() +
// 						':' +
// 						date.getSeconds() +
// 						' ' +
// 						date.getDate() +
// 						'/' +
// 						(date.getMonth() + 1) +
// 						'/' +
// 						date.getFullYear();

// 					dataJson.vangmiengsjcBuy = $(
// 						'#content-price :nth-child(1) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.vangmiengsjcSell = $(
// 						'#content-price :nth-child(1) :nth-child(3) span'
// 					)?.innerText;

// 					dataJson.nhantronpnjBuy = $(
// 						'#content-price :nth-child(2) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.nhantronpnjSell = $(
// 						'#content-price :nth-child(2) :nth-child(3) span'
// 					)?.innerText;

// 					dataJson.vangkimbaoBuy = $(
// 						'#content-price :nth-child(3) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.vangkimbaoSell = $(
// 						'#content-price :nth-child(3) :nth-child(3) span'
// 					)?.innerText;

// 					dataJson.vangphucloctaiBuy = $(
// 						'#content-price :nth-child(4) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.vangphucloctaiSell = $(
// 						'#content-price :nth-child(4) :nth-child(3) span'
// 					)?.innerText;

// 					dataJson.vang24kBuy = $(
// 						'#content-price :nth-child(5) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.vang24kSell = $(
// 						'#content-price :nth-child(5) :nth-child(3) span'
// 					)?.innerText;

// 					dataJson.vang750Buy = $(
// 						'#content-price :nth-child(6) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.vang750Sell = $(
// 						'#content-price :nth-child(6) :nth-child(3) span'
// 					)?.innerText;

// 					dataJson.vang585Buy = $(
// 						'#content-price :nth-child(7) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.vang585Sell = $(
// 						'#content-price :nth-child(7) :nth-child(3) span'
// 					)?.innerText;

// 					dataJson.vang416Buy = $(
// 						'#content-price :nth-child(8) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.vang416Sell = $(
// 						'#content-price :nth-child(8) :nth-child(3) span'
// 					)?.innerText;

// 					dataJson.vangmiengpnjBuy = $(
// 						'#content-price :nth-child(9) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.vangmiengpnjSell = $(
// 						'#content-price :nth-child(9) :nth-child(3) span'
// 					)?.innerText;

// 					dataJson.vang916Buy = $(
// 						'#content-price :nth-child(10) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.vang916Sell = $(
// 						'#content-price :nth-child(10) :nth-child(3) span'
// 					)?.innerText;

// 					dataJson.vang680Buy = $(
// 						'#content-price :nth-child(11) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.vang680Sell = $(
// 						'#content-price :nth-child(11) :nth-child(3) span'
// 					)?.innerText;

// 					dataJson.vang650Buy = $(
// 						'#content-price :nth-child(12) :nth-child(2) span'
// 					)?.innerText;
// 					dataJson.vang650Sell = $(
// 						'#content-price :nth-child(12) :nth-child(3) span'
// 					)?.innerText;
// 				} catch (err) {
// 					console.log(err);
// 				}
// 				return dataJson;
// 			},
// 			localtionNumber,
// 			index
// 		);

// 		// console.log(pnjDetailData)

// 		Pnj.findOneAndUpdate(
// 			{ location: pnjDetailData.location },
// 			{
// 				name: pnjDetailData.name,
// 				location: pnjDetailData.location,
// 				timeUpdate: pnjDetailData.timeUpdate,
// 				vangmiengsjcBuy: pnjDetailData.vangmiengpnjBuy,
// 				nhantronpnjBuy: pnjDetailData.nhantronpnjBuy,
// 				vangkimbaoBuy: pnjDetailData.vangkimbaoBuy,
// 				vangphucloctaiBuy: pnjDetailData.vangphucloctaiBuy,
// 				vang24kBuy: pnjDetailData.vang24kBuy,
// 				vang750Buy: pnjDetailData.vang750Buy,
// 				vang585Buy: pnjDetailData.vang585Buy,
// 				vang416Buy: pnjDetailData.vang416Buy,
// 				vangmiengpnjBuy: pnjDetailData.vangmiengpnjBuy,
// 				vang916Buy: pnjDetailData.vang916Buy,
// 				vang680Buy: pnjDetailData.vang680Buy,
// 				vang650Buy: pnjDetailData.vang650Buy,

// 				vangmiengsjcSell: pnjDetailData.vangmiengpnjSell,
// 				nhantronpnjSell: pnjDetailData.nhantronpnjSell,
// 				vangkimbaoSell: pnjDetailData.vangkimbaoSell,
// 				vangphucloctaiSell: pnjDetailData.vangphucloctaiSell,
// 				vang24kSell: pnjDetailData.vang24kSell,
// 				vang750Sell: pnjDetailData.vang750Sell,
// 				vang585Sell: pnjDetailData.vang585Sell,
// 				vang416Sell: pnjDetailData.vang416Sell,
// 				vangmiengpnjSell: pnjDetailData.vangmiengpnjSell,
// 				vang916Sell: pnjDetailData.vang916Sell,
// 				vang680Sell: pnjDetailData.vang680Sell,
// 				vang650Sell: pnjDetailData.vang650Sell,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(pnjDetailData.name));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlDoji = asyncHandler(async (location) => {
// 	// cron.schedule('*/15 * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlDoji, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let dojiDetailData = await page.evaluate(async (localtion) => {
// 			const $ = document.querySelector.bind(document);
// 			const $$ = document.querySelectorAll.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = 'DOJI';

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

// 				//-----Ha Noi----------
// 				const tableHN = $$('._table')[1];
// 				dataJson.sjcHNBuy = tableHN.querySelector(
// 					'._content-tab ._buy :nth-child(2)'
// 				)?.innerText;
// 				dataJson.AVPLHNBuy = tableHN.querySelector(
// 					'._content-tab ._buy :nth-child(3)'
// 				)?.innerText;
// 				dataJson.nhanHTVHNBuy = tableHN.querySelector(
// 					'._content-tab ._buy :nth-child(4)'
// 				)?.innerText;
// 				dataJson.KTTKimGiapHNBuy = tableHN.querySelector(
// 					'._content-tab ._buy :nth-child(5)'
// 				)?.innerText;
// 				dataJson.phiSjcHNBuy = tableHN.querySelector(
// 					'._content-tab ._buy :nth-child(6)'
// 				)?.innerText;
// 				dataJson.nuTrang9999HNBuy = tableHN.querySelector(
// 					'._content-tab ._buy :nth-child(7)'
// 				)?.innerText;
// 				dataJson.nuTrang999HNBuy = tableHN.querySelector(
// 					'._content-tab ._buy :nth-child(8)'
// 				)?.innerText;
// 				dataJson.nuTrang99HNBuy = tableHN.querySelector(
// 					'._content-tab ._buy :nth-child(9)'
// 				)?.innerText;
// 				dataJson.nuTrang18kHNBuy = tableHN.querySelector(
// 					'._content-tab ._buy :nth-child(10)'
// 				)?.innerText;
// 				dataJson.nuTrang14kHNBuy = tableHN.querySelector(
// 					'._content-tab ._buy :nth-child(11)'
// 				)?.innerText;
// 				dataJson.nuTrang10kHNBuy = tableHN.querySelector(
// 					'._content-tab ._buy :nth-child(12)'
// 				)?.innerText;

// 				dataJson.sjcHNSell = tableHN.querySelector(
// 					'._content-tab ._Sell :nth-child(2)'
// 				)?.innerText;
// 				dataJson.AVPLHNSell = tableHN.querySelector(
// 					'._content-tab ._Sell :nth-child(3)'
// 				)?.innerText;
// 				dataJson.nhanHTVHNSell = tableHN.querySelector(
// 					'._content-tab ._Sell :nth-child(4)'
// 				)?.innerText;
// 				dataJson.KTTKimGiapHNSell = tableHN.querySelector(
// 					'._content-tab ._Sell :nth-child(5)'
// 				)?.innerText;
// 				dataJson.phiSjcHNSell = tableHN.querySelector(
// 					'._content-tab ._Sell :nth-child(6)'
// 				)?.innerText;
// 				dataJson.nuTrang9999HNSell = tableHN.querySelector(
// 					'._content-tab ._Sell :nth-child(7)'
// 				)?.innerText;
// 				dataJson.nuTrang999HNSell = tableHN.querySelector(
// 					'._content-tab ._Sell :nth-child(8)'
// 				)?.innerText;
// 				dataJson.nuTrang99HNSell = tableHN.querySelector(
// 					'._content-tab ._Sell :nth-child(9)'
// 				)?.innerText;
// 				dataJson.nuTrang18kHNSell = tableHN.querySelector(
// 					'._content-tab ._Sell :nth-child(10)'
// 				)?.innerText;
// 				dataJson.nuTrang14kHNSell = tableHN.querySelector(
// 					'._content-tab ._Sell :nth-child(11)'
// 				)?.innerText;
// 				dataJson.nuTrang10kHNSell = tableHN.querySelector(
// 					'._content-tab ._Sell :nth-child(12)'
// 				)?.innerText;

// 				//--------Ho Chi Minh----------
// 				const tableHCM = document.querySelectorAll('._table')[2];
// 				dataJson.sjcHCMBuy = tableHCM.querySelector(
// 					'._content-tab ._buy :nth-child(2)'
// 				)?.innerText;
// 				dataJson.AVPLHCMBuy = tableHCM.querySelector(
// 					'._content-tab ._buy :nth-child(3)'
// 				)?.innerText;
// 				dataJson.KNTKTTKimGiapHCMBuy = tableHCM.querySelector(
// 					'._content-tab ._buy :nth-child(4)'
// 				)?.innerText;
// 				dataJson.nhanHTVHCMBuy = tableHCM.querySelector(
// 					'._content-tab ._buy :nth-child(5)'
// 				)?.innerText;
// 				dataJson.nuTrang9999HCMBuy = tableHCM.querySelector(
// 					'._content-tab ._buy :nth-child(6)'
// 				)?.innerText;
// 				dataJson.nuTrang999HCMBuy = tableHCM.querySelector(
// 					'._content-tab ._buy :nth-child(7)'
// 				)?.innerText;
// 				dataJson.nuTrang99HCMBuy = tableHCM.querySelector(
// 					'._content-tab ._buy :nth-child(8)'
// 				)?.innerText;
// 				dataJson.nuTrang75HCMBuy = tableHCM.querySelector(
// 					'._content-tab ._buy :nth-child(9)'
// 				)?.innerText;

// 				dataJson.sjcHCMSell = tableHCM.querySelector(
// 					'._content-tab ._Sell :nth-child(2)'
// 				)?.innerText;
// 				dataJson.AVPLHCMSell = tableHCM.querySelector(
// 					'._content-tab ._Sell :nth-child(3)'
// 				)?.innerText;
// 				dataJson.KNTKTTKimGiapHCMSell = tableHCM.querySelector(
// 					'._content-tab ._Sell :nth-child(4)'
// 				)?.innerText;
// 				dataJson.nhanHTVHCMSell = tableHCM.querySelector(
// 					'._content-tab ._Sell :nth-child(5)'
// 				)?.innerText;
// 				dataJson.nuTrang9999HCMSell = tableHCM.querySelector(
// 					'._content-tab ._Sell :nth-child(6)'
// 				)?.innerText;
// 				dataJson.nuTrang999HCMSell = tableHCM.querySelector(
// 					'._content-tab ._Sell :nth-child(7)'
// 				)?.innerText;
// 				dataJson.nuTrang99HCMSell = tableHCM.querySelector(
// 					'._content-tab ._Sell :nth-child(8)'
// 				)?.innerText;
// 				dataJson.nuTrang75HCMSell = tableHCM.querySelector(
// 					'._content-tab ._Sell :nth-child(9)'
// 				)?.innerText;

// 				//--------Da Nang--------------
// 				const tableDN = document.querySelectorAll('._table')[3];
// 				dataJson.sjcDNBuy = tableDN.querySelector(
// 					'._content-tab ._buy :nth-child(2)'
// 				)?.innerText;
// 				dataJson.AVPLDNBuy = tableDN.querySelector(
// 					'._content-tab ._buy :nth-child(3)'
// 				)?.innerText;
// 				dataJson.KNTKTTKimGiapDNBuy = tableDN.querySelector(
// 					'._content-tab ._buy :nth-child(4)'
// 				)?.innerText;
// 				dataJson.nhanHTVDNBuy = tableDN.querySelector(
// 					'._content-tab ._buy :nth-child(5)'
// 				)?.innerText;
// 				dataJson.nuTrang9999DNBuy = tableDN.querySelector(
// 					'._content-tab ._buy :nth-child(6)'
// 				)?.innerText;
// 				dataJson.nuTrang75DNBuy = tableDN.querySelector(
// 					'._content-tab ._buy :nth-child(7)'
// 				)?.innerText;
// 				dataJson.nuTrang68DNBuy = tableDN.querySelector(
// 					'._content-tab ._buy :nth-child(8)'
// 				)?.innerText;
// 				dataJson.nuTrang58_3DNBuy = tableDN.querySelector(
// 					'._content-tab ._buy :nth-child(9)'
// 				)?.innerText;

// 				dataJson.sjcDNSell = tableDN.querySelector(
// 					'._content-tab ._Sell :nth-child(2)'
// 				)?.innerText;
// 				dataJson.AVPLDNSell = tableDN.querySelector(
// 					'._content-tab ._Sell :nth-child(3)'
// 				)?.innerText;
// 				dataJson.KNTKTTKimGiapDNSell = tableDN.querySelector(
// 					'._content-tab ._Sell :nth-child(4)'
// 				)?.innerText;
// 				dataJson.nhanHTVDNSell = tableDN.querySelector(
// 					'._content-tab ._Sell :nth-child(5)'
// 				)?.innerText;
// 				dataJson.nuTrang9999DNSell = tableDN.querySelector(
// 					'._content-tab ._Sell :nth-child(6)'
// 				)?.innerText;
// 				dataJson.nuTrang75DNSell = tableDN.querySelector(
// 					'._content-tab ._Sell :nth-child(7)'
// 				)?.innerText;
// 				dataJson.nuTrang68DNSell = tableDN.querySelector(
// 					'._content-tab ._Sell :nth-child(8)'
// 				)?.innerText;
// 				dataJson.nuTrang58_3DNSell = tableDN.querySelector(
// 					'._content-tab ._Sell :nth-child(9)'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		}, location);

// 		// console.log(dojiDetailData)

// 		Doji.findOneAndUpdate(
// 			{ name: dojiDetailData.name },
// 			{
// 				name: dojiDetailData.name,
// 				timeUpdate: dojiDetailData.timeUpdate,
// 				sjcHNBuy: dojiDetailData.sjcHNBuy,
// 				sjcHNSell: dojiDetailData.sjcHNSell,
// 				AVPLHNBuy: dojiDetailData.AVPLHNBuy,
// 				AVPLHNSell: dojiDetailData.AVPLHNSell,
// 				nhanHTVHNBuy: dojiDetailData.nhanHTVHNBuy,
// 				nhanHTVHNSell: dojiDetailData.nhanHTVHNSell,
// 				KTTKimGiapHNBuy: dojiDetailData.KTTKimGiapHNBuy,
// 				KTTKimGiapHNSell: dojiDetailData.KTTKimGiapHNSell,
// 				phiSjcHNBuy: dojiDetailData.phiSjcHNBuy,
// 				phiSjcHNSell: dojiDetailData.phiSjcHNSell,
// 				nuTrang9999HNBuy: dojiDetailData.nuTrang9999HNBuy,
// 				nuTrang9999HNSell: dojiDetailData.nuTrang9999HNSell,
// 				nuTrang999HNBuy: dojiDetailData.nuTrang999HNBuy,
// 				nuTrang999HNSell: dojiDetailData.nuTrang999HNSell,
// 				nuTrang99HNBuy: dojiDetailData.nuTrang99HNBuy,
// 				nuTrang99HNSell: dojiDetailData.nuTrang99HNSell,
// 				nuTrang18kHNBuy: dojiDetailData.nuTrang18kHNBuy,
// 				nuTrang18kHNSell: dojiDetailData.nuTrang18kHNSell,
// 				nuTrang14kHNBuy: dojiDetailData.nuTrang14kHNBuy,
// 				nuTrang14kHNSell: dojiDetailData.nuTrang14kHNSell,
// 				nuTrang10kHNBuy: dojiDetailData.nuTrang10kHNBuy,
// 				nuTrang10kHNSell: dojiDetailData.nuTrang10kHNSell,

// 				sjcHCMBuy: dojiDetailData.sjcHCMBuy,
// 				sjcHCMSell: dojiDetailData.sjcHCMSell,
// 				AVPLHCMBuy: dojiDetailData.AVPLHCMBuy,
// 				AVPLHCMSell: dojiDetailData.AVPLHCMSell,
// 				KNTKTTKimGiapHCMBuy: dojiDetailData.KNTKTTKimGiapHCMBuy,
// 				KNTKTTKimGiapHCMSell: dojiDetailData.KNTKTTKimGiapHCMSell,
// 				nhanHTVHCMBuy: dojiDetailData.nhanHTVHCMBuy,
// 				nhanHTVHCMSell: dojiDetailData.nhanHTVHCMSell,
// 				nuTrang9999HCMBuy: dojiDetailData.nuTrang9999HCMBuy,
// 				nuTrang9999HCMSell: dojiDetailData.nuTrang9999HCMSell,
// 				nuTrang999HCMBuy: dojiDetailData.nuTrang999HCMBuy,
// 				nuTrang999HCMSell: dojiDetailData.nuTrang999HCMSell,
// 				nuTrang99HCMBuy: dojiDetailData.nuTrang99HCMBuy,
// 				nuTrang99HCMSell: dojiDetailData.nuTrang99HCMSell,
// 				nuTrang75HCMBuy: dojiDetailData.nuTrang75HCMBuy,
// 				nuTrang75HCMSell: dojiDetailData.nuTrang75HCMSell,

// 				sjcDNBuy: dojiDetailData.sjcDNBuy,
// 				sjcDNSell: dojiDetailData.sjcDNSell,
// 				AVPLDNBuy: dojiDetailData.AVPLDNBuy,
// 				AVPLDNSell: dojiDetailData.AVPLDNSell,
// 				KNTKTTKimGiapDNBuy: dojiDetailData.KNTKTTKimGiapDNBuy,
// 				KNTKTTKimGiapDNSell: dojiDetailData.KNTKTTKimGiapDNSell,
// 				nhanHTVDNBuy: dojiDetailData.nhanHTVDNBuy,
// 				nhanHTVDNSell: dojiDetailData.nhanHTVDNSell,
// 				nuTrang9999DNBuy: dojiDetailData.nuTrang9999DNBuy,
// 				nuTrang9999DNSell: dojiDetailData.nuTrang9999DNSell,
// 				nuTrang75DNBuy: dojiDetailData.nuTrang75DNBuy,
// 				nuTrang75DNSell: dojiDetailData.nuTrang75DNSell,
// 				nuTrang68DNBuy: dojiDetailData.nuTrang68DNBuy,
// 				nuTrang68DNSell: dojiDetailData.nuTrang68DNSell,
// 				nuTrang58_3DNBuy: dojiDetailData.nuTrang58_3DNBuy,
// 				nuTrang58_3DNSell: dojiDetailData.nuTrang58_3DNSell,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(dojiDetailData.name));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlPhuQuySjc = asyncHandler(async () => {
// 	// cron.schedule('*/15 * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(urlPhuQuySjc, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let phuQuySjcDetailData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = 'Phú Quý SJC';
// 				dataJson.location = 'Hà Nội';

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

// 				dataJson.sjcBuy = $(
// 					'table tbody :nth-child(1) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.sjcSell = $(
// 					'table tbody :nth-child(1) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.sjnBuy = $(
// 					'table tbody :nth-child(2) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.sjnSell = $(
// 					'table tbody :nth-child(2) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.npqBuy = $(
// 					'table tbody :nth-child(3) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.npqSell = $(
// 					'table tbody :nth-child(3) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.tpqBuy = $(
// 					'table tbody :nth-child(4) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.tpqSell = $(
// 					'table tbody :nth-child(4) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.cngBuy = $(
// 					'table tbody :nth-child(5) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.cngSell = $(
// 					'table tbody :nth-child(5) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.vang24kBuy = $(
// 					'table tbody :nth-child(6) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.vang24kSell = $(
// 					'table tbody :nth-child(6) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.vang999Buy = $(
// 					'table tbody :nth-child(7) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.vang999Sell = $(
// 					'table tbody :nth-child(7) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.vang099Buy = $(
// 					'table tbody :nth-child(8) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.vang099Sell = $(
// 					'table tbody :nth-child(8) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.v99Buy = $(
// 					'table tbody :nth-child(10) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.v99Sell = $(
// 					'table tbody :nth-child(10) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.v999Buy = $(
// 					'table tbody :nth-child(11) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.v999Sell = $(
// 					'table tbody :nth-child(11) :nth-child(4)'
// 				)?.innerText;

// 				dataJson.v9999Buy = $(
// 					'table tbody :nth-child(12) :nth-child(3)'
// 				)?.innerText;
// 				dataJson.v9999Sell = $(
// 					'table tbody :nth-child(12) :nth-child(4)'
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(phuQuySjcDetailData)

// 		PhuQuySjc.findOneAndUpdate(
// 			{ name: phuQuySjcDetailData.name },
// 			{
// 				name: phuQuySjcDetailData.name,
// 				location: phuQuySjcDetailData.location,
// 				timeUpdate: phuQuySjcDetailData.timeUpdate,
// 				sjcBuy: phuQuySjcDetailData.sjcBuy,
// 				sjnBuy: phuQuySjcDetailData.sjnBuy,
// 				npqBuy: phuQuySjcDetailData.npqBuy,
// 				tpqBuy: phuQuySjcDetailData.tpqBuy,
// 				cngBuy: phuQuySjcDetailData.cngBuy,
// 				vang24kBuy: phuQuySjcDetailData.vang24kBuy,
// 				vang999Buy: phuQuySjcDetailData.vang999Buy,
// 				vang099Buy: phuQuySjcDetailData.vang099Buy,
// 				v99Buy: phuQuySjcDetailData.v99Buy,
// 				v999Buy: phuQuySjcDetailData.v999Buy,
// 				v9999Buy: phuQuySjcDetailData.v9999Buy,

// 				sjcSell: phuQuySjcDetailData.sjcSell,
// 				sjnSell: phuQuySjcDetailData.sjnSell,
// 				npqSell: phuQuySjcDetailData.npqSell,
// 				tpqSell: phuQuySjcDetailData.tpqSell,
// 				cngSell: phuQuySjcDetailData.cngSell,
// 				vang24kSell: phuQuySjcDetailData.vang24kSell,
// 				vang999Sell: phuQuySjcDetailData.vang999Sell,
// 				vang099Sell: phuQuySjcDetailData.vang099Sell,
// 				v99Sell: phuQuySjcDetailData.v99Sell,
// 				v999Sell: phuQuySjcDetailData.v999Sell,
// 				v9999Sell: phuQuySjcDetailData.v9999Sell,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(phuQuySjcDetailData.name));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlBaoTinMinhChau = asyncHandler(async () => {
// 	// cron.schedule('*/15 * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36'
// 		);
// 		await page.goto(ulrBaoTinMinhChau, { timeout: 0 });

// 		await page.waitForTimeout(2000);

// 		let baoTinMinhChauDetailData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = 'Bảo Tín Minh Châu';
// 				dataJson.location = 'Hà Nội';

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

// 				dataJson.vangMiengVRTLBuy = $(
// 					'table tbody :nth-child(2) :nth-child(4) b '
// 				)?.innerText;
// 				dataJson.vangMiengVRTLSell = $(
// 					'table tbody :nth-child(2) :nth-child(5) b '
// 				)?.innerText;

// 				dataJson.nhanTronTronBuy = $(
// 					'table tbody :nth-child(3) :nth-child(3) b '
// 				)?.innerText;
// 				dataJson.nhanTronTronSell = $(
// 					'table tbody :nth-child(3) :nth-child(4) b '
// 				)?.innerText;

// 				dataJson.quaMungBanViVangBuy = $(
// 					'table tbody :nth-child(4) :nth-child(4) b '
// 				)?.innerText;
// 				dataJson.quaMungBanViVangSell = $(
// 					'table tbody :nth-child(4) :nth-child(5) b '
// 				)?.innerText;

// 				dataJson.vangMiengSjcBuy = $(
// 					'table tbody :nth-child(5) :nth-child(4) b '
// 				)?.innerText;
// 				dataJson.vangMiengSjcSell = $(
// 					'table tbody :nth-child(5) :nth-child(5) b '
// 				)?.innerText;

// 				dataJson.trangSucBangVangRongThangLong9999Buy = $(
// 					'table tbody :nth-child(6) :nth-child(4) b '
// 				)?.innerText;
// 				dataJson.trangSucBangVangRongThangLong9999Sell = $(
// 					'table tbody :nth-child(6) :nth-child(5) b '
// 				)?.innerText;

// 				dataJson.trangSucBangVangRongThangLong999Buy = $(
// 					'table tbody :nth-child(7) :nth-child(3) b '
// 				)?.innerText;
// 				dataJson.trangSucBangVangRongThangLong999Sell = $(
// 					'table tbody :nth-child(7) :nth-child(4) b '
// 				)?.innerText;

// 				dataJson.vangHTBTBuy = $(
// 					'table tbody :nth-child(8) :nth-child(4) b '
// 				)?.innerText;
// 				// dataJson.vangHTBTSell = $('table tbody :nth-child(8) :nth-child(5) b ')?.innerText

// 				dataJson.vangNguyenLieuBuy = $(
// 					'table tbody :nth-child(9) :nth-child(4) b '
// 				)?.innerText;
// 				// dataJson.vangNguyenLieuSell = $('table tbody :nth-child(9) :nth-child(5) b ')?.innerText
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(baoTinMinhChauDetailData)

// 		BaoTinMinhChau.findOneAndUpdate(
// 			{ name: baoTinMinhChauDetailData.name },
// 			{
// 				name: baoTinMinhChauDetailData.name,
// 				location: baoTinMinhChauDetailData.location,
// 				timeUpdate: baoTinMinhChauDetailData.timeUpdate,
// 				'vangRongThangLong.vangMiengVRTLBuy':
// 					baoTinMinhChauDetailData.vangMiengVRTLBuy,
// 				'vangRongThangLong.vangMiengVRTLSell':
// 					baoTinMinhChauDetailData.vangMiengVRTLSell,
// 				'vangRongThangLong.nhanTronTronBuy':
// 					baoTinMinhChauDetailData.nhanTronTronBuy,
// 				'vangRongThangLong.nhanTronTronSell':
// 					baoTinMinhChauDetailData.nhanTronTronSell,

// 				'quaMungVang.quaMungBanViVangBuy':
// 					baoTinMinhChauDetailData.quaMungBanViVangBuy,
// 				'quaMungVang.quaMungBanViVangSell':
// 					baoTinMinhChauDetailData.quaMungBanViVangSell,

// 				'vangSjc.vangMiengSjcBuy':
// 					baoTinMinhChauDetailData.vangMiengSjcBuy,
// 				'vangSjc.vangMiengSjcSell':
// 					baoTinMinhChauDetailData.vangMiengSjcSell,

// 				'vangBTMC.trangSucBangVangRongThangLong9999Buy':
// 					baoTinMinhChauDetailData.trangSucBangVangRongThangLong9999Buy,
// 				'vangBTMC.trangSucBangVangRongThangLong9999Sell':
// 					baoTinMinhChauDetailData.trangSucBangVangRongThangLong9999Sell,
// 				'vangBTMC.trangSucBangVangRongThangLong999Buy':
// 					baoTinMinhChauDetailData.trangSucBangVangRongThangLong999Buy,
// 				'vangBTMC.trangSucBangVangRongThangLong999Sell':
// 					baoTinMinhChauDetailData.trangSucBangVangRongThangLong999Sell,

// 				'vangHTBT.vangHTBTBuy': baoTinMinhChauDetailData.vangHTBTBuy,
// 				'vangThiTruong.vangNguyenLieuBuy':
// 					baoTinMinhChauDetailData.vangNguyenLieuBuy,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(baoTinMinhChauDetailData.name));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });

// const crawlMiHong = asyncHandler(async () => {
// 	// cron.schedule('*/15 * * * *', async () => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		const page = await browser.newPage();
// 		// await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")
// 		await page.goto(urlMiHong, { timeout: 0 });
// 		// await page.select('#select_gold_area', localtionNumber)
// 		await page.waitForTimeout(2000);

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
// 		// await page.waitForTimeout(2000);

// 		let miHongDetailData = await page.evaluate(async () => {
// 			const $ = document.querySelector.bind(document);

// 			let dataJson = {};

// 			try {
// 				dataJson.name = 'Mi Hồng';
// 				dataJson.location = 'Hồ Chí Minh';

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

// 				dataJson.sjcBuy = $(
// 					'#tblCurrentPrice tbody :nth-child(1) :nth-child(3) span '
// 				)?.innerText;
// 				dataJson.sjcSell = $(
// 					'#tblCurrentPrice tbody :nth-child(1) :nth-child(4) span '
// 				)?.innerText;

// 				dataJson.vang999Buy = $(
// 					'#tblCurrentPrice tbody :nth-child(1) :nth-child(7) span '
// 				)?.innerText;
// 				dataJson.vang999Sell = $(
// 					'#tblCurrentPrice tbody :nth-child(1) :nth-child(8) span '
// 				)?.innerText;

// 				dataJson.vang985Buy = $(
// 					'#tblCurrentPrice tbody :nth-child(2) :nth-child(3) span '
// 				)?.innerText;
// 				dataJson.vang985Sell = $(
// 					'#tblCurrentPrice tbody :nth-child(2) :nth-child(4) span '
// 				)?.innerText;

// 				dataJson.vang980Buy = $(
// 					'#tblCurrentPrice tbody :nth-child(2) :nth-child(7) span '
// 				)?.innerText;
// 				dataJson.vang980Sell = $(
// 					'#tblCurrentPrice tbody :nth-child(2) :nth-child(8) span '
// 				)?.innerText;

// 				dataJson.vang950Buy = $(
// 					'#tblCurrentPrice tbody :nth-child(3) :nth-child(3) span '
// 				)?.innerText;
// 				dataJson.vang950Sell = $(
// 					'#tblCurrentPrice tbody :nth-child(3) :nth-child(4) span '
// 				)?.innerText;

// 				dataJson.vang750Buy = $(
// 					'#tblCurrentPrice tbody :nth-child(3) :nth-child(7) span '
// 				)?.innerText;
// 				dataJson.vang750Sell = $(
// 					'#tblCurrentPrice tbody :nth-child(3) :nth-child(8) span '
// 				)?.innerText;

// 				dataJson.vang680Buy = $(
// 					'#tblCurrentPrice tbody :nth-child(4) :nth-child(3) span '
// 				)?.innerText;
// 				dataJson.vang680Sell = $(
// 					'#tblCurrentPrice tbody :nth-child(4) :nth-child(4) span '
// 				)?.innerText;

// 				dataJson.vang610Buy = $(
// 					'#tblCurrentPrice tbody :nth-child(4) :nth-child(7) span '
// 				)?.innerText;
// 				dataJson.vang610Sell = $(
// 					'#tblCurrentPrice tbody :nth-child(4) :nth-child(8) span '
// 				)?.innerText;
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			return dataJson;
// 		});

// 		// console.log(miHongDetailData);

// 		MiHong.findOneAndUpdate(
// 			{ name: miHongDetailData.name },
// 			{
// 				name: miHongDetailData.name,
// 				location: miHongDetailData.location,
// 				timeUpdate: miHongDetailData.timeUpdate,

// 				sjcBuy: miHongDetailData.sjcBuy,
// 				vang999Buy: miHongDetailData.vang999Buy,
// 				vang985Buy: miHongDetailData.vang985Buy,
// 				vang980Buy: miHongDetailData.vang980Buy,
// 				vang950Buy: miHongDetailData.vang950Buy,
// 				vang750Buy: miHongDetailData.vang750Buy,
// 				vang680Buy: miHongDetailData.vang680Buy,
// 				vang610Buy: miHongDetailData.vang610Buy,

// 				sjcSell: miHongDetailData.sjcSell,
// 				vang999Sell: miHongDetailData.vang999Sell,
// 				vang985Sell: miHongDetailData.vang985Sell,
// 				vang980Sell: miHongDetailData.vang980Sell,
// 				vang950Sell: miHongDetailData.vang950Sell,
// 				vang750Sell: miHongDetailData.vang750Sell,
// 				vang680Sell: miHongDetailData.vang680Sell,
// 				vang610Sell: miHongDetailData.vang610Sell,
// 			},
// 			{ upsert: true }
// 		)
// 			// .then((doc) => console.log(doc))
// 			.catch((err) => console.log(miHongDetailData.name));

// 		await browser.close();
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	// })
// });
