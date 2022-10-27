const Hnx30 = require('../../model/stock/stockList/hnx30Model');
const Hnx = require('../../model/stock/stockList/hnxModel');
const Vn30 = require('../../model/stock/stockList/vn30Model');
const Hose = require('../../model/stock/stockList/hoseModel');
const Upcom = require('../../model/stock/stockList/upcomModel');

const AllInvesting = require('../../model/stock/stockList/allInvestingModel');
const AllInvestingDetail = require('../../model/stock/stockDetail/allInvestingDetailModel');
const Hnx30Detail = require('../../model/stock/stockDetail/hnx30DetailModel');

const { delay } = require('../../utils/promise/delayTime/delay');

const {
	crawlHnx30,
	crawlHnx,
	crawlVn30,
	crawlHose,
	crawlUpcom,
	crawlAllInvesting,
	crawlDetailHnx30,
	crawlDetailHnx,
	crawlDetailVn30,
	crawlDetailHose,
	crawlDetailUpcom,
	crawlDetailAllInvesting,
	crawlDetailReportChartAll,
	crawlDetailChartHnx,
} = require('../index');

const stockRunAll = async () => {
	//----Length of collection to caculate time delay each crawlingFunction executes
	const hnxLength = await Hnx.find().count();
	const hnx30Length = await Hnx30.find().count();
	const vn30Length = await Vn30.find().count();
	const hoseLength = await Hose.find().count();
	// const upcomLength = await Upcom.find().count();

	//----crawl all basic information stocks----
	crawlHnx();
	await delay(20000);
	crawlHnx30();
	await delay(10000);
	crawlVn30();
	await delay(10000);
	crawlHose();
	await delay(20000);
	// crawlUpcom();
	// await delay(20000);
	// crawlAllInvesting();
	//--------------------------------------

	// const crawlAllDetailAllInvesting = asyncHandler(async () => {
	// 	const list = await AllInvesting.find({}).limit(20);

	// 	list.forEach(async (stock, index) => {
	// 		setTimeout(() => {
	// 			crawlDetailAllInvesting(stock.id, stock.name, stock.hrefDetail);
	// 		}, 2000 * index);
	// 	});
	// });

	// const crawlAllDetailReportChart = asyncHandler(async () => {
	// 	const list = await AllInvestingDetail.find({}).limit(10);

	// 	list.forEach(async (stock, index) => {
	// 		setTimeout(() => {
	// 			crawlDetailReportChartAll(stock.id, stock.symbol);
	// 		}, index * 2000);
	// 	});
	// });

	//---crawl detail information in particularly stock and update price to array in database to draw chart
	console.log('start crawl detail');
	crawlDetailHnx30();
	//set delay for crwaling each exchange.When crawling first time, dont have data in database so we have to set default time delay,
	//it depends on your caculating
	if (hnx30Length !== 0) {
		await delay(hnx30Length * 4300);
	} else {
		await delay(30 * 4300);
	}

	crawlDetailVn30();
	if (vn30Length !== 0) {
		await delay(vn30Length * 4300);
	} else {
		await delay(30 * 4300);
	}

	crawlDetailHnx();
	if (hnxLength !== 0) {
		await delay(hnxLength * 4300);
	} else {
		await delay(337 * 4300);
	}

	crawlDetailHose();
	if (hoseLength !== 0) {
		await delay(hoseLength * 4300);
	} else {
		await delay(413 * 4300);
	}

	// crawlAllDetailStock(Upcom, crawlDetailUpcom);
	// if (upcomLength !== 0) {
	// 	await delay(upcomLength * 4300);
	// } else {
	// 	await delay(900 * 4300);
	// }

	// crawlAllDetailAllInvesting();

	// crawlAllDetailChartHnx(); ham nay la goi api cua ho de lay data,gio khong can nua

	// crawlAllDetailReportChart();
};

module.exports = stockRunAll;
